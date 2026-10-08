/**
 * SYNAPSE.TECH - Lógica Global de la Aplicación
 * Renderizado de Componentes, Navbar, Footer, Búsqueda y Toasts
 * Grupo 26 - Politécnico Grancolombiano
 */

document.addEventListener('DOMContentLoaded', async () => {
  // Asegura inicialización del almacenamiento
  await initStorage();
  
  // Actualiza los badges de favoritos en la barra superior
  updateGlobalFavCount();
  
  // Inicializa componentes globales
  initHeaderInteractions();
  initSearchFeature();
});

/**
 * Mapeo de estilos y clases por categoría
 */
function getCategoryBadgeClass(category) {
  const norm = (category || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  if (norm.includes('ia') || norm.includes('inteligencia')) return 'badge-tag-ia';
  if (norm.includes('hardware')) return 'badge-tag-hardware';
  if (norm.includes('software')) return 'badge-tag-software';
  if (norm.includes('seguridad') || norm.includes('ciberseguridad')) return 'badge-tag-security';
  if (norm.includes('startup')) return 'badge-tag-startups';
  return 'badge-tag-ia';
}

/**
 * Genera el HTML de una tarjeta de noticia individual (News Card)
 */
function createNewsCardHTML(news) {
  const isFav = isFavorite(news.id);
  const badgeClass = getCategoryBadgeClass(news.category);
  const heartFill = isFav ? 'currentColor' : 'none';
  const heartStroke = isFav ? 'currentColor' : 'currentColor';
  const favActiveClass = isFav ? 'is-active' : '';

  return `
    <article class="news-card" data-id="${news.id}" data-category="${news.category}">
      <div class="news-card-image-wrap">
        <img src="${news.image}" alt="${escapeHTML(news.title)}" loading="lazy">
        <span class="badge-category ${badgeClass}">${escapeHTML(news.category)}</span>
        <button type="button" class="btn-card-favorite ${favActiveClass}" onclick="handleCardFavClick(event, '${news.id}')" title="${isFav ? 'Quitar de favoritos' : 'Añadir a favoritos'}" aria-label="Favorito">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="${heartFill}" stroke="${heartStroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
          </svg>
        </button>
      </div>
      <div class="news-card-body">
        <h3 class="news-card-title">
          <a href="detalle.html?id=${news.id}">${escapeHTML(news.title)}</a>
        </h3>
        <p class="news-card-excerpt">${escapeHTML(news.excerpt)}</p>
        <div class="news-card-footer">
          <div class="news-card-time">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>${escapeHTML(news.date)} · ${escapeHTML(news.readTime)}</span>
          </div>
          <a href="detalle.html?id=${news.id}" class="news-card-btn-action">
            Leer más
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
    </article>
  `;
}

/**
 * Maneja el clic en el botón de favorito de una tarjeta
 */
function handleCardFavClick(event, newsId) {
  event.preventDefault();
  event.stopPropagation();
  
  const wasAdded = toggleFavorite(newsId);
  const btn = event.currentTarget;
  const svg = btn.querySelector('svg');
  
  if (wasAdded) {
    btn.classList.add('is-active');
    svg.setAttribute('fill', 'currentColor');
    showToast('Noticia guardada en favoritos', 'success');
  } else {
    btn.classList.remove('is-active');
    svg.setAttribute('fill', 'none');
    showToast('Noticia removida de favoritos', 'info');
    
    // Si estamos en la página de favoritos, actualizar la lista
    if (window.location.pathname.includes('favoritos.html')) {
      const card = btn.closest('.news-card');
      if (card) {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
          renderFavoritesPage();
        }, 220);
      }
    }
  }
}

/**
 * Escapa cadenas para prevenir inyecciones XSS
 */
function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

/**
 * Sistema de Notificaciones Toast Flotantes
 */
function showToast(message, type = 'info') {
  let container = document.getElementById('global-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'global-toast-container';
    container.className = 'toast-container-custom';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-custom';
  
  let iconSvg = '';
  if (type === 'success') {
    iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34D399" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
  } else if (type === 'error') {
    iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F87171" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
  } else {
    iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
  }

  toast.innerHTML = `
    ${iconSvg}
    <span style="font-size: 0.9rem; font-weight: 500;">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => toast.remove(), 260);
  }, 2800);
}

/**
 * Inicializa interacciones de cabecera y búsqueda
 */
function initHeaderInteractions() {
  // Manejo de búsqueda en modal o barra
  const searchBtn = document.getElementById('btn-open-search');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const searchModalEl = document.getElementById('searchModal');
      if (searchModalEl && window.bootstrap) {
        const modal = new bootstrap.Modal(searchModalEl);
        modal.show();
      }
    });
  }
}

/**
 * Inicializa funcionalidad de búsqueda dinámica
 */
function initSearchFeature() {
  const searchInput = document.getElementById('global-search-input');
  const searchResults = document.getElementById('global-search-results');
  
  if (searchInput && searchResults) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.trim().toLowerCase();
      if (!term) {
        searchResults.innerHTML = `<p class="text-center text-muted py-4 mb-0">Escribe al menos una palabra para buscar...</p>`;
        return;
      }
      
      const allNews = getAllNews();
      const matches = allNews.filter(n => 
        n.title.toLowerCase().includes(term) || 
        n.excerpt.toLowerCase().includes(term) ||
        n.category.toLowerCase().includes(term)
      );

      if (matches.length === 0) {
        searchResults.innerHTML = `<p class="text-center text-muted py-4 mb-0">No se encontraron noticias con "${escapeHTML(term)}".</p>`;
        return;
      }

      searchResults.innerHTML = matches.map(n => `
        <a href="detalle.html?id=${n.id}" class="d-flex align-items-center gap-3 p-2 rounded text-decoration-none border-bottom border-dark" style="color: var(--text-primary); transition: background 0.15s;" onmouseover="this.style.background='var(--bg-elevated)'" onmouseout="this.style.background='transparent'">
          <img src="${n.image}" alt="" style="width: 44px; height: 44px; object-fit: cover; border-radius: 6px;">
          <div>
            <div style="font-size: 0.92rem; font-weight: 600;">${escapeHTML(n.title)}</div>
            <div style="font-size: 0.78rem; color: var(--text-secondary);">${escapeHTML(n.category)} · ${escapeHTML(n.date)}</div>
          </div>
        </a>
      `).join('');
    });
  }
}
