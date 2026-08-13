# Portafolio Personal — Alex D.E.V.

Portafolio personal de **Alex D.E.V.**: Full Stack Developer.

Sitio de una sola página con un concepto visual **"Cosmos + Código"**: hero 3D orbital como fondo ambiental, constelaciones de stack interactivas (con navegación por arrastre), proyectos filtrables con modal de detalle, y soporte bilingüe (ES/EN).

> **Estado:** producto **en desarrollo**, iterando sobre contenido y pulido. La versión vive **solo** en `package.json` (`3.0.0`); el footer la lee de ahí, así que para cambiarla basta con tocar ese archivo. Las `iteración vX.Y.Z` en `docs/` son etiquetas de **plan de trabajo**, no la versión del producto.

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
├── vercel.json                     # Cabeceras de seguridad (CSP) y caché
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
├── tools/cv/                    # Generador del CV en inglés (ver su README)
└── docs/                        # Interno, no versionado
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
- `featured: true` — proyecto que representa a su categoría en la vista inicial de "Todos" (una card de web, apps, games y xr). Uno por categoría; sin marcar, se coge el primero del array. No cambia el orden de "Mostrar todo" ni los filtros.

**Constelación** (`src/data/skills.js`): cada estrella es una tecnología. El contador de proyectos por estrella es **automático** (cuenta los `tech` de los proyectos). `TECH_LABELS` (id→nombre) resuelve los nombres del stack del modal.

## Despliegue (Vercel)

Publicado en **https://alex-d-e-v.vercel.app** (deploy automático en cada push a `main`).

El sitio es **estático (SSG)**; Vercel detecta Astro solo (build `astro build`, output `dist/`, sin adaptador). Configuración ya aplicada:

- **Variable de entorno:** `PUBLIC_WEB3FORMS_KEY` configurada en *Project Settings → Environment Variables* (vive en `.env` local, que no se sube). Sin ella, el formulario falla en producción.
- **`SITE_URL`** en `index.astro` y **`site`** en `astro.config.mjs` apuntan al dominio → `og:image` / `og:url` absolutas y URLs canónicas.
- **Sitemap:** `@astrojs/sitemap` genera `sitemap-index.xml` en el build; `robots.txt` ya lo referencia.
- **`vercel.json`:** cabeceras de seguridad y reglas de caché (ver abajo).

> Si en el futuro se migra a **dominio propio**, actualizar el dominio en estos tres sitios: `SITE_URL` (index.astro), `site` (astro.config.mjs) y la línea `Sitemap:` (robots.txt); y volver a registrar la propiedad en Search Console.

### Cabeceras y caché (`vercel.json`)

En todas las rutas: HSTS, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`,
`Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (cámara,
micrófono, geolocalización, pagos y USB bloqueados) y una **Content-Security-Policy**.

Caché distinta según el archivo, a propósito:

| Ruta | Caché | Por qué |
|---|---|---|
| `/_astro/*` | 1 año, `immutable` | Llevan hash en el nombre: si cambia el contenido, cambia la URL |
| `/images/*`, `/brand/*` | 1 día + 7 de `stale-while-revalidate` | **No** llevan hash; si reemplazas una imagen no debe quedarse clavada un año |
| `/cv/*` | 1 hora, `must-revalidate` | Es lo que más se actualiza |

> **⚠️ Al añadir cualquier servicio externo, hay que tocar la CSP**
>
> La CSP **bloquea por defecto todo dominio que no esté listado**, y falla **en
> silencio**: no verás un error en la página, simplemente el mapa no carga, el
> vídeo sale en negro o las visitas no se registran. Si en algún momento añades
> **Google Maps, Google Analytics, un embed de YouTube/Vimeo, Calendly, un chat,
> una fuente de otro proveedor…**, hay que meter su dominio en la directiva que
> corresponda de `vercel.json`:
>
> | Qué añades | Directiva |
> |---|---|
> | Script de terceros (GA4, chat, widget) | `script-src` |
> | Llamada `fetch`/XHR a otra API | `connect-src` |
> | `<iframe>` (Maps, YouTube, Calendly) | `frame-src` — **no existe todavía, hay que crearla** |
> | Imágenes de otro dominio (CDN) | `img-src` |
> | Fuentes o CSS de otro proveedor | `font-src` / `style-src` |
>
> Suele hacer falta **más de una** a la vez: Google Maps embebido, por ejemplo,
> necesita `frame-src` **y** `script-src` **e** `img-src`.
>
> **Cómo comprobarlo:** `astro preview` **no** aplica `vercel.json`, así que en
> local no se detecta. Tras desplegar, abre la consola del navegador y busca
> mensajes tipo *"Refused to … because it violates the Content Security Policy"*:
> te dicen la directiva exacta que falta.
>
> **Por qué `script-src` lleva `'unsafe-inline'`:** Astro emite dos scripts inline
> con el runtime de hidratación de islas, y su contenido cambia en cada build, así
> que no se pueden fijar por hash sin romper cada despliegue. Traducido: la CSP
> **sí** impide cargar scripts de dominios ajenos y conectar con servidores no
> listados; **no** impide un script inline inyectado. Para un sitio estático sin
> login ni contenido de usuario ese vector es casi inexistente, pero conviene
> saberlo en vez de dar por hecho que la CSP cubre todo.

