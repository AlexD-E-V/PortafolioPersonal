# Portafolio Personal — Alex D.E.V.

Portafolio personal de **Alex D.E.V.**: Full Stack Developer.

Sitio de una sola página con un concepto visual **"Cosmos + Código"**: hero 3D orbital como fondo ambiental, constelaciones de stack interactivas (con navegación por arrastre), proyectos filtrables con modal de detalle, y soporte bilingüe (ES/EN).

> **Estado:** producto **en desarrollo (pre-1.0)** — `package.json` en `0.3.0`. El tag `v1.0` se reserva para cuando esté terminado y publicado. Las `iteración vX.Y.Z` en `docs/` son etiquetas de **plan de trabajo**, no la versión del producto.

## Stack

- **Astro 5** — framework base (SSG + islands)
- **React 18** — toda la UI interactiva vive en una isla (`client:only`)
- **Three.js** — sistema orbital 3D del hero
- **lucide-react** — íconos de UI (flechas, cerrar, navegación, etc.)
- **react-icons** (`fa6`) — logos de marca (GitHub, LinkedIn…)
- **Web3Forms** — backend del formulario de contacto (clave en `PUBLIC_WEB3FORMS_KEY`)
- **CSS** plano (`src/styles/global.css`) con custom properties

## Ejecutar en local

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # build de producción en dist/
npm run preview  # sirve el build
```

## Estructura

```
portafolio/
├── astro.config.mjs
├── public/
│   ├── brand/                      # logos, favicon, apple-touch, og-image
│   ├── cv/                         # CV-Alex-DEV-ES.pdf / -EN.pdf
│   ├── robots.txt
│   └── images/
│       ├── about/                  # foto de "Sobre mí"
│       └── projects/<cat>/<id>/    # una carpeta por proyecto
│           ├── cover.webp          # imagen de la card
│           └── 1.webp, 2.webp, 3.webp   # galería del modal
├── src/
│   ├── pages/
│   │   ├── index.astro          # Página única; monta la isla React
│   │   └── 404.astro            # Página de error (temática cosmos)
│   ├── styles/
│   │   └── global.css           # Estilos globales (paleta cosmos)
│   ├── data/
│   │   ├── site.js              # Config: status, logo, fuente, cursor
│   │   ├── i18n.js              # Textos ES/EN
│   │   ├── skills.js            # Constelación: estrellas, conexiones, contador y TECH_LABELS
│   │   ├── projects.js          # Proyectos (ver convenciones en su cabecera)
│   │   ├── experience.js        # Timeline de experiencia
│   │   └── planets.js           # Planetas del hero 3D
│   └── components/
│       ├── App.jsx              # Raíz de la isla React
│       ├── Ui.jsx               # Hooks, boot, cursor, header, hero, sobre mí
│       ├── Hero3D.jsx           # Sistema orbital (Three.js)
│       ├── Constellation.jsx    # Constelación de habilidades (canvas 2D)
│       ├── Sections.jsx         # Habilidades, proyectos, modal, experiencia, proceso
│       └── ContactFooter.jsx    # Contacto y footer
└── docs/
    ├── portafolio-diseno-v2.md                  # Documento de diseño original
    ├── iteracion-v1.0.0-portfolio-alex-dev.md   # Plan de la iteración v1.0.0
    └── iteracion-v1.1.0-portfolio-alex-dev.md   # Plan de la iteración v1.1.0
