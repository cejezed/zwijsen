'use client';

import React, { useState } from 'react';
import { Navigation, InquiryOverlay } from '../components';

export function ClientLayout({ children }: { children: React.ReactNode }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isInquiryOpen, setIsInquiryOpen] = useState(false);

    return (
        <>
            <Navigation
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                setIsInquiryOpen={setIsInquiryOpen}
            />
            <InquiryOverlay
                isOpen={isInquiryOpen}
                onClose={() => setIsInquiryOpen(false)}
            />
            {children}
        </>
    );
}
