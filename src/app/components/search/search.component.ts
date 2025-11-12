import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OpenaiSearchService } from '../../services/openai-search.service';
import { PDFDocument } from '../../models/pdf-document.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchQuery = '';
  isSearching = false;
  searchResults: PDFDocument[] = [];
  hasSearched = false;
  errorMessage = '';
  showCorsWarning = false;

  constructor(private searchService: OpenaiSearchService) {
    // Show CORS warning if using Gemini (which has CORS issues in browser)
    this.showCorsWarning = (environment as any).searchEngine === 'gemini';
  }

  onSearch() {
    if (!this.searchQuery.trim()) {
      return;
    }

    this.isSearching = true;
    this.errorMessage = '';
    this.hasSearched = true;
    this.searchResults = [];

    this.searchService.search(this.searchQuery).subscribe({
      next: (results) => {
        this.searchResults = results;
        this.isSearching = false;
      },
      error: (error) => {
        console.error('Search failed:', error);
        this.errorMessage = 'Search failed. Please check your API configuration.';
        this.isSearching = false;
      }
    });
  }

  openPDF(document: PDFDocument) {
    window.open(document.webViewLink, '_blank');
  }

  downloadPDF(document: PDFDocument, event: Event) {
    event.stopPropagation();
    window.open(document.downloadLink, '_blank');
  }
}
