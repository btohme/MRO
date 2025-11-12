import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { PDFDocument } from '../models/pdf-document.model';

@Injectable({
  providedIn: 'root'
})
export class GoogleDriveService {
  private readonly DRIVE_API_BASE = 'https://www.googleapis.com/drive/v3';

  constructor(private http: HttpClient) {}

  /**
   * List all PDF files from a Google Drive folder (including subfolders)
   */
  listPDFFiles(): Observable<PDFDocument[]> {
    const folderId = environment.googleDriveFolderId;
    const apiKey = environment.googleApiKey;

    // Query to get all PDFs recursively
    const query = `'${folderId}' in parents and mimeType='application/pdf' and trashed=false`;

    const url = `${this.DRIVE_API_BASE}/files?` +
      `q=${encodeURIComponent(query)}` +
      `&key=${apiKey}` +
      `&fields=files(id,name,parents,webViewLink,size,modifiedTime)` +
      `&pageSize=1000`;

    return this.http.get<any>(url).pipe(
      switchMap(response => this.enrichWithFolderPaths(response.files || [])),
      catchError(error => {
        console.error('Error fetching files from Google Drive:', error);
        return of([]);
      })
    );
  }

  /**
   * Get folder structure to build full paths
   */
  private enrichWithFolderPaths(files: any[]): Observable<PDFDocument[]> {
    return from(this.buildFolderPaths(files));
  }

  private async buildFolderPaths(files: any[]): Promise<PDFDocument[]> {
    const folderCache: { [key: string]: string } = {};
    const documents: PDFDocument[] = [];

    // Helper to get folder name
    const getFolderPath = async (parentIds: string[]): Promise<string> => {
      if (!parentIds || parentIds.length === 0) return '';

      const parentId = parentIds[0];
      if (folderCache[parentId]) return folderCache[parentId];

      try {
        const url = `${this.DRIVE_API_BASE}/files/${parentId}?` +
          `key=${environment.googleApiKey}&fields=name,parents`;

        const response = await this.http.get<any>(url).toPromise();
        const folderName = response?.name || '';
        folderCache[parentId] = folderName;

        return folderName;
      } catch (error) {
        return '';
      }
    };

    for (const file of files) {
      const folderPath = await getFolderPath(file.parents || []);

      documents.push({
        id: file.id,
        name: file.name,
        fullPath: folderPath ? `${folderPath}/${file.name}` : file.name,
        folder: folderPath,
        webViewLink: file.webViewLink || `https://drive.google.com/file/d/${file.id}/view`,
        downloadLink: `https://drive.google.com/uc?export=download&id=${file.id}`,
        size: parseInt(file.size || '0'),
        modifiedTime: new Date(file.modifiedTime)
      });
    }

    return documents;
  }

  /**
   * Get PDF content as text for AI processing
   */
  async getPDFText(document: PDFDocument): Promise<string> {
    try {
      // Download PDF from Google Drive
      const response = await this.http.get(document.downloadLink, {
        responseType: 'arraybuffer'
      }).toPromise();

      if (!response) return '';

      // Extract text using pdf.js (will be implemented in PdfExtractorService)
      return `[PDF: ${document.name} from folder: ${document.folder}]`;

    } catch (error) {
      console.error(`Error downloading PDF ${document.name}:`, error);
      return '';
    }
  }
}
