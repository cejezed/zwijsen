'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowUp,
  CheckCircle,
  ShieldCheck,
  Ruler,
  FileText,
  Wallet,
  Home,
  Wrench,
  Layers,
  ThermometerSun,
  Landmark,
} from 'lucide-react';

import { PROCESS_STEPS } from '../../../data';
import { PROJECTS_DETAIL } from '../../../data/projecten';
import { Footer, InquiryOverlay, QuickscanOverlay, ContactBar } from '../../../components';

/**
 * Aanbouw / Uitbouw woning – conversiegedreven type-pagina
 * --------------------------------------------------------
 * Doel:
 * - “Aanbouw” breder framen: het is vrijwel altijd een combinatie van uitbreiding + verbouwing.
 * - Vertrouwen opbouwen: laten zien dat je risico's voorkomt (constructie, regelgeving, details),
 *   én dat je het proces beheerst richting aannemer/uitvoering.
 *
 * Vervang later:
 * - hero images in /public/images/aanbouw/
 * - projectselectie (slugs) met jouw sterkste cases
 */

// Optioneel: zet hier je beste cases neer (portfolio/:slug). Leeg = automatische selectie.
const AANBOUW_PROJECT_SLUGS: string[] = [
  // 'jouw-project-slug-1',
  // 'jouw-project-slug-2',
];

type PickedProject = {
  slug: string;
  title: string;
  subtitle?: string;
  location?: string;
  image?: string;
  alt?: string;
};

const pickAanbouwProjects = (): PickedProject[] => {
  const list = PROJECTS_DETAIL
    .filter((p) => {
      if (AANBOUW_PROJECT_SLUGS.length > 0) return AANBOUW_PROJECT_SLUGS.includes(p.slug);

      const cats = (p.categories ?? []).map((c) => c.toLowerCase());
      const hay = `${p.title} ${p.subtitle ?? ''} ${(p.tags ?? []).join(' ')}`.toLowerCase();

      const isAanbouw =
        cats.includes('aanbouw') ||
        hay.includes('aanbouw') ||
        hay.includes('uitbouw') ||
        hay.includes('serre') ||
        hay.includes('erker');

      // We accepteren ook “verbouw” als het duidelijk een uitbreiding/doorbraak betreft
      const isVerbouwingRelated =
        cats.includes('verbouw') || hay.includes('doorbraak') || hay.includes('keuken') || hay.includes('woonkamer');

      return isAanbouw || isVerbouwingRelated;
    })
    .slice(0, 6);

  return list.map((p) => ({
    slug: p.slug,
    title: p.title,
    subtitle: p.subtitle,
    location: p.locationLabel,
    image: p.featuredImage?.url ?? '',
    alt:
      p.featuredImage?.alt ||
      `Aanbouw/verbouwing woning – project ${p.title} door Architectenbureau Jules Zwijsen`,
  }));
};

// Belangrijk: deze FAQ-tekst ook in page.tsx schema syncen.
const FAQS = [
  {
    tag: 'RISICO',
    q: 'Kan een aanbouw schade veroorzaken aan mijn woning?',
    a: 'Ja, als fundering, draagstructuur en aansluitdetails worden onderschat. Scheurvorming en verzakking ontstaan vaak bij “even uitbouwen” zonder integraal constructief plan. Wij starten daarom met een heldere inventarisatie van bestaande bouw, doorbraken en funderingsopzet.',
  },
  {
    tag: 'REGELS',
    q: 'Heb ik een vergunning nodig voor een aanbouw?',
    a: 'Niet altijd. Maar “vergunningsvrij” betekent niet “regelvrij”. Ook dan gelden technische eisen (Bbl), het omgevingsplan, burenrecht en vaak welstand. Wij toetsen dit vroeg, zodat je geen ontwerp maakt dat later alsnog moet worden teruggedraaid.',
  },
  {
    tag: 'KOSTEN',
    q: 'Wat kost een aanbouw of uitbouw?',
    a: 'De kosten worden vooral bepaald door fundering, constructie (doorbraken/staal), detaillering, isolatie/ventilatie en het kwaliteitsniveau van afwerking. Een aanbouw is meer dan extra m²: de aansluiting op de bestaande woning bepaalt vaak de complexiteit.',
  },
  {
    tag: 'COMFORT',
    q: 'Hoe voorkom je koudebruggen en vochtproblemen bij een aanbouw?',
    a: 'Door het detailontwerp serieus te nemen: aansluitingen bij kozijnen, gevelranden, dakranden en vloeren moeten kloppen. Isolatie alleen is niet genoeg; ook luchtdichtheid, ventilatie en vochthuishouding moeten integraal worden ontworpen.',
  },
  {
    tag: 'TIMING',
    q: 'Wanneer schakel ik een architect in?',
    a: 'Idealiter vóórdat je aannemers benadert. Dan kun je eerst de ruimtelijke oplossing, haalbaarheid en regelgeving scherp krijgen. Daardoor wordt een offerte vergelijkbaar, voorkom je stelposten en blijft het gesprek met aannemers inhoudelijk in plaats van “op gevoel”.',
  },
  {
    tag: 'SCOPE',
    q: 'Doen jullie alleen een ontwerp, of ook bouwbegeleiding?',
    a: 'We kunnen het hele traject begeleiden: van Programma van Eisen en ontwerp tot vergunning, uitwerking en bouwbegeleiding. Dat geeft rust in keuzes én voorkomt dat details onderweg verwateren.',
  },
];

