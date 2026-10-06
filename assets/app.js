/* ══════════════════════════════════════════════════════════════
   app.js — creador de CV (100% cliente, sin servidor)
   Edita → vista previa en vivo → descarga PDF / HTML / JSON
   ══════════════════════════════════════════════════════════════ */
'use strict';

/* ══════════ Datos de ejemplo ══════════ */
const EJEMPLO = {
  nombre: "Tu Nombre",
  puesto: "Diseñador/a de Producto",
  ubicacion: "Madrid, España",
  resumen: "Me gusta convertir problemas complejos en interfaces sencillas. Trabajo con datos, prototipos rápidos y mucha atención al detalle.",
  foto: "",
  contacto: {
    email: "tu@email.com", telefono: "+34 600 123 456",
    website: "https://tudominio.dev", github: "https://github.com/tuusuario",
    linkedin: "https://www.linkedin.com/in/tuusuario"
  },
  experiencia: [
    { puesto: "Diseñador/a de Producto", empresa: "Acme Labs", lugar: "Madrid (híbrido)", fechas: "2023 — Actualidad",
      detalles: ["Rediseñé el flujo de onboarding: +28 % de activación.", "Creé y mantengo el design system (Figma + código)."] },
    { puesto: "Diseñador/a Web", empresa: "Estudio Norte", lugar: "Remoto", fechas: "2021 — 2023",
      detalles: ["Más de 15 landing pages con foco en conversión.", "Investigación con usuarios: 40 entrevistas."] }
  ],
  educacion: [
    { titulo: "Grado en Diseño Gráfico", institucion: "Universidad Ejemplo", fechas: "2017 — 2021", detalles: ["Premio al mejor TFG."] },
    { titulo: "Certificación UX Research", institucion: "Interaction Design Foundation", fechas: "2022", detalles: [] }
  ],
  proyectos: [
    { nombre: "paleta-cli", enlace: "https://github.com/tuusuario/paleta-cli", descripcion: "Generador de paletas accesibles desde terminal.", fechas: "2024" },
    { nombre: "mi-portfolio", enlace: "", descripcion: "Portfolio personal estático, sin dependencias.", fechas: "2025" }
  ],
  habilidades: [
    { categoria: "Diseño", items: ["Figma", "Prototipado", "Design systems", "Accesibilidad"] },
    { categoria: "Código", items: ["HTML", "CSS", "JavaScript", "React"] },
    { categoria: "Método", items: ["Research", "Agile", "Analytics"] }
  ],
  idiomas: [
    { nombre: "Español", nivel: "Nativo" },
    { nombre: "Inglés", nivel: "B2" }
  ],
  secciones: [
    { titulo: "Voluntariado", lineas: ["Mentoría de estudiantes de diseño (2022 — actualidad)."] }
  ],
  campos_extra: [
    { etiqueta: "Permiso de trabajo", valor: "España / UE" },
    { etiqueta: "Disponibilidad", valor: "Inmediata" }
  ],
  titulos: {}
};

const TITULOS_DEF = {
  perfil: "Perfil", experiencia: "Experiencia", educacion: "Educación",
  proyectos: "Proyectos", habilidades: "Habilidades", idiomas: "Idiomas", contacto: "Contacto"
};

