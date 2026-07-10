'use client';

import React, { useState } from 'react';
import PolicyModal from './PolicyModal';

interface CheckoutFooterProps {
    contactSettings?: {
        phone: string;
        email?: string;
    };
}

export default function CheckoutFooter({ contactSettings }: CheckoutFooterProps) {
    const [activePolicy, setActivePolicy] = useState<'cancellation' | 'privacy' | 'guide' | null>(null);

    const closePolicy = () => setActivePolicy(null);

    return (
        <footer className="bg-charcoal border-t border-white/5 py-8 mt-auto">
            <div className="container mx-auto px-4 text-center">
                
                {/* Reassurance Line */}
                <div className="mb-6">
                    <p className="text-sm md:text-base font-semibold text-gold">
                        No prepayment · Free cancellation up to 24h · Pay cash on arrival.
                    </p>
                </div>

                {/* Policy Triggers */}
                <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 mb-6 text-xs text-n-400 font-medium">
                    <button onClick={() => setActivePolicy('cancellation')} className="hover:text-gold transition-colors">
                        Cancellation Policy
                    </button>
                    <span className="text-n-700 hidden sm:inline">•</span>
                    <button onClick={() => setActivePolicy('privacy')} className="hover:text-gold transition-colors">
                        Privacy Policy
                    </button>
                    <span className="text-n-700 hidden sm:inline">•</span>
                    <button onClick={() => setActivePolicy('guide')} className="hover:text-gold transition-colors">
                        Booking Guide
                    </button>
                </div>

                {/* Copyright */}
                <div className="text-[11px] text-n-600">
                    &copy; {new Date().getFullYear()} Al Kiswah Umrah Transport. All rights reserved.
                </div>
            </div>

            {/* Modals */}
            <PolicyModal 
                isOpen={activePolicy !== null} 
                type={activePolicy} 
                onClose={closePolicy} 
            />
        </footer>
    );
}
