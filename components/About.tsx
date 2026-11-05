import React, { useState } from 'react';
import { motion } from 'framer-motion';

const STATS = [
  { value: '2.5+', label: 'Years at Experian' },
  { value: '109', label: 'Production Pipelines' },
  { value: 'TBs', label: 'Processed Daily' },
];

const About: React.FC = () => {
  const [hasError, setHasError] = useState(false);

  return (
    <section id="about" className="py-24 bg-slate-50 dark:bg-transparent text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-center justify-center">

            {/* Image Container */}
            <div className="relative flex-shrink-0">
              <div className="relative w-72 md:w-80 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-slate-800 flex items-center justify-center">
                {!hasError ? (
                  <img
                    src="/my-photo.jpg"
                    alt="Mahesh Bunage"
                    onError={() => setHasError(true)}
                    className="w-full h-auto block"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-500 py-24 w-full h-full">
                    <div className="w-24 h-24 bg-slate-700 rounded-full flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold text-slate-300">MB</span>
                    </div>
                    <p className="text-sm font-medium">Mahesh Bunage</p>
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="w-full md:max-w-xl text-center md:text-left">
              <h2 className="text-base font-bold tracking-widest text-cyan-500 uppercase mb-3">About Me</h2>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">Data Engineering, Grounded in Production</h3>

              <div className="space-y-5 text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                <p>
                  I'm a <strong>Data Engineer</strong> with 2.5+ years of experience at Experian (via Caspex Tech), working within a team running roughly 109 production Airflow pipelines that process terabytes of data daily.
                </p>
                <p>
                  My day-to-day has centered on building and maintaining <strong>PySpark jobs against terabyte-scale Hive tables</strong>, ingesting multi-format data from S3 across multiple teams, and loading it into Snowflake for downstream reporting — with partitioning, bucketing and Parquet/ORC storage keeping it fast. I've also automated infrastructure with Terraform and supported production pipelines directly, diagnosing failures to keep reporting available for stakeholders.
                </p>
                <p>
                  Alongside that, I'm completing an <strong>MSc in Artificial Intelligence</strong> in Dublin, which has let me extend the same data-engineering discipline into building RAG pipelines and tool-calling AI agents — treating AI applications as something that still needs solid data underneath them to be reliable.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
                {STATS.map((stat) => (
                  <div key={stat.label} className="text-center md:text-left">
                    <p className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                    <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
