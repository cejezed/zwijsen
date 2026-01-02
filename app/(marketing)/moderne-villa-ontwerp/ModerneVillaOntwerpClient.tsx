"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUp,
  CheckCircle,
  ShieldCheck,
  Ruler,
  Lightbulb,
  Users,
  Clock,
} from "lucide-react";

import { PROJECTS_DETAIL } from "../../../data/projecten";
import { Footer, InquiryOverlay, QuickscanOverlay, ContactBar } from "../../../components";

/**
 * Projectselectie:
 * - Vul bij voorkeur MODERNE_VILLA_PROJECT_SLUGS met 3–6 echte projecten voor maximale controle.
 * - Laat u de array leeg, dan wordt er automatisch gefilterd op "modern" / "villa" / "paviljoen" / "strak" / "minimal".
 */
const MODERNE_VILLA_PROJECT_SLUGS: string[] = [
  // TODO: vul met echte slugs uit PROJECTS_DETAIL
  // Voorbeelden:
  // "architect-gameren-villa-aan-het-water",
  // "architect-ruurlo-prefab-houten-villa-met-patios",
];

type ProjectCard = {
  slug: string;
  title: string;
  subtitle: string;
  location?: string;
  image?: string;
  explanation: string;
};

const buildModernVillaProjects = (): ProjectCard[] => {
  const list = PROJECTS_DETAIL.filter((p) => {
    if (MODERNE_VILLA_PROJECT_SLUGS.length > 0) return p.slug && MODERNE_VILLA_PROJECT_SLUGS.includes(p.slug);

    const subtitle = 'subtitle' in p ? p.subtitle ?? '' : ('description' in p ? p.description : '');
    const tags = 'tags' in p ? p.tags ?? [] : ('tag' in p ? [p.tag] : []);
    const hay = `${p.title} ${subtitle} ${tags.join(" ")}`.toLowerCase();

    const isVillaLike = hay.includes("villa") || hay.includes("paviljoen") || hay.includes("landhuis");
    const isModernLike =
      hay.includes("modern") ||
      hay.includes("strak") ||
      hay.includes("minimal") ||
      hay.includes("transparant") ||
      hay.includes("glas") ||
      hay.includes("ruurlo");

    // U kunt hier desgewenst strenger/ruimer maken
    return isVillaLike && isModernLike;
  }).slice(0, 6);

  const pickExplanation = (p: any): string => {
    const subtitle = 'subtitle' in p ? p.subtitle ?? '' : ('description' in p ? p.description : '');
    const tags = 'tags' in p ? p.tags ?? [] : ('tag' in p ? [p.tag] : []);
    const hay = `${p.title} ${subtitle} ${tags.join(" ")}`.toLowerCase();

    // Heuristische, maar inhoudelijke uitleg — geen marketingzinnen
    if (hay.includes("water") || hay.includes("vecht") || hay.includes("kade")) {
      return "Moderne architectuur werkt hier door gerichte zichtlijnen en gecontroleerde openheid: uitzicht waar het kan, privacy waar het moet.";
    }
    if (hay.includes("bos") || hay.includes("landschap") || hay.includes("buitengebied")) {
      return "De rust ontstaat door heldere volumes en een beperkt palet aan materialen, zodat de woning onderdeel wordt van het landschap in plaats van een object erin.";
    }
    if (hay.includes("patio") || hay.includes("binnenhof") || hay.includes("hof")) {
      return "De moderne helderheid zit hier in de plattegrondlogica: een duidelijke ordening rond beschutte buitenruimtes, met licht en privacy in balans.";
    }
    if (hay.includes("hout") || hay.includes("biobased") || hay.includes("circulair")) {
      return "Moderne architectuur wordt hier gedragen door materialisatie: rustige detaillering en consistente keuzes, zodat het ontwerp tijdloos blijft en mooi veroudert.";
    }
    if (hay.includes("transparant") || hay.includes("glas") || hay.includes("zichtlijnen")) {
      return "De kwaliteit zit in precisie: glas is hier niet ‘meer’, maar op de juiste plekken ingezet, met verhoudingen en schaduwwerking die rust brengen.";
    }
    return "De moderne uitstraling ontstaat hier niet door een truc, maar door heldere verhoudingen, een logische plattegrond en een consequent detailniveau.";
  };

  return list.map((p) => ({
    slug: p.slug ?? '',
    title: p.title,
    subtitle: 'subtitle' in p ? p.subtitle : ('description' in p ? p.description : ''),
    location: 'locationLabel' in p ? p.locationLabel : ('location' in p ? p.location : undefined),
    image: 'featuredImage' in p ? p.featuredImage?.url ?? '' : (typeof p.image === 'string' ? p.image : p.image?.url ?? ''),
    explanation: pickExplanation(p),
  }));
};

