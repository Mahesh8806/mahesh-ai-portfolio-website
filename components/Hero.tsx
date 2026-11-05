import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Mail, Database, Workflow, Cpu, Server, BarChart3 } from 'lucide-react';

const PIPELINE_NODES = [
  { icon: Database, label: 'S3' },
  { icon: Workflow, label: 'Airflow' },
  { icon: Cpu, label: 'PySpark' },
  { icon: Server, label: 'Snowflake' },
  { icon: BarChart3, label: 'Serving' },
];

const Hero: React.FC = () => {
  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('projects');
    if (element) {
      const offset = 80; // Navbar height + breathing room
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      window.history.pushState(null, "", "#projects");
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden bg-slate-50 dark:bg-transparent transition-colors duration-300">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-slate-100 to-slate-200 dark:from-transparent dark:via-transparent dark:to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 z-10 relative w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:w-1/2 text-center md:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-semibold tracking-wide text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 dark:bg-cyan-900/20 rounded-full border border-cyan-500/20 dark:border-cyan-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
              Stamp 1G · No Visa Sponsorship Required · Open to Roles in Ireland
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-5 tracking-tight text-slate-900 dark:text-white leading-tight">
              Data Engineer
            </h1>
            <p className="text-xl md:text-2xl font-medium text-cyan-600 dark:text-cyan-400 mb-6">
              Building AI-ready data platforms
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
              2.5+ years building production-scale pipelines with Airflow, PySpark and AWS at Experian (via Caspex Tech).
              Now pairing that foundation with an MSc in Artificial Intelligence to build RAG systems and AI agents on top of real data.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <a
                href="#projects"
                onClick={handleScrollToProjects}
                className="px-8 py-3.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-200 font-semibold transition-colors flex items-center gap-2 group"
              >
                View Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/Mahesh-Bunage-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800 font-semibold transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </a>
            </div>

            <div className="mt-10 flex items-center gap-6 justify-center md:justify-start text-slate-500 dark:text-slate-500">
              <a href="https://github.com/Mahesh8806" target="_blank" rel="noreferrer" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"><Github className="w-6 h-6" /></a>
              <a href="https://linkedin.com/in/maheshbunage" target="_blank" rel="noreferrer" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"><Linkedin className="w-6 h-6" /></a>
              <a href="mailto:mahesh.bunage21@gmail.com" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"><Mail className="w-6 h-6" /></a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-1/2 relative flex flex-col items-center gap-5 w-full"
          >
            <div className="absolute inset-0 bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-3xl -z-10"></div>

            {/* Data pipeline diagram */}
            <div className="relative w-full max-w-sm md:max-w-md bg-white/70 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-5 backdrop-blur-xl">
              <p className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-semibold mb-5">
                Daily Pipeline
              </p>
              <div className="relative flex items-start justify-between">
                <div className="absolute top-6 left-0 right-0 h-px bg-slate-200 dark:bg-slate-800"></div>
                <motion.div
                  className="absolute top-[22px] w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.7)]"
                  animate={{ left: ['2%', '96%'] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
                ></motion.div>
                {PIPELINE_NODES.map((node) => (
                  <div key={node.label} className="flex flex-col items-center gap-2 z-10 w-1/5">
                    <div className="w-11 h-11 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-cyan-500 shadow-sm">
                      <node.icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium text-center">{node.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Code panel */}
            <div className="relative w-full max-w-sm md:max-w-md bg-slate-900/95 backdrop-blur-xl border border-slate-700 p-5 rounded-2xl shadow-2xl text-left overflow-hidden">
              <div className="flex gap-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
              </div>
              <div className="space-y-1.5 font-mono text-[11px] sm:text-xs text-slate-300 overflow-x-auto">
                <p className="whitespace-nowrap"><span className="text-purple-400">from</span> airflow <span className="text-purple-400">import</span> DAG</p>
                <p className="whitespace-nowrap"><span className="text-purple-400">import</span> pyspark.sql <span className="text-purple-400">as</span> spark</p>
                <p className="text-slate-500 whitespace-nowrap"># Daily ETL: S3 to Snowflake</p>
                <p className="whitespace-nowrap"><span className="text-purple-400">with</span> DAG(<span className="text-green-400">'daily_ingest'</span>, schedule=<span className="text-green-400">'@daily'</span>):</p>
                <p className="pl-4 whitespace-nowrap">transform = PySparkOperator(</p>
                <p className="pl-8 whitespace-nowrap">task_id=<span className="text-green-400">'pyspark_transform'</span></p>
                <p className="pl-4 whitespace-nowrap">)</p>
                <div className="mt-3 p-2 bg-black rounded border-l-2 border-cyan-500">
                  <p className="text-cyan-400 whitespace-nowrap">{'>'} 109 pipelines running</p>
                  <p className="text-green-400 whitespace-nowrap">{'>'} Status: Healthy</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