export const AanbouwWoningClient: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isQuickscanOpen, setIsQuickscanOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 520], [1, 0]);
  const contactBarOpacity = useTransform(scrollY, [300, 650], [0, 1]);
  const { scrollYProgress: footerScroll } = useScroll({
    target: footerRef,
    offset: ['start end', 'end end'],
  });
  const footerParallaxText = useTransform(footerScroll, [0, 1], [0, -1500]);
  const footerOpacity = useTransform(footerScroll, [0, 0.4], [0, 1]);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 1000);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const projects = useMemo(() => pickAanbouwProjects(), []);

  return (
    <>
      <InquiryOverlay isOpen={isInquiryOpen} onClose={() => setIsInquiryOpen(false)} />
      <QuickscanOverlay isOpen={isQuickscanOpen} onClose={() => setIsQuickscanOpen(false)} />

      {/* HERO */}
      <motion.section
        style={{ opacity: heroOpacity }}
        className="relative h-screen flex items-center justify-center bg-gradient-to-br from-stone-950 via-stone-900 to-black text-white overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="/images/aanbouw/aanbouw-woning-hero.jpg"
            alt=""
            className="w-full h-full object-cover opacity-0"
            onLoad={(e) => e.currentTarget.classList.replace('opacity-0', 'opacity-100')}
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/80" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 text-center space-y-10">
          <div className="space-y-6">
            <span className="mono text-xs md:text-sm uppercase tracking-[0.6em] text-amber-500 font-black block">
              Aanbouw / uitbouw woning
            </span>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif italic leading-[0.92] tracking-tighter">
              Uitbreiden met zekerheid.<br />Zonder verrassingen.
            </h1>

            <p className="text-xl md:text-2xl text-stone-300 max-w-3xl mx-auto font-light">
              Een aanbouw is zelden “alleen extra meters”. Het is constructie, regelgeving, isolatie, techniek én
              detaillering — en juist dáár gaat het vaak mis. Wij zorgen dat het klopt vóórdat er gebouwd wordt.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => setIsQuickscanOpen(true)}
              className="px-10 py-5 bg-amber-600 text-white rounded-full mono text-sm uppercase tracking-[0.3em] font-black hover:bg-amber-700 transition-all shadow-xl flex items-center gap-3"
            >
              Gratis quickscan
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
              { icon: ShieldCheck, label: 'Risico’s onder controle' },
              { icon: Wallet, label: 'Kosten vóór de schop' },
              { icon: Ruler, label: 'Details die kloppen' },
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

      {/* 1) CONTEXT: waarom aanbouw vaak “verbouwing +” is */}
      <section className="py-24 md:py-28 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto space-y-14">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <span className="mono text-sm uppercase tracking-[0.6em] text-amber-600 font-black block">
              Realiteit
            </span>
            <h2 className="text-4xl md:text-5xl font-serif italic text-black leading-tight">
              Een aanbouw is bijna altijd méér dan een aanbouw
            </h2>
            <p className="text-xl text-stone-700 leading-relaxed">
              Zodra je een gevel openbreekt, installaties verlegt en isolatie moet laten “aansluiten”, ben je in feite
              een verbouwing aan het ontwerpen. De kwaliteit zit in de overgangen: vloer-opbouw, kozijnen, dakrand,
              constructie en ventilatie. Dáár ontstaat comfort — of gedoe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Layers,
                title: 'Aansluitdetails bepalen de kwaliteit',
                desc: 'Koudebruggen, lekken, scheuren: ze ontstaan bijna altijd op de overgang tussen bestaand en nieuw.',
              },
              {
                icon: Wrench,
                title: 'Doorbraak = constructie',
                desc: 'Een pui of open keuken vraagt om een plan voor draaglijnen, staal, oplegging en vervorming.',
              },
              {
                icon: ThermometerSun,
                title: 'Comfort vraagt om techniek + schil',
                desc: 'Isolatie, luchtdichtheid en ventilatie moeten samen kloppen. Anders krijg je tocht, vocht of oververhitting.',
              },
              {
                icon: Landmark,
                title: 'Regels zijn vaak de verborgen spelbreker',
                desc: 'Vergunningsvrij bestaat, maar de details (omgevingsplan, Bbl, burenrecht, welstand) maken het verschil.',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.07 }}
                className="bg-stone-50 p-8 border border-stone-200 hover:border-amber-600 transition-all"
              >
                <div className="flex items-start gap-4">
                  <item.icon className="text-amber-600 shrink-0 mt-1" size={24} />
                  <div className="space-y-3">
                    <h3 className="font-serif italic text-2xl text-black">{item.title}</h3>
                    <p className="text-stone-600 leading-relaxed">{item.desc}</p>
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
              Check mijn situatie
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* 2) VALUE PROP: wat jij concreet doet (geen kreten, maar scope) */}
      <section className="py-24 md:py-28 px-6 md:px-12 bg-stone-900 text-white">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <span className="mono text-sm uppercase tracking-[0.6em] text-amber-500 font-black block">
              Wat wij doen
            </span>
            <h2 className="text-4xl md:text-5xl font-serif italic leading-tight">
              Van eerste idee tot uitvoerbaar plan
            </h2>
            <p className="text-xl text-stone-300 leading-relaxed">
              We vertalen je woonwens naar een oplossing die ruimtelijk klopt, technisch klopt én uitvoerbaar is binnen
              budget. Niet achteraf “repareren”, maar vooraf sturen.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Home,
                title: 'Ruimtelijk ontwerp & indeling',
                desc: 'Plattegrond die werkt in het dagelijks leven: looplijnen, licht, zicht, relatie tuin-keuken-woonkamer, én privacy.',
                bullets: [
                  'Variantenstudie (wat werkt écht op jouw plek)',
                  'Zichtlijnen, daglicht en buitenruimte',
                  'Aansluiting op bestaande ruimtes en routines',
                ],
              },
              {
                icon: Ruler,
                title: 'Constructie & aansluitdetails',
                desc: 'Hier win je (of verlies je) kwaliteit. We zorgen dat doorbraken, fundering en details kloppen vóór de aannemer start.',
                bullets: [
                  'Doorbraken, staal, draaglijnen en vervorming',
                  'Fundering/grondslag passend bij bestaand',
                  'Details tegen scheuren, koudebruggen en lekken',
                ],
              },
              {
                icon: FileText,
                title: 'Regels, vergunning & onderbouwing',
                desc: 'Vergunningsvrij of vergunningplichtig: wij maken het helder en zorgen dat je plan juridisch “staat”.',
                bullets: [
                  'Toets omgevingsplan, welstand en Bbl',
                  'Dossieropbouw (tekeningen, details, uitgangspunten)',
                  'Afstemming met gemeente waar nodig',
                ],
              },
              {
                icon: ThermometerSun,
                title: 'Isolatie, ventilatie & comfort',
                desc: 'Een aanbouw moet comfortabel zijn in winter én zomer. Dat vraagt om samenhang tussen schil, glas, zonwering en ventilatie.',
                bullets: [
                  'Isolatieconcept + luchtdichtheid',
                  'Ventilatie en vochthuishouding',
                  'Oververhitting beperken (zon/glas/zonwering)',
                ],
              },
              {
                icon: Wallet,
                title: 'Haalbaarheid & kostensturing',
                desc: 'Budget wordt gestuurd door keuzes. We maken inzichtelijk waar kosten ontstaan en waar je slim kunt prioriteren.',
                bullets: [
                  'Keuzes koppelen aan impact op bouwsom',
                  'Helder PvE voor vergelijkbare offertes',
                  'Voorkomen van stelposten en “meerwerk-ruis”',
                ],
              },
              {
                icon: ShieldCheck,
                title: 'Uitwerking & (optioneel) bouwbegeleiding',
                desc: 'Als je wilt, bewaken we kwaliteit in de uitvoering: details, communicatie en besluitmomenten.',
                bullets: [
                  'Uitvoeringstekeningen / details waar nodig',
                  'Afstemming aannemer/constructeur/adviseurs',
                  'Controle op intentie van ontwerp (geen verwatering)',
                ],
              },
            ].map((c, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-amber-500/60 transition-all"
              >
                <c.icon className="text-amber-500" size={30} />
                <h3 className="font-serif italic text-2xl mt-5">{c.title}</h3>
                <p className="text-stone-300 leading-relaxed mt-3">{c.desc}</p>
                <ul className="mt-5 space-y-2">
                  {c.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-stone-200/90">
                      <CheckCircle className="text-amber-500 shrink-0 mt-1" size={18} />
                      <span className="text-sm leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
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

      {/* 3) “Waar het vaak misgaat” -> concreet + context */}
      <section className="py-24 md:py-28 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto space-y-14">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <span className="mono text-sm uppercase tracking-[0.6em] text-amber-600 font-black block">
              Valkuilen
            </span>
            <h2 className="text-4xl md:text-5xl font-serif italic text-black leading-tight">
              Waar aanbouwen vaak op stuklopen
            </h2>
            <p className="text-xl text-stone-700 leading-relaxed">
              Meestal niet door “het idee”, maar door details en aannames. Dit is precies waar wij extra scherp op zijn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Vergunningsvrij verkeerd gelezen',
                desc: 'Een plan kan vergunningsvrij lijken, maar alsnog botsen met omgevingsplan, Bbl, welstand of burenrecht. Wij maken die spelregels expliciet vóórdat je vastloopt.',
              },
              {
                title: 'Doorbraak zonder constructief verhaal',
                desc: 'Een brede opening vraagt om een plan voor staal, oplegging, zettingen en bouwvolgorde. Anders ontstaan scheuren, deuren die klemmen of eindeloze discussies op de bouw.',
              },
              {
                title: 'Isolatie zonder aandacht voor aansluitingen',
                desc: 'Koudebruggen en vochtproblemen zitten niet in het “pak isolatie”, maar bij kozijnen, dakrand, vloer-opbouw en ventilatie. Details zijn het verschil tussen comfort en klachten.',
              },
              {
                title: 'Budget pas laat gekoppeld aan keuzes',
                desc: 'Als je pas tijdens offertes ontdekt wat iets kost, moet je onder druk schrappen. Wij koppelen keuzes vroeg aan haalbaarheid, zodat je gericht prioriteert.',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.07 }}
                className="bg-stone-50 p-8 border border-stone-200 hover:border-amber-600 transition-all"
              >
                <div className="flex items-start gap-4">
                  <CheckCircle className="text-amber-600 shrink-0 mt-1" size={24} />
                  <div className="space-y-3">
                    <h3 className="font-serif italic text-2xl text-black">{item.title}</h3>
                    <p className="text-stone-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4) Proces (bestaande PROCESS_STEPS) */}
      <section className="py-24 md:py-28 px-6 md:px-12 bg-stone-50">
        <div className="max-w-6xl mx-auto space-y-14">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <span className="mono text-sm uppercase tracking-[0.6em] text-amber-600 font-black block">Werkwijze</span>
            <h2 className="text-4xl md:text-5xl font-serif italic text-black leading-tight">
              Van idee naar uitvoering zonder ruis
            </h2>
            <p className="text-xl text-stone-700">
              Duidelijke stappen, duidelijke keuzes. Zodat je weet wat er wanneer besloten moet worden.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROCESS_STEPS.slice(0, 6).map((step, idx) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.06 }}
                className="relative p-8 bg-white border-2 border-stone-200 hover:border-amber-600 transition-all"
              >
                <div className="absolute -top-4 left-8 bg-amber-600 text-white px-4 py-2 mono text-xs font-black">
                  {step.id}
                </div>
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <h3 className="font-serif italic text-xl text-stone-900">{step.title}</h3>
                    <p className="mono text-xs uppercase tracking-wider text-stone-500 font-bold">{step.subtitle}</p>
                  </div>
                  <p className="text-stone-600 leading-relaxed text-sm">{step.description}</p>
                  {step.deliverables && (
                    <div className="pt-4 border-t border-stone-200">
                      <p className="mono text-xs uppercase tracking-wider text-stone-400 font-bold mb-2">Oplevering</p>
                      <ul className="space-y-1">
                        {step.deliverables.map((deliverable, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2 text-sm text-stone-600">
                            <CheckCircle size={14} className="text-amber-600 shrink-0 mt-0.5" />
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
        </div>
      </section>

      {/* 5) Bewijs — projecten */}
      <section className="py-24 md:py-28 px-6 md:px-12 bg-stone-900 text-white">
        <div className="max-w-6xl mx-auto space-y-14">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <span className="mono text-sm uppercase tracking-[0.6em] text-amber-500 font-black block">Projecten</span>
            <h2 className="text-4xl md:text-5xl font-serif italic leading-tight">
              Aanbouwen en verbouwingen uit de praktijk
            </h2>
            <p className="text-xl text-stone-300">
              Vul dit met 3–6 sterke cases. Beeld + detailverhaal is hier je grootste SEO- en conversiewapen.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <a
                key={p.slug}
                href={`/portfolio/${p.slug}`}
                className="group block border border-white/10 rounded-xl overflow-hidden bg-white/5 hover:border-amber-500/60 transition-colors"
              >
                <div className="aspect-[16/10] bg-black/20 overflow-hidden">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.alt || p.title}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/40">
                      Voeg featuredImage toe
                    </div>
                  )}
                </div>
                <div className="p-5 space-y-2">
                  <div className="mono text-[10px] uppercase tracking-[0.4em] text-amber-500 font-black">
                    Aanbouw / verbouwing
                  </div>
                  <div className="text-xl font-serif italic">{p.title}</div>
                  <div className="text-sm text-white/60">{p.location}</div>
                  <div className="text-sm text-white/70 font-light leading-relaxed">{p.subtitle}</div>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center">
            <a
              href="/portfolio"
              className="px-10 py-5 border-2 border-white text-white rounded-full mono text-sm uppercase tracking-[0.3em] font-black hover:bg-white hover:text-black transition-all inline-flex items-center gap-3"
            >
              Bekijk alle projecten
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* 6) FAQ */}
      <section className="py-24 md:py-28 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <span className="mono text-sm uppercase tracking-[0.6em] text-amber-600 font-black block">FAQ</span>
            <h2 className="text-4xl md:text-5xl font-serif italic text-black leading-tight">
              Veelgestelde vragen
            </h2>
            <p className="text-xl text-stone-700">
              Antwoorden op de vragen die we bij aanbouw en verbouwing het vaakst krijgen.
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
      <section className="relative py-24 md:py-28 px-6 md:px-12 overflow-hidden bg-gradient-to-br from-stone-950 to-black">
        <div className="absolute inset-0">
          <img
            src="/images/aanbouw/aanbouw-woning-cta.jpg"
            alt=""
            className="w-full h-full object-cover"
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-stone-950/92 via-black/88 to-stone-950/92" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center space-y-10 text-white z-10">
          <h2 className="text-4xl md:text-6xl font-serif italic leading-tight">
            Twijfel je over haalbaarheid, regels of risico’s?
          </h2>
          <p className="text-xl text-stone-300">
            Vraag een gratis quickscan aan of plan een kennismaking. Dan brengen we in kaart waar de echte knelpunten
            zitten — en welke keuzes het verschil maken.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => setIsQuickscanOpen(true)}
              className="px-10 py-5 bg-amber-600 text-white rounded-full mono text-sm uppercase tracking-[0.3em] font-black hover:bg-amber-700 transition-all shadow-xl flex items-center gap-3"
            >
              Gratis quickscan
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
        </div>
      </section>

      <Footer footerRef={footerRef} parallaxText={footerParallaxText} opacity={footerOpacity} />

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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
