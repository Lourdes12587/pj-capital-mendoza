/* PJ Capital: lógica de la página (mapa, comisión, preafiliación).
   Navegación, botones, formularios y animaciones los maneja el kit (assets/system.js, motion.js). */
(function () {
  "use strict";

  const D = window.SITE_DATA;
  const $ = (s, r = document) => r.querySelector(s);
  const fmt = new Intl.NumberFormat("es-AR");
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const seccion = (n) => D.secciones.find((s) => s.n === n);

  /* ---------------- Habitantes: mapa y lista ---------------- */
  const svg = $("#mapa");
  const NS = "http://www.w3.org/2000/svg";
  // cifras de población: null = "Dato pendiente" (no se inventan). La escala de color vuelve sola
  // cuando las 12 secciones tengan su cifra oficial.
  const PEND = "Dato pendiente";
  const cifra = (h) => (typeof h === "number" ? `${fmt.format(h)} habitantes` : PEND);
  const completos = D.secciones.every((s) => typeof s.habitantes === "number");
  const total = completos ? D.secciones.reduce((a, s) => a + s.habitantes, 0) : null;
  const vals = completos ? D.secciones.map((s) => s.habitantes) : [];
  const max = completos ? Math.max(...vals) : 0;
  const min = completos ? Math.min(...vals) : 0;
  const level = (h) => Math.min(4, Math.floor(((h - min) / (max - min || 1)) * 5));
  const rowsEl = $("#census-rows");

  D.secciones.forEach((s) => {
    const g = document.createElementNS(NS, "g");
    g.setAttribute("class", "sec");
    g.setAttribute("tabindex", "0");
    g.setAttribute("role", "button");
    g.setAttribute("aria-label", `${s.n}.ª sección, ${s.nombre}: ${cifra(s.habitantes)}`);
    g.dataset.n = s.n; g.dataset.level = completos ? level(s.habitantes) : "pend";
    const p = document.createElementNS(NS, "path"); p.setAttribute("d", s.path); g.appendChild(p);
    const t = document.createElementNS(NS, "text");
    t.setAttribute("x", s.label[0]); t.setAttribute("y", s.label[1] + 6); t.textContent = s.n; g.appendChild(t);
    ["mouseenter", "focus", "click"].forEach((ev) => g.addEventListener(ev, () => pick(s.n)));
    g.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(s.n); } });
    svg.appendChild(g);
  });
  rowsEl.innerHTML = [...D.secciones].sort((a, b) => a.n - b.n).map((s) =>
    `<li><button type="button" data-n="${s.n}"><span>${s.n}.ª ${esc(s.nombre)}</span><span>${typeof s.habitantes === "number" ? fmt.format(s.habitantes) : PEND}</span></button></li>`).join("");
  rowsEl.addEventListener("click", (e) => { const b = e.target.closest("[data-n]"); if (b) pick(Number(b.dataset.n)); });

  function pick(n) {
    const s = seccion(n);
    svg.querySelectorAll(".sec").forEach((g) => g.classList.toggle("is-on", Number(g.dataset.n) === n));
    rowsEl.querySelectorAll("[data-n]").forEach((b) => b.setAttribute("aria-pressed", Number(b.dataset.n) === n));
    $("#census-name").textContent = `${s.n}.ª sección · ${s.nombre}`;
    $("#census-num").textContent = cifra(s.habitantes);
    $("#census-share").textContent = typeof s.habitantes === "number" && total
      ? `${((s.habitantes / total) * 100).toLocaleString("es-AR", { maximumFractionDigits: 1 })} % de los ${fmt.format(total)} vecinos de la Capital`
      : `Fuente: ${s.fuente || "PENDIENTE"}`;
  }
  $("#census-num").textContent = total ? `${fmt.format(total)} habitantes` : PEND;
  if (!completos) $("#census-share").textContent = "Fuente: PENDIENTE";
  document.querySelector(".census__legend")?.toggleAttribute("hidden", !completos);

  /* ---------------- Comisión partidaria ---------------- */
  $("#presidente-desc").textContent = D.presidente.descripcion;
  const pend = (t) => /^PENDIENTE/.test(t);
  $("#comision-rows").innerHTML = D.comision.map((m, i) =>
    `<li><span class="cargo__num" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>` +
    `<span class="cargo__rol">${esc(m.cargo)}</span>` +
    `<span class="cargo__nombre${pend(m.nombre) ? " pendiente" : ""}">${esc(m.nombre)}</span></li>`).join("");
  // la foto real del presidente reemplaza a la de la Capital apenas se guarde en img/fernando-ortiz.jpg
  const foto = new Image();
  foto.onload = () => { const el = $("#presidente-foto"); el.src = foto.src; el.removeAttribute("srcset"); el.alt = "Fernando Ortiz, presidente del PJ Capital"; el.dataset.source = "client"; };
  foto.src = "img/fernando-ortiz.jpg";

  /* ---------------- Preafiliación ---------------- */
  // la versión anterior guardaba afiliaciones con firma y domicilio en este navegador: se borran
  try { localStorage.removeItem("pj_afiliaciones"); } catch { /* sin almacenamiento */ }
  // la encuesta se eliminó: se borran sus respuestas y marcas guardadas en este navegador
  try { ["pj_encuestas", "pj_encuesta_ok"].forEach((k) => localStorage.removeItem(k)); sessionStorage.removeItem("pj_invite_cerrada"); } catch { /* sin almacenamiento */ }

  const fSec = $("#f-seccion");
  D.secciones.forEach((s) => { const o = document.createElement("option"); o.value = s.n; o.textContent = `${s.n}.ª · ${s.nombre}`; fSec.appendChild(o); });
  $("#f-dni").addEventListener("input", (e) => { e.target.value = e.target.value.replace(/D/g, "").slice(0, 8); });

  // envío: system.js valida y marca cada campo; si todo está bien, se guarda vía api.js
  const form = $("#pre-form");
  const status = $("#pre-status");
  const btn = $("#pre-submit");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const ok = [...form.elements].filter((el) => el.matches("input, select")).every((el) => el.checkValidity());
    if (!ok) return;
    const v = (id) => $("#" + id).value.trim();
    btn.disabled = true;
    const wait = setTimeout(() => { status.textContent = "Enviando"; }, 300);
    try {
      await window.API.enviarPreafiliacion({
        nombre: v("f-nombre"), apellido: v("f-apellido"), dni: v("f-dni"),
        telefono: v("f-telefono"), email: v("f-email"), seccion: Number(v("f-seccion")),
        consentimiento: $("#f-consentimiento").checked, fecha: new Date().toISOString()
      });
      clearTimeout(wait);
      form.reset();
      status.textContent = "Recibimos tu preafiliación. El partido se va a comunicar con vos para completar la afiliación oficial.";
    } catch (err) {
      clearTimeout(wait);
      status.textContent = `No se envió: ${err.message} Tus datos siguen en el formulario.`;
    } finally { btn.disabled = false; }
  });
})();
