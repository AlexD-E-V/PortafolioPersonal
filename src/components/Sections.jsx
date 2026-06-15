/* ============================================================
   Secciones: Habilidades, Proyectos (+modal), Experiencia,
   Proceso.
   v1.1.0: filtros secundarios en la constelación (Backend /
   Diseño / Herramientas), vista inicial de proyectos con una
   card por categoría principal, footer de card con "Visitar" /
   "En proceso" y "Ver código" solo dentro del modal.
   El modal omite los bloques de case study sin contenido.
   ============================================================ */

import React from 'react';
import { I18N } from '../data/i18n.js';
import { PROJECTS } from '../data/projects.js';
import { TECH_LABELS } from '../data/skills.js';
import { EXPERIENCE } from '../data/experience.js';
import { useReveal, Bold } from './Ui.jsx';
import { Constellation } from './Constellation.jsx';
import { ArrowRight, ExternalLink, Clock, X, ChevronLeft, ChevronRight, Sparkles, Palette } from 'lucide-react';
import { FaGithub, FaBehance } from 'react-icons/fa6';
import { BEHANCE_URL } from './ContactFooter.jsx';

export const FILTER_KEYS = ['all', 'web', 'apps', 'games', 'xr'];
// Filtros secundarios de la constelación (se despliegan con el botón ✦)
export const SECONDARY_FILTER_KEYS = ['backend', 'design', 'tools', 'deploy'];

/* ---------- Habilidades ---------- */
export function SkillsSection({ lang, filter, setFilter, onStarClick, reducedMotion }) {
  const t = I18N[lang];
  const ref = useReveal();
  const [moreOpen, setMoreOpen] = React.useState(false);
  const showSecondary = moreOpen || SECONDARY_FILTER_KEYS.includes(filter);

  const toggleMore = () => {
    // al cerrar con un filtro secundario activo, vuelve a "Todos"
    if (showSecondary && SECONDARY_FILTER_KEYS.includes(filter)) setFilter('all');
    setMoreOpen(!showSecondary);
  };

  return (
    <section className="site-section" id="habilidades" ref={ref}>
      <span className="section-label">{t.skills.label}</span>
      <h2 className="section-title">{t.skills.title}</h2>
      <p style={{ color: 'var(--text-1)', maxWidth: '58ch', textWrap: 'pretty' }}><Bold text={t.skills.desc} /></p>
      <div className="filter-row" role="group" aria-label="Filtros de habilidades">
        {FILTER_KEYS.map((k) => (
          <button key={k} className={'chip' + (filter === k ? ' active' : '')} onClick={() => setFilter(k)}>
            {t.filters[k]}
          </button>
        ))}
        {/* Botón secundario (icono temporal — pendiente iconografía) */}
        <button
          className={'chip chip-more' + (showSecondary ? ' active' : '')}
          onClick={toggleMore}
          aria-label={t.skills.moreFilters}
          aria-expanded={showSecondary}
          title={t.skills.moreFilters}
        >✦</button>
        {showSecondary && SECONDARY_FILTER_KEYS.map((k) => (
          <button key={k} className={'chip' + (filter === k ? ' active' : '')} onClick={() => setFilter(k)}>
            {t.filters[k]}
          </button>
        ))}
      </div>
      <Constellation lang={lang} filter={filter} onStarClick={onStarClick} reducedMotion={reducedMotion} />
    </section>
  );
}

