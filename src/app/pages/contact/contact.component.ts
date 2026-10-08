import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <main class="contact-view-wrap">
      <div class="container" style="max-width: 1320px;">
        
        <!-- Encabezado de la página -->
        <div class="mb-5">
          <div class="eyebrow-tag">
            <span>CONTÁCTANOS</span>
          </div>
          <h1 class="hero-title mb-2">Hablemos de tecnología</h1>
          <p class="hero-excerpt mb-0" style="max-width: 650px;">
            ¿Tienes una noticia, sugerencia o quieres colaborar con SYNAPSE.TECH? Completa el formulario y te responderemos lo antes posible.
          </p>
        </div>

        <div class="row g-5">
          <!-- Columna Izquierda: Formulario Reactivo con Angular -->
          <div class="col-lg-7">
            <div class="contact-card-form" id="contact-form-container">
              @if (isSubmitted()) {
                <div class="contact-success-state">
                  <div class="success-check-icon">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <h2 class="font-heading fs-2 fw-bold text-white mb-3">¡Mensaje enviado!</h2>
                  <p class="text-secondary fs-6 mb-4" style="max-width: 440px; margin: 0 auto; line-height: 1.6;">
                    Gracias por escribirnos. Nuestro equipo editorial revisará tu mensaje y te responderá al correo indicado en menos de 24 horas.
                  </p>
                  <button type="button" class="btn-primary-purple" (click)="resetForm()">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                      <path d="M3 3v5h5"></path>
                    </svg>
                    <span>Enviar otro mensaje</span>
                  </button>
                </div>
              } @else {
                <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" novalidate>
                  
                  <!-- Fila: Nombre y Correo -->
                  <div class="row g-4 mb-4">
                    <div class="col-md-6">
                      <label for="contact-nombre" class="form-label-custom">Nombre completo</label>
                      <input 
                        type="text" 
                        class="form-control-dark" 
                        [class.is-invalid]="hasError('nombre')" 
                        id="contact-nombre" 
                        formControlName="nombre" 
                        placeholder="Ej. Juan Pérez" 
                        autocomplete="name">
                      @if (hasError('nombre')) {
                        <div class="invalid-feedback-custom d-block">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                          <span>Este campo es obligatorio.</span>
                        </div>
                      }
                    </div>

                    <div class="col-md-6">
                      <label for="contact-email" class="form-label-custom">Correo electrónico</label>
                      <input 
                        type="email" 
                        class="form-control-dark" 
                        [class.is-invalid]="hasError('email')" 
                        id="contact-email" 
                        formControlName="email" 
                        placeholder="tu@correo.com" 
                        autocomplete="email">
                      @if (hasError('email')) {
                        <div class="invalid-feedback-custom d-block">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                          <span>
                            @if (contactForm.get('email')?.errors?.['required']) {
                              Este campo es obligatorio.
                            } @else if (contactForm.get('email')?.errors?.['email']) {
                              Ingresa un correo electrónico válido.
                            }
                          </span>
                        </div>
                      }
                    </div>
                  </div>

                  <!-- Asunto -->
                  <div class="mb-4">
                    <label for="contact-asunto" class="form-label-custom">Asunto</label>
                    <input 
                      type="text" 
                      class="form-control-dark" 
                      id="contact-asunto" 
                      formControlName="asunto" 
                      placeholder="¿Sobre qué quieres hablar?">
                  </div>

                  <!-- Mensaje -->
                  <div class="mb-4">
                    <label for="contact-mensaje" class="form-label-custom">Mensaje</label>
                    <textarea 
                      class="form-control-dark" 
                      [class.is-invalid]="hasError('mensaje')" 
                      id="contact-mensaje" 
                      formControlName="mensaje" 
                      rows="5" 
                      placeholder="Escribe tu mensaje aquí..."></textarea>
                    @if (hasError('mensaje')) {
                      <div class="invalid-feedback-custom d-block">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        <span>Este campo es obligatorio.</span>
                      </div>
                    }
                  </div>

                  <!-- Botón de Envío -->
                  <button type="submit" class="btn-primary-purple w-100 justify-content-center py-3" id="btn-submit-contact">
                    <span>Enviar mensaje</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </button>

                </form>
              }
            </div>
          </div>

          <!-- Columna Derecha: Información de Contacto y Redes -->
          <div class="col-lg-5">
            <!-- Card de Info -->
            <div class="contact-info-card">
              <h3 class="font-heading fs-5 fw-bold mb-4">Información de contacto</h3>

              <div class="contact-info-item">
                <div class="contact-info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </div>
                <div>
                  <div class="contact-info-sub">Correo</div>
                  <div class="contact-info-val">redaccion&#64;synapse.tech</div>
                </div>
              </div>

              <div class="contact-info-item">
                <div class="contact-info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <div>
                  <div class="contact-info-sub">Teléfono</div>
                  <div class="contact-info-val">+57 300 123 4567</div>
                </div>
              </div>

              <div class="contact-info-item">
                <div class="contact-info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <div class="contact-info-sub">Ubicación</div>
                  <div class="contact-info-val">Bogotá, Colombia</div>
                </div>
              </div>

              <div class="contact-info-item">
                <div class="contact-info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div>
                  <div class="contact-info-sub">Horario</div>
                  <div class="contact-info-val">Lun - Vie · 8:00 - 18:00</div>
                </div>
              </div>
            </div>

            <!-- Banner Síguenos -->
            <div class="banner-social-follow mt-4">
              <h4 class="font-heading">Síguenos</h4>
              <p>Entérate primero de las últimas noticias tech.</p>
              <div class="social-pills-row">
                <a href="https://twitter.com" target="_blank" rel="noopener" class="social-pill-btn" aria-label="Twitter">
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener" class="social-pill-btn" aria-label="LinkedIn">
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                <a href="https://github.com/cr1c4rd0/FRONTEND-GRUPO26-POLI" target="_blank" rel="noopener" class="social-pill-btn" aria-label="GitHub">
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  `
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  private toastService = inject(ToastService);

  isSubmitted = signal<boolean>(false);

  contactForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    asunto: [''],
    mensaje: ['', [Validators.required, Validators.minLength(5)]]
  });

  hasError(field: 'nombre' | 'email' | 'mensaje'): boolean {
    const control = this.contactForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      this.toastService.error('Por favor completa los campos requeridos correctamente');
      return;
    }

    this.isSubmitted.set(true);
    this.toastService.success('¡Tu mensaje ha sido enviado con éxito!');
  }

  resetForm() {
    this.contactForm.reset();
    this.isSubmitted.set(false);
  }
}
