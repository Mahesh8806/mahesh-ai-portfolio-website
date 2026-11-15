import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m, useInView, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Pause, Play } from 'lucide-react';
import { PIPELINE } from '../constants.ts';
import { ICONS, Reveal, SectionHeader, openProject } from './ui.tsx';

const STEP_MS = 4500;

const PipelineExplorer: React.FC = () => {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-20% 0px -20% 0px' });
  const playing = auto && !reduced && inView;

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % PIPELINE.length), STEP_MS);
    return () => clearTimeout(t);
  }, [playing, active]);

  const select = (i: number) => {
    setActive(i);
    setAuto(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const n = (active + 1) % PIPELINE.length;
      select(n);
      document.getElementById(`stage-${PIPELINE[n].id}`)?.focus();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const n = (active - 1 + PIPELINE.length) % PIPELINE.length;
      select(n);
      document.getElementById(`stage-${PIPELINE[n].id}`)?.focus();
    }
  };

  const stage = PIPELINE[active];
  const progress = (active / (PIPELINE.length - 1)) * 100;

  return (
    <section id="systems" aria-labelledby="systems-title" className="relative py-24 md:py-32 border-t border-line overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-40 pointer-events-none" aria-hidden />
      <div className="container-x relative">
        <SectionHeader
          id="systems-title"
          eyebrow="Interactive · How I build"
          title={
            <>
              Follow the data, <span className="serif-accent text-muted">from source to intelligence.</span>
            </>
          }
          intro="Every stage of a modern data and AI system, and where I've built it: in production at Experian or in my own projects. Select a stage to explore."
        />

        <Reveal>
          <div ref={ref} className="card card-solid p-4 sm:p-8">
            {/* Stage track */}
            <div className="relative">
              <div aria-hidden className="hidden md:block absolute left-[8.33%] right-[8.33%] top-7 h-px bg-line-strong">
                <m.div
                  className="absolute inset-y-0 left-0 bg-accent"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
                {!reduced && (
                  <m.span
                    key={active}
                    className="absolute -top-[3px] w-[7px] h-[7px] rounded-full bg-signal shadow-[0_0_12px_var(--signal)]"
                    initial={{ left: `${progress}%`, opacity: 0 }}
                    animate={{ left: [`${progress}%`, `${Math.min(progress + 100 / (PIPELINE.length - 1), 100)}%`], opacity: [0, 1, 0] }}
                    transition={{ duration: STEP_MS / 1000, ease: 'linear', repeat: Infinity }}
                  />
                )}
              </div>

              <div role="tablist" aria-label="Pipeline stages" onKeyDown={onKeyDown} className="relative grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-0">
                {PIPELINE.map((s, i) => {
                  const Icon = ICONS[s.iconName];
                  const isActive = i === active;
                  const done = i < active;
                  return (
                    <button
                      key={s.id}
                      id={`stage-${s.id}`}
                      role="tab"
                      aria-selected={isActive}
                      aria-controls="stage-panel"
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => select(i)}
                      className={`group flex flex-col items-center gap-2.5 rounded-xl py-2 md:py-0 transition-colors ${isActive ? 'bg-surface-2 md:bg-transparent' : ''}`}
                    >
                      <span
                        className={`relative grid place-items-center w-14 h-14 rounded-2xl border transition-all duration-300 ${
                          isActive
                            ? 'bg-accent text-accent-fg border-accent shadow-[0_10px_30px_-10px_var(--accent)] scale-105'
                            : done
                              ? 'bg-elev text-accent border-accent/40'
                              : 'bg-elev text-muted border-line-strong group-hover:text-fg group-hover:border-subtle'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </span>
                      <span className="flex flex-col items-center">
                        <span className="font-mono text-[10px] text-subtle">0{i + 1}</span>
                        <span className={`text-[13px] font-medium ${isActive ? 'text-fg' : 'text-muted group-hover:text-fg'}`}>{s.name}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Detail panel */}
            <div id="stage-panel" role="tabpanel" aria-labelledby={`stage-${stage.id}`} aria-live="polite" className="mt-8 md:mt-12 min-h-[300px] sm:min-h-[260px] md:min-h-[190px]">
              <AnimatePresence mode="wait">
                <m.div
                  key={stage.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid md:grid-cols-[1fr_1.1fr] gap-6 md:gap-10"
                >
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-fg">{stage.name}</h3>
                    <p className="mt-3 text-[15px] sm:text-base leading-relaxed text-muted">{stage.what}</p>
                    <ul className="mt-5 flex flex-wrap gap-1.5">
                      {stage.tools.map((t) => (
                        <li key={t} className="chip font-mono !text-[11px]">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-subtle mb-3">Where I've built this</p>
                    <ul className="divide-y divide-line rounded-2xl border border-line overflow-hidden">
                      {stage.where.map((w) => (
                        <li key={w.label}>
                          {w.project ? (
                            <button
                              onClick={() => openProject(w.project!)}
                              className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left text-[14px] text-fg-2 bg-surface hover:bg-surface-2 hover:text-fg transition-colors group"
                            >
                              <span>{w.label}</span>
                              <ArrowUpRight className="w-4 h-4 shrink-0 text-subtle group-hover:text-accent transition-colors" />
                            </button>
                          ) : (
                            <p className="px-4 py-3.5 text-[14px] text-fg-2 bg-surface">{w.label}</p>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </m.div>
              </AnimatePresence>
            </div>

            {!reduced && (
              <div className="mt-6 flex items-center justify-end gap-3">
                <div className="h-0.5 w-24 rounded-full bg-line overflow-hidden" aria-hidden>
                  {playing && (
                    <m.div
                      key={active}
                      className="h-full bg-accent"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: STEP_MS / 1000, ease: 'linear' }}
                    />
                  )}
                </div>
                <button
                  onClick={() => setAuto((a) => !a)}
                  className="inline-flex items-center gap-1.5 text-[12px] text-muted hover:text-fg"
                  aria-label={auto ? 'Pause the walkthrough' : 'Play the walkthrough'}
                >
                  {auto ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  {auto ? 'Pause' : 'Play'}
                </button>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default PipelineExplorer;
