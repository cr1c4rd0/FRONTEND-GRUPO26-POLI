import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { SearchModalComponent } from '../search-modal/search-modal.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, SearchModalComponent],
  template: `
    <header class="site-header" id="site-header">
      <div class="navbar-container">
        <!-- Logotipo -->
        <a routerLink="/" class="brand-logo" id="brand-logo" aria-label="SYNAPSE.TECH Inicio">
          <div class="brand-icon-wrap">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
          </div>
          <span class="brand-text">SYNAPSE.TECH</span>
        </a>

        <!-- Menú de Navegación Principal -->
        <nav aria-label="Navegación principal">
          <ul class="main-nav" id="main-nav-links">
            <li>
              <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-link-custom" id="nav-link-inicio">
                Inicio
              </a>
            </li>
            <li>
              <a routerLink="/" fragment="categorias" class="nav-link-custom" id="nav-link-categorias">
                Categorías
              </a>
            </li>
            <li>
              <a routerLink="/favoritos" routerLinkActive="active" class="nav-link-custom" id="nav-link-favoritos">
                Favoritos <span class="nav-fav-badge" id="nav-fav-counter">{{ newsService.favoriteCount() }}</span>
              </a>
            </li>
            <li>
              <a routerLink="/contacto" routerLinkActive="active" class="nav-link-custom" id="nav-link-contacto">
                Contacto
              </a>
            </li>
            <li>
              <a routerLink="/admin" routerLinkActive="active" class="nav-link-custom" id="nav-link-admin">
                Admin
              </a>
            </li>
          </ul>
        </nav>

        <!-- Acciones de Cabecera (Buscador y Perfil) -->
        <div class="header-actions">
          <button type="button" class="icon-btn" id="btn-open-search" (click)="isSearchOpen.set(true)" aria-label="Buscar noticias" title="Buscar noticias">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>

          <a routerLink="/perfil" class="user-profile-btn" id="user-profile-btn" aria-label="Perfil de usuario">
            <div class="user-avatar-mini">
              <img [src]="newsService.profile().avatarUrl" [alt]="newsService.profile().name">
            </div>
            <span>{{ newsService.profile().name }}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </header>

    <app-search-modal [(isOpen)]="isSearchOpen" />
  `
})
export class HeaderComponent {
  newsService = inject(NewsService);
  isSearchOpen = signal<boolean>(false);
}
