import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

const About: React.FC = () => {
  // State to manage image source and error status
  // Priority: 1. Local file (my-photo.jpg) -> 2. Cloud fallback -> 3. Placeholder UI
  const [imgSrc, setImgSrc] = useState('my-photo.jpg');
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    // If the local file fails, try the Google User Content link which is often more reliable
    if (imgSrc === 'my-photo.jpg') {
      setImgSrc('https://lh3.googleusercontent.com/d/1tbJT-wIx4hFew2h0v0VTkpXVmX4SShaO');
    } else {
      // If cloud link also fails, show the fallback UI
      setHasError(true);
    }
  };

  return (
    <section id="about" className="py-24 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
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
            <div className="relative group flex-shrink-0">
              {/* Gradient Glow Effect behind image */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-[2rem] blur opacity-30 group-hover:opacity-75 transition duration-500"></div>
              
              <div className="relative w-72 md:w-96 rounded-[2rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl bg-slate-800 flex items-center justify-center p-1">
                {!hasError ? (
                  <img 
                    src={imgSrc}
                    alt="Mahesh Bunage" 
                    onError={handleImageError}
                    className="w-full h-auto block transform transition-transform duration-500 group-hover:scale-105 rounded-[1.8rem]"
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
              <h2 className="text-sm font-bold tracking-widest text-cyan-500 uppercase mb-3">About Me</h2>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">Bridging Data Engineering & Generative AI</h3>
              
              <div className="space-y-5 text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                <p>
                  I am a passionate <strong>Generative AI Developer</strong> and <strong>Data Engineer</strong> with over 2 years of industry experience, currently pursuing my MSc in Artificial Intelligence at the National College of Ireland.
                </p>
                <p>
                  My professional journey includes working as a Software Engineer at Caspex Tech (consulting for Experian), where I specialized in building <strong>RAG-based chatbots</strong> and large-scale <strong>ETL pipelines</strong>. I have hands-on expertise in orchestrating workflows with Apache Airflow, processing big data with PySpark on AWS EMR, and deploying scalable infrastructure using Terraform.
                </p>
                <p>
                  I thrive at the intersection of robust data systems and intelligent models. Whether it's fine-tuning LLMs for specific business contexts or optimizing S3 storage costs through automation, I am dedicated to building impactful, production-grade AI solutions.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;