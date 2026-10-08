import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { ToastService } from '../../services/toast.service';
import { NewsCardComponent } from '../../components/news-card/news-card.component';
import { NewsItem } from '../../models/news.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, NewsCardComponent],
  template: `
    <div class="container" style="max-width: 1320px;">
      
      <!-- Sección Hero: Noticia Destacada -->
      @if (featured(); as hero) {
        <section class="hero-section" id="hero-featured-section" aria-label="Noticia destacada">
          <div class="hero-grid" id="hero-grid-container">
            <div class="hero-left-content">
              <div class="eyebrow-tag">
                <span>DESTACADO · {{ hero.category | uppercase }}</span>
              </div>
              <h1 class="hero-title">
                <a [routerLink]="['/detalle', hero.id]">{{ hero.title }}</a>
              </h1>
              <p class="hero-excerpt">
                {{ hero.excerpt }}
              </p>
              <div class="author-meta-row">
                <div class="author-avatar-circle" [style.backgroundColor]="hero.author.avatarColor || 'var(--accent-primary)'">
                  {{ hero.author.initials }}
                </div>
                <span class="author-name-bold">{{ hero.author.name }}</span>
                <span class="meta-dot">·</span>
                <span>{{ hero.date }}</span>
                <span class="meta-dot">·</span>
                <span>{{ hero.readTimeFull || hero.readTime }}</span>
              </div>
              <div class="hero-actions">
                <a [routerLink]="['/detalle', hero.id]" class="btn-primary-purple" id="hero-btn-read">
                  <span>Leer artículo completo</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </a>
                <button 
                  type="button" 
                  class="btn-secondary-dark" 
                  [class.is-fav]="isHeroFav()" 
                  id="hero-btn-save" 
                  (click)="handleHeroFavClick(hero.id)">
                  <svg width="16" height="16" viewBox="0 0 24 24" [attr.fill]="isHeroFav() ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                  </svg>
                  <span>{{ isHeroFav() ? 'Guardado' : 'Guardar' }}</span>
                </button>
              </div>
            </div>
            
            <div class="hero-right-content">
              <div class="hero-image-wrap">
                <a [routerLink]="['/detalle', hero.id]">
                  <img [src]="hero.image" [alt]="hero.title">
                </a>
              </div>
            </div>
          </div>
        </section>
      }

      <!-- Barra de Filtros por Categoría -->
      <section id="categorias" class="category-filter-bar" aria-label="Filtro de categorías">
        @for (cat of categories; track cat.id) {
          <button 
            type="button" 
            class="category-pill-btn" 
            [class.active]="selectedCategory() === cat.id" 
            (click)="setCategory(cat.id)">
            {{ cat.label }}
          </button>
        }
      </section>

      <!-- Sección de Catálogo: Últimas Noticias -->
      <section class="latest-news-section py-4" id="catalogo-noticias" aria-label="Catálogo de noticias">
        <div class="section-header-row">
          <h2 class="section-heading" id="catalogo-heading">Últimas noticias</h2>
          <button type="button" class="btn btn-link link-arrow p-0 text-decoration-none" (click)="setCategory('todas')">
            <span>Ver todas</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </button>
        </div>

        <!-- Contenedor del Grid Dinámico de Cards -->
        @if (filteredNews().length === 0) {
          <div class="py-5 text-center">
            <p class="text-muted fs-5">No hay noticias disponibles en la categoría seleccionada.</p>
          </div>
        } @else {
          <div class="news-cards-grid" id="news-cards-container">
            @for (item of filteredNews(); track item.id) {
              <app-news-card [news]="item" />
            }
          </div>
        }
      </section>

    </div>
  `
})
export class HomeComponent {
  newsService = inject(NewsService);
  toastService = inject(ToastService);

  readonly categories = [
    { id: 'todas', label: 'Todas' },
    { id: 'Inteligencia Artificial', label: 'Inteligencia Artificial' },
    { id: 'Hardware', label: 'Hardware' },
    { id: 'Software', label: 'Software' },
    { id: 'Ciberseguridad', label: 'Ciberseguridad' },
    { id: 'Startups', label: 'Startups' }
  ];

  selectedCategory = signal<string>('todas');

  featured = computed(() => this.newsService.featuredNews());

  filteredNews = computed(() => {
    const cat = this.selectedCategory();
    const all = this.newsService.news();
    if (cat === 'todas') return all;
    return all.filter(item => item.category.toLowerCase() === cat.toLowerCase());
  });

  isHeroFav(): boolean {
    const hero = this.featured();
    return hero ? this.newsService.isFavorite(hero.id) : false;
  }

  setCategory(cat: string) {
    this.selectedCategory.set(cat);
  }

  handleHeroFavClick(id: string) {
    const added = this.newsService.toggleFavorite(id);
    if (added) {
      this.toastService.success('Artículo destacado guardado en favoritos');
    } else {
      this.toastService.info('Artículo destacado removido de favoritos');
    }
  }
}
