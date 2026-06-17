/* ============================================================
   UI base: hooks, boot sequence, cursor custom, header, hero,
   sobre mí. (Portado del prototipo de Claude Design a módulos ES.)
   ============================================================ */

import React from 'react';
import { I18N } from '../data/i18n.js';
import { Hero3D } from './Hero3D.jsx';
import { ArrowRight, ArrowDown } from 'lucide-react';

/* ---------- Hooks compartidos ---------- */
export function useReveal() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add('reveal');
    let done = false;
    function check() {
      if (done) return;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.92 && r.bottom > 0) {
        done = true;
        el.classList.add('visible');
        window.removeEventListener('scroll', check);
      }
    }
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, []);
  return ref;
}

export function useReducedMotion() {
  const [rm] = React.useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  return rm;
}

/* Renderiza texto de i18n con énfasis **negrita** sin usar HTML crudo */
export function Bold({ text }) {
  return text.split('**').map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part));
}

/* Colorea la marca "D.E.V." en azul (como el logo: "Alex" claro + "D.E.V." azul) */
export function BrandName({ text }) {
  return text.split(/(D\.E\.V\.)/).map((part, i) =>
    part === 'D.E.V.' ? <span key={i} className="brand-dev">{part}</span> : part
  );
}

/* ---------- Boot sequence (primera visita) ---------- */
export function BootSequence({ lang, onDone }) {
  const [visible, setVisible] = React.useState(false);
  const [lineCount, setLineCount] = React.useState(0);
  const [fading, setFading] = React.useState(false);
  const lines = I18N[lang].boot;
  const rm = useReducedMotion();

  React.useEffect(() => {
    if (rm) return;
    const seen = localStorage.getItem('ae_boot_seen');
    if (seen) return;
    setVisible(true);
    setFading(false);
    setLineCount(0);
    localStorage.setItem('ae_boot_seen', '1');
  }, []);

  React.useEffect(() => {
    if (!visible || fading) return;
    if (lineCount >= lines.length) {
      const t = setTimeout(() => setFading(true), 600);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setLineCount((c) => c + 1), lineCount === 0 ? 350 : 520);
    return () => clearTimeout(t);
  }, [visible, lineCount, fading]);

  React.useEffect(() => {
    if (!fading) return;
    const t = setTimeout(() => { setVisible(false); onDone && onDone(); }, 520);
    return () => clearTimeout(t);
  }, [fading]);

  React.useEffect(() => {
    if (!visible) return;
    const skip = () => setFading(true);
    window.addEventListener('keydown', skip);
    window.addEventListener('pointerdown', skip);
    return () => {
      window.removeEventListener('keydown', skip);
      window.removeEventListener('pointerdown', skip);
    };
  }, [visible]);

  if (!visible) return null;
  return (
    <div className={'boot-overlay' + (fading ? ' fading' : '')} role="status" aria-live="polite">
      <div className="boot-terminal">
        {lines.slice(0, lineCount).map((l, i) => (
          <div key={i} className={'boot-line' + (i === lines.length - 1 ? ' boot-final' : '')}>
            <span className="boot-prompt">&gt; </span>{l}
          </div>
        ))}
        <span className="boot-caret"></span>
      </div>
      <span className="boot-skip">{I18N[lang].bootSkip}</span>
    </div>
  );
}

/* ---------- Cursor custom (solo desktop, respeta reduced motion) ---------- */
export function CustomCursor({ enabled }) {
  const dotRef = React.useRef(null);
  const rm = useReducedMotion();
  const active = enabled && !rm && window.matchMedia('(pointer: fine)').matches;

  React.useEffect(() => {
    if (!active) {
      document.body.classList.remove('cursor-hidden');
      return;
    }
    document.body.classList.add('cursor-hidden');
    const dot = dotRef.current;
    let raf = null, x = -100, y = -100;

    function onMove(e) {
      x = e.clientX; y = e.clientY;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = null;
          if (dot) dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
        });
      }
      const t = e.target;
      const interactive = t.closest && t.closest('a, button, input, select, textarea, label, canvas, .project-card, [role="button"]');
      if (dot) dot.classList.toggle('over-interactive', !!interactive);
    }
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.body.classList.remove('cursor-hidden');
      if (raf) cancelAnimationFrame(raf);
    };
  }, [active]);

  if (!active) return null;
  return <div className="custom-cursor" ref={dotRef} style={{ transform: 'translate(-100px, -100px)' }} aria-hidden="true"></div>;
}

/* ---------- Status en vivo ---------- */
export const STATUS_META = {
  available: { color: '#4ADE80', glow: 'rgba(74,222,128,0.5)' },
  limited:   { color: '#F4B860', glow: 'rgba(244,184,96,0.5)' },
  closed:    { color: '#F87171', glow: 'rgba(248,113,113,0.5)' }
};

export function StatusPill({ lang, status }) {
  const meta = STATUS_META[status] || STATUS_META.available;
  return (
    <div className="status-pill" title="Status — pendiente sincronizar desde Supabase">
      <span className="status-dot" style={{ background: meta.color, '--dot-glow': meta.glow }}></span>
      <span className="status-text">{I18N[lang].status[status]}</span>
    </div>
  );
}

