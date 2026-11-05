import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ArrowRight, ChevronDown, AlertTriangle } from 'lucide-react';
import { PROJECTS } from '../constants.ts';

const Projects: React.FC = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="projects" className="py-24 bg-slate-50 dark:bg-transparent transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
           <h2 className="text-base font-bold tracking-widest text-cyan-500 uppercase mb-2">Portfolio</h2>
           <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Featured Projects</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {PROJECTS.map((project, index) => {
            const isOpen = expanded === index;
            return (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="bg-white dark:bg-slate-900/40 dark:backdrop-blur-xl border border-slate-200 dark:border-slate-700/50 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-colors duration-300"
              >
                <button
                  onClick={() => setExpanded(isOpen ? null : index)}
                  className="w-full text-left p-7 flex flex-col"
                  aria-expanded={isOpen}
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded uppercase tracking-wide">
                      {project.category}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                  </div>

                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                    {project.title}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm leading-relaxed">
                    {project.summary}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-100 dark:border-slate-800">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/50 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-7 pb-7 pt-1 border-t border-slate-100 dark:border-slate-800">
                        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3 mt-5">
                          Architecture
                        </p>
                        <ul className="space-y-2 mb-5">
                          {project.architecture.map((line, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                              <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-500 flex-shrink-0"></span>
                              <span className="leading-relaxed">{line}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="p-4 bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 rounded-xl mb-5">
                          <p className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-500 uppercase tracking-wide mb-1.5">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            Technical Challenge
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                            {project.challenge}
                          </p>
                        </div>

                        <a
                          href={project.repoLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          View Repository
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
            <a href="https://github.com/Mahesh8806" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-slate-900/40 dark:backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 hover:border-cyan-500 hover:text-cyan-500 transition-all group font-medium">
             View all on GitHub <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
           </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
