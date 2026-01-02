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
} from 'lucide-react';

import { PROCESS_STEPS } from '../../../data';
import { PROJECTS_DETAIL } from '../../../data/projecten';
import { Footer, InquiryOverlay, QuickscanOverlay, ContactBar } from '../../../components';

/**
 * Nieuwbouw Villa – Conversiegedreven type-pagina
 * ------------------------------------------------
 * Doel: bezoekers met serieuze villabouw-intentie vertrouwen geven en richting quickscan/kennismaking sturen.
 *
 * Belangrijk:
 * - Houd de kerncopy (H1, intro, redenen, aanpak, kosten) in HTML zichtbaar.
 * - Vervang beelden en project-selectie door jouw echte villa-projecten.
 *
 * Projectselectie:
 * - Zet hieronder slugs in VILLA_PROJECT_SLUGS voor maximale controle.
 */
const VILLA_PROJECT_SLUGS: string[] = [
  // TODO: vul met jouw villa/newbouw slugs (portfolio/:slug)
  // 'architect-gameren-villa-aan-het-water',
  // 'architect-ruurlo-prefab-houten-villa-met-patios',
];

const pickVillaProjects = () => {
  const list = PROJECTS_DETAIL
    .filter((p) => {
      if (VILLA_PROJECT_SLUGS.length > 0) return p.slug && VILLA_PROJECT_SLUGS.includes(p.slug);

      const subtitle = 'subtitle' in p ? p.subtitle ?? '' : ('description' in p ? p.description : '');
      const tags = 'tags' in p ? p.tags ?? [] : ('tag' in p ? [p.tag] : []);
      const hay = `${p.title} ${subtitle} ${tags.join(' ')}`.toLowerCase();
      const isVilla = hay.includes('villa') || hay.includes('landhuis') || hay.includes('paviljoen');
      const cats = ('categories' in p ? p.categories ?? [] : []).map((c) => c.toLowerCase());
      const isNieuwbouw = cats.includes('nieuwbouw') || hay.includes('nieuwbouw');
      return isVilla && isNieuwbouw;
    })
    .slice(0, 6);

  return list.map((p) => ({
    slug: p.slug ?? '',
    title: p.title,
    subtitle: 'subtitle' in p ? p.subtitle : ('description' in p ? p.description : ''),
    location: 'locationLabel' in p ? p.locationLabel : ('location' in p ? p.location : ''),
    image: 'featuredImage' in p ? p.featuredImage?.url ?? '' : (typeof p.image === 'string' ? p.image : p.image?.url ?? ''),
  }));
};

const FAQS = [
  {
    tag: 'KOSTEN',
    q: 'Wat kost een nieuwbouw villa?',
    a: 'De kosten hangen sterk af van ontwerpkeuzes, materialisatie, technische ambities en de complexiteit van de kavel. Daarom sturen we al vroeg op haalbaarheid: we maken inzichtelijk welke keuzes de bouwsom het meest beïnvloeden, zodat verwachtingen en budget in lijn blijven.',
  },
  {
    tag: 'KAVEL',
    q: 'Heb ik al een kavel nodig om te starten?',
    a: 'Nee. We kunnen ook meedenken bij de beoordeling van een kavel vóór aankoop. Oriëntatie, privacy, zichtlijnen, bezonning en regelgeving bepalen in hoge mate de ontwerpvrijheid en de uiteindelijke kwaliteit van de villa.',
  },
  {
    tag: 'PROCES',
    q: 'Hoe lang duurt het ontwerp- en bouwproces van een villa?',
    a: 'Afhankelijk van complexiteit en vergunningen duurt het ontwerpproces doorgaans enkele maanden. Inclusief vergunningstraject en bouw is een totale doorlooptijd van circa 1,5 tot 2 jaar een realistische bandbreedte.',
  },
  {
    tag: 'VERGUNNING',
    q: 'Begeleiden jullie ook het vergunningstraject en welstand?',
    a: 'Ja. We begeleiden het traject en stemmen af met gemeente en adviseurs. Door vroeg te toetsen aan regels en welstand voorkomt u vertraging en worden ontwerpkeuzes tijdig bijgestuurd.',
  },
  {
    tag: 'DUURZAAM',
    q: 'Hoe maakt u een nieuwbouw villa duurzaam en toekomstbestendig?',
    a: 'Duurzaamheid begint bij ontwerp: oriëntatie, massa, zonwering en een goede schil. Daarna kiezen we installaties die passen bij comfort én onderhoud. Daarnaast ontwerpen we met flexibiliteit, zodat de villa kan meegroeien met veranderende woonwensen.',
  },
];

