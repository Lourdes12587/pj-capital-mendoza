/* =========================================================
   CONTENIDO DEL SITIO
   Los datos que faltan están marcados como PENDIENTE (regla del CLAUDE.md:
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

  /* ---------- TELÉFONOS ÚTILES PARA LA COMUNIDAD ----------
     Líneas nacionales y de emergencia vigentes en Mendoza.
     ⚠ Verificar todos los números antes de publicar el sitio.
     tel: número a marcar (vacío = falta completar).
     h24: atiende las 24 h · gratis: llamada gratuita · urgente: aparece en la franja de emergencias. */
  telefonos: [
    // Emergencias
    { cat: "Emergencias", nombre: "Emergencias", tel: "911", desc: "Policía, emergencias médicas y rescate.", h24: true, gratis: true, urgente: true },
    { cat: "Emergencias", nombre: "Bomberos", tel: "100", desc: "Incendios, rescates y accidentes.", h24: true, gratis: true, urgente: true },
    { cat: "Emergencias", nombre: "Emergencias médicas", tel: "107", desc: "Ambulancias. También sirve el 911.", h24: true, gratis: true, urgente: true },
    { cat: "Emergencias", nombre: "Defensa Civil", tel: "103", desc: "Temporales, inundaciones y sismos.", h24: true, gratis: true },

    // Violencias y derechos
    { cat: "Violencias y derechos", nombre: "Línea 144 · Violencia de género", tel: "144", desc: "Atención y asesoramiento, anónima y confidencial.", h24: true, gratis: true, urgente: true },
    { cat: "Violencias y derechos", nombre: "Línea 102 · Niñas, niños y adolescentes", tel: "102", desc: "Ayuda y denuncias por derechos de chicos y chicas.", h24: true, gratis: true },
    { cat: "Violencias y derechos", nombre: "Línea 137 · Violencia familiar y sexual", tel: "137", desc: "Asistencia ante violencia familiar y abuso sexual.", h24: true, gratis: true },
    { cat: "Violencias y derechos", nombre: "Línea 145 · Trata de personas", tel: "145", desc: "Denuncias anónimas de trata y explotación.", h24: true, gratis: true },

    // Salud
    { cat: "Salud", nombre: "Salud Responde", tel: "0800-222-1002", desc: "Orientación del Ministerio de Salud de la Nación.", gratis: true },
    { cat: "Salud", nombre: "Línea 141 · Consumos problemáticos", tel: "141", desc: "SEDRONAR: alcohol y otras drogas.", h24: true, gratis: true },
    { cat: "Salud", nombre: "Asistencia al suicida", tel: "135", desc: "Desde todo el país: (011) 5275-1135.", h24: true, gratis: true },

    // Jubilados y trámites
    { cat: "Jubilados y trámites", nombre: "ANSES", tel: "130", desc: "Jubilaciones, pensiones, AUH y turnos.", gratis: true },
    { cat: "Jubilados y trámites", nombre: "PAMI Escucha", tel: "138", desc: "Médicos de cabecera, remedios y trámites.", h24: true, gratis: true },
    { cat: "Jubilados y trámites", nombre: "Defensa del Consumidor (Nación)", tel: "0800-666-1518", desc: "Reclamos por compras, servicios y contratos.", gratis: true },

    // Municipio y servicios — COMPLETAR con los números oficiales vigentes
    { cat: "Municipio y servicios", nombre: "Municipalidad de la Ciudad de Mendoza", tel: "", desc: "Reclamos y trámites municipales." },
    { cat: "Municipio y servicios", nombre: "Hospital Central", tel: "", desc: "Hospital de referencia de la Capital." },
    { cat: "Municipio y servicios", nombre: "Luz · Distribuidora eléctrica", tel: "", desc: "Cortes de luz y emergencias eléctricas." },
    { cat: "Municipio y servicios", nombre: "Agua y cloacas", tel: "", desc: "Pérdidas, falta de agua y cloacas." },
    { cat: "Municipio y servicios", nombre: "Gas · Emergencias", tel: "", desc: "Olor a gas y escapes." }
  ],
  /* ---------- ENCUESTA A VECINOS ----------
     tipo: "multi" (elegir hasta `max`), "single" o "texto".
     Las preguntas se pueden agregar, quitar o editar libremente.
     Los resultados salen solo de respuestas reales (sin cifras de arranque). */
  encuesta: {
    preguntas: [
      {
        id: "preocupaciones", tipo: "multi", max: 3,
        titulo: "¿Qué es lo que más te preocupa hoy?",
        ayuda: "Elegí hasta 3 opciones.",
        opciones: [
          { v: "inseguridad", t: "Inseguridad",      e: "🚨" },
          { v: "sueldos",     t: "Sueldos",          e: "💼" },
          { v: "justicia",    t: "La justicia",      e: "⚖️" },
          { v: "salud",       t: "Salud",            e: "🏥" },
          { v: "obra",        t: "Obra pública",     e: "🚧" },
          { v: "jubilados",   t: "Jubilados",        e: "👵" },
          { v: "nafta",       t: "Nafta",            e: "⛽" },
          { v: "remedios",    t: "Remedios",         e: "💊" },
          { v: "canasta",     t: "Canasta familiar", e: "🛒" },
          { v: "empleo",      t: "Falta de empleo",  e: "🔎" },
          { v: "educacion",   t: "Educación",        e: "📚" },
          { v: "servicios",   t: "Tarifas de luz, gas y agua", e: "💡" }
        ]
      },
      {
        id: "barrio", tipo: "single",
        titulo: "¿Cómo ves tu barrio comparado con hace un año?",
        opciones: [
          { v: "mejor", t: "Mejor", e: "🙂" },
          { v: "igual", t: "Igual", e: "😐" },
          { v: "peor",  t: "Peor",  e: "🙁" }
        ]
      },
      {
        id: "edad", tipo: "single",
        titulo: "¿Qué edad tenés?",
        opciones: [
          { v: "16-24", t: "16 a 24" }, { v: "25-34", t: "25 a 34" }, { v: "35-49", t: "35 a 49" },
          { v: "50-64", t: "50 a 64" }, { v: "65+", t: "65 o más" }
        ]
      },
      {
        id: "seccion", tipo: "seccion",
        titulo: "¿En qué sección de la Capital vivís?",
        ayuda: "Nos sirve para saber qué necesita cada barrio."
      },
      {
        id: "comentario", tipo: "texto", opcional: true,
        titulo: "¿Querés contarnos algo más?",
        ayuda: "Opcional. Una propuesta, un reclamo o un problema de tu cuadra."
      }
    ]
  },

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
