import React from 'react';
import { APPROACH, FOCUS_AREAS, STORY } from '../constants.ts';
import { Reveal, useSpotlight } from './ui.tsx';

const About: React.FC = () => {
  const spot = useSpotlight<HTMLDivElement>();

  return (
    <section id="about" aria-labelledby="about-title" className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20">
          <div className="lg:sticky lg:top-28 self-start">
            <Reveal>
              <p className="eyebrow mb-5">About</p>
              <h2 id="about-title" className="display text-[2.1rem] sm:text-5xl text-fg">
                From pipelines <span className="serif-accent text-muted">to</span> intelligence.
              </h2>
              <p className="mt-6 text-base sm:text-lg text-muted leading-relaxed max-w-md">
                I started where data is least glamorous and most important: in production pipelines that other teams
                depend on every morning. That is the lens I bring to AI. A model or an agent is only as good as the data
                and the engineering underneath it.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="mt-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-subtle mb-3">Focus areas</p>
              <ul className="flex flex-wrap gap-2">
                {FOCUS_AREAS.map((f) => (
                  <li key={f} className="chip">
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <ol className="relative space-y-4">
            {STORY.map((c, i) => (
              <Reveal as="li" key={c.index} delay={i * 0.08}>
                <div onPointerMove={spot} className="card spotlight p-6 sm:p-7 sm:pl-20">
                  <span className="sm:absolute sm:left-5 sm:top-7 inline-grid place-items-center w-9 h-9 rounded-full bg-elev border border-line-strong font-mono text-[11px] text-fg mb-4 sm:mb-0">
                    {c.index}
                  </span>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">{c.label}</p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-fg">{c.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <div className="mt-24">
          <Reveal className="flex items-end justify-between gap-6 mb-8">
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-fg">How I work</h3>
            <p className="hidden sm:block text-sm text-muted max-w-xs text-right">The same loop for a nightly ETL job or an AI agent.</p>
          </Reveal>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {APPROACH.map((step, i) => (
              <Reveal as="li" key={step.stage} delay={i * 0.06}>
                <div className="card h-full p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="font-mono text-[11px] text-subtle">0{i + 1}</span>
                    <span className="h-px flex-1 bg-line-strong" />
                  </div>
                  <h4 className="text-base font-semibold text-fg">{step.stage}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default About;
