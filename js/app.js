/* PJ Capital: lógica de la página (mapa, encuesta, teléfonos, comisión, preafiliación).
   Navegación, botones, formularios y animaciones los maneja el kit (assets/system.js, motion.js). */
(function () {
  "use strict";

  const D = window.SITE_DATA;
  const $ = (s, r = document) => r.querySelector(s);
  const fmt = new Intl.NumberFormat("es-AR");
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const store = {
    get(k, s) { try { return (s || localStorage).getItem(k); } catch { return null; } },
    set(k, v, s) { try { (s || localStorage).setItem(k, v); } catch { /* sin almacenamiento */ } }
  };
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

  /* ---------------- Encuesta vecinal (en la página) ---------------- */
  const ENC = D.encuesta;
  const etiqueta = Object.fromEntries(ENC.preguntas[0].opciones.map((o) => [o.v, o]));
  const survey = $("#survey");
  let paso = 0, resp = {};
  const answered = () => store.get("pj_encuesta_ok") === "1";

  async function renderResults() {
    const r = await window.API.resultadosEncuesta();
    const items = Object.entries(r.preocupaciones).filter(([k]) => etiqueta[k]).sort((a, b) => b[1] - a[1]);
    const top = items.length ? items[0][1] : 1;
    $("#results-total").textContent = r.total === 1 ? "1 respuesta" : `${fmt.format(r.total)} respuestas`;
    if (!r.total) { $("#results").innerHTML = `<li class="results__empty">Todavía no hay respuestas. La tuya puede ser la primera.</li>`; return items; }
    $("#results").innerHTML = items.slice(0, 8).map(([k, n]) => `
      <li><span class="results__name">${esc(etiqueta[k].t)}</span><span class="results__pct">${Math.round((n / r.total) * 100)} %</span>
        <span class="results__bar" aria-hidden="true"><span style="width:${(n / top) * 100}%"></span></span></li>`).join("");
    return items;
  }

  function renderSurvey() {
    if (answered() && paso < ENC.preguntas.length) {
      survey.innerHTML = `<div class="survey__card"><h3>Gracias por responder la encuesta</h3><p>Tu respuesta ya está sumada en el ranking. Podés compartir el sitio con tus vecinos para que también opinen.</p></div>`;
      return;
    }
    const totalQ = ENC.preguntas.length;
    const q = ENC.preguntas[paso];
    const val = resp[q.id];
    let body = "";
    if (q.tipo === "multi" || q.tipo === "single") {
      const sel = q.tipo === "multi" ? (val || []) : [val];
      body = `<div class="opts ${q.tipo === "multi" ? "opts--multi" : ""}" role="group" aria-labelledby="q-title">${q.opciones.map((o) =>
        `<button type="button" class="opt" data-v="${esc(o.v)}" aria-pressed="${sel.includes(o.v)}">${esc(o.t)}</button>`).join("")}</div>`;
    } else if (q.tipo === "seccion") {
      body = `<div class="opts opts--sec" role="group" aria-labelledby="q-title">${D.secciones.map((s) =>
        `<button type="button" class="opt" data-v="${s.n}" aria-pressed="${val === s.n}">${s.n}.ª ${esc(s.nombre)}</button>`).join("")}
        <button type="button" class="opt" data-v="0" aria-pressed="${val === 0}">No vivo en la Capital</button></div>`;
    } else {
      body = `<div class="field"><label for="q-text">Tu comentario</label><textarea id="q-text" maxlength="500">${esc(val || "")}</textarea></div>`;
    }
    survey.innerHTML = `
      <div class="survey__card">
        <div class="survey__top"><span class="t-label muted">Pregunta ${paso + 1} de ${totalQ}</span><span class="survey__bar" aria-hidden="true"><span style="width:${(paso / totalQ) * 100}%"></span></span></div>
        <h3 id="q-title">${esc(q.titulo)}</h3>
        ${q.ayuda ? `<p class="t-small muted">${esc(q.ayuda)}</p>` : ""}
        ${body}
        <p class="field__error" id="q-err" hidden></p>
        <div class="btn-row survey__nav">
          ${paso > 0 ? `<button type="button" class="btn btn--secondary" data-act="back">Volver</button>` : ""}
          <button type="button" class="btn btn--secondary" data-act="next">${paso === totalQ - 1 ? "Enviar mis respuestas" : "Siguiente pregunta"}</button>
        </div>
      </div>`;
  }

  function sayErr(msg) { const e = $("#q-err"); e.textContent = msg; e.hidden = !msg; }

  survey.addEventListener("click", async (e) => {
    const q = ENC.preguntas[paso];
    const opt = e.target.closest(".opt");
    if (opt && q) {
      sayErr("");
      if (q.tipo === "multi") {
        const arr = resp[q.id] || [];
        const i = arr.indexOf(opt.dataset.v);
        if (i >= 0) arr.splice(i, 1);
        else if (arr.length >= q.max) { sayErr(`Podés elegir hasta ${q.max}. Sacá una para cambiarla.`); return; }
        else arr.push(opt.dataset.v);
        resp[q.id] = arr;
        opt.setAttribute("aria-pressed", arr.includes(opt.dataset.v));
      } else {
        resp[q.id] = q.tipo === "seccion" ? Number(opt.dataset.v) : opt.dataset.v;
        survey.querySelectorAll(".opt").forEach((b) => b.setAttribute("aria-pressed", b === opt));
      }
      return;
    }
    const act = e.target.closest("[data-act]");
    if (!act) return;
    if (act.dataset.act === "back") { paso--; renderSurvey(); return; }
    if (q.tipo === "texto") resp[q.id] = ($("#q-text") || {}).value?.trim() || "";
    const v = resp[q.id];
    const empty = v === undefined || v === "" || (Array.isArray(v) && !v.length);
    if (empty && !q.opcional) { sayErr("Elegí una opción para seguir."); return; }
    if (paso < ENC.preguntas.length - 1) { paso++; renderSurvey(); survey.querySelector(".opt, textarea")?.focus({ preventScroll: true }); return; }
    act.disabled = true; act.textContent = "Enviando…";
    try {
      await window.API.enviarEncuesta({ ...resp, fecha: new Date().toISOString() });
      store.set("pj_encuesta_ok", "1");
      const items = await renderResults();
      const pos = (k) => items.findIndex(([x]) => x === k) + 1;
      survey.innerHTML = `<div class="survey__card"><h3>Tu respuesta ya está en el ranking</h3>
        <ul class="rows">${(resp.preocupaciones || []).map((k) => `<li><span class="rows__name">${esc(etiqueta[k].t)}</span><span class="rows__value">puesto ${pos(k)}</span></li>`).join("")}</ul>
        <p><a class="link" href="#preafiliacion">Dejar mis datos para sumarme</a></p></div>`;
    } catch (err) {
      sayErr(err.message); act.disabled = false; act.textContent = "Enviar mis respuestas";
    }
  });
  renderSurvey();
  renderResults();

  // invitación a la encuesta para cada visitante nuevo (una vez por visita, hasta que responda)
  const invite = $("#invite");
  if (invite && !/[?&]sin-invitacion/.test(location.search) && !answered() && !store.get("pj_invite_cerrada", sessionStorage) && typeof invite.showModal === "function") {
    setTimeout(() => { if (!document.querySelector("dialog[open]")) invite.showModal(); }, 4000);
  }
  if (invite) {
    invite.addEventListener("close", () => store.set("pj_invite_cerrada", "1", sessionStorage));
    $("#invite-close").addEventListener("click", () => invite.close());
    $("#invite-go").addEventListener("click", () => { invite.close(); setTimeout(() => survey.querySelector(".opt")?.focus({ preventScroll: true }), 400); });
  }

  /* ---------------- Teléfonos útiles ---------------- */
  const telHref = (t) => "tel:" + t.replace(/[^\d+]/g, "");
  const urgentes = D.telefonos.filter((t) => t.urgente && t.tel);
  $("#sos").innerHTML = urgentes.map((t) => `
    <a class="sos__tile span-3" href="${telHref(t.tel)}" aria-label="Llamar al ${esc(t.tel)}, ${esc(t.nombre)}">
      <span class="sos__num">${esc(t.tel)}</span><span class="sos__name">${esc(t.nombre.replace(/^Línea \d+ · /, ""))}</span></a>`).join("");
  const resto = D.telefonos.filter((t) => !urgentes.includes(t));
  const cats = [...new Set(resto.map((t) => t.cat))];
  const col = (cat) => `
    <div class="span-6 tel-col"><h3>${esc(cat)}</h3><ul class="rows">${resto.filter((t) => t.cat === cat).map((t) => `
      <li><span class="rows__name">${esc(t.nombre)}</span>
        ${t.tel ? `<a class="rows__value tel" href="${telHref(t.tel)}">${esc(t.tel)}</a>` : `<span class="rows__value muted">A confirmar</span>`}
        <p>${esc(t.desc)}${t.h24 ? " Las 24 horas." : ""}</p></li>`).join("")}</ul></div>`;
  $("#tel-a").innerHTML = cats.slice(0, 2).map(col).join("");
  $("#tel-b").innerHTML = cats.slice(2).map(col).join("");

  /* ---------------- Comisión partidaria ---------------- */
  $("#presidente-desc").textContent = D.presidente.descripcion;
  $("#comision-rows").innerHTML = D.comision.map((m) =>
    `<li><span class="rows__name">${esc(m.cargo)}</span><span class="rows__value">${esc(m.nombre)}</span></li>`).join("");
  // la foto real del presidente reemplaza a la de la Capital apenas se guarde en img/fernando-ortiz.jpg
  const foto = new Image();
  foto.onload = () => { const el = $("#presidente-foto"); el.src = foto.src; el.removeAttribute("srcset"); el.alt = "Fernando Ortiz, presidente del PJ Capital"; el.dataset.source = "client"; };
  foto.src = "img/fernando-ortiz.jpg";

  /* ---------------- Preafiliación ---------------- */
  // la versión anterior guardaba afiliaciones con firma y domicilio en este navegador: se borran
  try { localStorage.removeItem("pj_afiliaciones"); } catch { /* sin almacenamiento */ }

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
