import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NewsService } from '../../services/news.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <main class="profile-view-wrap">
      <div class="container" style="max-width: 960px;">
        
        <!-- Tarjeta Superior de Resumen de Perfil -->
        <section class="profile-header-card" aria-label="Información de perfil">
          <div class="profile-user-main">
            <div class="profile-avatar-large">
              <img [src]="profile().avatarUrl" [alt]="profile().name">
            </div>
            <div class="profile-header-info">
              <h1>{{ profile().name }}</h1>
              <p class="profile-email-lead">{{ profile().email }}</p>
              <div class="profile-header-meta">
                <span class="profile-meta-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1" class="text-danger">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                  <span class="profile-fav-count">{{ newsService.favoriteCount() }}</span> favoritos
                </span>
                <span class="profile-meta-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <span>Miembro desde <span>{{ profile().memberSince }}</span></span>
                </span>
              </div>
            </div>
          </div>

          <div>
            <button type="button" class="profile-btn-edit" (click)="focusNameInput()">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
              </svg>
              <span>Editar perfil</span>
            </button>
          </div>
        </section>

        <!-- Sección Configuración de la Cuenta -->
        <section aria-labelledby="heading-account-settings">
          <h2 id="heading-account-settings" class="mb-4" style="font-family: var(--font-heading); font-size: 1.45rem; font-weight: 700;">
            Configuración de la cuenta
          </h2>

          <div class="profile-config-card">
            <form [formGroup]="profileForm" (ngSubmit)="onSubmit()" novalidate>
              
              <!-- Fila de Avatar -->
              <div class="profile-avatar-row">
                <img [src]="profile().avatarUrl" alt="Miniatura de perfil" class="profile-thumb-img">
                <div>
                  <label class="form-label-custom mb-1 d-block">Foto de perfil</label>
                  <button type="button" class="btn-change-avatar" (click)="fileInput.click()">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    <span>Cambiar foto</span>
                  </button>
                  <input #fileInput type="file" (change)="onFileSelected($event)" accept="image/*" style="display: none;">
                </div>
              </div>

              <!-- Fila de Nombre y Correo -->
              <div class="row g-4 mb-4">
                <div class="col-md-6">
                  <label for="input-profile-name" class="form-label-custom">Nombre completo</label>
                  <input type="text" class="form-control-dark" id="input-profile-name" formControlName="name">
                </div>
                <div class="col-md-6">
                  <label for="input-profile-email" class="form-label-custom">Correo electrónico</label>
                  <input type="email" class="form-control-dark" id="input-profile-email" formControlName="email">
                </div>
              </div>

              <!-- Biografía -->
              <div class="mb-4">
                <label for="input-profile-bio" class="form-label-custom">Biografía</label>
                <textarea class="form-control-dark" id="input-profile-bio" formControlName="bio" rows="3" style="resize: vertical;"></textarea>
              </div>

              <!-- Línea divisoria -->
              <div class="profile-section-divider"></div>

              <!-- Subsección Contraseña -->
              <h3 class="profile-section-subhead">Cambiar contraseña</h3>
              <div class="row g-4 mb-4">
                <div class="col-md-6">
                  <label for="input-profile-curr-pass" class="form-label-custom">Contraseña actual</label>
                  <input type="password" class="form-control-dark" id="input-profile-curr-pass" placeholder="••••••••">
                </div>
                <div class="col-md-6">
                  <label for="input-profile-new-pass" class="form-label-custom">Nueva contraseña</label>
                  <input type="password" class="form-control-dark" id="input-profile-new-pass" placeholder="••••••••">
                </div>
              </div>

              <!-- Botón de Guardar Cambios -->
              <button type="submit" class="btn-save-profile" id="btn-save-profile-action">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Guardar cambios</span>
              </button>

            </form>
          </div>
        </section>

      </div>
    </main>
  `
})
export class ProfileComponent {
  newsService = inject(NewsService);
  toastService = inject(ToastService);
  private fb = inject(FormBuilder);

  profile = this.newsService.profile;

  profileForm = this.fb.group({
    name: [this.profile().name, [Validators.required, Validators.minLength(2)]],
    email: [this.profile().email, [Validators.required, Validators.email]],
    bio: [this.profile().bio]
  });

  focusNameInput() {
    const input = document.getElementById('input-profile-name');
    if (input) {
      input.focus();
      input.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newUrl = e.target?.result as string;
        this.newsService.updateProfile({ avatarUrl: newUrl });
        this.toastService.success('Foto de perfil actualizada con éxito');
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.profileForm.invalid) {
      this.toastService.error('Por favor completa el nombre y el correo');
      return;
    }

    const { name, email, bio } = this.profileForm.value;
    this.newsService.updateProfile({
      name: name || '',
      email: email || '',
      bio: bio || ''
    });

    this.toastService.success('Cambios del perfil guardados correctamente');
  }
}
