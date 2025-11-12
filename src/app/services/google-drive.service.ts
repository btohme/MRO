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

    // First, get all folders and PDFs recursively
    return from(this.getAllPDFsRecursively(folderId, apiKey));
  }

  /**
   * Recursively get all PDFs from a folder and its subfolders
   */
  private async getAllPDFsRecursively(folderId: string, apiKey: string): Promise<PDFDocument[]> {
    const allPDFs: any[] = [];
    const foldersToProcess = [{ id: folderId, path: '' }];
    const folderCache: { [key: string]: string } = {};

    while (foldersToProcess.length > 0) {
      const currentFolder = foldersToProcess.shift()!;

      try {
        // Get all items (PDFs and folders) in current folder
        const query = `'${currentFolder.id}' in parents and trashed=false`;
        const url = `${this.DRIVE_API_BASE}/files?` +
          `q=${encodeURIComponent(query)}` +
          `&key=${apiKey}` +
          `&fields=files(id,name,mimeType,parents,webViewLink,size,modifiedTime)` +
          `&pageSize=1000`;

        const response = await this.http.get<any>(url).toPromise();
        const items = response?.files || [];

        for (const item of items) {
          if (item.mimeType === 'application/pdf') {
            // It's a PDF - add to results with folder path
            allPDFs.push({
              ...item,
              folderPath: currentFolder.path
            });
          } else if (item.mimeType === 'application/vnd.google-apps.folder') {
            // It's a subfolder - add to queue for processing
            const subfolderPath = currentFolder.path 
              ? `${currentFolder.path}/${item.name}` 
              : item.name;
            foldersToProcess.push({ 
              id: item.id, 
              path: subfolderPath 
            });
          }
        }
      } catch (error) {
        console.error(`Error fetching folder ${currentFolder.id}:`, error);
      }
    }

    // Convert to PDFDocument format
    return allPDFs.map(file => ({
      id: file.id,
      name: file.name,
      fullPath: file.folderPath ? `${file.folderPath}/${file.name}` : file.name,
      folder: file.folderPath || 'Root',
      webViewLink: file.webViewLink || `https://drive.google.com/file/d/${file.id}/view`,
      downloadLink: `https://drive.google.com/uc?export=download&id=${file.id}`,
      size: parseInt(file.size || '0'),
      modifiedTime: new Date(file.modifiedTime)
    }));
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
