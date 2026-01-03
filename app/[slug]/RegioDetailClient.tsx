'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { BRAND_NAME, INTERNAL_LINKS } from '../../data/index';
import { PROJECTS_DETAIL } from '../../data/projecten';
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
    InquiryOverlay,
    InternalLinksSection
} from '../../components';

interface RegioDetailClientProps {
    slug: string;
    config: RegioConfig;
}

export const RegioDetailClient: React.FC<RegioDetailClientProps> = ({ slug, config }) => {
    const router = useRouter();
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

    // Toon alleen volledige projecten in de scroller (filter light projects met openMode: 'overlay' eruit)
    const portfolioProjects = useMemo(() => {
        return PROJECTS_DETAIL.filter(p => p && (!('openMode' in p) || p.openMode !== 'overlay')).map((p, index) => {
            const heroImages = 'heroImages' in p ? p.heroImages || [] : [];
            const gallery = heroImages.map(img => img.url).filter(Boolean);
            const featuredImage = 'featuredImage' in p ? p.featuredImage : undefined;
            const regularImage = 'image' in p ? p.image : undefined;
            const primaryImage = featuredImage?.url || gallery[0] || (typeof regularImage === 'string' ? regularImage : regularImage?.url);
            const baseGallery = gallery.length ? gallery : primaryImage ? [primaryImage] : [];
            const paddedGallery = baseGallery.length >= 3
                ? baseGallery
                : [...baseGallery, ...Array.from({ length: 3 - baseGallery.length }, () => primaryImage || baseGallery[0]).filter(Boolean)];

            return {
                id: 1000 + index,
                title: p.title,
                location: ('locationLabel' in p ? p.locationLabel?.replace('Locatie: ', '') : ('location' in p ? p.location : '')) || '',
                slug: p.slug,
                image: primaryImage,
                featuredImage: featuredImage,
                year: p.year || 'N.N.B.',
                area: p.area || 'N.N.B.',
                tag: ('categories' in p && p.categories?.includes('nieuwbouw')) ? 'Nieuwbouw' : ('categories' in p && p.categories?.includes('verbouw')) ? 'Verbouw' : ('categories' in p ? p.categories?.[0] : ('tag' in p ? p.tag : undefined)) || 'Project',
                subtitle: 'subtitle' in p ? p.subtitle : ('description' in p ? p.description : ''),
                description: 'subtitle' in p ? p.subtitle : ('description' in p ? p.description : ''),
                gallery: paddedGallery
            };
        });
    }, []);

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
                        onContact={() => {
                            setSelectedProject(null);
                            setIsInquiryOpen(true);
                        }}
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
                        onProjectClick={(project) => {
                            // Check if project should open as overlay or navigate to page
                            if (project.openMode === 'overlay') {
                                setSelectedProject(project);
                            } else {
                                router.push(`/portfolio/${project.slug}`);
                            }
                        }}
                    />

                    {/* Process Section - Compact version with tabs */}
                    <div id="proces">
                        <ProcessSectionCompact processSteps={(config as any).processSteps || []} />
                    </div>

                    {/* Region Section - Move up to better integrate with content flow */}
                    <div id="regio-expert">
                        <RegionSection regio={config.regio} />
                    </div>

                    {/* Vision Section - direct na de regio info */}
                    <VisionSection onContactClick={() => setIsInquiryOpen(true)} />

                    {/* Portfolio Section - Full portfolio grid */}
                    <PortfolioSection
                        projects={portfolioProjects}
                        onProjectClick={setSelectedProject}
                    />

                    {/* Testimonials Section */}
                    <TestimonialsSection testimonials={config.testimonials || []} />

                    {/* FAQ Section */}
                    <FAQSection faqs={config.faqs || []} />

                    {/* Internal Links Section voor SEO */}
                    {INTERNAL_LINKS[slug as keyof typeof INTERNAL_LINKS] && (
                        <InternalLinksSection
                            title="Gerelateerde Diensten & Regio's"
                            subtitle="Ontdek meer over onze architectuurdiensten en andere regio's"
                            links={INTERNAL_LINKS[slug as keyof typeof INTERNAL_LINKS]}
                        />
                    )}

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
