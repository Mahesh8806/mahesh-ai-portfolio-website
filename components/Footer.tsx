import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { NAV_LINKS, PROFILE } from '../constants.ts';
import { anchorClick } from './ui.tsx';

const Footer: React.FC = () => (
  <footer className="border-t border-line">
    <div className="container-x py-12">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
        <div>
          <p className="text-[15px] font-semibold tracking-tight text-fg">{PROFILE.name}</p>
          <p className="mt-1 text-[13px] text-muted">Data & AI Engineer · {PROFILE.location}</p>
          <div className="mt-5 flex items-center gap-2">
            {[
              { icon: Github, href: PROFILE.github, label: 'GitHub' },
              { icon: Linkedin, href: PROFILE.linkedin, label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:' + PROFILE.email, label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="grid place-items-center w-9 h-9 rounded-xl border border-line text-muted hover:text-fg hover:border-line-strong transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-10 gap-y-2.5 text-[13.5px]">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={'#' + l.href} onClick={anchorClick(l.href)} className="text-muted hover:text-fg transition-colors">
                  {l.name}
                </a>
              </li>
            ))}
            <li>
              <a href={PROFILE.resume} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-fg transition-colors">
                Resume
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="mt-12 pt-6 border-t border-line flex items-center justify-between gap-4 text-[12px] text-subtle">
        <p>© {new Date().getFullYear()} {PROFILE.name}</p>
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            window.history.pushState(null, '', window.location.pathname);
          }}
          className="inline-flex items-center gap-1.5 hover:text-fg transition-colors"
        >
          Back to top <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  </footer>
);

export default Footer;
