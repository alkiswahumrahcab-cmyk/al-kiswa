'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import FadeIn from '@/components/common/FadeIn';

interface FAQItem {
    question: string;
    answer: string | React.ReactNode;
}

interface FAQSectionProps {
    items?: FAQItem[];
    title?: string;
}

const defaultFAQs: FAQItem[] = [
    {
        question: "How do I book a ride?",
        answer: "You can book directly through our website by selecting your service type, vehicle, and dates. Alternatively, you can contact our 24/7 support team via WhatsApp for assistance."
    },
    {
        question: "Are your drivers licensed?",
        answer: "Yes, all our drivers are fully licensed, insured, and experienced in navigating the holy cities of Makkah and Madinah. They are also trained to assist pilgrims with their needs."
    },
    {
        question: "Can I change my booking?",
        answer: "Absolutely. We understand plans can change. You can modify your booking up to 24 hours before your scheduled pickup time without any extra charges."
    },
    {
        question: "Do you provide child seats?",
        answer: "Yes, child seats are available upon request. Please mention this requirement when making your booking so we can ensure the vehicle is properly equipped."
    }
];

export default function FAQSection({ items = defaultFAQs, title = "Frequently Asked Questions" }: FAQSectionProps) {
    const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setActiveAccordion(activeAccordion === index ? null : index);
    };

    return (
        <section className="py-20 relative overflow-hidden bg-transparent">
            {/* Background Decor */}
            {/* Note: The parent page usually handles the main background, but we can add a subtle gradient here if needed? 
                 Prefer transparent to let page background show. */}

            <div className="container max-w-4xl mx-auto px-4">
                <FadeIn>
                    <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 font-sans text-white">
                        {title}
                    </h2>
                </FadeIn>

                <div className="space-y-4">
                    {items.map((faq, index) => (
                        <div
                            key={index}
                            className={`rounded-2xl border transition-all duration-300 overflow-hidden ${activeAccordion === index
                                    ? 'bg-neutral-900 border-gold-primary/50 shadow-[0_0_15px_rgba(212,175,55,0.1)]'
                                    : 'bg-neutral-900/50 border-white/10 hover:border-gold-primary/30 hover:bg-neutral-900'
                                }`}
                        >
                            <button
                                className="w-full flex items-center justify-between p-6 text-left"
                                onClick={() => toggleAccordion(index)}
                            >
                                <span className={`text-lg font-bold font-sans transition-colors ${activeAccordion === index ? 'text-white' : 'text-gray-200'}`}>
                                    {faq.question}
                                </span>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${activeAccordion === index ? 'bg-gold-primary text-black rotate-180' : 'bg-white/10 text-gray-400'}`}>
                                    <ChevronDown size={20} />
                                </div>
                            </button>

                            <div
                                className={`grid transition-all duration-300 ease-in-out ${activeAccordion === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                            >
                                <div className="overflow-hidden">
                                    <p className="px-6 pb-6 text-gray-400 leading-relaxed font-light">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
