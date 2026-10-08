import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { NewsService } from '../../services/news.service';
import { ToastService } from '../../services/toast.service';
import { NewsCardComponent } from '../../components/news-card/news-card.component';
import { NewsItem } from '../../models/news.model';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, NewsCardComponent],
  template: `
    <main class="detail-article-wrap">
      <div class="container" style="max-width: 1320px;" id="detail-page-container">
        @if (currentNews(); as news) {
          <article class="article-detail">
            <!-- Migas de pan (Breadcrumb) -->
            <nav class="breadcrumb-nav" aria-label="breadcrumb">
              <a routerLink="/">Inicio</a>
              <span class="breadcrumb-separator">›</span>
              <a routerLink="/" fragment="categorias">{{ news.category }}</a>
              <span class="breadcrumb-separator">›</span>
              <span class="breadcrumb-active text-truncate" style="max-width: 400px;">{{ news.title }}</span>
            </nav>

            <!-- Tag de Categoría -->
            <span class="detail-tag-pill" [style.backgroundColor]="news.categoryColor || 'var(--accent-primary)'" style="color: #0A0D14;">
              {{ news.category | uppercase }}
            </span>

            <!-- Título Principal -->
            <h1 class="detail-title">{{ news.title }}</h1>

            <!-- Barra de Autor y Botones de Interacción -->
            <div class="detail-byline-bar">
              <div class="byline-author-box">
                <div class="author-avatar-circle" [style.backgroundColor]="news.author.avatarColor || 'var(--accent-primary)'" style="width: 44px; height: 44px; font-size: 0.95rem;">
                  {{ news.author.initials }}
                </div>
                <div>
                  <div class="author-name-bold" style="font-size: 1rem;">{{ news.author.name }}</div>
                  <div class="author-role-sub">
                    {{ news.author.role }} · {{ news.date }} · {{ news.readTimeFull || news.readTime }}
                  </div>
                </div>
              </div>

              <!-- Botones de Interacción (Favorito, Compartir, Marcador) -->
              <div class="detail-action-buttons">
                <button 
                  type="button" 
                  class="detail-action-btn" 
                  [class.is-active]="isFav()" 
                  id="detail-btn-fav" 
                  (click)="handleFavClick(news.id)" 
                  title="Añadir a favoritos" 
                  aria-label="Favorito">
                  <svg width="18" height="18" viewBox="0 0 24 24" [attr.fill]="isFav() ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                </button>

                <button type="button" class="detail-action-btn" (click)="handleShareClick()" title="Compartir noticia" aria-label="Compartir">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="18" cy="5" r="3"></circle>
                    <circle cx="6" cy="12" r="3"></circle>
                    <circle cx="18" cy="19" r="3"></circle>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                  </svg>
                </button>

                <button type="button" class="detail-action-btn" (click)="handleBookmarkClick()" title="Guardar marcador" aria-label="Marcador">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Imagen Hero Representativa -->
            <div class="detail-hero-image-wrap">
              <img [src]="news.image" [alt]="news.title">
            </div>

            <!-- Cuerpo del Artículo y Ficha de Datos Clave -->
            <div class="row g-5">
              <div class="col-lg-8">
                <div class="article-content-body">
                  <p>{{ paragraphs()[0] || news.excerpt }}</p>
                  
                  @if (news.pullQuote) {
                    <div class="pull-quote-box">
                      <p class="pull-quote-text">{{ news.pullQuote }}</p>
                    </div>
                  }

                  @for (p of paragraphs().slice(1); track $index) {
                    <p>{{ p }}</p>
                  }
                </div>
              </div>

              <!-- Columna Lateral: Datos Clave -->
              <div class="col-lg-4">
                <div class="key-facts-card">
                  <h3 class="key-facts-title">Datos clave</h3>
                  @for (fact of news.keyFacts || defaultFacts; track fact.label) {
                    <div class="key-fact-row">
                      <span class="fact-label">{{ fact.label }}</span>
                      <span class="fact-value">{{ fact.value }}</span>
                    </div>
                  }
                </div>
              </div>
            </div>

            <!-- Sección de Noticias Relacionadas -->
            <section class="related-news-section mt-5 pt-4" aria-label="Noticias relacionadas">
              <h2 class="section-heading mb-4">Noticias relacionadas</h2>
              <div class="news-cards-grid">
                @for (rel of relatedNews(); track rel.id) {
                  <app-news-card [news]="rel" />
                }
              </div>
            </section>
          </article>
        } @else {
          <div class="py-5 text-center">
            <h2>Noticia no encontrada</h2>
            <p class="text-muted">El artículo que estás buscando no existe o fue eliminado.</p>
            <a routerLink="/" class="btn-primary-purple mt-3">Volver al inicio</a>
          </div>
        }
      </div>
    </main>
  `
})
export class DetailComponent {
  private route = inject(ActivatedRoute);
  newsService = inject(NewsService);
  toastService = inject(ToastService);

  readonly defaultFacts = [
    { label: "Precisión reportada", value: "94.2%" },
    { label: "Imágenes de entrenamiento", value: "2.1 millones" },
    { label: "Hospitales piloto", value: "12 países" },
    { label: "Fase de despliegue", value: "2027" }
  ];

  // Observamos cambios de parámetros en la URL
  paramsSignal = toSignal(this.route.params);

  currentNews = computed<NewsItem | null>(() => {
    const params = this.paramsSignal();
    const id = params ? params['id'] : null;
    const all = this.newsService.news();
    if (!all.length) return null;
    if (id) {
      return all.find(n => n.id === id) || all[0];
    }
    return all.find(n => n.id === 'NEWS-06') || all[0];
  });

  paragraphs = computed(() => {
    const news = this.currentNews();
    if (!news || !news.content) return [];
    return news.content.split('\n\n').filter(p => p.trim());
  });

  relatedNews = computed(() => {
    const current = this.currentNews();
    const all = this.newsService.news();
    if (!current) return all.slice(0, 3);
    return all.filter(n => n.id !== current.id).slice(0, 3);
  });

  isFav(): boolean {
    const n = this.currentNews();
    return n ? this.newsService.isFavorite(n.id) : false;
  }

  handleFavClick(id: string) {
    const added = this.newsService.toggleFavorite(id);
    if (added) {
      this.toastService.success('Artículo añadido a tus favoritos');
    } else {
      this.toastService.info('Artículo eliminado de tus favoritos');
    }
  }

  handleShareClick() {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).then(() => {
        this.toastService.success('Enlace copiado al portapapeles');
      }).catch(() => {
        this.toastService.info('Enlace: ' + window.location.href);
      });
    } else {
      this.toastService.info('Enlace preparado para compartir');
    }
  }

  handleBookmarkClick() {
    this.toastService.info('Marcador guardado en sesión local');
  }
}
