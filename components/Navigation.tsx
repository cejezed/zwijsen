
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone } from 'lucide-react';
import { BRAND_NAME, NAV_LINKS, PHONE_LINK } from '../data';

interface NavigationProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (val: boolean) => void;
  setIsInquiryOpen: (val: boolean) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  isMenuOpen,
  setIsMenuOpen,
  setIsInquiryOpen
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Detect if we're in a region page
  const REGION_ROUTES = [
    'hilversum', 'loenen-aan-de-vecht', 'loosdrecht', 'utrecht',
    'bilthoven', 'breukelen', 'maarssen', 'stichtse-vecht',
    'het-gooi', 'blaricum', 'laren', 'wijdemeren', 'kortenhoef', 'vreeland'
  ];
  const currentRegion = REGION_ROUTES.find(region =>
    location.pathname === `/${region}` || location.pathname.startsWith(`/${region}/`)
  );

  const handleLogoClick = () => {
    if (currentRegion) {
      // Als we in een regio zijn, ga naar die regio home
      if (location.pathname === `/${currentRegion}`) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate(`/${currentRegion}`);
      }
    } else {
      // Anders naar de algemene home
      if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/');
      }
    }
  };

  const handleMenuLinkClick = (link: any) => {
    setIsMenuOpen(false);

    if (link.name === "Projecten") {
      // ALTIJD naar de projecten pagina
      navigate('/projecten');
    } else if (link.name === "Regio's") {
      navigate('/regios');
    } else {
      // For anchor links (like #proces, #over-ons, etc.)
      if (currentRegion) {
        // Blijf in regio context
        if (location.pathname === `/${currentRegion}`) {
          const element = document.querySelector(link.href);
          element?.scrollIntoView({ behavior: 'smooth' });
        } else {
          navigate(`/${currentRegion}`);
          setTimeout(() => {
            const element = document.querySelector(link.href);
            element?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      } else {
        // Ga naar algemene home
        if (location.pathname !== '/') {
          navigate('/');
          setTimeout(() => {
            const element = document.querySelector(link.href);
            element?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } else {
          const element = document.querySelector(link.href);
          element?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <>
      {/* Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[150] bg-stone-50 flex flex-col items-center justify-center p-8"
          >
            <div className="absolute top-8 right-8 md:top-10 md:right-10">
              <button onClick={() => setIsMenuOpen(false)} className="p-4 bg-black text-white rounded-full hover:scale-110 transition-transform shadow-lg">
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col items-center space-y-8 md:space-y-12">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                  className="group flex flex-col items-center cursor-pointer"
                  onClick={() => handleMenuLinkClick(link)}
                >
                  <div className="flex flex-col items-center text-center">
                    <span className="mono text-[11px] md:text-sm text-amber-700 uppercase tracking-[0.4em] mb-2 font-bold">{link.label}</span>
                    <h2 className="text-4xl md:text-8xl font-serif italic text-black hover:text-amber-700 transition-colors">{link.name}</h2>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Nav */}
      <nav className="fixed top-0 left-0 w-full p-4 md:p-10 z-[145] flex justify-between items-center mix-blend-difference text-white pointer-events-none">
        <div className="flex flex-col pointer-events-auto cursor-pointer" onClick={handleLogoClick}>
          <h1 className="text-lg md:text-2xl font-black tracking-tighter leading-none uppercase">{BRAND_NAME}</h1>
          <span className="mono text-[9px] md:text-[10px] uppercase tracking-[0.4em] mt-1 opacity-95 font-black">Architectuur & Realisatie</span>
        </div>

        <div className="pointer-events-auto flex items-center gap-1 md:gap-4">
          <div className="flex items-center">
            <a href={PHONE_LINK} className="p-2.5 md:p-3 text-white hover:text-amber-500 transition-colors"><Phone size={18} /></a>
          </div>
          <button onClick={() => setIsInquiryOpen(true)} className="hidden sm:flex items-center gap-4 border border-white/30 bg-transparent text-white px-6 py-2.5 rounded-full hover:bg-white hover:text-black transition-all group">
            <span className="mono text-[10px] uppercase tracking-[0.2em] font-black">Kennismaken</span>
          </button>
          <button onClick={() => setIsMenuOpen(true)} className="group p-2 ml-1">
            <div className="flex flex-col gap-1.5 w-6 md:w-8"><div className="w-full h-0.5 bg-white" /><div className="w-2/3 h-0.5 bg-white self-end" /></div>
          </button>
        </div>
      </nav>
    </>
  );
};
