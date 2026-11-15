import React, { useState } from 'react';
import { AlertCircle, ArrowUpRight, Check, CheckCircle2, Copy, Github, Linkedin, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react';
import { PROFILE } from '../constants.ts';
import { Reveal, useSpotlight } from './ui.tsx';

type Fields = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

// Limits match api/contact.php, which validates again on the server.
const LIMITS = { name: 100, email: 254, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = 'Please enter your name.';
  if (!EMAIL_RE.test(f.email.trim())) e.email = 'Please enter a valid email address.';
  if (f.message.trim().length < 10) e.message = 'A little more detail, please (10+ characters).';
  return e;
}

const Contact: React.FC = () => {
  const [form, setForm] = useState<Fields>({ name: '', email: '', message: '' });
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const spot = useSpotlight<HTMLDivElement>();

  const errors = validate(form);
  const showError = (k: keyof Fields) => (touched[k] ? errors[k] : undefined);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value.slice(0, LIMITS[name as keyof Fields]) }));
    if (status === 'error') setStatus('idle');
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setTouched((t) => ({ ...t, [e.target.name]: true }));

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = 'mailto:' + PROFILE.email;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(errors).length) {
      const first = (['name', 'email', 'message'] as const).find((k) => errors[k]);
      if (first) document.getElementById('contact-' + first)?.focus();
      return;
    }
    // Bots fill the hidden field; skip sending but don't tell them.
    if (honeypot) {
      setStatus('success');
      return;
    }

    setStatus('loading');
    setErrorMessage('');
    try {
      const response = await fetch('/api/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name.trim(), email: form.email.trim(), message: form.message.trim() }),
      });
      const isJson = response.headers.get('content-type')?.includes('application/json');
      const data = isJson ? await response.json() : {};
      if (response.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
        setTouched({});
        setTimeout(() => setStatus('idle'), 6000);
      } else {
        setStatus('error');
        setErrorMessage(data.detail || 'The message could not be sent.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Could not reach the server. Please try again, or email me directly.');
    }
  };

  const mailtoFallback = `mailto:${PROFILE.email}?subject=${encodeURIComponent('Inquiry from maheshbunage.com')}&body=${encodeURIComponent(
    `${form.message}\n\nFrom: ${form.name} (${form.email})`,
  )}`;

  const fieldProps = (k: keyof Fields) => ({
    id: 'contact-' + k,
    name: k,
    value: form[k],
    onChange,
    onBlur,
    'aria-invalid': showError(k) ? true : undefined,
    'aria-describedby': showError(k) ? `contact-${k}-error` : undefined,
    className: 'field',
  });

  const links = [
    { icon: Linkedin, label: 'LinkedIn', value: 'in/maheshbunage', href: PROFILE.linkedin },
    { icon: Github, label: 'GitHub', value: 'Mahesh8806', href: PROFILE.github },
    { icon: Phone, label: 'Phone', value: PROFILE.phone, href: 'tel:' + PROFILE.phone.replace(/\s/g, '') },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative py-24 md:py-32 border-t border-line overflow-hidden">
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[60%] bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,var(--glow),transparent_70%)] pointer-events-none" />
      <div className="container-x relative">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16">
          <div>
            <Reveal>
              <p className="eyebrow mb-5">Contact</p>
              <h2 id="contact-title" className="display text-[2.4rem] sm:text-6xl text-fg">
                Let's build something <span className="serif-accent text-muted">that runs on real data.</span>
              </h2>
              <p className="mt-6 text-base sm:text-lg text-muted leading-relaxed max-w-md">
                I'm open to data engineering and AI engineering roles in Ireland. Recruiters, hiring managers and
                collaborators are all welcome.
              </p>
            </Reveal>

            <Reveal delay={0.08} className="mt-10">
              <div className="card p-2 flex flex-col sm:flex-row sm:items-center gap-2">
                <a href={'mailto:' + PROFILE.email} className="flex items-center gap-3 px-3 py-2.5 min-w-0 flex-1 rounded-xl hover:bg-surface-2 transition-colors">
                  <span className="grid place-items-center w-10 h-10 rounded-xl bg-accent-soft text-accent shrink-0">
                    <Mail className="w-[18px] h-[18px]" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-mono uppercase tracking-[0.14em] text-subtle">Email</span>
                    <span className="block text-[15px] text-fg truncate">{PROFILE.email}</span>
                  </span>
                </a>
                <button onClick={copyEmail} className="btn btn-ghost !h-10 text-[13px] shrink-0" aria-live="polite">
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>

              <ul className="mt-3 grid sm:grid-cols-3 gap-3">
                {links.map(({ icon: Icon, label, value, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="card group flex flex-col gap-3 p-4 h-full hover:border-line-strong"
                    >
                      <span className="flex items-center justify-between text-muted group-hover:text-fg transition-colors">
                        <Icon className="w-4 h-4" />
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </span>
                      <span>
                        <span className="block text-[11px] font-mono uppercase tracking-[0.14em] text-subtle">{label}</span>
                        <span className="block text-[13.5px] text-fg-2 mt-0.5 break-all">{value}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <p className="mt-6 flex items-center gap-2 text-[13px] text-muted">
                <MapPin className="w-3.5 h-3.5" /> {PROFILE.location} · {PROFILE.workAuth}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div onPointerMove={spot} className="card card-solid spotlight p-6 sm:p-8">
              {status === 'success' ? (
                <div className="py-16 text-center" role="status">
                  <span className="mx-auto grid place-items-center w-14 h-14 rounded-full bg-accent-soft text-accent">
                    <CheckCircle2 className="w-7 h-7" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-fg">Message sent</h3>
                  <p className="mt-2 text-muted">Thanks for reaching out. I'll get back to you soon.</p>
                  <button onClick={() => setStatus('idle')} className="btn btn-ghost mt-8">
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-fg">Send a message</h3>
                    <p className="text-[13px] text-muted mt-1">Goes straight to my inbox.</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-[13px] text-fg-2 mb-1.5">
                        Name
                      </label>
                      <input type="text" autoComplete="name" placeholder="Your name" {...fieldProps('name')} />
                      {showError('name') && (
                        <p id="contact-name-error" className="mt-1.5 text-[12px] text-rose-400">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-[13px] text-fg-2 mb-1.5">
                        Email
                      </label>
                      <input type="email" autoComplete="email" inputMode="email" placeholder="you@company.com" {...fieldProps('email')} />
                      {showError('email') && (
                        <p id="contact-email-error" className="mt-1.5 text-[12px] text-rose-400">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-baseline justify-between mb-1.5">
                      <label htmlFor="contact-message" className="block text-[13px] text-fg-2">
                        Message
                      </label>
                      <span className="font-mono text-[11px] text-subtle">
                        {form.message.length}/{LIMITS.message}
                      </span>
                    </div>
                    <textarea rows={6} placeholder="A role, a project, or a question…" {...fieldProps('message')} className="field resize-none" />
                    {showError('message') && (
                      <p id="contact-message-error" className="mt-1.5 text-[12px] text-rose-400">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Honeypot: hidden from people and screen readers. */}
                  <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
                    <label>
                      Company
                      <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                    </label>
                  </div>

                  <button type="submit" disabled={status === 'loading'} className="btn btn-primary w-full !h-12 disabled:opacity-70">
                    {status === 'loading' ? (
                      <>
                        Sending <Loader2 className="w-4 h-4 animate-spin" />
                      </>
                    ) : (
                      <>
                        Send message <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {status === 'error' && (
                    <div role="alert" className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/25 text-[13px]">
                      <p className="flex items-center gap-2 font-medium text-rose-400">
                        <AlertCircle className="w-4 h-4 shrink-0" /> Message not sent
                      </p>
                      <p className="mt-1 text-muted">{errorMessage}</p>
                      <a href={mailtoFallback} className="mt-2 inline-flex items-center gap-1 font-medium text-fg hover:underline">
                        Send it from your email app instead <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
