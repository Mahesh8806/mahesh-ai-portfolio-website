import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, ArrowRight, FileText } from 'lucide-react';
import { NAV_LINKS } from '../constants.ts';

const SCROLL_OFFSET = 88; // Floating navbar height + breathing room

const scrollToSection = (id: string, behavior: ScrollBehavior = 'smooth') => {
  const element = document.getElementById(id);
  if (!element) return false;
  const top = element.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
  window.scrollTo({ top, behavior });
  return true;
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [active, setActive] = useState<string>('');
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'light') return false;
    if (stored === 'dark') return true;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Track scroll position for the shadow, and which section is on screen
  // so its link gets the highlighted pill.
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      let current = '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= SCROLL_OFFSET + 40) current = id;
      }
      // At the very bottom, the last section wins even if it is short.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = ids[ids.length - 1];
      }
      setActive(current);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  // Close the mobile menu with Escape.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    if (scrollToSection(targetId)) {
      setIsOpen(false);
      // Always push a hash fragment, never a bare path — a bare path rewrites the
      // address bar to a real URL (e.g. "/projects") that 404s on refresh since no
      // such route exists on the static host.
      window.history.pushState(null, '', '#' + targetId);
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.pushState(null, '', window.location.pathname);
  };

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;
    // Sections below the hero load lazily, so wait for the target to exist.
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

  const themeButton = (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
      aria-label="Toggle Theme"
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );

  return (
    <header className="fixed top-3 inset-x-0 z-50 px-3 sm:px-4 pointer-events-none">
      <nav
        aria-label="Main"
        className={`pointer-events-auto mx-auto w-full max-w-6xl xl:w-fit flex items-center justify-between gap-2 rounded-full bg-slate-950/90 backdrop-blur-xl ring-1 ring-white/10 pl-4 pr-1.5 py-1.5 transition-shadow duration-300 ${
          isScrolled ? 'shadow-xl shadow-slate-950/30' : 'shadow-lg shadow-slate-950/10'
        }`}
      >
        <a
          href="#"
          onClick={handleLogoClick}
          className="flex items-center gap-2 pr-3 text-[15px] font-bold tracking-tight text-white whitespace-nowrap"
        >
          <span className="relative flex w-2.5 h-2.5">
            <span className="absolute inset-0 rounded-full bg-cyan-400 opacity-60 motion-safe:animate-ping"></span>
            <span className="relative w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
          </span>
          Mahesh Bunage
        </a>

        {/* Desktop links */}
        <ul className="hidden xl:flex items-center gap-0.5">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.href;
            return (
              <li key={link.name}>
                <a
                  href={'#' + link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`block px-3.5 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {link.name}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right side actions */}
        <div className="flex items-center gap-1 pl-2">
          <a
            href="/Mahesh-Bunage-Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:block px-3 py-2 text-sm font-semibold text-white hover:text-cyan-300 transition-colors"
          >
            Resume
          </a>
          {themeButton}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="hidden sm:inline-flex items-center gap-1.5 ml-1 px-4 py-2 rounded-full bg-cyan-400 text-slate-950 text-sm font-semibold hover:bg-cyan-300 transition-colors"
          >
            Let's talk
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="xl:hidden p-2 rounded-full text-white hover:bg-white/10 transition-colors"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile / tablet menu */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="xl:hidden pointer-events-auto mx-auto mt-2 max-w-6xl rounded-3xl bg-slate-950/95 backdrop-blur-xl ring-1 ring-white/10 shadow-xl shadow-slate-950/30 p-2"
        >
          <ul className="grid gap-0.5 sm:grid-cols-2">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href;
              return (
                <li key={link.name}>
                  <a
                    href={'#' + link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    aria-current={isActive ? 'location' : undefined}
                    className={`block px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${
                      isActive ? 'bg-white/10 text-white' : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="mt-2 pt-2 border-t border-white/10 grid grid-cols-2 gap-2 sm:hidden">
            <a
              href="/Mahesh-Bunage-Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-full ring-1 ring-white/15 text-sm font-semibold text-white"
            >
              <FileText className="w-4 h-4" />
              Resume
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-full bg-cyan-400 text-slate-950 text-sm font-semibold"
            >
              Let's talk
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
