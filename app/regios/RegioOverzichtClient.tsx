'use client';

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Home, ArrowRight } from 'lucide-react';
import { PAGE_CONFIG } from '../../data/index';
import { Footer } from '../../components';

const RegioCard = ({ slug, config, onClick }: { slug: string; config: any; onClick: () => void }) => {
    const regionName = config.regio?.name || slug;
    const heroImage = config.heroSlides?.[0];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group cursor-pointer bg-white shadow-sm hover:shadow-2xl transition-all duration-700"
            onClick={onClick}
        >
            {/* Image Container */}
            <div className="relative overflow-hidden aspect-[4/3]">
                {heroImage && (
                    <img
                        src={heroImage.url}
                        alt={heroImage.title || regionName}
                        className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110 grayscale-[0.1] group-hover:grayscale-0"
                    />
                )}

                {/* Overlay on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    {/* Grid Lines */}
                    <div className="absolute top-4 left-4 right-4 h-[1px] bg-white/40" />
                    <div className="absolute bottom-4 left-4 right-4 h-[1px] bg-white/40" />
                    <div className="absolute top-4 bottom-4 left-4 w-[1px] bg-white/40" />
                    <div className="absolute top-4 bottom-4 right-4 w-[1px] bg-white/40" />

                    {/* Arrow Button */}
                    <div className="absolute bottom-8 right-8">
                        <div className="bg-amber-600 text-white p-4 rounded-full shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <ArrowRight size={20} />
                        </div>
                    </div>
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
            </div>

            {/* Content Info */}
            <div className="p-6 bg-white border-t border-stone-100">
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <MapPin size={14} className="text-amber-600" />
                        <span className="mono text-[8px] font-black uppercase tracking-[0.4em] text-stone-400">
                            REGIO
                        </span>
                    </div>
                    <h3 className="text-lg md:text-xl font-serif text-black leading-tight group-hover:text-amber-700 transition-colors duration-500">
                        {regionName}
                    </h3>
                    {config.metaDescription && (
                        <p className="text-sm text-stone-600 line-clamp-2">
                            {config.metaDescription}
                        </p>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export const RegioOverzichtClient: React.FC = () => {
    const router = useRouter();
    const footerRef = useRef<HTMLDivElement>(null);

    // Scroll to top when component mounts
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Footer scroll animations
    const { scrollYProgress: footerScroll } = useScroll({
        target: footerRef,
        offset: ["start end", "end end"]
    });
    const footerParallaxText = useTransform(footerScroll, [0, 1], [0, -1500]);
    const footerOpacity = useTransform(footerScroll, [0, 0.4], [0, 1]);

    // Get all regions (exclude 'default')
    // Note: PAGE_CONFIG keys are the slugs
    const regions = Object.entries(PAGE_CONFIG).filter(([slug]) => slug !== 'default');

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-stone-50 pt-24 pb-32 px-6 md:px-12 relative overflow-hidden selection:bg-amber-100"
        >
            {/* Fixed Navigation Bar */}
            <nav className="fixed top-6 md:top-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-4 pointer-events-none">
                <button
                    onClick={() => router.push('/')}
                    className="flex items-center gap-3 bg-white/80 backdrop-blur-xl border border-stone-200 px-6 py-4 rounded-full shadow-sm hover:bg-white transition-all pointer-events-auto group"
                >
                    <Home size={18} className="text-amber-600 group-hover:scale-110 transition-transform" />
                    <span className="mono text-[10px] font-black text-stone-700 uppercase tracking-[0.3em]">Home</span>
                </button>

                <div className="hidden md:flex items-center gap-8 bg-white/80 backdrop-blur-xl border border-stone-200 px-8 py-4 rounded-full shadow-sm pointer-events-auto">
                    <div className="flex items-center gap-3 mono text-[10px] font-black text-stone-400">
                        <MapPin size={12} className="text-amber-500" />
                        <span>{regions.length} REGIO'S</span>
                    </div>
                </div>
            </nav>

            <div className="max-w-[2500px] mx-auto relative z-10">
                {/* Header */}
                <header className="mb-24 flex flex-col gap-12">
                    <div className="space-y-10">
                        <div className="flex items-center gap-6">
                            <div className="w-12 h-[1px] bg-amber-600" />
                            <span className="mono text-amber-700 text-[10px] font-black tracking-[0.6em] uppercase">REGIO_OVERZICHT</span>
                        </div>
                        <h1 className="text-6xl md:text-[8vw] font-serif italic tracking-tighter text-black leading-[0.85] uppercase">
                            Onze <br /> <span className="text-stone-300">Regio's.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-stone-600 max-w-3xl leading-relaxed">
                            Architectenbureau Jules Zwijsen is actief in verschillende regio's.
                            Ontdek onze lokale expertise en projecten.
                        </p>
                    </div>
                </header>

                {/* Regio Grid */}
                <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    {regions.map(([slug, config]) => (
                        <RegioCard
                            key={slug}
                            slug={slug}
                            config={config}
                            onClick={() => router.push(`/${slug}`)}
                        />
                    ))}
                </motion.div>
            </div>

            {/* Footer */}
            <Footer
                footerRef={footerRef}
                parallaxText={footerParallaxText}
                opacity={footerOpacity}
            />
        </motion.div>
    );
};