/* Secciones repetibles del formulario */
const LISTAS = {
  experiencia: {
    titulo: "💼 Experiencia", etiqueta: i => `Experiencia ${i + 1}`,
    vacio: () => ({ puesto: "", empresa: "", lugar: "", fechas: "", detalles: [] }),
    campos: [
      { k: "puesto", l: "Puesto" }, { k: "empresa", l: "Empresa" },
      { k: "lugar", l: "Lugar" }, { k: "fechas", l: "Fechas" },
      { k: "detalles", l: "Logros (uno por línea)", t: "lines", area: true }
    ]
  },
  educacion: {
    titulo: "🎓 Educación", etiqueta: i => `Educación ${i + 1}`,
    vacio: () => ({ titulo: "", institucion: "", fechas: "", detalles: [] }),
    campos: [
      { k: "titulo", l: "Título" }, { k: "institucion", l: "Institución" },
      { k: "fechas", l: "Fechas" },
      { k: "detalles", l: "Detalles (uno por línea)", t: "lines", area: true }
    ]
  },
  proyectos: {
    titulo: "🚀 Proyectos", etiqueta: i => `Proyecto ${i + 1}`,
    vacio: () => ({ nombre: "", enlace: "", descripcion: "", fechas: "" }),
    campos: [
      { k: "nombre", l: "Nombre" }, { k: "fechas", l: "Fechas" },
      { k: "enlace", l: "Enlace (opcional)" },
      { k: "descripcion", l: "Descripción", area: true }
    ]
  },
  habilidades: {
    titulo: "🛠️ Habilidades", etiqueta: i => `Grupo ${i + 1}`,
    vacio: () => ({ categoria: "", items: [] }),
    campos: [
      { k: "categoria", l: "Categoría" },
      { k: "items", l: "Elementos (separados por coma)", t: "commas", area: true }
    ]
  },
  idiomas: {
    titulo: "🌐 Idiomas", etiqueta: i => `Idioma ${i + 1}`,
    vacio: () => ({ nombre: "", nivel: "" }),
    campos: [{ k: "nombre", l: "Idioma" }, { k: "nivel", l: "Nivel" }]
  },
  secciones: {
    titulo: "📌 Secciones propias", etiqueta: i => `Sección ${i + 1}`,
    ayuda: "Crea tus apartados: Certificaciones, Cursos, Publicaciones, Referencias…",
    vacio: () => ({ titulo: "", lineas: [] }),
    campos: [
      { k: "titulo", l: "Título de la sección" },
      { k: "lineas", l: "Contenido (una línea por punto)", t: "lines", area: true }
    ]
  },
  campos_extra: {
    titulo: "➕ Campos personalizados", etiqueta: i => `Campo ${i + 1}`,
    ayuda: "Se muestran junto a tu contacto: idiomas extra, carnés, permisos…",
    vacio: () => ({ etiqueta: "", valor: "" }),
    campos: [{ k: "etiqueta", l: "Etiqueta" }, { k: "valor", l: "Valor" }]
  }
};

const FUENTES = [
  ["", "La de la plantilla (recomendado)"],
  ['"Segoe UI",system-ui,-apple-system,Roboto,Arial,sans-serif', "Segoe UI / System"],
  ["Verdana,Geneva,sans-serif", "Verdana"],
  ['Georgia,"Times New Roman",serif', "Georgia (serif)"],
  ['"Trebuchet MS",Tahoma,sans-serif', "Trebuchet"],
  ['"Courier New",monospace', "Courier (monoespaciada)"]
];

/* ══════════ Estado ══════════ */
const CLAVE = "cv-estatico-v2";
let datos = clonar(EJEMPLO);
let tema = "moderna";
let colores = {};          // { tema: {acento, secundario, texto, fondo} }
let fuente = "";           // "" = fuente por defecto de la plantilla
let tamano = 15;
let interlineado = 1.6;
let estiloTitulos = "";    // "" | tit-normal | tit-versalitas
let mostrarFoto = true;
let mostrarPie = true;
let zoom = "auto";

function clonar(x) { return JSON.parse(JSON.stringify(x)); }

function getPath(obj, p) {
  let a = obj;
  for (const parte of p.split(".")) { if (a == null) return ""; a = a[parte]; }
  return a == null ? "" : a;
}
function setPath(obj, p, v) {
  const partes = p.split(".");
  let a = obj;
  for (let i = 0; i < partes.length - 1; i++) {
    if (typeof a[partes[i]] !== "object" || a[partes[i]] === null) a[partes[i]] = {};
    a = a[partes[i]];
  }
  a[partes[partes.length - 1]] = v;
}
function tiene(obj, k) { return Object.prototype.hasOwnProperty.call(obj, k); }

let avisoGuardado = false;
function empaquetar() {
  return { v: 2, datos, tema, colores, fuente, tamano, interlineado, estiloTitulos, mostrarFoto, mostrarPie, zoom };
}
function guardar() {
  try { localStorage.setItem(CLAVE, JSON.stringify(empaquetar())); avisoGuardado = false; }
  catch (e) {
    if (!avisoGuardado) { avisoGuardado = true; avisar("No se pudo guardar en el navegador (¿foto demasiado grande?). Tus cambios siguen aquí hasta que cierres la pestaña."); }
  }
}
function cargar() {
  let raw = null;
  try { raw = localStorage.getItem(CLAVE) || localStorage.getItem("cv-estatico-v1"); } catch (e) {}
  if (!raw) return;
  try {
    const o = JSON.parse(raw);
    if (o.datos) datos = Object.assign(clonar(EJEMPLO), o.datos);
    if (o.tema && PLANTILLAS[o.tema]) tema = o.tema;
    if (o.colores) colores = o.colores;
    if (typeof o.fuente === "string") fuente = o.fuente;
    if (o.tamano) tamano = +o.tamano;
    if (o.interlineado) interlineado = +o.interlineado;
    if (typeof o.estiloTitulos === "string") estiloTitulos = o.estiloTitulos;
    if (typeof o.mostrarFoto === "boolean") mostrarFoto = o.mostrarFoto;
    if (typeof o.mostrarPie === "boolean") mostrarPie = o.mostrarPie;
    if (o.zoom) zoom = o.zoom;
  } catch (e) {}
}

