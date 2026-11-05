import React, { Suspense, lazy } from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';

// Everything below the hero loads in a separate chunk, so the first screen
// renders without waiting for the rest of the page's code.
const About = lazy(() => import('./components/About.tsx'));
const Skills = lazy(() => import('./components/Skills.tsx'));
const Experience = lazy(() => import('./components/Experience.tsx'));
const Approach = lazy(() => import('./components/Approach.tsx'));
const Projects = lazy(() => import('./components/Projects.tsx'));
const Education = lazy(() => import('./components/Education.tsx'));
const Contact = lazy(() => import('./components/Contact.tsx'));
const Footer = lazy(() => import('./components/Footer.tsx'));

function App() {
  return (
    <div className="antialiased bg-white dark:bg-transparent text-slate-900 dark:text-white min-h-screen relative">
      <div className="hidden dark:block fixed inset-0 -z-10 cosmic-bg"></div>
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<div className="min-h-screen" />}>
          <About />
          <Skills />
          <Experience />
          <Approach />
          <Projects />
          <Education />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
