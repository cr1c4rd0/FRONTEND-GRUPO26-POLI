import { Component, inject, signal, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NewsService } from '../../services/news.service';
import { NewsItem } from '../../models/news.model';

@Component({
  selector: 'app-search-modal',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    @if (isOpen()) {
      <div class="modal fade show d-block modal-custom-backdrop" tabindex="-1" style="background: rgba(10, 13, 20, 0.85); backdrop-filter: blur(8px);" (click)="closeOnBackdrop($event)">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content modal-content-dark" (click)="$event.stopPropagation()">
            <div class="modal-header modal-header-dark border-bottom border-secondary border-opacity-25 p-3">
              <div class="d-flex align-items-center gap-3 w-100">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input 
                  type="text" 
                  class="form-control border-0 bg-transparent text-white shadow-none" 
                  style="font-size: 1.1rem;"
                  placeholder="Buscar por título, categoría o palabra clave..." 
                  [(ngModel)]="query"
                  (ngModelChange)="onSearchChange($event)"
                  autofocus>
              </div>
              <button type="button" class="btn-close btn-close-white ms-2" (click)="close()"></button>
            </div>
            
            <div class="modal-body p-3" style="max-height: 420px; overflow-y: auto;">
              @if (query().trim().length === 0) {
                <p class="text-center text-muted py-4 mb-0">Escribe al menos una palabra para buscar...</p>
              } @else if (results().length === 0) {
                <p class="text-center text-muted py-4 mb-0">No se encontraron noticias con "{{ query() }}".</p>
              } @else {
                <div class="d-flex flex-column gap-2">
                  @for (news of results(); track news.id) {
                    <a [routerLink]="['/detalle', news.id]" (click)="close()" class="d-flex align-items-center gap-3 p-2 rounded text-decoration-none border-bottom border-dark" style="color: var(--text-primary); transition: background 0.15s;">
                      <img [src]="news.image" [alt]="news.title" style="width: 48px; height: 48px; object-fit: cover; border-radius: 6px;">
                      <div class="overflow-hidden">
                        <div class="text-truncate fw-semibold" style="font-size: 0.95rem;">{{ news.title }}</div>
                        <div style="font-size: 0.8rem; color: var(--text-secondary);">{{ news.category }} · {{ news.date }}</div>
                      </div>
                    </a>
                  }
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    }
  `
})
export class SearchModalComponent {
  newsService = inject(NewsService);
  isOpen = model<boolean>(false);
  query = signal<string>('');
  results = signal<NewsItem[]>([]);

  onSearchChange(term: string) {
    const clean = term.trim().toLowerCase();
    if (!clean) {
      this.results.set([]);
      return;
    }

    const matches = this.newsService.news().filter(n =>
      n.title.toLowerCase().includes(clean) ||
      n.excerpt.toLowerCase().includes(clean) ||
      n.category.toLowerCase().includes(clean)
    );
    this.results.set(matches);
  }

  close() {
    this.isOpen.set(false);
    this.query.set('');
    this.results.set([]);
  }

  closeOnBackdrop(e: MouseEvent) {
    this.close();
  }
}
