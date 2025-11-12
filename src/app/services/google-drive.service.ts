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
   * Uses a single query to get ALL PDFs under the folder tree
   */
  listPDFFiles(): Observable<PDFDocument[]> {
    const folderId = environment.googleDriveFolderId;
    const apiKey = environment.googleApiKey;

    console.log('🔍 Fetching PDFs from Google Drive folder:', folderId);

    return from(this.getAllPDFsEfficiently(folderId, apiKey));
  }

  /**
   * Efficiently get all PDFs - first get all folders, then all PDFs
   * Limited depth to prevent infinite loops
   */
  private async getAllPDFsEfficiently(folderId: string, apiKey: string): Promise<PDFDocument[]> {
    try {
      console.log('📡 Step 1: Getting all folders...');
      
      // Step 1: Get all folders under root (up to 3 levels deep for safety)
      const allFolderIds = await this.getAllFolderIds(folderId, apiKey, 3);
      console.log(`✅ Found ${allFolderIds.length} folder(s) total`);

      // Step 2: Search for PDFs in all these folders (one query!)
      const folderIdList = allFolderIds.map(f => f.id).join(`' in parents or '`);
      const query = `('${folderIdList}' in parents) and mimeType='application/pdf' and trashed=false`;
      
      const url = `${this.DRIVE_API_BASE}/files?` +
        `q=${encodeURIComponent(query)}` +
        `&key=${apiKey}` +
        `&fields=files(id,name,parents,webViewLink,size,modifiedTime)` +
        `&pageSize=1000`;

      console.log('📡 Step 2: Getting all PDFs...');
      const response = await this.http.get<any>(url).toPromise();
      const files = response?.files || [];
      
      console.log(`✅ Found ${files.length} PDF(s)`);

      // Step 3: Build folder path map
      const folderMap = new Map(allFolderIds.map(f => [f.id, f.path]));
      
      // Step 4: Create documents with folder paths
      const documents: PDFDocument[] = files.map((file: any) => {
        const parentId = file.parents?.[0];
        const folderPath = parentId ? folderMap.get(parentId) || 'Root' : 'Root';

        return {
          id: file.id,
          name: file.name,
          fullPath: folderPath !== 'Root' ? `${folderPath}/${file.name}` : file.name,
          folder: folderPath,
          webViewLink: file.webViewLink || `https://drive.google.com/file/d/${file.id}/view`,
          downloadLink: `https://drive.google.com/uc?export=download&id=${file.id}`,
          size: parseInt(file.size || '0'),
          modifiedTime: new Date(file.modifiedTime)
        };
      });
      
      console.log(`🎉 Processed ${documents.length} total PDF(s)`);
      return documents;

    } catch (error) {
      console.error('❌ Error fetching PDFs:', error);
      return [];
    }
  }

  /**
   * Get all folder IDs recursively (breadth-first, with depth limit)
   */
  private async getAllFolderIds(rootId: string, apiKey: string, maxDepth: number): Promise<{id: string, path: string}[]> {
    const result = [{id: rootId, path: 'Root'}];
    const queue = [{id: rootId, path: 'Root', depth: 0}];

    while (queue.length > 0) {
      const current = queue.shift()!;
      
      if (current.depth >= maxDepth) continue; // Stop at max depth

      try {
        const query = `'${current.id}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`;
        const url = `${this.DRIVE_API_BASE}/files?` +
          `q=${encodeURIComponent(query)}` +
          `&key=${apiKey}` +
          `&fields=files(id,name)` +
          `&pageSize=100`;

        const response = await this.http.get<any>(url).toPromise();
        const folders = response?.files || [];

        for (const folder of folders) {
          const folderPath = current.path === 'Root' ? folder.name : `${current.path}/${folder.name}`;
          result.push({id: folder.id, path: folderPath});
          queue.push({id: folder.id, path: folderPath, depth: current.depth + 1});
        }
      } catch (error) {
        console.error(`Error fetching subfolders for ${current.id}:`, error);
      }
    }

    return result;
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
