import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import {
  Copy, CornerDownLeft, FileText, FolderGit2, Github, Hash, Linkedin, Mail, Moon, Search, Check,
} from 'lucide-react';
import { NAV_LINKS, PROFILE, PROJECTS } from '../constants.ts';
import { goTo, openProject, toggleTheme } from './ui.tsx';

type Item = {
  id: string;
  group: 'Navigate' | 'Projects' | 'Actions' | 'Links';
  label: string;
  hint?: string;
  icon: React.ReactNode;
  keywords?: string;
  run: () => void | 'keep-open';
};

const CommandPalette: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);

  const items: Item[] = useMemo(
    () => [
      ...NAV_LINKS.map((l) => ({
        id: 'nav-' + l.href,
        group: 'Navigate' as const,
        label: l.name,
        icon: <Hash className="w-4 h-4" />,
        run: () => goTo(l.href),
      })),
      ...PROJECTS.map((p) => ({
        id: 'project-' + p.slug,
        group: 'Projects' as const,
        label: p.title,
        hint: p.category,
        keywords: p.techStack.join(' '),
        icon: <FolderGit2 className="w-4 h-4" />,
        run: () => openProject(p.slug),
      })),
      {
        id: 'copy-email',
        group: 'Actions',
        label: copied ? 'Email copied' : 'Copy email address',
        hint: PROFILE.email,
        icon: copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />,
        run: () => {
          navigator.clipboard?.writeText(PROFILE.email).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
          });
          return 'keep-open';
        },
      },
      {
        id: 'resume',
        group: 'Actions',
        label: 'Open resume (PDF)',
        icon: <FileText className="w-4 h-4" />,
        run: () => void window.open(PROFILE.resume, '_blank', 'noopener'),
      },
      {
        id: 'theme',
        group: 'Actions',
        label: 'Toggle light / dark theme',
        icon: <Moon className="w-4 h-4" />,
        run: () => toggleTheme(),
      },
      {
        id: 'email',
        group: 'Links',
        label: 'Send an email',
        icon: <Mail className="w-4 h-4" />,
        run: () => void (window.location.href = 'mailto:' + PROFILE.email),
      },
      {
        id: 'github',
        group: 'Links',
        label: 'GitHub',
        hint: 'github.com/Mahesh8806',
        icon: <Github className="w-4 h-4" />,
        run: () => void window.open(PROFILE.github, '_blank', 'noopener'),
      },
      {
        id: 'linkedin',
        group: 'Links',
        label: 'LinkedIn',
        hint: 'linkedin.com/in/maheshbunage',
        icon: <Linkedin className="w-4 h-4" />,
        run: () => void window.open(PROFILE.linkedin, '_blank', 'noopener'),
      },
    ],
    [copied],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => `${i.label} ${i.hint ?? ''} ${i.keywords ?? ''} ${i.group}`.toLowerCase().includes(q));
  }, [items, query]);

  useEffect(() => {
    if (open) {
      restoreFocus.current = document.activeElement as HTMLElement;
      setQuery('');
      setIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      restoreFocus.current?.focus?.();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => setIndex(0), [query]);

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${index}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [index]);

  const runItem = (item: Item | undefined) => {
    if (!item) return;
    const result = item.run();
    if (result !== 'keep-open') onClose();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIndex((i) => (filtered.length ? (i + 1) % filtered.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setIndex((i) => (filtered.length ? (i - 1 + filtered.length) % filtered.length : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      runItem(filtered[index]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'Tab') {
      e.preventDefault(); // keep focus inside the dialog
    }
  };

  let lastGroup = '';

  return (
    <AnimatePresence>
      {open && (
        <m.div
          className="fixed inset-0 z-[100] flex items-start justify-center px-3 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} aria-hidden />
          <m.div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-xl rounded-2xl border border-line-strong bg-elev shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] overflow-hidden"
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 px-4 border-b border-line">
              <Search className="w-4 h-4 text-muted shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to a section, project or action…"
                className="w-full h-14 bg-transparent outline-none text-[15px] text-fg placeholder:text-subtle"
                role="combobox"
                aria-expanded="true"
                aria-controls="palette-list"
                aria-activedescendant={filtered[index] ? 'palette-' + filtered[index].id : undefined}
                aria-autocomplete="list"
              />
              <span className="kbd shrink-0">esc</span>
            </div>
            <ul id="palette-list" ref={listRef} role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
              {filtered.length === 0 && <li className="px-3 py-8 text-center text-sm text-muted">No results for “{query}”</li>}
              {filtered.map((item, i) => {
                const header = item.group !== lastGroup ? item.group : null;
                lastGroup = item.group;
                const selected = i === index;
                return (
                  <React.Fragment key={item.id}>
                    {header && (
                      <li role="presentation" className="px-3 pt-3 pb-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-subtle">
                        {header}
                      </li>
                    )}
                    <li
                      id={'palette-' + item.id}
                      role="option"
                      aria-selected={selected}
                      data-index={i}
                      onMouseMove={() => setIndex(i)}
                      onClick={() => runItem(item)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-sm transition-colors ${
                        selected ? 'bg-surface-2 text-fg' : 'text-fg-2'
                      }`}
                    >
                      <span className={selected ? 'text-accent' : 'text-muted'}>{item.icon}</span>
                      <span className="truncate">{item.label}</span>
                      {item.hint && <span className="ml-auto truncate text-xs text-subtle hidden sm:block max-w-[45%]">{item.hint}</span>}
                      {selected && <CornerDownLeft className={`w-3.5 h-3.5 text-muted shrink-0 ${item.hint ? 'sm:ml-0 ml-auto' : 'ml-auto'}`} />}
                    </li>
                  </React.Fragment>
                );
              })}
            </ul>
            <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-t border-line text-[11px] text-subtle">
              <span className="flex items-center gap-1.5">
                <span className="kbd">↑</span>
                <span className="kbd">↓</span> to move
                <span className="kbd ml-2">↵</span> to select
              </span>
              <span className="hidden sm:block">Open anytime with ⌘K or /</span>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
