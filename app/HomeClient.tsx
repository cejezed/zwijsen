'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { type RegioConfig } from '../data/index';

// Import components
import {
    HeroSection,
    VisionSection,
    ProcessSection,
    RegionSection,
    TestimonialsSection,
    Footer,
    PainRegieSection,
    FAQSection,
    ContactBar,
    PortfolioSection,
    ProjectDetailOverlay,
    InquiryOverlay
} from '../components';

interface HomeClientProps {
    initialConfig: RegioConfig;
}

export const HomeClient: React.FC<HomeClientProps> = ({ initialConfig }) => {
    const footerRef = useRef<HTMLDivElement>(null);
    const processWrapperRef = useRef<HTMLDivElement>(null);

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [selectedProject, setSelectedProject] = useState<any>(null);
    const [isInquiryOpen, setIsInquiryOpen] = useState(false);
    const [dockMode, setDockMode] = useState<'process' | 'dream'>('process');

    // Use config passed from server
    const pageConfig = initialConfig;

    // Scroll animations
    const { scrollY } = useScroll();
    const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

    // Process section scroll progress
    const { scrollYProgress: processScrollProgress } = useScroll({
        target: processWrapperRef,
        offset: ["start end", "end start"]
    });

    // Dock opacity based on process scroll
    const dockOpacity = useTransform(processScrollProgress, [0, 0.15, 0.85, 1], [1, 0, 0, 1]);

    // Switch dock mode based on scroll position
    useMotionValueEvent(processScrollProgress, "change", (latest) => {
        if (latest > 0.5) {
            if (dockMode !== 'dream') setDockMode('dream');
        } else {
            if (dockMode !== 'process') setDockMode('process');
        }
    });

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

            {/* Homepage Content */}
            {!selectedProject?.slug && (
                <>
                    {/* Hero Section */}
                    <HeroSection opacity={heroOpacity} heroSlides={pageConfig.heroSlides} />

                    {/* Pain & Regie Section */}
                    <PainRegieSection />

                    {/* Process Section with wrapper for scroll tracking */}
                    <div ref={processWrapperRef} id="proces">
                        <ProcessSection processSteps={pageConfig.processSteps} />
                    </div>

                    {/* Region Section */}
                    <RegionSection regio={pageConfig.regio} />

                    {/* Vision Section */}
                    <VisionSection onContactClick={() => window.location.hash = 'contact'} />

                    {/* Portfolio Section */}
                    <PortfolioSection
                        projects={pageConfig.projects || []}
                        onProjectClick={setSelectedProject}
                    />

                    {/* Testimonials Section */}
                    <TestimonialsSection />

                    {/* FAQ Section */}
                    <FAQSection />

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
            )}
        </>
    );
};
