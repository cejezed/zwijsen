
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, MoveRight, Send } from 'lucide-react';

interface FormProps {
  inline?: boolean;
  onSubmitted?: () => void;
}

export const InquiryForm: React.FC<FormProps> = ({ inline = false, onSubmitted }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', email: '', story: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Send to Vercel serverless function
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.story,
          subject: 'Nieuw contactverzoek via website',
          region: window.location.pathname.includes('loenen') ? 'Loenen aan de Vecht' :
                  window.location.pathname.includes('loosdrecht') ? 'Loosdrecht' : undefined
        }),
      });

      let data: { error?: string; success?: boolean; message?: string };
      try {
        data = await response.json();
      } catch (parseError) {
        console.error('Failed to parse response as JSON:', parseError);
        throw new Error('De server gaf een onverwacht antwoord. Dit formulier werkt alleen in productie.');
      }

      if (!response.ok) {
        throw new Error(data.error || 'Er ging iets mis');
      }

      // Success!
      setIsSubmitted(true);
      if (onSubmitted) setTimeout(onSubmitted, 3000);

      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setStep(1);
        setFormData({ name: '', email: '', story: '' });
      }, 5000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Er ging iets mis. Probeer het opnieuw.');
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (step === 1 && formData.story) setStep(2);
    if (step === 2 && formData.name) setStep(3);
  };

  const prevStep = () => setStep(prev => prev - 1);

  return (
    <div className={`w-full ${inline ? "" : "grid grid-cols-1 md:grid-cols-12 min-h-[500px]"}`}>
      {!inline && (
        <div className="md:col-span-4 bg-stone-50 p-12 border-r border-stone-100 flex flex-col justify-between">
          <div className="space-y-8">
            <span className="mono text-sm uppercase tracking-widest text-amber-900 font-black">Intake Fase 0{step}</span>
            <h4 className="text-4xl font-serif italic text-black leading-tight">Vertaal uw visie naar realiteit.</h4>
            <p className="text-stone-700 text-lg font-light leading-relaxed italic">De start van een uniek samenspel tussen uw wens and ons ontwerp.</p>
          </div>
          <div className="space-y-4">
            <div className="flex gap-2">
              {[1, 2, 3].map(s => <div key={s} className={`h-1.5 w-12 transition-colors ${s <= step ? 'bg-amber-600' : 'bg-stone-200'}`} />)}
            </div>
            <span className="mono text-sm uppercase tracking-widest text-stone-500 font-bold">DOSSIER v.2025</span>
          </div>
        </div>
      )}

      <div className={inline ? "w-full" : "md:col-span-8 p-12 md:p-20 flex items-center bg-white"}>
        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div key="success" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center w-full py-12 space-y-6">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto"><CheckCircle2 size={40} /></div>
              <h5 className="text-4xl font-serif italic text-black">Ontvangen.</h5>
              <p className="text-xl text-stone-700 font-light max-w-sm mx-auto italic">Jules heeft uw droom ontvangen and neemt spoedig contact op.</p>
            </motion.div>
          ) : (
            <form key={`step-${step}`} onSubmit={handleSubmit} className="w-full space-y-12">
              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 md:space-y-8">
                  <div className="space-y-4">
                    <label className="mono text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] text-stone-600 font-black">Stap 01: Wat is uw droom?</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.story}
                      onChange={e => setFormData({...formData, story: e.target.value})}
                      className="w-full border-b-2 border-stone-300 py-4 md:py-6 text-xl md:text-2xl lg:text-3xl font-serif italic focus:border-amber-600 outline-none transition-all bg-transparent resize-none placeholder:text-stone-500"
                      placeholder="Vertel kort over uw visie, kavel of plannen.."
                    />
                  </div>
                  <button type="button" onClick={nextStep} className="flex items-center justify-center gap-3 md:gap-8 px-6 md:px-12 py-5 md:py-7 bg-black text-white mono text-[10px] md:text-sm uppercase tracking-[0.2em] md:tracking-[0.4em] font-black hover:bg-amber-600 transition-all shadow-xl rounded-full w-full md:w-auto">
                    <span className="whitespace-nowrap">Volgende Stap</span>
                    <MoveRight size={16} className="md:w-5 md:h-5"/>
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 md:space-y-8">
                  <div className="space-y-4">
                    <label className="mono text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] text-stone-600 font-black">Stap 02: Met wie spreken we?</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full border-b-2 border-stone-300 py-4 md:py-6 text-xl md:text-2xl lg:text-3xl font-serif italic focus:border-amber-600 outline-none transition-all bg-transparent placeholder:text-stone-500"
                      placeholder="Uw volledige naam.."
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                    <button type="button" onClick={prevStep} className="px-6 md:px-10 py-4 md:py-7 border-2 border-stone-300 mono text-[10px] md:text-sm uppercase tracking-[0.2em] md:tracking-widest font-black hover:bg-stone-50 rounded-full transition-colors">Terug</button>
                    <button type="button" onClick={nextStep} className="flex items-center justify-center gap-3 md:gap-8 px-6 md:px-12 py-4 md:py-7 bg-black text-white mono text-[10px] md:text-sm uppercase tracking-[0.2em] md:tracking-[0.4em] font-black hover:bg-amber-600 transition-all shadow-xl rounded-full flex-1">
                      <span className="whitespace-nowrap">Contactgegevens</span>
                      <MoveRight size={16} className="md:w-5 md:h-5"/>
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 md:space-y-8">
                  <div className="space-y-4">
                    <label className="mono text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] text-stone-600 font-black">Stap 03: Hoe bereiken we u?</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full border-b-2 border-stone-300 py-4 md:py-6 text-xl md:text-2xl lg:text-3xl font-serif italic focus:border-amber-600 outline-none transition-all bg-transparent placeholder:text-stone-500"
                      placeholder="Uw e-mail adres.."
                      disabled={isSubmitting}
                    />
                  </div>

                  {error && (
                    <div className="p-3 md:p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-800 text-xs md:text-sm">{error}</p>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                    <button
                      type="button"
                      onClick={prevStep}
                      disabled={isSubmitting}
                      className="px-6 md:px-10 py-4 md:py-7 border-2 border-stone-300 mono text-[10px] md:text-sm uppercase tracking-[0.2em] md:tracking-widest font-black hover:bg-stone-50 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Terug
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center justify-center gap-3 md:gap-8 px-6 md:px-12 py-4 md:py-7 bg-amber-600 text-white mono text-[10px] md:text-sm uppercase tracking-[0.15em] md:tracking-[0.3em] font-black hover:bg-black transition-all shadow-xl rounded-full disabled:opacity-50 disabled:cursor-not-allowed flex-1"
                    >
                      <span className="whitespace-nowrap">{isSubmitting ? 'Bezig met verzenden...' : 'Verstuur Aanvraag'}</span>
                      {!isSubmitting && <Send size={16} className="md:w-5 md:h-5"/>}
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
          className="fixed inset-0 z-[300] bg-black/40 backdrop-blur-xl flex items-center justify-center p-6 md:p-12"
        >
          <motion.div 
            initial={{ y: 50, scale: 0.95 }} animate={{ y: 0, scale: 1 }} exit={{ y: 50, scale: 0.95 }}
            className="w-full max-w-4xl bg-white relative overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.2)] rounded-3xl"
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
