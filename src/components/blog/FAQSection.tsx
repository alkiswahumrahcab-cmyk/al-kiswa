'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { enFaqs, arFaqs } from '@/data/faqs';

interface Props {
    lang?: 'ar' | 'en';
}

export default function FAQSection({ lang = 'en' }: Props) {
    const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
    const faqs = lang === 'ar' ? arFaqs : enFaqs;

    const toggleAccordion = (index: number) => {
        setActiveAccordion(activeAccordion === index ? null : index);
    };

    return (
        <section className="py-24 bg-bg relative border-t border-border">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-gold-strong font-semibold tracking-[0.14em] uppercase text-sm mb-4 block">
                        {lang === 'ar' ? 'أسئلة شائعة' : 'Common Questions'}
                    </span>
                    <h2 className="text-3xl md:text-[44px] font-semibold font-display text-ink leading-tight">
                        {lang === 'ar' ? 'الأسئلة الأكثر تكراراً' : 'Frequently Asked Questions'}
                    </h2>
                </div>

                <div className="max-w-3xl mx-auto">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-b border-border first:border-t">
                            <button
                                className={`w-full flex items-center justify-between py-6 group ${lang === 'ar' ? 'text-right' : 'text-left'}`}
                                onClick={() => toggleAccordion(index)}
                            >
                                <span className={`font-semibold text-[19px] md:text-xl transition-colors font-display ${activeAccordion === index ? 'text-ink' : 'text-ink group-hover:text-gold-strong'
                                    }`} style={lang === 'ar' ? { fontFamily: 'var(--font-tajawal)' } : {}}>
                                    {faq.question}
                                </span>
                                <div className={`flex items-center justify-center transition-transform duration-300 shrink-0 ${lang === 'ar' ? 'mr-4' : 'ml-4'} ${activeAccordion === index ? 'rotate-180 text-ink' : 'text-muted group-hover:text-gold-strong'}`}>
                                    <ChevronDown size={20} />
                                </div>
                            </button>
                            <div
                                className={`transition-all duration-300 ease-in-out overflow-hidden ${activeAccordion === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="pb-6 text-body text-base leading-[1.65] font-body" style={lang === 'ar' ? { fontFamily: 'var(--font-tajawal)' } : {}}>
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
