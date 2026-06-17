/* ============================================================
   Constelación interactiva de habilidades (canvas 2D)
   Estrellas = tecnologías; líneas = stacks. Filtro por categoría,
   hover con tooltip, click filtra proyectos.
   v1.0.0:
   - Espacio virtual más ancho que el contenedor: click sostenido
     sobre el vacío + arrastre para navegar (pan horizontal).
   - Estrellas con enabled:false no se renderizan (tecnologías
     sin proyecto visible que las respalde).
   ============================================================ */

import React from 'react';
import { I18N } from '../data/i18n.js';
import { SKILLS, SKILL_LINKS } from '../data/skills.js';

const CONST_COLORS = {
  blue: '#5AA3D9',
  blueDim: 'rgba(90,163,217,',
  gold: '#F4B860',
  goldDim: 'rgba(244,184,96,',
  line: 'rgba(90,163,217,'
};

const VISIBLE = SKILLS.filter((s) => s.enabled);

export function Constellation({ lang, filter, onStarClick, reducedMotion }) {
  const wrapRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const [tooltip, setTooltip] = React.useState(null);
  const animRef = React.useRef({ stars: {}, hovered: null, raf: null, t: 0, pan: 0, vel: 0 });

  const t9n = I18N[lang].skills;

  // categorías de una estrella (cats opcional para multi-categoría)
  const catsOf = (s) => s.cats || [s.cat];

  // alpha objetivo por estrella según filtro
  const targetAlpha = (star) => {
    if (filter === 'all') return 1;
    return catsOf(star).includes(filter) ? 1 : 0.15;
  };

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext('2d');
    const A = animRef.current;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;

    // estado de animación por estrella
    VISIBLE.forEach((s) => {
      if (!A.stars[s.id]) A.stars[s.id] = { alpha: 1, scale: 1, twinkle: Math.random() * Math.PI * 2 };
    });

    let W = 0, H = 0, dpr = Math.min(window.devicePixelRatio, 2);
    // ancho del espacio virtual navegable (mayor que el contenedor)
    const virtW = () => Math.max(W * 1.45, 980);
    const maxPan = () => Math.max(0, virtW() - W);
    const clampPan = (v) => Math.min(maxPan(), Math.max(0, v));

    function resize() {
      W = wrap.clientWidth; H = wrap.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      A.pan = clampPan(A.pan);
    }
    resize();
    // Pan inicial centrado en el espacio virtual (solo la primera vez:
    // no re-centrar en cada resize ni pisar el arrastre del usuario al
    // cambiar de filtro/idioma). Aplica igual en móvil y desktop.
    if (!A.panInit) { A.pan = clampPan(maxPan() / 2); A.panInit = true; }
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const pad = { x: 70, y: 56 };
    // En móvil la nube de estrellas deja aire de sobra arriba y queda
    // pegada al hint de abajo: la subimos un poco aprovechando ese espacio
    // (el recuadro pasa a 420px de alto bajo el breakpoint de 768).
    const yShift = () => (W < 768 ? 34 : 0);
    const px = (s) => pad.x + s.x * (virtW() - pad.x * 2) - A.pan;
    const py = (s) => pad.y + s.y * (H - pad.y * 2) - yShift();

    function starAt(mx, my) {
      let best = null, bestD = 28;
      VISIBLE.forEach((s) => {
        const d = Math.hypot(px(s) - mx, py(s) - my);
        if (d < bestD) { best = s; bestD = d; }
      });
      return best;
    }

    function showTooltip(s) {
      if (!s) { setTooltip(null); return; }
      const n = s.projects;
      const catLabels = I18N[lang].filters;
      const count = n > 0 ? ` · ${n} ${n === 1 ? t9n.project : t9n.projects}` : '';
      setTooltip({
        x: px(s), y: py(s) - 14 * s.size,
        name: s.name,
        meta: `${catLabels[s.cat] || s.cat}${count}`
      });
    }

    function setIdleCursor(star) {
      canvas.style.cursor = star ? 'pointer' : 'grab';
    }

    // --- Pan con click sostenido sobre el vacío ---
    let panning = false, panMoved = false, panStartX = 0, panStartVal = 0;
    let lastX = 0, lastT = 0; // para medir la velocidad del flick al soltar

    function onPointerDown(e) {
      const r = canvas.getBoundingClientRect();
      const s = starAt(e.clientX - r.left, e.clientY - r.top);
      if (s) return; // sobre una estrella: el click filtra, no panea
      panning = true; panMoved = false;
      panStartX = e.clientX; panStartVal = A.pan;
      lastX = e.clientX; lastT = e.timeStamp; A.vel = 0; // corta cualquier inercia en curso
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = 'grabbing';
      setTooltip(null);
    }
    function onPointerMove(e) {
      if (!panning) return;
      const dx = e.clientX - panStartX;
      if (Math.abs(dx) > 4) panMoved = true;
      A.pan = clampPan(panStartVal - dx);
      // velocidad del pan (px por ~frame), normalizada por el tiempo real
      // entre eventos y con un suavizado ligero para que el flick sea estable.
      const dt = Math.max(1, e.timeStamp - lastT);
      const vInst = (-(e.clientX - lastX) / dt) * 16;
      A.vel = A.vel * 0.6 + vInst * 0.4;
      lastX = e.clientX; lastT = e.timeStamp;
    }
    function onPointerUp(e) {
      if (!panning) return;
      panning = false;
      try { canvas.releasePointerCapture(e.pointerId); } catch (err) {}
      const r = canvas.getBoundingClientRect();
      setIdleCursor(starAt(e.clientX - r.left, e.clientY - r.top));
      // A.vel se conserva → el loop de animación aplica la inercia.
    }

    function onMove(e) {
      if (panning) return;
      const r = canvas.getBoundingClientRect();
      const s = starAt(e.clientX - r.left, e.clientY - r.top);
      if (s !== A.hovered) {
        A.hovered = s;
        setIdleCursor(s);
        showTooltip(s);
      } else if (s) {
        showTooltip(s); // reposicionar si hubo resize/pan
      }
    }
    function onLeave() { A.hovered = null; setTooltip(null); canvas.style.cursor = ''; }
    function onClick(e) {
      if (panMoved) { panMoved = false; return; } // fue un arrastre, no un click
      const r = canvas.getBoundingClientRect();
      const s = starAt(e.clientX - r.left, e.clientY - r.top);
      if (!s) { if (isTouch) onLeave(); return; }
      if (isTouch && A.hovered !== s) {
        // primer tap: tooltip; segundo tap: filtrar
        A.hovered = s;
        showTooltip(s);
        return;
      }
      onStarClick && onStarClick(s);
    }
    canvas.style.touchAction = 'pan-y';
    canvas.style.cursor = 'grab';
    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointercancel', onPointerUp);
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);
    canvas.addEventListener('click', onClick);

    let running = true;
    const io = new IntersectionObserver(([en]) => { running = en.isIntersecting; });
    io.observe(wrap);

    const linkedTo = (id) => SKILL_LINKS
      .filter((l) => l[0] === id || l[1] === id)
      .map((l) => (l[0] === id ? l[1] : l[0]));

    function draw() {
      A.raf = requestAnimationFrame(draw);
      if (!running) return;
      if (!reducedMotion) A.t += 0.016;

      // Inercia del pan: al soltar, el desplazamiento sigue deslizándose
      // y desacelera por fricción hasta frenar (sensación táctil natural).
      if (!panning && Math.abs(A.vel) > 0.05) {
        const next = clampPan(A.pan + A.vel);
        if (next === A.pan) A.vel = 0; // chocó con el borde → frena
        A.pan = next;
        A.vel *= 0.92; // fricción: más alto = deslizamiento más largo
      }

      ctx.clearRect(0, 0, W, H);

      const byId = {};
      VISIBLE.forEach((s) => { byId[s.id] = s; });

      // interpolar alphas / escalas
      VISIBLE.forEach((s) => {
        const st = A.stars[s.id];
        const tA = targetAlpha(s) * (A.hovered && A.hovered !== s && !linkedTo(A.hovered.id).includes(s.id) ? 0.55 : 1);
        st.alpha += (tA - st.alpha) * 0.08;
        const tS = A.hovered === s ? 1.35 : 1;
        st.scale += (tS - st.scale) * 0.15;
      });

      // líneas de conexión (solo entre estrellas habilitadas)
      SKILL_LINKS.forEach(([a, b]) => {
        const sa = byId[a], sb = byId[b];
        if (!sa || !sb) return;
        const stA = A.stars[a], stB = A.stars[b];
        let alpha = Math.min(stA.alpha, stB.alpha) * 0.22;
        if (filter !== 'all' && !(catsOf(sa).includes(filter) && catsOf(sb).includes(filter))) alpha *= 0.25;
        const isHL = A.hovered && (a === A.hovered.id || b === A.hovered.id);
        if (isHL) alpha = 0.65;
        ctx.strokeStyle = CONST_COLORS.line + alpha + ')';
        ctx.lineWidth = isHL ? 1.2 : 0.8;
        ctx.beginPath();
        ctx.moveTo(px(sa), py(sa));
        ctx.lineTo(px(sb), py(sb));
        ctx.stroke();
      });

      // estrellas
      VISIBLE.forEach((s) => {
        const st = A.stars[s.id];
        const x = px(s), y = py(s);
        if (x < -80 || x > W + 80) return; // fuera del encuadre actual
        const tw = reducedMotion ? 1 : 0.85 + Math.sin(A.t * 1.3 + st.twinkle) * 0.15;
        const R = 4.2 * s.size * st.scale;
        const isGold = s.main;
        const base = isGold ? CONST_COLORS.goldDim : CONST_COLORS.blueDim;

        // glow
        const glowR = R * (A.hovered === s ? 5 : 3.2) * tw;
        const g = ctx.createRadialGradient(x, y, 0, x, y, glowR);
        g.addColorStop(0, base + 0.5 * st.alpha + ')');
        g.addColorStop(1, base + '0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, glowR, 0, Math.PI * 2);
        ctx.fill();

        // núcleo
        ctx.fillStyle = isGold ? CONST_COLORS.gold : CONST_COLORS.blue;
        ctx.globalAlpha = st.alpha;
        ctx.beginPath();
        ctx.arc(x, y, R, 0, Math.PI * 2);
        ctx.fill();

        // destello en cruz (sutil, solo principales)
        if (isGold && st.alpha > 0.5) {
          ctx.strokeStyle = base + 0.35 * st.alpha + ')';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(x - R * 2.6, y); ctx.lineTo(x + R * 2.6, y);
          ctx.moveTo(x, y - R * 2.6); ctx.lineTo(x, y + R * 2.6);
          ctx.stroke();
        }

        // etiqueta mono
        ctx.font = '11.5px "Geist Mono", "JetBrains Mono", monospace';
        ctx.fillStyle = '#A7B0C0';
        ctx.textAlign = 'center';
        ctx.fillText(s.name, x, y + R + 17);
        ctx.globalAlpha = 1;
      });
    }
    draw();

    return () => {
      cancelAnimationFrame(A.raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointercancel', onPointerUp);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
      canvas.removeEventListener('click', onClick);
    };
  }, [filter, lang, reducedMotion]);

  return (
    <div className="constellation-wrap" ref={wrapRef}>
      <canvas ref={canvasRef} aria-label="Constelación de tecnologías"></canvas>
      {tooltip && (
        <div className="const-tooltip" style={{ left: tooltip.x, top: tooltip.y }}>
          <span>{tooltip.name}</span>
          <span className="tt-meta">{tooltip.meta}</span>
        </div>
      )}
      <span className="const-hint">{t9n.hint}</span>
    </div>
  );
}
