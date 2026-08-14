# Assets de marca — Alex D.E.V.

Genera todas las variantes del logo (fondos + tamaños) a partir de los SVG
exportados de Illustrator.

```bash
node tools/brand/build.mjs
```

Lee `tools/brand/src/` → escribe `public/brand/oficial-02/`. Es idempotente:
borra la carpeta de salida y vuelve a correrlo cuando quieras.

## Fuentes

| Archivo | Qué es | Dimensiones |
| --- | --- | --- |
| `src/logo.svg` | Lockup completo: monograma + `lex` + `EV` | viewBox 827.459 × 778.62 |
| `src/iso.svg` | Solo el monograma A+D | viewBox 751.877 × 778.62 |
| `src/og.png` | Pieza social diseñada a mano | 1200 × 600 |

Los SVG puedes reemplazarlos con el export crudo de Illustrator (Atributos de
presentación · Contornos · Mínimo · Decimal 3 · Minimizar + Flexible). El script
normaliza los ids, quita el `xmlns:xlink` muerto y añade `<title>` + `role`.

`src/og.png` **no se genera**, solo se optimiza (aplanado contra `--bg-0` +
cuantización a paleta: ~1 MB → ~280 KB, sin banding visible en la nebulosa).
Importa mantenerlo por debajo del mega: los scrapers de WhatsApp y LinkedIn se
atragantan con imágenes más pesadas y no muestran preview. Si lo cambias por uno
de otras dimensiones, actualiza `og:image:width` / `og:image:height` en
`src/pages/index.astro` o el preview sale deformado.

## Salida

### SVG

| Archivo | Fondo | Para qué |
| --- | --- | --- |
| `logo.svg` | transparente | El lockup sobre superficies oscuras propias |
| `logo-badge.svg` | `--bg-0` + glow + borde | Lockup en superficies ajenas |
| `logo-badge-flat.svg` | `--bg-0` plano | Cuando el glow estorba (impresión) |
| `logo-badge-raised.svg` | `--bg-2` | Cuando va como card *encima* de la propia web |
| `iso.svg` | transparente | Monograma sobre oscuro |
| `iso-badge.svg` | `--bg-0` + glow + borde | **Avatares, favicon, app icon** |
| `iso-badge-flat.svg` | `--bg-0` plano | Idem sin glow |
| `iso-badge-raised.svg` | `--bg-2` | Idem sobre la web |

Los badges son 1:1 con radio proporcional a `--r-modal`.

### PNG (`png/`)

- `icon-16/32/48/64/180/192/512.png` — desde `iso-badge.svg`. Favicon,
  `apple-touch-icon` (180) y manifest (192/512).
- `logo-512/1024.png`, `iso-512/1024.png` — transparentes, para composiciones.
- `og-image.png` — Open Graph / Twitter Card.

### Dónde se usa

| Sitio | Asset |
| --- | --- |
| Favicon (`index.astro`, `404.astro`) | `iso-badge.svg` + `png/icon-32.png` |
| `apple-touch-icon` | `png/icon-180.png` |
| `og:image` / `twitter:image` | `png/og-image.png` |
| Header (`Ui.jsx`) | `iso.svg` a 36px |
| Footer (`ContactFooter.jsx`) | `iso.svg` a 48px |
| Página 404 | `logo.svg` a 104–128px de alto |
| Núcleo del hero (`Hero3D.jsx`) | `png/iso-512.png` |

En el hero va el PNG y no el SVG a propósito: el `TextureLoader` de Three.js
necesita el tamaño intrínseco de la imagen, y los SVG salen "Flexible" (sin
`width`/`height`), así que la textura saldría con las dimensiones por defecto
del navegador.

## Reglas de uso

1. **Nunca sobre fondo claro en versión transparente.** El degradado arranca en
   `#fff` y no se despega del blanco hasta el offset 0.44: sobre blanco
   desaparece toda la A y el `lex`, y solo sobrevive la panza de la D. El umbral
   real no es "oscuro" sino "no claro" — un gris medio (~`#8a8a8a`) funciona
   bien. Sobre cualquier cosa más clara, usa un `-badge`.
2. **Tamaño mínimo del lockup: ~120px de ancho.** Por debajo, `lex` y `EV` se
   convierten en papilla.
3. **Tamaño mínimo del iso: ~32px.** A 24px va justo y a 16px el trazo fino de
   la A se pierde: el `icon-16.png` funciona como silueta de color en la pestaña,
   no como glifo legible. Si algún día quieres que lea de verdad a 16px hace
   falta una variante con el trazo engrosado a mano en Illustrator, no un
   reescalado.
4. **Colores.** `build.mjs` duplica los tokens de `src/styles/global.css` en la
   constante `C`. Si cambias `--bg-0`, `--bg-2` o `--blue` allí, actualízalos
   aquí y regenera.

## Ojo al inlinear

Cada archivo lleva ids con prefijo propio (`adev-l-*` para el lockup, `adev-i-*`
para el iso) para que puedas meter el logo y el iso en la misma página sin que
los degradados colisionen. Lo que **sí** colisiona es inlinear dos variantes de
la *misma* familia a la vez (p. ej. `logo.svg` y `logo-badge.svg`), porque
comparten `adev-l-a/b/c`. Si necesitas ese caso, renombra los ids de una de las
dos o sírvela como `<img>`.
