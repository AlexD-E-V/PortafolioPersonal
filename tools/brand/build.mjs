/**
 * Generador de assets de marca — Alex D.E.V.
 *
 * Toma los SVG exportados de Illustrator desde ./src y produce todas las
 * variantes (fondos + tamaños) en public/brand/oficial-02/.
 *
 * Uso:  node tools/brand/build.mjs
 *
 * Los fuentes en ./src pueden ser el export crudo de Illustrator: este script
 * se encarga de normalizar los ids (Illustrator los saca como "a", "b", "c" y
 * colisionan si inlineas dos SVG en la misma página), quitar el xmlns:xlink
 * muerto y añadir <title> + role="img".
 */

import sharp from 'sharp';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = join(HERE, 'src');
const SRC_OG = join(SRC, 'og.png');
const OUT = join(HERE, '..', '..', 'public', 'brand', 'oficial-02');
const OUT_PNG = join(OUT, 'png');

/* Paleta — espejo de src/styles/global.css. Si cambian los tokens ahí,
   actualízalos aquí y regenera. */
const C = {
  bg0: '#070B14',   // --bg-0
  bg2: '#161E33',   // --bg-2
  blue: '#3981BF',  // --blue
};
const RADIUS_RATIO = 180 / 1024;  // equivale a --r-modal a esta escala

/* ---------- normalización del export de Illustrator ---------- */

function parseSource(file, prefix) {
  const raw = readFileSync(join(SRC, file), 'utf8');

  const viewBox = raw.match(/viewBox="([\d.\s-]+)"/)[1].trim().split(/\s+/).map(Number);
  const defs = (raw.match(/<defs>([\s\S]*?)<\/defs>/) || [null, ''])[1];
  let body = raw
    .replace(/^[\s\S]*?<svg[^>]*>/, '')
    .replace(/<defs>[\s\S]*?<\/defs>/, '')
    .replace(/<title[\s\S]*?<\/title>/, '')
    .replace(/<\/svg>\s*$/, '')
    .trim();

  // remapea TODO id existente a uno con prefijo propio, venga crudo o ya limpio
  let out = { defs, body };
  const ids = [...defs.matchAll(/id="([^"]+)"/g)].map((m) => m[1]);
  ids.forEach((id, i) => {
    const next = `${prefix}-${String.fromCharCode(97 + i)}`;
    const esc = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    out.defs = out.defs.replace(new RegExp(`id="${esc}"`, 'g'), `id="${next}"`);
    out.defs = out.defs.replace(new RegExp(`url\\(#${esc}\\)`, 'g'), `url(#${next})`);
    out.body = out.body.replace(new RegExp(`url\\(#${esc}\\)`, 'g'), `url(#${next})`);
  });

  return { ...out, w: viewBox[2], h: viewBox[3] };
}

const indent = (s, n) =>
  s.trim().split('\n').map((l) => ' '.repeat(n) + l.trim()).join('\n');

/* ---------- variante transparente ---------- */

function transparent(src, titleId, title) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${src.w} ${src.h}" role="img" aria-labelledby="${titleId}">
  <title id="${titleId}">${title}</title>
  <defs>
${indent(src.defs, 4)}
  </defs>
${indent(src.body, 2)}
</svg>
`;
}

/* ---------- variante con fondo (badge cuadrado) ---------- */

function badge(src, { size = 1024, bg, glow, border, fill = 0.7, titleId, title, glowId }) {
  const s = (size * fill) / Math.max(src.w, src.h);
  const tx = (size - src.w * s) / 2;
  const ty = (size - src.h * s) / 2;
  const r = Math.round(size * RADIUS_RATIO);

  const glowDefs = glow
    ? `    <radialGradient id="${glowId}" cx="0.5" cy="0.42" r="0.62">
      <stop offset="0" stop-color="${C.blue}" stop-opacity="0.30"/>
      <stop offset="0.55" stop-color="${C.blue}" stop-opacity="0.10"/>
      <stop offset="1" stop-color="${C.blue}" stop-opacity="0"/>
    </radialGradient>
`
    : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" role="img" aria-labelledby="${titleId}">
  <title id="${titleId}">${title}</title>
  <defs>
${glowDefs}${indent(src.defs, 4)}
  </defs>
  <rect width="${size}" height="${size}" rx="${r}" fill="${bg}"/>
${glow ? `  <rect width="${size}" height="${size}" rx="${r}" fill="url(#${glowId})"/>\n` : ''}${
    border
      ? `  <rect x="1" y="1" width="${size - 2}" height="${size - 2}" rx="${r - 1}" fill="none" stroke="#ffffff" stroke-opacity="0.08" stroke-width="2"/>\n`
      : ''
  }  <g transform="translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${s.toFixed(5)})">
${indent(src.body, 4)}
  </g>
</svg>
`;
}

