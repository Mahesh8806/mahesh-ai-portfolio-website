import React, { Suspense, lazy, useEffect, useState } from 'react';
import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import CommandPalette from './components/CommandPalette.tsx';

// Everything below the hero loads in a separate chunk, so the first screen
// renders without waiting for the rest of the page's code.
const About = lazy(() => import('./components/About.tsx'));
const Experience = lazy(() => import('./components/Experience.tsx'));
const Projects = lazy(() => import('./components/Projects.tsx'));
const PipelineExplorer = lazy(() => import('./components/PipelineExplorer.tsx'));
const Stack = lazy(() => import('./components/Stack.tsx'));
const Contact = lazy(() => import('./components/Contact.tsx'));
const Footer = lazy(() => import('./components/Footer.tsx'));

function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  // ⌘K / Ctrl+K anywhere, or "/" when not typing, opens the command menu.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = e.target instanceof HTMLElement && (e.target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName));
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      } else if (e.key === '/' && !typing && !paletteOpen) {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [paletteOpen]);

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-fg focus:text-bg"
        >
          Skip to content
        </a>
        <div className="atmosphere" aria-hidden />
        <Navbar onOpenPalette={() => setPaletteOpen(true)} />
        <main id="main">
          <Hero />
          <Suspense fallback={<div className="min-h-screen" />}>
            <About />
            <Experience />
            <Projects />
            <PipelineExplorer />
            <Stack />
            <Contact />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
        <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      </MotionConfig>
    </LazyMotion>
  );
}

export default App;
