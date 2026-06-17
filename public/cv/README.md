# CVs descargables

El botón "CV (PDF)" de la sección de Contacto descarga el archivo según el idioma activo de la
página (toggle ES/EN). Las rutas están en `src/components/ContactFooter.jsx` (`CV_URLS`).

Coloca aquí los dos PDFs con estos **nombres exactos**:

- `CV-Alex-DEV-ES.pdf` → versión en español
- `CV-Alex-DEV-EN.pdf` → versión en inglés

Todo lo que esté en `public/` se sirve desde la raíz del sitio, así que quedarán accesibles en
`/cv/CV-Alex-DEV-ES.pdf` y `/cv/CV-Alex-DEV-EN.pdf`. No hace falta tocar código al reemplazarlos:
basta con sobrescribir el archivo manteniendo el mismo nombre.
