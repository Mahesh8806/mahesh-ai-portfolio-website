import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import { PROJECTS } from '../constants.ts';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
           <h2 className="text-sm font-bold tracking-widest text-cyan-500 uppercase mb-2">Portfolio</h2>
           <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Featured Projects</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-[#0f0f0f] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 flex flex-col h-full group"
            >
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold text-purple-500 bg-purple-500/10 px-2 py-1 rounded uppercase tracking-wide">
                    {project.category}
                  </span>
                  <div className="flex gap-3">
                    <a href={project.repoLink} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                    {project.demoLink && (
                      <a href={project.demoLink} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
                
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h4>
                <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm leading-relaxed flex-grow">
                  {project.summary}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
            <a href="https://github.com/Mahesh8806" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-cyan-500 hover:text-cyan-500 transition-all group font-medium">
             View all on GitHub <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
           </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;