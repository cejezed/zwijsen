'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowUp, Award, CheckCircle, ArrowRight, Users, Clock, Lightbulb } from 'lucide-react';
import { PROCESS_STEPS } from '../../data/index';
import {
    Footer,
    InquiryOverlay,
    QuickscanOverlay,
    ContactBar
} from '../../components';

export const ArchitectClient: React.FC = () => {
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

            {/* Hero Section */}
            <motion.section
                style={{ opacity: heroOpacity }}
                className="relative h-screen flex items-center justify-center bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white overflow-hidden"
            >
                {/* Achtergrondafbeelding - plaats architect-hero.jpg in /public/images/ om te gebruiken */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://www.zwijsen.net/wp-content/uploads/2025/11/moderne-rieten-kap-villa-architect-ontwerp-moderne-rietkap-woning-glazen-gevel-gezinsleven.jpg"
                        alt=""
                        className="w-full h-full object-cover opacity-0"
                        onLoad={(e) => e.currentTarget.classList.replace('opacity-0', 'opacity-100')}
                        onError={(e) => e.currentTarget.style.display = 'none'}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
                </div>

                {/* Background pattern */}
                <div className="absolute inset-0 opacity-5 z-[1]">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                </div>

                <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 text-center space-y-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <span className="mono text-xs md:text-sm uppercase tracking-[0.6em] text-amber-500 font-black block">
                            Architectenbureau
                        </span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif italic leading-[0.9] tracking-tighter">
                            Jules Zwijsen
                        </h1>
                        <p className="text-xl md:text-2xl text-stone-300 max-w-2xl mx-auto font-light">
                            Gespecialiseerd in particuliere woningbouw
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

            {/* Architect Showcase - Paginabreed met foto */}
            <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
                <div className="w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
                        {/* Linker kolom - Tekst */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="flex items-center justify-center px-8 md:px-16 py-20 lg:py-32 bg-gradient-to-br from-stone-50 to-white"
                        >
                            <div className="max-w-xl space-y-10">
                                <div className="space-y-6">
                                    <span className="mono text-xs uppercase tracking-[0.6em] text-amber-600 font-black block">
                                        Sinds 2006
                                    </span>
                                    <h2 className="text-4xl md:text-6xl font-serif italic text-black leading-[1.1]">
                                        Architect<br />Jules Zwijsen
                                    </h2>
                                </div>

                                <div className="space-y-6 text-stone-700 leading-relaxed">
                                    <p className="text-lg md:text-xl font-light">
                                        Voor particuliere opdrachtgevers die willen verbouwen of nieuw bouwen. Sinds 2006 helpen wij opdrachtgevers bij het realiseren van een woning die past bij hun manier van leven, de specifieke kenmerken van de locatie en het beschikbare budget.
                                    </p>
                                    <p className="text-base md:text-lg">
                                        Geschikt voor nieuwbouw op eigen kavel en ingrijpende verbouwingen. Jules Zwijsen deed ruime ervaring op in Amsterdam en startte zijn eigen architectenbureau. Door de bewuste keuze voor een kleinschalig bureau is persoonlijke betrokkenheid vanzelfsprekend.
                                    </p>
                                    <p className="text-base md:text-lg font-serif italic text-amber-700">
                                        20+ jaar praktijkervaring in particuliere woningbouw, met 100+ begeleide (ver)bouwprojecten — van ontwerp tot oplevering.
                                    </p>
                                    <p className="text-base md:text-lg">
                                        U heeft direct contact met de architect, korte lijnen en heldere communicatie gedurende het hele traject — van eerste idee tot en met oplevering.
                                    </p>
                                </div>

                                {/* Architectenregister Badge */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 }}
                                    className="inline-flex items-center gap-4 bg-white p-6 border-2 border-amber-600/20 rounded-lg shadow-lg"
                                >
                                    <Award className="text-amber-600" size={36} />
                                    <div>
                                        <p className="mono text-xs uppercase tracking-wider font-black text-black">
                                            Architectenregister
                                        </p>
                                        <p className="text-sm text-stone-600 mt-1">
                                            Registratienummer: 1.010615/013
                                        </p>
                                    </div>
                                </motion.div>

                                {/* CTA Buttons */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 }}
                                    className="flex flex-col sm:flex-row gap-4 pt-4"
                                >
                                    <button
                                        onClick={() => setIsInquiryOpen(true)}
                                        className="px-8 py-4 bg-amber-600 text-white rounded-lg mono text-xs uppercase tracking-[0.2em] font-black hover:bg-amber-700 transition-all shadow-lg flex items-center justify-center gap-3"
                                    >
                                        Kennismaken
                                        <ArrowRight size={16} />
                                    </button>
                                    <button
                                        onClick={() => {
                                            const element = document.querySelector('#werkwijze-section');
                                            element?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className="px-8 py-4 border-2 border-stone-900 text-stone-900 rounded-lg mono text-xs uppercase tracking-[0.2em] font-black hover:bg-stone-900 hover:text-white transition-all flex items-center justify-center gap-3"
                                    >
                                        Werkwijze
                                        <ArrowRight size={16} />
                                    </button>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Rechter kolom - Foto */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative h-[600px] lg:h-full"
                        >
                            {/* Foto */}
                            <div className="absolute inset-0">
                                <img
                                    src="/images/jules-zwijsen.jpg"
                                    alt="Architect Jules Zwijsen"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Decoratief element */}
                            <div className="absolute top-12 right-12 bg-amber-600 text-white p-6 rounded-lg shadow-2xl backdrop-blur-sm bg-opacity-95 hidden lg:block">
                                <p className="mono text-xs uppercase tracking-wider font-black">
                                    Sinds 2006
                                </p>
                                <p className="text-3xl font-serif italic mt-2">20+ jaar<br />ervaring</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Intro Text - Paginabreed */}
            <section className="py-24 md:py-32 px-6 md:px-12 bg-stone-900 text-white">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8 text-center"
                    >
                        <h2 className="text-3xl md:text-5xl font-serif italic leading-tight">
                            Van ingrijpende verbouwingen tot complete nieuwbouwvilla's:<br />elk project is maatwerk
                        </h2>
                        <p className="text-lg md:text-xl text-stone-300 max-w-3xl mx-auto font-light">
                            Onze ontwerpen zijn functioneel, duurzaam en tijdloos. Geen standaardoplossingen, maar woningen die logisch zijn opgebouwd, prettig functioneren en ook op lange termijn hun waarde behouden.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Parallax Image Section */}
            <section className="relative h-[60vh] md:h-[70vh] overflow-hidden bg-gradient-to-br from-stone-800 to-stone-900">
                {/* Parallax Image */}
                <motion.div
                    className="absolute inset-0 w-full h-[120%]"
                    style={{
                        y: useTransform(scrollY, [1200, 2000], [0, -150])
                    }}
                >
                    <img
                        src="https://www.zwijsen.net/wp-content/uploads/2025/12/833_2160_resize.jpg"
                        alt=""
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                        }}
                    />
                </motion.div>

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/30 z-[1]" />

                <div className="relative h-full flex items-center justify-center px-6 md:px-12 z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center text-white max-w-4xl space-y-8"
                    >
                        <h2 className="text-4xl md:text-6xl font-serif italic leading-tight">
                            Elk project is uniek
                        </h2>
                        <p className="text-xl md:text-2xl font-light">
                            Van eerste schets tot definitief ontwerp: wij werken samen met u aan een woning die precies past bij uw leven
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Kernkwaliteiten */}
            <section className="py-32 px-6 md:px-12 bg-white">
                <div className="max-w-6xl mx-auto space-y-20">
                    <div className="text-center space-y-6 max-w-3xl mx-auto">
                        <span className="mono text-sm uppercase tracking-[0.6em] text-amber-600 font-black block">
                            Kernkwaliteiten
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif italic text-black leading-tight">
                            Wensen, locatie en budget in balans
                        </h2>
                        <p className="text-xl text-stone-700 leading-relaxed">
                            Een goed ontwerp ontstaat daar waar persoonlijke wensen, de mogelijkheden van de locatie en het beschikbare budget samenkomen. Wij zoeken altijd naar die balans.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Functioneel & Tijdloos",
                                description: "Woningen die logisch zijn opgebouwd, prettig functioneren en op lange termijn hun waarde behouden."
                            },
                            {
                                title: "Duurzaam Bouwen",
                                description: "Aandacht voor energiezuinigheid, slim materiaalgebruik en oriëntatie op zon en daglicht."
                            },
                            {
                                title: "Levensloopbestendig",
                                description: "Flexibel in gebruik en voorbereid op veranderende woonwensen door de jaren heen."
                            },
                            {
                                title: "Comfortabel Wonen",
                                description: "Aandacht voor dagelijks gebruik: beweging door de woning, lichtinval, privacy en openheid."
                            },
                            {
                                title: "Energie & Comfort",
                                description: "Doordachte technische oplossingen voor een aangename leefomgeving in alle seizoenen."
                            },
                            {
                                title: "Slimme Keuzes",
                                description: "Heldere keuzes in detail en architectuur die rustig en vanzelfsprekend aanvoelen."
                            }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="bg-stone-50 p-8 border border-stone-200 hover:border-amber-600 transition-all group"
                            >
                                <div className="flex items-start gap-4">
                                    <CheckCircle className="text-amber-600 shrink-0 mt-1 group-hover:scale-110 transition-transform" size={24} />
                                    <div className="space-y-3">
                                        <h3 className="font-serif italic text-xl text-black">
                                            {item.title}
                                        </h3>
                                        <p className="text-stone-600 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Waarom maatwerk loont */}
            <section className="py-32 px-6 md:px-12 bg-stone-50">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-12"
                    >
                        <div className="text-center space-y-6">
                            <span className="mono text-sm uppercase tracking-[0.6em] text-amber-600 font-black block">
                                Maatwerk
                            </span>
                            <h2 className="text-4xl md:text-5xl font-serif italic text-black leading-tight">
                                Waarom maatwerk het verschil maakt
                            </h2>
                        </div>

                        <div className="space-y-8 text-stone-700 leading-relaxed">
                            <p className="text-xl md:text-2xl text-center max-w-4xl mx-auto">
                                Een woning die écht past ontstaat zelden uit standaardoplossingen. Elk gezin, elke locatie en elke levensfase vraagt om andere keuzes. Maatwerk betekent niet per se groter of duurder, maar bewuster.
                            </p>

                            <div className="relative py-12 px-8 md:px-16">
                                {/* Decoratieve quote marks */}
                                <div className="absolute top-0 left-0 text-8xl md:text-9xl text-amber-600/20 font-serif leading-none select-none pointer-events-none">"</div>
                                <div className="absolute bottom-0 right-0 text-8xl md:text-9xl text-amber-600/20 font-serif leading-none select-none pointer-events-none">"</div>

                                <p className="text-2xl md:text-3xl lg:text-4xl font-serif italic text-center text-amber-700 leading-relaxed relative z-10">
                                    Door vanaf het begin goed te kijken naar routing, licht, zichtlijnen, gebruik en toekomstig wonen, ontstaan ontwerpen die logisch aanvoelen en prettig functioneren.
                                </p>
                            </div>

                            <p className="text-lg md:text-xl text-center max-w-3xl mx-auto text-stone-600">
                                Dat zijn vaak precies de woningen waar bewoners na jaren nog steeds tevreden over zijn.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Duurzaam en Toekomstbestendig - With Background Image */}
            <section className="relative py-32 px-6 md:px-12 overflow-hidden">
                {/* Background Image with Parallax */}
                <div className="absolute inset-0">
                    <img
                        src="https://www.zwijsen.net/wp-content/uploads/2019/11/clt-architect-klh-massief-houten-woning-6.jpg"
                        alt=""
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            if (e.currentTarget.parentElement) {
                                e.currentTarget.parentElement.style.background = 'linear-gradient(135deg, #1c1917 0%, #292524 100%)';
                            }
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-stone-900/95 via-stone-900/90 to-black/95" />
                </div>

                <div className="relative max-w-5xl mx-auto space-y-12 text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <span className="mono text-sm uppercase tracking-[0.6em] text-amber-500 font-black block">
                            Lange Termijn Denken
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif italic leading-tight">
                            Duurzaam en toekomstbestendig
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="prose prose-lg prose-invert max-w-none space-y-6 text-stone-300 leading-relaxed"
                    >
                        <p className="text-xl">
                            Duurzaamheid gaat verder dan energiezuinig bouwen alleen. In onze ontwerpen kijken wij naar de lange termijn. Woningen moeten comfortabel zijn, flexibel in gebruik en voorbereid op veranderende woonwensen.
                        </p>
                        <p className="text-lg">
                            Daarbij letten wij onder andere op levensloopbestendigheid, slim materiaalgebruik en een doordachte oriëntatie op zon en daglicht. Zo ontstaat een woning die niet alleen vandaag prettig is, maar ook over tientallen jaren nog goed functioneert.
                        </p>
                    </motion.div>

                    {/* Visual Stats Badges */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8"
                    >
                        {[
                            { icon: Clock, label: "Levensloopbestendig" },
                            { icon: Lightbulb, label: "Energiezuinig" },
                            { icon: CheckCircle, label: "Toekomstgericht" }
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-4 bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20"
                            >
                                <item.icon className="text-amber-500" size={28} />
                                <p className="mono text-xs uppercase tracking-wider text-white font-bold">
                                    {item.label}
                                </p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Samenwerking - Visual Section with Image */}
            <section className="relative overflow-hidden bg-white">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Linker kolom - Afbeelding */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative h-[500px] lg:h-auto lg:min-h-[700px]"
                    >
                        <div className="absolute inset-0">
                            <img
                                src="https://www.zwijsen.net/wp-content/uploads/2013/11/IMG_5125_resize.jpg"
                                alt="Samenwerking op de bouwplaats"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    if (e.currentTarget.parentElement) {
                                        e.currentTarget.parentElement.style.background = 'linear-gradient(135deg, #57534e 0%, #292524 100%)';
                                    }
                                }}
                            />
                        </div>
                        {/* Stats Overlay */}
                        <div className="absolute bottom-8 left-8 right-8 grid grid-cols-2 gap-4">
                            <div className="bg-white/95 backdrop-blur-sm p-6 rounded-lg shadow-xl">
                                <p className="text-4xl font-serif italic text-black">100+</p>
                                <p className="mono text-xs uppercase tracking-wider text-stone-600 font-bold mt-2">
                                    Projecten
                                </p>
                            </div>
                            <div className="bg-amber-600/95 backdrop-blur-sm p-6 rounded-lg shadow-xl">
                                <p className="text-4xl font-serif italic text-white">20+</p>
                                <p className="mono text-xs uppercase tracking-wider text-white/90 font-bold mt-2">
                                    Jaar ervaring
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Rechter kolom - Tekst */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex items-center px-8 md:px-16 py-20 lg:py-32 bg-stone-50"
                    >
                        <div className="max-w-xl space-y-10">
                            <div className="space-y-6">
                                <span className="mono text-xs uppercase tracking-[0.6em] text-amber-600 font-black block">
                                    Samenwerking
                                </span>
                                <h2 className="text-4xl md:text-5xl font-serif italic text-black leading-tight">
                                    Werken met de juiste bouwpartners
                                </h2>
                            </div>

                            <div className="space-y-6 text-stone-700 leading-relaxed">
                                <p className="text-lg md:text-xl font-light">
                                    Een goed ontwerp vraagt om een zorgvuldige uitvoering. Dankzij onze ruime ervaring werken wij samen met betrouwbare constructeurs, adviseurs en aannemers die passen bij uw project.
                                </p>
                                <p className="text-base md:text-lg">
                                    Heldere tekeningen en duidelijke omschrijvingen zorgen ervoor dat aannemers realistische en vergelijkbare offertes kunnen maken. Dit voorkomt verrassingen zoals meerwerk tijdens de bouw en draagt bij aan een soepel proces.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-4 pt-4">
                                {[
                                    { icon: Users, title: "Betrouwbaar netwerk" },
                                    { icon: Lightbulb, title: "Heldere communicatie" },
                                    { icon: CheckCircle, title: "Soepel proces" }
                                ].map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="flex items-center gap-4 p-4 bg-white border-l-4 border-amber-600 shadow-sm"
                                    >
                                        <item.icon className="text-amber-600" size={24} />
                                        <p className="font-serif italic text-lg text-black">{item.title}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Werkwijze */}
            <section id="werkwijze-section" className="py-32 px-6 md:px-12 bg-stone-50">
                <div className="max-w-6xl mx-auto space-y-16">
                    <div className="text-center space-y-6 max-w-3xl mx-auto">
                        <span className="mono text-sm uppercase tracking-[0.6em] text-amber-600 font-black block">
                            Werkwijze
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif italic text-black leading-tight">
                            Van eerste schets tot sleuteloverdracht
                        </h2>
                        <p className="text-xl text-stone-700">
                            Een gestructureerd proces in 7 fases, met volledige transparantie over wat u kunt verwachten.
                        </p>
                    </div>

                    {/* Eerste 6 fases in grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {PROCESS_STEPS.slice(0, 6).map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="relative p-8 bg-white border-2 border-stone-200 hover:border-amber-600 transition-all group"
                            >
                                <div className="absolute -top-4 left-8 bg-amber-600 text-white px-4 py-2 mono text-xs font-black">
                                    {step.id}
                                </div>
                                <div className="space-y-4 mt-4">
                                    <div className="space-y-2">
                                        <h3 className="font-serif italic text-xl text-black group-hover:text-amber-600 transition-colors">
                                            {step.title}
                                        </h3>
                                        <p className="mono text-xs uppercase tracking-wider text-stone-500 font-bold">
                                            {step.subtitle}
                                        </p>
                                    </div>
                                    <p className="text-stone-600 leading-relaxed text-sm">
                                        {step.description}
                                    </p>
                                    {step.deliverables && (
                                        <div className="pt-4 border-t border-stone-200">
                                            <p className="mono text-xs uppercase tracking-wider text-stone-400 font-bold mb-2">
                                                Oplevering
                                            </p>
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

                    {/* Fase 07 - Volle breedte met afbeelding */}
                    {PROCESS_STEPS[6] && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="mt-12"
                        >
                            <div className="relative bg-white border-2 border-stone-200 hover:border-amber-600 transition-all overflow-hidden">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                                    {/* Linker kolom - Tekst (3 kolommen breed) */}
                                    <div className="p-8 md:p-12 lg:col-span-1">
                                        <div className="bg-amber-600 text-white px-4 py-2 mono text-xs font-black inline-block mb-6">
                                            {PROCESS_STEPS[6].id}
                                        </div>
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <h3 className="font-serif italic text-3xl md:text-4xl text-black">
                                                    {PROCESS_STEPS[6].title}
                                                </h3>
                                                <p className="mono text-xs uppercase tracking-wider text-stone-500 font-bold">
                                                    {PROCESS_STEPS[6].subtitle}
                                                </p>
                                            </div>
                                            <p className="text-stone-600 leading-relaxed text-base md:text-lg">
                                                {PROCESS_STEPS[6].description}
                                            </p>
                                            {PROCESS_STEPS[6].deliverables && (
                                                <div className="pt-6 border-t border-stone-200">
                                                    <p className="mono text-xs uppercase tracking-wider text-stone-400 font-bold mb-4">
                                                        Oplevering
                                                    </p>
                                                    <ul className="space-y-2">
                                                        {PROCESS_STEPS[6].deliverables.map((deliverable, dIdx) => (
                                                            <li key={dIdx} className="flex items-start gap-3 text-base text-stone-600">
                                                                <CheckCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
                                                                <span>{deliverable}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Rechter kolom - Afbeelding */}
                                    <div className="relative h-[400px] lg:h-full">
                                        <img
                                            src="https://www.zwijsen.net/wp-content/uploads/2022/10/68_resize.jpg"
                                            alt="Oplevering en nazorg"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                // Fallback naar een gradient als de afbeelding niet bestaat
                                                e.currentTarget.style.display = 'none';
                                                if (e.currentTarget.parentElement) {
                                                    e.currentTarget.parentElement.style.background = 'linear-gradient(135deg, #78350f 0%, #d97706 100%)';
                                                }
                                            }}
                                        />
                                        {/* Decoratief element over de foto */}
                                        <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-sm p-6 rounded-lg shadow-xl max-w-xs">
                                            <p className="mono text-xs uppercase tracking-wider text-amber-600 font-black mb-2">
                                                Finale fase
                                            </p>
                                            <p className="text-xl font-serif italic text-black">
                                                Van dromen naar<br />wonen
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Oriëntatiehulpmiddelen - Enhanced with Background */}
            <section className="relative py-32 px-6 md:px-12 overflow-hidden">
                {/* Subtle Background Image */}
                <div className="absolute inset-0">
                    <img
                        src="/images/orientatie-tools-bg.jpg"
                        alt=""
                        className="w-full h-full object-cover opacity-0"
                        onLoad={(e) => e.currentTarget.classList.replace('opacity-0', 'opacity-10')}
                        onError={(e) => e.currentTarget.style.display = 'none'}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-white via-stone-50 to-white" />
                </div>

                <div className="relative max-w-6xl mx-auto space-y-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center space-y-6 max-w-3xl mx-auto"
                    >
                        <span className="mono text-sm uppercase tracking-[0.6em] text-amber-600 font-black block">
                            Hulpmiddelen
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif italic text-black leading-tight">
                            Wilt u eerst zelf overzicht creëren?
                        </h2>
                        <p className="text-xl text-stone-700">
                            We merken dat veel opdrachtgevers zich graag eerst goed voorbereiden. Daarom ontwikkelden wij ook hulpmiddelen voor de oriëntatiefase.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="relative bg-white p-12 border-2 border-stone-200 hover:border-amber-600 transition-all space-y-6 shadow-lg hover:shadow-xl group overflow-hidden"
                        >
                            {/* Decorative gradient on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-600/0 to-amber-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative">
                                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center text-white mono font-black text-2xl group-hover:scale-110 transition-transform">
                                    K
                                </div>
                                <h3 className="text-3xl font-serif italic text-black mt-6">
                                    KavelArchitect
                                </h3>
                                <p className="text-lg text-stone-700 leading-relaxed mt-4">
                                    Heeft u (nog) geen locatie of twijfelt u over bouwmogelijkheden? Met KavelArchitect kunt u in de oriëntatiefase verkennen wat er op een kavel kansrijk is, zodat u gerichter keuzes maakt.
                                </p>
                                <a
                                    href="https://kavelarchitect.nl"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 text-amber-600 hover:text-amber-700 font-bold mt-6 group-hover:gap-4 transition-all"
                                >
                                    Bezoek KavelArchitect
                                    <ArrowRight size={18} />
                                </a>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative bg-white p-12 border-2 border-stone-200 hover:border-amber-600 transition-all space-y-6 shadow-lg hover:shadow-xl group overflow-hidden"
                        >
                            {/* Decorative gradient on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-600/0 to-amber-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative">
                                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center text-white mono font-black text-2xl group-hover:scale-110 transition-transform">
                                    B
                                </div>
                                <h3 className="text-3xl font-serif italic text-black mt-6">
                                    Brikx
                                </h3>
                                <p className="text-lg text-stone-700 leading-relaxed mt-4">
                                    Met Brikx kunt u uw wensen en prioriteiten alvast structureren in een Programma van Eisen. Dat helpt om sneller tot een scherp ontwerp en betere offertes te komen — en maakt een eerste gesprek vaak efficiënter.
                                </p>
                                <a
                                    href="https://www.brikxai.nl"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 text-amber-600 hover:text-amber-700 font-bold mt-6 group-hover:gap-4 transition-all"
                                >
                                    Bezoek Brikx
                                    <ArrowRight size={18} />
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <p className="text-xl text-stone-600 italic leading-relaxed">
                            Deze tools zijn geen vervanging van een architect, maar kunnen helpen om gerichter en met meer vertrouwen het gesprek aan te gaan.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Final CTA - Enhanced with Background */}
            <section className="relative py-32 px-6 md:px-12 overflow-hidden bg-gradient-to-br from-stone-900 to-black">
                {/* Parallax Background Image */}
                <motion.div
                    className="absolute inset-0 w-full h-[120%]"
                    style={{
                        y: useTransform(scrollY, [3000, 4000], [0, -150])
                    }}
                >
                    <img
                        src="https://www.zwijsen.net/wp-content/uploads/2025/11/moderne-bosvilla-architect-moderne-woning-4.jpg"
                        alt=""
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                        }}
                    />
                </motion.div>

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-stone-900/90 via-black/85 to-stone-900/90 z-[1]" />

                <div className="relative max-w-4xl mx-auto text-center space-y-12 text-white z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <h2 className="text-4xl md:text-6xl font-serif italic leading-tight">
                            Staat u aan de start van een verbouwing of nieuwbouw?
                        </h2>
                        <p className="text-xl text-stone-300">
                            Vraag een gratis quickscan aan of plan een kennismaking.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <button
                            onClick={() => setIsQuickscanOpen(true)}
                            className="px-10 py-5 bg-amber-600 text-white rounded-full mono text-sm uppercase tracking-[0.3em] font-black hover:bg-amber-700 transition-all shadow-xl flex items-center gap-3 hover:gap-4"
                        >
                            Gratis Quickscan
                            <ArrowRight size={18} />
                        </button>
                        <button
                            onClick={() => setIsInquiryOpen(true)}
                            className="px-10 py-5 border-2 border-white text-white rounded-full mono text-sm uppercase tracking-[0.3em] font-black hover:bg-white hover:text-black transition-all flex items-center gap-3 hover:gap-4"
                        >
                            Plan Kennismaking
                            <ArrowRight size={18} />
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <Footer
                footerRef={footerRef}
                parallaxText={footerParallaxText}
                opacity={footerOpacity}
            />

            {/* Scroll to Top Button */}
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

            {/* Contact Bar */}
            <ContactBar
                opacity={contactBarOpacity}
                onStartTraject={() => setIsInquiryOpen(true)}
            />
        </>
    );
};
