import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Database, Code2, Cloud } from 'lucide-react';
import { SKILLS } from '../constants.ts';

const iconMap: Record<string, React.ReactNode> = {
  BrainCircuit: <BrainCircuit className="w-8 h-8" />,
  Database: <Database className="w-8 h-8" />,
  Code2: <Code2 className="w-8 h-8" />,
  Cloud: <Cloud className="w-8 h-8" />,
};

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-base font-bold tracking-widest text-purple-500 uppercase mb-2">Technical Expertise</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">My Skill Set</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SKILLS.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="mb-6 p-3 bg-white dark:bg-slate-800 rounded-xl inline-block text-cyan-500 group-hover:text-purple-500 transition-colors shadow-sm">
                {iconMap[category.iconName]}
              </div>
              <h4 className="text-xl font-bold mb-4 text-slate-900 dark:text-white group-hover:text-cyan-400 transition-colors">
                {category.title}
              </h4>
              <ul className="space-y-2">
                {category.skills.map((skill) => (
                  <li key={skill} className="flex items-center text-slate-600 dark:text-slate-400 text-sm">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;