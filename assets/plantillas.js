/* ══════════════════════════════════════════════════════════════
   plantillas.js — definición de las plantillas de CV
   Cada plantilla = { nombre, desc, html, css, defecto }
   Placeholders disponibles:
     {{css}} {{nombre}} {{puesto}} {{ubicacion}} {{foto}} {{pie}}
     {{contacto}} {{habilidades}} {{idiomas}}
     {{seccion_resumen}} {{seccion_experiencia}} {{seccion_educacion}}
     {{seccion_proyectos}} {{seccion_personalizadas}}
   Variables CSS (inyectadas por app.js según los colores elegidos):
     --acento --acento-suave --acento-oscuro --acento-legible
     --secundario --secundario-claro --secundario-tenue
     --fondo --sobre-acento --sobre-secundario --sobre-mixto
     --fuente --tamano
   ══════════════════════════════════════════════════════════════ */

/* ── Estilos compartidos (van primero; cada plantilla los sobreescribe) ── */
const CSS_BASE = `
:root{
  --acento:#2563eb;--acento-suave:#93c5fd;--acento-oscuro:#1d4ed8;--acento-legible:#93c5fd;
  --secundario:#0f172a;--secundario-claro:#26313f;--secundario-tenue:#f1f2f4;
  --fondo:#f1f5f9;--linea:#e5e7eb;--texto:#1f2937;--texto-suave:#6b7280;
  --sobre-acento:#fff;--sobre-secundario:#fff;--sobre-mixto:#fff;
  --fuente:"Segoe UI",system-ui,-apple-system,Roboto,Arial,sans-serif;
  --mono:Consolas,"SF Mono",Menlo,monospace;
  --tamano:15px;--interlineado:1.6;
}
*{box-sizing:border-box;margin:0;padding:0}
html{-webkit-text-size-adjust:100%}
body{
  background:var(--fondo);color:var(--texto);font-family:var(--fuente);
  font-size:var(--tamano);line-height:var(--interlineado);-webkit-text-size-adjust:100%;
}
img{max-width:100%;display:block}
a{color:var(--acento)}
.hoja{
  position:relative;display:block;width:100%;max-width:794px;margin:1.5rem auto;
  background:#fff;min-height:1123px;overflow:hidden;
  box-shadow:0 10px 34px rgba(15,23,42,.13);
}
.avatar{
  display:flex;align-items:center;justify-content:center;object-fit:cover;
  background:linear-gradient(135deg,var(--acento),var(--acento-oscuro));
  color:var(--sobre-acento);font-weight:700;font-size:1.9rem;letter-spacing:.04em;flex:0 0 auto;
}
.sin-foto .avatar{display:none!important}
/* ── bloques de panel (contacto · habilidades · idiomas) ── */
.panel-bloque{margin-top:1.5rem}
.panel-bloque h3{
  font-size:.72rem;text-transform:uppercase;letter-spacing:.14em;color:var(--texto);
  border-bottom:1px solid var(--linea);padding-bottom:.45rem;margin-bottom:.7rem;
}
.contacto{list-style:none}
.contacto li{font-size:.82rem;margin:.5rem 0;word-break:break-word}
.contacto a{color:var(--texto);text-decoration:none;display:flex;gap:.5rem;align-items:flex-start}
.contacto .ico{flex:0 0 auto;width:1rem;text-align:center}
.chips{display:flex;flex-wrap:wrap;gap:.4rem}
.chip{background:#f3f4f6;border:1px solid var(--linea);color:var(--texto);border-radius:6px;padding:.2rem .55rem;font-size:.76rem}
.cat{display:block;font-size:.7rem;text-transform:uppercase;letter-spacing:.08em;color:var(--texto-suave);margin:.7rem 0 .4rem}
.cat:first-child{margin-top:0}
.idiomas{list-style:none}
.idiomas li{display:flex;justify-content:space-between;gap:.8rem;font-size:.82rem;margin:.35rem 0}
.nivel{color:var(--acento);font-size:.75rem}
/* ── columnas de contenido ── */
.bloque{margin-bottom:1.5rem}
.bloque>h2{
  font-size:.92rem;text-transform:uppercase;letter-spacing:.1em;color:var(--acento);
  border-bottom:2px solid var(--linea);padding-bottom:.4rem;margin-bottom:.85rem;
}
.resumen{color:#374151;font-size:.94rem}
.item{margin-bottom:1.05rem}
.item:last-child{margin-bottom:0}
.item-cab{display:flex;justify-content:space-between;align-items:baseline;gap:.8rem}
.item-cab h3{font-size:1rem;color:var(--texto)}
.fechas{background:#f3f4f6;color:var(--texto-suave);border-radius:99px;padding:.15rem .6rem;font-size:.7rem;white-space:nowrap;flex:0 0 auto}
.sub{font-size:.84rem;color:var(--texto-suave);font-weight:600;margin:.05rem 0 .3rem}
.detalles{margin-left:1rem;color:#374151;font-size:.88rem}
.detalles li{margin:.2rem 0}
.enlazado{color:var(--acento);text-decoration:none}
.enlazado:hover{text-decoration:underline}
/* ── variantes de estilo de títulos (las elige el usuario) ── */
.hoja.tit-normal .bloque>h2{text-transform:none;letter-spacing:normal}
.hoja.tit-versalitas .bloque>h2{text-transform:none;font-variant:small-caps;letter-spacing:.07em;font-size:1rem}
.pie{margin-top:1.6rem;border-top:1px solid var(--linea);padding-top:.7rem;font-size:.72rem;color:var(--texto-suave)}
@media (max-width:700px){
  .hoja{margin:0;min-height:0}
  .item-cab{flex-direction:column;gap:.25rem}
  .fechas{align-self:flex-start}
}
@page{size:A4;margin:0}
@media print{
  html,body{background:#fff}
  .hoja{margin:0;max-width:none;width:100%;min-height:0;box-shadow:none}
  *{-webkit-print-color-adjust:exact;print-color-adjust:exact}
}
`;

