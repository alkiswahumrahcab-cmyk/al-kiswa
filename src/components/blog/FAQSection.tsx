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
        <section className="py-20 bg-slate-50 relative">
            <div className="container mx-auto px-4">
                <FadeIn>
                    <div className="text-center mb-16">
                        <span className="text-amber-500 font-bold tracking-widest uppercase text-sm mb-3 block">Common Questions</span>
                        <h2 className="text-3xl md:text-4xl font-bold font-playfair text-slate-800">Frequently Asked Questions</h2>
                    </div>
                </FadeIn>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <FadeIn key={index} delay={index * 0.1}>
                            <div
                                className={`border rounded-xl bg-white overflow-hidden transition-all duration-300 ${activeAccordion === index
                                    ? 'border-amber-200 shadow-md shadow-amber-500/5'
                                    : 'border-slate-100 shadow-sm hover:border-amber-200/50'
                                    }`}
                            >
                                <button
                                    className="w-full flex items-center justify-between p-6 text-left"
                                    onClick={() => toggleAccordion(index)}
                                >
                                    <span className={`font-semibold text-lg transition-colors ${activeAccordion === index ? 'text-amber-600' : 'text-slate-700 hover:text-amber-600'
                                        }`}>
                                        {faq.question}
                                    </span>
                                    <ChevronDown
                                        className={`text-slate-400 transition-transform duration-300 ${activeAccordion === index ? 'rotate-180 text-amber-500' : ''
                                            }`}
                                        size={20}
                                    />
                                </button>
                                <div
                                    className={`transition-all duration-300 ease-in-out overflow-hidden ${activeAccordion === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-50 bg-slate-50/50">
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
