import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 bg-slate-950 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-4">
        <div className="text-sm text-center">
          © {new Date().getFullYear()} AI Engineer Portfolio. All rights reserved.
        </div>
        
        <div className="flex items-center gap-6">
          <a href="https://github.com/mahesh-bunage" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors"><Github className="w-5 h-5" /></a>
          <a href="https://linkedin.com/in/mahesh-bunage" target="_blank" rel="noreferrer" className="hover:text-blue-500 transition-colors"><Linkedin className="w-5 h-5" /></a>
          <a href="mailto:mahesh.bunage21@gmail.com" className="hover:text-purple-500 transition-colors"><Mail className="w-5 h-5" /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;