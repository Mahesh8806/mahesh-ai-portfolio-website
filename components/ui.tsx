import React, { useCallback, useEffect, useState } from 'react';
import { m } from 'framer-motion';
import {
  Boxes, BrainCircuit, Cloud, Code2, Cpu, Database, Layers, ShieldCheck, Sparkles, Terminal, Workflow,
  type LucideIcon,
} from 'lucide-react';

export const ICONS: Record<string, LucideIcon> = {
  Boxes, BrainCircuit, Cloud, Code2, Cpu, Database, Layers, ShieldCheck, Sparkles, Terminal, Workflow,
};

export const SCROLL_OFFSET = 84;

/** Smooth-scroll to a section and keep a hash URL (a bare path would 404 on the static host). */
export function scrollToSection(id: string, behavior: ScrollBehavior = 'smooth') {
  const el = document.getElementById(id);
  if (!el) return false;
  const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
  window.scrollTo({ top, behavior });
  return true;
}

export function goTo(id: string) {
  if (scrollToSection(id)) window.history.pushState(null, '', '#' + id);
}

/** onClick handler for in-page anchor links. */
export const anchorClick = (id: string) => (e: React.MouseEvent) => {
  e.preventDefault();
  goTo(id);
};

/** Ask the Projects section to open a project's detail view. */
export function openProject(slug: string) {
  goTo('projects');
  window.dispatchEvent(new CustomEvent('open-project', { detail: slug }));
}

/** Writes the pointer position into --mx/--my so .spotlight cards can follow the cursor. */
export function useSpotlight<T extends HTMLElement>() {
  return useCallback((e: React.PointerEvent<T>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  }, []);
}

export function toggleTheme() {
  const dark = !document.documentElement.classList.contains('dark');
  document.documentElement.classList.toggle('dark', dark);
  try {
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  } catch {
    /* storage can be unavailable (private mode); the toggle still works for this visit */
  }
}

export function useIsDark() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));
  useEffect(() => {
    const mo = new MutationObserver(() => setDark(document.documentElement.classList.contains('dark')));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => mo.disconnect();
  }, []);
  return dark;
}

export const EASE = [0.22, 1, 0.36, 1] as const;

export const Reveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'li' | 'article';
}> = ({ children, delay = 0, y = 18, className, as = 'div' }) => {
  const Comp = m[as];
  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      className={className}
    >
      {children}
    </Comp>
  );
};

export const SectionHeader: React.FC<{
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: 'left' | 'center';
  id?: string;
}> = ({ eyebrow, title, intro, align = 'left', id }) => (
  <Reveal className={`mb-12 md:mb-16 max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
    <p className="eyebrow mb-5">{eyebrow}</p>
    <h2 id={id} className="display text-[2.1rem] sm:text-5xl md:text-[3.4rem] text-fg">
      {title}
    </h2>
    {intro && (
      <p className={`mt-5 text-base sm:text-lg text-muted leading-relaxed max-w-2xl ${align === 'center' ? 'mx-auto' : ''}`}>{intro}</p>
    )}
  </Reveal>
);
