import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { ToastService } from '../../services/toast.service';
import { NewsItem } from '../../models/news.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  template: `
    <main class="admin-view-wrap">
      <div class="container" style="max-width: 1320px;">
        
        <!-- Cabecera de Administración -->
        <div class="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-5">
          <div>
            <div class="eyebrow-tag">
              <span>PANEL DE ADMINISTRACIÓN</span>
            </div>
            <h1 class="hero-title mb-2">Gestión de noticias</h1>
            <p class="hero-excerpt mb-0">Crea, edita y elimina las noticias publicadas en SYNAPSE.TECH.</p>
          </div>

          <div class="d-flex gap-2">
            <button type="button" class="btn-secondary-dark" (click)="handleResetCatalogue()" title="Restablecer catálogo a valores originales">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
              <span>Restablecer</span>
            </button>

            <button type="button" class="btn-primary-purple" id="btn-open-create-modal" (click)="openCreateModal()">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span>Nueva noticia</span>
            </button>
          </div>
        </div>

        <!-- Tabla de Listado de Noticias (Mini CRUD) -->
        <div class="admin-table-card">
          <div class="table-responsive">
            <table class="admin-table" id="admin-news-table">
              <thead>
                <tr>
                  <th style="width: 48%;">NOTICIA</th>
                  <th style="width: 22%;">CATEGORÍA</th>
                  <th style="width: 15%;">FECHA</th>
                  <th style="width: 15%; text-align: right;">ACCIONES</th>
                </tr>
              </thead>
              <tbody id="admin-table-tbody">
                @for (item of newsService.news(); track item.id) {
                  <tr>
                    <td>
                      <div class="d-flex align-items-center gap-3">
                        <img [src]="item.image" [alt]="item.title" style="width: 54px; height: 54px; object-fit: cover; border-radius: 8px; flex-shrink: 0;">
                        <div>
                          <div class="admin-table-title">
                            <a [routerLink]="['/detalle', item.id]">{{ item.title }}</a>
                          </div>
                          <div class="admin-table-sub">{{ item.excerpt }}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span class="badge-category" [ngClass]="getBadgeClass(item.category)">
                        {{ item.category }}
                      </span>
                    </td>
                    <td>
                      <span style="font-size: 0.9rem; color: var(--text-secondary);">{{ item.date }}</span>
                    </td>
                    <td style="text-align: right;">
                      <div class="d-inline-flex gap-2">
                        <button type="button" class="btn-action-icon" (click)="openEditModal(item)" title="Editar noticia">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                        </button>
                        <button type="button" class="btn-action-icon btn-action-delete" (click)="openDeleteConfirm(item)" title="Eliminar noticia">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>

    <!-- MODAL: Crear o Editar Noticia con Vista Previa en Vivo -->
    @if (isFormModalOpen()) {
      <div class="modal fade show d-block modal-custom-backdrop" tabindex="-1" style="background: rgba(10, 13, 20, 0.85); backdrop-filter: blur(8px);">
        <div class="modal-dialog modal-dialog-centered modal-xl">
          <div class="modal-content modal-content-dark">
            <div class="modal-header modal-header-dark border-bottom border-secondary border-opacity-25">
              <div>
                <div class="text-secondary small mb-1">Gestión de noticias › {{ isEditing() ? 'Editar noticia' : 'Nueva noticia' }}</div>
                <h2 class="modal-title font-heading fs-4 fw-bold">{{ isEditing() ? 'Editar noticia' : 'Crear nueva noticia' }}</h2>
              </div>
              <button type="button" class="btn-close btn-close-white" (click)="closeFormModal()"></button>
            </div>

            <div class="modal-body p-4">
              <div class="row g-4">
                
                <!-- Columna Formulario (Izquierda) -->
                <div class="col-lg-7">
                  <form [formGroup]="crudForm" (ngSubmit)="saveNewsForm()" novalidate>
                    
                    <!-- Título -->
                    <div class="mb-3">
                      <label for="form-title" class="form-label-custom">Título de la noticia</label>
                      <input type="text" class="form-control-dark" id="form-title" formControlName="title" placeholder="Ej. Un nuevo modelo de IA reduce el consumo energético">
                    </div>

                    <!-- Categoría (Pills de Selección) -->
                    <div class="mb-3">
                      <label class="form-label-custom">Categoría</label>
                      <div class="d-flex flex-wrap gap-2" id="category-selector-pills">
                        @for (cat of categoryOptions; track cat.name) {
                          <button 
                            type="button" 
                            class="category-pill-btn" 
                            [class.active]="crudForm.get('category')?.value === cat.name" 
                            (click)="selectCategory(cat.name, cat.color)">
                            {{ cat.name }}
                          </button>
                        }
                      </div>
                    </div>

                    <!-- Autor y Tiempo de Lectura -->
                    <div class="row g-3 mb-3">
                      <div class="col-md-6">
                        <label for="form-author" class="form-label-custom">Autor</label>
                        <input type="text" class="form-control-dark" id="form-author" formControlName="authorName" placeholder="Ej. María Rendón">
                      </div>
                      <div class="col-md-6">
                        <label for="form-read-time" class="form-label-custom">Tiempo de lectura</label>
                        <input type="text" class="form-control-dark" id="form-read-time" formControlName="readTime" placeholder="Ej. 5 min">
                      </div>
                    </div>

                    <!-- URL de la Imagen -->
                    <div class="mb-3">
                      <label for="form-image-url" class="form-label-custom">URL de la imagen</label>
                      <input type="url" class="form-control-dark" id="form-image-url" formControlName="image" placeholder="https://images.unsplash.com/...">
                    </div>

                    <!-- Descripción Breve (Excerpt) -->
                    <div class="mb-3">
                      <label for="form-excerpt" class="form-label-custom">Descripción breve</label>
                      <textarea class="form-control-dark" id="form-excerpt" formControlName="excerpt" rows="2" placeholder="Resumen corto que aparecerá en la tarjeta de la noticia"></textarea>
                    </div>

                    <!-- Contenido Completo -->
                    <div class="mb-3">
                      <label for="form-content" class="form-label-custom">Contenido completo</label>
                      <textarea class="form-control-dark" id="form-content" formControlName="content" rows="4" placeholder="Escribe el cuerpo completo de la noticia..."></textarea>
                    </div>
                  </form>
                </div>

                <!-- Columna Vista Previa en Vivo (Derecha) -->
                <div class="col-lg-5">
                  <label class="form-label-custom mb-2">Vista previa de la tarjeta</label>
                  
                  <div class="live-preview-box mb-3">
                    <article class="news-card">
                      <div class="news-card-image-wrap">
                        <img [src]="crudForm.get('image')?.value || 'https://images.unsplash.com/photo-1621203860694-c0fc09ea64bd?q=80&w=1080'" alt="Vista previa">
                        <span class="badge-category" [ngClass]="getBadgeClass(crudForm.get('category')?.value)">
                          {{ crudForm.get('category')?.value }}
                        </span>
                      </div>
                      <div class="news-card-body">
                        <h3 class="news-card-title">
                          <a href="javascript:void(0)">{{ crudForm.get('title')?.value || 'Título de la noticia' }}</a>
                        </h3>
                        <p class="news-card-excerpt">{{ crudForm.get('excerpt')?.value || 'Descripción breve de la noticia...' }}</p>
                        <div class="news-card-footer">
                          <div class="news-card-time">
                            <span>Hoy · {{ crudForm.get('readTime')?.value || '5 min' }}</span>
                          </div>
                          <span class="news-card-btn-action">Leer más ›</span>
                        </div>
                      </div>
                    </article>
                  </div>

                  <div class="d-flex align-items-center gap-2 p-3 rounded" style="background-color: rgba(34, 211, 238, 0.08); border: 1px solid rgba(34, 211, 238, 0.2); font-size: 0.84rem; color: var(--accent-secondary);">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="flex-shrink-0">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                    <span>Así se verá la noticia en el catálogo. Los cambios se guardan localmente.</span>
                  </div>
                </div>

              </div>
            </div>

            <div class="modal-footer modal-footer-dark d-flex justify-content-between">
              <button type="button" class="btn-secondary-dark" (click)="closeFormModal()">Cancelar</button>
              <button type="button" class="btn-primary-purple" (click)="saveNewsForm()">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>{{ isEditing() ? 'Guardar cambios' : 'Publicar noticia' }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    }

    <!-- MODAL: Confirmación de Eliminación -->
    @if (itemToDelete(); as target) {
      <div class="modal fade show d-block modal-custom-backdrop" tabindex="-1" style="background: rgba(10, 13, 20, 0.85); backdrop-filter: blur(8px);">
        <div class="modal-dialog modal-dialog-centered" style="max-width: 440px;">
          <div class="modal-content modal-content-dark text-center p-4">
            <div class="modal-body">
              <div style="width: 68px; height: 68px; border-radius: 50%; background-color: rgba(248, 113, 113, 0.15); color: var(--tag-security); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px auto;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                </svg>
              </div>

              <h3 class="font-heading fs-4 fw-bold mb-2 text-white">¿Eliminar noticia?</h3>
              <p class="text-secondary small mb-4">
                Estás a punto de eliminar permanentemente <strong class="text-white">"{{ target.title }}"</strong>. Esta acción no se puede deshacer.
              </p>

              <div class="d-flex gap-2 justify-content-center">
                <button type="button" class="btn-secondary-dark px-4" (click)="itemToDelete.set(null)">Cancelar</button>
                <button type="button" class="btn btn-danger px-4" style="background-color: #EF4444; border: none; font-weight: 600;" (click)="confirmDelete()">
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
  `
})
export class AdminComponent {
  newsService = inject(NewsService);
  toastService = inject(ToastService);
  private fb = inject(FormBuilder);

  readonly categoryOptions = [
    { name: 'Inteligencia Artificial', color: '#7C5CFF' },
    { name: 'Hardware', color: '#22D3EE' },
    { name: 'Software', color: '#34D399' },
    { name: 'Ciberseguridad', color: '#F87171' },
    { name: 'Startups', color: '#FBBF24' }
  ];

  isFormModalOpen = signal<boolean>(false);
  isEditing = signal<boolean>(false);
  editingId = signal<string | null>(null);
  itemToDelete = signal<NewsItem | null>(null);

  crudForm = this.fb.group({
    title: ['', Validators.required],
    category: ['Inteligencia Artificial', Validators.required],
    categoryColor: ['#7C5CFF'],
    authorName: ['Cristian Ricardo'],
    readTime: ['5 min'],
    image: ['https://images.unsplash.com/photo-1621203860694-c0fc09ea64bd?q=80&w=1080'],
    excerpt: ['', Validators.required],
    content: ['']
  });

  getBadgeClass(category?: string | null): string {
    const norm = (category || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (norm.includes('ia') || norm.includes('inteligencia')) return 'badge-tag-ia';
    if (norm.includes('hardware')) return 'badge-tag-hardware';
    if (norm.includes('software')) return 'badge-tag-software';
    if (norm.includes('seguridad') || norm.includes('ciberseguridad')) return 'badge-tag-security';
    if (norm.includes('startup')) return 'badge-tag-startups';
    return 'badge-tag-ia';
  }

  selectCategory(name: string, color: string) {
    this.crudForm.patchValue({ category: name, categoryColor: color });
  }

  openCreateModal() {
    this.isEditing.set(false);
    this.editingId.set(null);
    this.crudForm.reset({
      title: '',
      category: 'Inteligencia Artificial',
      categoryColor: '#7C5CFF',
      authorName: 'Cristian Ricardo',
      readTime: '5 min',
      image: 'https://images.unsplash.com/photo-1621203860694-c0fc09ea64bd?q=80&w=1080',
      excerpt: '',
      content: ''
    });
    this.isFormModalOpen.set(true);
  }

  openEditModal(item: NewsItem) {
    this.isEditing.set(true);
    this.editingId.set(item.id);
    this.crudForm.patchValue({
      title: item.title,
      category: item.category,
      categoryColor: item.categoryColor || '#7C5CFF',
      authorName: item.author?.name || 'Cristian Ricardo',
      readTime: item.readTime || '5 min',
      image: item.image,
      excerpt: item.excerpt,
      content: item.content
    });
    this.isFormModalOpen.set(true);
  }

  closeFormModal() {
    this.isFormModalOpen.set(false);
  }

  saveNewsForm() {
    if (this.crudForm.invalid) {
      this.toastService.error('Por favor completa los campos requeridos (Título y Descripción breve)');
      return;
    }

    const val = this.crudForm.value;
    const itemData: Partial<NewsItem> = {
      id: this.editingId() || undefined,
      title: val.title || '',
      category: val.category || 'Inteligencia Artificial',
      categoryColor: val.categoryColor || '#7C5CFF',
      excerpt: val.excerpt || '',
      content: val.content || '',
      image: val.image || 'https://images.unsplash.com/photo-1621203860694-c0fc09ea64bd?q=80&w=1080',
      readTime: val.readTime || '5 min',
      readTimeFull: `${val.readTime || '5 min'} de lectura`,
      author: {
        name: val.authorName || 'Cristian Ricardo',
        role: 'Editor de Tecnología',
        initials: (val.authorName || 'CR').split(' ').map(p => p[0]).join('').substring(0, 2).toUpperCase(),
        avatarColor: val.categoryColor || '#7C5CFF'
      }
    };

    this.newsService.saveNews(itemData);
    this.closeFormModal();

    if (this.isEditing()) {
      this.toastService.success('¡Noticia modificada correctamente!');
    } else {
      this.toastService.success('¡Noticia publicada correctamente en el catálogo!');
    }
  }

  openDeleteConfirm(item: NewsItem) {
    this.itemToDelete.set(item);
  }

  confirmDelete() {
    const item = this.itemToDelete();
    if (item) {
      this.newsService.deleteNews(item.id);
      this.toastService.success(`Noticia "${item.title}" eliminada.`);
      this.itemToDelete.set(null);
    }
  }

  handleResetCatalogue() {
    if (confirm('¿Restablecer el catálogo a los datos originales de la Entrega?')) {
      this.newsService.resetToDefault();
      this.toastService.success('Catálogo restablecido a valores originales.');
    }
  }
}
