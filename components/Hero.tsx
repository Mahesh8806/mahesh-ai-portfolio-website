import React from 'react';
import { m } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import DataFlowBackground from './DataFlowBackground.tsx';
import { HERO_STATS, PROFILE } from '../constants.ts';
import { anchorClick, EASE } from './ui.tsx';

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: EASE, delay },
});

const Portrait: React.FC = () => (
  <m.div
    initial={{ opacity: 0, y: 30, scale: 0.97 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 1.1, ease: EASE, delay: 0.35 }}
    className="relative mx-auto w-full max-w-[340px] lg:max-w-[380px]"
  >
    <div className="orbit-border rounded-[28px] p-2 bg-surface border border-line">
      <div className="relative overflow-hidden rounded-[22px] aspect-[4/5] bg-surface-2">
        <picture>
          <source srcSet="/my-photo.webp" type="image/webp" />
          <img
            src="/my-photo.jpg"
            alt="Portrait of Mahesh Bunage"
            width={628}
            height={848}
            fetchPriority="high"
            className="w-full h-full object-cover object-top"
          />
        </picture>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <div className="absolute left-4 right-4 bottom-4 flex items-end justify-between gap-3 text-white">
          <div>
            <p className="text-[15px] font-semibold tracking-tight">{PROFILE.name}</p>
            <p className="text-[12px] text-white/70 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3" /> {PROFILE.location}
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 px-2.5 py-1 text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
            Open to work
          </span>
        </div>
      </div>
    </div>

    {/* Floating facts: each one is from the resume. */}
    <m.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: EASE, delay: 0.9 }}
      className="absolute -left-4 sm:-left-10 top-[18%] hidden sm:block"
    >
      <div className="card card-solid !rounded-2xl px-3.5 py-2.5">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle">Experian · 2.5 yrs</p>
        <p className="text-[13px] font-medium text-fg mt-0.5">~109 production pipelines</p>
      </div>
    </m.div>
    <m.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: EASE, delay: 1.05 }}
      className="absolute -right-3 sm:-right-8 top-[52%] hidden sm:block"
    >
      <div className="card card-solid !rounded-2xl px-3.5 py-2.5">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle">MSc AI · NCI</p>
        <p className="text-[13px] font-medium text-fg mt-0.5">LLM jailbreaks 77% → &lt;1%</p>
      </div>
    </m.div>
  </m.div>
);

const Hero: React.FC = () => (
  <section aria-labelledby="hero-title" className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36 pb-16 lg:pb-20">
    <div className="absolute inset-0 grid-lines opacity-60 pointer-events-none" aria-hidden />
    <div className="data-flow-mask absolute inset-0 pointer-events-none opacity-90" aria-hidden>
      <DataFlowBackground />
    </div>

    <div className="container-x relative">
      <div className="grid lg:grid-cols-[1.25fr_1fr] gap-14 lg:gap-10 items-center">
        <div>
          <m.div {...rise(0.05)} className="flex flex-wrap items-center gap-2 mb-7">
            <span className="chip !bg-accent-soft !border-transparent !text-accent">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              {PROFILE.workAuth}
            </span>
            <span className="chip">Open to roles in Ireland</span>
          </m.div>

          <m.p {...rise(0.12)} className="font-mono text-[12px] uppercase tracking-[0.18em] text-muted mb-5">
            Mahesh Bunage <span className="text-subtle">/</span> Data & AI Engineer
          </m.p>

          <h1 id="hero-title" className="display text-[2.5rem] leading-[1.03] sm:text-[3.4rem] lg:text-[3.6rem] xl:text-[4rem] text-fg">
            <m.span {...rise(0.2)} className="block">
              Engineering intelligent systems.
            </m.span>
            <m.span {...rise(0.32)} className="block mt-1 text-muted">
              Turning <span className="serif-accent text-fg">data</span> into{' '}
              <span className="serif-accent text-fg">decisions.</span>
            </m.span>
          </h1>

          <m.p {...rise(0.44)} className="mt-7 text-[1.05rem] sm:text-lg text-muted leading-relaxed max-w-xl">
            Data & AI Engineer with 2.5+ years running production pipelines at Experian scale with Airflow, PySpark, AWS
            and Snowflake. Now building RAG systems, AI agents and LLM safety tooling on top of real data.
          </m.p>

          <m.div {...rise(0.56)} className="mt-9 flex flex-col sm:flex-row sm:flex-wrap gap-3">
            <a href="#projects" onClick={anchorClick('projects')} className="btn btn-primary group">
              View projects
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a href={PROFILE.resume} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <Download className="w-4 h-4" />
              Download resume
            </a>
            <a href="#contact" onClick={anchorClick('contact')} className="btn btn-ghost">
              <Mail className="w-4 h-4" />
              Contact me
            </a>
          </m.div>

          <m.div {...rise(0.66)} className="mt-8 flex items-center gap-5 text-sm">
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="btn btn-link gap-2">
              <Github className="w-4 h-4" /> GitHub
            </a>
            <span className="w-px h-4 bg-line-strong" aria-hidden />
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-link gap-2">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
          </m.div>
        </div>

        <Portrait />
      </div>

      <m.dl
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="mt-16 lg:mt-24 grid grid-cols-2 lg:grid-cols-4 rounded-2xl border border-line bg-surface backdrop-blur-sm overflow-hidden"
      >
        {HERO_STATS.map((s, i) => (
          <div
            key={s.label}
            className={`p-5 sm:p-6 border-line ${i % 2 === 0 ? 'border-r' : ''} ${i < 2 ? 'border-b lg:border-b-0' : ''} ${
              i === 1 ? 'lg:border-r' : ''
            }`}
          >
            <dt className="sr-only">{s.label}</dt>
            <dd>
              <span className="block display text-3xl sm:text-4xl text-fg">{s.value}</span>
              <span className="block mt-2 text-[13px] leading-snug text-muted">{s.label}</span>
            </dd>
          </div>
        ))}
      </m.dl>
    </div>
  </section>
);

export default Hero;