```

## Convenciones de datos

**Proyectos** (`src/data/projects.js` — detalle completo en la cabecera del archivo):
- `cats` — categorías del proyecto (define en qué filtros aparece). `catLabels` permite mostrar una etiqueta más específica en el badge (ej. `VR`/`AR`) sin cambiar los filtros.
- `tech` — lista completa de ids de tecnología; alimenta la **constelación** y el **Stack técnico del modal**. `techLabels` es el subset curado que se muestra en la **card**.
- `image` + `gallery` — rutas dentro de `public/images/projects/<cat>/<id>/`. Si un archivo no existe, cae a un placeholder automáticamente.
- `live` — URL pública (botón "Visitar"). `github` — URL del repo (botón "Ver código", solo en el modal); `null` lo oculta.
- `wip: true` — proyecto en proceso: la card marca "En proceso" y el modal oculta galería/resultados con un aviso "Más detalles próximamente".

**Constelación** (`src/data/skills.js`): cada estrella es una tecnología. El contador de proyectos por estrella es **automático** (cuenta los `tech` de los proyectos). `TECH_LABELS` (id→nombre) resuelve los nombres del stack del modal.

## Despliegue (Vercel)

Publicado en **https://alex-d-e-v.vercel.app** (deploy automático en cada push a `main`).

El sitio es **estático (SSG)**; Vercel detecta Astro solo (build `astro build`, output `dist/`, sin adaptador). Configuración ya aplicada:

- **Variable de entorno:** `PUBLIC_WEB3FORMS_KEY` configurada en *Project Settings → Environment Variables* (vive en `.env` local, que no se sube). Sin ella, el formulario falla en producción.
- **`SITE_URL`** en `index.astro` y **`site`** en `astro.config.mjs` apuntan al dominio → `og:image` / `og:url` absolutas y URLs canónicas.
- **Sitemap:** `@astrojs/sitemap` genera `sitemap-index.xml` en el build; `robots.txt` ya lo referencia.

> Si en el futuro se migra a **dominio propio**, actualizar el dominio en estos tres sitios: `SITE_URL` (index.astro), `site` (astro.config.mjs) y la línea `Sitemap:` (robots.txt); y volver a registrar la propiedad en Search Console.

## Pendientes (puntos abiertos)

**SEO / difusión:**
- **Google Search Console:** registrar la propiedad `https://alex-d-e-v.vercel.app/` (verificación por meta tag o archivo), enviar el sitemap (`sitemap-index.xml`) y solicitar indexación. Acelera aparecer en Google; opcional para un portafolio de referidos.
- **Renderizado client-only (limitación conocida):** la UI se monta con `client:only="react"`, así que el HTML servido lleva las metaetiquetas (title/description/OG ✓) pero el `<body>` se rellena por JS — sin `<h1>` ni texto en el HTML crudo. Google renderiza JS y termina indexando, pero crawlers más simples (algunos sociales/Bing) ven poco. Mejorarlo implica pasar a `client:load` con todo el acceso a `window`/`localStorage` guardado para SSR — refactor mayor, baja prioridad para este sitio.

**Consistencia / técnico:**
- **Migración a Astro 7:** el proyecto está en Astro 5.18; la última es la 7.x (dos majors atrás). Es lo único que cierra las 3 vulnerabilidades *high* que quedan en `npm audit` (`sharp`/libvips, `esbuild`), todas de **build-time**: sitio estático sin input no confiable → sin exposición en runtime. Tarea dedicada, no urgente. En el mismo saco: React 18→19 y three 0.158→0.185.
- **Optimización de carga:** `App.jsx` pesa ~557 kB (Three.js); el cuello de botella vive en el hero (above the fold). Mejora con sentido: no cargar Three.js en móvil / `prefers-reduced-motion` y mostrar un fondo estático. Opcional, medir con Lighthouse antes.
- **Repos "Ver código":** el botón ya está cableado (campo `github`). Falta poner URLs puntualmente, solo en repos que **no comprometan nada** (sin secretos, sin facilitar trampas, sin dañar productos vivos de cliente).
- **Contenido de proyectos:** revisar y reemplazar los textos marcados `[provisional]` en `projects.js`, y subir las imágenes (`cover`/galería) que aún faltan.
- **Space DEV oculto:** el proyecto sigue comentado en `projects.js` a la espera del **rebranding**. Se reactiva borrando las líneas de apertura y cierre del comentario que lo envuelve (marcadas en el archivo), y actualizando sus textos e imágenes con la identidad nueva.
- **Constelación de stack:** revisar qué tecnologías mantener en `enabled: false` mientras no tengan un proyecto que las respalde.
- **Recuento final de tecnologías dominadas:** actualizar la métrica del "Sobre Mí" cuando el stack esté cerrado.
- **Sección de experiencia:** ampliar con entradas posteriores a 2025.
- **Apartado de marcas / colaboraciones:** mención a marcas y emprendimientos con participación activa. A futuro, cuando estén más establecidas.

**Hecho / descartado:**
- ~~Integración con Supabase~~ — descartado; el status del header se controla en `src/data/site.js`, suficiente.
- ~~Formulario de contacto~~ — hecho con Web3Forms.
- ~~Enlaces de contacto (email, GitHub, LinkedIn, CV)~~ — hechos.
- ~~Logo definitivo~~ — hecho; assets de marca en `public/brand/`.
- ~~Sección de habilidades de diseño / Behance~~ — hecho.

## Autor

**Alex D.E.V.** — Full Stack Developer
