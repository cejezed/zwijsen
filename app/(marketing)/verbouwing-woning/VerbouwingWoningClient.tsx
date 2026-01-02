'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowUp,
  CheckCircle,
  Users,
  Clock,
  Lightbulb,
  ShieldCheck,
  Ruler,
  Wallet,
  FileText,
  Home,
  Hammer,
  Scale,
} from 'lucide-react';

import { PROCESS_STEPS } from '../../../data';
import { Footer, InquiryOverlay, QuickscanOverlay, ContactBar } from '../../../components';

/**
 * Verbouwing woning – conversiegedreven type-pagina
 * ------------------------------------------------
 * Doel: bezoekers met serieuze verbouw-intentie vertrouwen geven:
 * - risico’s vroeg zichtbaar (constructie/vocht/vergunning/welstand)
 * - keuzes concreet maken (PvE + prioriteiten)
 * - rust in kosten en uitvoering (eenduidige details, minder meerwerk)
 *
 * Belangrijk:
 * - Vervang beelden in /public/images/verbouwing/
 * - Voeg later echte cases toe (optioneel: project-grid zoals nieuwbouw-villa)
 */

const FAQS = [
  {
    tag: 'VERGUNNING',
    q: 'Heb ik een vergunning nodig voor een verbouwing?',
    a: 'Soms kan (een deel) vergunningsvrij, maar "vergunningsvrij" is niet "regelvrij". Ook dan gelden technische eisen (Bbl), burenrecht en vaak welstand. In de quickscan bepalen we welke route het meest zeker is, zodat u niet achteraf hoeft te repareren.',
  },
  {
    tag: 'RISICO',
    q: 'Kunnen er scheuren of verzakkingen ontstaan door een verbouwing?',
    a: 'Ja. De meeste schade ontstaat door onderschatting van de bestaande bouw: fundering, draagstructuur en aansluitdetails. Daarom toetsen we constructie en detaillering vroeg en leggen we het eenduidig vast voor de uitvoering.',
  },
  {
    tag: 'KOSTEN',
    q: 'Wat kost een woningverbouwing?',
    a: 'De kosten hangen vooral af van doorbraken, fundering, installaties, isolatie-ambities en afwerkingsniveau. We maken vroeg inzichtelijk welke keuzes de grootste kostendrivers zijn, zodat u kunt prioriteren en realistisch begroten.',
  },
  {
    tag: 'TIMING',
    q: 'Wanneer schakel ik het beste een architect in?',
    a: 'Het liefst vóórdat u offertes opvraagt. Dan sturen we eerst op indeling, haalbaarheid, constructie en regelgeving, zodat aannemers hetzelfde uitgangspunt prijzen en u minder verrassingen krijgt.',
  },
  {
    tag: 'WELSTAND',
    q: 'Hoe voorkom ik gedoe met welstand of monumenten?',
    a: 'Door vroeg te toetsen, een helder verhaal te bouwen en de juiste vormtaal te kiezen (geen “boter-nog-vis”). Bij complexe situaties werkt vooroverleg of een omgevingstafel vaak het snelst.',
  },
];

