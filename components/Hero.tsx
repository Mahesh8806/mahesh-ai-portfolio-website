import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background Abstract Elements */}
      <div className="absolute inset-0 z-0">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0a0a] to-black"></div>
         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 z-10 relative w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:w-1/2 text-center md:text-left"
          >
            <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-cyan-400 uppercase bg-cyan-900/30 rounded-full border border-cyan-500/30 backdrop-blur-sm">
              Open to Opportunities
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white leading-tight">
              Generative AI <span className="text-slate-500">&</span> <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Data Engineer
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
              Specializing in RAG, Large Language Models, and Scalable Cloud Architectures. 
              Currently pursuing MSc Artificial Intelligence at NCI.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <a 
                href="#projects"
                className="px-8 py-3.5 rounded-full bg-white text-black font-semibold hover:bg-slate-200 transition-colors flex items-center gap-2 group"
              >
                View Projects 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="./resume.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full border border-slate-700 text-white font-semibold hover:bg-slate-800 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download CV
              </a>
            </div>

            <div className="mt-10 flex items-center gap-6 justify-center md:justify-start text-slate-500">
              <a href="https://github.com/mahesh-bunage" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors"><Github className="w-6 h-6" /></a>
              <a href="https://linkedin.com/in/mahesh-bunage" target="_blank" rel="noreferrer" className="hover:text-blue-500 transition-colors"><Linkedin className="w-6 h-6" /></a>
              <a href="mailto:mahesh.bunage21@gmail.com" className="hover:text-purple-500 transition-colors"><Mail className="w-6 h-6" /></a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-1/2 relative flex justify-center"
          >
             {/* Abstract AI Visualization */}
             <div className="relative w-80 h-80 md:w-[500px] md:h-[500px]">
                {/* Decorative circles */}
                <div className="absolute inset-0 border border-slate-800 rounded-full animate-[spin_10s_linear_infinite]"></div>
                <div className="absolute inset-10 border border-slate-800/50 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
                
                {/* Central Tech Graphic Placeholder */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900/80 backdrop-blur-xl border border-slate-700 p-6 rounded-2xl shadow-2xl w-3/4 max-w-sm">
                   <div className="flex gap-2 mb-4">
                     <div className="w-3 h-3 rounded-full bg-red-500"></div>
                     <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                     <div className="w-3 h-3 rounded-full bg-green-500"></div>
                   </div>
                   <div className="space-y-2 font-mono text-xs md:text-sm text-slate-300">
                     <p><span className="text-purple-400">from</span> langchain.chains <span className="text-purple-400">import</span> RetrievalQA</p>
                     <p><span className="text-purple-400">import</span> pyspark.sql <span className="text-purple-400">as</span> spark</p>
                     <p className="text-slate-500"># Initialize RAG Pipeline</p>
                     <p>qa_chain = RetrievalQA.from_chain_type(</p>
                     <p className="pl-4">llm=ChatOpenAI(<span className="text-green-400">'gpt-4'</span>),</p>
                     <p className="pl-4">retriever=milvus_store.as_retriever()</p>
                     <p>)</p>
                     <div className="mt-4 p-2 bg-slate-950 rounded border-l-2 border-cyan-500">
                       <p className="text-cyan-400"> System: Pipeline Optimized</p>
                       <p className="text-green-400"> Status: Serving Requests</p>
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