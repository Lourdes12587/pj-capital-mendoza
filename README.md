# PJ Capital Mendoza

Sitio institucional del Partido Justicialista de la Ciudad de Mendoza (frontend).

## Secciones

- **Noticias**.
- **Padrón**: solo información y enlaces a las consultas oficiales ("¿Dónde voto?", "¿Estoy afiliado/a?"). El sitio no guarda ni muestra datos de padrón.
- **Habitantes**: mapa esquemático de las 12 secciones. Las cifras de población están pendientes ("Dato pendiente").
- **Preafiliación**: nombre, apellido, DNI, teléfono, email (opcional), sección y consentimiento. No es la afiliación oficial: el partido contacta a la persona.
- **Comisión partidaria**: presidente y cargos.

## Cómo verlo

Necesita un servidor HTTP (los scripts del kit son módulos ES y no cargan con doble clic desde `file://`):

```
npx serve .
# o
python -m http.server 8080
```

## Estructura

```
index.html
css/tokens.css ← colores, tipografías y espacios del sistema editorial
css/editorial.css ← cabecera, portada, noticias y padrón (diseño editorial)
css/page.css   ← estilos de las secciones que todavía usan el kit anterior
js/ui.js       ← menú de celular
js/data.js     ← contenido editable (secciones del mapa, comisión)
js/api.js      ← capa de datos: hoy guarda en el navegador; con USE_BACKEND = true usa la API
js/app.js      ← lógica de la página
assets/        ← kit de diseño (tasteskill) y fotos; no se edita
img/           ← fernando-ortiz.jpg (foto del presidente)
```

## Backend (pendiente)

`js/api.js` ya espera estos endpoints:

| Método | Ruta | Uso |
|---|---|---|
| POST | `/api/preafiliaciones` | Guardar una preafiliación |

## Pendientes (marcados como PENDIENTE en el código)

- URLs oficiales de "¿Dónde voto?" y "¿Estoy afiliado/a?" (`PENDIENTE_URL_OFICIAL` en `index.html`).
- Texto legal de consentimiento de la preafiliación (Ley 25.326).
- Población y fuente de cada sección (`js/data.js`).
- Nombres de la comisión partidaria y foto del presidente.
