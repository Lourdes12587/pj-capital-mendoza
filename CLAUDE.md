# Proyecto: Web institucional PJ Capital Mendoza

## Qué es
Web institucional e informativa del Partido Justicialista de Capital (Mendoza, Argentina).
El frontend ya está maquetado. Ahora vamos a ordenarlo y agregarle funcionalidades.

## Secciones
1. Institucional: quiénes somos, autoridades, noticias, contacto.
2. Preafiliación: formulario donde la persona deja sus datos para que el partido
   la contacte y complete la afiliación formal. NO es una afiliación oficial:
   el texto de la web debe dejarlo claro.
3. Encuesta de entrada: breve y opcional.
4. Padrón: solo información y enlaces a las consultas OFICIALES.
   NO guardamos ni mostramos datos de padrón propios.
5. Mapa interactivo de Capital con sus secciones y la población de cada una.

## Stack
- Frontend: el existente (HTML/CSS/JS o React, según el proyecto).
- Mapa: Leaflet + archivo GeoJSON.
- Backend (fase posterior): Node.js + Express + MySQL.

## Reglas obligatorias
- No inventes datos: población, límites geográficos, URLs oficiales ni nombres
  de autoridades. Si falta un dato, dejá un marcador visible "PENDIENTE: ..."
  y avisame.
- Nunca pongas contraseñas, tokens ni claves en el código: van en .env.
- Mobile-first, accesible (contraste, etiquetas, navegación con teclado) y en español.
- No modifiques secciones que no tengan que ver con la tarea pedida.
- Antes de hacer cambios grandes, explicame el plan y esperá mi confirmación.
- Al terminar cada tarea, decime qué archivos cambiaste y cómo probarlo.
- Los datos personales que se recojan son sensibles (Ley 25.326):
  consentimiento explícito y nada de datos de más.