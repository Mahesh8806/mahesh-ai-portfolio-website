import React, { useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { Award, GraduationCap, MapPin } from 'lucide-react';
import { ACHIEVEMENTS, EDUCATION, WORK_EXPERIENCE } from '../constants.ts';
import { ExperienceItem } from '../types.ts';
import { Reveal, SectionHeader, useSpotlight } from './ui.tsx';

const Bullets: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="space-y-3">
    {items.map((p) => (
      <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-fg-2">
        <span className="mt-[0.6rem] w-1 h-1 rounded-full bg-accent shrink-0" aria-hidden />
        <span>{p}</span>
      </li>
    ))}
  </ul>
);

const Role: React.FC<{ item: ExperienceItem; index: number }> = ({ item, index }) => {
  const [tab, setTab] = useState(0);
  const spot = useSpotlight<HTMLDivElement>();
  const streams = item.workstreams ?? [];

  return (
    <Reveal as="li" delay={index * 0.05} className="relative sm:pl-12">
      <span aria-hidden className="hidden sm:grid absolute left-0 top-8 w-[23px] h-[23px] place-items-center rounded-full bg-bg border border-line-strong">
        <span className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-accent' : 'bg-subtle'}`} />
      </span>

      <div onPointerMove={spot} className="card spotlight p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-fg">{item.role}</h3>
            <p className="mt-1 text-[15px] text-fg-2">
              {item.company}
              {item.companySubtitle && <span className="text-muted"> · {item.companySubtitle}</span>}
            </p>
          </div>
          <div className="flex md:flex-col md:items-end gap-x-4 gap-y-1 text-[13px] text-muted shrink-0">
            {item.period && <span className="font-mono text-fg-2">{item.period}</span>}
            {item.location && (
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {item.location}
              </span>
            )}
          </div>
        </div>

        <p className="mt-5 text-[15px] leading-relaxed text-muted max-w-3xl">{item.summary}</p>

        {item.highlights && (
          <dl className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-px rounded-xl overflow-hidden border border-line bg-line">
            {item.highlights.map((h) => (
              <div key={h.label} className="bg-bg">
                <div className="p-4 bg-surface h-full">
                  <dt className="sr-only">{h.label}</dt>
                  <dd>
                    <span className="block text-2xl font-semibold tracking-tight text-fg">{h.value}</span>
                    <span className="block mt-1 text-[12px] leading-snug text-muted">{h.label}</span>
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        )}

        {streams.length > 0 && (
          <div className="mt-8">
            <div role="tablist" aria-label={`${item.company} workstreams`} className="flex gap-1 p-1 rounded-xl bg-surface-2 border border-line w-full sm:w-fit overflow-x-auto no-scrollbar">
              {streams.map((s, i) => (
                <button
                  key={s.title}
                  role="tab"
                  id={`ws-tab-${index}-${i}`}
                  aria-selected={tab === i}
                  aria-controls={`ws-panel-${index}`}
                  onClick={() => setTab(i)}
                  className={`px-3.5 py-2 rounded-lg text-[13px] whitespace-nowrap transition-colors ${
                    tab === i ? 'bg-elev text-fg shadow-sm border border-line' : 'text-muted hover:text-fg border border-transparent'
                  }`}
                >
                  {s.title}
                </button>
              ))}
            </div>
            <div id={`ws-panel-${index}`} role="tabpanel" aria-labelledby={`ws-tab-${index}-${tab}`} className="mt-6">
              <AnimatePresence mode="wait">
                <m.div
                  key={tab}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22 }}
                >
                  <Bullets items={streams[tab].points} />
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {streams[tab].stack.map((t) => (
                      <span key={t} className="chip font-mono !text-[11px]">
                        {t}
                      </span>
                    ))}
                  </div>
                </m.div>
              </AnimatePresence>
            </div>
          </div>
        )}

        {item.points && (
          <div className="mt-6">
            <Bullets items={item.points} />
          </div>
        )}

        {!streams.length && (
          <div className="mt-6 pt-6 border-t border-line flex flex-wrap gap-1.5">
            {item.stack.map((t) => (
              <span key={t} className="chip font-mono !text-[11px]">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </Reveal>
  );
};

const Experience: React.FC = () => {
  const spot = useSpotlight<HTMLDivElement>();
  return (
    <section id="experience" aria-labelledby="experience-title" className="relative py-24 md:py-32 border-t border-line">
      <div className="container-x">
        <SectionHeader
          id="experience-title"
          eyebrow="Experience"
          title={
            <>
              Production data, <span className="serif-accent text-muted">at enterprise scale.</span>
            </>
          }
          intro="Where I learned to build pipelines that other teams rely on, and to keep them running."
        />

        <ol className="relative space-y-6">
          <span aria-hidden className="hidden sm:block absolute left-[11px] top-10 bottom-10 w-px bg-gradient-to-b from-accent/60 via-line-strong to-transparent" />
          {WORK_EXPERIENCE.map((item, i) => (
            <Role key={item.company} item={item} index={i} />
          ))}
        </ol>

        <div className="mt-20">
          <Reveal className="flex items-center gap-3 mb-6">
            <GraduationCap className="w-5 h-5 text-accent" />
            <h3 className="text-2xl font-semibold tracking-tight text-fg">Education</h3>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-4">
            {EDUCATION.map((e, i) => (
              <Reveal key={e.degree} delay={i * 0.06}>
                <div onPointerMove={spot} className="card spotlight h-full p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-lg font-semibold tracking-tight text-fg">{e.degree}</h4>
                      <p className="text-[14px] text-muted mt-0.5">{e.institution}</p>
                    </div>
                    <span className="font-mono text-[12px] text-fg-2 shrink-0">{e.period}</span>
                  </div>
                  {e.thesis && (
                    <div className="mt-5 p-4 rounded-xl bg-accent-soft border border-accent/20">
                      <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-accent">Thesis · {e.thesis.title}</p>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-fg-2">{e.thesis.summary}</p>
                    </div>
                  )}
                  {e.details && (
                    <div className="mt-5">
                      <Bullets items={e.details} />
                    </div>
                  )}
                  {e.modules && (
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {e.modules.map((mod) => (
                        <span key={mod} className="chip !text-[11.5px]">
                          {mod}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-4 flex flex-wrap gap-2">
            {ACHIEVEMENTS.map((a) => (
              <span key={a} className="chip !py-1.5 !px-3">
                <Award className="w-3.5 h-3.5 text-accent" />
                {a}
              </span>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Experience;
