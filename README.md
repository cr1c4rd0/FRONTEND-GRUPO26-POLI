# 🚀 SYNAPSE.TECH - Periódico Digital de Noticias Tecnológicas

> Aplicación web tipo periódico interactivo desarrollada por el **Grupo 26** para el proyecto académico de la asignatura **FRONTEND** en el **Politécnico Grancolombiano**.

[![Angular](https://img.shields.io/badge/Angular-v22-DD0031?style=for-the-badge&logo=angular&logoColor=white)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](#)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](#)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](#)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](#)
[![Estado del Proyecto](https://img.shields.io/badge/Entrega%203-Migrado%20a%20Angular-brightgreen?style=for-the-badge)](#)

---

## 📋 Tabla de Contenidos

- [Descripción del Proyecto](#-descripción-del-proyecto)
- [Arquitectura en Angular](#-arquitectura-en-angular)
- [Características Principales](#-características-principales)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Guía de Ejecución y Requisitos del Sistema](#-guía-de-ejecución-y-requisitos-del-sistema)
- [Diseño y Prototipado (UI/UX)](#-diseño-y-prototipado-uiux)
- [Historial y Respaldo Entrega 2](#-historial-y-respaldo-entrega-2)
- [Documentación e Informes Académicos (docs/)](#-documentación-e-informes-académicos-docs)
- [Integrantes del Grupo 26](#-integrantes-del-grupo-26)
- [Institución](#-institución)

---

## 📖 Descripción del Proyecto

**SYNAPSE.TECH** es una plataforma web tipo periódico digital enfocada en el ecosistema tecnológico. Su objetivo es brindar a los usuarios un espacio moderno, intuitivo y reactivo donde puedan explorar las últimas novedades del mundo de la tecnología, inteligencia artificial, hardware, software, ciberseguridad y startups.

El proyecto ha sido completamente migrado a **Angular**, implementando las prácticas modernas del ecosistema:
- **Standalone Components** para una arquitectura modular y desacoplada sin `NgModule`.
- **Angular Signals y Computed Signals** (`signal`, `computed`, `effect`) para reactividad de alto rendimiento.
- **Angular Router** con enrutamiento dinámico, migas de pan y enlaces profundos (`/`, `/detalle/:id`, `/favoritos`, `/contacto`, `/admin`, `/perfil`).
- **Reactive Forms** (`FormGroup`, `FormControl`, `Validators`) para validación y captura de datos en tiempo real.
- **Persistencia en LocalStorage** para conservar noticias añadidas/editadas, favoritos y perfil del usuario.
- **Diseño Cyber-Tech Moderno** con tema oscuro nativo, gradientes neon, fuentes *Space Grotesk* e *Inter*, y microanimaciones fluidas.

---

## ⚙️ Arquitectura en Angular

El proyecto se estructura bajo una arquitectura limpia y desacoplada:

1. **Modelos (`src/app/models/`):**
   - [`news.model.ts`](file:///src/app/models/news.model.ts): Interfaces TypeScript con tipado fuerte para `NewsItem`, `Author`, `KeyFact`, `UserProfile` y `ContactMessage`.

2. **Servicios (`src/app/services/`):**
   - [`news.service.ts`](file:///src/app/services/news.service.ts): Servicio singleton reactivo (`@Injectable({ providedIn: 'root' })`) que gestiona el catálogo de noticias, favoritos y perfil con **Angular Signals** (`signal<NewsItem[]>`, `signal<string[]>`, `signal<UserProfile>`). Incluye operaciones CRUD completas y persistencia sincronizada con `localStorage`.
   - [`toast.service.ts`](file:///src/app/services/toast.service.ts): Notificaciones emergentes dinámicas y reactivas (`success`, `error`, `info`).

3. **Componentes Globales (`src/app/components/`):**
   - [`HeaderComponent`](file:///src/app/components/header/header.component.ts): Barra de navegación accesible con contador dinámico de favoritos, enlaces activos (`routerLinkActive`) y disparador de búsqueda.
   - [`FooterComponent`](file:///src/app/components/footer/footer.component.ts): Pie de página institucional categorizado.
   - [`NewsCardComponent`](file:///src/app/components/news-card/news-card.component.ts): Tarjeta modular reutilizable con insignia de categoría, botón interactivo de favoritos y navegación a detalle.
   - [`SearchModalComponent`](file:///src/app/components/search-modal/search-modal.component.ts): Buscador dinámico flotante con filtrado en tiempo real.
   - [`ToastComponent`](file:///src/app/components/toast/toast.component.ts): Contenedor de avisos y notificaciones en pantalla.

4. **Páginas / Vistas (`src/app/pages/`):**
   - [`HomeComponent`](file:///src/app/pages/home/home.component.ts): Portada con noticia destacada (Hero Section), pills de filtrado por categoría y catálogo dinámico.
   - [`DetailComponent`](file:///src/app/pages/detail/detail.component.ts): Lectura profunda del artículo mediante parámetros de ruta (`/detalle/:id`), barra de autor, citas destacadas, datos clave en barra lateral y 3 artículos relacionados.
   - [`FavoritesComponent`](file:///src/app/pages/favorites/favorites.component.ts): Colección personalizada del usuario con estado vacío (Empty State) y alternancia rápida.
   - [`ContactComponent`](file:///src/app/pages/contact/contact.component.ts): Formulario con **Reactive Forms**, validaciones visuales instantáneas y confirmación de envío.
   - [`AdminComponent`](file:///src/app/pages/admin/admin.component.ts): Panel administrativo con **Mini CRUD** (Crear, Editar, Eliminar con modal interactivo de confirmación) y **Vista Previa en Vivo** de la tarjeta.
   - [`ProfileComponent`](file:///src/app/pages/profile/profile.component.ts): Perfil del lector, estadísticas personales y edición interactiva de avatar e información.

---

## 📂 Estructura del Proyecto

```text
FRONTEND-GRUPO26-POLI/
├── angular.json                    # Configuración del CLI de Angular
├── package.json                    # Dependencias y scripts de ejecución
├── tsconfig.json                   # Configuración del compilador TypeScript
├── public/                         # Archivos estáticos y recursos públicos
│   └── data/
│       └── news.json               # Semilla inicial del catálogo de noticias
├── src/
│   ├── index.html                  # HTML raíz con Bootstrap 5.3 y Google Fonts
│   ├── main.ts                     # Punto de entrada de la aplicación Angular
│   ├── styles.css                  # Sistema de diseño, tokens CSS, dark theme y animaciones
│   └── app/
│       ├── app.component.ts        # Componente raíz con layout y router-outlet
│       ├── app.component.html      # Plantilla principal (<app-header />, <router-outlet />, etc.)
│       ├── app.config.ts           # Configuración de enrutamiento y providers
│       ├── app.routes.ts           # Definición de rutas del Angular Router
│       ├── models/
│       │   └── news.model.ts       # Modelos e interfaces TypeScript
│       ├── services/
│       │   ├── news.service.ts     # Servicio de catálogo, CRUD, favoritos y localStorage
│       │   └── toast.service.ts    # Servicio de notificaciones flotantes
│       ├── components/
│       │   ├── header/             # Barra de navegación principal
│       │   ├── footer/             # Pie de página institucional
│       │   ├── news-card/          # Tarjetas dinámicas de noticias
│       │   ├── search-modal/       # Modal de búsqueda interactiva
│       │   └── toast/              # Alertas toast flotantes
│       └── pages/
│           ├── home/               # Vista de inicio y catálogo
│           ├── detail/             # Vista de detalle de artículo
│           ├── favorites/          # Biblioteca de noticias guardadas
│           ├── contact/            # Formulario de contacto reactivo
│           ├── admin/              # Panel de administración (Mini CRUD)
│           └── profile/            # Perfil de usuario y preferencias
├── legacy-entrega2/                # Respaldo intacto de la Entrega 2 (HTML5 / Vanilla JS)
├── docs/                           # Documentación académica e informes
├── PROTOTIPO/                      # Prototipos y mockups UI/UX de la Entrega 1
└── README.md                       # Documentación técnica general
```

---

## 🚀 Guía de Ejecución y Requisitos del Sistema

Esta sección detalla los prerrequisitos técnicos necesarios y el paso a paso exacto para descargar, instalar y poner en marcha el proyecto desarrollado en **Angular**.

---

### 💻 Requisitos del Sistema (Prerrequisitos)

Antes de ejecutar el proyecto, asegúrate de tener instaladas las siguientes herramientas en tu sistema operativo (Windows, macOS o Linux):

| Requisito | Versión Requerida | ¿Para qué se necesita? | ¿Cómo verificar si está instalado? |
| :--- | :--- | :--- | :--- |
| **Node.js** | **v18.x**, **v20.x** o **v24.x LTS** *(Recomendado v20+)* | Entorno de ejecución para compilar el proyecto y ejecutar las herramientas de Angular. | `node -v` |
| **npm** | **v9.x** o superior *(Viene incluido con Node.js)* | Gestor de paquetes para descargar e instalar las dependencias del proyecto. | `npm -v` |
| **Angular CLI** *(Opcional)* | **v18+** / **v22+** | Herramienta de línea de comandos de Angular (no es obligatoria si usas los scripts de `npm`). | `ng version` o `npx ng version` |
| **Git** | Cualquier versión reciente | Para clonar el repositorio de control de versiones. | `git --version` |
| **Navegador Web** | Moderno *(Chrome, Edge, Firefox, Brave o Safari)* | Para visualizar y navegar la aplicación en entorno local. | Abrir navegador preferido |

> [!TIP]
> Si aún no tienes **Node.js** instalado, descárgalo directamente desde el sitio oficial: [https://nodejs.org/](https://nodejs.org/) (se recomienda elegir la versión **LTS**).

---

### 📋 Paso a Paso para Ejecutar el Proyecto

#### Paso 1: Clonar el Repositorio
Abre tu terminal favorita (PowerShell, Git Bash, CMD o Terminal de VS Code) y clona el repositorio:

```bash
git clone https://github.com/cr1c4rd0/FRONTEND-GRUPO26-POLI.git
cd FRONTEND-GRUPO26-POLI
```

*(Si ya descargaste el proyecto como archivo ZIP, descomprímelo y abre la terminal dentro de la carpeta raíz `FRONTEND-GRUPO26-POLI`)*.

---

#### Paso 2: Instalar las Dependencias
Ejecuta el siguiente comando para descargar todas las librerías necesarias especificadas en el `package.json` (`@angular/core`, `@angular/router`, `@angular/forms`, Bootstrap, TypeScript, etc.):

```bash
npm install
```

> [!NOTE]
> Este proceso toma entre 20 y 60 segundos dependiendo de la velocidad de tu conexión a internet. Una vez finalizado, se creará la carpeta `node_modules/`.

---

#### Paso 3 (Opcional): Desactivar la Analítica de Angular
La primera vez que uses Angular CLI en tu máquina, es posible que te pregunte si deseas enviar estadísticas de uso a Google. Si deseas evitar este mensaje interactivo, ejecuta:

```bash
npx ng analytics off
```

---

#### Paso 4: Iniciar el Servidor de Desarrollo
Para compilar la aplicación y levantar el servidor web local con recarga en caliente (*Hot-Reload*), ejecuta:

```bash
npm start
```
*(O de manera equivalente: `npx ng serve` o `ng serve` si tienes Angular CLI instalado globalmente)*.

Una vez que termine de compilar verás un mensaje como este:
```text
Application bundle generation complete.
Watch mode enabled. Watching for file changes...
  ➜  Local:   http://localhost:4200/
```

---

#### Paso 5: Abrir la Aplicación en el Navegador
Abre tu navegador web e ingresa a la siguiente URL:

👉 **[http://localhost:4200/](http://localhost:4200/)**

¡Listo! Ya puedes explorar el periódico digital, interactuar con el catálogo, marcar favoritos, usar el buscador dinámico, enviar formularios de contacto y gestionar noticias desde el panel de administración.

---

#### Paso 6: Compilar para Producción (Opcional)
Si deseas generar los archivos optimizados y empaquetados para subir a un servidor web o hosting de producción:

```bash
npm run build
```

Los artefactos listos para producción se generarán automáticamente en la carpeta:
📁 **`dist/synapse-tech/`**

---

### 🛠️ Scripts Disponibles en `package.json`

| Comando | Acción |
| :--- | :--- |
| `npm start` | Inicia el servidor de desarrollo en `http://localhost:4200/`. |
| `npm run build` | Compila y optimiza la aplicación para producción en `dist/synapse-tech`. |
| `npm run watch` | Compila en modo desarrollo y queda a la espera de cambios continuos. |

---

### ❓ Preguntas Frecuentes y Solución de Problemas (Troubleshooting)

#### 1. ⚠️ Error: *"Port 4200 is already in use. Use '--port' to specify a different port."*
Este error sucede cuando el puerto `4200` ya está siendo utilizado por otra pestaña, servidor o proceso en tu computadora.
* **Solución rápida:** Ejecuta el servidor en un puerto diferente (por ejemplo, el 4201):
  ```bash
  npm start -- --port 4201
  ```
  O con `ng serve`:
  ```bash
  npx ng serve --port 4201
  ```
* **Solución alternativa:** Si la terminal te pregunta `Would you like to use a different port? (Y/n)`, simplemente escribe `Y` y presiona **Enter** para que Angular elija automáticamente un puerto disponible.

#### 2. ⚠️ Error de directiva de ejecución en PowerShell en Windows: *"La ejecución de scripts está deshabilitada en este sistema"*
Si al ejecutar comandos `ng` o `npm` en PowerShell recibes un error de `ExecutionPolicy`, ejecuta en la misma terminal:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```
Y vuelve a intentar `npm start`.

#### 3. ⚠️ Deseo consultar la versión estática previa (Entrega 2 en HTML5 / Vanilla JS)
El código de la entrega anterior se preserva intacto. No requiere NodeJS ni instalación. Simplemente abre con doble clic o tu navegador el archivo:
📁 **[`legacy-entrega2/index.html`](./legacy-entrega2/index.html)**

---

## 🎨 Diseño y Prototipado (UI/UX)

La aplicación sigue fielmente los diseños planificados en la Entrega 1 en la carpeta [`PROTOTIPO/`](./PROTOTIPO) elaborados en **[Pen (pen.dev)](https://www.pen.dev/)**:

| Módulo / Vista | Archivo Exportado | Descripción |
| :--- | :--- | :--- |
| 🏠 **Home** | [`Home.png`](./PROTOTIPO/EXPORTADOS/Home.png) | Portada principal con cabecera, vitrina de noticias destacadas y catálogo. |
| 📄 **Detalle de Noticia** | [`News Detail.png`](./PROTOTIPO/EXPORTADOS/News%20Detail.png) | Lectura del artículo completo, autor, fecha, categorías y botones de interacción. |
| ⭐ **Favoritos** | [`Favorites Page.png`](./PROTOTIPO/EXPORTADOS/Favorites%20Page.png) | Colección personalizada de noticias guardadas por el usuario (`localStorage`). |
| ✉️ **Contacto** | [`Contact.png`](./PROTOTIPO/EXPORTADOS/Contact.png) | Formulario de contacto y comunicación con el equipo editorial. |
| ⚠️ **Contacto (Validación)** | [`Contacto - Validacion.png`](./PROTOTIPO/EXPORTADOS/Contacto%20-%20Validacion.png) | Estado con alertas y retroalimentación en validación de campos obligatorios/email. |
| ✅ **Contacto (Enviado)** | [`Contacto - Enviado.png`](./PROTOTIPO/EXPORTADOS/Contacto%20-%20Enviado.png) | Confirmación visual y modal de agradecimiento tras el envío exitoso. |
| 👤 **Perfil de Usuario** | [`Profile.png`](./PROTOTIPO/EXPORTADOS/Profile.png) | Panel con datos y preferencias del usuario lector. |
| ⚙️ **Admin Noticias (Listado)** | [`Admin Noticias.png`](./PROTOTIPO/EXPORTADOS/Admin%20Noticias.png) | Panel de administración para visualización del catálogo (Mini CRUD). |
| ➕ **Admin Noticias (Nueva)** | [`Admin Noticias - Nueva.png`](./PROTOTIPO/EXPORTADOS/Admin%20Noticias%20-%20Nueva.png) | Formulario para la creación y captura de datos de una nueva noticia. |
| 🚀 **Admin Noticias (Publicada)** | [`Admin Noticias - Nueva (Publicada).png`](./PROTOTIPO/EXPORTADOS/Admin%20Noticias%20-%20Nueva%20(Publicada).png) | Estado y alerta de confirmación tras publicar exitosamente una nueva noticia. |
| 💾 **Admin Noticias (Guardada)** | [`Admin Noticias - Editar (Guardada).png`](./PROTOTIPO/EXPORTADOS/Admin%20Noticias%20-%20Editar%20(Guardada).png) | Estado y alerta de confirmación tras guardar la edición de una noticia. |
| 🗑️ **Admin Noticias (Eliminar)** | [`Admin Noticias - Eliminar.png`](./PROTOTIPO/EXPORTADOS/Admin%20Noticias%20-%20Eliminar.png) | Diálogo de confirmación interactivo para dar de baja una noticia del catálogo. |

---

## 🗄️ Historial y Respaldo Entrega 2

Para fines de evaluación docente y trazabilidad académica, el código original de la **Entrega 2** (HTML5 estático, Vanilla JS y Bootstrap 5.3 puro) se conserva 100% íntegro dentro de la carpeta:
📁 **[`legacy-entrega2/`](./legacy-entrega2/)**

Puede ejecutarse de forma estática en cualquier navegador abriendo directamente [`legacy-entrega2/index.html`](./legacy-entrega2/index.html).

---

## 📚 Documentación e Informes Académicos (`docs/`)

> [!NOTE]
> La carpeta `docs/` contiene los entregables académicos formales bajo las **Normas APA (7ma Edición)** y se gestiona a nivel local (excluida del control de versiones mediante `.gitignore`) para la entrega directa de los archivos PDF en la plataforma institucional del Politécnico Grancolombiano.

Los informes estructurados para cada fase se encuentran disponibles en:

| Documento | Formato | Descripción |
| :--- | :--- | :--- |
| 📑 **[INFORME_ENTREGA_3_GRUPO26.pdf](./docs/ENTREGA_3/INFORME_ENTREGA_3_GRUPO26.pdf)** | **PDF Oficial** | **Informe Académico Final (Entrega 3 - Semana 7)**: Plataforma Web de Noticias en Angular SPA, Signals, Router, Reactive Forms y CRUD. |
| 🌐 **[informe_entrega_3.html](./docs/ENTREGA_3/informe_entrega_3.html)** | **HTML Impresible** | Versión web del informe de Entrega 3 bajo APA 7 con botón para imprimir o guardar como PDF. |
| 📝 **[INFORME_ENTREGA_3.md](./docs/ENTREGA_3/INFORME_ENTREGA_3.md)** | **Markdown** | Versión Markdown del informe final para lectura directa en GitHub. |
| 📑 **[INFORME_ENTREGA_2_GRUPO26.pdf](./docs/ENTREGA_2/INFORME_ENTREGA_2_GRUPO26.pdf)** | **PDF Oficial** | **Informe Académico de la Entrega 2 (Semana 5)**: Prototipo funcional HTML5/JS nativo. |
| 🌐 **[informe_entrega_2.html](./docs/ENTREGA_2/informe_entrega_2.html)** | **HTML Impresible** | Versión web interactiva del informe de la Entrega 2. |

---

## 👥 Integrantes del Grupo 26

| Nombre Completo | Rol / Responsabilidad | Perfil / Contacto |
| :--- | :--- | :--- |
| **Cristian Ricardo** | *Líder de Proyecto / Frontend* | [@cr1c4rd0](https://github.com/cr1c4rd0) |
| **Juan Esteban Serna** | *Frontend Developer* | [@Xt-ban](https://github.com/Xt-ban) |
| **Juan Manuel Saldarriaga** | *Frontend Developer* | [@juansaldarriagaa](https://github.com/juansaldarriagaa) |

---

## 🏫 Institución

- **Institución:** Politécnico Grancolombiano
- **Materia:** FRONTEND
- **Tutor / Docente:** Jhon Olarte
- **Año / Periodo:** 2026-I
