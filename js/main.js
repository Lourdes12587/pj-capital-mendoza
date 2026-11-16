(function () {
  "use strict";

  const D = window.SITE_DATA;
  const $ = (sel, root = document) => root.querySelector(sel);
  const fmt = new Intl.NumberFormat("es-AR");
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const fechaLarga = (iso) =>
    new Date(iso + "T12:00:00").toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" });

  /* ---------------- Navegación móvil ---------------- */
  const toggle = $(".nav-toggle");
  const nav = $("#main-nav");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
  nav.addEventListener("click", (e) => {
    if (e.target.tagName === "A") { nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }
  });

  // Marca el link activo según la sección visible
  const links = [...nav.querySelectorAll('a[href^="#"]')];
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll("main section[id]").forEach((s) => observer.observe(s));

  $("#year").textContent = new Date().getFullYear();

  /* ---------------- Noticias ---------------- */
  const newsGrid = $("#news-grid");
  const newsFilters = $("#news-filters");
  const categorias = ["Todas", ...new Set(D.noticias.map((n) => n.categoria))];
  let catActiva = "Todas";

  function renderFiltros() {
    newsFilters.innerHTML = categorias.map((c) =>
      `<button class="chip${c === catActiva ? " active" : ""}" role="tab" aria-selected="${c === catActiva}" data-cat="${esc(c)}">${esc(c)}</button>`
    ).join("");
  }
  function renderNoticias() {
    const items = D.noticias
      .filter((n) => catActiva === "Todas" || n.categoria === catActiva)
      .sort((a, b) => b.fecha.localeCompare(a.fecha));
    newsGrid.innerHTML = items.map((n, i) => `
      <article class="news-card${i === 0 && catActiva === "Todas" ? " featured" : ""}">
        <div class="news-thumb" data-cat="${esc(n.categoria)}"><span>${esc(n.categoria)}</span></div>
        <div class="news-body">
          <time datetime="${n.fecha}">${fechaLarga(n.fecha)}</time>
          <h3>${esc(n.titulo)}</h3>
          <p>${esc(n.resumen)}</p>
          <button class="link-btn" data-id="${n.id}">Leer más →</button>
        </div>
      </article>`).join("");
  }
  newsFilters.addEventListener("click", (e) => {
    const b = e.target.closest("[data-cat]");
    if (!b) return;
    catActiva = b.dataset.cat;
    renderFiltros(); renderNoticias();
  });
  newsGrid.addEventListener("click", (e) => {
    const b = e.target.closest("[data-id]");
    if (!b) return;
    const n = D.noticias.find((x) => x.id === Number(b.dataset.id));
    $("#news-modal-body").innerHTML = `
      <span class="badge">${esc(n.categoria)}</span>
      <h3>${esc(n.titulo)}</h3>
      <time datetime="${n.fecha}">${fechaLarga(n.fecha)}</time>
      <p class="lead-sm">${esc(n.resumen)}</p>
      <p>${esc(n.cuerpo)}</p>`;
    $("#news-modal").showModal();
  });
  renderFiltros(); renderNoticias();

  /* ---------------- Padrón ---------------- */
  const padronForm = $("#padron-form");
  const padronResult = $("#padron-result");
  const nombreSeccion = (n) => (D.secciones.find((s) => s.n === n) || {}).nombre || "";

  padronForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const q = $("#padron-q").value.trim();
    if (q.length < 3) return;
    padronResult.innerHTML = `<p class="loading">Buscando…</p>`;
    try {
      const res = await window.API.buscarPadron(q);
      if (!res.length) {
        padronResult.innerHTML = `
          <div class="result-empty">
            <strong>No encontramos resultados para “${esc(q)}”.</strong>
            <p>Si todavía no estás afiliado/a, <a href="#afiliacion">podés afiliarte acá</a>.</p>
          </div>`;
        return;
      }
      padronResult.innerHTML = res.map((p) => `
        <div class="result-card">
          <div>
            <span class="badge badge-ok">Afiliado/a</span>
            <h4>${esc(p.apellido)}, ${esc(p.nombre)}</h4>
            <p class="muted">DNI ${esc(p.dni.replace(/\B(?=(\d{3})+(?!\d))/g, "."))}</p>
          </div>
          <dl>
            <div><dt>Sección</dt><dd>${p.seccion}ª · ${esc(nombreSeccion(p.seccion))}</dd></div>
            <div><dt>Lugar de votación</dt><dd>${esc(p.escuela)}</dd></div>
            <div><dt>Mesa</dt><dd>${p.mesa}</dd></div>
          </dl>
        </div>`).join("");
    } catch (err) {
      padronResult.innerHTML = `<p class="result-empty">${esc(err.message)}</p>`;
    }
  });

  /* ---------------- Mapa de habitantes ---------------- */
  const svg = $("#mapa");
  const NS = "http://www.w3.org/2000/svg";
  const total = D.secciones.reduce((a, s) => a + s.habitantes, 0);
  const max = Math.max(...D.secciones.map((s) => s.habitantes));
  const min = Math.min(...D.secciones.map((s) => s.habitantes));
  $("#stat-habitantes").textContent = fmt.format(total);

  // 5 escalones de intensidad
  const nivel = (h) => Math.min(4, Math.floor(((h - min) / (max - min || 1)) * 5));

  D.secciones.forEach((s) => {
    const g = document.createElementNS(NS, "g");
    g.setAttribute("class", "sec");
    g.setAttribute("tabindex", "0");
    g.setAttribute("role", "button");
    g.setAttribute("aria-label", `Sección ${s.n}, ${s.nombre}: ${fmt.format(s.habitantes)} habitantes`);
    g.dataset.n = s.n;
    g.dataset.level = nivel(s.habitantes);

    const path = document.createElementNS(NS, "path");
    path.setAttribute("d", s.path);
    g.appendChild(path);

    const c = document.createElementNS(NS, "circle");
    c.setAttribute("cx", s.label[0]); c.setAttribute("cy", s.label[1]); c.setAttribute("r", 17);
    g.appendChild(c);

    const t = document.createElementNS(NS, "text");
    t.setAttribute("x", s.label[0]); t.setAttribute("y", s.label[1] + 5);
    t.textContent = s.n;
    g.appendChild(t);

    const title = document.createElementNS(NS, "title");
    title.textContent = `${s.n}ª Sección · ${s.nombre} — ${fmt.format(s.habitantes)} hab.`;
    g.appendChild(title);

    ["mouseenter", "focus", "click"].forEach((ev) => g.addEventListener(ev, () => seleccionar(s.n)));
    g.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); seleccionar(s.n); } });
    svg.appendChild(g);
  });

  const ranking = $("#ranking");
  ranking.innerHTML = [...D.secciones]
    .sort((a, b) => b.habitantes - a.habitantes)
    .map((s) => `<li data-n="${s.n}"><span>${s.n}ª ${esc(s.nombre)}</span><strong>${fmt.format(s.habitantes)}</strong></li>`)
    .join("") + `<li class="total"><span>Total Capital</span><strong>${fmt.format(total)}</strong></li>`;
  ranking.addEventListener("mouseover", (e) => { const li = e.target.closest("[data-n]"); if (li) seleccionar(Number(li.dataset.n)); });
  ranking.addEventListener("click", (e) => { const li = e.target.closest("[data-n]"); if (li) seleccionar(Number(li.dataset.n)); });

  function seleccionar(n) {
    const s = D.secciones.find((x) => x.n === n);
    svg.querySelectorAll(".sec").forEach((g) => g.classList.toggle("selected", Number(g.dataset.n) === n));
    ranking.querySelectorAll("li[data-n]").forEach((li) => li.classList.toggle("selected", Number(li.dataset.n) === n));
    $("#panel-nombre").textContent = `${s.n}ª · ${s.nombre}`;
    $("#panel-habitantes").textContent = fmt.format(s.habitantes) + " hab.";
    const pct = (s.habitantes / total) * 100;
    $("#panel-detalle").textContent = `${pct.toLocaleString("es-AR", { maximumFractionDigits: 1 })}% de la población de la Capital.`;
    $("#panel-bar-fill").style.width = (s.habitantes / max) * 100 + "%";
  }

  /* ---------------- Encuesta a vecinos ---------------- */
  const ENC = D.encuesta;
  const store = {
    get: (k, s = localStorage) => { try { return s.getItem(k); } catch { return null; } },
    set: (k, v, s = localStorage) => { try { s.setItem(k, v); } catch { /* sin almacenamiento */ } }
  };
  const encModal = $("#encuesta-modal");
  const encBody = $("#enc-body");
  const encErr = $("#enc-error");
  const btnSig = $("#enc-sig");
  const btnAtras = $("#enc-atras");
  let paso = 0;
  let respuestas = {};
  const etiqueta = Object.fromEntries(ENC.preguntas[0].opciones.map((o) => [o.v, o]));

  async function renderResultados() {
    const r = await window.API.resultadosEncuesta();
    const items = Object.entries(r.preocupaciones)
      .filter(([k]) => etiqueta[k]) // ignora opciones que ya no existen
      .sort((a, b) => b[1] - a[1]);
    const top = items[0] ? items[0][1] : 1;
    $("#resultados-total").textContent = `${fmt.format(r.total)} respuestas`;
    $("#resultados").innerHTML = items.map(([k, n]) => {
      const o = etiqueta[k] || { t: k, e: "" };
      const pct = Math.round((n / r.total) * 100);
      return `<li>
        <div class="res-label"><span>${o.e} ${esc(o.t)}</span><strong>${pct}%</strong></div>
        <div class="res-bar"><span style="width:${(n / top) * 100}%"></span></div>
      </li>`;
    }).join("");
    return items;
  }

  function yaRespondio() { return store.get("pj_encuesta_ok") === "1"; }
  function marcarRespondida() {
    $("#encuesta-abrir").hidden = yaRespondio();
    $("#encuesta-gracias").hidden = !yaRespondio();
  }

  function abrirEncuesta() {
    if (yaRespondio()) return;
    paso = 0; respuestas = {};
    renderPaso();
    encModal.showModal();
    const primera = encBody.querySelector(".enc-op");
    if (primera) primera.focus({ focusVisible: false });
  }

  function renderPaso() {
    encErr.textContent = "";
    const total = ENC.preguntas.length;
    $("#enc-progress").style.width = (paso / total) * 100 + "%";
    $("#enc-paso").textContent = paso < total ? `Pregunta ${paso + 1} de ${total}` : "¡Listo!";
    btnAtras.style.visibility = paso > 0 && paso < total ? "visible" : "hidden";

    if (paso >= total) return; // pantalla final se arma en enviar()
    const p = ENC.preguntas[paso];
    const val = respuestas[p.id];
    let html = `<h3 id="enc-titulo">${esc(p.titulo)}</h3>${p.ayuda ? `<p class="muted">${esc(p.ayuda)}</p>` : ""}`;

    if (p.tipo === "multi" || p.tipo === "single") {
      const sel = p.tipo === "multi" ? (val || []) : [val];
      html += `<div class="enc-opciones ${p.tipo}" role="group">` + p.opciones.map((o) => `
        <button type="button" class="enc-op${sel.includes(o.v) ? " on" : ""}" data-v="${esc(o.v)}" aria-pressed="${sel.includes(o.v)}">
          ${o.e ? `<span class="enc-emoji" aria-hidden="true">${o.e}</span>` : ""}<span>${esc(o.t)}</span>
        </button>`).join("") + `</div>`;
      if (p.tipo === "multi") html += `<p class="enc-contador" id="enc-contador">${(val || []).length} de ${p.max} elegidas</p>`;
    } else if (p.tipo === "seccion") {
      html += `<div class="enc-opciones secciones" role="group">` + D.secciones.map((s) => `
        <button type="button" class="enc-op${val === s.n ? " on" : ""}" data-v="${s.n}" aria-pressed="${val === s.n}">
          <span class="enc-num">${s.n}ª</span><span>${esc(s.nombre)}</span>
        </button>`).join("") + `
        <button type="button" class="enc-op${val === 0 ? " on" : ""}" data-v="0"><span>No vivo en Capital</span></button></div>`;
    } else if (p.tipo === "texto") {
      html += `<textarea id="enc-texto" rows="4" maxlength="500" placeholder="Escribí acá…">${esc(val || "")}</textarea>`;
    }
    encBody.innerHTML = html;
    btnSig.textContent = paso === total - 1 ? "Enviar respuestas" : "Siguiente →";
  }

  encBody.addEventListener("click", (e) => {
    const b = e.target.closest(".enc-op");
    if (!b) return;
    const p = ENC.preguntas[paso];
    encErr.textContent = "";
    if (p.tipo === "multi") {
      const arr = respuestas[p.id] || [];
      const i = arr.indexOf(b.dataset.v);
      if (i >= 0) arr.splice(i, 1);
      else if (arr.length >= p.max) { encErr.textContent = `Podés elegir hasta ${p.max}. Sacá una para cambiarla.`; return; }
      else arr.push(b.dataset.v);
      respuestas[p.id] = arr;
      b.classList.toggle("on", arr.includes(b.dataset.v));
      b.setAttribute("aria-pressed", arr.includes(b.dataset.v));
      $("#enc-contador").textContent = `${arr.length} de ${p.max} elegidas`;
    } else {
      respuestas[p.id] = p.tipo === "seccion" ? Number(b.dataset.v) : b.dataset.v;
      encBody.querySelectorAll(".enc-op").forEach((x) => { x.classList.toggle("on", x === b); x.setAttribute("aria-pressed", x === b); });
      const pasoActual = paso;
      setTimeout(() => { if (paso === pasoActual) siguiente(); }, 280); // avanza solo en preguntas de una opción
    }
  });

  function siguiente() {
    const p = ENC.preguntas[paso];
    if (!p) return;
    if (p.tipo === "texto") respuestas[p.id] = $("#enc-texto").value.trim();
    const v = respuestas[p.id];
    const vacio = v === undefined || v === "" || (Array.isArray(v) && !v.length);
    if (vacio && !p.opcional) { encErr.textContent = "Elegí una opción para continuar."; return; }
    if (paso === ENC.preguntas.length - 1) return enviarEncuesta();
    paso++; renderPaso();
  }
  btnSig.addEventListener("click", () => (paso >= ENC.preguntas.length ? encModal.close() : siguiente()));
  btnAtras.addEventListener("click", () => { if (paso > 0) { paso--; renderPaso(); } });
  $("#enc-cerrar").addEventListener("click", () => encModal.close());
  encModal.addEventListener("close", () => store.set("pj_encuesta_cerrada", "1", sessionStorage));

  async function enviarEncuesta() {
    btnSig.disabled = true; btnSig.textContent = "Enviando…";
    try {
      await window.API.enviarEncuesta({ ...respuestas, fecha: new Date().toISOString() });
      store.set("pj_encuesta_ok", "1");
      paso = ENC.preguntas.length; renderPaso();
      const items = await renderResultados();
      const mias = (respuestas.preocupaciones || []).map((k) => etiqueta[k]);
      const pos = (k) => items.findIndex(([x]) => x === k) + 1;
      encBody.innerHTML = `
        <div class="enc-fin">
          <div class="ok-icon" aria-hidden="true">✓</div>
          <h3>¡Gracias por tu respuesta!</h3>
          <p class="muted">Así quedan tus preocupaciones entre todos los vecinos de la Capital:</p>
          <ul class="enc-mias">${mias.map((o) => `<li>${o.e} <strong>${esc(o.t)}</strong><span>#${pos(o.v)} en el ranking</span></li>`).join("")}</ul>
          <p>¿Querés involucrarte más? <a href="#afiliacion" id="enc-afiliate">Afiliate al PJ Capital</a>.</p>
        </div>`;
      $("#enc-afiliate").addEventListener("click", () => encModal.close());
      btnSig.textContent = "Cerrar";
      marcarRespondida();
    } catch (err) {
      encErr.textContent = err.message;
      btnSig.textContent = "Enviar respuestas";
    } finally { btnSig.disabled = false; }
  }

  $("#encuesta-abrir").addEventListener("click", abrirEncuesta);
  marcarRespondida();
  renderResultados();
  // Se abre sola a cada visitante nuevo (una vez por visita hasta que responda)
  if (!yaRespondio() && !store.get("pj_encuesta_cerrada", sessionStorage)) {
    setTimeout(() => { if (!document.querySelector("dialog[open]")) abrirEncuesta(); }, 4000);
  }

  /* ---------------- Teléfonos útiles ---------------- */
  const TELS = D.telefonos;
  const telHref = (t) => "tel:" + t.replace(/[^\d+]/g, "");
  const phoneIco = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>';

  $("#urgentes").innerHTML = TELS.filter((t) => t.urgente && t.tel).map((t) => `
    <a class="urgente" href="${telHref(t.tel)}">
      <span class="urgente-num">${esc(t.tel)}</span>
      <span class="urgente-txt">${esc(t.nombre.replace(/^Línea \d+ · /, ""))}</span>
    </a>`).join("");

  const telCats = ["Todos", ...new Set(TELS.map((t) => t.cat))];
  let telCat = "Todos";
  const normTxt = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

  function renderTelFiltros() {
    $("#tel-filtros").innerHTML = telCats.map((c) =>
      `<button class="chip${c === telCat ? " active" : ""}" role="tab" aria-selected="${c === telCat}" data-cat="${esc(c)}">${esc(c)}</button>`).join("");
  }
  function renderTels() {
    const q = normTxt($("#tel-q").value.trim());
    const lista = TELS.filter((t) =>
      (telCat === "Todos" || t.cat === telCat) &&
      (!q || normTxt(`${t.nombre} ${t.desc} ${t.cat} ${t.tel}`).includes(q)));
    if (!lista.length) { $("#tel-lista").innerHTML = `<p class="result-empty">No encontramos teléfonos para esa búsqueda.</p>`; return; }
    const grupos = [...new Set(lista.map((t) => t.cat))];
    $("#tel-lista").innerHTML = grupos.map((g) => `
      <h3 class="tel-grupo">${esc(g)}</h3>
      <ul class="tel-grid">${lista.filter((t) => t.cat === g).map((t) => `
        <li class="tel-card${t.tel ? "" : " pendiente"}">
          <div class="tel-info">
            <h4>${esc(t.nombre)}</h4>
            <p>${esc(t.desc)}</p>
            <div class="tel-tags">
              ${t.h24 ? `<span class="tag">24 h</span>` : ""}
              ${t.gratis ? `<span class="tag">Gratuita</span>` : ""}
            </div>
          </div>
          ${t.tel
            ? `<a class="tel-num" href="${telHref(t.tel)}" aria-label="Llamar a ${esc(t.nombre)}: ${esc(t.tel)}">${phoneIco}<span>${esc(t.tel)}</span></a>`
            : `<span class="tel-num falta">Número a completar</span>`}
        </li>`).join("")}
      </ul>`).join("");
  }
  $("#tel-filtros").addEventListener("click", (e) => {
    const b = e.target.closest("[data-cat]"); if (!b) return;
    telCat = b.dataset.cat; renderTelFiltros(); renderTels();
  });
  $("#tel-q").addEventListener("input", renderTels);
  renderTelFiltros(); renderTels();

  /* ---------------- Representantes ---------------- */
  $("#presidente-desc").textContent = D.presidente.descripcion;
  $("#comision").innerHTML = D.comision.map((m) => {
    const ini = m.nombre.split(" ").map((p) => p[0]).slice(0, 2).join("");
    return `<li class="miembro">
      <span class="avatar" aria-hidden="true">${esc(ini)}</span>
      <div><strong>${esc(m.nombre)}</strong><small>${esc(m.cargo)}</small></div>
    </li>`;
  }).join("");

  /* ---------------- Afiliación ---------------- */
  const form = $("#afil-form");
  const selSeccion = $("#seccion");
  D.secciones.forEach((s) => {
    const o = document.createElement("option");
    o.value = s.n; o.textContent = `${s.n}ª Sección · ${s.nombre}`;
    selSeccion.appendChild(o);
  });
  $("#acuerdo-texto").innerHTML = window.ACUERDO_HTML;

  // Firma digital sobre canvas
  const canvas = $("#firma");
  const ctx = canvas.getContext("2d");
  const hint = $("#firma-hint");
  let dibujando = false, firmado = false, last = null;

  function ajustarCanvas() {
    const r = canvas.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;
    const prev = firmado ? canvas.toDataURL() : null;
    canvas.width = r.width * ratio;
    canvas.height = r.height * ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.lineWidth = 2.4; ctx.lineCap = "round"; ctx.lineJoin = "round";
    ctx.strokeStyle = "#0b2545";
    if (prev) { const img = new Image(); img.onload = () => ctx.drawImage(img, 0, 0, r.width, r.height); img.src = prev; }
  }
  const pos = (e) => { const r = canvas.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };

  canvas.addEventListener("pointerdown", (e) => {
    dibujando = true; last = pos(e); canvas.setPointerCapture(e.pointerId);
    ctx.beginPath(); ctx.arc(last.x, last.y, 1.1, 0, Math.PI * 2); ctx.fillStyle = ctx.strokeStyle; ctx.fill();
  });
  canvas.addEventListener("pointermove", (e) => {
    if (!dibujando) return;
    const p = pos(e);
    ctx.beginPath(); ctx.moveTo(last.x, last.y); ctx.lineTo(p.x, p.y); ctx.stroke();
    last = p;
    if (!firmado) { firmado = true; hint.hidden = true; setError("firma", ""); }
  });
  ["pointerup", "pointercancel", "pointerleave"].forEach((ev) => canvas.addEventListener(ev, () => { dibujando = false; }));
  $("#firma-clear").addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); firmado = false; hint.hidden = false;
  });
  window.addEventListener("resize", ajustarCanvas);
  ajustarCanvas();

  // Validación
  function setError(id, msg) {
    const el = document.getElementById(id);
    const box = form.querySelector(`[data-for="${id}"]`) || (el && el.closest(".field") && el.closest(".field").querySelector(".error"));
    if (box) box.textContent = msg;
    if (el && el.tagName !== "CANVAS") el.setAttribute("aria-invalid", msg ? "true" : "false");
  }
  $("#dni").addEventListener("input", (e) => { e.target.value = e.target.value.replace(/\D/g, "").slice(0, 8); });

  function validar() {
    const v = (id) => $("#" + id).value.trim();
    const errores = {};
    const soloLetras = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' -]{2,}$/;
    if (!soloLetras.test(v("nombre"))) errores.nombre = "Ingresá tu nombre.";
    if (!soloLetras.test(v("apellido"))) errores.apellido = "Ingresá tu apellido.";
    if (!/^\d{7,8}$/.test(v("dni"))) errores.dni = "El DNI debe tener 7 u 8 números.";
    if (v("calle").length < 4 || !/\d/.test(v("calle"))) errores.calle = "Ingresá calle y número.";
    if (!v("seccion")) errores.seccion = "Elegí la sección de tu domicilio.";
    if (!$("#residente").checked) errores.residente = "Para afiliarte en Capital tu domicilio debe estar en la Ciudad de Mendoza.";
    if (!firmado) errores.firma = "Falta tu firma digital.";
    if (!$("#acepto").checked) errores.acepto = "Tenés que aceptar el acuerdo para afiliarte.";
    ["nombre", "apellido", "dni", "calle", "seccion", "residente", "firma", "acepto"].forEach((k) => setError(k, errores[k] || ""));
    return errores;
  }
  form.addEventListener("input", (e) => { if (e.target.getAttribute("aria-invalid") === "true") validar(); });
  form.addEventListener("change", (e) => { if (e.target.type === "checkbox") setError(e.target.id, ""); });

  const status = $("#form-status");
  const submitBtn = $("#afil-submit");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.textContent = ""; status.className = "form-status";
    const errores = validar();
    const primero = Object.keys(errores)[0];
    if (primero) {
      const el = primero === "firma" ? canvas : $("#" + primero);
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      if (el.focus) el.focus({ preventScroll: true });
      return;
    }
    const data = {
      nombre: $("#nombre").value.trim(),
      apellido: $("#apellido").value.trim(),
      dni: $("#dni").value.trim(),
      calle: $("#calle").value.trim(),
      depto: $("#depto").value.trim(),
      barrio: $("#barrio").value.trim(),
      seccion: Number($("#seccion").value),
      localidad: "Ciudad de Mendoza",
      firma: canvas.toDataURL("image/png"),
      aceptoAcuerdo: true,
      fecha: new Date().toISOString()
    };
    submitBtn.disabled = true; submitBtn.textContent = "Enviando…";
    try {
      const res = await window.API.enviarAfiliacion(data);
      $("#ok-text").innerHTML = `Recibimos tu solicitud, <strong>${esc(data.nombre)}</strong>.<br/>Número de trámite: <strong>${esc(res.tramite)}</strong>.<br/>Te vamos a contactar para completar el alta en el padrón.`;
      $("#ok-modal").showModal();
      form.reset(); $("#firma-clear").click();
    } catch (err) {
      status.textContent = err.message; status.classList.add("error-msg");
    } finally {
      submitBtn.disabled = false; submitBtn.textContent = "Acepto el acuerdo · Me quiero afiliar";
    }
  });

  // Cerrar modales tocando el fondo
  document.querySelectorAll("dialog").forEach((d) =>
    d.addEventListener("click", (e) => { if (e.target === d) d.close(); })
  );
})();
