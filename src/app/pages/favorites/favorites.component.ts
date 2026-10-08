import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { NewsCardComponent } from '../../components/news-card/news-card.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterModule, NewsCardComponent],
  template: `
    <main class="favorites-view-wrap">
      <div class="container" style="max-width: 1320px;">
        
        <!-- Cabecera de la sección -->
        <div class="mb-5">
          <div class="eyebrow-tag">
            <span>TU BIBLIOTECA</span>
          </div>
          <h1 class="hero-title mb-2">Noticias favoritas</h1>
          <p class="hero-excerpt mb-0">Aquí encuentras todas las noticias que has guardado para leer más tarde.</p>
        </div>

        <!-- Contenedor dinámico de favoritos -->
        <div id="favorites-content-area">
          @if (newsService.favoriteNews().length === 0) {
            <div class="empty-state-card">
              <div class="empty-state-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
              </div>
              <h3 class="mb-2">Aún no tienes noticias guardadas</h3>
              <p class="text-secondary mb-4" style="max-width: 420px; margin: 0 auto;">
                Explora las últimas novedades de nuestro catálogo y pulsa el icono de corazón en cualquier noticia para guardarla y leerla cuando quieras.
              </p>
              <a routerLink="/" class="btn-primary-purple">
                <span>Explorar noticias</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </a>
            </div>
          } @else {
            <div class="row g-4" id="fav-grid">
              @for (news of newsService.favoriteNews(); track news.id) {
                <div class="col-lg-6 col-12">
                  <app-news-card [news]="news" />
                </div>
              }
            </div>
          }
        </div>

      </div>
    </main>
  `
})
export class FavoritesComponent {
  newsService = inject(NewsService);
}
