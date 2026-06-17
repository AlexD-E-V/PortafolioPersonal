/* ============================================================
   App principal — Portafolio ALEX DEV
   Isla React (client:only) montada desde src/pages/index.astro.
   La configuración (status, logo, fuente, cursor) vive en
   src/data/site.js — antes era el panel de tweaks del prototipo.
   ============================================================ */

import React from 'react';
import { SITE } from '../data/site.js';
import { I18N } from '../data/i18n.js';
import { SKILLS } from '../data/skills.js';
import { PROJECTS } from '../data/projects.js';
import {
  useReducedMotion, BootSequence, CustomCursor, Header, Hero, About, NAV_IDS
} from './Ui.jsx';
import {
  SkillsSection, ProjectsSection, CaseStudyModal, ExperienceSection, ProcessSection
} from './Sections.jsx';
import { ContactSection, Footer } from './ContactFooter.jsx';

/* Starfield estático de fondo (muy sutil, no animado) */
function StaticStarfield() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    function paint() {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const W = window.innerWidth, H = window.innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      // semilla determinista para que no "salte" al redimensionar
      let seed = 42;
      const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
      const n = Math.round((W * H) / 14000);
      for (let i = 0; i < n; i++) {
        const x = rnd() * W, y = rnd() * H;
        const r = rnd() * 1.1 + 0.2;
        const a = rnd() * 0.5 + 0.08;
        ctx.fillStyle = 'rgba(170,196,221,' + a + ')';
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    paint();
    window.addEventListener('resize', paint);
    return () => window.removeEventListener('resize', paint);
  }, []);
  return <canvas id="starfield-bg" ref={ref} aria-hidden="true"></canvas>;
}

export default function App() {
  const reducedMotion = useReducedMotion();

  // ----- Idioma -----
  const [lang, setLangState] = React.useState(() => {
    const saved = localStorage.getItem('ae_lang');
    if (saved === 'es' || saved === 'en') return saved;
    return (navigator.language || 'es').startsWith('es') ? 'es' : 'en';
  });
  const setLang = (l) => {
    setLangState(l);
    localStorage.setItem('ae_lang', l);
    document.documentElement.lang = l;
  };
  React.useEffect(() => { document.documentElement.lang = lang; }, []);

  // ----- Tipografía -----
  React.useEffect(() => {
    document.documentElement.setAttribute('data-font', SITE.fontPair === 'inter' ? 'inter' : 'geist');
  }, []);

  // ----- Filtros -----
  const [skillFilter, setSkillFilter] = React.useState('all');
  const [projectFilter, setProjectFilter] = React.useState('all');
  const [techFilter, setTechFilter] = React.useState(null); // {id, name}

  // ----- Modal -----
  const [openProject, setOpenProject] = React.useState(null);

  // ----- Reveal de entrada (hero + header) -----
  // Si hay reduced-motion → visible de inmediato, sin animación.
  // Si se mostrará el boot (misma condición que BootSequence) → espera a
  // que termine (onDone). Si no hay boot (visita recurrente) → revela en el
  // primer frame con el mismo efecto.
  const bootWillShow = React.useRef(
    !reducedMotion && !localStorage.getItem('ae_boot_seen')
  ).current;
  const [revealed, setRevealed] = React.useState(reducedMotion);
  React.useEffect(() => {
    if (reducedMotion || bootWillShow) return;
    const id = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(id);
  }, []);
  // Seguro: pase lo que pase, el contenido nunca queda oculto.
  React.useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 5000);
    return () => clearTimeout(t);
  }, []);

  // ----- Sección activa -----
  const [activeSection, setActiveSection] = React.useState('inicio');
  React.useEffect(() => {
    function onScroll() {
      let current = 'inicio';
      NAV_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) current = id;
      });
      setActiveSection(current);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ----- Hash directo a case study (#proyecto-id) -----
  React.useEffect(() => {
    const m = window.location.hash.match(/^#proyecto-(.+)$/);
    if (m && PROJECTS.some((p) => p.id === m[1])) setOpenProject(m[1]);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
  };

  // click en estrella de la constelación → filtra proyectos
  const onStarClick = (star) => {
    setTechFilter({ id: star.id, name: star.name });
    setProjectFilter('all');
    scrollTo('proyectos');
  };

  // click en planeta del hero → destaca en habilidades
  const onPlanetClick = (techId) => {
    const star = SKILLS.find((s) => s.id === techId);
    if (star) setSkillFilter(star.cat);
    scrollTo('habilidades');
  };

  // navegación entre case studies
  const navigateProject = (dir) => {
    const idx = PROJECTS.findIndex((p) => p.id === openProject);
    if (idx === -1) return;
    const next = (idx + dir + PROJECTS.length) % PROJECTS.length;
    setOpenProject(PROJECTS[next].id);
  };

  const t = I18N[lang];

  return (
    <React.Fragment>
      <a className="skip-link" href="#sobre">{t.skipLink}</a>
      <div className="nebula-bg" aria-hidden="true"></div>
      <StaticStarfield />
      <BootSequence lang={lang} onDone={() => setRevealed(true)} />
      <CustomCursor enabled={SITE.customCursor} />
      <Header lang={lang} setLang={setLang} status={SITE.status} activeSection={activeSection} revealed={revealed} />
      <main id="main">
        <Hero lang={lang} status={SITE.status} onPlanetClick={onPlanetClick} reducedMotion={reducedMotion} revealed={revealed} />
        <About lang={lang} />
        <SkillsSection lang={lang} filter={skillFilter} setFilter={setSkillFilter} onStarClick={onStarClick} reducedMotion={reducedMotion} />
        <ProjectsSection
          lang={lang}
          filter={projectFilter}
          setFilter={(f) => { setProjectFilter(f); setTechFilter(null); }}
          techFilter={techFilter}
          clearTechFilter={() => setTechFilter(null)}
          onOpen={setOpenProject}
        />
        <ExperienceSection lang={lang} />
        <ProcessSection lang={lang} />
        <ContactSection lang={lang} />
      </main>
      <Footer lang={lang} />
      {openProject && (
        <CaseStudyModal
          lang={lang}
          projectId={openProject}
          onClose={() => setOpenProject(null)}
          onNavigate={navigateProject}
        />
      )}
    </React.Fragment>
  );
}
