import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { ArrowUpRight, Github, X, Maximize2, ExternalLink } from 'lucide-react';
import { PROFILE, PROJECTS } from '../constants.ts';
import { Project } from '../types.ts';
import ProjectVisual from './ProjectVisual.tsx';
import { EASE, Reveal, SectionHeader, useSpotlight } from './ui.tsx';

const Stack: React.FC<{ items: string[]; max?: number }> = ({ items, max }) => {
  const shown = max ? items.slice(0, max) : items;
  return (
    <ul className="flex flex-wrap gap-1.5">
      {shown.map((t) => (
        <li key={t} className="chip font-mono !text-[11px]">
          {t}
        </li>
      ))}
      {max && items.length > max && <li className="chip font-mono !text-[11px] text-muted">+{items.length - max}</li>}
    </ul>
  );
};

const Outcomes: React.FC<{ items: Project['outcomes'] }> = ({ items }) =>
  items.length ? (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-4">
      {items.map((o) => (
        <div key={o.label}>
          <dt className="sr-only">{o.label}</dt>
          <dd>
            <span className="block text-2xl font-semibold tracking-tight text-fg">{o.value}</span>
            <span className="block text-[12px] text-muted mt-0.5">{o.label}</span>
          </dd>
        </div>
      ))}
    </dl>
  ) : null;

const Actions: React.FC<{ project: Project; onOpen: () => void }> = ({ project, onOpen }) => (
  <div className="flex flex-wrap items-center gap-2">
    <button onClick={onOpen} className="btn btn-primary !h-10 !px-4 text-[13px]" aria-haspopup="dialog">
      <Maximize2 className="w-3.5 h-3.5" />
      Case study
    </button>
    <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="btn btn-ghost !h-10 !px-4 text-[13px]">
      <Github className="w-3.5 h-3.5" />
      Code
    </a>
    {project.demoLink && (
      <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="btn btn-ghost !h-10 !px-4 text-[13px]">
        <ExternalLink className="w-3.5 h-3.5" />
        Live demo
      </a>
    )}
  </div>
);