## Pendientes (puntos abiertos)

> Las **decisiones aplazadas** (con el porqué de cada una, para no rediscutirlas) viven
> en [`PENDIENTES.md`](PENDIENTES.md).

**SEO / difusión:**
- **Google Search Console:** registrar la propiedad `https://alex-d-e-v.vercel.app/` (verificación por meta tag o archivo), enviar el sitemap (`sitemap-index.xml`) y solicitar indexación. Acelera aparecer en Google; opcional para un portafolio de referidos.
- **Renderizado client-only (limitación conocida):** la UI se monta con `client:only="react"`, así que el HTML servido lleva las metaetiquetas (title/description/OG ✓) pero el `<body>` se rellena por JS — sin `<h1>` ni texto en el HTML crudo. Google renderiza JS y termina indexando, pero crawlers más simples (algunos sociales/Bing) ven poco. Mejorarlo implica pasar a `client:load` con todo el acceso a `window`/`localStorage` guardado para SSR — refactor mayor, baja prioridad para este sitio.

**Contenido:**
- **Textos `[provisional]`:** quedan **13** en `projects.js` — el `challenge` y el `solution` de `club-exploradores`, `rompamos-el-tabu` y `trazando-pasos` (en ES y EN), más el `solution` EN de `plantain-feast`. (Los otros que aparecen al buscar están dentro del bloque comentado de Space DEV y no se muestran.)
- **Galería de Pets:** faltan `1/2/3.webp`. No rompe nada: `wip: true` las oculta.
- **Sección de experiencia:** ampliar con entradas posteriores.
- **Apartado de marcas / colaboraciones:** a futuro, cuando esas marcas estén más establecidas.

**Técnico:**
- **Migración a Astro 7:** el proyecto está en Astro 5.18; la última es la 7.x (dos majors atrás). Es lo único que cierra las 3 vulnerabilidades que quedan en `npm audit` (`sharp`/libvips, `esbuild`), todas de **build-time**: sitio estático sin input no confiable → sin exposición en runtime. Tarea dedicada, no urgente. En el mismo saco: React 18→19 y three 0.158→0.185.
- **Optimización de carga:** hecho el corte principal — `Hero3D` se carga con `React.lazy`, así que Three.js vive en su propio chunk (~472 kB / 120 kB gzip) y sale del camino crítico, que queda en **~238 kB (~78 kB gzip)** entre `client.js`, `App.js` e `index.js`. Queda **opcional**: no cargar Three.js en absoluto en móvil / `prefers-reduced-motion` y poner un fondo estático. Eso cambia el aspecto del hero en esos casos, así que es decisión de diseño; medir con Lighthouse antes.

**Hecho / descartado:**
- ~~Integración con Supabase~~ — descartado; el status del header se controla en `src/data/site.js`, suficiente.
- ~~Formulario de contacto~~ — hecho con Web3Forms.
- ~~Enlaces de contacto (email, GitHub, LinkedIn, CV)~~ — hechos.
- ~~Logo definitivo~~ — hecho; assets de marca en `public/brand/`.
- ~~Sección de habilidades de diseño / Behance~~ — hecho.
- ~~Cabeceras de seguridad y caché~~ — hechas en `vercel.json`.
- ~~Contraste AA~~ — hecho; `--text-2` da 5.09:1 sobre el fondo y 4.77:1 sobre superficies elevadas.
- ~~Accesibilidad de la constelación~~ — hecha; ver la nota de abajo.
- ~~Repos "Ver código"~~ — resuelto por criterio: solo `alfareria-metalurgia-ar` lleva enlace. El resto se reservan a propósito (producto vivo de cliente, o el repo facilitaría trampas). No es una tarea abierta.
- ~~Recuento de "Tecnologías dominadas"~~ — la métrica (25+) es correcta y conservadora frente a las 32 estrellas visibles.
- ~~Estrellas en `enabled: false`~~ — no es un pendiente: es el criterio funcionando (no se muestran tecnologías sin proyecto que las respalde).

## Accesibilidad

Además de lo habitual (skip link, focus trap y fondo `inert` en el modal, errores de
formulario enlazados a su input con `aria-invalid`/`aria-describedby`, *stretched link*
en las cards para no anidar controles), hay una decisión que conviene conocer antes de
tocar la constelación:

**La constelación tiene un equivalente accesible.** El `<canvas>` es una imagen plana:
sus estrellas no existen para el teclado ni para un lector de pantalla. Por eso
`Constellation.jsx` renderiza, junto al canvas, una lista de botones (uno por estrella)
oculta a la vista pero enfocable, con `role="toolbar"` y **roving tabindex**: es *una*
sola parada de tabulación y por dentro se recorre con flechas (`Home`/`End` a los
extremos, `Enter` filtra). Al enfocar una estrella se enciende en el canvas y aparece su
tooltip, así que el foco sí se ve.

> Si añades o quitas estrellas, la lista se genera sola desde `SKILLS`. Lo que **no**
> hay que hacer es devolverle el `aria-label` al `<canvas>`: está `aria-hidden` a
> propósito, porque quien aporta la semántica es la lista.

## Autor

**Alex D.E.V.** — Full Stack Developer