const FAQS = [
  {
    tag: "STIJL",
    q: "Wat wordt verstaan onder een moderne villa?",
    a:
      "Een moderne villa is geen vast stijlrecept, maar een manier van ontwerpen waarbij verhoudingen, licht, ruimte en materialisatie samenkomen in een rustig, samenhangend geheel. Niet strak om het strak zijn, maar helder omdat het past bij de plek en het dagelijks gebruik.",
  },
  {
    tag: "DAK",
    q: "Is een moderne villa altijd een woning met plat dak?",
    a:
      "Nee. Moderne architectuur kan zowel een plat dak als een kap hebben. De kwaliteit zit vooral in heldere volumes, goede verhoudingen en een doordachte detailopbouw, niet in één specifiek daktype.",
  },
  {
    tag: "KOSTEN",
    q: "Is een moderne villa duurder dan een traditionele villa?",
    a:
      "Niet per definitie. De kosten worden vooral bepaald door volume, detaillering, materialisatie en technische ambities. Moderne architectuur vraagt wel om precisie in details; als die zorgvuldigheid ontbreekt, gaat kwaliteit verloren.",
  },
  {
    tag: "KAVEL",
    q: "Past een moderne villa bij elke kavel?",
    a:
      "Niet altijd. Oriëntatie, privacy, bezonning, uitzicht en regels (welstand/bestemmingsplan) bepalen hoeveel openheid en helderheid haalbaar is. Een goed modern ontwerp is altijd plaatsgebonden en reageert op de kavel.",
  },
  {
    tag: "MATCH",
    q: "Wanneer is een moderne villa minder geschikt?",
    a:
      "Als de kavel weinig ontwerpvrijheid biedt, de oriëntatie ongunstig is, het budget geen ruimte laat voor zorgvuldige detaillering, of welstand sterk stuurt op traditionele beeldtaal. In die gevallen is een andere architectuurtaal vaak logischer en sterker.",
  },
];

