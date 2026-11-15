import React, { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { SKILLS } from '../constants.ts';
import { ICONS, Reveal, SectionHeader, useSpotlight } from './ui.tsx';

const QUICK = ['Airflow', 'PySpark', 'AWS', 'Snowflake', 'LangChain', 'RAG', 'SQL'];

const Stack: React.FC = () => {
  const [q, setQ] = useState('');
  const spot = useSpotlight<HTMLDivElement>();
  const query = q.trim().toLowerCase();

  const matches = useMemo(() => {
    if (!query) return null;
    let n = 0;
    const set = new Set<string>();
    SKILLS.forEach((c) =>
      c.skills.forEach((s) => {
        if (s.toLowerCase().includes(query)) {
          set.add(c.title + s);
          n++;
        }
      }),
    );
    return { set, n };
  }, [query]);

  const total = SKILLS.reduce((sum, c) => sum + c.skills.length, 0);

  return (
    <section id="stack" aria-labelledby="stack-title" className="relative py-24 md:py-32 border-t border-line">
      <div className="container-x">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <SectionHeader
            id="stack-title"
            eyebrow="Tech stack"
            title={
              <>
                Tools I use <span className="serif-accent text-muted">in practice.</span>
              </>
            }
            intro={`${total} technologies across eight areas, drawn from my production work, my MSc and the projects on this page.`}
          />
          <Reveal className="lg:mb-16 w-full lg:w-[340px] shrink-0">
            <label htmlFor="stack-search" className="sr-only">
              Search the tech stack
            </label>
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-subtle pointer-events-none" />
              <input
                id="stack-search"
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search skills, e.g. Airflow"
                className="field !pl-10 !pr-10 !rounded-full"
                autoComplete="off"
              />
              {q && (
                <button onClick={() => setQ('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-subtle hover:text-fg" aria-label="Clear search">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5 items-center min-h-[28px]" aria-live="polite">
              {matches ? (
                <span className="text-[13px] text-muted">
                  {matches.n ? (
                    <>
                      <span className="text-fg font-medium">Yes.</span> {matches.n} match{matches.n > 1 ? 'es' : ''} highlighted below.
                    </>
                  ) : (
                    <>Not on my list. I only show what I've actually used.</>
                  )}
                </span>
              ) : (
                QUICK.map((t) => (
                  <button key={t} onClick={() => setQ(t)} className="chip hover:border-line-strong hover:text-fg transition-colors !text-[11.5px]">
                    {t}
                  </button>
                ))
              )}
            </div>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SKILLS.map((cat, i) => {
            const Icon = ICONS[cat.iconName];
            const catHit = matches ? cat.skills.some((s) => matches.set.has(cat.title + s)) : true;
            return (
              <Reveal key={cat.title} delay={(i % 4) * 0.05}>
                <div
                  onPointerMove={spot}
                  className={`card spotlight h-full p-5 sm:p-6 transition-opacity duration-300 ${catHit ? 'opacity-100' : 'opacity-40'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="grid place-items-center w-10 h-10 rounded-xl bg-accent-soft text-accent">
                      <Icon className="w-[18px] h-[18px]" />
                    </span>
                    <span className="font-mono text-[11px] text-subtle">{String(cat.skills.length).padStart(2, '0')}</span>
                  </div>
                  <h3 className="mt-5 text-[15px] font-semibold tracking-tight text-fg">{cat.title}</h3>
                  <p className="mt-1 text-[13px] text-muted">{cat.blurb}</p>
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {cat.skills.map((s) => {
                      const hit = matches?.set.has(cat.title + s);
                      return (
                        <li
                          key={s}
                          className={`chip !text-[12px] transition-colors duration-200 ${
                            hit ? '!bg-accent !text-accent-fg !border-accent' : matches ? 'opacity-60' : 'hover:text-fg hover:border-line-strong'
                          }`}
                        >
                          {s}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stack;
