# 🚀 SYNAPSE.TECH - Periódico Digital de Noticias Tecnológicas

> Aplicación web tipo periódico interactivo desarrollada por el **Grupo 26** para el proyecto académico de la asignatura **FRONTEND** en el **Politécnico Grancolombiano**.

[![Estado del Proyecto](https://img.shields.io/badge/Estado-En%20Desarrollo-yellow?style=for-the-badge)](#)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](#)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](#)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](#)
[![Angular](https://img.shields.io/badge/Angular-Básico%20(Planeado)-DD0031?style=for-the-badge&logo=angular&logoColor=white)](#)

---

## 📋 Tabla de Contenidos

- [Descripción del Proyecto](#-descripción-del-proyecto)
- [Características Principales](#-características-principales)
- [Diseño y Prototipado (UI/UX)](#-diseño-y-prototipado-uiux)
- [Tecnologías Utilizadas](#️-tecnologías-utilizadas)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Visualización y Puesta en Marcha](#-visualización-y-puesta-en-marcha)
- [Integración con Backend](#-integración-con-backend)
- [Flujo de Trabajo y Convenciones Git](#-flujo-de-trabajo-y-convenciones-git)
- [Integrantes del Grupo 26](#-integrantes-del-grupo-26)
- [Institución](#-institución)

---

## 📖 Descripción del Proyecto

**SYNAPSE.TECH** es una plataforma web tipo periódico digital enfocada en el ecosistema tecnológico. Su objetivo es brindar a los usuarios un espacio moderno, intuitivo y dinámico donde puedan explorar las últimas novedades del mundo de la tecnología, tendencias de desarrollo, inteligencia artificial y servicios digitales.

La aplicación permite navegar entre diferentes artículos y categorías, visualizar información detallada de cada noticia e interactuar mediante funcionalidades clave como el guardado en favoritos y formularios de contacto. En esta etapa inicial, el proyecto se enfoca en evidenciar sólidos fundamentos de maquetación semántica con **HTML5**, diseño responsivo con **CSS3** apoyado en **Bootstrap 5.3** y dinamismo del lado del cliente con **JavaScript**, con una arquitectura orientada a la futura adopción y migración a **Angular**.

---

## ✨ Características Principales

### 1. 📰 Visualización de Noticias (Catálogo)
Los usuarios disponen de un catálogo dinámico presentado en formato de tarjetas (*cards*), donde cada elemento incluye:
- **Imagen:** Recurso visual representativo de la noticia o avance tecnológico.
- **Nombre / Título:** Encabezado descriptivo de la noticia.
- **Descripción breve:** Resumen introductorio del contenido.
- **Botón de acción:** Enlace directo (*"Ver más"*) hacia la vista de detalle.

### 2. 🔍 Detalle de la Noticia
Vista individual y profunda para cada artículo que presenta:
- **Información completa:** Contenido íntegro de la noticia y datos contextuales.
- **Imagen representativa:** Cabecera o galería visual en alta definición.
- **Botones de interacción:** Opciones para añadir el artículo a favoritos o navegar hacia el formulario de contacto.

### 3. ⭐ Gestión de Favoritos (Interacción del Usuario)
Espacio personalizado donde los usuarios pueden interactuar con el contenido:
- **Guardar en favoritos:** Marcado dinámico de artículos de interés desde las cards o la vista de detalle.
- **Lista personalizada:** Consulta de la colección de noticias favoritas guardadas.
- **Persistencia en el cliente:** Implementado mediante `localStorage` o `sessionStorage` para conservar las selecciones sin necesidad de base de datos externa.

### 4. 🏠 Página de Inicio (Home)
Estructura de aterrizaje completa y moderna compuesta por:
- **Header:** Menú de navegación accesible e intuitivo.
- **Sección de bienvenida:** Mensaje de introducción y propuesta de valor de SYNAPSE.TECH.
- **Noticias destacadas:** Vitrina principal con los artículos más relevantes del momento.
- **Llamados a la acción (Call-to-Action):** Botones orientados a explorar el catálogo, guardar favoritos o contactar.
- **Footer:** Pie de página con información general del proyecto, enlaces institucionales y créditos.

### 5. ✉️ Página de Contacto
Canal de comunicación que incluye un formulario interactivo con:
- **Validaciones básicas:** Verificación en tiempo real de campos obligatorios y formato de correo electrónico válido.
- **Mensaje de confirmación:** Notificación visual al usuario tras el envío exitoso del formulario.

### 6. ⚙️ Gestión Básica de Noticias (Mini CRUD)
Panel o funcionalidad administrativa básica que permite mantener actualizado el catálogo:
- **Crear nuevas noticias:** Formulario para agregar nuevos artículos con su respectivo título, descripción, imagen y contenido.
- **Eliminar noticias existentes:** Opción para remover noticias del catálogo activo.

---

## 🎨 Diseño y Prototipado (UI/UX)

La concepción visual y el flujo de navegación de la aplicación fueron planificados previamente en la carpeta [`PROTOTIPO/`](./PROTOTIPO), asegurando coherencia visual y una óptima experiencia de usuario.

### ✒️ Herramienta Utilizada: [Pen (pen.dev)](https://www.pen.dev/)
Para la elaboración de las vistas y wireframes de **SYNAPSE.TECH** se utilizó **[Pen](https://www.pen.dev/)**, una herramienta moderna, minimalista y colaborativa de diseño de interfaces y prototipado rápido enfocada en desarrolladores y diseñadores. 

**Características destacadas de Pen:**
- **Enfoque ágil:** Permite bosquejar interfaces, componentes y flujos de usuario de manera limpia y sin sobrecargas complejas.
- **Formato `.pen` nativo:** Almacena todos los lienzos, capas y elementos de diseño en un archivo único y ligero (`.pen`), ideal para versionar directamente en repositorios Git.
- **Exportación de alta fidelidad:** Facilita la generación de vistas y maquetas en formatos de imagen estándar como PNG para documentación y presentación.

### 📐 Archivos y Vistas del Prototipo
- **Archivo editable:** [`PROTOTIPO/Prototipo - SYNAPSE.TECH.pen`](./PROTOTIPO/Prototipo%20-%20SYNAPSE.TECH.pen) — Archivo fuente con el diseño completo realizado en **Pen**.
- **Vistas exportadas:** Disponibles en alta resolución dentro de [`PROTOTIPO/EXPORTADOS/`](./PROTOTIPO/EXPORTADOS/):

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
| ➕ **Admin Noticias (Nueva)** | [`Admin Noticias - Nueva.png`](./PROTOTIPO/EXPORTADOS/Admin%20Noticias%20-%20Nueva.png) | Formulario para la creación y publicación de una nueva noticia. |
| 🗑️ **Admin Noticias (Eliminar)** | [`Admin Noticias - Eliminar.png`](./PROTOTIPO/EXPORTADOS/Admin%20Noticias%20-%20Eliminar.png) | Diálogo de confirmación interactivo para dar de baja una noticia del catálogo. |

---

## 🛠️ Tecnologías Utilizadas

- **HTML5:** Marcado semántico para la estructuración accesible de las páginas y artículos.
- **CSS3:** Estilos visuales modernos, diseño responsivo, transiciones y variables CSS.
- **JavaScript (Vanilla / ES6+):** Programación del comportamiento dinámico del cliente, manipulación del DOM y gestión de eventos.
- **Bootstrap 5.3:** Framework CSS elegido para el proyecto; aporta sistema de grillas, componentes listos (navbar, cards, forms, modales) y utilidades responsivas, incluyendo soporte nativo para modo oscuro/claro.
- **Angular (Fase Posterior):** Uso de fundamentos básicos que incluyen arquitectura de componentes y data binding (enlace de datos unidireccional y bidireccional).
- **localStorage / sessionStorage:** Mecanismos de almacenamiento web para la persistencia local de información del usuario (noticias favoritas, sesión y preferencias).
- **JSON Local:** Archivos locales en formato JSON para el almacenamiento, estructuración y consumo simulado de datos de noticias y categorías.
- **Herramientas de Diseño y Control de Versiones:**
  - **[Pen (pen.dev)](https://www.pen.dev/):** Herramienta de diseño para la creación del prototipo y wireframes UI/UX (`.pen`).
  - **Git & GitHub:** Control de versiones distribuido y flujo de trabajo en equipo.

---

## 📂 Estructura del Proyecto

```text
FRONTEND-GRUPO26-POLI/
├── PROTOTIPO/                      # Material de diseño UI/UX
│   ├── EXPORTADOS/                 # Vistas exportadas en formato PNG (10 pantallas)
│   │   ├── Admin Noticias - Eliminar.png
│   │   ├── Admin Noticias - Nueva.png
│   │   ├── Admin Noticias.png
│   │   ├── Contact.png
│   │   ├── Contacto - Enviado.png
│   │   ├── Contacto - Validacion.png
│   │   ├── Favorites Page.png
│   │   ├── Home.png
│   │   ├── News Detail.png
│   │   └── Profile.png
│   └── Prototipo - SYNAPSE.TECH.pen # Archivo fuente editable en Pen (pen.dev)
├── data/                           # Datos estáticos en JSON local
│   └── news.json                   # Estructura de noticias y categorías
├── src/                            # Código fuente del aplicativo web
│   ├── assets/                     # Imágenes, iconos y recursos multimedia
│   ├── css/ / styles/              # Hojas de estilo (CSS nativo + Bootstrap 5.3)
│   ├── js/                         # Lógica en JavaScript (DOM, storage, render)
│   └── pages/                      # Vistas principales (Home, Detalle, Favoritos, etc.)
└── README.md                       # Documentación técnica del proyecto
```

---

## 🚀 Visualización y Puesta en Marcha

Para explorar el prototipo y ejecutar la aplicación localmente:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/cr1c4rd0/FRONTEND-GRUPO26-POLI.git
   cd FRONTEND-GRUPO26-POLI
   ```

2. **Revisar los prototipos:**
   - Puedes abrir directamente las imágenes en la carpeta [`PROTOTIPO/EXPORTADOS/`](./PROTOTIPO/EXPORTADOS/) para inspeccionar el diseño de cada pantalla.
   - Para abrir o modificar el archivo fuente [`Prototipo - SYNAPSE.TECH.pen`](./PROTOTIPO/Prototipo%20-%20SYNAPSE.TECH.pen), puedes cargarlo en la aplicación web de **[Pen (pen.dev)](https://www.pen.dev/)**.

3. **Ejecutar el aplicativo web:**
   - Abre el archivo principal `index.html` (o las vistas dentro del proyecto) directamente en cualquier navegador moderno (Chrome, Edge, Firefox).
   - Opcionalmente, puedes utilizar la extensión **Live Server** de VS Code para recarga en caliente automática.

---

## 🔄 Integración con Backend

- **Repositorio Backend:** `[Pendiente de integración]`
- **Documentación API:** `[Enlace a Swagger / Postman / Endpoints futuros]`

---

## 🌿 Flujo de Trabajo y Convenciones Git

Para mantener una integración fluida y ordenada:

- `main`: Rama principal de producción / entregas finales.
- `develop`: Rama de integración activa.
- `feature/<nombre>`: Desarrollo de nuevas características (ej: `feature/login-jwt`).
- `fix/<nombre>`: Corrección de fallos (ej: `fix/layout-overflow`).

### Convención de Commits (Conventional Commits)
- `feat:` Nueva funcionalidad añadida.
- `fix:` Corrección de errores.
- `docs:` Modificaciones en documentación.
- `style:` Cambios de estilos o formato sin alterar lógica.
- `refactor:` Mejoras de código que no cambian funcionalidad.

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
