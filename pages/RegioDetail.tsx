import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { getPageConfig } from '../data/index';
import { BRAND_NAME, ADDRESS, EMAIL, PHONE_NUMBER, PROJECTS } from '../data';
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
} from '../components';

export const RegioDetail: React.FC = () => {
  const { slug: urlSlug } = useParams<{ slug: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  // Get slug from URL params or from pathname (for direct routes like /loenen-aan-de-vecht)
  const slug = urlSlug || location.pathname.replace('/', '');

  if (!slug) {
    navigate('/regios');
    return null;
  }

  // Get the region config
  const config = getPageConfig(slug);

  // If no specific region data exists, redirect to overview
  if (!config.regio?.name) {
    navigate('/regios');
    return null;
  }

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

  // SEO management
  useEffect(() => {
    const currentUrl = `https://www.zwijsen.net${location.pathname}`;

    // Set page title
    document.title = config.seoTitle || `${config.regio?.name} | Architectenbureau Jules Zwijsen`;

    // Set canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (canonical) {
      canonical.href = currentUrl;
    } else {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      canonical.href = currentUrl;
      document.head.appendChild(canonical);
    }

    // Helper function to set meta tags
    const setMetaTag = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (tag) {
        tag.setAttribute('content', content);
      } else {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        tag.setAttribute('content', content);
        document.head.appendChild(tag);
      }
    };

    // Set meta description
    setMetaTag('description', config.metaDescription || '');

    // Set geo meta tags for local SEO
    if (config.regio?.geo) {
      setMetaTag('geo.region', config.regio.geo.region || 'NL');
      setMetaTag('geo.placename', config.regio.name);
      if (config.regio.geo.position) {
        setMetaTag('geo.position', config.regio.geo.position);
      }
    }

    // Set Open Graph tags
    const setOgTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (tag) {
        tag.setAttribute('content', content);
      } else {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        tag.setAttribute('content', content);
        document.head.appendChild(tag);
      }
    };

    setOgTag('og:title', config.seoTitle || '');
    setOgTag('og:description', config.metaDescription || '');
    setOgTag('og:type', 'website');
    setOgTag('og:url', currentUrl);
    if (config.heroSlides?.[0]?.url) {
      setOgTag('og:image', `https://www.zwijsen.net${config.heroSlides[0].url}`);
      setOgTag('og:image:width', '1200');
      setOgTag('og:image:height', '630');
    }

    // Set Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', config.seoTitle || '');
    setMetaTag('twitter:description', config.metaDescription || '');
    if (config.heroSlides?.[0]?.url) {
      setMetaTag('twitter:image', `https://www.zwijsen.net${config.heroSlides[0].url}`);
    }

    // Build areaServed dynamically from region config
    const areaServed: any[] = [
      {
        "@type": "City",
        "name": config.regio?.name
      }
    ];

    if (config.regio?.municipality) {
      areaServed.push({
        "@type": "AdministrativeArea",
        "name": config.regio.municipality
      });
    }
    if (config.regio?.province) {
      areaServed.push({
        "@type": "AdministrativeArea",
        "name": config.regio.province
      });
    }

    // 1. LocalBusiness / Architect / ProfessionalService Schema
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": ["Architect", "LocalBusiness", "ProfessionalService"],
      "@id": "https://www.zwijsen.net/#architect",
      "name": BRAND_NAME,
      "description": config.metaDescription || `Architect in ${config.regio?.name} voor nieuwbouw, verbouw en verduurzaming`,
      "url": currentUrl,
      "image": config.ogImage || (config.heroSlides?.[0]?.url ? `https://www.zwijsen.net${config.heroSlides[0].url}` : "https://www.zwijsen.net/images/logo.png"),
      "logo": "https://www.zwijsen.net/images/logo.png",
      "telephone": PHONE_NUMBER,
      "email": EMAIL,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": ADDRESS.street,
        "addressLocality": ADDRESS.city.split(' ').slice(1).join(' '),
        "postalCode": ADDRESS.city.split(' ')[0],
        "addressCountry": "NL"
      },
      "geo": config.regio?.geo?.coordinates ? {
        "@type": "GeoCoordinates",
        "latitude": config.regio.geo.coordinates.latitude,
        "longitude": config.regio.geo.coordinates.longitude
      } : undefined,
      "areaServed": areaServed,
      "priceRange": "€€€",
      "openingHours": "Mo-Fr 09:00-17:00",
      "founder": {
        "@type": "Person",
        "name": "Jules Zwijsen"
      },
      "sameAs": [
        "https://www.linkedin.com/company/architectenbureau-jules-zwijsen"
      ]
    };

    // 2. BreadcrumbList Schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": config.breadcrumbs?.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.label,
        "item": crumb.href.startsWith('http') ? crumb.href : `https://www.zwijsen.net${crumb.href}`
      }))
    };

    const businessScript = document.createElement('script');
    businessScript.type = 'application/ld+json';
    businessScript.id = 'schema-business';
    businessScript.text = JSON.stringify(localBusinessSchema);
    document.head.appendChild(businessScript);

    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.type = 'application/ld+json';
    breadcrumbScript.id = 'schema-breadcrumbs';
    breadcrumbScript.text = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(breadcrumbScript);

    // === PRERENDER DISPATCH ===
    // Wacht tot de domelementen en metadata er echt in staan
    const checkReady = () => {
      const hasTitle = document.title.includes(config.regio?.name || '');
      const hasCanonical = document.querySelector('link[rel="canonical"]');
      const hasSchema = document.getElementById('schema-business');

      if (hasTitle && hasCanonical && hasSchema) {
        // Kleine buffer voor Framer Motion "final state" (ook al hebben we de CSS hack)
        setTimeout(() => {
          document.dispatchEvent(new Event('render-event'));
        }, 100);
      } else {
        // Probeer het over 50ms opnieuw
        setTimeout(checkReady, 50);
      }
    };

    // Start checking
    checkReady();

    return () => {
      document.getElementById('schema-business')?.remove();
      document.getElementById('schema-breadcrumbs')?.remove();
    };
  }, [slug, config, location.pathname]);

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
          <HeroSection opacity={heroOpacity} heroSlides={config.heroSlides} />

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
          <TestimonialsSection testimonials={config.testimonials} />

          {/* FAQ Section */}
          <FAQSection faqs={config.faqs} />

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