/* ══════════ Escapado y render ══════════ */
const esc = v => String(v ?? "")
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

function get(obj, clave) {
  let a = obj;
  for (const parte of clave.split(".")) {
    if (a === null || typeof a !== "object") return null;
    a = a[parte];
  }
  return a === undefined ? null : a;
}
function renderPlantilla(html, ctx) {
  return html.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_, clave) => {
    const v = get(ctx, clave);
    return v === null ? "" : String(v);
  });
}

/* ══════════ Color y tipografía (variables CSS) ══════════ */
function aRgb(h) {
  h = String(h || "").trim();
  if (h[0] === "#") h = h.slice(1);
  if (h.length === 3) h = h.split("").map(c => c + c).join("");
  if (h.length !== 6 || /[^0-9a-f]/i.test(h)) return [37, 99, 235];
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}
function aHex(r) {
  return "#" + r.map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("");
}
function mezclar(a, b, t) {
  const A = aRgb(a), B = aRgb(b);
  return aHex(A.map((v, i) => v + (B[i] - v) * t));
}
function luminancia(h) {
  const c = aRgb(h).map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
function contraste(a, b) {
  const l1 = luminancia(a), l2 = luminancia(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}
/** Texto legible sobre un fondo claro u oscuro */
function sobre(bg) { return luminancia(bg) > 0.42 ? "#111827" : "#ffffff"; }
/** Candidato con más contraste sobre un fondo */
function mejorContraste(candidatos, fondo) {
  return candidatos.reduce((m, c) => (contraste(c, fondo) > contraste(m, fondo) ? c : m));
}

function coloresDe(t) {
  if (!colores[t]) {
    const d = PLANTILLAS[t] ? PLANTILLAS[t].defecto : PLANTILLAS.moderna.defecto;
    colores[t] = { acento: d.acento, secundario: d.secundario, texto: d.texto, fondo: d.fondo };
  }
  const c = colores[t];
  if (!c.texto) c.texto = (PLANTILLAS[t].defecto.texto) || "#1f2937";
  if (!c.fondo) c.fondo = PLANTILLAS[t].defecto.fondo;
  return c;
}

function varsCSS() {
  const c = coloresDe(tema);
  const a = c.acento, s = c.secundario, t = c.texto, f = c.fondo;
  const aT = mezclar(a, "#ffffff", 0.45);
  const aO = mezclar(a, "#000000", 0.30);
  const lista = [
    `--acento:${a}`,
    `--acento-suave:${aT}`,
    `--acento-oscuro:${aO}`,
    `--acento-legible:${mejorContraste([a, aT, aO], s)}`,
    `--secundario:${s}`,
    `--secundario-claro:${mezclar(s, "#ffffff", 0.12)}`,
    `--secundario-tenue:${mezclar(s, "#ffffff", 0.92)}`,
    `--fondo:${f}`,
    `--texto:${t}`,
    `--texto-suave:${mezclar(t, "#ffffff", 0.42)}`,
    `--linea:${mezclar(t, "#ffffff", 0.83)}`,
    `--sobre-acento:${sobre(a)}`,
    `--sobre-secundario:${sobre(s)}`,
    `--sobre-mixto:${sobre(mezclar(a, s, 0.5))}`,
    `--interlineado:${interlineado}`,
    `--tamano:${tamano}px`
  ];
  if (fuente) lista.push(`--fuente:${fuente}`);
  return `:root{${lista.join(";")}}`;
}

/* ══════════ Secciones del CV ══════════ */
function tit(clave) {
  return (datos.titulos && tiene(datos.titulos, clave)) ? datos.titulos[clave] : TITULOS_DEF[clave];
}
function bloque(titulo, cuerpo) {
  if (!String(cuerpo || "").trim()) return "";
  const t = String(titulo || "").trim();
  return `<section class="bloque">${t ? `<h2>${esc(t)}</h2>` : ""}${cuerpo}</section>`;
}
function panelBloque(titulo, cuerpo) {
  if (!String(cuerpo || "").trim()) return "";
  const t = String(titulo || "").trim();
  return `<div class="panel-bloque">${t ? `<h3>${esc(t)}</h3>` : ""}${cuerpo}</div>`;
}
function itemHTML(cab, sub, detalles) {
  const ul = (detalles && detalles.length)
    ? `<ul class="detalles">${detalles.map(d => `<li>${esc(d)}</li>`).join("")}</ul>` : "";
  return `<article class="item"><div class="item-cab">${cab}</div>${sub}${ul}</article>`;
}

function seccionResumen(d) {
  return d.resumen ? bloque(tit("perfil"), `<p class="resumen">${esc(d.resumen)}</p>`) : "";
}
function seccionExperiencia(d) {
  const partes = (d.experiencia || []).map(e =>
    itemHTML(
      `<h3>${esc(e.puesto)}</h3><span class="fechas">${esc(e.fechas)}</span>`,
      e.empresa ? `<p class="sub">${esc(e.empresa)}${e.lugar ? " · " + esc(e.lugar) : ""}</p>` : "",
      e.detalles));
  return bloque(tit("experiencia"), partes.join(""));
}
function seccionEducacion(d) {
  const partes = (d.educacion || []).map(e =>
    itemHTML(
      `<h3>${esc(e.titulo)}</h3><span class="fechas">${esc(e.fechas)}</span>`,
      e.institucion ? `<p class="sub">${esc(e.institucion)}</p>` : "",
      e.detalles));
  return bloque(tit("educacion"), partes.join(""));
}
function seccionProyectos(d) {
  const partes = (d.proyectos || []).map(p => {
    const nombre = p.enlace
      ? `<a class="enlazado" href="${esc(p.enlace)}" target="_blank" rel="noopener">${esc(p.nombre)}</a>`
      : esc(p.nombre);
    return itemHTML(
      `<h3>${nombre}</h3>${p.fechas ? `<span class="fechas">${esc(p.fechas)}</span>` : ""}`,
      p.descripcion ? `<p class="sub">${esc(p.descripcion)}</p>` : "", null);
  });
  return bloque(tit("proyectos"), partes.join(""));
}
function seccionPropias(d) {
  const partes = (d.secciones || []).map(s => {
    const ul = (s.lineas && s.lineas.length)
      ? `<ul class="detalles">${s.lineas.map(l => `<li>${esc(l)}</li>`).join("")}</ul>` : "";
    return bloque(s.titulo, ul);
  });
  return partes.join("");
}
function panelContacto(d) {
  const c = d.contacto || {};
  const filas = [];
  const enlace = (i, t, h) => filas.push(
    `<li><a href="${esc(h)}" target="_blank" rel="noopener"><span class="ico">${i}</span>${esc(t)}</a></li>`);
  const linea = (i, t) => filas.push(`<li><span class="ico">${i}</span>${esc(t)}</li>`);

  if (c.email) enlace("&#9993;", c.email, "mailto:" + String(c.email).trim());
  if (c.telefono) enlace("&#9742;", c.telefono, "tel:" + String(c.telefono).replace(/[\s()\-\u00a0]/g, ""));
  if (d.ubicacion) linea("&#9678;", d.ubicacion);
  for (const [k, i] of [["website", "&#127760;"], ["github", "&#128187;"], ["linkedin", "&#128188;"]]) {
    const url = c[k];
    if (url) enlace(i, String(url).replace(/^https?:\/\//, "").replace(/\/$/, ""), url);
  }
  (d.campos_extra || []).forEach(x => {
    const et = String(x.etiqueta || "").trim(), va = String(x.valor || "").trim();
    if (et || va) linea("&#9679;", [et, va].filter(Boolean).join(": "));
  });
  if (!filas.length) return "";
  return panelBloque(tit("contacto"), `<ul class="contacto">${filas.join("")}</ul>`);
}
function panelHabilidades(d) {
  const grupos = d.habilidades || [];
  if (!grupos.length) return "";
  const html = grupos.map(g => {
    const cat = g.categoria ? `<span class="cat">${esc(g.categoria)}</span>` : "";
    const chips = (g.items || []).map(i =>
      `<span class="chip">${esc(typeof i === "string" ? i : i.nombre)}</span>`).join("");
    return `${cat}<div class="chips">${chips}</div>`;
  }).join("");
  return panelBloque(tit("habilidades"), html);
}
function panelIdiomas(d) {
  const idiomas = d.idiomas || [];
  if (!idiomas.length) return "";
  const filas = idiomas.map(i =>
    `<li><span>${esc(i.nombre)}</span><span class="nivel">${esc(i.nivel || "")}</span></li>`).join("");
  return panelBloque(tit("idiomas"), `<ul class="idiomas">${filas}</ul>`);
}

function avatarHTML() {
  if (!mostrarFoto) return "";
  const nombre = String(datos.nombre || "");
  if (datos.foto) return `<img class="avatar" src="${datos.foto}" alt="Foto de ${esc(nombre)}">`;
  const ini = nombre.split(/\s+/).filter(Boolean).slice(0, 2).map(p => p[0]).join("").toUpperCase() || "CV";
  return `<div class="avatar" aria-hidden="true">${esc(ini)}</div>`;
}

/* ══════════ Construcción del HTML final ══════════ */
function construirHTML() {
  const tpl = PLANTILLAS[tema] || PLANTILLAS.moderna;
  const css = CSS_BASE + tpl.css + varsCSS();
  const d = datos;

  const foto = avatarHTML();
  const clases = [];
  if (!foto) clases.push("sin-foto");
  if (estiloTitulos) clases.push(estiloTitulos);

  const fecha = new Date().toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" });
  const pie = mostrarPie
    ? `<footer class="pie">Currículum actualizado el ${esc(fecha)}</footer>` : "";

  const ctx = Object.assign({}, d, d.contacto || {}, {
    css,
    estilo_clase: clases.length ? " " + clases.join(" ") : "",
    foto,
    pie,
    contacto: panelContacto(d),
    habilidades: panelHabilidades(d),
    idiomas: panelIdiomas(d),
    seccion_resumen: seccionResumen(d),
    seccion_experiencia: seccionExperiencia(d),
    seccion_educacion: seccionEducacion(d),
    seccion_proyectos: seccionProyectos(d),
    seccion_personalizadas: seccionPropias(d)
  });
  return renderPlantilla(tpl.html, ctx);
}

/* ══════════ Elementos del DOM ══════════ */
const form = document.getElementById("form");
const listas = document.getElementById("listas");
const preview = document.getElementById("preview");
const estado = document.getElementById("estado");
const cajaPlantillas = document.getElementById("plantillas");
const cajaFoto = document.getElementById("foto-caja");
const vistaScroll = document.getElementById("vista-scroll");
const vistaZoom = document.getElementById("vista-zoom");
const toastEl = document.getElementById("toast");

/* ══════════ Avisos ══════════ */
let toastTimer = null;
function avisar(html, ms = 7000) {
  toastEl.innerHTML = html;
  toastEl.classList.add("ver");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("ver"), ms);
}

/* ══════════ Pintar el formulario ══════════ */
function renderPlantillas() {
  cajaPlantillas.innerHTML = Object.entries(PLANTILLAS).map(([k, p]) => `
    <button type="button" class="tpl-card${k === tema ? " activa" : ""}" data-tpl="${k}">
      <span class="tpl-nombre">${esc(p.nombre)}</span>
      <span class="tpl-desc">${esc(p.desc)}</span>
    </button>`).join("");
}

function valorTexto(v, tipo) {
  if (Array.isArray(v)) return tipo === "commas" ? v.join(", ") : v.join("\n");
  return v == null ? "" : String(v);
}

function renderListas() {
  listas.innerHTML = "";
  for (const [nombre, cfg] of Object.entries(LISTAS)) {
    const arr = Array.isArray(datos[nombre]) ? datos[nombre] : (datos[nombre] = []);
    const det = document.createElement("details");
    det.className = "seccion";
    det.open = true;

    const cuerpo = document.createElement("div");
    cuerpo.className = "cuerpo";

    arr.forEach((item, idx) => {
      const tarjeta = document.createElement("div");
      tarjeta.className = "tarjeta";
      let html = `<div class="cab-item">${esc(cfg.etiqueta(idx))}</div>`;
      html += `<div class="herramientas">
        <button type="button" title="Subir" data-move="${nombre}" data-idx="${idx}" data-dir="-1">↑</button>
        <button type="button" title="Bajar" data-move="${nombre}" data-idx="${idx}" data-dir="1">↓</button>
        <button type="button" class="borrar" title="Eliminar" data-del="${nombre}" data-idx="${idx}">✕</button>
      </div>`;
      html += '<div class="rejilla">';
      for (const c of cfg.campos) {
        const val = esc(valorTexto(item[c.k], c.t));
        const campo = c.area
          ? `<textarea data-list="${nombre}" data-idx="${idx}" data-key="${c.k}" data-t="${c.t || ""}" rows="3">${val}</textarea>`
          : `<input data-list="${nombre}" data-idx="${idx}" data-key="${c.k}" data-t="${c.t || ""}" value="${val}">`;
        html += `<div${c.area ? ' style="grid-column:1/-1"' : ""}><label>${esc(c.l)}${campo}</label></div>`;
      }
      html += "</div>";
      tarjeta.innerHTML = html;
      cuerpo.appendChild(tarjeta);
    });

    if (cfg.ayuda) {
      const p = document.createElement("p");
      p.className = "ayuda";
      p.textContent = cfg.ayuda;
      cuerpo.appendChild(p);
    }

    const add = document.createElement("button");
    add.type = "button";
    add.className = "anadir";
    add.dataset.add = nombre;
    add.textContent = "+ Añadir";
    cuerpo.appendChild(add);

    const sum = document.createElement("summary");
    sum.innerHTML = `${esc(cfg.titulo)}${arr.length ? ` <span class="subtle">(${arr.length})</span>` : ""}`;
    det.appendChild(sum);
    det.appendChild(cuerpo);
    listas.appendChild(det);
  }
}

function volcarEstaticos() {
  form.querySelectorAll("[data-bind]").forEach(el => { el.value = getPath(datos, el.dataset.bind); });
}
function volcarTitulos() {
  if (!datos.titulos) datos.titulos = {};
  form.querySelectorAll("[data-titulo]").forEach(el => {
    const k = el.dataset.titulo;
    el.placeholder = TITULOS_DEF[k] || "";
    el.value = tiene(datos.titulos, k) ? datos.titulos[k] : "";
  });
}
function volcarEstilo() {
  const c = coloresDe(tema);
  form.querySelectorAll('input[type="color"][data-estilo]').forEach(el => { el.value = c[el.dataset.estilo]; });
  const selF = form.querySelector('[data-estilo="fuente"]');
  if (selF) selF.value = fuente;
  const selT = form.querySelector('[data-estilo="tamano"]');
  if (selT) selT.value = String(tamano);
  const selI = form.querySelector('[data-estilo="interlineado"]');
  if (selI) selI.value = String(interlineado);
  const selS = form.querySelector('[data-estilo="titulos"]');
  if (selS) selS.value = estiloTitulos;
  form.querySelectorAll("[data-toggle]").forEach(el => {
    el.checked = el.dataset.toggle === "foto" ? mostrarFoto : mostrarPie;
  });
}
function pintarFoto() {
  if (datos.foto) {
    cajaFoto.innerHTML = `<img src="${datos.foto}" alt="Tu foto">`;
    document.getElementById("foto-del").disabled = false;
  } else {
    cajaFoto.innerHTML = "Sin<br>foto";
    document.getElementById("foto-del").disabled = true;
  }
}

/* ══════════ Actualizar vista previa ══════════ */
let temporizador = null;
function actualizar(inmediato) {
  clearTimeout(temporizador);
  const hacer = () => {
    preview.srcdoc = construirHTML();
    estado.textContent = "actualizado " + new Date().toLocaleTimeString("es-ES");
    guardar();
  };
  if (inmediato) hacer();
  else temporizador = setTimeout(hacer, 220);
}

function medir() {
  try {
    const doc = preview.contentWindow && preview.contentWindow.document;
    if (!doc || !doc.body) return;
    const ancho = 794; // A4 a 96 ppp
    const h = Math.max(doc.documentElement.scrollHeight, doc.body.scrollHeight, 900);
    let z = zoom === "auto" ? Math.min(1, (vistaScroll.clientWidth - 30) / ancho) : parseFloat(zoom);
    if (!isFinite(z) || z <= 0) z = 1;
    preview.style.width = ancho + "px";
    preview.style.height = h + "px";
    preview.style.transform = "scale(" + z + ")";
    vistaZoom.style.width = Math.round(ancho * z) + "px";
    vistaZoom.style.height = Math.round(h * z) + "px";
  } catch (e) {}
}
preview.addEventListener("load", () => setTimeout(medir, 30));
let temporizadorResize = null;
window.addEventListener("resize", () => {
  clearTimeout(temporizadorResize);
  temporizadorResize = setTimeout(medir, 120);
});

/* ══════════ Eventos: campos ══════════ */
function manejar(el) {
  if (el.dataset.bind) { setPath(datos, el.dataset.bind, el.value); actualizar(); return true; }

  if (el.dataset.list) {
    const arr = datos[el.dataset.list];
    const item = arr && arr[+el.dataset.idx];
    if (!item) return true;
    let v = el.value;
    if (el.dataset.t === "lines") v = v.split("\n").map(s => s.trim()).filter(Boolean);
    else if (el.dataset.t === "commas") v = v.split(",").map(s => s.trim()).filter(Boolean);
    item[el.dataset.key] = v;
    actualizar();
    return true;
  }

  if (el.dataset.titulo) {
    if (!datos.titulos) datos.titulos = {};
    datos.titulos[el.dataset.titulo] = el.value;
    actualizar();
    return true;
  }

  if (el.dataset.estilo) {
    const k = el.dataset.estilo;
    if (["acento", "secundario", "texto", "fondo"].includes(k)) coloresDe(tema)[k] = el.value;
    else if (k === "fuente") fuente = el.value;
    else if (k === "tamano") tamano = +el.value;
    else if (k === "interlineado") interlineado = +el.value;
    else if (k === "titulos") estiloTitulos = el.value;
    actualizar();
    return true;
  }

  if (el.dataset.toggle) {
    if (el.dataset.toggle === "foto") mostrarFoto = el.checked;
    else mostrarPie = el.checked;
    actualizar(true);
    return true;
  }
  return false;
}
form.addEventListener("input", e => { if (e.target && manejar(e.target)) e.stopPropagation(); });
form.addEventListener("change", e => { if (e.target && manejar(e.target)) e.stopPropagation(); });

/* ══════════ Eventos: añadir / borrar / mover ══════════ */
form.addEventListener("click", e => {
  const add = e.target.closest("[data-add]");
  if (add) {
    const n = add.dataset.add;
    datos[n] = datos[n] || [];
    datos[n].push(LISTAS[n].vacio());
    renderListas();
    actualizar(true);
    return;
  }
  const del = e.target.closest("[data-del]");
  if (del) {
    const n = del.dataset.del;
    if (!confirm("¿Eliminar este elemento?")) return;
    datos[n].splice(+del.dataset.idx, 1);
    renderListas();
    actualizar(true);
    return;
  }
  const mv = e.target.closest("[data-move]");
  if (mv) {
    const n = mv.dataset.move, i = +mv.dataset.idx, d = +mv.dataset.dir, j = i + d;
    const arr = datos[n] || [];
    if (j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    renderListas();
    actualizar(true);
  }
});

/* ══════════ Eventos: plantillas ══════════ */
cajaPlantillas.addEventListener("click", e => {
  const btn = e.target.closest("[data-tpl]");
  if (!btn) return;
  tema = btn.dataset.tpl;
  coloresDe(tema);
  renderPlantillas();
  volcarEstilo();
  actualizar(true);
  avisar(`Plantilla <b>${esc(PLANTILLAS[tema].nombre)}</b> aplicada. Tus datos y fotos se mantienen.`);
});

/* ══════════ Eventos: zoom ══════════ */
document.querySelectorAll("[data-zoom]").forEach(b => {
  b.addEventListener("click", () => {
    zoom = b.dataset.zoom;
    document.querySelectorAll("[data-zoom]").forEach(x => x.classList.toggle("on", x === b));
    medir();
    guardar();
  });
});

/* ══════════ Eventos: foto ══════════ */
function procesarFoto(file) {
  if (!file) return;
  if (!/^image\//.test(file.type)) { avisar("Ese archivo no es una imagen."); return; }
  const fr = new FileReader();
  fr.onerror = () => avisar("No se pudo leer la imagen.");
  fr.onload = ev => {
    const img = new Image();
    img.onerror = () => avisar("No se pudo procesar esta imagen. Prueba con JPG o PNG.");
    img.onload = () => {
      const max = 760;
      let w = img.naturalWidth, h = img.naturalHeight;
      if (!w || !h) { avisar("Imagen vacía."); return; }
      const escala = Math.min(1, max / Math.max(w, h));
      w = Math.max(1, Math.round(w * escala));
      h = Math.max(1, Math.round(h * escala));
      const lienzo = document.createElement("canvas");
      lienzo.width = w; lienzo.height = h;
      const ctx = lienzo.getContext("2d");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);
      try { datos.foto = lienzo.toDataURL("image/jpeg", 0.86); }
      catch (err) { avisar("No se pudo comprimir la imagen."); return; }
      pintarFoto();
      if (!mostrarFoto) { mostrarFoto = true; volcarEstilo(); }
      actualizar(true);
      avisar("Foto añadida ✓");
    };
    img.src = ev.target.result;
  };
  fr.readAsDataURL(file);
}
document.getElementById("foto-in").addEventListener("change", e => {
  procesarFoto(e.target.files[0]);
  e.target.value = "";
});
document.getElementById("foto-del").addEventListener("click", () => {
  datos.foto = "";
  pintarFoto();
  actualizar(true);
});

/* ══════════ Eventos: descargar / imprimir ══════════ */
function descargar(nombreArchivo, contenido, tipo) {
  const blob = new Blob([contenido], { type: tipo });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = nombreArchivo;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
const slug = () =>
  (String(datos.nombre || "mi-cv").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")) || "mi-cv";

document.getElementById("btn-pdf").addEventListener("click", () => {
  avisar("En el diálogo elige <b>Destino: Guardar como PDF</b> · <b>Márgenes: Ninguno</b> · y activa <b>Gráficos de fondo</b> para conservar los colores.", 11000);
  try {
    preview.contentWindow.focus();
    preview.contentWindow.print();
  } catch (e) {
    const w = window.open("", "_blank");
    if (!w) { avisar("Permite las ventanas emergentes para generar el PDF."); return; }
    w.document.open();
    w.document.write(construirHTML());
    w.document.close();
    setTimeout(() => { try { w.print(); } catch (err) {} }, 700);
  }
});
document.getElementById("btn-descargar").addEventListener("click", () => {
  descargar(`cv-${slug()}.html`, construirHTML(), "text/html;charset=utf-8");
  avisar("HTML descargado ✓ (se abre en cualquier navegador)");
});
document.getElementById("btn-json-out").addEventListener("click", () => {
  descargar(`cv-${slug()}.json`, JSON.stringify(empaquetar(), null, 2), "application/json");
  avisar("JSON descargado ✓ (lo puedes volver a importar con ⬆ JSON)");
});
document.getElementById("json-in").addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;
  const fr = new FileReader();
  fr.onload = () => {
    try {
      const o = JSON.parse(fr.result);
      const d = o.datos || o;              // admite el paquete completo o solo los datos
      datos = Object.assign(clonar(EJEMPLO), d);
      if (o.tema && PLANTILLAS[o.tema]) tema = o.tema;
      if (o.colores) colores = o.colores;
      if (typeof o.fuente === "string") fuente = o.fuente;
      if (o.tamano) tamano = +o.tamano;
      if (o.interlineado) interlineado = +o.interlineado;
      if (typeof o.estiloTitulos === "string") estiloTitulos = o.estiloTitulos;
      if (typeof o.mostrarFoto === "boolean") mostrarFoto = o.mostrarFoto;
      if (typeof o.mostrarPie === "boolean") mostrarPie = o.mostrarPie;
      refrescarTodo();
      avisar("Datos importados ✓");
    } catch (err) { avisar("JSON inválido: " + esc(err.message)); }
  };
  fr.readAsText(file);
  e.target.value = "";
});

/* ══════════ Eventos: ejemplos y reseteos ══════════ */
document.getElementById("btn-colores").addEventListener("click", () => {
  delete colores[tema];
  coloresDe(tema);
  volcarEstilo();
  actualizar(true);
  avisar("Colores de la plantilla restaurados.");
});
document.getElementById("btn-ejemplo").addEventListener("click", () => {
  if (!confirm("¿Reemplazar los datos actuales con el ejemplo?")) return;
  datos = clonar(EJEMPLO);
  refrescarTodo();
});
document.getElementById("btn-vaciar").addEventListener("click", () => {
  if (!confirm("¿Borrar todos los datos, la foto y los textos?")) return;
  datos = {
    nombre: "", puesto: "", ubicacion: "", resumen: "", foto: "",
    contacto: {},
    experiencia: [LISTAS.experiencia.vacio()],
    educacion: [LISTAS.educacion.vacio()],
    proyectos: [], habilidades: [], idiomas: [],
    secciones: [], campos_extra: [], titulos: {}
  };
  refrescarTodo();
});

function refrescarTodo() {
  renderPlantillas();
  volcarEstaticos();
  volcarTitulos();
  volcarEstilo();
  renderListas();
  pintarFoto();
  actualizar(true);
}

/* ══════════ Arranque ══════════ */
(function iniciar() {
  cargar();
  if (!datos.titulos) datos.titulos = {};
  coloresDe(tema);

  // fuentes en el desplegable
  const selF = document.getElementById("sel-fuente");
  selF.innerHTML = FUENTES.map(([v, t]) =>
    `<option value="${esc(v)}">${esc(t)}</option>`).join("");
  selF.value = fuente;

  document.querySelectorAll("[data-zoom]").forEach(x =>
    x.classList.toggle("on", x.dataset.zoom === zoom));

  refrescarTodo();
  setTimeout(medir, 120);
})();
