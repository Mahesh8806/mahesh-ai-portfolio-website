import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILLS } from '../constants.ts';

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(() => ['All', ...SKILLS.map((c) => c.title)], []);

  const visibleSkills = useMemo(() => {
    const source = activeCategory === 'All'
      ? SKILLS
      : SKILLS.filter((c) => c.title === activeCategory);
    return source.flatMap((c) => c.skills.map((skill) => ({ skill, category: c.title })));
  }, [activeCategory]);

  return (
    <section id="skills" className="py-24 bg-white dark:bg-transparent transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-base font-bold tracking-widest text-cyan-500 uppercase mb-2">Technical Expertise</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">My Skill Set</h3>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-4xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                activeCategory === cat
                  ? 'bg-cyan-500 text-white border-cyan-500'
                  : 'bg-slate-50 dark:bg-slate-900/40 dark:backdrop-blur-sm text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700/50 hover:border-cyan-500/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto min-h-[4rem]">
          <AnimatePresence mode="popLayout">
            {visibleSkills.map((item) => (
              <motion.span
                key={item.category + item.skill}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="px-4 py-2 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/40 dark:backdrop-blur-sm border border-slate-200 dark:border-slate-700/50"
              >
                {item.skill}
              </motion.span>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
