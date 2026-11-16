/* =========================================================
   CONTENIDO DEL SITIO
   Todo lo que está acá es contenido de ejemplo para editar.
   Cuando exista el backend, estos datos vendrán de la API.
   ========================================================= */

window.SITE_DATA = {

  /* ---------- NOTICIAS ---------- */
  noticias: [
    {
      id: 1,
      categoria: "Institucional",
      fecha: "2026-11-12",
      titulo: "Se renovó la comisión partidaria de la Capital",
      resumen: "Con la participación de afiliados de las doce secciones, quedó conformada la nueva conducción local.",
      cuerpo: "Texto de ejemplo. Reemplazar con el contenido real de la noticia. Aquí se puede contar quiénes participaron, qué se resolvió y cuáles son los próximos pasos de la conducción partidaria en la Ciudad de Mendoza."
    },
    {
      id: 2,
      categoria: "Territorio",
      fecha: "2026-11-05",
      titulo: "Recorrida por la 5ª Sección: escuchando a los vecinos",
      resumen: "Militantes y referentes caminaron el barrio para relevar las necesidades de iluminación, veredas y seguridad.",
      cuerpo: "Texto de ejemplo. Reemplazar con el contenido real de la noticia."
    },
    {
      id: 3,
      categoria: "Afiliación",
      fecha: "2026-10-28",
      titulo: "Abrimos la afiliación online",
      resumen: "Desde ahora cualquier vecino de la Capital puede afiliarse desde su celular, con firma digital.",
      cuerpo: "Texto de ejemplo. Reemplazar con el contenido real de la noticia."
    },
    {
      id: 4,
      categoria: "Territorio",
      fecha: "2026-10-17",
      titulo: "17 de octubre: Día de la Lealtad en la Capital",
      resumen: "Compañeros y compañeras se reunieron para celebrar una fecha central de nuestra historia.",
      cuerpo: "Texto de ejemplo. Reemplazar con el contenido real de la noticia."
    },
    {
      id: 5,
      categoria: "Institucional",
      fecha: "2026-10-02",
      titulo: "Jornada de formación política para jóvenes",
      resumen: "Un ciclo de encuentros sobre doctrina, historia y gestión municipal abierto a toda la militancia.",
      cuerpo: "Texto de ejemplo. Reemplazar con el contenido real de la noticia."
    },
    {
      id: 6,
      categoria: "Afiliación",
      fecha: "2026-09-20",
      titulo: "Actualizá tus datos en el padrón",
      resumen: "Revisá que tu domicilio y sección estén correctos antes de las próximas internas partidarias.",
      cuerpo: "Texto de ejemplo. Reemplazar con el contenido real de la noticia."
    }
  ],

  /* ---------- SECCIONES DE LA CAPITAL ----------
     habitantes: CIFRAS ESTIMATIVAS. Reemplazar por datos oficiales.
     path: polígono esquemático del mapa (viewBox 0 0 800 430).
     label: posición [x, y] del número en el mapa.            */
  secciones: [
    { n: 1,  nombre: "Parque Central",           habitantes: 9800,  path: "M640,45 L780,55 L775,150 L635,150 Z",          label: [707, 100] },
    { n: 2,  nombre: "Barrio Cívico",            habitantes: 8200,  path: "M495,150 L635,150 L630,262 L490,258 Z",        label: [562, 205] },
    { n: 3,  nombre: "Parque O'Higgins",         habitantes: 14500, path: "M612,262 L770,262 L765,400 L606,402 Z",        label: [688, 332] },
    { n: 4,  nombre: "Área Fundacional",         habitantes: 11200, path: "M635,150 L775,150 L770,262 L630,262 Z",        label: [702, 206] },
    { n: 5,  nombre: "Residencial Sur",          habitantes: 15800, path: "M430,260 L490,258 L612,262 L606,402 L436,405 Z", label: [520, 332] },
    { n: 6,  nombre: "Residencial Norte",        habitantes: 13900, path: "M500,40 L640,45 L635,150 L495,150 Z",          label: [567, 96] },
    { n: 7,  nombre: "Residencial Parque",       habitantes: 12600, path: "M352,145 L495,150 L490,258 L430,260 L346,262 Z", label: [420, 205] },
    { n: 8,  nombre: "Aeroparque",               habitantes: 9400,  path: "M362,32 L500,40 L495,150 L352,145 Z",          label: [428, 90] },
    { n: 9,  nombre: "Parque General San Martín", habitantes: 2100, path: "M228,272 L346,262 L430,260 L436,405 L234,402 Z", label: [332, 335] },
    { n: 10, nombre: "Residencial Los Cerros",   habitantes: 3200,  path: "M222,152 L352,145 L346,262 L228,272 Z",        label: [287, 208] },
    { n: 11, nombre: "San Agustín",              habitantes: 8300,  path: "M212,22 L362,32 L352,145 L222,152 Z",          label: [287, 88] },
    { n: 12, nombre: "Piedemonte",               habitantes: 6200,  path: "M24,48 L212,22 L222,152 L228,272 L234,402 L44,412 L12,230 Z", label: [120, 225] }
  ],

  /* ---------- TELÉFONOS ÚTILES PARA LA COMUNIDAD ----------
     Líneas nacionales y de emergencia vigentes en Mendoza.
     ⚠ Verificar todos los números antes de publicar el sitio.
     tel: número a marcar (vacío = falta completar).
     h24: atiende las 24 h · gratis: llamada gratuita · urgente: aparece en la franja de emergencias. */
  telefonos: [
    // Emergencias
    { cat: "Emergencias", nombre: "Emergencias", tel: "911", desc: "Policía, emergencias médicas y rescate. Centro de emergencias de Mendoza.", h24: true, gratis: true, urgente: true },
    { cat: "Emergencias", nombre: "Bomberos", tel: "100", desc: "Incendios, rescates y accidentes.", h24: true, gratis: true, urgente: true },
    { cat: "Emergencias", nombre: "Emergencias médicas", tel: "107", desc: "Ambulancias. También podés llamar al 911.", h24: true, gratis: true, urgente: true },
    { cat: "Emergencias", nombre: "Defensa Civil", tel: "103", desc: "Temporales, inundaciones, sismos y riesgos en la vía pública.", h24: true, gratis: true },

    // Violencias y derechos
    { cat: "Violencias y derechos", nombre: "Línea 144 · Violencia de género", tel: "144", desc: "Atención, contención y asesoramiento a personas en situación de violencia de género. Anónima y confidencial.", h24: true, gratis: true, urgente: true },
    { cat: "Violencias y derechos", nombre: "Línea 102 · Niñas, niños y adolescentes", tel: "102", desc: "Para chicos y chicas que necesitan ayuda o para denunciar la vulneración de sus derechos.", h24: true, gratis: true },
    { cat: "Violencias y derechos", nombre: "Línea 137 · Violencia familiar y sexual", tel: "137", desc: "Programa Las Víctimas contra las Violencias. Asistencia ante violencia familiar y abuso sexual.", h24: true, gratis: true },
    { cat: "Violencias y derechos", nombre: "Línea 145 · Trata de personas", tel: "145", desc: "Denuncias anónimas de trata y explotación de personas.", h24: true, gratis: true },

    // Salud
    { cat: "Salud", nombre: "Salud Responde", tel: "0800-222-1002", desc: "Ministerio de Salud de la Nación: información y orientación en salud.", gratis: true },
    { cat: "Salud", nombre: "Línea 141 · Consumos problemáticos", tel: "141", desc: "SEDRONAR: orientación y acompañamiento por consumo de alcohol y otras drogas.", h24: true, gratis: true },
    { cat: "Salud", nombre: "Asistencia al suicida", tel: "135", desc: "Centro de Asistencia al Suicida. Desde todo el país: (011) 5275-1135.", h24: true, gratis: true },

    // Jubilados y trámites
    { cat: "Jubilados y trámites", nombre: "ANSES", tel: "130", desc: "Jubilaciones, pensiones, AUH, asignaciones y turnos.", gratis: true },
    { cat: "Jubilados y trámites", nombre: "PAMI Escucha", tel: "138", desc: "Atención a afiliados de PAMI: médicos de cabecera, remedios y trámites.", h24: true, gratis: true },
    { cat: "Jubilados y trámites", nombre: "Defensa del Consumidor (Nación)", tel: "0800-666-1518", desc: "Reclamos por abusos en compras, servicios y contratos.", gratis: true },

    // Municipio y servicios — COMPLETAR con los números oficiales vigentes
    { cat: "Municipio y servicios", nombre: "Municipalidad de la Ciudad de Mendoza", tel: "", desc: "Atención al vecino, reclamos y trámites municipales." },
    { cat: "Municipio y servicios", nombre: "Hospital Central", tel: "", desc: "Hospital de referencia de la Capital." },
    { cat: "Municipio y servicios", nombre: "Luz · Distribuidora eléctrica", tel: "", desc: "Cortes de luz y emergencias eléctricas." },
    { cat: "Municipio y servicios", nombre: "Agua y cloacas", tel: "", desc: "Pérdidas, falta de agua y desbordes cloacales." },
    { cat: "Municipio y servicios", nombre: "Gas · Emergencias", tel: "", desc: "Olor a gas y escapes." }
  ],
  /* ---------- ENCUESTA A VECINOS ----------
     tipo: "multi" (elegir hasta `max`), "single" o "texto".
     Las preguntas se pueden agregar, quitar o editar libremente.   */
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
    ],
    /* Resultados de arranque (DEMO). Con backend vendrán de la API. */
    resultadosDemo: {
      total: 1240,
      preocupaciones: { inseguridad: 612, justicia: 340, sueldos: 498, canasta: 410, salud: 305, jubilados: 260, remedios: 214, servicios: 190, empleo: 176, nafta: 150, obra: 98, educacion: 92 }
    }
  },

  /* ---------- PRESIDENTE ---------- */
  presidente: {
    nombre: "Fernando Ortiz",
    cargo: "Presidente",
    // Foto: guardar como img/fernando-ortiz.jpg
    descripcion: "Presidente del Partido Justicialista de la Capital de Mendoza. [Completar con una breve biografía: trayectoria militante, compromiso con la ciudad y los ejes de su conducción.]"
  },

  /* ---------- COMISIÓN PARTIDARIA ---------- */
  comision: [
    { cargo: "Vicepresidente/a 1°",       nombre: "Nombre Apellido" },
    { cargo: "Vicepresidente/a 2°",       nombre: "Nombre Apellido" },
    { cargo: "Secretario/a General",      nombre: "Nombre Apellido" },
    { cargo: "Secretario/a de Actas",     nombre: "Nombre Apellido" },
    { cargo: "Tesorero/a",                nombre: "Nombre Apellido" },
    { cargo: "Secretario/a de Organización", nombre: "Nombre Apellido" },
    { cargo: "Secretario/a de la Mujer",  nombre: "Nombre Apellido" },
    { cargo: "Secretario/a de Juventud",  nombre: "Nombre Apellido" },
    { cargo: "Vocal titular",             nombre: "Nombre Apellido" },
    { cargo: "Vocal titular",             nombre: "Nombre Apellido" },
    { cargo: "Vocal suplente",            nombre: "Nombre Apellido" },
    { cargo: "Vocal suplente",            nombre: "Nombre Apellido" }
  ],


  /* ---------- PADRÓN (DEMO, datos ficticios) ---------- */
  padron: [
    { dni: "30123456", apellido: "Gómez",     nombre: "María Laura",  seccion: 5,  escuela: "Escuela N° 1-001 (ejemplo)", mesa: 12 },
    { dni: "28456789", apellido: "Pérez",     nombre: "Juan Carlos",  seccion: 3,  escuela: "Escuela N° 1-014 (ejemplo)", mesa: 4 },
    { dni: "35987654", apellido: "Fernández", nombre: "Lucía",        seccion: 6,  escuela: "Escuela N° 1-022 (ejemplo)", mesa: 7 },
    { dni: "40111222", apellido: "Gómez",     nombre: "Martín",       seccion: 11, escuela: "Escuela N° 1-035 (ejemplo)", mesa: 2 },
    { dni: "25333444", apellido: "Sosa",      nombre: "Ana Beatriz",  seccion: 1,  escuela: "Escuela N° 1-008 (ejemplo)", mesa: 9 },
    { dni: "32555666", apellido: "Díaz",      nombre: "Roberto",      seccion: 4,  escuela: "Escuela N° 1-002 (ejemplo)", mesa: 15 },
    { dni: "38777888", apellido: "Romero",    nombre: "Valentina",    seccion: 7,  escuela: "Escuela N° 1-019 (ejemplo)", mesa: 5 }
  ]
};