/* ---------- Card de proyecto ---------- */
export function ProjectCard({ project, lang, index, onOpen }) {
  const t = I18N[lang];
  const c = project[lang];
  const cardRef = React.useRef(null);
  const [imgError, setImgError] = React.useState(false);

  // Entrada escalonada al entrar en viewport (scroll-based, robusto)
  React.useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    let done = false, timer = null;
    function check() {
      if (done) return;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.95 && r.bottom > 0) {
        done = true;
        window.removeEventListener('scroll', check);
        timer = setTimeout(() => el.classList.add('in'), (index % 4) * 80);
      }
    }
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => { window.removeEventListener('scroll', check); if (timer) clearTimeout(timer); };
  }, []);

  return (
    <article
      ref={cardRef}
      className="project-card appear"
      tabIndex={0}
      role="button"
      aria-label={c.title}
      onClick={() => onOpen(project.id)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(project.id); } }}
    >
      <div className="project-img">
        <div className="badge-cat-row">
          {project.cats.map((cat) => (
            <span className="badge-cat" key={cat}>{(project.catLabels && project.catLabels[cat]) || t.filters[cat]}</span>
          ))}
        </div>
        {project.image && !imgError ? (
          <img
            className="project-img-el"
            src={project.image}
            alt={c.title}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="img-placeholder">
            <span className="ph-label">[ captura — {c.title} ]</span>
          </div>
        )}
      </div>
      <div className="project-body">
        <h3 className="project-title">{c.title}</h3>
        <p className="project-desc">{c.desc}</p>
        <div className="project-tech">
          {project.techLabels.map((tech) => <span className="badge-mono" key={tech}>{tech}</span>)}
        </div>
        <div className="project-footer">
          <button className="project-link" onClick={(e) => { e.stopPropagation(); onOpen(project.id); }}>
            {t.projects.details} <ArrowRight size={15} aria-hidden="true" />
          </button>
          {/* "En proceso" lo dicta SOLO el flag wip (no la ausencia de link).
              "Visitar" depende de live; sin live simplemente no hay botón.
              "Ver código" vive dentro del modal de detalle. */}
          {project.wip ? (
            <span className="project-status"><Clock size={13} aria-hidden="true" /> {t.projects.inProgress}</span>
          ) : project.live ? (
            <a
              className="project-link"
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={t.projects.visit + ' — ' + c.title}
            >
              {t.projects.visit} <ExternalLink size={14} aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

/* ---------- Sección de proyectos ---------- */
export function ProjectsSection({ lang, filter, setFilter, techFilter, clearTechFilter, onOpen }) {
  const t = I18N[lang];
  const ref = useReveal();
  const [expanded, setExpanded] = React.useState(false);

  let list = PROJECTS.filter((p) => filter === 'all' || p.cats.includes(filter));
  if (techFilter) list = list.filter((p) => p.tech.includes(techFilter.id));

  // Vista inicial en "Todos": una card de cada categoría principal
  // (web, apps, games, xr) para transmitir la diversidad del trabajo.
  let visible;
  if (!expanded && filter === 'all' && !techFilter) {
    const picks = [];
    FILTER_KEYS.slice(1).forEach((cat) => {
      const p = list.find((x) => x.cats.includes(cat) && !picks.includes(x));
      if (p) picks.push(p);
    });
    list.forEach((p) => { if (picks.length < 4 && !picks.includes(p)) picks.push(p); });
    visible = picks;
  } else {
    visible = expanded ? list : list.slice(0, 4);
  }

  React.useEffect(() => { setExpanded(false); }, [filter, techFilter]);

  return (
    <section className="site-section" id="proyectos" ref={ref}>
      <div className="projects-head">
        <div className="projects-head-text">
          <span className="section-label">{t.projects.label}</span>
          <h2 className="section-title">{t.projects.title}</h2>
          <p className="projects-intro"><Bold text={t.projects.intro} /></p>
        </div>
        <div className="behance-card-slot">
          <a className="behance-card" href={BEHANCE_URL} target="_blank" rel="noopener noreferrer">
            <span className="behance-card-icon"><FaBehance size={26} aria-hidden="true" /></span>
            <span className="behance-card-title">Behance</span>
            <span className="behance-card-sub">
              {t.projects.behance}
              <Palette size={14} className="behance-card-art" aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>
      {techFilter && (
        <div className="tech-filter-pill">
          <span>{t.projects.filteringBy} {techFilter.name}</span>
          <button onClick={clearTechFilter} aria-label="Quitar filtro"><X size={14} aria-hidden="true" /></button>
        </div>
      )}
      <div className="filter-row" role="group" aria-label="Filtros de proyectos">
        {FILTER_KEYS.map((k) => (
          <button key={k} className={'chip' + (filter === k ? ' active' : '')} onClick={() => setFilter(k)}>
            {t.filters[k]}
          </button>
        ))}
      </div>
      {list.length === 0 ? (
        <p style={{ color: 'var(--text-2)', fontFamily: 'var(--font-mono)', fontSize: 14 }}>{t.projects.empty}</p>
      ) : (
        <div className="projects-grid">
          {visible.map((p, i) => (
            <ProjectCard key={p.id + filter + (techFilter ? techFilter.id : '')} project={p} lang={lang} index={i} onOpen={onOpen} />
          ))}
        </div>
      )}
      {list.length > 4 && (
        <div className="see-more-wrap">
          <button className="btn btn-outline" onClick={() => setExpanded(!expanded)}>
            {expanded ? t.projects.seeLess : t.projects.seeMore}
          </button>
        </div>
      )}
    </section>
  );
}

/* Imagen de galería con fallback individual al placeholder.
   Se keyea por src en el render para remontar al cambiar de proyecto
   (así el estado de error no queda obsoleto al navegar entre modales). */
function GalleryImg({ src, alt }) {
  const [err, setErr] = React.useState(false);
  if (err) return <div className="img-placeholder"><span className="ph-label">[ {alt} ]</span></div>;
  return <img className="cs-gallery-img" src={src} alt={alt} loading="lazy" onError={() => setErr(true)} />;
}

/* Imagen principal (hero) del modal con fallback al placeholder.
   Se keyea por proyecto para reiniciar el estado de error al navegar. */
function HeroImg({ src, alt, placeholder }) {
  const [err, setErr] = React.useState(false);
  if (!src || err) return <div className="modal-hero img-placeholder"><span className="ph-label">{placeholder}</span></div>;
  return <img className="modal-hero-img" src={src} alt={alt} onError={() => setErr(true)} />;
}

/* ---------- Modal case study ---------- */
export function CaseStudyModal({ lang, projectId, onClose, onNavigate }) {
  const t = I18N[lang].modal;
  const closeRef = React.useRef(null);
  const project = PROJECTS.find((p) => p.id === projectId);

  React.useEffect(() => {
    if (!project) return;
    document.body.style.overflow = 'hidden';
    if (closeRef.current) closeRef.current.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate(1);
      if (e.key === 'ArrowLeft') onNavigate(-1);
    };
    window.addEventListener('keydown', onKey);
    // hash compartible
    const prevHash = window.location.hash;
    try { history.replaceState(null, '', '#proyecto-' + project.id); } catch (err) {}
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      try { history.replaceState(null, '', prevHash || window.location.pathname); } catch (err) {}
    };
  }, [projectId]);

  if (!project) return null;
  const c = project[lang];
  const catName = project.cats.map((cat) => (project.catLabels && project.catLabels[cat]) || I18N[lang].filters[cat]).join(' · ');

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box" role="dialog" aria-modal="true" aria-label={c.title}>
        <div className="modal-header">
          <button className="modal-nav-btn" onClick={() => onNavigate(-1)} aria-label={t.prev}><ChevronLeft size={20} aria-hidden="true" /></button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 className="modal-title">{c.title}</h3>
            <span className="modal-meta">{catName}{project.year ? ' · ' + project.year : ''}</span>
            {(c.role || c.context) && (
              <span className="modal-sub">
                {c.role && (<span><span className="modal-sub-key">{t.role}:</span> {c.role}</span>)}
                {c.role && c.context && <span className="modal-sub-dot"> · </span>}
                {c.context && <span>{c.context}</span>}
              </span>
            )}
          </div>
          <button className="modal-nav-btn" onClick={() => onNavigate(1)} aria-label={t.next}><ChevronRight size={20} aria-hidden="true" /></button>
          <button className="modal-close" ref={closeRef} onClick={onClose} aria-label={t.close}><X size={20} aria-hidden="true" /></button>
        </div>
        <div className="modal-content">
          <HeroImg
            key={project.id}
            src={project.image}
            alt={c.title}
            placeholder={'[ imagen principal — ' + c.title + ' ]'}
          />
          {c.summary && (
            <div className="cs-block">
              <h4>{t.summary}</h4>
              <p>{c.summary}</p>
            </div>
          )}
          {c.challenge && (
            <div className="cs-block">
              <h4>{t.challenge}</h4>
              <p>{c.challenge}</p>
            </div>
          )}
          {c.solution && (
            <div className="cs-block">
              <h4>{t.solution}</h4>
              <p>{c.solution}</p>
            </div>
          )}
          <div className="cs-block">
            <h4>{t.stack}</h4>
            <div className="project-tech">
              {project.tech.map((id) => <span className="badge-mono" key={id}>{TECH_LABELS[id] || id}</span>)}
            </div>
          </div>
          {project.wip ? (
            <div className="cs-block">
              <div className="cs-soon">{t.comingSoon}</div>
            </div>
          ) : (
            <React.Fragment>
              {project.gallery && project.gallery.length > 0 && (
                <div className="cs-block">
                  <h4>{t.gallery}</h4>
                  <div className="cs-gallery">
                    {project.gallery.map((g, i) => (
                      <GalleryImg key={g} src={g} alt={c.title + ' — ' + (i + 1)} />
                    ))}
                  </div>
                </div>
              )}
              {c.result && (
                <div className="cs-block">
                  <h4>{t.result}</h4>
                  {Array.isArray(c.result)
                    ? (<ul className="cs-result-list">{c.result.map((r, i) => <li key={i}>{r}</li>)}</ul>)
                    : (<p>{c.result}</p>)}
                </div>
              )}
            </React.Fragment>
          )}
          {(project.live || project.github) && (
            <div className="modal-footer-links">
              {project.live && (
                <a className="btn btn-primary" href={project.live} target="_blank" rel="noopener noreferrer">{t.live} <ExternalLink size={15} aria-hidden="true" /></a>
              )}
              {project.github && (
                <a className="btn btn-outline" href={project.github} target="_blank" rel="noopener noreferrer"><FaGithub size={15} aria-hidden="true" /> {t.github}</a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Experiencia ---------- */
export function ExperienceSection({ lang }) {
  const t = I18N[lang].experience;
  const ref = useReveal();
  const tlRef = React.useRef(null);
  const [progress, setProgress] = React.useState(0);
  const [litCount, setLitCount] = React.useState(0);

  React.useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;
    function onScroll() {
      const r = tl.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = r.height;
      const passed = Math.min(Math.max(vh * 0.75 - r.top, 0), total);
      setProgress(passed);
      const items = tl.querySelectorAll('.timeline-item');
      let lit = 0;
      items.forEach((it) => {
        const ir = it.getBoundingClientRect();
        if (ir.top < vh * 0.78) lit++;
      });
      setLitCount(lit);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="site-section" id="experiencia" ref={ref}>
      <span className="section-label">{t.label}</span>
      <h2 className="section-title">{t.title}</h2>
      <div className="timeline" ref={tlRef}>
        <div className="timeline-progress" style={{ height: progress + 'px' }}></div>
        {EXPERIENCE.map((exp, i) => {
          const c = exp[lang];
          return (
            <div className={'timeline-item' + (i < litCount ? ' lit' : '')} key={i}>
              <span className="timeline-dot"></span>
              <span className="timeline-date">{lang === 'es' ? exp.date : exp.dateEn}</span>
              <div className="timeline-card">
                <h3 className="timeline-role">{c.role}</h3>
                <p className="timeline-org">{c.org}</p>
                <p>{c.desc}</p>
                {exp.tech.length > 0 && (
                  <div className="project-tech">
                    {exp.tech.map((tech) => <span className="badge-mono" key={tech}>{tech}</span>)}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ---------- Proceso ---------- */
export function ProcessSection({ lang }) {
  const t = I18N[lang].process;
  const ref = useReveal();
  return (
    <section className="site-section" id="proceso" ref={ref}>
      <span className="section-label">{t.label}</span>
      <h2 className="section-title">{t.title}</h2>
      <div className="process-row">
        {t.steps.map((step, i) => (
          <div className="process-step" key={i}>
            <div className="process-num">0{i + 1}</div>
            <div className="process-body">
              <h3 className="process-title">{step.title}</h3>
              <p className="process-desc">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
