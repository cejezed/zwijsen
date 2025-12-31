import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUp, CheckCircle, ArrowRight, MapPin, Lightbulb, Euro, Users, FileText, Hammer } from 'lucide-react';
import { BRAND_NAME, PROCESS_STEPS } from '../data';
import {
  Footer,
  InquiryOverlay,
  QuickscanOverlay,
  ContactBar
} from '../components';

export const Werkwijze: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isQuickscanOpen, setIsQuickscanOpen] = useState(false);
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
    document.title = 'Hoe werkt een architect? | Werkwijze van schets tot oplevering';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Hoe werkt een architect bij verbouw of nieuwbouw? Lees hoe architect Jules Zwijsen werkt van kennismaking en schetsontwerp tot oplevering.');
    }

    // Set canonical URL
    const currentUrl = "https://www.zwijsen.net/werkwijze";
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (canonical) {
      canonical.href = currentUrl;
    } else {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      canonical.href = currentUrl;
      document.head.appendChild(canonical);
    }

    // BreadcrumbList Schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Architectenbureau", "item": "https://www.zwijsen.net/" },
        { "@type": "ListItem", "position": 2, "name": "Werkwijze", "item": "https://www.zwijsen.net/werkwijze" }
      ]
    };

    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.type = 'application/ld+json';
    breadcrumbScript.id = 'schema-breadcrumbs';
    breadcrumbScript.text = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(breadcrumbScript);
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 1000);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      {/* Inquiry Overlay */}
      <InquiryOverlay
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      />

      {/* Quickscan Overlay */}
      <QuickscanOverlay
        isOpen={isQuickscanOpen}
        onClose={() => setIsQuickscanOpen(false)}
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
        {/* Achtergrondafbeelding - plaats werkwijze-hero.jpg in /public/images/ om te gebruiken */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://www.zwijsen.net/wp-content/uploads/2022/10/67_resize.jpg"
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
              Werkwijze
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif italic leading-[0.9] tracking-tighter">
              Van schets tot <br />sleuteloverdracht
            </h1>
            <p className="text-xl md:text-2xl text-stone-300 max-w-2xl mx-auto font-light">
              Helder proces, persoonlijke begeleiding en volledige transparantie
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
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
              Onze Werkwijze
            </span>
            <h2 className="text-4xl md:text-6xl font-serif italic text-black leading-tight">
              Helder proces, persoonlijk contact
            </h2>
          </div>

          <div className="prose prose-lg max-w-none space-y-6 text-stone-700 leading-relaxed">
            <p className="text-xl md:text-2xl font-light">
              Veel opdrachtgevers vragen zich af: hoe werkt een architect eigenlijk in de praktijk? Het ontwerpen en bouwen van een woning is een intensief en persoonlijk proces. Het gaat om grote investeringen en langdurige samenwerking. Daarom is het belangrijk dat er vertrouwen is en dat het proces helder en overzichtelijk verloopt.
            </p>
          </div>
        </div>
      </section>

      {/* Belangrijke inzichten - Side by Side */}
      <section className="py-32 px-6 md:px-12 bg-stone-50">
        <div className="max-w-7xl mx-auto space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6 max-w-3xl mx-auto"
          >
            <span className="mono text-sm uppercase tracking-[0.6em] text-amber-600 font-black block">
              Belangrijk om te weten
            </span>
            <h2 className="text-4xl md:text-5xl font-serif italic text-black leading-tight">
              Voorkomen is beter dan genezen
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Waar het vaak misgaat */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white p-10 md:p-12 border-2 border-stone-200 hover:border-amber-600 transition-all space-y-6 shadow-lg"
            >
              <div className="space-y-4">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-3xl">
                  ⚠
                </div>
                <h3 className="text-3xl md:text-4xl font-serif italic text-black">
                  Waar het vaak misgaat
                </h3>
              </div>

              <div className="space-y-6 text-stone-700 leading-relaxed">
                <p className="text-lg">
                  Veel problemen tijdens de bouw ontstaan niet op de bouwplaats, maar al in de ontwerpfase. Onduidelijke keuzes, onvoldoende afstemming met regelgeving of te laat inzicht in kosten kunnen later grote gevolgen hebben.
                </p>
                <p className="text-xl font-serif italic text-amber-700">
                  Door in een vroeg stadium de juiste vragen te stellen en consequenties te overzien, voorkomen wij verrassingen tijdens uitvoering.
                </p>
                <p className="text-base text-stone-600">
                  Dat geeft rust, overzicht en een beter eindresultaat.
                </p>
              </div>
            </motion.div>

            {/* Herkent u dit? */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white p-10 md:p-12 border-2 border-stone-200 hover:border-amber-600 transition-all space-y-6 shadow-lg"
            >
              <div className="space-y-4">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center text-white text-3xl">
                  ✓
                </div>
                <h3 className="text-3xl md:text-4xl font-serif italic text-black">
                  Herkent u dit?
                </h3>
              </div>

              <div className="space-y-6 text-stone-700 leading-relaxed">
                <p className="text-lg">
                  Veel particuliere opdrachtgevers hebben drie zorgen: onverwachte kosten, onomkeerbare fouten en stress tijdens de bouw.
                </p>
                <p className="text-xl font-serif italic text-amber-700">
                  Ons proces is erop gericht om juist die punten vroeg te ondervangen — met heldere keuzes, goede voorbereiding en duidelijke documenten.
                </p>
                <p className="text-base text-stone-600">
                  Zo ontstaat vertrouwen en voorspelbaarheid gedurende het hele traject.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Waarom werken met een architect */}
      <section className="py-32 px-6 md:px-12 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="mono text-sm uppercase tracking-[0.6em] text-amber-600 font-black block">
                  De Meerwaarde
                </span>
                <h2 className="text-4xl md:text-5xl font-serif italic text-black leading-tight">
                  Waarom werken met een architect?
                </h2>
              </div>

              <div className="space-y-6 text-stone-700 leading-relaxed">
                <p className="text-lg">
                  Een architect helpt om uw wensen, dromen en randvoorwaarden te vertalen naar een samenhangend ontwerp. Anders dan bij standaardwoningen wordt bij maatwerk elk aspect afgestemd op de locatie en de bewoners. Licht, zichtlijnen, privacy, bezonning en ruimtelijke relaties spelen daarbij een centrale rol.
                </p>
                <p className="text-xl font-serif italic text-amber-700">
                  Juist die samenhang maakt het verschil tussen een huis en een thuis.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                {
                  icon: Lightbulb,
                  title: "Uniek ontwerp",
                  description: "Maatwerk voor uw situatie"
                },
                {
                  icon: MapPin,
                  title: "Locatie-specifiek",
                  description: "Optimaal gebruik van kavel"
                },
                {
                  icon: Users,
                  title: "Persoonlijk",
                  description: "Direct contact met architect"
                },
                {
                  icon: CheckCircle,
                  title: "Kwaliteit",
                  description: "Toezicht tijdens bouw"
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white p-6 border border-stone-200 rounded-lg hover:border-amber-600 transition-all"
                >
                  <item.icon className="text-amber-600 mb-4" size={32} />
                  <h3 className="font-serif italic text-lg text-black mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-stone-600">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Voorbereiding: een goede start */}
      <section className="py-32 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <span className="mono text-sm uppercase tracking-[0.6em] text-amber-600 font-black block">
              De Basis
            </span>
            <h2 className="text-4xl md:text-5xl font-serif italic text-black leading-tight">
              Voorbereiding: een goede start
            </h2>
            <p className="text-xl text-stone-700">
              Een goed ontwerp begint met een goede voorbereiding. Daarbij kijken wij altijd naar drie basiselementen:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Lightbulb,
                title: "Wensen",
                description: "Praktische wensen zoals indeling en aantal kamers, maar ook minder tastbare aspecten zoals sfeer, licht, rust en privacy."
              },
              {
                icon: MapPin,
                title: "Locatie",
                description: "Elke locatie is uniek. Uitzicht, zon, wind, buren, geluid, regelgeving en welstand zijn bepalend voor de juiste positionering en vorm van de woning."
              },
              {
                icon: Euro,
                title: "Budget",
                description: "Helderheid over financiële ruimte voorkomt teleurstellingen. Samen bepalen we wat binnen het budget valt en waar prioriteiten liggen."
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-stone-50 p-10 border-2 border-stone-200 hover:border-amber-600 transition-all group"
              >
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="w-20 h-20 bg-amber-600 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <item.icon size={32} />
                  </div>
                  <h3 className="font-serif italic text-2xl text-black">
                    {item.title}
                  </h3>
                  <p className="text-stone-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Kennismaking en eerste schets - With Parallax Background */}
      <section className="relative py-32 px-6 md:px-12 overflow-hidden">
        {/* Parallax Background Image */}
        <motion.div
          className="absolute inset-0 w-full h-[120%]"
          style={{
            y: useTransform(scrollY, [2000, 3000], [0, -150])
          }}
        >
          <img
            src="https://www.zwijsen.net/wp-content/uploads/2022/02/vrijstaande-moderne-villa-architect-bouwgrond-kavel-blaricum-gooi.jpg"
            alt=""
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </motion.div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900/95 via-black/90 to-stone-900/95 z-[1]" />

        <div className="relative max-w-5xl mx-auto space-y-12 text-white z-10">
          <div className="space-y-6">
            <span className="mono text-sm uppercase tracking-[0.6em] text-amber-500 font-black block">
              De Start
            </span>
            <h2 className="text-4xl md:text-5xl font-serif italic leading-tight">
              Kennismaking en eerste schets
            </h2>
          </div>

          <div className="prose prose-lg prose-invert max-w-none space-y-6 text-stone-300 leading-relaxed">
            <p className="text-xl">
              Na een eerste kennismaking en locatiebezoek maken wij een eerste schets of ontwerpidee. Dit is gebaseerd op de wensen, de locatie en het budget. Deze schets wordt helder toegelicht en vormt de basis om te bepalen of een verdere samenwerking passend is.
            </p>
          </div>
        </div>
      </section>

      {/* Van ontwerp tot uitvoering - Process Steps */}
      <section className="py-32 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <span className="mono text-sm uppercase tracking-[0.6em] text-amber-600 font-black block">
              Het Ontwerpproces
            </span>
            <h2 className="text-4xl md:text-5xl font-serif italic text-black leading-tight">
              Van ontwerp tot uitvoering
            </h2>
            <p className="text-xl text-stone-700">
              Het complete traject in 7 gestructureerde fases
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROCESS_STEPS.filter(step => !step.isLast).map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative p-8 bg-stone-50 border-2 border-stone-200 hover:border-amber-600 transition-all group"
              >
                <div className="absolute -top-4 left-8 bg-amber-600 text-white px-4 py-2 mono text-xs font-black">
                  FASE {step.id}
                </div>
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <h3 className="font-serif italic text-2xl text-black group-hover:text-amber-600 transition-colors">
                      {step.title}
                    </h3>
                    <p className="mono text-xs uppercase tracking-wider text-stone-500 font-bold">
                      {step.subtitle} • {step.duration}
                    </p>
                  </div>
                  <p className="text-stone-600 leading-relaxed">
                    {step.description}
                  </p>
                  {step.deliverables && (
                    <div className="pt-4 border-t border-stone-200">
                      <p className="mono text-xs uppercase tracking-wider text-stone-400 font-bold mb-3">
                        Oplevering
                      </p>
                      <ul className="space-y-2">
                        {step.deliverables.map((deliverable, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2 text-sm text-stone-600">
                            <CheckCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
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

      {/* Fase 7: Oplevering - Extended Section with Parallax */}
      <section className="relative py-32 px-6 md:px-12 overflow-hidden">
        {/* Parallax Background Image */}
        <motion.div
          className="absolute inset-0 w-full h-[120%]"
          style={{
            y: useTransform(scrollY, [4000, 5000], [0, -150])
          }}
        >
          <img
            src="https://www.zwijsen.net/wp-content/uploads/2022/10/68_resize.jpg"
            alt=""
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </motion.div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/90 via-amber-800/85 to-stone-900/90 z-[1]" />

        <div className="relative max-w-6xl mx-auto z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8 text-white"
            >
              <div className="space-y-4">
                <div className="inline-block bg-amber-600 text-white px-6 py-3 mono text-xs font-black">
                  FASE 07
                </div>
                <h2 className="text-4xl md:text-6xl font-serif italic leading-tight">
                  Oplevering & Nazorg
                </h2>
                <p className="text-xl md:text-2xl text-amber-200 font-light">
                  Uw droom gerealiseerd — tot in het kleinste detail
                </p>
              </div>

              <div className="space-y-6 text-stone-100 leading-relaxed">
                <p className="text-lg">
                  De oplevering is het hoogtepunt van het hele traject. Samen lopen we door uw nieuwe woning en controleren we elk detail. Van de afwerking van kozijnen tot de werking van installaties — alles moet perfect zijn.
                </p>
                <p className="text-lg">
                  Bij de eindoplevering gaan we systematisch door de woning heen. Eventuele kleine onvolkomenheden worden genoteerd en door de aannemer hersteld. Pas wanneer alles aan de hoogste standaard voldoet, vindt de officiële sleuteloverdracht plaats.
                </p>
                <p className="text-xl font-serif italic text-amber-300">
                  Een resultaat waar u jarenlang trots op mag zijn — en waar u elke dag opnieuw van geniet.
                </p>
              </div>
            </motion.div>

            {/* Right Column - Deliverables & Nazorg */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="bg-white/10 backdrop-blur-sm p-8 border-2 border-white/20 rounded-lg space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center">
                    <CheckCircle size={32} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-serif italic text-2xl text-white">
                      Oplevering
                    </h3>
                    <p className="text-amber-200 text-sm mono uppercase tracking-wider">
                      Het eindresultaat
                    </p>
                  </div>
                </div>

                <ul className="space-y-4">
                  {[
                    "Gezamenlijke eindoplevering met volledige checklist",
                    "Controle op afwerking en detaillering",
                    "Test van alle installaties en voorzieningen",
                    "Documentatie van gebruiksaanwijzingen en garanties",
                    "Officiële sleuteloverdracht"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-white">
                      <CheckCircle size={20} className="text-amber-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-8 border-2 border-white/20 rounded-lg space-y-4">
                <h4 className="font-serif italic text-xl text-white">
                  Nazorg & Garantie
                </h4>
                <p className="text-stone-200 leading-relaxed">
                  Ook na de oplevering blijf ik beschikbaar voor vragen. Kleine kinderziektes worden opgelost en tijdens de garantieperiode blijf ik aanspreekpunt tussen u en de aannemer.
                </p>
                <div className="pt-4 border-t border-white/20">
                  <p className="text-amber-300 font-bold">
                    Garantieperiode: volgens bouwbesluit en aannemersovereenkomst
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Heldere afspraken */}
      <section className="py-32 px-6 md:px-12 bg-stone-50">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="space-y-6">
            <span className="mono text-sm uppercase tracking-[0.6em] text-amber-600 font-black block">
              Transparantie
            </span>
            <h2 className="text-4xl md:text-5xl font-serif italic text-black leading-tight">
              Heldere afspraken
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-stone-700 leading-relaxed">
              <p className="text-lg">
                Voor de architectenwerkzaamheden maken wij duidelijke afspraken, vastgelegd in een overeenkomst gebaseerd op de Consumentenregeling Architect. Zo weet u vooraf waar u aan toe bent.
              </p>
            </div>

            <div className="bg-white p-10 border-2 border-stone-200 rounded-lg space-y-6">
              <FileText className="text-amber-600" size={48} />
              <div>
                <h3 className="font-serif italic text-2xl text-black mb-3">
                  Consumentenregeling Architect
                </h3>
                <ul className="space-y-3">
                  {[
                    "Duidelijke fasering en honorarium",
                    "Rechten en plichten vastgelegd",
                    "Wettelijk beschermd contract",
                    "Transparante kostenbewaking"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-stone-600">
                      <CheckCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 md:px-12 bg-gradient-to-br from-amber-600 to-amber-700 text-white">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-6xl font-serif italic leading-tight">
              Wilt u weten hoe dit proces er voor uw project uitzicht?
            </h2>
            <p className="text-xl md:text-2xl text-amber-100">
              Vraag een gratis quickscan aan of plan een vrijblijvende kennismaking
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsQuickscanOpen(true)}
              className="px-10 py-5 bg-white text-amber-700 rounded-full mono text-sm uppercase tracking-[0.3em] font-black hover:bg-stone-100 transition-all shadow-xl flex items-center justify-center gap-3"
            >
              Gratis Quickscan
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
