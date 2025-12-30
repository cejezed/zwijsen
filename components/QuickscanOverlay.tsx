
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, MoveRight, Send, Home, Euro, MapPin, Lightbulb } from 'lucide-react';

interface QuickscanFormProps {
  onSubmitted?: () => void;
}

export const QuickscanForm: React.FC<QuickscanFormProps> = ({ onSubmitted }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '', // nieuwbouw, verbouwing, uitbreiding, advies
    location: '',
    hasLocation: '', // ja, nee, zoeken
    budget: '', // budget ranges
    timeframe: '', // timeframe options
    wensen: '',
    website: '' // honeypot
  });
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Check honeypot
      if (formData.website) {
        throw new Error('Spam detected');
      }

      // Compose message from form data
      const message = `
GRATIS QUICKSCAN AANVRAAG

Type project: ${formData.projectType}
Locatie: ${formData.hasLocation === 'ja' ? formData.location : `Nog geen locatie (${formData.hasLocation})`}
Budget: ${formData.budget}
Gewenste planning: ${formData.timeframe}

Wensen en ideeën:
${formData.wensen}
      `.trim();

      const trimmedData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        message: message,
        subject: 'Gratis Quickscan Aanvraag',
        formType: 'quickscan',
        // Extra metadata voor tracking
        projectType: formData.projectType,
        budget: formData.budget,
        timeframe: formData.timeframe,
        hasLocation: formData.hasLocation,
        location: formData.location || undefined
      };

      // Send to Vercel serverless function (same endpoint as contact form)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trimmedData),
      });

      let data: { error?: string; success?: boolean; message?: string };
      try {
        data = await response.json();
      } catch (parseError) {
        console.error('Failed to parse response as JSON:', parseError);
        throw new Error('Er ging iets mis bij het verwerken van het antwoord.');
      }

      if (!response.ok) {
        throw new Error(data.error || 'Er ging iets mis bij het verzenden.');
      }

      // Success!
      setIsSubmitted(true);

      // Close overlay and reset form after 3 seconds
      setTimeout(() => {
        if (onSubmitted) onSubmitted();
        setIsSubmitted(false);
        setStep(1);
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectType: '',
          location: '',
          hasLocation: '',
          budget: '',
          timeframe: '',
          wensen: '',
          website: ''
        });
        setPrivacyAccepted(false);
      }, 3000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Er ging iets mis. Probeer het opnieuw.');
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (step < 4) setStep(prev => prev + 1);
  };

  const prevStep = () => setStep(prev => prev - 1);

  // Check if current step is valid
  const isStepValid = () => {
    if (step === 1) return formData.projectType !== '';
    if (step === 2) return formData.hasLocation !== '' && (formData.hasLocation !== 'ja' || formData.location.trim().length > 0);
    if (step === 3) return formData.budget !== '' && formData.wensen.trim().length > 0;
    if (step === 4) return formData.name.trim().length > 0 && formData.email.trim().length > 0 && privacyAccepted;
    return false;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 min-h-[600px]">
      {/* Sidebar */}
      <div className="md:col-span-4 bg-gradient-to-br from-amber-50 to-orange-50 p-12 border-r border-amber-100 flex flex-col justify-between">
        <div className="space-y-8">
          <span className="mono text-sm uppercase tracking-widest text-amber-700 font-black">Quickscan Stap 0{step}</span>
          <h4 className="text-4xl font-serif italic text-black leading-tight">Gratis Quickscan</h4>
          <p className="text-stone-700 text-lg font-light leading-relaxed">
            In een vrijblijvend gesprek verkennen we samen uw plannen, haalbaarheid en vervolgstappen.
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex gap-2">
            {[1, 2, 3, 4].map(s => (
              <div key={s} className={`h-1.5 flex-1 transition-colors ${s <= step ? 'bg-amber-600' : 'bg-stone-200'}`} />
            ))}
          </div>
          <span className="mono text-sm uppercase tracking-widest text-stone-500 font-bold">Quickscan Aanvraag</span>
        </div>
      </div>

      {/* Form Area */}
      <div className="md:col-span-8 p-12 md:p-20 flex items-center bg-white">
        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center w-full py-12 space-y-6"
            >
              <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={40} />
              </div>
              <h5 className="text-4xl font-serif italic text-black">Quickscan aangevraagd!</h5>
              <p className="text-xl text-stone-700 font-light max-w-sm mx-auto">
                We nemen binnen 24 uur contact met u op om een vrijblijvend gesprek in te plannen.
              </p>
            </motion.div>
          ) : (
            <form key={`step-${step}`} onSubmit={handleSubmit} className="w-full space-y-12">
              {/* Honeypot field */}
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={e => setFormData({...formData, website: e.target.value})}
                className="absolute opacity-0 pointer-events-none"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              {/* STEP 1: Project Type */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-white">
                        <Home size={24} />
                      </div>
                      <label className="mono text-sm uppercase tracking-[0.3em] text-stone-600 font-black">
                        Waar denkt u aan?
                      </label>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {[
                        { value: 'nieuwbouw', label: 'Nieuwbouw op eigen kavel', desc: 'Een geheel nieuwe woning bouwen' },
                        { value: 'verbouwing', label: 'Verbouwing bestaande woning', desc: 'Ingrijpende aanpassingen of uitbreiding' },
                        { value: 'uitbreiding', label: 'Uitbreiding / aanbouw', desc: 'Bestaande woning uitbreiden' },
                        { value: 'advies', label: 'Nog niet zeker / oriënterend', desc: 'Eerst verkennen wat mogelijk is' }
                      ].map(option => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setFormData({...formData, projectType: option.value})}
                          className={`p-6 border-2 rounded-lg text-left transition-all hover:border-amber-600 ${
                            formData.projectType === option.value
                              ? 'border-amber-600 bg-amber-50'
                              : 'border-stone-200 bg-white'
                          }`}
                        >
                          <p className="font-serif italic text-xl text-black mb-1">{option.label}</p>
                          <p className="text-sm text-stone-600">{option.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!isStepValid()}
                    className="flex items-center justify-center gap-8 px-12 py-7 bg-black text-white mono text-sm uppercase tracking-[0.4em] font-black hover:bg-amber-600 transition-all shadow-xl rounded-full w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black"
                  >
                    <span>Volgende</span>
                    <MoveRight size={20} />
                  </button>
                </motion.div>
              )}

              {/* STEP 2: Location */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-white">
                        <MapPin size={24} />
                      </div>
                      <label className="mono text-sm uppercase tracking-[0.3em] text-stone-600 font-black">
                        Heeft u al een locatie?
                      </label>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {[
                        { value: 'ja', label: 'Ja, locatie is bekend' },
                        { value: 'zoeken', label: 'Nog zoekende naar kavel/woning' },
                        { value: 'nee', label: 'Nog geen locatie' }
                      ].map(option => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setFormData({...formData, hasLocation: option.value})}
                          className={`p-6 border-2 rounded-lg text-left transition-all hover:border-amber-600 ${
                            formData.hasLocation === option.value
                              ? 'border-amber-600 bg-amber-50'
                              : 'border-stone-200 bg-white'
                          }`}
                        >
                          <p className="font-serif italic text-xl text-black">{option.label}</p>
                        </button>
                      ))}
                    </div>

                    {formData.hasLocation === 'ja' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-4"
                      >
                        <label className="mono text-xs uppercase tracking-[0.3em] text-stone-500 font-black">
                          Waar is de locatie?
                        </label>
                        <input
                          type="text"
                          value={formData.location}
                          onChange={e => setFormData({...formData, location: e.target.value})}
                          className="w-full border-b-2 border-stone-300 py-6 text-2xl font-serif italic focus:border-amber-600 outline-none transition-all bg-transparent placeholder:text-stone-400"
                          placeholder="Plaats of gemeente..."
                          autoFocus
                        />
                      </motion.div>
                    )}
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-10 py-7 border-2 border-stone-300 mono text-sm uppercase tracking-widest font-black hover:bg-stone-50 rounded-full transition-colors"
                    >
                      Terug
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!isStepValid()}
                      className="flex items-center justify-center gap-8 px-12 py-7 bg-black text-white mono text-sm uppercase tracking-[0.4em] font-black hover:bg-amber-600 transition-all shadow-xl rounded-full flex-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black"
                    >
                      <span>Volgende</span>
                      <MoveRight size={20} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Budget & Wensen */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-white">
                        <Euro size={24} />
                      </div>
                      <label className="mono text-sm uppercase tracking-[0.3em] text-stone-600 font-black">
                        Indicatief budget
                      </label>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { value: '< €250k', label: 'Tot €250.000' },
                        { value: '€250k - €500k', label: '€250.000 - €500.000' },
                        { value: '€500k - €750k', label: '€500.000 - €750.000' },
                        { value: '€750k - €1M', label: '€750.000 - €1.000.000' },
                        { value: '> €1M', label: 'Meer dan €1.000.000' },
                        { value: 'onbekend', label: 'Nog niet duidelijk' }
                      ].map(option => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setFormData({...formData, budget: option.value})}
                          className={`p-5 border-2 rounded-lg text-left transition-all hover:border-amber-600 ${
                            formData.budget === option.value
                              ? 'border-amber-600 bg-amber-50'
                              : 'border-stone-200 bg-white'
                          }`}
                        >
                          <p className="font-serif italic text-lg text-black">{option.label}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-white">
                        <Lightbulb size={24} />
                      </div>
                      <label className="mono text-sm uppercase tracking-[0.3em] text-stone-600 font-black">
                        Gewenste planning
                      </label>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { value: 'oriënterend', label: 'Nog oriënterend' },
                        { value: 'binnen 6 maanden', label: 'Binnen 6 maanden' },
                        { value: '6-12 maanden', label: 'Binnen 6-12 maanden' },
                        { value: '> 12 maanden', label: 'Meer dan 12 maanden' }
                      ].map(option => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setFormData({...formData, timeframe: option.value})}
                          className={`p-5 border-2 rounded-lg text-left transition-all hover:border-amber-600 ${
                            formData.timeframe === option.value
                              ? 'border-amber-600 bg-amber-50'
                              : 'border-stone-200 bg-white'
                          }`}
                        >
                          <p className="font-serif italic text-lg text-black">{option.label}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="mono text-sm uppercase tracking-[0.3em] text-stone-600 font-black">
                      Vertel over uw wensen en ideeën
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.wensen}
                      onChange={e => setFormData({...formData, wensen: e.target.value})}
                      className="w-full border-2 border-stone-300 rounded-lg p-6 text-lg font-serif italic focus:border-amber-600 outline-none transition-all bg-transparent resize-none placeholder:text-stone-400"
                      placeholder="Waar droomt u van? Wat is belangrijk voor u?"
                      maxLength={2000}
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-10 py-7 border-2 border-stone-300 mono text-sm uppercase tracking-widest font-black hover:bg-stone-50 rounded-full transition-colors"
                    >
                      Terug
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!isStepValid()}
                      className="flex items-center justify-center gap-8 px-12 py-7 bg-black text-white mono text-sm uppercase tracking-[0.4em] font-black hover:bg-amber-600 transition-all shadow-xl rounded-full flex-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black"
                    >
                      <span>Naar contactgegevens</span>
                      <MoveRight size={20} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: Contact Details */}
              {step === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="space-y-4">
                    <label className="mono text-sm uppercase tracking-[0.3em] text-stone-600 font-black">
                      Uw naam *
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full border-b-2 border-stone-300 py-6 text-2xl font-serif italic focus:border-amber-600 outline-none transition-all bg-transparent placeholder:text-stone-400"
                      placeholder="Uw volledige naam..."
                      autoComplete="name"
                      autoFocus
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="mono text-sm uppercase tracking-[0.3em] text-stone-600 font-black">
                      E-mailadres *
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full border-b-2 border-stone-300 py-6 text-2xl font-serif italic focus:border-amber-600 outline-none transition-all bg-transparent placeholder:text-stone-400"
                      placeholder="uw@email.nl"
                      autoComplete="email"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="mono text-sm uppercase tracking-[0.3em] text-stone-500 font-black">
                      Telefoonnummer *
                    </label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full border-b-2 border-stone-300 py-6 text-xl font-serif italic focus:border-amber-600 outline-none transition-all bg-transparent placeholder:text-stone-400"
                      placeholder="06 12 34 56 78"
                      autoComplete="tel"
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Privacy checkbox */}
                  <div className="pt-4 space-y-4">
                    <label className="flex items-start gap-4 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={privacyAccepted}
                        onChange={e => setPrivacyAccepted(e.target.checked)}
                        className="mt-1 w-5 h-5 rounded border-2 border-stone-300 text-amber-600 focus:ring-2 focus:ring-amber-600 focus:ring-offset-2 cursor-pointer"
                        disabled={isSubmitting}
                        required
                      />
                      <span className="text-sm text-stone-600 leading-relaxed">
                        Door te verzenden gaat u akkoord dat wij uw gegevens gebruiken om contact met u op te nemen over uw quickscan aanvraag.
                        <a href="/privacy" target="_blank" className="text-amber-600 hover:text-amber-700 underline ml-1">
                          Lees ons privacybeleid
                        </a>
                      </span>
                    </label>
                  </div>

                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-800 text-sm">{error}</p>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={prevStep}
                      disabled={isSubmitting}
                      className="px-10 py-7 border-2 border-stone-300 mono text-sm uppercase tracking-widest font-black hover:bg-stone-50 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Terug
                    </button>
                    <button
                      type="submit"
                      disabled={!isStepValid() || isSubmitting}
                      className="flex items-center justify-center gap-8 px-12 py-7 bg-amber-600 text-white mono text-sm uppercase tracking-[0.3em] font-black hover:bg-black transition-all shadow-xl rounded-full disabled:opacity-50 disabled:cursor-not-allowed flex-1"
                    >
                      <span>{isSubmitting ? 'Bezig met verzenden...' : 'Verstuur Aanvraag'}</span>
                      {!isSubmitting && <Send size={20} />}
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

export const QuickscanOverlay: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] bg-black/40 backdrop-blur-xl flex items-center justify-center p-6 md:p-12"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 50, scale: 0.95 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 50, scale: 0.95 }}
            className="w-full max-w-5xl bg-white relative overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.2)] rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-amber-100">
              <motion.div
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-1/3 h-full bg-amber-600"
              />
            </div>
            <button
              onClick={onClose}
              className="absolute top-8 right-8 p-4 text-stone-400 hover:text-black transition-colors z-20"
            >
              <X size={32} />
            </button>
            <QuickscanForm onSubmitted={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
