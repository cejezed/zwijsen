
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, MoveRight, Send } from 'lucide-react';

interface FormProps {
  inline?: boolean;
  onSubmitted?: () => void;
  dark?: boolean;
}

export const InquiryForm: React.FC<FormProps> = ({ inline = false, onSubmitted, dark = false }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', email: '', story: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (onSubmitted) setTimeout(onSubmitted, 3000);
    setTimeout(() => {
      setIsSubmitted(false);
      setStep(1);
      setFormData({ name: '', email: '', story: '' });
    }, 5000);
  };

  const nextStep = () => {
    if (step === 1 && formData.story) setStep(2);
    if (step === 2 && formData.name) setStep(3);
  };

  const prevStep = () => setStep(prev => prev - 1);

  const containerClass = inline 
    ? "w-full" 
    : "grid grid-cols-1 md:grid-cols-12 min-h-[500px] bg-white rounded-3xl overflow-hidden shadow-2xl";

  const textColor = dark ? "text-white" : "text-black";
  const labelColor = dark ? "text-stone-400" : "text-stone-600";
  const borderColor = dark ? "border-white/20" : "border-stone-300";

  return (
    <div className={containerClass}>
      {!inline && (
        <div className="md:col-span-4 bg-stone-50 p-12 border-r border-stone-100 flex flex-col justify-between">
          <div className="space-y-8">
            <span className="mono text-sm uppercase tracking-widest text-amber-900 font-black">Intake Fase 0{step}</span>
            <h4 className="text-4xl font-serif italic text-black leading-tight">Vertaal uw visie naar realiteit.</h4>
            <p className="text-stone-700 text-lg font-light leading-relaxed italic">De start van een uniek samenspel tussen uw wens en ons ontwerp.</p>
          </div>
          <div className="space-y-4">
            <div className="flex gap-2">
              {[1, 2, 3].map(s => <div key={s} className={`h-1.5 w-12 transition-colors ${s <= step ? 'bg-amber-600' : 'bg-stone-200'}`} />)}
            </div>
            <span className="mono text-sm uppercase tracking-widest text-stone-500 font-bold">DOSSIER v.2025</span>
          </div>
        </div>
      )}

      <div className={inline ? "w-full" : "md:col-span-8 p-12 md:p-20 flex items-center"}>
        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center w-full py-12 space-y-6">
              <motion.div 
                initial={{ rotate: -10, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                className="w-24 h-24 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20"
              >
                <CheckCircle2 size={48} />
              </motion.div>
              <h5 className={`text-4xl font-serif italic ${textColor}`}>Dossier Ontvangen.</h5>
              <p className="text-xl text-stone-400 font-light max-w-sm mx-auto italic">Jules heeft uw droom ontvangen en neemt binnen 48 uur contact met u op.</p>
            </motion.div>
          ) : (
            <form key={`step-${step}`} onSubmit={handleSubmit} className="w-full space-y-12">
              {step === 1 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                  <div className="space-y-4">
                    <label className={`mono text-[11px] uppercase tracking-[0.4em] ${labelColor} font-black`}>STAP 01: UW VISIE</label>
                    <textarea 
                      autoFocus 
                      required 
                      rows={3}
                      value={formData.story} 
                      onChange={e => setFormData({...formData, story: e.target.value})} 
                      className={`w-full border-b-2 ${borderColor} py-6 text-2xl md:text-3xl font-serif italic focus:border-amber-500 outline-none transition-all bg-transparent resize-none placeholder:text-stone-500 ${textColor}`} 
                      placeholder="Vertel kort over uw plannen of kavel.." 
                    />
                  </div>
                  <button type="button" onClick={nextStep} className="flex items-center gap-8 px-12 py-6 bg-amber-600 text-white mono text-[11px] uppercase tracking-[0.4em] font-black hover:bg-black transition-all shadow-xl rounded-full group">
                    Volgende <MoveRight size={20} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                  <div className="space-y-4">
                    <label className={`mono text-[11px] uppercase tracking-[0.4em] ${labelColor} font-black`}>STAP 02: UW NAAM</label>
                    <input 
                      autoFocus 
                      required 
                      type="text" 
                      value={formData.name} 
                      onChange={e => setFormData({...formData, name: e.target.value})} 
                      className={`w-full border-b-2 ${borderColor} py-6 text-3xl font-serif italic focus:border-amber-500 outline-none transition-all bg-transparent placeholder:text-stone-500 ${textColor}`} 
                      placeholder="Uw volledige naam.." 
                    />
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <button type="button" onClick={prevStep} className={`px-10 py-6 border-2 ${borderColor} mono text-[11px] uppercase tracking-widest font-black hover:bg-white/5 rounded-full transition-colors ${textColor}`}>Terug</button>
                    <button type="button" onClick={nextStep} className="flex items-center gap-8 px-12 py-6 bg-amber-600 text-white mono text-[11px] uppercase tracking-[0.4em] font-black hover:bg-black transition-all shadow-xl rounded-full group">
                      Gegevens <MoveRight size={20} className="group-hover:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                  <div className="space-y-4">
                    <label className={`mono text-[11px] uppercase tracking-[0.4em] ${labelColor} font-black`}>STAP 03: CONTACT</label>
                    <input 
                      autoFocus 
                      required 
                      type="email" 
                      value={formData.email} 
                      onChange={e => setFormData({...formData, email: e.target.value})} 
                      className={`w-full border-b-2 ${borderColor} py-6 text-3xl font-serif italic focus:border-amber-500 outline-none transition-all bg-transparent placeholder:text-stone-500 ${textColor}`} 
                      placeholder="Uw e-mail adres.." 
                    />
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <button type="button" onClick={prevStep} className={`px-10 py-6 border-2 ${borderColor} mono text-[11px] uppercase tracking-widest font-black hover:bg-white/5 rounded-full transition-colors ${textColor}`}>Terug</button>
                    <button type="submit" className="flex items-center gap-8 px-12 py-6 bg-amber-600 text-white mono text-[11px] uppercase tracking-[0.4em] font-black hover:bg-black transition-all shadow-xl rounded-full group">
                      Verzenden <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              )}
            </form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export const InquiryOverlay: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-xl flex items-center justify-center p-6 md:p-12"
        >
          <motion.div 
            initial={{ y: 50, scale: 0.95, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 50, scale: 0.95, opacity: 0 }}
            className="w-full max-w-4xl bg-white relative overflow-hidden shadow-[0_0_120px_rgba(0,0,0,0.5)] rounded-[2.5rem]"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-stone-100">
              <motion.div animate={{ x: ["-100%", "100%"] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="w-1/3 h-full bg-amber-600" />
            </div>
            <button onClick={onClose} className="absolute top-8 right-8 p-4 text-stone-400 hover:text-black transition-colors z-20"><X size={32} /></button>
            <InquiryForm onSubmitted={() => setTimeout(onClose, 3000)} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
