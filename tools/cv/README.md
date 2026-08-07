# Generador del CV (ES / EN)

Reconstruye el CV en PDF a partir de HTML. Existe **solo para poder mantener la
versión en inglés en sincronía con la española**: el CV en español lo generas tú
desde tu app de CV, y este script produce el gemelo en inglés con el mismo diseño.

## Cómo funciona

- `cv_content.py` — **todo el texto**, en `ES` y `EN`. Es lo único que hay que tocar
  para actualizar contenido.
- `cv_build.py` — el layout (CSS) y el render. Común a los dos idiomas, así que el
  diseño es idéntico por construcción.
- `foto.png` — la foto de perfil, extraída del PDF original.

El render lo hace **Chrome headless**, el mismo motor (Skia) con el que se generó el
PDF original — por eso las tipografías y el antialiasing coinciden.

## Uso

```bash
python tools/cv/cv_build.py
```

Deja `CV-Alex-DEV-ES.pdf` y `CV-Alex-DEV-EN.pdf` junto al script. Copia a
`public/cv/` el que necesites.

> **Ojo:** el ES que sale de aquí es una *réplica* usada para validar el diseño.
> El que se publica en `public/cv/CV-Alex-DEV-ES.pdf` es **tu original**, no este.
> Solo el EN se sirve desde este generador.

## Cuando actualices el CV

1. Exporta el nuevo ES desde tu app de CV y cópialo a `public/cv/CV-Alex-DEV-ES.pdf`.
2. Refleja los cambios en `cv_content.py` (bloques `ES` **y** `EN`).
3. `python tools/cv/cv_build.py`
4. Copia el `CV-Alex-DEV-EN.pdf` resultante a `public/cv/`.
5. Comprueba que sigue cabiendo en **una página**.

## Verificar fidelidad contra el original

```bash
python -c "import pymupdf; d=pymupdf.open('public/cv/CV-Alex-DEV-EN.pdf'); print(len(d),'pag'); d[0].get_pixmap(dpi=110).save('cv-en.png')"
```

Requiere `pymupdf` (`pip install pymupdf`). La última validación dio **0,88 mm** de
desviación máxima entre la réplica ES y el original.

## Referencia del diseño (extraída del PDF original)

| Elemento | Valor |
|---|---|
| Página | A4, 595.92 × 841.92 pt |
| Sidebar | 191 pt, fondo `#0C1221`, borde `#283C58` |
| Fondo principal | `#070A13` |
| Tipografías | Geist (400/500/600/700), Geist Mono (400) |
| Texto | `#F5F7FA` fuerte · `#A7B0C0` cuerpo |
| Acentos | `#5AA3D9` azul claro · `#3981BF` azul · `#F4B860` dorado |
| Badges | fondo `#161D33`, borde `#5882B4` (o `#F4B860` si destacado) |
| Foto | círculo de 93.7 pt |

Los badges **dorados** son los que marcan stack principal: TypeScript, React, Astro,
Tailwind, Flutter, Dart, Unity, C#, Supabase y Hostinger. El resto van en azul.
