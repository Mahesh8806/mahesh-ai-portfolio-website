import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Award } from 'lucide-react';
import { EDUCATION, ACHIEVEMENTS } from '../constants.ts';

const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 bg-white dark:bg-transparent transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-base font-bold tracking-widest text-cyan-500 uppercase mb-2">Academic Background</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Education</h3>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {EDUCATION.map((item, index) => (
            <motion.div
              key={item.degree}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 bg-white dark:bg-slate-900/40 dark:backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-slate-700/50"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 flex-shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">{item.degree}</h4>
                    <p className="text-cyan-500 text-sm font-semibold mt-0.5">{item.institution}</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full w-fit flex-shrink-0">
                  <Calendar className="w-3 h-3" />
                  {item.period}
                </span>
              </div>

              {item.details && (
                <ul className="space-y-2 mb-4">
                  {item.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-500 flex-shrink-0"></span>
                      <span className="leading-relaxed">{detail}</span>
                    </li>
                  ))}
                </ul>
              )}

              {item.thesis && (
                <div className="p-5 bg-cyan-500/5 dark:bg-cyan-500/10 border border-cyan-500/20 rounded-xl mb-4">
                  <p className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wide mb-1.5">
                    Thesis — {item.thesis.title}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.thesis.summary}
                  </p>
                </div>
              )}

              {item.modules && (
                <div className="flex flex-wrap gap-2">
                  {item.modules.map((module) => (
                    <span key={module} className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/50 px-2.5 py-1 rounded border border-slate-200 dark:border-slate-700/50">
                      {module}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center gap-3 justify-center pt-2"
          >
            {ACHIEVEMENTS.map((achievement) => (
              <span key={achievement} className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900/40 dark:backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 px-4 py-2 rounded-full">
                <Award className="w-4 h-4 text-cyan-500" />
                {achievement}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;
