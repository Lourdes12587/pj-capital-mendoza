# PJ Capital Mendoza

Sitio institucional del Partido Justicialista de la Ciudad de Mendoza (frontend).

## Secciones

- **Noticias** con filtros por categoría.
- **Padrón**: búsqueda por DNI o apellido.
- **Habitantes**: mapa de las 12 secciones de la Capital con la población de cada una.
- **Tu voz**: encuesta a vecinos (se abre sola en la primera visita) y ranking de preocupaciones.
- **Teléfonos útiles**: emergencias, violencia de género, salud, jubilados y servicios.
- **Comisión partidaria**: presidente e integrantes.
- **Afiliación**: formulario con domicilio en Capital, firma digital y aceptación del acuerdo.

## Cómo verlo

Abrir `index.html` en el navegador. No necesita instalación ni build.

## Estructura

```
index.html
css/styles.css
js/data.js   ← contenido editable (noticias, secciones, teléfonos, comisión, encuesta, padrón demo)
js/api.js    ← capa de datos: hoy guarda en el navegador; con USE_BACKEND = true usa la API
js/main.js   ← lógica de la página
img/         ← fernando-ortiz.jpg (foto del presidente)
```

## Backend (pendiente)

`js/api.js` ya espera estos endpoints:

| Método | Ruta | Uso |
|---|---|---|
| GET  | `/api/padron?q=` | Buscar en el padrón |
| POST | `/api/afiliaciones` | Guardar una afiliación (incluye la firma en PNG) |
| POST | `/api/encuestas` | Guardar una respuesta de la encuesta |
| GET  | `/api/encuestas/resultados` | Ranking agregado |

## Pendiente de contenido

- Datos oficiales de habitantes por sección.
- Números locales en Teléfonos útiles (Municipalidad, hospital, luz, agua, gas) y verificación de todos los números.
- Biografía del presidente, integrantes de la comisión y noticias reales.
- Revisión del acuerdo de adhesión por los apoderados.
