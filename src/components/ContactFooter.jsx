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

export const CONTACT_EMAIL = 'alexenriquezvera@gmail.com';
export const GITHUB_URL = 'https://github.com/AlexD-E-V';
export const BEHANCE_URL = 'https://www.behance.net/alexenriquez';

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
    return Object.keys(errs).length === 0;
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
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

  const field = (key, label, input) => (
    <div className={'form-field' + (errors[key] ? ' has-error' : '')}>
      <label htmlFor={'fld-' + key}>{label}</label>
      {input}
      {errors[key] && <span className="field-error">{errors[key]}</span>}
    </div>
  );

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
            <a className="contact-method" href="#" onClick={(e) => e.preventDefault()}>
              <span className="m-icon"><FaLinkedin size={16} aria-hidden="true" /></span>LinkedIn
            </a>
            <a className="contact-method" href="#" onClick={(e) => e.preventDefault()}>
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
          <p className="footer-name">Alex D.E.V.</p>
          <p className="footer-sub">{t.footer.tagline}</p>
          <p className="footer-copy">{t.footer.copyright}</p>
        </div>
        <div className="footer-col">
          <h5>{t.footer.quickLinks}</h5>
          <nav>
            {NAV_IDS.slice(1).map((id) => (
              <button key={id} onClick={() => goTo(id)}>{t.nav[id]}</button>
            ))}
          </nav>
        </div>
        <div className="footer-col">
          <h5>{t.footer.social}</h5>
          <div className="footer-social">
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub size={17} aria-hidden="true" /></a>
            <a href="#" onClick={(e) => e.preventDefault()} aria-label="LinkedIn"><FaLinkedin size={17} aria-hidden="true" /></a>
            <a href={BEHANCE_URL} target="_blank" rel="noopener noreferrer" aria-label="Behance"><FaBehance size={17} aria-hidden="true" /></a>
            <a href={'mailto:' + CONTACT_EMAIL} aria-label="Email"><Mail size={17} aria-hidden="true" /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        {t.footer.builtWith} · {t.footer.version}
      </div>
    </footer>
  );
}
