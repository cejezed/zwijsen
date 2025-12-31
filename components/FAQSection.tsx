
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '../data';
import type { FAQ } from '../data/types';

interface FAQSectionProps {
  faqs?: FAQ[];
}

export const FAQSection: React.FC<FAQSectionProps> = ({ faqs = FAQS }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Genereer JSON-LD voor Google SEO
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      // Only remove if script is still in the DOM
      if (script.parentNode === document.head) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const getFaqColors = (colorType: string, isActive: boolean) => {
    if (!isActive) return "bg-white border-stone-100 text-black";
    switch (colorType) {
      case 'amber': return "bg-amber-900 border-amber-800 text-white";
      case 'stone': return "bg-stone-900 border-stone-800 text-white";
      case 'emerald': return "bg-emerald-950 border-emerald-900 text-white";
      case 'blue': return "bg-slate-900 border-slate-800 text-white";
      default: return "bg-black border-black text-white";
    }
  };

  const getTagColors = (colorType: string, isActive: boolean) => {
    if (!isActive) return "border-stone-50 text-stone-800";
    switch (colorType) {
      case 'amber': return "border-amber-400/30 text-amber-200";
      case 'emerald': return "border-emerald-400/30 text-emerald-200";
      case 'blue': return "border-blue-400/30 text-blue-200";
      default: return "border-white/20 text-white/80";
    }
  };

  return (
    <section className="bg-stone-50 py-56 relative z-10" id="info">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-40 space-y-8">
          <span className="mono text-amber-900 text-sm tracking-[1em] block uppercase font-black underline decoration-amber-600 decoration-4 underline-offset-8">FAQ / Zekerheid</span>
          <h3 className="text-6xl md:text-[8vw] font-serif italic tracking-tighter text-black leading-none">Uw Vragen, <br />mijn expertise.</h3>
          <p className="max-w-2xl text-stone-500 italic text-xl font-light">Wij geloven in volledige transparantie. Hieronder vindt u antwoorden op de meest gestelde vragen over het ontwerpproces en de realisatie van uw droomhuis.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {faqs.map((faq, idx) => {
            const isActive = activeFaq === idx;
            return (
              <motion.div
                key={idx}
                layout
                onClick={() => setActiveFaq(isActive ? null : idx)}
                className={`relative p-12 md:p-16 border-2 transition-all duration-500 cursor-pointer overflow-hidden ${getFaqColors(faq.color, isActive)} ${isActive ? 'shadow-2xl scale-[1.02] z-20' : 'shadow-sm z-10'}`}
              >
                <div className="space-y-10">
                  <span className={`inline-block mono text-[11px] uppercase tracking-widest px-5 py-2 rounded-full border-2 font-black transition-colors ${getTagColors(faq.color, isActive)}`}>{faq.tag}</span>
                  <div className="flex justify-between items-start gap-8">
                    <h4 className="text-2xl md:text-4xl font-serif leading-[1.15] tracking-tight">{faq.q}</h4>
                    <motion.div animate={{ rotate: isActive ? 180 : 0 }} className={`p-2 rounded-full border ${isActive ? 'border-white/20' : 'border-stone-100'}`}><ChevronDown size={24} /></motion.div>
                  </div>
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pt-12 border-t border-white/10 mt-12"
                      >
                        <p className="text-xl md:text-2xl font-light leading-relaxed opacity-90 italic">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
