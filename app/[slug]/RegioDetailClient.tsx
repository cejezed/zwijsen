'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { BRAND_NAME, ADDRESS, EMAIL, PHONE_NUMBER, PROJECTS } from '../../data/index';
import type { RegioConfig, ImageWithAlt } from '../../data/types';
import {
    HeroSection,
    IntroSection,
    VisionSection,
    ProcessSectionCompact,
    RegionSection,
    TestimonialsSection,
    Footer,
    PainRegieSection,
    FAQSection,
    ContactBar,
    PortfolioSection,
    QuickProjectsGrid,
    ProjectDetailOverlay,
    InquiryOverlay
} from '../../components';

interface RegioDetailClientProps {
    slug: string;
    config: RegioConfig;
}

export const RegioDetailClient: React.FC<RegioDetailClientProps> = ({ slug, config }) => {
    const router = useRouter();
    const pathname = usePathname();
    const footerRef = useRef<HTMLDivElement>(null);

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [selectedProject, setSelectedProject] = useState<any>(null);
    const [isInquiryOpen, setIsInquiryOpen] = useState(false);

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

    // ContactBar opacity - show after hero section
    const contactBarOpacity = useTransform(scrollY, [300, 600], [0, 1]);

    // Show scroll to top button
    useEffect(() => {
        const handleScroll = () => setShowScrollTop(window.scrollY > 1000);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Track mouse position for custom cursor
    useEffect(() => {
        const handleGlobalMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
        window.addEventListener('mousemove', handleGlobalMouseMove);
        return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    // Helper to ensure image is an object with url and alt
    const ensureImageObject = (img: any): { url: string; alt: string } | undefined => {
        if (!img) return undefined;
        if (typeof img === 'string') return { url: img, alt: config.regio?.name || BRAND_NAME };
        return { url: img.url, alt: img.alt };
    };

    return (
        <>
            {/* Custom Cursor - Desktop only */}
            {!selectedProject?.slug && (
                <motion.div
                    className="fixed pointer-events-none z-[999] hidden md:flex flex-col items-center justify-center mix-blend-difference"
                    animate={{ x: mousePos.x, y: mousePos.y }}
                    transition={{ type: "spring", stiffness: 1000, damping: 50, mass: 0.2 }}
                >
                    <div className="relative w-12 h-12 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 border border-white/40 rounded-full"
                        />
                    </div>
                </motion.div>
            )}

            {/* Inquiry Overlay */}
            <InquiryOverlay
                isOpen={isInquiryOpen}
                onClose={() => setIsInquiryOpen(false)}
            />

            {/* Project Detail Overlay */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectDetailOverlay
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>

            {/* Region Page Content - Same structure as Homepage */}
            {!selectedProject?.slug && (
                <>
                    {/* Hero Section */}
                    <HeroSection opacity={heroOpacity} heroSlides={config.heroSlides || []} />

                    {/* Minimal Breadcrumbs UI - Visible but subtle */}
                    <div className="absolute top-32 left-8 md:left-20 z-50 flex items-center gap-2 mono text-[10px] uppercase tracking-widest text-white/60">
                        {config.breadcrumbs?.map((crumb, i) => (
                            <React.Fragment key={i}>
                                <a href={crumb.href} className="hover:text-amber-500 transition-colors">{crumb.label}</a>
                                {i < config.breadcrumbs!.length - 1 && <span>/</span>}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Intro Section - H1 + intro tekst direct onder hero */}
                    {config.regio?.intro && (
                        <IntroSection
                            h1={config.regio.intro.h1}
                            paragraph={config.regio.intro.paragraph}
                            onCtaClick={() => setIsInquiryOpen(true)}
                            image={ensureImageObject(config.regio.collageImages?.[0])}
                        />
                    )}

                    {/* Pain & Regie Section */}
                    <PainRegieSection />

                    {/* Quick Projects Grid - 4 simple project cards for mobile UX */}
                    <QuickProjectsGrid
                        projects={(config as any).projects || []}
                        onProjectClick={setSelectedProject}
                    />

                    {/* Process Section - Compact version with tabs */}
                    <div id="proces">
                        <ProcessSectionCompact processSteps={(config as any).processSteps || []} />
                    </div>

                    {/* Region Section - Move up to better integrate with content flow */}
                    <div id="regio-expert">
                        <RegionSection regio={config.regio} />
                    </div>

                    {/* Portfolio Section - Full portfolio grid */}
                    <PortfolioSection
                        projects={PROJECTS}
                        onProjectClick={setSelectedProject}
                    />

                    {/* Testimonials Section */}
                    <TestimonialsSection testimonials={config.testimonials || []} />

                    {/* FAQ Section */}
                    <FAQSection faqs={config.faqs || []} />

                    {/* Footer */}
                    <Footer
                        footerRef={footerRef}
                        parallaxText={footerParallaxText}
                        opacity={footerOpacity}
                        regionFooterIntro={config.regio?.footerIntro}
                        regionFooterImage={ensureImageObject(config.regio?.collageImages?.[1])}
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
            )}
        </>
    );
};
