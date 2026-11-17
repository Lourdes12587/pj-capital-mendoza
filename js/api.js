/* =========================================================
   CAPA DE DATOS
   Hoy: funciona sin servidor (localStorage del navegador).
   Mañana: cambiar USE_BACKEND a true y apuntar API_URL al
   backend; el resto del sitio no necesita cambios.
   El padrón NO pasa por acá: solo se enlaza a las consultas oficiales.
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

  /**
   * Envía una preafiliación (no es la afiliación oficial: el partido contacta a la persona).
   * data = { nombre, apellido, dni, telefono, email (opcional, "" si no hay), seccion, consentimiento, fecha }
   */
  async function enviarPreafiliacion(data) {
    if (USE_BACKEND) {
      const res = await fetch(`${API_URL}/preafiliaciones`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error((await res.text()) || "No se pudo enviar la preafiliación.");
      return res.json();
    }
    await delay(500);
    const lista = readLocal("pj_preafiliaciones");
    if (lista.some((a) => a.dni === data.dni)) {
      throw new Error("Ya hay una preafiliación con ese DNI.");
    }
    lista.push(data);
    writeLocal("pj_preafiliaciones", lista);
    return { ok: true };
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

  /** Devuelve el resultado agregado: { total, preocupaciones: { clave: cantidad } } (solo respuestas reales). */
  async function resultadosEncuesta() {
    if (USE_BACKEND) {
      const res = await fetch(`${API_URL}/encuestas/resultados`);
      if (!res.ok) throw new Error("No se pudieron cargar los resultados");
      return res.json();
    }
    const out = { total: 0, preocupaciones: {} };
    readLocal("pj_encuestas").forEach((r) => {
      out.total++;
      (r.preocupaciones || []).forEach((k) => { out.preocupaciones[k] = (out.preocupaciones[k] || 0) + 1; });
    });
    return out;
  }

  return { enviarPreafiliacion, enviarEncuesta, resultadosEncuesta };
})();
