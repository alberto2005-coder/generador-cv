# 📄 Creador de CV — plantillas, foto y PDF

Web 100% estática para crear currículums en el navegador: eliges una de las **6 plantillas**, subes tu foto, personalizas **colores, fuentes, tamaños y orden de las secciones** y descargas el resultado en **PDF**.

Sin servidores, sin base de datos y **sin dependencias**: todo se procesa en tu navegador y se guarda en tu propio `localStorage`. Ideal para publicar gratis en **GitHub Pages**.

## 🚀 Uso rápido

1. Abre `index.html` en el navegador (doble clic vale).
2. Elige plantilla → rellena tus datos → sube la foto.
3. Botón **⬇ Descargar PDF** → en el diálogo elige:
   - Destino: **Guardar como PDF**
   - Márgenes: **Ninguno**
   - ✅ **Gráficos de fondo** (para conservar los colores)

> Si abres el proyecto con doble clic funciona igual; si prefieres un servidor local:
> `npx serve .` o `python -m http.server 8000`

## ✨ Qué permite

| Apartado | Opciones |
| --- | --- |
| 📐 **Plantillas** | Moderna, Clásica, Mínima, Creativa, Elegante, Técnica (cambiables en cualquier momento sin perder datos) |
| 🖼 **Foto** | Subida con recorte y compresión automáticos, se oculta con un clic |
| 🎨 **Diseño** | Color principal, secundario, del texto y del fondo · fuente · tamaño · interlineado · estilo de los títulos · mostrar/ocular foto y pie |
| ✏️ **Títulos** | Renombra (o elimina) los títulos de cada sección |
| 🔀 **Orden** | Sube/baja cada apartado, incluidas tus secciones propias |
| 📌 **Secciones propias** | Ilimitadas, con 4 formatos: **lista**, **entradas tipo proyecto**, **párrafo** e **imagen** |
| ➕ **Campos personalizados** | Añade tantos como quieras (permisos, disponibilidad, carnés…) |
| 📦 **Datos** | Experiencia, educación, proyectos, habilidades e idiomas con añadir / borrar / reordenar |
| 💾 **Copia** | Autoguardado + exportar/importar JSON, y descarga del HTML final |

## 📁 Estructura

```
generador-cv-estatico/
├── index.html              # la app (entrada de GitHub Pages)
├── assets/
│   ├── app.css             # estiles del editor
│   ├── app.js              # lógica: datos, render, colores, descargas
│   └── plantillas.js       # las 6 plantillas (HTML + CSS del CV)
├── .github/workflows/pages.yml   # publicación automática
└── README.md
```

## 🌐 Publicar en GitHub Pages

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

El workflow incluido publica la raíz del repositorio en cada push (no hay build: la web ya es estática).

## ➕ Añadir una plantilla

Abre `assets/plantillas.js` y copia una entrada del objeto `PLANTILLAS` con otro nombre:

```js
miplantilla: {
  nombre: "Mi plantilla",
  desc: "Descripción corta que se ve en la tarjeta",
  defecto: { acento: "#2563eb", secundario: "#0f172a", texto: "#1f2937", fondo: "#f1f5f9" },
  html: `<!DOCTYPE html> … <div class="hoja{{estilo_clase}}"> … </div>`,
  css: `.hoja{…} …`
}
```

Placeholders disponibles: `{{css}}` `{{nombre}}` `{{puesto}}` `{{foto}}` `{{cuerpo}}`
`{{contacto}}` `{{habilidades}}` `{{idiomas}}` `{{pie}}`.
La variable `{{cuerpo}}` es **obligatoria**: ahí se pintan las secciones en el orden elegido.

## 🔒 Notas de privacidad

- Tu CV, tu foto y tus colores **no salen de tu equipo**: viven en el `localStorage` del navegador.
- Para llevarlo a otro ordenador, exporta el JSON (⬇ JSON) e impórtalo (⬆ JSON).
- Si cierras y abres la web en otro navegador, verás el ejemplo inicial.

## Licencia

GPL-3.0 — úsalo, modifícalo y compártelo libremente; si distribuyes copias o versiones modificadas, publícalas bajo la misma licencia (copyleft). Ver [LICENSE](LICENSE).

