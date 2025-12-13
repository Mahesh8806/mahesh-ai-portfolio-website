import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar } from 'lucide-react';
import { EXPERIENCE } from '../constants.ts';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-base font-bold tracking-widest text-purple-500 uppercase mb-2">My Journey</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Experience & Education</h3>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Center line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px top-0 h-full w-px bg-slate-200 dark:bg-slate-800"></div>

          <div className="space-y-12">
            {EXPERIENCE.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row gap-8 ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-900 border-2 border-cyan-500 flex items-center justify-center z-10">
                    {item.type === 'work' ? (
                      <Briefcase className="w-3 h-3 text-cyan-500" />
                    ) : (
                      <GraduationCap className="w-3 h-3 text-purple-500" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="ml-12 md:ml-0 md:w-1/2">
                    <div className={`p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500/30 transition-colors ${!isEven ? 'md:mr-12' : 'md:ml-12'}`}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white">{item.role}</h4>
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-200 dark:bg-slate-800 px-2.5 py-1 rounded-full mt-2 sm:mt-0 w-fit">
                          <Calendar className="w-3 h-3" />
                          {item.period}
                        </span>
                      </div>
                      <h5 className="text-cyan-500 text-sm font-semibold mb-3">{item.company}</h5>
                      <ul className="space-y-2">
                        {item.description.map((desc, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                             <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0"></span>
                             <span className="leading-relaxed">{desc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {/* Empty side for layout balance */}
                  <div className="hidden md:block md:w-1/2"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;