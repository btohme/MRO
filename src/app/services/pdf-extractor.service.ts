import { Injectable } from '@angular/core';

declare const pdfjsLib: any;

@Injectable({
  providedIn: 'root'
})
export class PdfExtractorService {
  private pdfjsInitialized = false;

  constructor() {
    this.initializePdfJs();
  }

  private async initializePdfJs() {
    if (this.pdfjsInitialized) return;

    try {
      // Load pdf.js from CDN
      await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js');

      if (typeof pdfjsLib !== 'undefined') {
        pdfjsLib.GlobalWorkerOptions.workerSrc =
          'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        this.pdfjsInitialized = true;
      }
    } catch (error) {
      console.error('Failed to initialize PDF.js:', error);
    }
  }

  private loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve();
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  /**
   * Extract text content from PDF ArrayBuffer
   */
  async extractText(pdfData: ArrayBuffer): Promise<string> {
    if (!this.pdfjsInitialized) {
      await this.initializePdfJs();
    }

    try {
      const loadingTask = pdfjsLib.getDocument({ data: pdfData });
      const pdf = await loadingTask.promise;

      let fullText = '';

      // Extract text from each page (limit to first 10 pages for performance)
      const numPages = Math.min(pdf.numPages, 10);

      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
        fullText += pageText + '\n\n';
      }

      return fullText.trim();
    } catch (error) {
      console.error('Error extracting PDF text:', error);
      return '';
    }
  }

  /**
   * Extract first N characters from PDF for preview
   */
  async extractPreview(pdfData: ArrayBuffer, maxChars: number = 500): Promise<string> {
    const fullText = await this.extractText(pdfData);
    return fullText.substring(0, maxChars) + (fullText.length > maxChars ? '...' : '');
  }
}
