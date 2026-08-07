# Pendientes y decisiones aplazadas

Registro de lo que se dejó **conscientemente para después**, con el porqué, para no
volver a discutirlo desde cero. El README mantiene la lista general de pendientes;
este archivo guarda el **contexto de las decisiones**.

Última actualización: **2026-08-07**

---

## 🟡 Decisiones abiertas (requieren criterio del dueño)

### Estrellas candidatas de la constelación — revisar en bloque
**Aplazado el 2026-08-07.** Al definir el stack de IDCOM y CECP salieron varias
candidatas a estrella nueva. Se decidió **no añadir ninguna por ahora** y revisarlas
juntas más adelante, con criterio de conjunto en vez de una a una.

Criterio vigente: estrella **solo** para tecnología fundamental y transferible
(motores, SDKs, frameworks). Nada de librerías menores.

| Candidata | A favor | En contra | Dónde se usa |
|---|---|---|---|
| **GSAP** | Estándar de facto de animación web, transferible a cualquier proyecto, encaja con el perfil creativo-técnico | Ninguno de peso; salió por querer revisar el bloque completo antes | IDCOM (`gsap` + `@gsap/react`) |
| **Three.js** | Más fundamental aún que GSAP; mueve el sistema orbital del hero de esta misma página | Quedaría en **0 proyectos**, porque el portafolio no está listado como proyecto propio (el tooltip omite el contador con 0, así que no se ve mal) | Este portafolio (`Hero3D.jsx`) |
| **Apache / `.htaccess`** | Habilidad real y transferible: redirects a HTTPS, host canónico, gzip, caché y cabeceras de seguridad escritos a mano. Encajaría en la categoría `deploy` junto a los hostings | Es más "operaciones" que stack de producto | IDCOM y CECP |
| **Google Analytics 4** | Montado con consentimiento de cookies, que tiene su miga | De momento **un solo proyecto**; mejor esperar a que se repita | IDCOM |
| **Cloudflare** | — | Aquí solo es el beacon de analítica, ni CDN ni hosting. **No** justifica estrella | IDCOM |

**Descartadas de plano** (librerías menores o features de framework, no estrellas):
`lucide-react`, `cobe`, Vite (implícito en Astro), `@astrojs/sitemap`, Astro Fonts API,
Web3Forms (servicio), Google Ads (marketing).

**Si se añade alguna**, recordar: crear la estrella en `src/data/skills.js` con sus
coordenadas `x`/`y`, añadir sus pares a `SKILL_LINKS`, y sumar el id al `tech` de los
proyectos que la usen (el contador se recalcula solo).


### Fuentes: quitar Inter y JetBrains Mono del `<link>` de Google Fonts
**Estado: descartado por ahora, no por pereza.**

`src/pages/index.astro` pide 4 familias; con la config actual solo se usan
Geist y Geist Mono. Parece limpieza obvia, **pero rompería una opción viva**:
`SITE.fontPair` acepta `'geist' | 'inter'` (`src/data/site.js`) y el CSS tiene un
bloque `html[data-font="inter"]` que las usa como primarias. Al quitarlas, poner
`fontPair: 'inter'` caería en silencio a `system-ui` / `monospace`.

Además el beneficio es **cero medible**: el navegador no descarga los `woff2` de
familias que nunca llegan a aplicarse; el único coste es un CSS ~1 kB más grande.

**Para cerrarlo hay que decidir primero:** ¿se conserva `fontPair` como opción real,
o se asume que el sitio es Geist y punto? Si es lo segundo, se quitan **a la vez**
la opción, el bloque CSS `html[data-font="inter"]` y las dos familias del `<link>`.
(`404.astro` ya pide solo Geist + Geist Mono.)

### Migración a Astro 7
El proyecto está en Astro 5.18; la última es 7.x (dos majors atrás). Es lo único que
cierra las **3 vulnerabilidades restantes** de `npm audit` (`sharp`/libvips, `esbuild`),
todas de **build-time**: sitio estático sin input no confiable → sin exposición en
runtime. Es *breaking change*, así que va en sesión dedicada.
En el mismo saco: React 18→19 y three 0.158→0.185.

### No cargar Three.js en móvil / `prefers-reduced-motion`
El code-splitting ya está hecho (bundle crítico 558 kB → 87 kB). El siguiente paso
sería **no cargar Three en absoluto** en móvil o con reduced-motion y poner un fondo
estático. Eso **cambia el aspecto del hero** en esos casos → es decisión de diseño,
no técnica. Medir con Lighthouse antes de decidir si compensa.

### Space DEV
Sigue comentado en `src/data/projects.js` a la espera del **rebranding**. Se reactiva
borrando las líneas de apertura y cierre del comentario que lo envuelve (marcadas en
el archivo) y actualizando textos e imágenes con la identidad nueva.

---

## 🟢 Contenido por completar

- **Textos `[provisional]`** en `projects.js`: quedan en `club-exploradores`,
  `rompamos-el-tabu`, `trazando-pasos` y el `solution` EN de `plantain-feast`.
- **Galería de Pets**: faltan `1/2/3.webp`. No rompe nada porque `wip: true` las oculta.
- **Estrellas en `enabled: false`** (`skills.js`): `html5`, `preact`, `responsive`,
  `postgresql`, `maya`, `blender`. Revisar cuáles reactivar cuando haya proyecto que
  las respalde.
- **Icono ✦** de filtros secundarios: sigue siendo el temporal
  (`Sections.jsx`, comentario "icono temporal — pendiente iconografía").
- **Recuento de "Tecnologías dominadas"** (métrica del Sobre Mí): actualizar cuando el
  stack esté cerrado.
- **`tech` de las entradas de experiencia**: todas con `tech: []`, así que ninguna
  muestra badges. Decidir si se quieren.
- **Google Search Console**: registrar la propiedad, enviar el sitemap y pedir indexación.
- **Apartado de marcas / colaboraciones**: a futuro, cuando esas marcas estén más
  establecidas.

---

## ⚙️ Limitación conocida (no es un pendiente)

**Renderizado client-only.** La UI se monta con `client:only="react"`: el HTML servido
lleva las metaetiquetas (title/description/OG ✓) pero el `<body>` lo rellena JS, sin
`<h1>` ni texto en el HTML crudo. Google renderiza JS y termina indexando; crawlers más
simples ven poco. Arreglarlo implica pasar a `client:load` con todo el acceso a
`window`/`localStorage` protegido para SSR: refactor mayor y de baja prioridad aquí.
