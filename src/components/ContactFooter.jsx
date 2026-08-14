/* ============================================================
   Contacto + Footer
   v1.0.0: firma "Alex D.E.V.", copyright actualizado, versión 1.0.0.
   Formulario conectado a Web3Forms (PUBLIC_WEB3FORMS_KEY en .env).
   ============================================================ */

import React from 'react';
import { I18N } from '../data/i18n.js';
import { useReveal, NAV_IDS } from './Ui.jsx';
import { Mail, Download, Check } from 'lucide-react';
import { FaGithub, FaLinkedin, FaBehance } from 'react-icons/fa6';
// Fuente única de la versión: package.json. Antes vivía duplicada en i18n.js
// (ES decía v1.0.0 y EN v1.1.0) y se desincronizaba sola.
import pkg from '../../package.json';

export const CONTACT_EMAIL = 'alexenriquezvera@gmail.com';
export const GITHUB_URL = 'https://github.com/AlexD-E-V';
export const BEHANCE_URL = 'https://www.behance.net/alexenriquez';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/alex-d-e-v';

/* CV por idioma. Coloca los PDFs en public/cv/ con estos nombres
   exactos (al publicar el sitio se sirven desde la raíz). El botón
   descarga el que corresponde al idioma activo de la página. */
export const CV_URLS = {
  es: '/cv/CV-Alex-DEV-ES.pdf',
  en: '/cv/CV-Alex-DEV-EN.pdf',
};

