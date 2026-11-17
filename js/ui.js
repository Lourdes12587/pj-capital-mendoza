/* PJ Capital · interacción de la cabecera (menú en celular y tablet). Sin dependencias. */
(function () {
  "use strict";
  const cabecera = document.getElementById("cabecera");
  if (!cabecera) return;
  const boton = cabecera.querySelector(".cabecera__menu");
  const menu = document.getElementById("menu-principal");

  function abrir(estado) {
    cabecera.dataset.abierta = String(estado);
    boton.setAttribute("aria-expanded", String(estado));
    boton.setAttribute("aria-label", estado ? "Cerrar el menú" : "Abrir el menú");
  }
  boton.addEventListener("click", () => abrir(cabecera.dataset.abierta !== "true"));
  menu.addEventListener("click", (e) => { if (e.target.closest("a")) abrir(false); });   // al elegir una sección se cierra
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && cabecera.dataset.abierta === "true") { abrir(false); boton.focus(); }
  });
  matchMedia("(min-width: 1024px)").addEventListener("change", (m) => { if (m.matches) abrir(false); });
})();
