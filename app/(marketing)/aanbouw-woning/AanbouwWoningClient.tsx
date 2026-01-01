'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowUp,
  CheckCircle,
  ShieldCheck,
  Ruler,
  FileText,
  Wallet,
} from 'lucide-react';

import { PROCESS_STEPS } from '../../../data';
import { Footer, InquiryOverlay, QuickscanOverlay, ContactBar } from '../../../components';

const FAQS = [
  {
    q: 'Kan een aanbouw schade veroorzaken aan mijn woning?',
    a: 'Ja, als fundering en draagstructuur niet goed worden meegenomen. Scheurvorming en verzakking ontstaan vaak door onderschatting van de bestaande bouw.',
  },
  {
    q: 'Heb ik een vergunning nodig voor een aanbouw?',
    a: 'Niet altijd, maar ook vergunningsvrije aanbouwen moeten voldoen aan het omgevingsplan, constructieve eisen en het Bouwbesluit.',
  },
  {
    q: 'Wat kost een aanbouw aan een woning?',
    a: 'De kosten hangen sterk samen met fundering, doorbraken, detaillering en installaties. Een aanbouw is meer dan extra vierkante meters.',
  },
  {
    q: 'Wanneer schakel ik een architect in?',
    a: 'Idealiter vóórdat je aannemers benadert, zodat ontwerp, haalbaarheid en regelgeving eerst goed zijn afgestemd.',
  },
];

export const AanbouwWoningClient: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isQuickscanOpen, setIsQuickscanOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const contactBarOpacity = useTransform(scrollY, [300, 600], [0, 1]);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 1000);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <InquiryOverlay isOpen={isInquiryOpen} onClose={() => setIsInquiryOpen(false)} />
      <QuickscanOverlay isOpen={isQuickscanOpen} onClose={() => setIsQuickscanOpen(false)} />

      {/* HERO */}
      <motion.section
        style={{ opacity: heroOpacity }}
        className="relative h-screen flex items-center justify-center bg-stone-900 text-white"
      >
        <div className="max-w-5xl text-center space-y-8 px-6">
          <span className="mono uppercase tracking-[0.6em] text-amber-500 text-sm">
            Aanbouw woning
          </span>
          <h1 className="text-5xl md:text-7xl font-serif italic">
            Uitbreiden zonder risico.
          </h1>
          <p className="text-xl text-stone-300">
            Een aanbouw vraagt meer dan extra meters. Constructie, regelgeving en
            aansluiting op de bestaande woning bepalen of het goed gaat – of mis.
          </p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setIsQuickscanOpen(true)}
              className="px-8 py-4 bg-amber-600 rounded-full uppercase tracking-wider"
            >
              Gratis quickscan
            </button>
            <button
              onClick={() => setIsInquiryOpen(true)}
              className="px-8 py-4 border border-white rounded-full uppercase tracking-wider"
            >
              Kennismaking
            </button>
          </div>
        </div>
      </motion.section>

      {/* WAAROM HET MISGAAT */}
      <section className="py-28 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 px-6">
          {[
            'Fundering niet afgestemd op bestaande woning',
            'Onvoldoende aandacht voor doorbraken',
            'Vergunningsregels verkeerd geïnterpreteerd',
            'Techniek en isolatie pas laat meegenomen',
          ].map((t, i) => (
            <div key={i} className="flex gap-4">
              <CheckCircle className="text-amber-600 mt-1" />
              <p className="text-lg text-stone-700">{t}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AANPAK */}
      <section className="py-28 bg-stone-900 text-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
          {[
            {
              icon: Ruler,
              title: 'Constructieve logica',
              desc: 'Fundering, draagstructuur en aansluitdetails zijn leidend.',
            },
            {
              icon: FileText,
              title: 'Vergunning & regels',
              desc: 'Niet alleen vergunningsvrij of -plichtig, maar juridisch correct.',
            },
            {
              icon: Wallet,
              title: 'Kostenbeheersing',
              desc: 'Keuzes vooraf inzichtelijk, geen verrassingen tijdens de bouw.',
            },
          ].map((i, idx) => (
            <div key={idx} className="bg-white/5 p-8 rounded-xl">
              <i.icon className="text-amber-500" />
              <h3 className="mt-4 text-xl font-serif italic">{i.title}</h3>
              <p className="text-stone-300 mt-2">{i.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROCES */}
      <section className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-serif italic mb-12 text-center">
            Van eerste idee tot veilige uitvoering
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {PROCESS_STEPS.slice(0, 6).map((step) => (
              <div key={step.id} className="border p-6">
                <h3 className="font-serif italic">{step.title}</h3>
                <p className="text-stone-600 mt-2">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28 bg-stone-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-serif italic text-center mb-10">
            Veelgestelde vragen
          </h2>
          {FAQS.map((f, i) => (
            <details key={i} className="mb-4 bg-white p-6 border">
              <summary className="font-serif italic cursor-pointer">{f.q}</summary>
              <p className="mt-2 text-stone-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <Footer footerRef={footerRef} />
      <ContactBar opacity={contactBarOpacity} onStartTraject={() => setIsInquiryOpen(true)} />

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-24 right-6 p-4 bg-black text-white rounded-full"
          >
            <ArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};