/* ---------- TEXTO DEL ACUERDO DE ADHESIÓN ----------
   Texto modelo: debe ser revisado por la junta electoral / apoderados. */
window.ACUERDO_HTML = `
  <h4>Acuerdo de adhesión y ficha de afiliación</h4>
  <p>Por la presente solicito mi afiliación al Partido Justicialista, distrito Mendoza, departamento Capital.</p>
  <p>Declaro bajo juramento:</p>
  <ul>
    <li>Que los datos consignados son verdaderos y que mi domicilio se encuentra en la Ciudad de Mendoza.</li>
    <li>Que no me encuentro afiliado/a a otro partido político, o que renunciaré a dicha afiliación conforme a la Ley Orgánica de los Partidos Políticos N° 23.298.</li>
    <li>Que adhiero a la Carta Orgánica, la doctrina y los principios del Partido Justicialista.</li>
  </ul>
  <p>Autorizo al partido a tratar mis datos personales con fines exclusivamente partidarios y de registro ante la Justicia Electoral, conforme a la Ley N° 25.326 de Protección de Datos Personales. Puedo solicitar el acceso, rectificación o supresión de mis datos en cualquier momento.</p>
  <p class="muted"><em>Texto modelo, sujeto a revisión por las autoridades partidarias.</em></p>
`;