# 📄 Resume Builder — Templates, Photo & PDF Export

A 100% static web app to build resumes directly in the browser: pick from **6 templates**, upload your photo, customize **colors, typography, sizing, and section ordering**, and export the final result as a **PDF**.

No servers, no databases, and **zero dependencies**: everything runs client-side in your browser and persists locally via `localStorage`. Ideal for free hosting on **GitHub Pages**.

## 🚀 Quickstart

1. Open `index.html` in your browser (double-clicking the file works).
2. Choose a template → enter your details → upload a photo.
3. Click the **⬇ Download PDF** button → in the print dialog, select:
* Destination: **Save as PDF**
* Margins: **None**
* ✅ **Background graphics** (to preserve custom styling and colors)



> Double-clicking the local file runs fully functional; if you prefer running via a local development server:
> `npx serve .` or `python -m http.server 8000`

## ✨ Features

| Feature | Details |
| --- | --- |
| 📐 **Templates** | Modern, Classic, Minimal, Creative, Elegant, Technical (switch at any time without losing data) |
| 🖼 **Photo** | Direct upload with automatic cropping and compression; toggle visibility with one click |
| 🎨 **Styling** | Primary, secondary, text, and background colors · font family · text size · line height · heading styles · toggle photo and footer |
| ✏️ **Headings** | Rename (or hide) the headings of every section |
| 🔀 **Ordering** | Move any section up or down, including custom sections |
| 📌 **Custom Sections** | Unlimited custom blocks with 4 formats: **list**, **project-style entries**, **paragraph**, and **image** |
| ➕ **Custom Fields** | Add as many extra metadata fields as needed (licenses, availability, permits…) |
| 📦 **Data Blocks** | Experience, education, projects, skills, and languages with full add / delete / reorder support |
| 💾 **Backups** | In-browser autosave + JSON import/export, and raw HTML export |

## 📁 Repository Structure

```
generador-cv-estatico/
├── index.html                  # Main app entrypoint (GitHub Pages entry)
├── assets/
│   ├── app.css                 # Editor UI styles
│   ├── app.js                  # Core logic: data state, rendering, theming, exports
│   └── plantillas.js           # The 6 templates (HTML structure + CV CSS)
├── .github/workflows/pages.yml # Automated GitHub Pages deployment
└── README.md

```

## 🌐 Deploy to GitHub Pages

1. Push the project to a GitHub repository:
```bash
git init
git add .
git commit -m "Resume Builder"
git branch -M main
git remote add origin https://github.com/YOUR-USER/YOUR-REPO.git
git push -u origin main

```


2. In GitHub: go to **Settings → Pages → Source: GitHub Actions**.

The included workflow automatically deploys the root directory on every push (no build step required: the site is already static).

## ➕ Adding a New Template

Open `assets/plantillas.js` and add a new entry to the `PLANTILLAS` object:

```js
mytemplate: {
  nombre: "My Template",
  desc: "Short description displayed on the template card",
  defecto: { acento: "#2563eb", secundario: "#0f172a", texto: "#1f2937", fondo: "#f1f5f9" },
  html: `<!DOCTYPE html> … <div class="hoja{{estilo_clase}}"> … </div>`,
  css: `.hoja{…} …`
}

```

Available template placeholders: `{{css}}`, `{{nombre}}`, `{{puesto}}`, `{{foto}}`, `{{cuerpo}}`, `{{contacto}}`, `{{habilidades}}`, `{{idiomas}}`, `{{pie}}`.

The `{{cuerpo}}` token is **mandatory**: it renders all dynamic sections in your chosen order.

## 🔒 Privacy Notice

* Your resume data, photo, and color settings **never leave your device**: everything lives inside browser `localStorage`.
* To migrate your data to another computer, export the JSON file (⬇ JSON) and import it (⬆ JSON).
* Clearing browser cache or opening the site in a different browser will display the initial default demo data.

## License

GPL-3.0 — free to use, modify, and share; if you distribute copies or derivative works, they must be published under the same copyleft license. See [LICENSE](https://www.google.com/search?q=LICENSE).
