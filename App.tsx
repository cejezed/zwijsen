import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import pages
import { Home, ProjectenOverzicht, ProjectDetail, RegioOverzicht, RegioDetail } from './pages';

// Import global components
import { Navigation, InquiryOverlay } from './components';

// Main App Component
const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  return (
    <BrowserRouter>
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
          <Route path="/projecten" element={<ProjectenOverzicht />} />
          <Route path="/projecten/:slug" element={<ProjectDetail />} />
          <Route path="/regios" element={<RegioOverzicht />} />
          {/* Direct regio routes zonder /regios/ prefix */}
          <Route path="/loenen-aan-de-vecht" element={<RegioDetail />} />
          <Route path="/loosdrecht" element={<RegioDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
