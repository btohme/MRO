import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError, take } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { PDFDocument } from '../models/pdf-document.model';
import { GoogleDriveService } from './google-drive.service';
import { PdfExtractorService } from './pdf-extractor.service';

@Injectable({
  providedIn: 'root'
})
export class OpenaiSearchService {
  private readonly OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
  private readonly GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1';
  private readonly HUGGINGFACE_API_URL = 'https://api-inference.huggingface.co/models';

  constructor(
    private http: HttpClient,
    private driveService: GoogleDriveService,
    private pdfExtractor: PdfExtractorService
  ) {}

  /**
   * Main search function that uses AI to find relevant PDFs
   */
  search(query: string): Observable<PDFDocument[]> {
    // Step 1: Get all PDF files from Google Drive
    return this.driveService.listPDFFiles().pipe(
      switchMap(allFiles => {
        if (allFiles.length === 0) {
          return of([]);
        }

        // Step 2: Use AI to filter based on file names and folder structure
        return this.filterWithAI(query, allFiles);
      }),
      catchError(error => {
        console.error('Search error:', error);
        return of([]);
      })
    );
  }

  /**
   * Use AI to determine which PDFs are relevant to the query
   * Supports: OpenAI, Gemini, Ollama, HuggingFace
   */
  private filterWithAI(query: string, documents: PDFDocument[]): Observable<PDFDocument[]> {
    const engine = (environment as any).searchEngine || 'gemini';

    switch (engine) {
      case 'gemini':
        return this.filterWithGemini(query, documents);
      case 'ollama':
        return this.filterWithOllama(query, documents);
      case 'huggingface':
        return this.filterWithHuggingFace(query, documents);
      case 'openai':
      default:
        return this.filterWithOpenAI(query, documents);
    }
  }

  /**
   * OPTION 1: Google Gemini (FREE - 60 req/min)
   */
  private filterWithGemini(query: string, documents: PDFDocument[]): Observable<PDFDocument[]> {
    const documentList = documents.map((doc, index) =>
      `${index + 1}. "${doc.name}" in folder "${doc.folder || 'root'}"`
    ).join('\n');

    const prompt = this.buildPrompt(query, documentList);

    const useServerless = (environment as any).useServerlessFunction;
    const model = (environment as any).geminiModel || 'gemini-pro';

    let url: string;
    let body: any;

    if (useServerless) {
      // PRODUCTION: Use serverless function (no CORS issues!)
      // Works on Netlify: /.netlify/functions/gemini-proxy
      // Works on Vercel: /api/gemini-proxy
      url = window.location.hostname.includes('netlify')
        ? '/.netlify/functions/gemini-proxy'
        : '/api/gemini-proxy';

      body = {
        model: model,
        body: {
          contents: [{
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 200
          }
        }
      };
    } else {
      // DEVELOPMENT: Direct API call (has CORS issues in browser)
      const apiKey = (environment as any).geminiApiKey;
      url = `${this.GEMINI_API_URL}/models/${model}:generateContent?key=${apiKey}`;
      body = {
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 200
        }
      };
    }

    return this.http.post<any>(url, body).pipe(
      map(response => {
        console.log('Gemini API response:', response);
        if (response?.candidates?.[0]?.content?.parts?.[0]?.text) {
          return this.parseAIResponse(response.candidates[0].content.parts[0].text, documents);
        }
        console.warn('Unexpected Gemini response format:', response);
        return documents; // Return all documents if AI fails
      }),
      catchError(error => {
        console.error('Gemini API error:', error);
        console.error('Error details:', {
          status: error.status,
          message: error.message,
          error: error.error
        });
        // If Gemini fails, return all documents so user can still browse
        return of(documents);
      })
    );
  }

  /**
   * OPTION 2: Ollama (100% FREE - LOCAL)
   */
  private filterWithOllama(query: string, documents: PDFDocument[]): Observable<PDFDocument[]> {
    const documentList = documents.map((doc, index) =>
      `${index + 1}. "${doc.name}" in folder "${doc.folder || 'root'}"`
    ).join('\n');

    const prompt = this.buildPrompt(query, documentList);

    const baseUrl = (environment as any).ollamaBaseUrl || 'http://localhost:11434';
    const model = (environment as any).ollamaModel || 'llama3.1';
    const url = `${baseUrl}/api/generate`;

    const body = {
      model: model,
      prompt: prompt,
      stream: false,
      options: {
        temperature: 0.3,
        num_predict: 200
      }
    };

    return this.http.post<any>(url, body).pipe(
      map(response => this.parseAIResponse(response.response, documents)),
      catchError(error => {
        console.error('Ollama error:', error);
        console.warn('Make sure Ollama is running: ollama serve');
        return of([]);
      })
    );
  }

