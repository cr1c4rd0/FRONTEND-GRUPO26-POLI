# 🚀 FRONTEND - Grupo 26 (Poli)

> Aplicación web desarrollada por el **Grupo 26** para el proyecto académico del Politécnico Grancolombiano.

[![Estado del Proyecto](https://img.shields.io/badge/Estado-En%20Desarrollo-yellow?style=for-the-badge)](#)
[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green?style=for-the-badge&logo=node.js)](#)
[![Licencia](https://img.shields.io/badge/Licencia-Educativa-blue?style=for-the-badge)](#)

---

## 📋 Tabla de Contenidos

- [Descripción del Proyecto](#-descripción-del-proyecto)
- [Características Principales](#-características-principales)
- [Tecnologías Utilizadas](#️-tecnologías-utilizadas)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación y Puesta en Marcha](#-instalación-y-puesta-en-marcha)
- [Variables de Entorno](#-variables-de-entorno)
- [Integración con Backend](#-integración-con-backend)
- [Flujo de Trabajo y Convenciones Git](#-flujo-de-trabajo-y-convenciones-git)
- [Integrantes del Grupo 26](#-integrantes-del-grupo-26)
- [Institución](#-institución)

---

## 📖 Descripción del Proyecto

*(Breve resumen de 1 a 2 párrafos explicando de qué trata la plataforma, cuál es la problemática que resuelve y a qué usuarios va dirigida).*

> **Nota:** Esta aplicación frontend proporciona una interfaz intuitiva, moderna y responsiva que interactúa con los servicios y endpoints provistos por el backend del proyecto.

---

## ✨ Características Principales

- [ ] **Autenticación y Autorización:** Inicio de sesión, registro y control de acceso a rutas protegidas.
- [ ] **Diseño Responsivo:** Adaptabilidad a dispositivos móviles, tablets y pantallas de escritorio.
- [ ] **Gestión de Estado:** Manejo predecible y centralizado de la información en la aplicación.
- [ ] **Consumo de API REST:** Peticiones HTTP asíncronas con manejo de errores y estados de carga.
- [ ] **Validación de Formularios:** Retroalimentación amigable y validaciones en tiempo real.

---

## 🛠️ Tecnologías Utilizadas

- **Lenguaje / Framework:** [React / Angular / Vue / Vanilla JS]
- **Empaquetador / Build Tool:** [Vite / Webpack / Next.js]
- **Estilos:** [CSS Modules / Tailwind CSS / SASS]
- **Cliente HTTP:** [Axios / Fetch API]
- **Gestión de Estado:** [Context API / Redux Toolkit / Zustand / Pinia]
- **Calidad de Código:** ESLint, Prettier

---

## 📂 Estructura del Proyecto

```text
frontend-grupo26-poli/
├── public/                 # Archivos estáticos públicos (logos, favicon)
├── src/
│   ├── assets/             # Recursos locales (imágenes, iconos, tipografías)
│   ├── components/         # Componentes reutilizables (Botones, Navbar, Cards)
│   ├── context/ / hooks/   # Contextos globales y hooks personalizados
│   ├── layouts/            # Diseños estructurales compartidos
│   ├── pages/ / views/     # Páginas y vistas principales
│   ├── services/           # Conexión con endpoints y servicios del Backend
│   ├── routes/             # Enrutamiento de la aplicación
│   ├── styles/             # Hojas de estilo y tokens de diseño
│   ├── utils/              # Funciones auxiliares y constantes
│   ├── App.jsx / App.vue   # Componente raíz
│   └── main.jsx / index.js # Punto de entrada de la aplicación
├── .env.example            # Plantilla de variables de entorno requeridas
├── .gitignore              # Archivos ignorados por Git
├── package.json            # Dependencias y scripts del proyecto
└── README.md               # Documentación del proyecto
```

---

## ⚙️ Requisitos Previos

Antes de comenzar, asegúrate de contar con:

- **Node.js**: Versión `v18.x` o superior ([Descargar Node.js](https://nodejs.org/))
- **npm** (o gestor preferido: `yarn`, `pnpm`)
- **Git**: Sistema de control de versiones

---

## 🚀 Instalación y Puesta en Marcha

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/cr1c4rd0/FRONTEND-GRUPO26-POLI.git
   cd FRONTEND-GRUPO26-POLI
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   ```bash
   cp .env.example .env
   ```
   Ajusta las variables necesarias dentro de `.env`.

4. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en [http://localhost:5173](http://localhost:5173) (o el puerto configurado).

5. **Generar compilación para producción:**
   ```bash
   npm run build
   ```

---

## 🔐 Variables de Entorno

| Variable | Descripción | Valor por Defecto |
| :--- | :--- | :--- |
| `VITE_API_BASE_URL` | URL base para las peticiones a la API del Backend | `http://localhost:8000/api` |
| `VITE_APP_ENV` | Entorno de despliegue (`development`, `production`) | `development` |

---

## 🔄 Integración con Backend

- **Repositorio Backend:** `[Enlace al repositorio del backend]`
- **Documentación API:** `[Enlace a Swagger / Postman]`

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
| **Juan Esteban Serna** | *Frontend Developer* | [@usuario](https://github.com) |
| **Juan Manuel Saldarriaga** | *Frontend Developer / UI-UX* | [@usuario](https://github.com) |

---

## 🏫 Institución

- **Institución:** Politécnico Grancolombiano
- **Materia:** FRONTEND
- **Tutor / Docente:** Jhon Olarte
- **Año / Periodo:** 2026-I