export const NieuwbouwVillaClient: React.FC = () => {
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

  const projects = pickVillaProjects();

  return (
    <>
      <InquiryOverlay isOpen={isInquiryOpen} onClose={() => setIsInquiryOpen(false)} />
      <QuickscanOverlay isOpen={isQuickscanOpen} onClose={() => setIsQuickscanOpen(false)} />

      {/* HERO — kalm, high-end, intentie-gedreven */}
      <motion.section
        style={{ opacity: heroOpacity }}
        className="relative h-screen flex items-center justify-center bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="/images/moderne-rietkap-woning-glazen-gevel-gezinsleven.jpg"
            alt="Ontwerp voor een nieuwbouw villa met rietkap en glazen gevel, ontwerp door architect Jules Zwijsen"
            className="w-full h-full object-cover opacity-0"
            onLoad={(e) => e.currentTarget.classList.replace('opacity-0', 'opacity-100')}
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/75" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 text-center space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="mono text-xs md:text-sm uppercase tracking-[0.6em] text-amber-500 font-black block">
              Nieuwbouw villa
            </span>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif italic leading-[0.9] tracking-tighter">
              Doordacht maatwerk.<br />Rust in keuzes.
            </h1>

            <p className="text-xl md:text-2xl text-stone-300 max-w-3xl mx-auto font-light">
              Voor particuliere opdrachtgevers die hun villa willen ontwerpen met grip op indeling, kosten en uitvoering —
              zonder verrassingen achteraf.
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 max-w-4xl mx-auto">
            {[
              { icon: ShieldCheck, label: 'Grip op keuzes' },
              { icon: Wallet, label: 'Budgetbewust ontwerpen' },
              { icon: Ruler, label: 'Ruimtelijke logica' },
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

      {/* 1) Herkenning: waarom villa’s vaak ontsporen */}
      <section className="py-28 md:py-32 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="mono text-sm uppercase tracking-[0.6em] text-amber-600 font-black block">
              Beslismoment
            </span>
            <h2 className="text-4xl md:text-5xl font-serif italic text-black leading-tight">
              Waarom nieuwbouw villa’s vaak ontsporen
            </h2>
            <p className="text-xl text-stone-700 leading-relaxed">
              Niet door gebrek aan inspiratie, maar door te late keuzes. De grootste teleurstellingen ontstaan meestal pas
              na oplevering — als indeling, techniek of kosten niet meer te corrigeren zijn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Indeling die pas later wringt',
                description:
                  'Routing, zichtlijnen en dagelijkse routines blijken na oplevering toch niet te kloppen — terwijl dit in het ontwerp te voorkomen is.',
              },
              {
                title: 'Kosten die “ineens” oplopen',
                description:
                  'Als budget pas laat gekoppeld wordt aan ontwerpkeuzes, krijgt u bijsturen onder tijdsdruk. Wij willen dat eerder helder hebben.',
              },
              {
                title: 'Techniek die leidend wordt',
                description:
                  'Installaties en constructie moeten het ontwerp ondersteunen, niet dicteren. Dat vraagt integratie vanaf het begin.',
              },
              {
                title: 'Uitvoering zonder eenduidigheid',
                description:
                  'Als details en omschrijvingen niet scherp zijn, gaat interpretatie het werk doen. Dat leidt vaak tot discussies of meerwerk.',
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
              Check mijn situatie
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* 2) Value proposition: aanpak */}
      <section className="py-28 md:py-32 px-6 md:px-12 bg-stone-900 text-white">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <span className="mono text-sm uppercase tracking-[0.6em] text-amber-500 font-black block">
              Onze aanpak
            </span>
            <h2 className="text-4xl md:text-5xl font-serif italic leading-tight">
              Een villa ontwerpen vraagt meer dan een mooi beeld
            </h2>
            <p className="text-xl text-stone-300 leading-relaxed">
              Wij ontwerpen nieuwbouw villa’s vanuit ruimtelijke logica, technische samenhang en financiële beheersing.
              Daardoor wordt het proces rustiger, de uitvoering voorspelbaarder en het resultaat duurzamer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Ruler,
                title: 'Ruimtelijke logica',
                desc: 'Indeling, routing, zichtlijnen en dagelijks gebruik. Het huis moet “kloppen” — elke dag opnieuw.',
              },
              {
                icon: FileText,
                title: 'Technische samenhang',
                desc: 'Constructie, installaties, comfort en energie in balans. Techniek ondersteunt het ontwerp.',
              },
              {
                icon: Wallet,
                title: 'Financiële beheersing',
                desc: 'Ontwerpkeuzes vertalen naar bouwkosten en prioriteiten. Zo sturen we op haalbaarheid, niet op hoop.',
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

      {/* 3) Wat maakt een villa geslaagd (bullet + expertise) */}
      <section className="py-28 md:py-32 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <span className="mono text-sm uppercase tracking-[0.6em] text-amber-600 font-black block">
              Kwaliteit
            </span>
            <h2 className="text-4xl md:text-5xl font-serif italic text-black leading-tight">
              Wat maakt een villa écht geslaagd?
            </h2>
            <p className="text-xl text-stone-700 leading-relaxed">
              Kwaliteit zit zelden in méér vierkante meters, maar in beter ontworpen ruimte. Dit zijn de onderdelen waar
              wij in het ontwerp scherp op sturen.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-stone-50 p-10 border border-stone-200">
              <ul className="space-y-5">
                {[
                  'Logische plattegrond: dag- en nachtritme klopt vanzelf.',
                  'Zichtlijnen die rust geven én de plek versterken.',
                  'Privacy zonder afsluiting: open waar het kan, beschut waar het moet.',
                  'Binnen-buiten relatie: terrassen, overgangen en beschutting werken samen.',
                  'Techniek ondersteunend: comfort zonder compromissen in architectuur.',
                  'Tijdloze materialisatie: rustig verouderen, onderhoud bewust gekozen.',
                ].map((t, idx) => (
                  <li key={idx} className="flex items-start gap-4 text-stone-700">
                    <CheckCircle className="text-amber-600 shrink-0 mt-1" size={22} />
                    <span className="text-lg leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative overflow-hidden border border-stone-200 bg-stone-100 min-h-[420px]">
              <img
                src="https://www.zwijsen.net/wp-content/uploads/2022/10/68_resize.jpg"
                alt="Nieuwbouw villa detail: licht, zichtlijnen en materiaalkeuze geven de woning karakter en kwaliteit."
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  if (e.currentTarget.parentElement) {
                    e.currentTarget.parentElement.style.background =
                      'linear-gradient(135deg, #f5f5f4 0%, #e7e5e4 100%)';
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0" />
              <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm p-6 shadow-xl max-w-md">
                <p className="mono text-xs uppercase tracking-wider text-amber-600 font-black">Villa op maat</p>
                <p className="text-xl font-serif italic text-black mt-2">Rust in keuzes. Kwaliteit in details.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4) Kosten & haalbaarheid */}
      <section className="py-28 md:py-32 px-6 md:px-12 bg-stone-50">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <span className="mono text-sm uppercase tracking-[0.6em] text-amber-600 font-black block">
              Budget
            </span>
            <h2 className="text-4xl md:text-5xl font-serif italic text-black leading-tight">
              Kosten nieuwbouw villa: waar het verschil ontstaat
            </h2>
            <p className="text-xl text-stone-700 leading-relaxed">
              “€ per m²” vertelt weinig. De bouwsom wordt vooral bepaald door keuzes in volume, detaillering, materialen,
              installaties en complexiteit van de kavel. Wij koppelen die keuzes vroeg aan haalbaarheid.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Ontwerpkeuzes die sturen',
                desc: 'Compacte vormen, heldere constructie en bewuste detaillering geven rust in kosten én uitvoering.',
              },
              {
                title: 'Materialisatie & details',
                desc: 'Niet duur vs. goedkoop, maar passend en onderhoudsarm. Details bepalen vaak een groot deel van de prijsvorming.',
              },
              {
                title: 'Techniek & comfort',
                desc: 'Energiezuinig en comfortabel vraagt integratie. Dan blijft techniek ondersteunend en voorkom je “achteraf-oplossingen”.',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-white p-8 border border-stone-200 hover:border-amber-600 transition-all"
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

      {/* 5) Werkwijze (PROCESS_STEPS) — compact, voorspelbaar */}
      <section id="werkwijze-section" className="py-28 md:py-32 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <span className="mono text-sm uppercase tracking-[0.6em] text-amber-600 font-black block">Werkwijze</span>
            <h2 className="text-4xl md:text-5xl font-serif italic text-black leading-tight">
              Van eerste schets tot sleuteloverdracht
            </h2>
            <p className="text-xl text-stone-700">
              Een gestructureerd proces met duidelijke momenten van keuze, toetsing en besluitvorming.
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
                className="relative p-8 bg-stone-50 border-2 border-stone-200 hover:border-amber-600 transition-all group"
              >
                <div className="absolute -top-4 left-8 bg-amber-600 text-white px-4 py-2 mono text-xs font-black">
                  {step.id}
                </div>
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <h3 className="font-serif italic text-xl text-black group-hover:text-amber-700 transition-colors">
                      {step.title}
                    </h3>
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

      {/* 6) Bewijs — projecten */}
      <section className="py-28 md:py-32 px-6 md:px-12 bg-stone-900 text-white">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <span className="mono text-sm uppercase tracking-[0.6em] text-amber-500 font-black block">Portfolio</span>
            <h2 className="text-4xl md:text-5xl font-serif italic leading-tight">Gerealiseerde nieuwbouw villa’s</h2>
            <p className="text-xl text-stone-300">
              Een selectie projecten waarin locatie, wensen en architectuur samenkomen.
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
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/40">Voeg featuredImage toe</div>
                  )}
                </div>
                <div className="p-5 space-y-2">
                  <div className="mono text-[10px] uppercase tracking-[0.4em] text-amber-500 font-black">Nieuwbouw villa</div>
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

      {/* 7) Voor wie het past (kwalificatie) */}
      <section className="py-28 md:py-32 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto space-y-14">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <span className="mono text-sm uppercase tracking-[0.6em] text-amber-600 font-black block">Match</span>
            <h2 className="text-4xl md:text-5xl font-serif italic text-black leading-tight">Voor wie dit wél en niet past</h2>
            <p className="text-xl text-stone-700">
              Duidelijkheid werkt twee kanten op. Zo weet u snel of onze werkwijze bij u past.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-stone-50 border border-stone-200 p-10">
              <h3 className="font-serif italic text-2xl text-black">Dit past bij u als u:</h3>
              <ul className="mt-6 space-y-4">
                {[
                  'bewuste keuzes wilt maken in indeling, licht en materialisatie;',
                  'grip wilt op kosten en haalbaarheid, niet alleen op sfeerbeelden;',
                  'waarde hecht aan helderheid richting aannemers en uitvoering;',
                  'een villa wilt die ook over 15 jaar nog klopt en werkt.',
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
                  'alleen een snelle schets zoekt zonder verdieping in keuzes;',
                  'primair op laagste bouwsom stuurt zonder kwaliteitskaders;',
                  'de uitvoering los ziet van ontwerp en detaillering;',
                  'geen tijd wilt nemen om wensen goed te formuleren.',
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
            <h2 className="text-4xl md:text-5xl font-serif italic text-black leading-tight">Veelgestelde vragen</h2>
            <p className="text-xl text-stone-700">
              Heldere antwoorden op de vragen die we in de oriëntatiefase het vaakst horen.
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
            src="/images/architekt moderne villa in het bos luxe bosvilla architect glazen paviljoen 6.jpg"
            alt="Architect moderne villa in het bos, luxe bosvilla architect glazen paviljoen"
            className="w-full h-full object-cover"
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-stone-900/92 via-black/85 to-stone-900/92" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center space-y-10 text-white z-10">
          <h2 className="text-4xl md:text-6xl font-serif italic leading-tight">Twijfelt u of uw villa-idee haalbaar is?</h2>
          <p className="text-xl text-stone-300">
            Vraag een gratis quickscan aan of plan een kennismaking. Dan weet u snel waar u staat — en welke keuzes echt
            verschil maken.
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