const FeaturedCard: React.FC<{ project: Project; index: number; onOpen: () => void }> = ({ project, index, onOpen }) => {
  const spot = useSpotlight<HTMLElement>();
  const flip = index % 2 === 1;
  return (
    <Reveal className="md:col-span-2 lg:col-span-6">
      <article onPointerMove={spot} className="card spotlight group p-3 sm:p-4">
        <div className={`grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch ${flip ? 'lg:[&>*:first-child]:order-2' : ''}`}>
          <div className="p-3 sm:p-5 flex flex-col">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] text-subtle">0{index + 1}</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">{project.category}</span>
            </div>
            <h3 className="mt-4 text-2xl sm:text-[1.9rem] font-semibold tracking-tight leading-tight text-fg">{project.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">{project.tagline}</p>

            <div className="mt-6 grid sm:grid-cols-2 gap-5">
              <div>
                <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-subtle mb-1.5">Problem</p>
                <p className="text-[14px] leading-relaxed text-fg-2">{project.problem}</p>
              </div>
              <div>
                <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-subtle mb-1.5">Solution</p>
                <p className="text-[14px] leading-relaxed text-fg-2 line-clamp-5">{project.solution}</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-line">
              <Stack items={project.techStack} />
            </div>
            <div className="mt-6 lg:mt-auto lg:pt-6">
              <Actions project={project} onOpen={onOpen} />
            </div>
          </div>
          <div className="flex flex-col rounded-2xl border border-line bg-bg overflow-hidden">
            <div className="flex items-center gap-2 px-4 h-10 border-b border-line">
              <span className="flex gap-1.5" aria-hidden>
                <span className="w-2.5 h-2.5 rounded-full bg-line-strong" />
                <span className="w-2.5 h-2.5 rounded-full bg-line-strong" />
                <span className="w-2.5 h-2.5 rounded-full bg-line-strong" />
              </span>
              <span className="ml-2 font-mono text-[11px] text-subtle truncate">architecture / {project.slug}</span>
            </div>
            <button
              onClick={onOpen}
              aria-label={`Open the ${project.title} case study`}
              className="flex-1 min-h-[220px] sm:min-h-[280px] grid text-left transition-transform duration-500 ease-out group-hover:scale-[1.015]"
            >
              <ProjectVisual kind={project.visual} className="h-full !rounded-none !border-0 !bg-transparent" />
            </button>
            {project.outcomes.length > 0 && (
              <div className="px-5 py-5 border-t border-line bg-surface">
                <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {project.outcomes.map((o) => (
                    <div key={o.label}>
                      <dt className="sr-only">{o.label}</dt>
                      <dd>
                        <span className="block text-xl font-semibold tracking-tight text-fg">{o.value}</span>
                        <span className="block text-[11.5px] leading-snug text-muted mt-0.5">{o.label}</span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
};

const CompactCard: React.FC<{ project: Project; index: number; onOpen: () => void }> = ({ project, index, onOpen }) => {
  const spot = useSpotlight<HTMLElement>();
  return (
    <Reveal delay={(index % 3) * 0.06} className="lg:col-span-2">
      <article onPointerMove={spot} className="card spotlight group h-full p-3 flex flex-col">
        <button onClick={onOpen} aria-label={`Open the ${project.title} case study`} className="block aspect-[5/3] overflow-hidden rounded-2xl">
          <ProjectVisual kind={project.visual} className="h-full transition-transform duration-500 ease-out group-hover:scale-[1.02]" />
        </button>
        <div className="p-3 pt-5 flex flex-col flex-1">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-accent">{project.category}</span>
          <h3 className="mt-2.5 text-lg font-semibold tracking-tight text-fg">{project.title}</h3>
          <p className="mt-2 text-[14px] leading-relaxed text-muted">{project.tagline}</p>
          <div className="mt-5">
            <Stack items={project.techStack} max={4} />
          </div>
          <div className="mt-auto pt-6">
            <Actions project={project} onOpen={onOpen} />
          </div>
        </div>
      </article>
    </Reveal>
  );
};

const ProjectDialog: React.FC<{ project: Project | null; onClose: () => void }> = ({ project, onClose }) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!project) return;
    lastFocus.current = document.activeElement as HTMLElement;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => closeRef.current?.focus());
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      lastFocus.current?.focus?.();
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <m.div
          className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden />
          <m.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="relative w-full sm:max-w-4xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border border-line-strong bg-elev shadow-2xl"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-5 sm:px-8 py-4 bg-elev/90 backdrop-blur-md border-b border-line">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent truncate">{project.category}</span>
              <button ref={closeRef} onClick={onClose} className="grid place-items-center w-9 h-9 rounded-xl text-muted hover:text-fg hover:bg-surface-2" aria-label="Close case study">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-5 sm:px-8 pt-6 pb-8">
              <h3 id="project-dialog-title" className="display text-3xl sm:text-4xl text-fg">
                {project.title}
              </h3>
              <p className="mt-3 text-base sm:text-lg text-muted leading-relaxed max-w-2xl">{project.tagline}</p>

              <ProjectVisual kind={project.visual} className="mt-7 aspect-[5/3] sm:aspect-[2/1]" />

              <div className="mt-8 grid md:grid-cols-2 gap-6">
                <div className="card p-5">
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-subtle mb-2">Problem</p>
                  <p className="text-[15px] leading-relaxed text-fg-2">{project.problem}</p>
                </div>
                <div className="card p-5">
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-subtle mb-2">Solution</p>
                  <p className="text-[15px] leading-relaxed text-fg-2">{project.solution}</p>
                </div>
              </div>

              <div className="mt-10">
                <h4 className="text-lg font-semibold tracking-tight text-fg mb-5">How it works</h4>
                <ol className="space-y-4">
                  {project.architecture.map((step, i) => (
                    <li key={step} className="flex gap-4">
                      <span className="grid place-items-center w-7 h-7 shrink-0 rounded-full border border-line-strong font-mono text-[11px] text-fg-2">{i + 1}</span>
                      <p className="pt-0.5 text-[15px] leading-relaxed text-fg-2">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-10 p-5 rounded-2xl bg-accent-soft border border-accent/20">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-accent mb-2">Key technical challenge</p>
                <p className="text-[15px] leading-relaxed text-fg-2">{project.challenge}</p>
              </div>

              {project.outcomes.length > 0 && (
                <div className="mt-10">
                  <h4 className="text-lg font-semibold tracking-tight text-fg mb-5">Results</h4>
                  <Outcomes items={project.outcomes} />
                </div>
              )}

              <div className="mt-10">
                <h4 className="text-lg font-semibold tracking-tight text-fg mb-4">Stack</h4>
                <Stack items={project.techStack} />
              </div>

              <div className="mt-10 pt-6 border-t border-line flex flex-wrap gap-2">
                <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <Github className="w-4 h-4" /> View the code on GitHub
                </a>
                {project.demoLink && (
                  <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                    <ExternalLink className="w-4 h-4" /> Live demo
                  </a>
                )}
              </div>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
};

const Projects: React.FC = () => {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const open = PROJECTS.find((p) => p.slug === openSlug) ?? null;
  const close = React.useCallback(() => setOpenSlug(null), []);

  // Other parts of the page (command menu, pipeline explorer) can open a project.
  useEffect(() => {
    const onOpen = (e: Event) => setOpenSlug((e as CustomEvent<string>).detail);
    window.addEventListener('open-project', onOpen);
    return () => window.removeEventListener('open-project', onOpen);
  }, []);

  const featured = PROJECTS.filter((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);

  return (
    <section id="projects" aria-labelledby="projects-title" className="relative py-24 md:py-32 border-t border-line">
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionHeader
            id="projects-title"
            eyebrow="Selected work"
            title={
              <>
                Systems I've built, <span className="serif-accent text-muted">end to end.</span>
              </>
            }
            intro="Agents, retrieval, LLM safety and the data pipelines underneath them. Open any project for the full case study."
          />
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost self-start md:self-auto -mt-4 mb-10 md:mt-0 md:mb-16 shrink-0">
            All repositories <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-5">
          {featured.map((p, i) => (
            <FeaturedCard key={p.slug} project={p} index={i} onOpen={() => setOpenSlug(p.slug)} />
          ))}
          {rest.map((p, i) => (
            <CompactCard key={p.slug} project={p} index={i} onOpen={() => setOpenSlug(p.slug)} />
          ))}
        </div>
      </div>

      <ProjectDialog project={open} onClose={close} />
    </section>
  );
};

export default Projects;
