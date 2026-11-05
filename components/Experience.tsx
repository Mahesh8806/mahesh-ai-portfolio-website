import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { WORK_EXPERIENCE } from '../constants.ts';

const EXPERIENCE_TECH = ['Python', 'SQL', 'Apache Airflow', 'PySpark', 'Hive', 'AWS S3', 'Snowflake', 'Terraform', 'JIRA', 'Confluence', 'Bitbucket'];

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 bg-slate-50 dark:bg-transparent transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-base font-bold tracking-widest text-cyan-500 uppercase mb-2">My Journey</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Professional Experience</h3>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {WORK_EXPERIENCE.map((item, index) => (
            <motion.div
              key={item.role + item.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 md:p-10 bg-slate-50 dark:bg-slate-900/40 dark:backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-slate-700/50"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 flex-shrink-0">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white">{item.role}</h4>
                    <p className="text-cyan-500 text-sm font-semibold mt-0.5">{item.company}</p>
                    {item.companySubtitle && (
                      <p className="text-slate-500 dark:text-slate-400 text-sm">{item.companySubtitle}</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2 sm:items-end flex-shrink-0">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-200 dark:bg-slate-800/60 px-2.5 py-1 rounded-full w-fit">
                    <Calendar className="w-3 h-3" />
                    {item.period}
                  </span>
                  {item.location && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 w-fit">
                      <MapPin className="w-3 h-3" />
                      {item.location}
                    </span>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {item.description.map((desc, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-500 flex-shrink-0"></span>
                    <span className="leading-relaxed">{desc}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-200 dark:border-slate-800">
                {EXPERIENCE_TECH.map((tech) => (
                  <span key={tech} className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800/50 px-2.5 py-1 rounded border border-slate-200 dark:border-slate-700/50">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