export const ModerneVillaOntwerpClient: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isQuickscanOpen, setIsQuickscanOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const contactBarOpacity = useTransform(scrollY, [300, 600], [0, 1]);
  const parallaxY = useTransform(scrollY, [0, 1000], [0, -200]);

  const { scrollYProgress: footerScroll } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });
  const footerParallaxText = useTransform(footerScroll, [0, 1], [0, -1500]);
  const footerOpacity = useTransform(footerScroll, [0, 0.4], [0, 1]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 1000);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const projects = useMemo(() => buildModernVillaProjects(), []);

  return (
    <>
      <InquiryOverlay isOpen={isInquiryOpen} onClose={() => setIsInquiryOpen(false)} />
      <QuickscanOverlay isOpen={isQuickscanOpen} onClose={() => setIsQuickscanOpen(false)} />

      {/* HERO */}
      <motion.section
        style={{ opacity: heroOpacity }}
        className="relative h-screen flex items-center justify-center bg-stone-900 text-white overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="https://zwijsen.net/wp-content/uploads/2022/10/villa-ruurlo-architect-achterhoek-lochem-1.jpg"
            alt="Moderne villa met heldere lijnen, zorgvuldig licht en rustige verhoudingen"
            className="w-full h-full object-cover opacity-40 transition-opacity duration-1000"
            onLoad={(e) => {
              e.currentTarget.classList.remove('opacity-40');
              e.currentTarget.classList.add('opacity-100');
            }}
            onError={(e) => (e.currentTarget.style.display = "none")}
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
              Moderne villa
            </span>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif italic leading-[0.95] tracking-tighter">
              Moderne villa ontwerpen
            </h1>

            <p className="text-xl md:text-2xl text-stone-300 max-w-3xl mx-auto font-light">
              Heldere lijnen, ruimtelijke rust en een woning die klopt in gebruik, detail en context.
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
              Past dit bij mijn kavel
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
              { icon: Ruler, label: "Ruimtelijke helderheid" },
              { icon: ShieldCheck, label: "Tijdloze keuzes" },
              { icon: Lightbulb, label: "Ontwerp met samenhang" },
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

      {/* INLEIDING */}
      <section className="py-28 md:py-32 px-6 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto space-y-8">
          <span className="mono text-sm uppercase tracking-[0.6em] text-amber-600 font-black block">
            Definitie
          </span>

          <h2 className="text-4xl md:text-5xl font-serif italic text-black leading-tight">
            Moderne villa-architectuur is geen stijltruc
          </h2>

          <p className="text-xl text-stone-700 leading-relaxed">
            Een moderne villa is geen vast recept en geen modetrend. Het is een manier van ontwerpen waarbij
            verhoudingen, licht, ruimte en materialisatie samenkomen in een rustige, samenhangende woning.
            Niet strak om het strak zijn, maar helder omdat het past bij de plek, de bewoners en het dagelijks gebruik.
          </p>

          <p className="text-xl text-stone-700 leading-relaxed">
            Wij ontwerpen moderne villa’s voor opdrachtgevers die bewust kiezen voor kwaliteit en maatwerk, en
            begrijpen dat een goed ontwerp begint bij de juiste keuzes — niet bij een beeld.
          </p>
        </div>
      </section>

      {/* ONTWERPKEUZES */}
      <section className="py-28 md:py-32 px-6 md:px-12 bg-stone-50">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <span className="mono text-sm uppercase tracking-[0.6em] text-amber-600 font-black block">
              Ontwerpkeuzes
            </span>

            <h2 className="text-4xl md:text-5xl font-serif italic text-black leading-tight">
              Keuzes die een moderne villa maken of breken
            </h2>

            <p className="text-xl text-stone-700 leading-relaxed">
              Een moderne villa slaagt of faalt op een klein aantal cruciale keuzes. Dit zijn de punten waar wij in
              het ontwerp scherp op sturen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Verhoudingen",
                description:
                  "De maatvoering van volumes, gevelvlakken en openingen bepaalt of een woning rustig oogt of onrustig aanvoelt.",
              },
              {
                title: "Licht en zichtlijnen",
                description:
                  "Niet waar kan overal glas, maar waar versterkt daglicht het wonen daadwerkelijk?",
              },
              {
                title: "Relatie met de kavel",
                description:
                  "Oriëntatie, privacy, bezonning en uitzicht bepalen hoe open een woning kan zijn, zonder concessies in comfort.",
              },
              {
                title: "Materialisatie",
                description:
                  "Minder materialen, bewuster toegepast. Rust ontstaat door consistentie en logica, niet door variatie.",
              },
              {
                title: "Detaillering",
                description:
                  "Moderne architectuur vraagt precisie. Slordige details worden zichtbaar en kosten op termijn meer dan u wilt.",
              },
              {
                title: "Samenhang",
                description:
                  "Een moderne villa is geen optelsom van ideeën, maar één geheel waarin plattegrond, gevel en techniek elkaar versterken.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className="bg-white p-8 border border-stone-200 hover:border-amber-600 transition-all"
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
        </div>
      </section>

      {/* PROJECTEN (bewijs + uitleg) */}
      <section className="py-28 md:py-32 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <span className="mono text-sm uppercase tracking-[0.6em] text-amber-600 font-black block">
              Voorbeelden
            </span>

            <h2 className="text-4xl md:text-5xl font-serif italic text-black leading-tight">
              Projecten waarin moderne architectuur werkt
            </h2>

            <p className="text-xl text-stone-700 leading-relaxed">
              Niet “modern om modern”, maar modern omdat het logisch is voor de kavel, het gebruik en de gewenste rust.
              Hieronder een selectie projecten met telkens één kernkeuze die het ontwerp draagt.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <a
                key={p.slug}
                href={`/portfolio/${p.slug}`}
                className="group block border border-stone-200 rounded-xl overflow-hidden bg-white hover:border-amber-600 transition-colors"
              >
                <div className="aspect-[16/10] bg-stone-100 overflow-hidden">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={`${p.title} – moderne villa architectuur met rustige verhoudingen`}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-400">
                      Voeg featuredImage toe
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-3">
                  <div className="mono text-[10px] uppercase tracking-[0.4em] text-amber-600 font-black">
                    Moderne villa
                  </div>

                  <div className="text-xl font-serif italic text-stone-900">{p.title}</div>

                  {p.location ? (
                    <div className="text-sm text-stone-500">{p.location}</div>
                  ) : null}

                  <div className="text-sm text-stone-600 leading-relaxed">
                    {p.explanation}
                  </div>

                  <div className="pt-2 text-sm text-stone-900 inline-flex items-center gap-2">
                    Bekijk project
                    <span className="text-amber-600 group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center">
            <a
              href="/portfolio"
              className="px-10 py-5 border-2 border-stone-900 text-stone-900 rounded-full mono text-sm uppercase tracking-[0.3em] font-black hover:bg-stone-900 hover:text-white transition-all inline-flex items-center gap-3"
            >
              Bekijk alle projecten
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* CONTEXT */}
      <section className="py-28 md:py-32 px-6 md:px-12 bg-stone-50">
        <div className="max-w-4xl mx-auto space-y-8">
          <span className="mono text-sm uppercase tracking-[0.6em] text-amber-600 font-black block">
            Context
          </span>

          <h2 className="text-4xl md:text-5xl font-serif italic text-black leading-tight">
            Een moderne villa is altijd plaatsgebonden
          </h2>

          <p className="text-xl text-stone-700 leading-relaxed">
            Een geslaagde moderne villa ziet er nooit overal hetzelfde uit. De context bepaalt het ontwerp: landschap,
            water, omliggende bebouwing en regels geven richting aan vorm, openheid en materialisatie.
          </p>

          <p className="text-xl text-stone-700 leading-relaxed">
            Een moderne villa versterkt de omgeving in plaats van ermee te concurreren. Daarom toetsen wij in het
            ontwerp vroeg op oriëntatie, zichtlijnen, privacy en haalbaarheid.
          </p>
        </div>
      </section>

      {/* DOORKLIK NAAR TRAJECT */}
      <section className="relative py-28 md:py-32 px-6 md:px-12 text-white overflow-hidden">
        <motion.div
          style={{ y: parallaxY }}
          className="absolute inset-0 z-0"
        >
          <img
            src="https://www.zwijsen.net/wp-content/uploads/2025/12/Bestemmingsplan-Afwijking-Architect-Vooroverleg-villa-blaricum.jpeg"
            alt="Moderne villa achtergrond"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/90 via-stone-900/85 to-stone-900/90" />
        </motion.div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-10">
          <span className="mono text-sm uppercase tracking-[0.6em] text-amber-500 font-black block">
            Realisatie
          </span>

          <h2 className="text-4xl md:text-5xl font-serif italic leading-tight">
            Van stijl naar realisatie
          </h2>

          <p className="text-xl text-stone-300 leading-relaxed max-w-3xl mx-auto">
            Een moderne villa ontwerpen is één ding. Het goed realiseren vraagt om samenhang tussen ontwerp, techniek
            en haalbaarheid. Afhankelijk van uw situatie begeleiden wij nieuwbouw of een zorgvuldige herontwikkeling.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/nieuwbouw-villa"
              className="px-10 py-5 bg-amber-600 text-white rounded-full mono text-sm uppercase tracking-[0.3em] font-black hover:bg-amber-700 transition-all inline-flex items-center gap-3"
            >
              Nieuwbouw moderne villa
              <ArrowRight size={18} />
            </a>
            <a
              href="/verbouwing-woning"
              className="px-10 py-5 border-2 border-white text-white rounded-full mono text-sm uppercase tracking-[0.3em] font-black hover:bg-white hover:text-black transition-all inline-flex items-center gap-3"
            >
              Moderne villa verbouwen
              <ArrowRight size={18} />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 max-w-4xl mx-auto">
            {[
              { icon: Users, label: "Direct contact" },
              { icon: Clock, label: "Heldere stappen" },
              { icon: Lightbulb, label: "Doordacht advies" },
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

      {/* FAQ (visible + synced with schema in page.tsx) */}
      <section id="faq" className="py-28 md:py-32 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <span className="mono text-sm uppercase tracking-[0.6em] text-amber-600 font-black block">
              FAQ
            </span>

            <h2 className="text-4xl md:text-5xl font-serif italic text-black leading-tight">
              Veelgestelde vragen over een moderne villa
            </h2>

            <p className="text-xl text-stone-700">
              Heldere antwoorden op vragen die in de oriëntatiefase het meest spelen.
            </p>
          </div>

          <div className="divide-y divide-stone-200 border border-stone-200 rounded-xl overflow-hidden bg-stone-50">
            {FAQS.map((f, idx) => (
              <details key={idx} className="group p-6 open:bg-white">
                <summary className="cursor-pointer list-none flex items-start justify-between gap-6">
                  <div className="space-y-1">
                    <div className="mono text-[10px] uppercase tracking-[0.4em] text-amber-600 font-black">
                      {f.tag}
                    </div>
                    <div className="text-lg md:text-xl font-serif italic text-stone-900">
                      {f.q}
                    </div>
                  </div>
                  <div className="text-stone-400 group-open:rotate-180 transition-transform">
                    ▾
                  </div>
                </summary>
                <div className="pt-4 text-stone-600 font-light leading-relaxed">
                  {f.a}
                </div>
              </details>
            ))}
          </div>

          <div className="text-center pt-6">
            <button
              onClick={() => setIsQuickscanOpen(true)}
              className="px-10 py-5 bg-stone-900 text-white rounded-full mono text-sm uppercase tracking-[0.3em] font-black hover:bg-stone-800 transition-all shadow-xl inline-flex items-center gap-3"
            >
              Vraag een quickscan aan
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
            onClick={scrollToTop}
            className="fixed bottom-24 md:bottom-32 right-6 md:right-10 z-[120] p-4 md:p-6 bg-black text-white shadow-2xl rounded-full transition-all hover:bg-amber-600"
            aria-label="Scroll naar boven"
          >
            <ArrowUp className="w-5 h-5 md:w-6 md:h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <ContactBar opacity={contactBarOpacity} onStartTraject={() => setIsInquiryOpen(true)} />
    </>
  );
};
