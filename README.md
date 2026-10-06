# 📄 Generador de CV estático

Convierte un JSON con tus datos en un CV en HTML listo para abrir, imprimir o publicar en **GitHub Pages**.
**Cero dependencias**: solo Node.js (>= 18). No hay nada que instalar con `npm install`.

## 🚀 Uso rápido

1. Edita `datos/cv.json` con tus datos.
2. Genera el CV:

   ```bash
   node generar.js
   ```

3. Abre `dist/index.html` en el navegador. Listo ✅

### Comandos

| Comando                     | Qué hace                                        |
| --------------------------- | ----------------------------------------------- |
| `node generar.js`           | Genera `dist/index.html` con el tema *moderna*  |
| `node generar.js clasica`   | Genera `dist/index.html` con el tema *clasica*  |
| `node generar.js --todos`   | Genera `index.html` + todas las plantillas      |
| `node generar.js --watch`   | Regenera automáticamente al guardar cambios     |

También puedes usar los scripts de npm: `npm run build`, `npm run build:clasica`, `npm run watch`.

## 🎨 Temas

- **moderna** — barra lateral oscura, aspecto limpio y colorido.
- **clasica** — diseño sobrio tipo papel, tipografía serif.

Para crear un tema nuevo: copia `plantillas/moderna.html` y `plantillas/moderna.css`
con otro nombre (por ejemplo `minimal.html` / `minimal.css`) y ejecuta
`node generar.js minimal`. Las plantillas usan `{{placeholders}}` que se rellenan
desde el JSON.

## 📁 Estructura

```
generador-cv-estatico/
├── generar.js          # motor (Node, sin dependencias)
├── package.json
├── datos/
│   └── cv.json         # ← aquí vives tú: tus datos
├── plantillas/
│   ├── moderna.html    # plantilla + estilos por tema
│   ├── moderna.css
│   ├── clasica.html
│   └── clasica.css
├── dist/               # salida (generada, no la edites)
│   └── index.html
└── .github/workflows/pages.yml   # deploy automático
```

## 🖨️ Exportar a PDF

1. Abre `dist/index.html` → `Ctrl + P`.
2. Destino: **Guardar como PDF** · Márgenes: **Ninguno** · Orientación: **Vertical (A4)**.
3. Activa **Gráficos de fondo** para conservar los colores.

## 🌐 Publicar en GitHub Pages

```bash
git init
git add .
git commit -m "Mi CV"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
git push -u origin main
```

Luego en GitHub: **Settings → Pages → Source: GitHub Actions**.
El workflow incluido (`.github/workflows/pages.yml`) construye y publica en cada push.

## ✏️ Formato de datos (`datos/cv.json`)

| Campo                     | Tipo               | Descripción                                    |
| ------------------------- | ------------------ | ---------------------------------------------- |
| `nombre`, `puesto`        | string             | Cabecera del CV                                |
| `ubicacion`               | string             | Ciudad/país (opcional)                         |
| `resumen`                 | string             | Párrafo de perfil                              |
| `contacto`                | objeto             | `email`, `telefono`, `website`, `github`, `linkedin` (todos opcionales) |
| `experiencia`             | array de objetos   | `puesto`, `empresa`, `lugar`, `fechas`, `detalles[]` |
| `educacion`               | array de objetos   | `titulo`, `institucion`, `fechas`, `detalles[]` |
| `proyectos`               | array de objetos   | `nombre`, `enlace`, `descripcion`, `fechas`    |
| `habilidades`             | array de objetos   | `categoria` + `items[]`                        |
| `idiomas`                 | array de objetos   | `nombre` + `nivel`                             |

Todo es opcional: si borras un bloque, la sección desaparece del CV.
Ojo: el JSON **no admite comas finales** ni comentarios.

## Licencia

MIT — úsalo, modifícalo y compártelo libremente.
