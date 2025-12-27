import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

// Import data
import { getPageConfig, type RegioConfig } from './data/index';

// Import components
import {
  HeroSection,
  Navigation,
  VisionSection,
  ProcessSection,
  RegionSection,
  TestimonialsSection,
  Footer,
  ProjectDetailOverlay,
  ProjectTemplate,
  InquiryOverlay,
  CustomCursor,
  ScrollToTopButton,
  PortfolioSection,
  PainRegieSection,
  FAQSection,
  ContactBar
} from './components';
import { Portfolio } from './components/Portfolio';

// Main App Component
const App: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const processWrapperRef = useRef<HTMLDivElement>(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [dockMode, setDockMode] = useState<'process' | 'dream'>('process');
  const [pageConfig, setPageConfig] = useState<RegioConfig>(getPageConfig('default'));

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

  // Region detection and config loading
  useEffect(() => {
    // Detect region from URL path (neem laatste slug, strip algemene prefixen)
    const segments = window.location.pathname.split('/').filter(Boolean);
    const last = segments.pop();
    const region = last && last !== 'regio' ? last : 'default';
    const config = getPageConfig(region);
    setPageConfig(config);

    // Set SEO title and meta description
    document.title = config.seoTitle;

    // Update meta description
    if (config.metaDescription) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', config.metaDescription);
    }
  }, []);

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
    <div className="bg-white min-h-screen">
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

      {/* Project Detail Overlay */}
      <AnimatePresence>
        {selectedProject && selectedProject.slug && (
          <ProjectTemplate
            slug={selectedProject.slug}
            onClose={() => setSelectedProject(null)}
          />
        )}
        {selectedProject && !selectedProject.slug && (
          <ProjectDetailOverlay
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      {/* Inquiry Overlay */}
      <InquiryOverlay
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      />

      {/* Portfolio Page */}
      <AnimatePresence>
        {showPortfolio && (
          <Portfolio
            onBack={() => setShowPortfolio(false)}
            onProjectClick={(slug) => {
              setShowPortfolio(false);
              setSelectedProject({ slug });
            }}
            onInquiryOpen={() => setIsInquiryOpen(true)}
          />
        )}
      </AnimatePresence>

      {/* Homepage Content - Hidden when project with slug is open or portfolio is shown */}
      {!selectedProject?.slug && !showPortfolio && (
        <>
          {/* Navigation */}
          <Navigation
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            setIsInquiryOpen={setIsInquiryOpen}
            setShowPortfolio={setShowPortfolio}
            dockOpacity={dockOpacity}
            dockMode={dockMode}
          />

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
          <VisionSection onContactClick={() => setIsInquiryOpen(true)} />

          {/* Portfolio Section */}
          <div id="portfolio">
            <PortfolioSection
              projects={pageConfig.projects || []}
              onProjectClick={setSelectedProject}
            />
          </div>

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
    </div>
  );
};

export default App;
