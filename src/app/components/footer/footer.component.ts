import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="site-footer">
      <div class="container" style="max-width: 1320px;">
        <div class="row g-4">
          <!-- Columna 1: Identidad -->
          <div class="col-lg-4 col-md-6">
            <a routerLink="/" class="brand-logo mb-3 d-inline-flex">
              <div class="brand-icon-wrap">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
              </div>
              <span class="brand-text">SYNAPSE.TECH</span>
            </a>
            <p style="color: var(--text-secondary); font-size: 0.92rem; max-width: 320px;">
              Periodismo tecnológico con enfoque en IA, hardware, software y ciberseguridad. Noticias verificadas, análisis claros.
            </p>
          </div>

          <!-- Columna 2: Secciones -->
          <div class="col-lg-2 col-md-6 col-6">
            <h3 class="footer-col-title">Secciones</h3>
            <ul class="footer-nav-list">
              <li><a routerLink="/" fragment="categorias">Inteligencia Artificial</a></li>
              <li><a routerLink="/" fragment="categorias">Hardware</a></li>
              <li><a routerLink="/" fragment="categorias">Software</a></li>
              <li><a routerLink="/" fragment="categorias">Ciberseguridad</a></li>
              <li><a routerLink="/" fragment="categorias">Startups</a></li>
            </ul>
          </div>

          <!-- Columna 3: Compañía -->
          <div class="col-lg-3 col-md-6 col-6">
            <h3 class="footer-col-title">Compañía</h3>
            <ul class="footer-nav-list">
              <li><a routerLink="/perfil">Sobre nosotros</a></li>
              <li><a routerLink="/admin">Equipo editorial</a></li>
              <li><a routerLink="/contacto">Contacto</a></li>
              <li><a routerLink="/contacto">Trabaja con nosotros</a></li>
            </ul>
          </div>

          <!-- Columna 4: Legal -->
          <div class="col-lg-3 col-md-6">
            <h3 class="footer-col-title">Legal</h3>
            <ul class="footer-nav-list">
              <li><a href="#!">Términos de uso</a></li>
              <li><a href="#!">Privacidad</a></li>
              <li><a href="#!">Cookies</a></li>
            </ul>
          </div>
        </div>

        <!-- Barra inferior -->
        <div class="footer-sub-bar">
          <span>© 2026 SYNAPSE.TECH — Proyecto académico Politécnico Grancolombiano</span>
          <span>Desarrollado con Angular · Grupo 26</span>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}
