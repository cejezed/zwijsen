import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUp, CheckCircle, ArrowRight, TrendingUp, Shield, Calculator, Lightbulb, Euro } from 'lucide-react';
import { BRAND_NAME } from '../data';
import {
  Footer,
  InquiryOverlay,
  ContactBar
} from '../components';

export const Kosten: React.FC = () => {
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
    document.title = 'Wat kost een architect? | Kosten, faalkosten en meerwaarde';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Wat kost een architect bij verbouw of nieuwbouw? Ontdek hoe architectenkosten zich terugverdienen door minder faalkosten en betere ontwerpen.');
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
      {/* Inquiry Overlay */}
      <InquiryOverlay
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
        {/* Achtergrondafbeelding - plaats kosten-hero.jpg in /public/images/ om te gebruiken */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://www.zwijsen.net/wp-content/uploads/2022/10/duinvilla-zandvoort-modern-duinen-architect-12.jpg"
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
              Kosten & Voorbereiding
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif italic leading-[0.9] tracking-tighter">
              Wat kost een <br />architect?
            </h1>
            <p className="text-xl md:text-2xl text-stone-300 max-w-2xl mx-auto font-light">
              Heldere uitleg over kosten, budget en toegevoegde waarde
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
              Gratis Quickscan
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
              Transparantie voorop
            </span>
            <h2 className="text-4xl md:text-6xl font-serif italic text-black leading-tight">
              Kosten lager dan gedacht
            </h2>
          </div>

          <div className="prose prose-lg max-w-none space-y-6 text-stone-700 leading-relaxed">
            <p className="text-xl md:text-2xl font-light">
              De kosten van een architect zijn vaak lager dan gedacht. Toch bestaan er veel vragen en onzekerheden. Op deze pagina leggen wij uit hoe architectenkosten zijn opgebouwd en wat u ervoor terugkrijgt.
            </p>
          </div>
        </div>
      </section>

      {/* Architectenkosten in de praktijk */}
      <section className="py-32 px-6 md:px-12 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="mono text-sm uppercase tracking-[0.6em] text-amber-600 font-black block">
                  De Praktijk
                </span>
                <h2 className="text-4xl md:text-5xl font-serif italic text-black leading-tight">
                  Architectenkosten in de praktijk
                </h2>
              </div>

              <div className="space-y-6 text-stone-700 leading-relaxed">
                <p className="text-lg">
                  Gemiddeld liggen de kosten van een architect bij particuliere woningbouw tussen de <strong>3 en 6% van de bouwkosten</strong>, afhankelijk van de omvang en complexiteit van het project.
                </p>
                <p className="text-xl font-serif italic text-amber-700">
                  Dit percentage zegt echter niet alles: belangrijker is wat u ervoor terugkrijgt.
                </p>
              </div>
            </div>

            <div className="bg-white p-10 border-2 border-stone-200 rounded-lg">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Calculator className="text-amber-600" size={48} />
                  <div>
                    <p className="mono text-xs uppercase tracking-wider text-stone-500 font-bold">
                      Rekenvoorbeeld
                    </p>
                    <h3 className="font-serif italic text-2xl text-black">
                      Bij € 500.000 bouwsom
                    </h3>
                  </div>
                </div>

                <div className="border-t border-stone-200 pt-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-stone-600">Architectenkosten (4%)</span>
                    <span className="font-serif italic text-2xl text-black">€ 20.000</span>
                  </div>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    Dit omvat het complete traject van schetsontwerp tot en met bouwbegeleiding, inclusief vergunningaanvraag en technische uitwerking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Faalkosten - NIEUW */}
      <section className="py-32 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-gradient-to-br from-red-50 to-orange-50 p-10 border-2 border-red-200 rounded-lg">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Shield className="text-red-600" size={48} />
                    <div>
                      <p className="mono text-xs uppercase tracking-wider text-red-600 font-bold">
                        Belangrijk om te weten
                      </p>
                      <h3 className="font-serif italic text-2xl text-black">
                        Verborgen kosten
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-4 text-stone-700 leading-relaxed">
                    <p className="text-base">
                      Aanpassingen tijdens de bouw, verkeerde aannames, onduidelijke offertes of keuzes die later moeten worden hersteld.
                    </p>
                    <p className="text-lg font-serif italic text-red-700">
                      Deze zogenoemde faalkosten zijn vaak vele malen hoger dan het honorarium van een architect.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8">
              <div className="space-y-4">
                <span className="mono text-sm uppercase tracking-[0.6em] text-amber-600 font-black block">
                  Verborgen Kosten
                </span>
                <h2 className="text-4xl md:text-5xl font-serif italic text-black leading-tight">
                  Faalkosten: de verborgen kosten zonder architect
                </h2>
              </div>

              <div className="space-y-6 text-stone-700 leading-relaxed">
                <p className="text-lg">
                  In de praktijk ontstaan veel extra kosten door fouten die vooraf voorkomen hadden kunnen worden. Denk aan aanpassingen tijdens de bouw, onduidelijke offertes, verkeerde aannames of keuzes die later moeten worden hersteld.
                </p>
                <p className="text-xl font-serif italic text-amber-700">
                  De kosten van een architect verdienen zich vaak terug door het voorkomen van faalkosten.
                </p>
                <p className="text-lg">
                  Door vooraf helder te ontwerpen, keuzes goed te onderbouwen en documenten duidelijk vast te leggen, worden deze kosten sterk beperkt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meer dan tekeningen - NIEUW */}
      <section className="py-20 px-6 md:px-12 bg-stone-50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white p-12 border-2 border-amber-200 rounded-lg space-y-6"
          >
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center text-white shrink-0">
                <Lightbulb size={28} />
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl md:text-4xl font-serif italic text-black">
                  Meer dan tekeningen
                </h3>
                <div className="space-y-4 text-stone-700 leading-relaxed">
                  <p className="text-lg">
                    Een architect levert geen losse tekeningen, maar samenhang. Wij overzien hoe ontwerpkeuzes invloed hebben op comfort, kosten, regelgeving en uitvoering.
                  </p>
                  <p className="text-xl font-serif italic text-amber-700">
                    Juist die samenhang zorgt ervoor dat aannemers gerichter kunnen offreren, dat budgetten beter bewaakt blijven en dat het eindresultaat klopt — technisch én ruimtelijk.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Waarom het zich terugverdient - NIEUW */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white p-10 md:p-12 border-2 border-amber-600 rounded-lg space-y-8"
          >
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center text-white shrink-0">
                <Euro size={28} />
              </div>
              <div className="space-y-6">
                <h3 className="text-3xl md:text-4xl font-serif italic text-black">
                  Waarom een architect vaak goedkoper is dan het lijkt
                </h3>
                <div className="space-y-4 text-stone-700 leading-relaxed">
                  <p className="text-lg md:text-xl">
                    Veel extra kosten ontstaan door keuzes die te laat worden gemaakt of verkeerd worden ingeschat — nog vóórdat er een offerte ligt. Faalkosten zitten vaak in herstelwerk, meerwerkdiscussies, vertraging en het 'achteraf toch anders willen'.
                  </p>
                  <p className="text-xl font-serif italic text-amber-700">
                    Onze rol is om die risico's vroeg zichtbaar te maken en een ontwerp zo helder vast te leggen dat uitvoering en offertes kloppen.
                  </p>
                  <p className="text-lg">
                    Daarmee wordt een architectenhonorarium in de praktijk vaak een investering die zichzelf terugverdient.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Wat levert een architect op */}
      <section className="py-32 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <span className="mono text-sm uppercase tracking-[0.6em] text-amber-600 font-black block">
              Toegevoegde Waarde
            </span>
            <h2 className="text-4xl md:text-5xl font-serif italic text-black leading-tight">
              Wat levert een architect op?
            </h2>
            <p className="text-xl text-stone-700">
              Een architect verdient zich vaak terug door deze toegevoegde waarde
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Shield,
                title: "Het voorkomen van dure fouten",
                description: "Door zorgvuldige planning en technische controle worden kostbare missers in de bouw voorkomen. Dit alleen kan al meer opleveren dan de kosten van een architect."
              },
              {
                icon: Lightbulb,
                title: "Het maken van doordachte keuzes",
                description: "Materialen, constructies en installaties worden slim gekozen: functioneel, duurzaam en passend binnen het budget."
              },
              {
                icon: CheckCircle,
                title: "Het verbeteren van offertes",
                description: "Duidelijke stukken en tekeningen zorgen ervoor dat aannemers scherpe, vergelijkbare offertes kunnen maken. Dit leidt vaak tot betere prijzen."
              },
              {
                icon: TrendingUp,
                title: "Het bewaken van budget en kwaliteit",
                description: "Tijdens de bouw wordt toegezien op kwaliteit en worden meerkosten tijdig gesignaleerd. Zo blijft het project binnen budget en levert het de gewenste kwaliteit."
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-stone-50 p-8 border-2 border-stone-200 hover:border-amber-600 transition-all group"
              >
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <item.icon size={28} />
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

          <div className="bg-amber-50 border-2 border-amber-200 p-8 rounded-lg">
            <p className="text-lg text-center text-stone-700 leading-relaxed">
              <strong className="text-amber-800">Daarnaast</strong> zorgt een goed ontwerp voor meer <strong>woonkwaliteit en waardevastheid</strong>. Een doordacht ontworpen woning is niet alleen prettiger om in te wonen, maar behoudt ook beter zijn waarde op de lange termijn.
            </p>
          </div>
        </div>
      </section>

      {/* Grip op bouwkosten */}
      <section className="py-32 px-6 md:px-12 bg-stone-900 text-white">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="space-y-6">
            <span className="mono text-sm uppercase tracking-[0.6em] text-amber-500 font-black block">
              Budgetbewaking
            </span>
            <h2 className="text-4xl md:text-5xl font-serif italic leading-tight">
              Grip op bouwkosten
            </h2>
          </div>

          <div className="prose prose-lg prose-invert max-w-none space-y-6 text-stone-300 leading-relaxed">
            <p className="text-xl">
              Vanaf de eerste schetsen houden wij rekening met het beschikbare budget. Door vroegtijdig een kostenraming te maken, vaak samen met een aannemer, ontstaat snel inzicht in de haalbaarheid.
            </p>
            <p className="text-lg">
              Dit voorkomt onaangename verrassingen later in het proces. U weet zo vroeg mogelijk waar u aan toe bent en welke keuzes nog gemaakt kunnen worden.
            </p>
          </div>
        </div>
      </section>

      {/* Wanneer is het verstandig */}
      <section className="py-32 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <span className="mono text-sm uppercase tracking-[0.6em] text-amber-600 font-black block">
              Het Juiste Moment
            </span>
            <h2 className="text-4xl md:text-5xl font-serif italic text-black leading-tight">
              Wanneer is het verstandig een architect in te schakelen?
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6 text-stone-700 leading-relaxed">
              <p className="text-lg">
                Een architect is vooral waardevol bij:
              </p>

              <ul className="space-y-4">
                {[
                  "Een concreet plan voor verbouw of nieuwbouw",
                  "Een duidelijke locatie of woning",
                  "De wens om kwaliteit en comfort centraal te stellen",
                  "Complexe bouwkundige vraagstukken",
                  "Vergunningsplichtige projecten"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle size={24} className="text-amber-600 shrink-0 mt-0.5" />
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-stone-50 p-10 border-2 border-stone-200 rounded-lg space-y-6">
              <div className="space-y-4">
                <h3 className="font-serif italic text-2xl text-black">
                  Nog in de oriëntatiefase?
                </h3>
                <p className="text-stone-700 leading-relaxed">
                  Zit u nog in een oriënterende fase, dan kan het helpen om eerst inzicht te krijgen in mogelijkheden en randvoorwaarden.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-stone-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-white mono font-black shrink-0">
                    K
                  </div>
                  <div>
                    <h4 className="font-serif italic text-lg text-black mb-2">KavelArchitect</h4>
                    <p className="text-sm text-stone-600">Onderzoek wat er op een kavel mogelijk is</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-white mono font-black shrink-0">
                    B
                  </div>
                  <div>
                    <h4 className="font-serif italic text-lg text-black mb-2">Brikx</h4>
                    <p className="text-sm text-stone-600">Structureer uw wensen en budget</p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-stone-600 italic pt-4">
                Zodra er een concreet plan ontstaat, begeleiden wij u graag verder.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Maatwerk = waarde - NIEUW */}
      <section className="py-32 px-6 md:px-12 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <span className="mono text-sm uppercase tracking-[0.6em] text-amber-600 font-black block">
                  Lange Termijn
                </span>
                <h2 className="text-4xl md:text-5xl font-serif italic text-black leading-tight">
                  Waarom een passend ontwerp zijn waarde behoudt
                </h2>
              </div>

              <div className="space-y-6 text-stone-700 leading-relaxed">
                <p className="text-lg">
                  Een woning die logisch is ingedeeld, prettig aanvoelt en toekomstbestendig is ontworpen, behoudt zijn waarde beter. Niet alleen financieel, maar vooral in woonkwaliteit.
                </p>
                <p className="text-xl font-serif italic text-amber-700">
                  Maatwerk betekent dat de woning is afgestemd op de bewoners, niet andersom. Dat is geen luxe, maar een investering in jarenlang woonplezier.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 gap-6"
            >
              {[
                { icon: TrendingUp, label: "Waardevastheid", desc: "Doordachte ontwerpen behouden hun waarde" },
                { icon: CheckCircle, label: "Woonkwaliteit", desc: "Prettig functioneren jaar na jaar" },
                { icon: Lightbulb, label: "Toekomstbestendig", desc: "Voorbereid op veranderende woonwensen" }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-8 border-2 border-stone-200 rounded-lg hover:border-amber-600 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-amber-600 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform shrink-0">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-serif italic text-xl text-black mb-1">
                        {item.label}
                      </h3>
                      <p className="text-sm text-stone-600">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 md:px-12 bg-gradient-to-br from-amber-600 to-amber-700 text-white">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-6xl font-serif italic leading-tight">
              Twijfelt u over haalbaarheid of kosten?
            </h2>
            <p className="text-xl md:text-2xl text-amber-100">
              Vraag een gratis quickscan aan en krijg direct inzicht in mogelijkheden en budget
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsInquiryOpen(true)}
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
