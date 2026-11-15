import React, { useEffect, useState } from 'react';
import { Menu, X, Moon, Sun, ArrowUpRight, Search, FileText } from 'lucide-react';
import { NAV_LINKS, PROFILE } from '../constants.ts';
import { SCROLL_OFFSET, scrollToSection, goTo, toggleTheme, useIsDark } from './ui.tsx';

const Navbar: React.FC<{ onOpenPalette: () => void }> = ({ onOpenPalette }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [active, setActive] = useState('');
  const isDark = useIsDark();
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
  }, []);

  // Shadow once scrolled, and highlight the section currently on screen.
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href);
    let frame = 0;
    const update = () => {
      frame = 0;
      setIsScrolled(window.scrollY > 12);
      let current = '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= SCROLL_OFFSET + 80) current = id;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = ids[ids.length - 1];
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  // Deep links (#projects): sections load lazily, so wait for the target to exist.
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;
    let frame = 0;
    const started = performance.now();
    const tryScroll = () => {
      if (!scrollToSection(hash, 'auto') && performance.now() - started < 3000) {
        frame = requestAnimationFrame(tryScroll);
      }
    };
    tryScroll();
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleNav = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    goTo(id);
  };

  const handleLogo = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.pushState(null, '', window.location.pathname);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-3 sm:px-4 pt-3 pointer-events-none">
      <nav
        aria-label="Main"
        className={`pointer-events-auto mx-auto max-w-[1200px] flex items-center justify-between gap-2 rounded-2xl pl-3 pr-2 py-2 transition-all duration-300 ${
          isScrolled || isOpen
            ? 'bg-elev/80 backdrop-blur-xl border border-line shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5)]'
            : 'border border-transparent'
        }`}
      >
        <a href="/" onClick={handleLogo} className="flex items-center gap-2.5 pr-2 rounded-lg" aria-label="Mahesh Bunage, back to top">
          <span className="grid place-items-center w-8 h-8 rounded-[10px] bg-fg text-bg font-mono text-[11px] font-medium tracking-tight">
            MB
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[14px] font-semibold tracking-tight text-fg">Mahesh Bunage</span>
            <span className="text-[11px] text-muted mt-1">Data & AI Engineer</span>
          </span>
        </a>

        <ul className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.href;
            return (
              <li key={link.href}>
                <a
                  href={'#' + link.href}
                  onClick={(e) => handleNav(e, link.href)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`relative block px-3 py-2 rounded-lg text-[13.5px] transition-colors ${
                    isActive ? 'text-fg' : 'text-muted hover:text-fg'
                  }`}
                >
                  {link.name}
                  <span
                    aria-hidden
                    className={`absolute left-3 right-3 -bottom-px h-px bg-accent transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1">
          <button
            onClick={onOpenPalette}
            className="hidden md:inline-flex items-center gap-2 h-9 pl-3 pr-2 rounded-xl border border-line text-muted hover:text-fg hover:border-line-strong text-[13px] transition-colors"
            aria-label="Open command menu"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search</span>
            <span className="kbd">{isMac ? '⌘' : 'Ctrl'} K</span>
          </button>
          <button
            onClick={onOpenPalette}
            className="md:hidden grid place-items-center w-9 h-9 rounded-xl text-muted hover:text-fg"
            aria-label="Open command menu"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            onClick={toggleTheme}
            className="grid place-items-center w-9 h-9 rounded-xl text-muted hover:text-fg hover:bg-surface-2 transition-colors"
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <a
            href="#contact"
            onClick={(e) => handleNav(e, 'contact')}
            className="hidden sm:inline-flex items-center gap-1 h-9 px-3.5 ml-1 rounded-xl bg-fg text-bg text-[13px] font-medium hover:opacity-90 transition-opacity"
          >
            Let's talk
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={() => setIsOpen((v) => !v)}
            className="lg:hidden grid place-items-center w-9 h-9 rounded-xl text-fg hover:bg-surface-2"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden pointer-events-auto mx-auto mt-2 max-w-[1200px] rounded-2xl bg-elev/95 backdrop-blur-xl border border-line p-2 shadow-2xl"
        >
          <ul className="grid gap-0.5 sm:grid-cols-2">
            {NAV_LINKS.map((link, i) => (
              <li key={link.href}>
                <a
                  href={'#' + link.href}
                  onClick={(e) => handleNav(e, link.href)}
                  aria-current={active === link.href ? 'location' : undefined}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-[15px] transition-colors ${
                    active === link.href ? 'bg-surface-2 text-fg' : 'text-fg-2 hover:bg-surface'
                  }`}
                >
                  {link.name}
                  <span className="font-mono text-[11px] text-subtle">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-2 pt-2 border-t border-line grid grid-cols-2 gap-2">
            <a href={PROFILE.resume} target="_blank" rel="noopener noreferrer" className="btn btn-ghost h-11 text-sm">
              <FileText className="w-4 h-4" /> Resume
            </a>
            <a href="#contact" onClick={(e) => handleNav(e, 'contact')} className="btn btn-primary h-11 text-sm">
              Let's talk <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
