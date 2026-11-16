/* =========================================================
   CAPA DE DATOS
   Hoy: funciona sin servidor (datos locales + localStorage).
   Mañana: cambiar USE_BACKEND a true y apuntar API_URL al
   backend; el resto del sitio no necesita cambios.
   ========================================================= */

window.API = (function () {
  const USE_BACKEND = false;
  const API_URL = "/api";

  const delay = (ms) => new Promise((r) => setTimeout(r, ms));

  function readLocal(key) {
    try { return JSON.parse(localStorage.getItem(key) || "[]"); } catch { return []; }
  }
  function writeLocal(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* sin almacenamiento */ }
  }

  /** Busca en el padrón por DNI exacto o por apellido. */
  async function buscarPadron(query) {
    const q = String(query).trim();
    if (USE_BACKEND) {
      const res = await fetch(`${API_URL}/padron?q=${encodeURIComponent(q)}`);
      if (!res.ok) throw new Error("No se pudo consultar el padrón");
      return res.json();
    }
    await delay(350);
    const norm = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
    const digits = q.replace(/\D/g, "");
    return window.SITE_DATA.padron.filter((p) =>
      digits.length >= 7 ? p.dni === digits : norm(p.apellido).includes(norm(q))
    );
  }

  /**
   * Envía una solicitud de afiliación.
   * data = { nombre, apellido, dni, calle, depto, barrio, seccion, firma (PNG dataURL), aceptoAcuerdo, fecha }
   */
  async function enviarAfiliacion(data) {
    if (USE_BACKEND) {
      const res = await fetch(`${API_URL}/afiliaciones`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error((await res.text()) || "No se pudo enviar la solicitud");
      return res.json();
    }
    await delay(700);
    const lista = readLocal("pj_afiliaciones");
    if (lista.some((a) => a.dni === data.dni)) {
      throw new Error("Ya existe una solicitud de afiliación con ese DNI.");
    }
    const tramite = "PJC-" + Date.now().toString(36).toUpperCase();
    lista.push({ ...data, tramite });
    writeLocal("pj_afiliaciones", lista);
    return { ok: true, tramite };
  }

  /** Guarda una respuesta de la encuesta a vecinos. */
  async function enviarEncuesta(respuesta) {
    if (USE_BACKEND) {
      const res = await fetch(`${API_URL}/encuestas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(respuesta)
      });
      if (!res.ok) throw new Error("No se pudo enviar la encuesta");
      return res.json();
    }
    await delay(400);
    const lista = readLocal("pj_encuestas");
    lista.push(respuesta);
    writeLocal("pj_encuestas", lista);
    return { ok: true };
  }

  /** Devuelve el resultado agregado: { total, preocupaciones: { clave: cantidad } } */
  async function resultadosEncuesta() {
    if (USE_BACKEND) {
      const res = await fetch(`${API_URL}/encuestas/resultados`);
      if (!res.ok) throw new Error("No se pudieron cargar los resultados");
      return res.json();
    }
    const base = window.SITE_DATA.encuesta.resultadosDemo;
    const out = { total: base.total, preocupaciones: { ...base.preocupaciones } };
    readLocal("pj_encuestas").forEach((r) => {
      out.total++;
      (r.preocupaciones || []).forEach((k) => { out.preocupaciones[k] = (out.preocupaciones[k] || 0) + 1; });
    });
    return out;
  }

  return { buscarPadron, enviarAfiliacion, enviarEncuesta, resultadosEncuesta };
})();
