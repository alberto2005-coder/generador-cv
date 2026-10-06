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

MIT — úsalo, modifícalo y compártelo libremente.