  /**
   * OPTION 3: HuggingFace (FREE TIER - 30k chars/month)
   */
  private filterWithHuggingFace(query: string, documents: PDFDocument[]): Observable<PDFDocument[]> {
    const documentList = documents.map((doc, index) =>
      `${index + 1}. "${doc.name}" in folder "${doc.folder || 'root'}"`
    ).join('\n');

    const prompt = this.buildPrompt(query, documentList);

    const token = (environment as any).huggingfaceToken;
    const model = (environment as any).huggingfaceModel;
    const url = `${this.HUGGINGFACE_API_URL}/${model}`;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const body = {
      inputs: prompt,
      parameters: {
        max_new_tokens: 200,
        temperature: 0.3,
        return_full_text: false
      }
    };

    return this.http.post<any>(url, body, { headers }).pipe(
      map(response => {
        const text = Array.isArray(response) ? response[0].generated_text : response.generated_text;
        return this.parseAIResponse(text, documents);
      }),
      catchError(error => {
        console.error('HuggingFace API error:', error);
        return of([]);
      })
    );
  }

  /**
   * OPTION 4: OpenAI (PAID)
   */
  private filterWithOpenAI(query: string, documents: PDFDocument[]): Observable<PDFDocument[]> {
    const documentList = documents.map((doc, index) =>
      `${index + 1}. "${doc.name}" in folder "${doc.folder || 'root'}"`
    ).join('\n');

    const prompt = this.buildPrompt(query, documentList);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${(environment as any).openaiApiKey}`
    });

    const body = {
      model: (environment as any).openaiModel || 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant that returns only valid JSON arrays.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.3,
      max_tokens: 200
    };

    return this.http.post<any>(this.OPENAI_API_URL, body, { headers }).pipe(
      map(response => this.parseAIResponse(response.choices[0].message.content, documents)),
      catchError(error => {
        console.error('OpenAI API error:', error);
        return of([]);
      })
    );
  }

  /**
   * Build the prompt for all AI engines
   */
  private buildPrompt(query: string, documentList: string): string {
    return `You are an expert in Orthodox Christianity, Byzantine music, and liturgical documents.

User's search query: "${query}"

Available PDF documents:
${documentList}

Task: Analyze the user's query and identify which PDFs are most relevant. Consider:
- Saint feast days and names
- Liturgical seasons (Great Lent, Nativity, Pascha, etc.)
- Byzantine musical notation terms
- Service types (Orthros, Vespers, Liturgy, etc.)
- Church calendar dates

Respond ONLY with a JSON array of document numbers (1-based index) in order of relevance.
Example: [5, 12, 3, 8]

If no documents match, respond with an empty array: []`;
  }

  /**
   * Parse AI response and map to documents
   */
  private parseAIResponse(content: string, documents: PDFDocument[]): PDFDocument[] {
    try {
      // Extract JSON array from response (handles various formats)
      const jsonMatch = content.match(/\[[\d,\s]+\]/);
      if (!jsonMatch) {
        console.warn('No JSON array found in response:', content);
        return [];
      }

      const indices = JSON.parse(jsonMatch[0]) as number[];

      // Map indices back to documents
      return indices
        .map(idx => documents[idx - 1])
        .filter(doc => doc !== undefined)
        .map((doc, rank) => ({
          ...doc,
          relevanceScore: 100 - (rank * 5) // Assign relevance scores
        }));
    } catch (error) {
      console.error('Error parsing AI response:', error);
      return [];
    }
  }  /**
   * Enhanced search with PDF content analysis (slower but more accurate)
   */
  async searchWithContent(query: string, topCandidates: PDFDocument[]): Promise<PDFDocument[]> {
    // Limit to top 5 candidates to avoid too many API calls
    const candidates = topCandidates.slice(0, 5);

    // Download and extract text from candidates
    const extractionPromises = candidates.map(async doc => {
      try {
        const response = await this.http.get(doc.downloadLink, {
          responseType: 'arraybuffer'
        }).toPromise();

        if (response) {
          const text = await this.pdfExtractor.extractPreview(response, 1000);
          doc.excerpt = text;
        }
      } catch (error) {
        console.error(`Failed to extract content from ${doc.name}:`, error);
      }
      return doc;
    });

    return Promise.all(extractionPromises);
  }
}

// Add missing import
import { switchMap } from 'rxjs/operators';