const PLANTILLAS = {

  /* ─────────────────────────── 1. MODERNA ─────────────────────────── */
  moderna: {
    nombre: "Moderna",
    desc: "Barra lateral oscura con foto circular",
    defecto: { acento: "#2563eb", secundario: "#0f172a", texto: "#1f2937", fondo: "#eef2f7" },
    html: `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="CV de {{nombre}} — {{puesto}}">
<title>{{nombre}} · CV</title>
<style>{{css}}</style>
</head>
<body>
<div class="hoja{{estilo_clase}}">
  <aside class="panel">
    {{foto}}
    <h1>{{nombre}}</h1>
    <p class="rol">{{puesto}}</p>
    {{contacto}}
    {{habilidades}}
    {{idiomas}}
  </aside>
  <main class="contenido">
    {{seccion_resumen}}
    {{seccion_experiencia}}
    {{seccion_educacion}}
    {{seccion_proyectos}}
    {{seccion_personalizadas}}
    {{pie}}
  </main>
</div>
</body>
</html>`,
    css: `
.hoja{display:grid;grid-template-columns:236px 1fr}
.panel{background:var(--secundario);color:var(--sobre-secundario);padding:2rem 1.35rem}
.panel .avatar{width:96px;height:96px;border-radius:50%;margin:0 auto 1rem}
.panel>h1{font-size:1.22rem;color:var(--sobre-secundario);text-align:center;word-break:break-word}
.rol{text-align:center;color:var(--acento-legible);font-size:.85rem;margin-top:.25rem}
.panel .panel-bloque h3{color:var(--acento-legible);border-color:var(--secundario-claro)}
.panel .contacto a{color:inherit}
.panel .contacto .ico{color:var(--acento-legible)}
.panel .chip{background:var(--secundario-claro);border-color:transparent;color:inherit}
.panel .cat{color:inherit;opacity:.65}
.panel .nivel{color:var(--acento-legible)}
.contenido{padding:2rem 1.7rem}
@media (max-width:700px){.hoja{grid-template-columns:1fr}.panel{padding:1.6rem 1.3rem}}
`
  },

  /* ─────────────────────────── 2. CLÁSICA ─────────────────────────── */
  clasica: {
    nombre: "Clásica",
    desc: "Serif, cabecera centrada, aspecto papel",
    defecto: { acento: "#7a5c2e", secundario: "#141414", texto: "#141414", fondo: "#f5f4f0" },
    html: `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="CV de {{nombre}} — {{puesto}}">
<title>{{nombre}} · Currículum</title>
<style>{{css}}</style>
</head>
<body>
<div class="hoja{{estilo_clase}}">
  <header class="cabecera">
    {{foto}}
    <h1>{{nombre}}</h1>
    <p class="rol">{{puesto}}</p>
    {{contacto}}
  </header>
  <main>
    {{seccion_resumen}}
    {{seccion_experiencia}}
    {{seccion_educacion}}
    {{seccion_proyectos}}
    {{seccion_personalizadas}}
    {{habilidades}}
    {{idiomas}}
    {{pie}}
  </main>
</div>
</body>
</html>`,
    css: `
body{font-family:Georgia,"Times New Roman",var(--fuente)}
.hoja{padding:2.1rem 2.5rem;background:#fff}
.cabecera{
  text-align:center;border-bottom:3px double var(--texto);padding-bottom:1rem;
  display:flex;flex-direction:column;align-items:center;
}
.cabecera .avatar{width:94px;height:94px;border-radius:50%;margin-bottom:.7rem;filter:grayscale(100%) contrast(1.05)}
.cabecera h1{font-size:1.85rem;text-transform:uppercase;letter-spacing:.06em}
.cabecera .rol{font-style:italic;color:#444;margin-top:.3rem}
.cabecera .panel-bloque{margin-top:.75rem}
.cabecera .panel-bloque h3{display:none}
.cabecera .contacto{display:flex;flex-wrap:wrap;justify-content:center}
.cabecera .contacto li{display:inline;margin:.1rem .1rem;font-size:.82rem;color:#333}
.cabecera .contacto li:not(:last-child)::after{content:" · ";color:#9a9a9a}
.cabecera .contacto a{display:inline;color:#333;text-decoration:none}
.cabecera .contacto a:hover{text-decoration:underline}
.cabecera .contacto .ico{display:none}
main{padding-top:1.4rem}
.bloque>h2,.panel-bloque h3{
  font-family:Georgia,serif;font-size:1.02rem;text-transform:uppercase;
  letter-spacing:.1em;font-variant:small-caps;border-bottom:1px solid var(--texto);
  color:var(--texto);font-weight:600;
}
.resumen{color:#222}
.item-cab h3{font-family:Georgia,serif}
.fechas{background:transparent;border:0;padding:0;font-style:italic;font-size:.8rem;color:#555}
.sub{color:#555;font-weight:600}
.detalles{color:#222}
.chip{border:1px solid #bbb;background:#fafafa;color:#222;border-radius:3px}
.cat{color:#555;font-weight:700}
.nivel{font-style:italic;color:#555}
.pie{text-align:center;font-style:italic;color:#777;border-top:1px solid #ccc}
@media (max-width:700px){.hoja{padding:1.5rem 1.2rem}}
@media print{.hoja{padding:14mm 14mm}}
`
  },

  /* ─────────────────────────── 3. MÍNIMA ─────────────────────────── */
  minimal: {
    nombre: "Mínima",
    desc: "Blanca, líneas finas, muy limpia",
    defecto: { acento: "#0f766e", secundario: "#111827", texto: "#111827", fondo: "#ececeb" },
    html: `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="CV de {{nombre}} — {{puesto}}">
<title>{{nombre}} · CV</title>
<style>{{css}}</style>
</head>
<body>
<div class="hoja{{estilo_clase}}">
  <header class="cabecera">
    {{foto}}
    <div class="titulos">
      <h1>{{nombre}}</h1>
      <p class="rol">{{puesto}}</p>
      {{contacto}}
    </div>
  </header>
  <main>
    {{seccion_resumen}}
    {{seccion_experiencia}}
    {{seccion_educacion}}
    {{seccion_proyectos}}
    {{seccion_personalizadas}}
    <div class="paneles">{{habilidades}}{{idiomas}}</div>
    {{pie}}
  </main>
</div>
</body>
</html>`,
    css: `
.hoja{padding:2.3rem 2.5rem}
.cabecera{
  display:grid;grid-template-columns:auto 1fr;gap:1.4rem;align-items:center;
  border-bottom:1px solid var(--texto);padding-bottom:1.3rem;
}
.cabecera .avatar{width:108px;height:108px;border-radius:4px;filter:grayscale(100%)}
.cabecera h1{font-size:1.7rem;font-weight:600;letter-spacing:-.02em}
.rol{color:var(--acento);font-size:.9rem;font-weight:600}
.cabecera .panel-bloque{margin-top:.7rem}
.cabecera .panel-bloque h3{display:none}
.cabecera .contacto{display:flex;flex-wrap:wrap;gap:.1rem .9rem}
.cabecera .contacto li{margin:0}
.cabecera .contacto a{color:var(--texto-suave);text-decoration:none;font-size:.8rem}
.cabecera .contacto .ico{display:none}
main{padding-top:1.5rem}
.paneles{display:grid;grid-template-columns:1fr 1fr;gap:1.4rem;margin-top:.4rem}
.bloque>h2{border-bottom:1px solid var(--texto);color:var(--texto);letter-spacing:.16em;font-size:.78rem}
.fechas{background:transparent;padding:0;color:var(--texto-suave);font-size:.74rem}
.chip{background:transparent;border:1px solid var(--linea);border-radius:99px;color:var(--texto-suave)}
.nivel{color:var(--acento)}
@media (max-width:700px){
  .hoja{padding:1.5rem 1.2rem}
  .cabecera{grid-template-columns:1fr;justify-items:start}
  .paneles{grid-template-columns:1fr}
}
.sin-foto .cabecera{grid-template-columns:1fr}
`
  },

  /* ─────────────────────────── 4. CREATIVA ─────────────────────────── */
  creativa: {
    nombre: "Creativa",
    desc: "Cabecera con degradado y lateral de color",
    defecto: { acento: "#f43f5e", secundario: "#7c3aed", texto: "#1f2937", fondo: "#f7f5ff" },
    html: `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="CV de {{nombre}} — {{puesto}}">
<title>{{nombre}} · CV</title>
<style>{{css}}</style>
</head>
<body>
<div class="hoja{{estilo_clase}}">
  <header class="cabecera">
    {{foto}}
    <div class="titulos">
      <h1>{{nombre}}</h1>
      <p class="rol">{{puesto}}</p>
    </div>
  </header>
  <div class="cuerpo">
    <main class="principal">
      {{seccion_resumen}}
      {{seccion_experiencia}}
      {{seccion_educacion}}
      {{seccion_proyectos}}
      {{seccion_personalizadas}}
      {{pie}}
    </main>
    <aside class="lateral">
      {{contacto}}
      {{habilidades}}
      {{idiomas}}
    </aside>
  </div>
</div>
</body>
</html>`,
    css: `
.cabecera{
  background:linear-gradient(115deg,var(--secundario),var(--acento));
  color:var(--sobre-mixto);padding:1.9rem 2.2rem;display:flex;align-items:center;gap:1.3rem;
}
.cabecera .avatar{
  width:104px;height:104px;border-radius:50%;border:4px solid rgba(255,255,255,.85);
  background:rgba(255,255,255,.18);color:var(--sobre-mixto);font-size:1.9rem;
}
.cabecera h1{font-size:1.65rem;line-height:1.15;word-break:break-word}
.rol{color:var(--sobre-mixto);opacity:.88;font-weight:600;font-size:.9rem;margin-top:.2rem}
.cuerpo{display:grid;grid-template-columns:1fr 232px}
.principal{padding:1.7rem 1.4rem 1.5rem 2.1rem}
.lateral{background:var(--secundario-tenue);border-left:4px solid var(--acento);padding:1.7rem 1.3rem}
.lateral .panel-bloque h3{color:var(--acento)}
.lateral .contacto a{color:var(--texto)}
.lateral .contacto .ico{color:var(--acento)}
.lateral .chip{background:#fff;border-color:var(--linea);color:var(--texto)}
.lateral .nivel{color:var(--acento);font-weight:600}
.bloque>h2{border-bottom:0;background:var(--acento);color:var(--sobre-acento);
  display:inline-block;padding:.2rem .7rem;border-radius:4px;letter-spacing:.08em}
.pie{border-top:1px dashed var(--linea)}
@media (max-width:700px){
  .cabecera{flex-direction:column;text-align:center;padding:1.6rem 1.3rem}
  .cuerpo{grid-template-columns:1fr}
  .principal{padding:1.5rem 1.3rem .5rem}
  .lateral{border-left:0;border-top:4px solid var(--acento);margin-top:1rem}
}
`
  },

  /* ─────────────────────────── 5. ELEGANTE ─────────────────────────── */
  elegante: {
    nombre: "Elegante",
    desc: "Columna de perfil a la derecha, tonos cálidos",
    defecto: { acento: "#b45309", secundario: "#292524", texto: "#292524", fondo: "#e8e4dd" },
    html: `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="CV de {{nombre}} — {{puesto}}">
<title>{{nombre}} · CV</title>
<style>{{css}}</style>
</head>
<body>
<div class="hoja{{estilo_clase}}">
  <main class="contenido">
    {{seccion_resumen}}
    {{seccion_experiencia}}
    {{seccion_educacion}}
    {{seccion_proyectos}}
    {{seccion_personalizadas}}
    {{pie}}
  </main>
  <aside class="panel">
    {{foto}}
    <h1>{{nombre}}</h1>
    <p class="rol">{{puesto}}</p>
    {{contacto}}
    {{habilidades}}
    {{idiomas}}
  </aside>
</div>
</body>
</html>`,
    css: `
.hoja{display:grid;grid-template-columns:1fr 244px}
.contenido{padding:2.1rem 1.8rem 2rem 2.2rem}
.panel{background:var(--secundario-tenue);border-left:2px solid var(--acento);padding:2.1rem 1.3rem;color:var(--texto)}
.panel .avatar{width:100%;aspect-ratio:3/4;height:auto;border-radius:2px;filter:grayscale(100%) contrast(1.03);margin-bottom:1.1rem}
.panel>h1{font-family:Georgia,serif;font-size:1.3rem;text-align:center;word-break:break-word}
.rol{text-align:center;color:var(--acento);font-size:.84rem;font-style:italic;margin-top:.2rem}
.panel .panel-bloque h3{color:var(--acento);border-color:rgba(0,0,0,.14)}
.panel .contacto a{color:var(--texto)}
.panel .contacto .ico{color:var(--acento)}
.panel .chip{background:rgba(255,255,255,.7);border-color:rgba(0,0,0,.14);color:var(--texto)}
.panel .cat{color:var(--texto-suave)}
.panel .nivel{color:var(--acento);font-weight:600}
.bloque>h2{color:var(--acento);border-bottom:1px solid var(--acento)}
.item-cab h3{font-family:Georgia,serif;font-size:1.05rem}
.fechas{background:transparent;padding:0;color:var(--texto-suave);font-style:italic}
.pie{border-top:1px solid rgba(0,0,0,.14)}
@media (max-width:700px){
  .hoja{grid-template-columns:1fr}
  .contenido{padding:1.6rem 1.3rem}
  .panel{border-left:0;border-top:2px solid var(--acento);order:-1}
  .panel .avatar{width:120px;aspect-ratio:3/4;margin:0 auto 1rem}
}
`
  },

  /* ─────────────────────────── 6. TÉCNICA ─────────────────────────── */
  tecnica: {
    nombre: "Técnica",
    desc: "Banda oscura, tipografía monoespaciada",
    defecto: { acento: "#16a34a", secundario: "#111827", texto: "#0f172a", fondo: "#f1f5f9" },
    html: `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="CV de {{nombre}} — {{puesto}}">
<title>{{nombre}} · CV</title>
<style>{{css}}</style>
</head>
<body>
<div class="hoja{{estilo_clase}}">
  <header class="cabecera">
    {{foto}}
    <div class="titulos">
      <h1>{{nombre}}</h1>
      <p class="rol">{{puesto}}</p>
    </div>
    <span class="etiqueta">curriculum vitae</span>
  </header>
  <div class="cuerpo">
    <main class="principal">
      {{seccion_resumen}}
      {{seccion_experiencia}}
      {{seccion_educacion}}
      {{seccion_proyectos}}
      {{seccion_personalizadas}}
      {{pie}}
    </main>
    <aside class="lateral">
      {{contacto}}
      {{habilidades}}
      {{idiomas}}
    </aside>
  </div>
</div>
</body>
</html>`,
    css: `
.cabecera{
  background:var(--secundario);color:var(--sobre-secundario);
  padding:1.5rem 1.9rem;display:flex;align-items:center;gap:1.1rem;
  border-bottom:4px solid var(--acento);
}
.cabecera .avatar{
  width:84px;height:84px;background:transparent;border:2px solid var(--acento);
  color:var(--acento);font-family:var(--mono);font-size:1.5rem;border-radius:2px;
}
.cabecera h1{font-family:var(--mono);font-size:1.45rem;letter-spacing:-.03em}
.rol{color:var(--sobre-secundario);opacity:.72;font-size:.86rem;font-family:var(--mono)}
.cabecera .etiqueta{
  margin-left:auto;font-family:var(--mono);font-size:.66rem;letter-spacing:.22em;
  text-transform:uppercase;color:var(--sobre-secundario);opacity:.55;
}
.cuerpo{display:grid;grid-template-columns:1fr 226px}
.principal{padding:1.7rem 1.5rem 1.5rem 1.9rem}
.lateral{background:#f8fafc;border-left:1px solid var(--linea);padding:1.7rem 1.3rem}
.lateral .panel-bloque h3{color:var(--acento);border-bottom:2px solid var(--acento);font-family:var(--mono)}
.lateral .contacto .ico{color:var(--acento)}
.lateral .chip{background:#fff;border:1px solid var(--linea);color:var(--texto);border-radius:3px;font-family:var(--mono);font-size:.72rem}
.lateral .nivel{color:var(--acento);font-family:var(--mono)}
.bloque>h2{
  font-family:var(--mono);font-size:.8rem;border-bottom:1px dashed var(--linea);
  color:var(--texto);letter-spacing:.06em;
}
.bloque>h2::before{content:"// ";color:var(--acento)}
.fechas{background:transparent;border:1px solid var(--linea);border-radius:3px;color:var(--texto-suave);font-family:var(--mono);font-size:.7rem}
.sub{font-family:var(--mono);font-size:.78rem;color:var(--acento)}
@media (max-width:700px){
  .cabecera{flex-wrap:wrap;padding:1.3rem}
  .cabecera .etiqueta{display:none}
  .cuerpo{grid-template-columns:1fr}
  .principal{padding:1.5rem 1.3rem .5rem}
  .lateral{border-left:0;border-top:1px solid var(--linea)}
}
`
  }
};
