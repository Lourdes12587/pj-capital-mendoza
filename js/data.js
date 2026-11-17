/* =========================================================
   CONTENIDO DEL SITIO
   Los datos que faltan están marcados como PENDIENTE (regla del proyecto:
   no inventar datos). Cuando exista el backend, estos datos vendrán de la API.
   ========================================================= */

window.SITE_DATA = {

  /* ---------- SECCIONES DE LA CAPITAL ----------
     habitantes: null hasta tener la cifra oficial (la página muestra "Dato pendiente").
     fuente: de dónde sale la cifra (censo, organismo, año). PENDIENTE hasta cargarla.
     path: polígono ESQUEMÁTICO del mapa (viewBox 0 0 800 430), no son límites reales.
     label: posición [x, y] del número en el mapa.            */
  secciones: [
    { n: 1,  nombre: "Parque Central",           habitantes: null, fuente: "PENDIENTE", path: "M640,45 L780,55 L775,150 L635,150 Z",          label: [707, 100] },
    { n: 2,  nombre: "Barrio Cívico",            habitantes: null, fuente: "PENDIENTE", path: "M495,150 L635,150 L630,262 L490,258 Z",        label: [562, 205] },
    { n: 3,  nombre: "Parque O'Higgins",         habitantes: null, fuente: "PENDIENTE", path: "M612,262 L770,262 L765,400 L606,402 Z",        label: [688, 332] },
    { n: 4,  nombre: "Área Fundacional",         habitantes: null, fuente: "PENDIENTE", path: "M635,150 L775,150 L770,262 L630,262 Z",        label: [702, 206] },
    { n: 5,  nombre: "Residencial Sur",          habitantes: null, fuente: "PENDIENTE", path: "M430,260 L490,258 L612,262 L606,402 L436,405 Z", label: [520, 332] },
    { n: 6,  nombre: "Residencial Norte",        habitantes: null, fuente: "PENDIENTE", path: "M500,40 L640,45 L635,150 L495,150 Z",          label: [567, 96] },
    { n: 7,  nombre: "Residencial Parque",       habitantes: null, fuente: "PENDIENTE", path: "M352,145 L495,150 L490,258 L430,260 L346,262 Z", label: [420, 205] },
    { n: 8,  nombre: "Aeroparque",               habitantes: null, fuente: "PENDIENTE", path: "M362,32 L500,40 L495,150 L352,145 Z",          label: [428, 90] },
    { n: 9,  nombre: "Parque General San Martín", habitantes: null, fuente: "PENDIENTE", path: "M228,272 L346,262 L430,260 L436,405 L234,402 Z", label: [332, 335] },
    { n: 10, nombre: "Residencial Los Cerros",   habitantes: null, fuente: "PENDIENTE", path: "M222,152 L352,145 L346,262 L228,272 Z",        label: [287, 208] },
    { n: 11, nombre: "San Agustín",              habitantes: null, fuente: "PENDIENTE", path: "M212,22 L362,32 L352,145 L222,152 Z",          label: [287, 88] },
    { n: 12, nombre: "Piedemonte",               habitantes: null, fuente: "PENDIENTE", path: "M24,48 L212,22 L222,152 L228,272 L234,402 L44,412 L12,230 Z", label: [120, 225] }
  ],

  /* ---------- PRESIDENTE ---------- */
  presidente: {
    nombre: "Fernando Ortiz",
    cargo: "Presidente",
    // Foto: guardar como img/fernando-ortiz.jpg
    // completar con una breve biografía: trayectoria militante, compromiso con la ciudad y los ejes de su conducción
    descripcion: "Presidente del Partido Justicialista de la Capital de Mendoza."
  },

  /* ---------- COMISIÓN PARTIDARIA ----------
     Nombres PENDIENTES: cargarlos tal como figuran en el acta oficial. */
  comision: [
    { cargo: "Vicepresidente/a 1°",       nombre: "PENDIENTE: nombre" },
    { cargo: "Vicepresidente/a 2°",       nombre: "PENDIENTE: nombre" },
    { cargo: "Secretario/a General",      nombre: "PENDIENTE: nombre" },
    { cargo: "Secretario/a de Actas",     nombre: "PENDIENTE: nombre" },
    { cargo: "Tesorero/a",                nombre: "PENDIENTE: nombre" },
    { cargo: "Secretario/a de Organización", nombre: "PENDIENTE: nombre" },
    { cargo: "Secretario/a de la Mujer",  nombre: "PENDIENTE: nombre" },
    { cargo: "Secretario/a de Juventud",  nombre: "PENDIENTE: nombre" },
    { cargo: "Vocal titular",             nombre: "PENDIENTE: nombre" },
    { cargo: "Vocal titular",             nombre: "PENDIENTE: nombre" },
    { cargo: "Vocal suplente",            nombre: "PENDIENTE: nombre" },
    { cargo: "Vocal suplente",            nombre: "PENDIENTE: nombre" }
  ]
};
