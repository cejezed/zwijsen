// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Import pages
import { Home, ProjectenOverzicht, ProjectDetail, RegioOverzicht, RegioDetail, Architect, Werkwijze, Kosten, Quickscan, Contact } from './pages';

// Import global components
import { Navigation, InquiryOverlay } from './components';

// Scroll to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top immediately
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  return null;
};

// Main App Component
const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  useEffect(() => {
    // Detecteer of we in een prerender phase zitten (Puppeteer/Headless)
    if (navigator.webdriver || navigator.userAgent.includes('HeadlessChrome')) {
      document.body.classList.add('is-prerendering');
    }
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="bg-white min-h-screen">
        {/* Global Navigation */}
        <Navigation
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          setIsInquiryOpen={setIsInquiryOpen}
        />

        {/* Inquiry Overlay */}
        <InquiryOverlay
          isOpen={isInquiryOpen}
          onClose={() => setIsInquiryOpen(false)}
        />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/architect" element={<Architect />} />
          <Route path="/over-ons" element={<Architect />} />
          <Route path="/werkwijze" element={<Werkwijze />} />
          <Route path="/kosten" element={<Kosten />} />
          <Route path="/quickscan" element={<Quickscan />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/portfolio" element={<ProjectenOverzicht />} />
          <Route path="/portfolio/:slug" element={<ProjectDetail />} />
          <Route path="/regios" element={<RegioOverzicht />} />
          {/* Direct regio routes zonder /regios/ prefix */}
          <Route path="/hilversum" element={<RegioDetail />} />
          <Route path="/loenen-aan-de-vecht" element={<RegioDetail />} />
          <Route path="/loosdrecht" element={<RegioDetail />} />
          <Route path="/utrecht" element={<RegioDetail />} />
          <Route path="/bilthoven" element={<RegioDetail />} />
          <Route path="/breukelen" element={<RegioDetail />} />
          <Route path="/maarssen" element={<RegioDetail />} />
          <Route path="/stichtse-vecht" element={<RegioDetail />} />
          <Route path="/vinkeveen" element={<RegioDetail />} />
          <Route path="/het-gooi" element={<RegioDetail />} />
          <Route path="/blaricum" element={<RegioDetail />} />
          <Route path="/laren" element={<RegioDetail />} />
          <Route path="/wijdemeren" element={<RegioDetail />} />
          <Route path="/kortenhoef" element={<RegioDetail />} />
          <Route path="/vreeland" element={<RegioDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
