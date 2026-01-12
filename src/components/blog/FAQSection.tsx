'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import FadeIn from '@/components/common/FadeIn';

const faqs = [
    {
        question: "How to book a taxi for Umrah in Saudi Arabia?",
        answer: "Booking is simple with Al Kiswah Umrah Transport. You can book online through our website for instant confirmation. We offer reliable Umrah Taxi Services from Jeddah Airport, Makkah, and Madinah with 24/7 support."
    },
    {
        question: "What is the best way to travel from Jeddah to Makkah?",
        answer: "The best way is to book a private Airport to Haram Taxi. It offers the most comfort and convenience, especially after a long flight. Our Jeddah Airport to Makkah transfers ensure you reach your hotel or the Haram directly without the hassle of waiting."
    },
    {
        question: "What is the cost of a taxi from Makkah to Madinah?",
        answer: "Fares depend on the vehicle choice. A standard sedan for a Makkah to Madinah Taxi typically starts around 350-400 SAR. For larger groups, a Family Umrah Taxi (like a Hiace) or a VIP GMC Yukon will have different rates. Check our calculator for real-time prices."
    },
    {
        question: "Private vs shared transport for Umrah: Which is better?",
        answer: "Private Umrah Transport is generally recommended for peace of mind, privacy, and flexibility. Unlike shared buses, a private car allows you to travel on your own schedule, making it ideal for families and elderly pilgrims."
    },
    {
        question: "How can I find a trustworthy taxi service in Makkah?",
        answer: "Look for licensed providers like Al Kiswah Umrah Transport. We are a registered Umrah Transport Company with professional, English-speaking drivers and a track record of safety and reliability. Always avoid unregistered street taxis."
    },
    {
        question: "Do you offer Ziyarat tours in Makkah and Madinah?",
        answer: "Yes, we provide comprehensive Ziyarat packages. Our knowledgeable drivers can take you to all significant historical and spiritual sites in both holy cities, allowing you to pay your respects comfortably."
    }
];

export default function FAQSection() {
    const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setActiveAccordion(activeAccordion === index ? null : index);
    };

    return (
        <section className="py-24 bg-transparent relative border-t border-white/5">
            <div className="container mx-auto px-4">
                <FadeIn>
                    <div className="text-center mb-16">
                        <span className="text-gold-primary font-bold tracking-[0.2em] uppercase text-sm mb-3 block">Common Questions</span>
                        <h2 className="text-3xl md:text-4xl font-bold font-sans text-white">Frequently Asked Questions</h2>
                    </div>
                </FadeIn>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <FadeIn key={index} delay={index * 0.1}>
                            <div
                                className={`border rounded-xl backdrop-blur-sm transition-all duration-300 ${activeAccordion === index
                                    ? 'bg-neutral-900 border-gold-primary/50 shadow-[0_0_15px_rgba(212,175,55,0.1)]'
                                    : 'bg-neutral-900/50 border-white/10 hover:border-gold-primary/30 hover:bg-neutral-900'
                                    }`}
                            >
                                <button
                                    className="w-full flex items-center justify-between p-6 text-left"
                                    onClick={() => toggleAccordion(index)}
                                >
                                    <span className={`font-semibold text-lg transition-colors font-sans ${activeAccordion === index ? 'text-white' : 'text-gray-300 hover:text-gold-primary'
                                        }`}>
                                        {faq.question}
                                    </span>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${activeAccordion === index ? 'bg-gold-primary text-black rotate-180' : 'bg-white/5 text-gray-500'}`}>
                                        <ChevronDown size={20} />
                                    </div>
                                </button>
                                <div
                                    className={`transition-all duration-300 ease-in-out overflow-hidden ${activeAccordion === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <div className="px-6 pb-6 text-gray-400 leading-relaxed font-light border-t border-white/5">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
