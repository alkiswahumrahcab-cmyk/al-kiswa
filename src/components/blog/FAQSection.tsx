'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import FadeIn from '@/components/common/FadeIn';

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
        <section className="py-24 bg-transparent relative border-t border-border">
            <div className="container mx-auto px-4">
                <FadeIn>
                    <div className="text-center mb-16">
                        <span className="text-gold font-bold tracking-[0.2em] uppercase text-sm mb-3 block">
                            {lang === 'ar' ? 'أسئلة شائعة' : 'Common Questions'}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-semibold font-display text-foreground">
                            {lang === 'ar' ? 'الأسئلة الأكثر تكراراً' : 'Frequently Asked Questions'}
                        </h2>
                    </div>
                </FadeIn>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <FadeIn key={index} delay={index * 0.1}>
                            <div
                                className={`border rounded-xl backdrop-blur-sm transition-all duration-300 ${activeAccordion === index
                                    ? 'bg-card border-gold/50 shadow-[0_0_15px_hsl(var(--gold-glow) / 0.1)]'
                                    : 'bg-muted/50 border-border hover:border-gold/30 hover:bg-card'
                                    }`}
                            >
                                <button
                                    className={`w-full flex items-center justify-between p-6 ${lang === 'ar' ? 'text-right' : 'text-left'}`}
                                    onClick={() => toggleAccordion(index)}
                                >
                                     <span className={`font-semibold text-lg transition-colors font-sans ${activeAccordion === index ? 'text-foreground' : 'text-muted-foreground hover:text-gold'
                                        }`} style={lang === 'ar' ? { fontFamily: 'var(--font-tajawal)' } : {}}>
                                        {faq.question}
                                    </span>
                                     <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${lang === 'ar' ? 'mr-4' : ''} ${activeAccordion === index ? 'bg-gold text-black rotate-180' : 'bg-muted text-muted-foreground'}`}>
                                        <ChevronDown size={20} />
                                    </div>
                                </button>
                                <div
                                    className={`transition-all duration-300 ease-in-out overflow-hidden ${activeAccordion === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                        }`}
                                >
                                     <div className="px-6 pb-6 text-muted-foreground leading-relaxed font-light border-t border-border" style={lang === 'ar' ? { fontFamily: 'var(--font-tajawal)' } : {}}>
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