export const VerbouwingWoningClient: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isQuickscanOpen, setIsQuickscanOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const contactBarOpacity = useTransform(scrollY, [300, 600], [0, 1]);

  const { scrollYProgress: footerScroll } = useScroll({
    target: footerRef,
    offset: ['start end', 'end end'],
  });
  const footerParallaxText = useTransform(footerScroll, [0, 1], [0, -1500]);
  const footerOpacity = useTransform(footerScroll, [0, 0.4], [0, 1]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 1000);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <InquiryOverlay isOpen={isInquiryOpen} onClose={() => setIsInquiryOpen(false)} />
      <QuickscanOverlay isOpen={isQuickscanOpen} onClose={() => setIsQuickscanOpen(false)} />

      {/* HERO */}
      <motion.section
        style={{ opacity: heroOpacity }}
        className="relative h-screen flex items-center justify-center bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="https://www.zwijsen.net/wp-content/uploads/2022/10/zandvoort-2a.jpg"
            alt="Verwoening woning architect - foto zandvoort moderne verbouwing duurzame woning nieuwbouw comfort"
            className="w-full h-full object-cover opacity-40 transition-opacity duration-1000"
            onLoad={(e) => {
              e.currentTarget.classList.remove('opacity-40');
              e.currentTarget.classList.add('opacity-100');
            }}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/80" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 text-center space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="mono text-xs md:text-sm uppercase tracking-[0.6em] text-amber-500 font-black block">
              Verbouwing woning
            </span>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif italic leading-[0.9] tracking-tighter">
              Verbouwen met zekerheid.<br />Geen verrassingen achteraf.
            </h1>

            <p className="text-xl md:text-2xl text-stone-300 max-w-4xl mx-auto font-light leading-relaxed">
              Een goede verbouwing voelt na oplevering alsof het altijd zo bedoeld was.
              Dat lukt alleen als ontwerp, constructie, techniek, vergunningen en uitvoering vanaf dag één dezelfde taal spreken.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={() => setIsQuickscanOpen(true)}
              className="px-10 py-5 bg-amber-600 text-white rounded-full mono text-sm uppercase tracking-[0.3em] font-black hover:bg-amber-700 transition-all shadow-xl flex items-center gap-3"
            >
              Gratis Quickscan
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => setIsInquiryOpen(true)}
              className="px-10 py-5 border-2 border-white text-white rounded-full mono text-sm uppercase tracking-[0.3em] font-black hover:bg-white hover:text-black transition-all flex items-center gap-3"
            >
              Kennismaking
              <ArrowRight size={18} />
            </button>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 max-w-5xl mx-auto">
            {[
              { icon: ShieldCheck, label: 'Risico’s vroeg zichtbaar' },
              { icon: Wallet, label: 'Grip op kosten & keuzes' },
              { icon: FileText, label: 'Eenduidelijke uitvoering' },
            ].map((b, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm p-5 rounded-lg border border-white/15"
              >
                <b.icon className="text-amber-500" size={22} />
                <p className="mono text-[11px] uppercase tracking-wider text-white font-bold">{b.label}</p>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/40 mono text-xs uppercase tracking-widest"
        >
          Scroll
        </motion.div>
      </motion.section>

      {/* 1) Herkenning: waarom verbouwingen ontsporen */}
      <section className="py-28 md:py-32 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <span className="mono text-sm uppercase tracking-[0.6em] text-amber-600 font-black block">
              Waar het misgaat
            </span>
            <h2 className="text-4xl md:text-5xl font-serif italic text-black leading-tight">
              Verbouwen is geen optelsom van “extra meters”
            </h2>
            <p className="text-xl text-stone-700 leading-relaxed">
              Bij bestaande bouw heeft u te maken met historie: funderingen, draagstructuren, onverwachte leidingen,
              vochtgedrag, scheefstand en soms monument- of welstandskaders. Als u dat pas tijdens de uitvoering ontdekt,
              krijgt u gedoe: vertraging, meerwerk en onrust.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Doorbraken zonder plan',
                description:
                  'Een open leefruimte is vaak de wens, maar draaglijnen en stabiliteit moeten kloppen. Anders wordt een doorbraak een constructieve puzzel op de bouwplaats.',
              },
              {
                title: 'Isoleren zonder bouwfysica',
                description:
                  'Verkeerde opbouw kan vochtproblemen en koudebruggen veroorzaken. Comfort vraagt om juiste lagen, details en ventilatie—niet alleen “meer isolatie”.',
              },
              {
                title: 'Vergunningsvrij ≠ regelvrij',
                description:
                  'Ook als iets vergunningsvrij lijkt, gelden technische eisen (Bbl), burenrecht en vaak welstand. De valkuilen zitten in de details en interpretatie.',
              },
              {
                title: 'Offertes die niet vergelijkbaar zijn',
                description:
                  'Als het ontwerp en de scope niet scherp zijn, prijzen aannemers appels met peren. Dat lijkt goedkoop—totdat stelposten en “onvoorzien” gaan stapelen.',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-stone-50 p-8 border border-stone-200 hover:border-amber-600 transition-all"
              >
                <div className="flex items-start gap-4">
                  <CheckCircle className="text-amber-600 shrink-0 mt-1" size={24} />
                  <div className="space-y-3">
                    <h3 className="font-serif italic text-2xl text-black">{item.title}</h3>
                    <p className="text-stone-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => setIsQuickscanOpen(true)}
              className="px-10 py-5 bg-stone-900 text-white rounded-full mono text-sm uppercase tracking-[0.3em] font-black hover:bg-stone-800 transition-all shadow-xl inline-flex items-center gap-3"
            >
              Check mijn verbouwing
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* 2) Value proposition: onze manier van werken */}
      <section className="py-28 md:py-32 px-6 md:px-12 bg-stone-900 text-white">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <span className="mono text-sm uppercase tracking-[0.6em] text-amber-500 font-black block">
              Zo brengen we rust
            </span>
            <h2 className="text-4xl md:text-5xl font-serif italic leading-tight">
              Ontwerp, risico en uitvoering in één lijn
            </h2>
            <p className="text-xl text-stone-300 leading-relaxed">
              Mijn rol is meer dan ontwerpen: ik wil dat uw verbouwing technisch klopt, juridisch houdbaar is,
              én voorspelbaar gebouwd kan worden. Dat vraagt een proces waarin keuzes vroeg scherp worden gemaakt
              en details eenduidig worden vastgelegd.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Ruler,
                title: 'Bestaande bouw doorgronden',
                desc: 'Draagstructuur, fundering, doorsnedes en aansluitdetails. Eerst begrijpen, dan ingrijpen.',
              },
              {
                icon: Scale,
                title: 'Regelstrategie die zekerheid geeft',
                desc: 'Vergunningsroute, welstand/monumenten en burenrecht. Geen “gokken”, maar onderbouwd kiezen.',
              },
              {
                icon: Hammer,
                title: 'Eenduidig voor de uitvoering',
                desc: 'Heldere scope, technische omschrijvingen en details. Minder interpretatie = minder meerwerk.',
              },
            ].map((c, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-amber-500/60 transition-all"
              >
                <c.icon className="text-amber-500" size={30} />
                <h3 className="font-serif italic text-2xl mt-5">{c.title}</h3>
                <p className="text-stone-300 leading-relaxed mt-4">{c.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => setIsInquiryOpen(true)}
              className="px-10 py-5 bg-amber-600 text-white rounded-full mono text-sm uppercase tracking-[0.3em] font-black hover:bg-amber-700 transition-all shadow-xl inline-flex items-center gap-3"
            >
              Plan kennismaking
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* 3) Wat maakt een verbouwing geslaagd? (met context + bullets) */}
      <section className="py-28 md:py-32 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <span className="mono text-sm uppercase tracking-[0.6em] text-amber-600 font-black block">
              Kwaliteit
            </span>
            <h2 className="text-4xl md:text-5xl font-serif italic text-black leading-tight">
              Wat maakt een verbouwing écht geslaagd?
            </h2>
            <p className="text-xl text-stone-700 leading-relaxed">
              Een geslaagde verbouwing maakt uw huis beter in gebruik én waardevaster—zonder dat u later denkt:
              "hadden we dit maar anders gedaan." Daarom stuur ik vroeg op onderstaande punten.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-stone-50 p-10 border border-stone-200">
              <ul className="space-y-5">
                {[
                  'Nieuwe ruimte op de juiste plek: licht, uitzicht, routing en rust.',
                  'Doorbraken die constructief kloppen (en uitvoerbaar zijn zonder improvisatie).',
                  'Goede bouwfysica: isolatie, ventilatie en vochtgedrag in balans.',
                  'Heldere overgang oud–nieuw: materialisatie, detaillering en aansluitingen.',
                  'Installaties die ondersteunend blijven en geen ruimte “opeisen”.',
                  'Scope en keuzes vastgelegd: minder stelposten, minder meerwerk, minder discussie.',
                ].map((t, idx) => (
                  <li key={idx} className="flex items-start gap-4 text-stone-700">
                    <CheckCircle className="text-amber-600 shrink-0 mt-1" size={22} />
                    <span className="text-lg leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 pt-8 border-t border-stone-200">
                <p className="mono text-xs uppercase tracking-wider text-amber-600 font-black">
                  Praktijkles
                </p>
                <p className="text-stone-700 leading-relaxed mt-3">
                  Soms zit het verschil niet in “meer glas” of “modern”, maar in de logica van de plek.
                  Ik heb een situatie meegemaakt waar een uitbouw-ontwerp strandde bij de commissie
                  omdat het ontwerp “boter nog vis” was—en pas daarna werd opnieuw gekeken naar de
                  echte kwaliteit: de meest gebruikte ruimte hoort vaak aan de kant met het beste uitzicht
                  en de meeste beleving.
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden border border-stone-200 bg-stone-100 min-h-[520px]">
              <img
                src="https://www.zwijsen.net/wp-content/uploads/2022/10/duurzaam-wonen-zandvoort-moderne-villa-verbouw-architect.jpg.jpg"
                alt="Verbouwing woning detail: aansluiting oud en nieuw, licht en materialisatie"
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  if (e.currentTarget.parentElement) {
                    e.currentTarget.parentElement.style.background =
                      'linear-gradient(135deg, #f5f5f4 0%, #e7e5e4 100%)';
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0" />
              <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm p-6 shadow-xl max-w-md">
                <p className="mono text-xs uppercase tracking-wider text-amber-600 font-black">
                  Verbouwing woning
                </p>
                <p className="text-xl font-serif italic text-black mt-2">
                  Beter wonen, zonder compromissen in techniek en uitvoering.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4) PvE / Scope – geef de pagina “ruggengraat” */}
      <section className="py-28 md:py-32 px-6 md:px-12 bg-stone-50">
        <div className="max-w-6xl mx-auto space-y-14">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <span className="mono text-sm uppercase tracking-[0.6em] text-amber-600 font-black block">
              Helderheid
            </span>
            <h2 className="text-4xl md:text-5xl font-serif italic text-black leading-tight">
              Programma van Eisen: de snelste route naar een rustige verbouwing
            </h2>
            <p className="text-xl text-stone-700 leading-relaxed">
              Veel verbouwingen worden duur door onduidelijke scope. Daarom starten we met het vastleggen van wensen,
              budget en locatie/regeldruk. Dat vormt de basis voor ontwerp, offertes en vergunning.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Home,
                title: 'Wensen & routines',
                desc: 'Hoe leeft u nu, wat wringt er, en wat moet straks beter? Daaruit volgt de ruimtelijke logica.',
              },
              {
                icon: Wallet,
                title: 'Budget & prioriteiten',
                desc: 'Welke keuzes zijn “must-have” en wat kan later? Prioriteren voorkomt bijsturen onder druk.',
              },
              {
                icon: FileText,
                title: 'Locatie & regels',
                desc: 'Omgevingsplan, welstand, burenrecht en technische eisen. Zo kiest u de juiste vergunningsroute.',
              },
            ].map((b, idx) => (
              <div
                key={idx}
                className="bg-white p-8 border border-stone-200 hover:border-amber-600 transition-all"
              >
                <b.icon className="text-amber-600" size={28} />
                <h3 className="font-serif italic text-2xl text-black mt-4">{b.title}</h3>
                <p className="text-stone-600 leading-relaxed mt-3">{b.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => setIsQuickscanOpen(true)}
              className="px-10 py-5 bg-stone-900 text-white rounded-full mono text-sm uppercase tracking-[0.3em] font-black hover:bg-stone-800 transition-all shadow-xl inline-flex items-center gap-3"
            >
              Start met quickscan
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* 5) Kosten & haalbaarheid */}
      <section className="py-28 md:py-32 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <span className="mono text-sm uppercase tracking-[0.6em] text-amber-600 font-black block">
              Kosten
            </span>
            <h2 className="text-4xl md:text-5xl font-serif italic text-black leading-tight">
              Waar de kosten bij verbouwing écht door worden bepaald
            </h2>
            <p className="text-xl text-stone-700 leading-relaxed">
              Een verbouwing is vaak complexer dan nieuwbouw: u werkt met bestaande beperkingen én u wil comfort
              en kwaliteit omhoog brengen. Daarom is het essentieel om vroeg de kostendrivers te herkennen.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Doorbraken & constructie',
                desc: 'Staal, lateien, stabiliteit en funderingsingrepen. Dit vraagt ontwerpkeuzes die uitvoerbaar zijn.',
              },
              {
                title: 'Schil & bouwfysica',
                desc: 'Isoleren, kierdichting en ventilatie horen samen. Goed detailwerk voorkomt vocht- en comfortproblemen.',
              },
              {
                title: 'Techniek & afwerking',
                desc: 'Keukens/badkamers/maatwerk en installaties bepalen veel van de bouwsom. Vroeg keuzes maken houdt het beheersbaar.',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-stone-50 p-8 border border-stone-200 hover:border-amber-600 transition-all"
              >
                <h3 className="font-serif italic text-2xl text-black">{item.title}</h3>
                <p className="text-stone-600 leading-relaxed mt-4">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <a
              href="/kosten"
              className="px-10 py-5 border-2 border-stone-900 text-stone-900 rounded-full mono text-sm uppercase tracking-[0.3em] font-black hover:bg-stone-900 hover:text-white transition-all inline-flex items-center gap-3"
            >
              Lees over kosten & budget
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* 6) Werkwijze */}
      <section id="werkwijze-section" className="py-28 md:py-32 px-6 md:px-12 bg-stone-900 text-white">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <span className="mono text-sm uppercase tracking-[0.6em] text-amber-500 font-black block">Werkwijze</span>
            <h2 className="text-4xl md:text-5xl font-serif italic leading-tight">
              Van eerste idee tot voorspelbare uitvoering
            </h2>
            <p className="text-xl text-stone-300">
              Een gestructureerd proces met duidelijke momenten van keuze, toetsing en besluitvorming.
              Bij complexe situaties kiezen we vaak voor vroeg vooroverleg (bijvoorbeeld een omgevingstafel) zodat u later niet vastloopt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROCESS_STEPS.slice(0, 6).map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="relative p-8 bg-white/5 border border-white/10 hover:border-amber-500/60 transition-all group rounded-xl"
              >
                <div className="absolute -top-4 left-8 bg-amber-600 text-white px-4 py-2 mono text-xs font-black">
                  {step.id}
                </div>
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <h3 className="font-serif italic text-xl text-white group-hover:text-amber-200 transition-colors">
                      {step.title}
                    </h3>
                    <p className="mono text-xs uppercase tracking-wider text-white/60 font-bold">{step.subtitle}</p>
                  </div>
                  <p className="text-white/75 leading-relaxed text-sm">{step.description}</p>
                  {step.deliverables && (
                    <div className="pt-4 border-t border-white/10">
                      <p className="mono text-xs uppercase tracking-wider text-white/50 font-bold mb-2">Oplevering</p>
                      <ul className="space-y-1">
                        {step.deliverables.map((deliverable, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2 text-sm text-white/70">
                            <CheckCircle size={14} className="text-amber-500 shrink-0 mt-0.5" />
                            <span>{deliverable}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => setIsInquiryOpen(true)}
              className="px-10 py-5 bg-amber-600 text-white rounded-full mono text-sm uppercase tracking-[0.3em] font-black hover:bg-amber-700 transition-all shadow-xl inline-flex items-center gap-3"
            >
              Plan kennismaking
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* 7) Match / kwalificatie */}
      <section className="py-28 md:py-32 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto space-y-14">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <span className="mono text-sm uppercase tracking-[0.6em] text-amber-600 font-black block">Match</span>
            <h2 className="text-4xl md:text-5xl font-serif italic text-black leading-tight">
              Voor wie dit wél en niet past
            </h2>
            <p className="text-xl text-stone-700">
              Duidelijkheid werkt twee kanten op. Zo weet u snel of onze werkwijze bij u past.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-stone-50 border border-stone-200 p-10">
              <h3 className="font-serif italic text-2xl text-black">Dit past bij u als u:</h3>
              <ul className="mt-6 space-y-4">
                {[
                  'zekerheid wilt over constructie, techniek en vergunningen;',
                  'keuzes en scope vooraf helder wilt hebben (minder meerwerk);',
                  'waarde hecht aan detail en afwerking die rustig veroudert;',
                  'een verbouwing wilt die voelt alsof het “altijd zo was”.',
                ].map((t, idx) => (
                  <li key={idx} className="flex items-start gap-4 text-stone-700">
                    <CheckCircle className="text-amber-600 shrink-0 mt-1" size={22} />
                    <span className="text-lg leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-stone-200 p-10">
              <h3 className="font-serif italic text-2xl text-black">Dit past minder als u:</h3>
              <ul className="mt-6 space-y-4">
                {[
                  'alleen een snelle schets zoekt zonder uitwerking in details;',
                  'primair op laagste prijs stuurt zonder kwaliteitskaders;',
                  'de uitvoering “wel ziet gebeuren” zonder eenduidige stukken;',
                  'liever gaandeweg beslist dan vooraf helder wilt kiezen.',
                ].map((t, idx) => (
                  <li key={idx} className="flex items-start gap-4 text-stone-700">
                    <CheckCircle className="text-stone-300 shrink-0 mt-1" size={22} />
                    <span className="text-lg leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 8) FAQ */}
      <section className="py-28 md:py-32 px-6 md:px-12 bg-stone-50">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <span className="mono text-sm uppercase tracking-[0.6em] text-amber-600 font-black block">FAQ</span>
            <h2 className="text-4xl md:text-5xl font-serif italic text-black leading-tight">
              Veelgestelde vragen
            </h2>
            <p className="text-xl text-stone-700">
              Heldere antwoorden op de vragen die in de oriëntatiefase het vaakst terugkomen.
            </p>
          </div>

          <div className="divide-y divide-stone-200 border border-stone-200 rounded-xl overflow-hidden bg-white">
            {FAQS.map((f, idx) => (
              <details key={idx} className="group p-6 open:bg-stone-50">
                <summary className="cursor-pointer list-none flex items-start justify-between gap-6">
                  <div className="space-y-1">
                    <div className="mono text-[10px] uppercase tracking-[0.4em] text-amber-600 font-black">{f.tag}</div>
                    <div className="text-lg md:text-xl font-serif italic text-stone-900">{f.q}</div>
                  </div>
                  <div className="text-stone-400 group-open:rotate-180 transition-transform">▾</div>
                </summary>
                <div className="pt-4 text-stone-600 font-light leading-relaxed">{f.a}</div>
              </details>
            ))}
          </div>

          <div className="text-center pt-6">
            <button
              onClick={() => setIsInquiryOpen(true)}
              className="px-10 py-5 bg-amber-600 text-white rounded-full mono text-sm uppercase tracking-[0.3em] font-black hover:bg-amber-700 transition-all shadow-xl inline-flex items-center gap-3"
            >
              Plan kennismaking
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-28 md:py-32 px-6 md:px-12 overflow-hidden bg-gradient-to-br from-stone-900 to-black">
        <div className="absolute inset-0">
          <img
            src="https://www.zwijsen.net/wp-content/uploads/2022/04/2025-03-07-18.31.32_resize.jpg"
            alt="Verbouwing woning architect - foto loenen aan de vecht moderne verbouwing duurzame woning nieuwbouw comfort"
            className="w-full h-full object-cover"
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-stone-900/92 via-black/85 to-stone-900/92" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center space-y-10 text-white z-10">
          <h2 className="text-4xl md:text-6xl font-serif italic leading-tight">
            Wilt u weten of uw verbouwing "veilig en haalbaar" is?
          </h2>
          <p className="text-xl text-stone-300">
            Start met een gratis quickscan of plan een kennismaking. Dan weet u snel waar de echte risico's zitten
            en welke keuzes het verschil maken in kosten, comfort en uitvoering.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => setIsQuickscanOpen(true)}
              className="px-10 py-5 bg-amber-600 text-white rounded-full mono text-sm uppercase tracking-[0.3em] font-black hover:bg-amber-700 transition-all shadow-xl flex items-center gap-3"
            >
              Gratis Quickscan
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => setIsInquiryOpen(true)}
              className="px-10 py-5 border-2 border-white text-white rounded-full mono text-sm uppercase tracking-[0.3em] font-black hover:bg-white hover:text-black transition-all flex items-center gap-3"
            >
              Kennismaking
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 max-w-4xl mx-auto">
            {[
              { icon: Users, label: 'Direct contact' },
              { icon: Clock, label: 'Heldere stappen' },
              { icon: Lightbulb, label: 'Doordacht advies' },
            ].map((b, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm p-5 rounded-lg border border-white/15"
              >
                <b.icon className="text-amber-500" size={22} />
                <p className="mono text-[11px] uppercase tracking-wider text-white font-bold">{b.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer footerRef={footerRef} parallaxText={footerParallaxText} opacity={footerOpacity} />

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-24 md:bottom-32 right-6 md:right-10 z-[120] p-4 md:p-6 bg-black text-white shadow-2xl rounded-full transition-all hover:bg-amber-600"
          >
            <ArrowUp className="w-5 h-5 md:w-6 md:h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <ContactBar opacity={contactBarOpacity} onStartTraject={() => setIsInquiryOpen(true)} />
    </>
  );
};