/* ---------- og-image ----------
   No se genera: es una pieza diseñada a mano en src/og.png. Aquí solo se
   optimiza — aplanar el alfa contra --bg-0 y cuantizar a paleta baja el peso de
   ~1 MB a ~280 KB sin banding visible en la nebulosa, y los scrapers de
   WhatsApp/LinkedIn se atragantan con imágenes de más de ~1 MB. */

async function buildOg() {
  const meta = await sharp(SRC_OG).metadata();
  await sharp(SRC_OG)
    .flatten({ background: C.bg0 })
    .png({ compressionLevel: 9, palette: true, quality: 90 })
    .toFile(join(OUT_PNG, 'og-image.png'));
  return { name: 'png/og-image.png', w: meta.width, h: meta.height };
}

/* ---------- build ---------- */

mkdirSync(OUT_PNG, { recursive: true });

const logo = parseSource('logo.svg', 'adev-l');
const iso = parseSource('iso.svg', 'adev-i');
const TITLE = 'Alex D.E.V.';

const write = (name, content) => {
  writeFileSync(join(OUT, name), content);
  return name;
};

const files = [];

// SVG — lockup
files.push(write('logo.svg', transparent(logo, 'adev-logo-title', TITLE)));
files.push(write('logo-badge.svg', badge(logo, {
  bg: C.bg0, glow: true, border: true, fill: 0.7,
  titleId: 'adev-logo-badge-title', title: TITLE, glowId: 'adev-l-glow',
})));
files.push(write('logo-badge-flat.svg', badge(logo, {
  bg: C.bg0, glow: false, border: false, fill: 0.7,
  titleId: 'adev-logo-flat-title', title: TITLE, glowId: 'adev-l-glow',
})));
files.push(write('logo-badge-raised.svg', badge(logo, {
  bg: C.bg2, glow: true, border: true, fill: 0.7,
  titleId: 'adev-logo-raised-title', title: TITLE, glowId: 'adev-l-glow',
})));

// SVG — iso
files.push(write('iso.svg', transparent(iso, 'adev-iso-title', TITLE)));
files.push(write('iso-badge.svg', badge(iso, {
  bg: C.bg0, glow: true, border: true, fill: 0.66,
  titleId: 'adev-iso-badge-title', title: TITLE, glowId: 'adev-i-glow',
})));
files.push(write('iso-badge-flat.svg', badge(iso, {
  bg: C.bg0, glow: false, border: false, fill: 0.66,
  titleId: 'adev-iso-flat-title', title: TITLE, glowId: 'adev-i-glow',
})));
files.push(write('iso-badge-raised.svg', badge(iso, {
  bg: C.bg2, glow: true, border: true, fill: 0.66,
  titleId: 'adev-iso-raised-title', title: TITLE, glowId: 'adev-i-glow',
})));

// og-image (pieza manual, solo se optimiza)
const og = await buildOg();

/* PNG. Rasterizamos siempre a ~2048px y bajamos de ahí: los trazos del iso son
   finísimos y rasterizar directo al tamaño final se los come. La density va por
   archivo porque sharp la interpreta sobre 72dpi y un valor fijo se pasa del
   límite de píxeles en los SVG de viewBox grande. */
const SUPERSAMPLE = 2048;
const png = (svg, size, name, height) => {
  const vbW = Number(svg.match(/viewBox="[\d.-]+\s+[\d.-]+\s+([\d.]+)/)[1]);
  const density = Math.min(2400, Math.max(72, Math.round((72 * SUPERSAMPLE) / vbW)));
  return sharp(Buffer.from(svg), { density })
    .resize(height ? { width: size, height } : { width: size })
    .png({ compressionLevel: 9 })
    .toFile(join(OUT_PNG, name))
    .then(() => `png/${name}`);
};

const isoBadge = readFileSync(join(OUT, 'iso-badge.svg'), 'utf8');
const jobs = [
  // iconos de app / favicon — iso con fondo, que es lo único legible en chico
  ...[16, 32, 48, 64, 180, 192, 512].map((n) => png(isoBadge, n, `icon-${n}.png`)),
  // transparentes para composiciones propias
  png(readFileSync(join(OUT, 'logo.svg'), 'utf8'), 512, 'logo-512.png'),
  png(readFileSync(join(OUT, 'logo.svg'), 'utf8'), 1024, 'logo-1024.png'),
  png(readFileSync(join(OUT, 'iso.svg'), 'utf8'), 512, 'iso-512.png'),
  png(readFileSync(join(OUT, 'iso.svg'), 'utf8'), 1024, 'iso-1024.png'),
];

const written = await Promise.all(jobs);
console.log([...files, ...written, og.name].join('\n'));
console.log(`\n${files.length + written.length + 1} archivos en public/brand/oficial-02/`);
console.log(`og-image: ${og.w}x${og.h} — si cambias sus dimensiones, actualiza`);
console.log(`og:image:width / og:image:height en src/pages/index.astro`);
