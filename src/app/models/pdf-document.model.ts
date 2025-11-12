export interface PDFDocument {
  id: string;
  name: string;
  fullPath: string;
  folder: string;
  webViewLink: string;
  downloadLink: string;
  size: number;
  modifiedTime: Date;
  relevanceScore?: number;
  excerpt?: string;
}

export interface SearchRequest {
  query: string;
  maxResults?: number;
}

export interface SearchResponse {
  documents: PDFDocument[];
  totalFound: number;
  searchTime: number;
}
