import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';

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
      // Update URL hash without default jump behavior
      window.history.pushState(null, "", "#projects");
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden bg-slate-50 dark:bg-black transition-colors duration-300">
      {/* Background Abstract Elements */}
      <div className="absolute inset-0 z-0">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-slate-100 to-slate-200 dark:from-slate-900 dark:via-[#0a0a0a] dark:to-black"></div>
         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 dark:bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 z-10 relative w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:w-1/2 text-center md:text-left"
          >
            <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-cyan-600 dark:text-cyan-400 uppercase bg-cyan-500/10 dark:bg-cyan-900/30 rounded-full border border-cyan-500/20 dark:border-cyan-500/30 backdrop-blur-sm">
              Open to Opportunities
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-slate-900 dark:text-white leading-tight">
              Generative AI <span className="text-slate-400 dark:text-slate-500">&</span> <br />
              <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-500 dark:to-purple-600 bg-clip-text text-transparent">
                Data Engineer
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
              Specializing in RAG, Large Language Models, and Scalable Cloud Architectures. 
              Currently pursuing MSc Artificial Intelligence at NCI.
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
                href="./Mahesh-Bunage-AI-Resume.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800 font-semibold transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download CV
              </a>
            </div>

            <div className="mt-10 flex items-center gap-6 justify-center md:justify-start text-slate-500 dark:text-slate-500">
              <a href="https://github.com/Mahesh8806" target="_blank" rel="noreferrer" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"><Github className="w-6 h-6" /></a>
              <a href="https://www.linkedin.com/in/mahesh-bunage-541988217?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noreferrer" className="hover:text-blue-600 dark:hover:text-blue-500 transition-colors"><Linkedin className="w-6 h-6" /></a>
              <a href="mailto:mahesh.bunage21@gmail.com" className="hover:text-purple-600 dark:hover:text-purple-500 transition-colors"><Mail className="w-6 h-6" /></a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-1/2 relative flex justify-center"
          >
             {/* Abstract AI Visualization */}
             {/* Adjusted size to w-72 on mobile to fit better in small viewports */}
             <div className="relative w-72 h-72 md:w-[500px] md:h-[500px]">
                {/* Decorative circles */}
                <div className="absolute inset-0 border border-slate-200 dark:border-slate-800 rounded-full animate-[spin_10s_linear_infinite]"></div>
                <div className="absolute inset-10 border border-slate-200 dark:border-slate-800/50 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-purple-500/10 dark:from-cyan-500/20 dark:to-purple-500/20 rounded-full blur-3xl"></div>
                
                {/* Central Tech Graphic Placeholder */}
                {/* Increased width to 90% on mobile, reduced padding to p-4, reduced text size to text-[10px] */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900/90 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-700 p-4 md:p-6 rounded-2xl shadow-2xl w-[90%] md:w-3/4 max-w-sm overflow-hidden text-left">
                   <div className="flex gap-2 mb-4">
                     <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500"></div>
                     <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500"></div>
                     <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500"></div>
                   </div>
                   <div className="space-y-1.5 md:space-y-2 font-mono text-[10px] sm:text-xs md:text-sm text-slate-300 overflow-x-auto">
                     <p className="whitespace-nowrap"><span className="text-purple-400">from</span> langchain.chains <span className="text-purple-400">import</span> RetrievalQA</p>
                     <p className="whitespace-nowrap"><span className="text-purple-400">import</span> pyspark.sql <span className="text-purple-400">as</span> spark</p>
                     <p className="text-slate-500 whitespace-nowrap"># Initialize RAG Pipeline</p>
                     <p className="whitespace-nowrap">qa_chain = RetrievalQA.from_chain_type(</p>
                     <p className="pl-4 whitespace-nowrap">llm=ChatOpenAI(<span className="text-green-400">'gpt-4'</span>),</p>
                     <p className="pl-4 whitespace-nowrap">retriever=milvus_store.as_retriever()</p>
                     <p>)</p>
                     <div className="mt-3 md:mt-4 p-2 bg-black rounded border-l-2 border-cyan-500">
                       <p className="text-cyan-400 whitespace-nowrap">{'>'} System: Pipeline Optimized</p>
                       <p className="text-green-400 whitespace-nowrap">{'>'} Status: Serving Requests</p>
                     </div>
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