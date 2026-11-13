# Generador de CV

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/docs/Web/JavaScript)
[![GPL-3.0](https://img.shields.io/badge/Licencia-GPL--3.0-blue)](LICENSE)

[Español](#español) · [English](#english)

---

## Español

### Índice

- [Descripción](#descripción)
- [Demo](#demo)
- [Características](#características)
- [Uso rápido](#uso-rápido)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Publicar en GitHub Pages](#publicar-en-github-pages)
- [Añadir una plantilla](#añadir-una-plantilla)
- [Privacidad](#privacidad)
- [Licencia](#licencia)

### Descripción

Aplicación web **100 % estática** para crear currículums en el navegador: eliges una de las **6 plantillas**, subes la foto, personalizas colores, tipografías, tamaños y orden de secciones, y descargas el resultado en **PDF**. Sin servidores, sin base de datos y sin dependencias: todo se guarda en el `localStorage` del equipo.

### Demo

**Pruébalo:** <https://alberto2005-coder.github.io/generador-cv/>

### Características

| Apartado | Opciones |
|---|---|
| **Plantillas** | Moderna, Clásica, Mínima, Creativa, Elegante y Técnica; se cambian sin perder datos |
| **Foto** | Subida con recorte y compresión automáticos; se puede ocultar |
| **Diseño** | Color principal, secundario, texto y fondo; fuente, tamaño, interlineado y estilo de títulos |
| **Títulos** | Renombrar u ocultar los títulos de cada sección |
| **Orden** | Subir o bajar cualquier apartado, incluidas las secciones propias |
| **Secciones propias** | Ilimitadas, en formato lista, proyecto, párrafo o imagen |
| **Campos personalizados** | Permisos, disponibilidad, carnés y lo que necesites |
| **Datos** | Experiencia, educación, proyectos, habilidades e idiomas con alta, baja y reordenación |
| **Copias** | Autoguardado, exportar/importar JSON y descarga del HTML final |

### Uso rápido

1. Abre `index.html` (doble clic vale).
2. Elige plantilla, rellena tus datos y sube la foto.
3. Pulsa **Descargar PDF** y, en el diálogo de impresión, elige:
   - Destino: **Guardar como PDF**
   - Márgenes: **Ninguno**
   - Activa **Gráficos de fondo** para conservar los colores.

Si prefieres servirlo en local:

```bash
npx serve .
# o
python -m http.server 8000
```

### Estructura del proyecto

```text
generador-cv/
├── index.html                    # Aplicación y entrada de GitHub Pages
├── assets/
│   ├── app.css                   # Estilos del editor
│   ├── app.js                    # Estado, render, temas y descargas
│   └── plantillas.js             # Las 6 plantillas (HTML + CSS del CV)
├── .github/workflows/pages.yml   # Publicación automática
├── favicon.png
├── LICENSE
└── README.md
```

### Publicar en GitHub Pages

1. Sube el proyecto a un repositorio:
   ```bash
   git init
   git add .
   git commit -m "Creador de CV"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
   git push -u origin main
   ```
2. En GitHub: **Settings → Pages → Source: GitHub Actions**.

El workflow incluido publica la raíz en cada push; no hay paso de build porque el sitio ya es estático.

### Añadir una plantilla

En `assets/plantillas.js`, copia una entrada del objeto `PLANTILLAS` y cámbiale el nombre:

```js
miplantilla: {
  nombre: "Mi plantilla",
  desc: "Descripción corta para la tarjeta",
  defecto: { acento: "#2563eb", secundario: "#0f172a", texto: "#1f2937", fondo: "#f1f5f9" },
  html: `<!DOCTYPE html> … <div class="hoja{{estilo_clase}}"> … </div>`,
  css: `.hoja{…} …`
}
```

Placeholders disponibles: `{{css}}`, `{{nombre}}`, `{{puesto}}`, `{{foto}}`, `{{cuerpo}}`, `{{contacto}}`, `{{habilidades}}`, `{{idiomas}}` y `{{pie}}`. `{{cuerpo}}` es obligatorio: ahí se pintan las secciones en el orden elegido.

### Privacidad

El CV, la foto y los colores **no salen del equipo**: viven en el `localStorage` del navegador. Para moverlos a otro ordenador, exporta el JSON e impórtalo. Si abres la web en otro navegador o borras los datos del sitio, verás el ejemplo inicial.

### Licencia

**GNU General Public License v3.0 (GPL-3.0)** — consulta [LICENSE](LICENSE). Si distribuyes copias o versiones modificadas, deben publicarse bajo la misma licencia (copyleft).

---

## English

### Table of contents

- [Overview](#overview)
- [Demo](#demo)
- [Features](#features)
- [Quick start](#quick-start)
- [Project structure](#project-structure)
- [Deploy to GitHub Pages](#deploy-to-github-pages)
- [Adding a template](#adding-a-template)
- [Privacy](#privacy)
- [License](#license)

### Overview

A **100 % static** web app to build résumés in the browser: pick one of **6 templates**, upload your photo, customise colours, fonts, sizes and section order, then download the result as a **PDF**. No servers, no database and no dependencies: everything is stored in the device's `localStorage`.

### Demo

**Try it:** <https://alberto2005-coder.github.io/generador-cv/>

### Features

| Area | Options |
|---|---|
| **Templates** | Modern, Classic, Minimal, Creative, Elegant and Technical; switch without losing data |
| **Photo** | Upload with automatic cropping and compression; can be hidden |
| **Styling** | Primary, secondary, text and background colours; font, size, line height and heading style |
| **Headings** | Rename or hide each section's heading |
| **Ordering** | Move any section up or down, including custom ones |
| **Custom sections** | Unlimited, as a list, project entry, paragraph or image |
| **Custom fields** | Licences, availability, permits and whatever else you need |
| **Data** | Experience, education, projects, skills and languages with add, delete and reorder |
| **Backups** | Autosave, JSON import/export and raw HTML download |

### Quick start

1. Open `index.html` (double-clicking works).
2. Choose a template, fill in your details and upload a photo.
3. Click **Download PDF** and, in the print dialog, pick:
   - Destination: **Save as PDF**
   - Margins: **None**
   - Enable **Background graphics** to keep the colours.

To serve it locally instead:

```bash
npx serve .
# or
python -m http.server 8000
```

### Project structure

```text
generador-cv/
├── index.html                    # App and GitHub Pages entry point
├── assets/
│   ├── app.css                   # Editor styles
│   ├── app.js                    # State, rendering, themes and downloads
│   └── plantillas.js             # The 6 templates (CV HTML + CSS)
├── .github/workflows/pages.yml   # Automatic deployment
├── favicon.png
├── LICENSE
└── README.md
```

### Deploy to GitHub Pages

1. Push the project to a repository:
   ```bash
   git init
   git add .
   git commit -m "Resume builder"
   git branch -M main
   git remote add origin https://github.com/YOUR-USER/YOUR-REPO.git
   git push -u origin main
   ```
2. On GitHub: **Settings → Pages → Source: GitHub Actions**.

The included workflow publishes the root on every push; there is no build step because the site is already static.

### Adding a template

In `assets/plantillas.js`, copy an entry from the `PLANTILLAS` object and rename it:

```js
mytemplate: {
  nombre: "My template",
  desc: "Short description for the card",
  defecto: { acento: "#2563eb", secundario: "#0f172a", texto: "#1f2937", fondo: "#f1f5f9" },
  html: `<!DOCTYPE html> … <div class="hoja{{estilo_clase}}"> … </div>`,
  css: `.hoja{…} …`
}
```

Available placeholders: `{{css}}`, `{{nombre}}`, `{{puesto}}`, `{{foto}}`, `{{cuerpo}}`, `{{contacto}}`, `{{habilidades}}`, `{{idiomas}}` and `{{pie}}`. `{{cuerpo}}` is mandatory: it renders the sections in the chosen order.

### Privacy

Your résumé, photo and colours **never leave your device**: they live in browser `localStorage`. To move them to another computer, export the JSON and import it. Opening the site in another browser or clearing site data shows the initial demo again.

### License

**GNU General Public License v3.0 (GPL-3.0)** — see [LICENSE](LICENSE). Distributed copies or modified versions must be released under the same copyleft license.