/* ---------- Header ---------- */
export const NAV_IDS = ['inicio', 'sobre', 'habilidades', 'proyectos', 'experiencia', 'proceso', 'contacto'];

export function Header({ lang, setLang, status, activeSection, logoStyle }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const t = I18N[lang];

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const navLinks = (cls) => NAV_IDS.map((id) => (
    <button
      key={id}
      className={'nav-link' + (activeSection === id ? ' active' : '') + (cls ? ' ' + cls : '')}
      onClick={() => goTo(id)}
    >{t.nav[id]}</button>
  ));

  return (
    <React.Fragment>
      <header className={'site-header' + (scrolled ? ' scrolled' : '')}>
        <div className="header-inner">
          <a className="logo" href="#inicio" onClick={(e) => { e.preventDefault(); goTo('inicio'); }} aria-label="Alex D.E.V. — Inicio">
            <img className="logo-img" src="/brand/iso.png" alt="Alex D.E.V." width="49" height="36" />
          </a>
          <nav className="nav-desktop" aria-label="Navegación principal">{navLinks()}</nav>
          <div className="lang-toggle" role="group" aria-label="Idioma">
            <button className={lang === 'es' ? 'active' : ''} onClick={() => setLang('es')}>ES</button>
            <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
          </div>
          <StatusPill lang={lang} status={status} />
          <button
            className="hamburger"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          ><span></span><span></span><span></span></button>
        </div>
      </header>
      {/* Fuera del <header>: el header con .scrolled aplica backdrop-filter,
          que convertiría al header en el bloque contenedor de este menú fixed
          y lo confinaría a su caja (quedaría pegado arriba al scrollear). */}
      <div className={'mobile-menu' + (menuOpen ? ' open' : '')}>
        {navLinks()}
        <div className="lang-toggle" style={{ marginTop: 18 }}>
          <button className={lang === 'es' ? 'active' : ''} onClick={() => setLang('es')}>ES</button>
          <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
        </div>
      </div>
    </React.Fragment>
  );
}

/* ---------- Hero ----------
   El sistema orbital es una capa de FONDO ambiental (absolute,
   detrás del texto, extendida hasta los bordes del hero sin
   recortes). El texto va encima con pointer-events selectivos
   para que el hover/click de los planetas siga funcionando. */
export function Hero({ lang, status, onPlanetClick, reducedMotion }) {
  const t = I18N[lang];
  const meta = STATUS_META[status] || STATUS_META.available;

  const goTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
  };

  return (
    <div className="hero" id="inicio">
      <Hero3D lang={lang} onPlanetClick={onPlanetClick} reducedMotion={reducedMotion} />
      <div className="hero-content">
        <div className="hero-badge">
          <span className="status-dot" style={{ background: meta.color, '--dot-glow': meta.glow }}></span>
          <span>{t.heroBadge[status]}</span>
        </div>
        <h1 className="hero-title"><BrandName text={t.hero.title} /></h1>
        <p className="hero-subtitle">{t.hero.subtitle}</p>
        <p className="hero-desc">{t.hero.desc}</p>
        <div className="hero-actions">
          <button className="btn btn-primary" onClick={() => goTo('proyectos')}>{t.hero.ctaPrimary} <ArrowRight size={17} aria-hidden="true" /></button>
          <button className="btn btn-outline" onClick={() => goTo('contacto')}>{t.hero.ctaSecondary} <ArrowDown size={17} aria-hidden="true" /></button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Contador animado ---------- */
export function StatNumber({ value, suffix }) {
  const ref = React.useRef(null);
  const [n, setN] = React.useState(0);
  const startedRef = React.useRef(false);
  const rm = useReducedMotion();

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (rm) { setN(value); return; }
    function start() {
      if (startedRef.current) return;
      startedRef.current = true;
      window.removeEventListener('scroll', check);
      const t0 = performance.now(), dur = 1400;
      function tick(now) {
        const p = Math.min((now - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setN(Math.round(value * eased));
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }
    function check() {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.92 && r.bottom > 0) start();
    }
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, [value]);

  return (
    <span className="stat-num" ref={ref}>
      {n}<span className="stat-plus">{suffix}</span>
    </span>
  );
}

/* ---------- Sobre mí ---------- */
export function About({ lang }) {
  const t = I18N[lang].about;
  const ref = useReveal();
  const [imgError, setImgError] = React.useState(false);
  const photo = '/images/about/alex-enriquez-cv-pic.webp';
  return (
    <section className="site-section" id="sobre" ref={ref}>
      <div className="about-grid">
        <div className="about-frame">
          {!imgError ? (
            <img
              className="about-photo-img"
              src={photo}
              alt={t.photoAlt || 'Alex Enriquez Vera'}
              loading="lazy"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="about-photo img-placeholder" role="img" aria-label={t.photoPh}>
              <span className="ph-label">{t.photoPh}</span>
            </div>
          )}
        </div>
        <div className="about-text">
          <span className="section-label">{t.label}</span>
          <h2 className="section-title"><BrandName text={t.title} /></h2>
          <p><Bold text={t.p1} /></p>
          <p>{t.p2}</p>
          <div className="stats-row">
            {t.stats.map((s, i) => (
              <div className="stat-card" key={i}>
                <StatNumber value={s.value} suffix={s.suffix} />
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
