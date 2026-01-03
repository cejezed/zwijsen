import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUp, CheckCircle, ArrowRight, Compass, Pencil, MapPin, Calendar } from 'lucide-react';
import { BRAND_NAME } from '../data';
import {
  Footer,
  QuickscanOverlay,
  ContactBar
} from '../components';

export const Quickscan: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll animations
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  // Footer scroll animations
  const { scrollYProgress: footerScroll } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });
  const footerParallaxText = useTransform(footerScroll, [0, 1], [0, -1500]);
  const footerOpacity = useTransform(footerScroll, [0, 0.4], [0, 1]);

  // ContactBar opacity
  const contactBarOpacity = useTransform(scrollY, [300, 600], [0, 1]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // SEO management
  useEffect(() => {
    document.title = 'Gratis quickscan verbouwing en nieuwbouw | Architect Jules Zwijsen';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Twijfelt u over verbouw of nieuwbouw? Met een gratis quickscan krijgt u snel inzicht in haalbaarheid, kosten en vervolgstappen.');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 1000);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      {/* Quickscan Overlay */}
      <QuickscanOverlay
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      />

      {/* Contact Bar */}
      <ContactBar
        opacity={contactBarOpacity}
        onStartTraject={() => setIsInquiryOpen(true)}
      />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={scrollToTop}
          className="fixed bottom-10 left-10 z-[500] p-4 bg-black text-white rounded-full shadow-2xl hover:bg-amber-600 transition-all"
        >
          <ArrowUp size={24} />
        </motion.button>
      )}

      {/* Hero Section */}
      <motion.section
        style={{ opacity: heroOpacity }}
        className="relative h-screen flex items-center justify-center bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white overflow-hidden"
      >
        {/* Achtergrondafbeelding - plaats quickscan-hero.jpg in /public/images/ om te gebruiken */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/quickscan-hero.jpg"
            alt=""
            className="w-full h-full object-cover opacity-0"
            onLoad={(e) => e.currentTarget.classList.replace('opacity-0', 'opacity-100')}
            onError={(e) => e.currentTarget.style.display = 'none'}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
        </div>

        <div className="absolute inset-0 opacity-10 z-[1]">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-600 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="mono text-xs md:text-sm uppercase tracking-[0.6em] text-amber-500 font-black block">
              Vrijblijvend Kennismaken
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif italic leading-[0.9] tracking-tighter">
              Gratis quickscan of <br />schetsontwerp
            </h1>
            <p className="text-xl md:text-2xl text-stone-300 max-w-2xl mx-auto font-light">
              Ontdek wat er mogelijk is met uw woning of kavel
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={() => setIsInquiryOpen(true)}
              className="px-10 py-5 bg-amber-600 text-white rounded-full mono text-sm uppercase tracking-[0.3em] font-black hover:bg-amber-700 transition-all shadow-xl flex items-center gap-3"
            >
              Vraag Quickscan Aan
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => setIsInquiryOpen(true)}
              className="px-10 py-5 border-2 border-white text-white rounded-full mono text-sm uppercase tracking-[0.3em] font-black hover:bg-white hover:text-black transition-all flex items-center gap-3"
            >
              Plan Kennismaking
              <ArrowRight size={18} />
            </button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/40 mono text-xs uppercase tracking-widest"
        >
          Scroll
        </motion.div>
      </motion.section>

      {/* Intro Section */}
      <section className="py-32 px-6 md:px-12 bg-white">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="space-y-6">
            <span className="mono text-sm uppercase tracking-[0.6em] text-amber-600 font-black block">
              Persoonlijk Contact
            </span>
            <h2 className="text-4xl md:text-6xl font-serif italic text-black leading-tight">
              Laagdrempelig kennismaken
            </h2>
          </div>

          <div className="prose prose-lg max-w-none space-y-6 text-stone-700 leading-relaxed">
            <p className="text-xl md:text-2xl font-light">
              Het kiezen van een architect is persoonlijk. Daarom bieden wij laagdrempelige manieren om kennis te maken met onze aanpak.
            </p>
          </div>
        </div>
      </section>

      {/* Gratis Quickscan */}
      <section className="py-32 px-6 md:px-12 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-white p-10 border-2 border-stone-200 rounded-lg space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center text-white">
                    <Compass size={32} />
                  </div>
                  <div>
                    <p className="mono text-xs uppercase tracking-wider text-stone-500 font-bold">
                      Gratis & Vrijblijvend
                    </p>
                    <h3 className="font-serif italic text-2xl text-black">
                      Quickscan
                    </h3>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-serif italic text-xl text-black">
                    Wat krijgt u?
                  </h4>
                  <ul className="space-y-3">
                    {[
                      "Globale analyse van uw wensen",
                      "Inzicht in mogelijkheden van de locatie",
                      "Eerste indicatie van budget en haalbaarheid",
                      "Advies over vervolgstappen",
                      "Persoonlijk gesprek met Jules"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
                        <span className="text-stone-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-stone-200">
                  <p className="text-sm text-stone-600">
                    <strong className="text-black">Duur:</strong> Ongeveer 30-45 minuten
                  </p>
                  <p className="text-sm text-stone-600 mt-2">
                    <strong className="text-black">Locatie:</strong> Telefonisch, videobellen of ter plaatse
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8 order-1 lg:order-2">
              <div className="space-y-4">
                <span className="mono text-sm uppercase tracking-[0.6em] text-amber-600 font-black block">
                  Stap 1
                </span>
                <h2 className="text-4xl md:text-5xl font-serif italic text-black leading-tight">
                  Gratis quickscan
                </h2>
              </div>

              <div className="space-y-6 text-stone-700 leading-relaxed">
                <p className="text-lg">
                  Een quickscan geeft inzicht voordat u grote beslissingen neemt. Tijdens de gratis quickscan brengen wij uw wensen en de mogelijkheden van locatie en budget globaal in kaart. U krijgt snel inzicht in haalbaarheid en mogelijke vervolgstappen.
                </p>
                <p className="text-lg">
                  Dit is een vrijblijvend gesprek waarin we verkennen of we iets voor u kunnen betekenen. U zit nergens aan vast en krijgt direct waardevolle inzichten over uw project.
                </p>
              </div>

              <button
                onClick={() => setIsInquiryOpen(true)}
                className="px-10 py-5 bg-amber-600 text-white rounded-full mono text-sm uppercase tracking-[0.3em] font-black hover:bg-amber-700 transition-all shadow-xl flex items-center gap-3"
              >
                Vraag Quickscan Aan
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Wat u vaak nog niet ziet - NIEUW */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-amber-50 to-orange-50 p-10 md:p-12 border-2 border-amber-200 rounded-lg space-y-6"
          >
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center text-white shrink-0">
                <Lightbulb size={28} />
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl md:text-4xl font-serif italic text-black">
                  Wat u vaak nog niet ziet
                </h3>
                <div className="space-y-4 text-stone-700 leading-relaxed">
                  <p className="text-xl md:text-2xl font-serif italic text-red-700">
                    De grootste schade ontstaat meestal vóór de eerste offerte.
                  </p>
                  <p className="text-lg md:text-xl">
                    In een eerste gesprek komen vaak onderwerpen aan bod waar opdrachtgevers zelf nog niet aan gedacht hebben. Denk aan ruimtelijke verhoudingen, toekomstige aanpasbaarheid, regelgeving of kostenposten die later impact hebben.
                  </p>
                  <p className="text-xl font-serif italic text-amber-700">
                    Daarom is een quickscan zo waardevol: u krijgt vroeg inzicht en voorkomt dure misstappen.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vrijblijvend Schetsontwerp */}
      <section className="py-32 px-6 md:px-12 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="mono text-sm uppercase tracking-[0.6em] text-amber-600 font-black block">
                  Stap 2
                </span>
                <h2 className="text-4xl md:text-5xl font-serif italic text-black leading-tight">
                  Vrijblijvend schetsontwerp
                </h2>
              </div>

              <div className="space-y-6 text-stone-700 leading-relaxed">
                <p className="text-lg">
                  Na een kennismaking en locatiebezoek kunnen wij een eerste schetsontwerp maken. Dit ontwerp laat zien hoe uw wensen vertaald kunnen worden naar een concrete woning en vormt de basis voor een eventuele samenwerking.
                </p>
                <p className="text-lg">
                  Voorwaarde is dat het om een concreet project gaat: een duidelijke locatie, omschreven wensen en een realistisch budget. Eventuele kosten worden vooraf duidelijk besproken.
                </p>
              </div>

              <button
                onClick={() => setIsInquiryOpen(true)}
                className="px-10 py-5 border-2 border-black text-black rounded-full mono text-sm uppercase tracking-[0.3em] font-black hover:bg-black hover:text-white transition-all flex items-center gap-3"
              >
                Meer Informatie
                <ArrowRight size={18} />
              </button>
            </div>

            <div className="bg-stone-50 p-10 border-2 border-stone-200 rounded-lg space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white">
                  <Pencil size={32} />
                </div>
                <div>
                  <p className="mono text-xs uppercase tracking-wider text-stone-500 font-bold">
                    Vrijblijvend
                  </p>
                  <h3 className="font-serif italic text-2xl text-black">
                    Schetsontwerp
                  </h3>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-serif italic text-xl text-black">
                  Wat krijgt u?
                </h4>
                <ul className="space-y-3">
                  {[
                    "Eerste ontwerpidee op basis van uw wensen",
                    "Globale plattegronden en schetsen",
                    "Sfeerimpressie van het ontwerp",
                    "Toelichting op keuzes en concept",
                    "Inzicht in vervolgtraject en kosten"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
                      <span className="text-stone-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-stone-200">
                <p className="text-sm text-stone-600">
                  <strong className="text-black">Voorwaarde:</strong> Concreet project met duidelijke locatie en budget
                </p>
                <p className="text-sm text-stone-600 mt-2">
                  <strong className="text-black">Kosten:</strong> Worden vooraf besproken
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eerst zelf oriënteren */}
      <section className="py-32 px-6 md:px-12 bg-stone-900 text-white">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <span className="mono text-sm uppercase tracking-[0.6em] text-amber-500 font-black block">
              Oriëntatiefase
            </span>
            <h2 className="text-4xl md:text-5xl font-serif italic leading-tight">
              Wilt u liever eerst zelf oriënteren?
            </h2>
            <p className="text-xl text-stone-300">
              Maak gebruik van onze online tools om zelf te verkennen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur p-10 border border-white/10 rounded-lg space-y-6 hover:bg-white/10 transition-all">
              <div className="w-20 h-20 bg-amber-600 rounded-full flex items-center justify-center text-white mono font-black text-3xl">
                K
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-serif italic">
                  KavelArchitect
                </h3>
                <p className="text-stone-300 leading-relaxed">
                  Onderzoek wat er op een kavel mogelijk is volgens het bestemmingsplan. Krijg inzicht in bouwregels, hoogtes en mogelijkheden.
                </p>
                <a
                  href="https://kavelarchitect.nl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-amber-500 hover:text-amber-400 font-bold transition-colors"
                >
                  Ga naar KavelArchitect
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur p-10 border border-white/10 rounded-lg space-y-6 hover:bg-white/10 transition-all">
              <div className="w-20 h-20 bg-amber-600 rounded-full flex items-center justify-center text-white mono font-black text-3xl">
                B
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-serif italic">
                  Brikx
                </h3>
                <p className="text-stone-300 leading-relaxed">
                  Structureer uw wensen en budget voordat u aan tafel gaat met een architect. Zo bent u beter voorbereid en weet u wat u wilt.
                </p>
                <a
                  href="https://www.brikxai.nl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-amber-500 hover:text-amber-400 font-bold transition-colors"
                >
                  Ga naar Brikx
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-stone-400 italic text-lg">
              Bent u toe aan persoonlijk advies en een eerste ontwerpidee? <br />
              Dan is een quickscan of schetsontwerp de juiste stap.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 md:px-12 bg-gradient-to-br from-amber-600 to-amber-700 text-white">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-6xl font-serif italic leading-tight">
              Wilt u weten wat er mogelijk is met uw woning of kavel?
            </h2>
            <p className="text-xl md:text-2xl text-amber-100">
              Vraag een gratis quickscan aan of plan een kennismakingsgesprek
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsInquiryOpen(true)}
              className="px-10 py-5 bg-white text-amber-700 rounded-full mono text-sm uppercase tracking-[0.3em] font-black hover:bg-stone-100 transition-all shadow-xl flex items-center justify-center gap-3"
            >
              Vraag Quickscan Aan
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => setIsInquiryOpen(true)}
              className="px-10 py-5 border-2 border-white text-white rounded-full mono text-sm uppercase tracking-[0.3em] font-black hover:bg-white hover:text-amber-700 transition-all flex items-center justify-center gap-3"
            >
              Plan Kennismaking
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer
        footerRef={footerRef}
        parallaxText={footerParallaxText}
        opacity={footerOpacity}
      />
    </>
  );
};
