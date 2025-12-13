import React, { useState } from 'react';
import { Send, Mail, MapPin, Phone, Loader2, CheckCircle, AlertCircle, ArrowUpRight } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      // Connects to local FastAPI server on port 8000
      const response = await fetch('http://127.0.0.1:8000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Safely check if response is JSON before parsing
      const contentType = response.headers.get("content-type");
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        // If it's not JSON, it might be a generic server error page or empty
        if (!response.ok) throw new Error(response.statusText);
        data = {}; 
      }

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setErrorMessage(data.detail || 'Failed to send message.');
      }
    } catch (error: any) {
      console.error('Submission Error:', error);
      setStatus('error');
      setErrorMessage('Could not connect to the backend server. Ensure server.py is running on port 8000.');
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-sm font-bold tracking-widest text-cyan-500 uppercase mb-2">Get In Touch</h2>
            <h3 className="text-3xl md:text-4xl font-bold">Let's Discuss AI Solutions</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-12 bg-white dark:bg-[#0f0f0f] rounded-3xl p-8 md:p-12 shadow-xl border border-slate-200 dark:border-slate-800">
            <div>
               <h4 className="text-2xl font-bold mb-6">Contact Information</h4>
               <p className="text-slate-500 mb-8 leading-relaxed">
                 I am currently based in Dublin and open to opportunities in Generative AI, Data Engineering, and Machine Learning.
               </p>
               
               <div className="space-y-6">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-500">
                     <Mail className="w-5 h-5" />
                   </div>
                   <div>
                     <p className="text-xs text-slate-500 uppercase font-semibold">Email</p>
                     <a href="mailto:mahesh.bunage21@gmail.com" className="hover:text-cyan-400 transition-colors">mahesh.bunage21@gmail.com</a>
                   </div>
                 </div>

                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                     <Phone className="w-5 h-5" />
                   </div>
                   <div>
                     <p className="text-xs text-slate-500 uppercase font-semibold">Phone</p>
                     <p>+353 894670746</p>
                   </div>
                 </div>
                 
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500">
                     <MapPin className="w-5 h-5" />
                   </div>
                   <div>
                     <p className="text-xs text-slate-500 uppercase font-semibold">Location</p>
                     <p>Dublin, Ireland</p>
                   </div>
                 </div>
               </div>
            </div>

            <div className="relative">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-500 mb-1">Name</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all"
                    placeholder="Recruiter / Client Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-500 mb-1">Email</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all"
                    placeholder="email@company.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-500 mb-1">Message</label>
                  <textarea 
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all resize-none"
                    placeholder="I'm interested in your profile..."
                  />
                </div>
                
                <button 
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className={`w-full py-3.5 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
                    status === 'success' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/25'
                  }`}
                >
                  {status === 'loading' ? (
                    <>Sending... <Loader2 className="w-4 h-4 animate-spin" /></>
                  ) : status === 'success' ? (
                    <>Message Sent! <CheckCircle className="w-4 h-4" /></>
                  ) : (
                    <>Send Message <Send className="w-4 h-4" /></>
                  )}
                </button>

                {status === 'error' && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex flex-col gap-2 text-red-500 text-sm">
                    <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <p className="font-semibold">Submission Failed</p>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400">
                       {errorMessage}
                    </p>
                    <a 
                        href={`mailto:mahesh.bunage21@gmail.com?subject=Inquiry from Portfolio&body=${encodeURIComponent(formData.message + '\n\nFrom: ' + formData.name + ' (' + formData.email + ')')}`}
                        className="flex items-center gap-1 text-cyan-600 dark:text-cyan-400 font-bold hover:underline mt-1"
                    >
                        Click here to send manually via Email Client <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;