export function ContactSection({ lang }) {
  const t = I18N[lang].contact;
  const f = t.form;
  const ref = useReveal();
  const [fields, setFields] = React.useState({ name: '', email: '', type: '', budget: '', message: '' });
  const [errors, setErrors] = React.useState({});
  const [sent, setSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [sendError, setSendError] = React.useState('');
  const [copied, setCopied] = React.useState(false);
  const botRef = React.useRef(null);

  const WEB3FORMS_KEY = import.meta.env.PUBLIC_WEB3FORMS_KEY;

  const set = (k) => (e) => setFields({ ...fields, [k]: e.target.value });

  function validate() {
    const errs = {};
    if (!fields.name.trim()) errs.name = f.errRequired;
    if (!fields.email.trim()) errs.email = f.errRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errs.email = f.errEmail;
    if (!fields.message.trim()) errs.message = f.errRequired;
    else if (fields.message.trim().length < 20) errs.message = f.errMessage;
    setErrors(errs);
    return errs;
  }

  async function onSubmit(e) {
    e.preventDefault();
    // Al fallar, lleva el foco al primer campo con error: sin esto el usuario
    // de teclado se queda en el botón de enviar sin saber qué pasó.
    const errs = validate();
    const firstError = Object.keys(errs)[0];
    if (firstError) {
      const el = document.getElementById('fld-' + firstError);
      if (el) el.focus();
      return;
    }
    // Honeypot: si está relleno, lo trata como spam (silencioso).
    if (botRef.current && botRef.current.checked) { setSent(true); return; }
    setSendError('');
    setSending(true);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Nuevo mensaje del portafolio — ${fields.name}`,
          from_name: 'Portafolio Alex D.E.V.',
          name: fields.name,
          email: fields.email,
          [f.type]: fields.type || '—',
          [f.budget]: fields.budget || '—',
          message: fields.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSent(true);
      } else {
        setSendError(f.errSend);
      }
    } catch {
      setSendError(f.errSend);
    } finally {
      setSending(false);
    }
  }

  function copyEmail(e) {
    e.preventDefault();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(CONTACT_EMAIL).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      });
    }
  }

  /* El input llega ya construido desde el JSX de abajo; se le inyectan aquí
     los atributos ARIA para no repetirlos en cada campo. aria-describedby
     enlaza el mensaje de error con su input: sin él, un lector de pantalla
     anuncia el campo pero nunca el motivo del fallo. */
  const field = (key, label, input) => {
    const hasError = !!errors[key];
    const errId = 'err-' + key;
    return (
      <div className={'form-field' + (hasError ? ' has-error' : '')}>
        <label htmlFor={'fld-' + key}>{label}</label>
        {React.cloneElement(input, {
          'aria-invalid': hasError || undefined,
          'aria-describedby': hasError ? errId : undefined
        })}
        {hasError && <span className="field-error" id={errId}>{errors[key]}</span>}
      </div>
    );
  };

  return (
    <section className="site-section" id="contacto" ref={ref}>
      <div className="contact-grid">
        <div className="contact-info">
          <span className="section-label">{t.label}</span>
          <h2 className="section-title">{t.title}</h2>
          <p>{t.desc}</p>
          <div className="contact-meta">
            <span>{t.meta1}</span>
            <span>{t.meta2}</span>
          </div>
          <div className="contact-methods">
            <a className="contact-method" href="#" onClick={copyEmail}>
              <span className="m-icon"><Mail size={16} aria-hidden="true" /></span>{copied ? t.emailCopied : t.email}
            </a>
            <a className="contact-method" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              <span className="m-icon"><FaGithub size={16} aria-hidden="true" /></span>GitHub
            </a>
            <a className="contact-method" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
              <span className="m-icon"><FaLinkedin size={16} aria-hidden="true" /></span>LinkedIn
            </a>
            <a className="contact-method" href={CV_URLS[lang]} download>
              <span className="m-icon"><Download size={16} aria-hidden="true" /></span>{t.cv}
            </a>
          </div>
        </div>

        <form className="contact-form" onSubmit={onSubmit} noValidate aria-live="polite">
          {sent ? (
            <div className="form-success">
              <div className="ok-ring"><Check size={28} aria-hidden="true" /></div>
              <h3 style={{ fontSize: 20, fontWeight: 600 }}>{f.successTitle}</h3>
              <p style={{ color: 'var(--text-1)', fontSize: 15 }}>{f.successDesc}</p>
              <button type="button" className="btn btn-ghost" onClick={() => { setSent(false); setSendError(''); setFields({ name: '', email: '', type: '', budget: '', message: '' }); }}>
                {f.sendAnother}
              </button>
            </div>
          ) : (
            <React.Fragment>
              <div className="form-row">
                {field('name', <span>{f.name} <span className="req">*</span></span>,
                  <input id="fld-name" type="text" value={fields.name} onChange={set('name')} placeholder={f.namePh} />)}
                {field('email', <span>{f.email} <span className="req">*</span></span>,
                  <input id="fld-email" type="email" value={fields.email} onChange={set('email')} placeholder={f.emailPh} />)}
              </div>
              <div className="form-row">
                {field('type', f.type,
                  <select id="fld-type" value={fields.type} onChange={set('type')}>
                    <option value="">—</option>
                    {f.types.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>)}
                {field('budget', <span>{f.budget} <span style={{ color: 'var(--text-2)' }}>{f.optional}</span></span>,
                  <select id="fld-budget" value={fields.budget} onChange={set('budget')}>
                    <option value="">—</option>
                    {f.budgets.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>)}
              </div>
              {field('message', <span>{f.message} <span className="req">*</span></span>,
                <textarea id="fld-message" rows={5} value={fields.message} onChange={set('message')} placeholder={f.messagePh}></textarea>)}
              {/* Honeypot anti-spam: oculto a usuarios, visible para bots */}
              <input
                ref={botRef}
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
              />
              {sendError && <p className="field-error" role="alert" style={{ marginBottom: 12 }}>{sendError}</p>}
              <div>
                <button type="submit" className="btn btn-primary" disabled={sending}>
                  {sending ? f.sending : f.send}
                </button>
              </div>
            </React.Fragment>
          )}
        </form>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
export function Footer({ lang }) {
  const t = I18N[lang];
  const goTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
  };
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          {/* Va el iso y no el lockup: el lockup nuevo es apilado y a 48px de
              alto "lex" y "EV" se vuelven ilegibles. Para recuperar el nombre
              aquí hace falta exportar una versión horizontal desde Illustrator. */}
          <img className="footer-logo" src="/brand/oficial-02/iso.svg" alt="Alex D.E.V." width="46" height="48" />
          <p className="footer-sub">{t.footer.tagline}</p>
          <p className="footer-copy">{t.footer.copyright.replace('{year}', new Date().getFullYear())}</p>
        </div>
        <div className="footer-col">
          <h3>{t.footer.quickLinks}</h3>
          <nav>
            {NAV_IDS.slice(1).map((id) => (
              <button key={id} onClick={() => goTo(id)}>{t.nav[id]}</button>
            ))}
          </nav>
        </div>
        <div className="footer-col">
          <h3>{t.footer.social}</h3>
          <div className="footer-social">
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub size={17} aria-hidden="true" /></a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin size={17} aria-hidden="true" /></a>
            <a href={BEHANCE_URL} target="_blank" rel="noopener noreferrer" aria-label="Behance"><FaBehance size={17} aria-hidden="true" /></a>
            <a href={'mailto:' + CONTACT_EMAIL} aria-label="Email"><Mail size={17} aria-hidden="true" /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        {t.footer.builtWith} · v{pkg.version}
      </div>
    </footer>
  );
}
