'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import FadeIn from '@/components/common/FadeIn';

const faqs = [
    {
        question: "Can I pay cash after the trip?",
        answer: "Yes, absolutely! We offer a 'Book Now, Pay Later' service. You can pay the driver in cash (SAR) upon reaching your hotel safely. No credit card is required upfront."
    },
    {
        question: "What if my flight is delayed?",
        answer: "We track your flight status in real-time. Our driver will wait for you at the arrival terminal free of charge, even if your flight is delayed. You don't need to worry about landing late."
    },
    {
        question: "Are there any hidden fees or parking charges?",
        answer: "No. The price you see is the final price. It includes fuel, parking fees, taxes/VAT, and driver waiting time. No surprises."
    },
    {
        question: "How do I find my driver at Jeddah Airport?",
        answer: "Our meet-and-greet service is seamless. The driver will be waiting at the arrival hall holding a sign with your name. We will also share the driver's photo and WhatsApp number before you land."
    },
    {
        question: "Is the vehicle sanitized and air-conditioned?",
        answer: "Yes. All our vehicles (GMC Yukon, Camry, Hiace) are 2024/2025 models. They are deep-cleaned before every trip and have powerful AC to handle the Saudi heat."
    },
    {
        question: "Do you offer Ziyarat tours in Makkah and Madinah?",
        answer: "Yes, we provide comprehensive Ziyarat packages. Our knowledgeable drivers can take you to all significant historical and spiritual sites (Uhud, Quba, Hira Cave) in both holy cities."
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
