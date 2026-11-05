import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Hammer, Activity, Gauge } from 'lucide-react';
import { APPROACH } from '../constants.ts';

const iconMap: Record<string, React.ReactNode> = {
  Compass: <Compass className="w-6 h-6" />,
  Hammer: <Hammer className="w-6 h-6" />,
  Activity: <Activity className="w-6 h-6" />,
  Gauge: <Gauge className="w-6 h-6" />,
};

const Approach: React.FC = () => {
  return (
    <section id="approach" className="py-24 bg-white dark:bg-transparent transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-base font-bold tracking-widest text-cyan-500 uppercase mb-2">How I Work</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Engineering Approach</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {APPROACH.map((step, index) => (
            <motion.div
              key={step.stage}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="relative p-6 bg-white dark:bg-slate-900/40 dark:backdrop-blur-xl border border-slate-200 dark:border-slate-700/50 rounded-2xl"
            >
              <span className="absolute top-5 right-5 text-xs font-bold text-slate-300 dark:text-slate-700">
                0{index + 1}
              </span>
              <div className="w-11 h-11 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 mb-5">
                {iconMap[step.iconName]}
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">{step.stage}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Approach;
