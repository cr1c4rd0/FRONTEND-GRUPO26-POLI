import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewsItem } from '../../models/news.model';
import { NewsService } from '../../services/news.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <article class="news-card" [attr.data-id]="news.id" [attr.data-category]="news.category">
      <div class="news-card-image-wrap">
        <img [src]="news.image" [alt]="news.title" loading="lazy">
        <span class="badge-category" [ngClass]="getBadgeClass(news.category)">
          {{ news.category }}
        </span>
        <button 
          type="button" 
          class="btn-card-favorite" 
          [class.is-active]="isFav()" 
          (click)="handleFavClick($event)" 
          [title]="isFav() ? 'Quitar de favoritos' : 'Añadir a favoritos'" 
          aria-label="Favorito">
          <svg width="18" height="18" viewBox="0 0 24 24" [attr.fill]="isFav() ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
          </svg>
        </button>
      </div>

      <div class="news-card-body">
        <h3 class="news-card-title">
          <a [routerLink]="['/detalle', news.id]">{{ news.title }}</a>
        </h3>
        <p class="news-card-excerpt">{{ news.excerpt }}</p>
        <div class="news-card-footer">
          <div class="news-card-time">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>{{ news.date }} · {{ news.readTime }}</span>
          </div>
          <a [routerLink]="['/detalle', news.id]" class="news-card-btn-action">
            Leer más
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
    </article>
  `
})
export class NewsCardComponent {
  @Input({ required: true }) news!: NewsItem;
  @Output() favToggled = new EventEmitter<boolean>();

  newsService = inject(NewsService);
  toastService = inject(ToastService);

  isFav(): boolean {
    return this.newsService.isFavorite(this.news.id);
  }

  handleFavClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    const added = this.newsService.toggleFavorite(this.news.id);
    if (added) {
      this.toastService.success('Noticia guardada en favoritos');
    } else {
      this.toastService.info('Noticia removida de favoritos');
    }
    this.favToggled.emit(added);
  }

  getBadgeClass(category: string): string {
    const norm = (category || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (norm.includes('ia') || norm.includes('inteligencia')) return 'badge-tag-ia';
    if (norm.includes('hardware')) return 'badge-tag-hardware';
    if (norm.includes('software')) return 'badge-tag-software';
    if (norm.includes('seguridad') || norm.includes('ciberseguridad')) return 'badge-tag-security';
    if (norm.includes('startup')) return 'badge-tag-startups';
    return 'badge-tag-ia';
  }
}
