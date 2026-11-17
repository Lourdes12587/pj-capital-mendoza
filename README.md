# PJ Capital Mendoza

Sitio institucional del Partido Justicialista de la Ciudad de Mendoza (frontend).
Reglas del proyecto y decisiones: ver `CLAUDE.md`.

## Secciones

- **Noticias**.
- **Padrón**: solo información y enlaces a las consultas oficiales ("¿Dónde voto?", "¿Estoy afiliado/a?"). El sitio no guarda ni muestra datos de padrón.
- **Habitantes**: mapa esquemático de las 12 secciones. Las cifras de población están pendientes ("Dato pendiente").
- **Encuesta vecinal**: 5 preguntas, opcional y anónima. El ranking muestra solo respuestas reales.
- **Teléfonos útiles**: emergencias, violencia de género, salud, jubilados y servicios.
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
css/page.css   ← estilos propios (lo que el kit no trae)
js/data.js     ← contenido editable (secciones, teléfonos, encuesta, comisión)
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
| POST | `/api/encuestas` | Guardar una respuesta de la encuesta |
| GET  | `/api/encuestas/resultados` | Ranking agregado |

## Pendientes (marcados como PENDIENTE en el código)

- URLs oficiales de "¿Dónde voto?" y "¿Estoy afiliado/a?" (`PENDIENTE_URL_OFICIAL` en `index.html`).
- Texto legal de consentimiento de la preafiliación (Ley 25.326).
- Población y fuente de cada sección (`js/data.js`).
- Nombres de la comisión partidaria y foto del presidente.
- Teléfonos locales (Municipalidad, hospital, luz, agua, gas) y verificación de todos los números.
