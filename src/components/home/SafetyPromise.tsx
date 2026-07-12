'use strict';
import React from 'react';
import { AlertTriangle, Clock, Phone, ShieldCheck, Zap } from 'lucide-react';
import FadeIn from '@/components/common/FadeIn';

interface Props {
    lang?: 'ar' | 'en';
}

export default function SafetyPromise({ lang = 'en' }: Props) {
    const isAr = lang === 'ar';

    const content = {
        guaranteeLabel: isAr ? "ضمان الكسوة:" : "Guarantee:",
        guaranteeText: isAr ? "في حال حدوث أي عطل طارئ، يتم إرسال سيارة بديلة لك فوراً." : "In the unlikely event of any issue, a replacement vehicle is routed to you instantly.",
        title: isAr ? (
            <>
                وعدنا: <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-light to-gold">"لن تتعطل رحلتك أبداً"</span>
            </>
        ) : (
            <>
                Our "Never Stranded" <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-light to-gold">Promise</span>
            </>
        ),
        subtitle: isAr ? (
            <>
                نحن لا نكتفي بالأمل في الأفضل؛ بل نخطط لكل الطوارئ.
                <strong> بروتوكول الاستجابة للطوارئ </strong>
                يضمن استمرار رحلتك الروحانية دون انقطاع، مهما حدث.
            </>
        ) : (
            <>
                We don't just hope for the best; we engineer for the unexpected.
                Our <strong>Emergency Deployment Protocol</strong> ensures your spiritual journey remains uninterrupted, no matter what.
            </>
        ),
        targetTitle: isAr ? "هدف ٦٠ دقيقة" : "60 Min Target",
        targetDesc: isAr ? "أقصى وقت لانتظار البديل" : "Max wait for replacement",
        commandTitle: isAr ? "قيادة عمليات ٢٤/٧" : "24/7 Command",
        commandDesc: isAr ? "تواصل مباشر مع مدير العمليات" : "Direct Ops Manager Line",
        statusLabel: isAr ? "حالة البروتوكول" : "Protocol Status",
        statusActive: isAr ? "نشط وجاهز" : "Active & Ready",
        sopTitle: isAr ? "إجراءات الطوارئ القياسية" : "Standard Operating Procedure",
        sopSteps: [
            {
                step: 1,
                title: isAr ? "الأمان والراحة" : "Secure & Comfort",
                desc: isAr ? "يؤمن السائق السيارة في منطقة آمنة. توفير التكييف والماء فوراً." : "Driver secures vehicle in safe zone. AC & Water provided immediately."
            },
            {
                step: 2,
                title: isAr ? "تدخل سريع" : "Rapid Deployment",
                desc: isAr ? "توجيه أقرب وحدة احتياطية من قواعدنا في مكة والمدينة." : "Nearest standby unit dispatched from Makkah/Madinah bases."
            },
            {
                step: 3,
                title: isAr ? "تعويض فوري" : "Instant Refund",
                desc: isAr ? "معالجة تعويض مالي كامل أو رصيد عن أي إزعاج." : "Full refund or credit processed for the inconvenience."
            }
        ],
        documentationLink: isAr ? "عرض وثيقة السلامة الكاملة" : "View Full Safety Documentation"
    };

    return (
        <section className={`py-24 relative overflow-hidden bg-transparent ${isAr ? 'rtl font-cairo' : 'ltr'}`} dir={isAr ? 'rtl' : 'ltr'}>
            <div className="container mx-auto px-4">
                <div className="glass-panel overflow-hidden relative">
                    {/* Decorative Background Effects */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] -ml-48 -mb-48 pointer-events-none"></div>
                    <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>

                    <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-20 p-8 md:p-12 items-center">

                        {/* Left Column: Content */}
                        <div className="order-2 lg:order-1 flex flex-col justify-center">
                            {/* Alert Banner */}
                            <FadeIn>
                                <div className="inline-flex items-start md:items-center gap-3 px-4 py-3 rounded-2xl bg-gold/10 border border-gold/20 text-gold text-sm md:text-base font-medium mb-8 max-w-xl group hover:bg-gold/15 transition-colors cursor-default">
                                    <AlertTriangle className="shrink-0 text-gold animate-pulse" size={20} />
                                    <span className="leading-snug text-foreground/90" style={isAr ? { fontFamily: 'var(--font-tajawal)' } : {}}>
                                        <strong className="text-gold">{content.guaranteeLabel}</strong> {content.guaranteeText}
                                    </span>
                                </div>
                            </FadeIn>

                            <FadeIn delay={0.1}>
                                <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6 font-display leading-tight tracking-tight">
                                    {content.title}
                                </h2>

                                <p className="text-muted-foreground text-base md:text-lg lg:text-xl mb-10 leading-relaxed max-w-xl font-light" style={isAr ? { fontFamily: 'var(--font-tajawal)' } : {}}>
                                    {content.subtitle}
                                </p>
                            </FadeIn>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                                {/* Feature Card 1: 60 Min Target */}
                                <FadeIn delay={0.2}>
                                    <div className="glass-card group flex items-center gap-4 p-4">
                                        <div className="bg-gold/10 rounded-lg p-3 text-gold group-hover:scale-110 transition-transform border border-gold/20 shrink-0">
                                            <Clock size={24} strokeWidth={2.5} />
                                        </div>
                                        <div>
                                            <h4 className="text-foreground font-semibold text-lg leading-none mb-1.5 group-hover:text-gold transition-colors font-display">{content.targetTitle}</h4>
                                            <p className="text-muted-foreground text-xs md:text-sm font-medium group-hover:text-foreground/80" style={isAr ? { fontFamily: 'var(--font-tajawal)' } : {}}>{content.targetDesc}</p>
                                        </div>
                                    </div>
                                </FadeIn>

                                {/* Feature Card 2: 24/7 Command */}
                                <FadeIn delay={0.3}>
                                    <div className="glass-card group flex items-center gap-4 p-4">
                                        <div className="bg-gold/10 rounded-lg p-3 text-gold group-hover:scale-110 transition-transform border border-gold/20 shrink-0">
                                            <Phone size={24} strokeWidth={2.5} />
                                        </div>
                                        <div>
                                            <h4 className="text-foreground font-semibold text-lg leading-none mb-1.5 group-hover:text-gold transition-colors font-display">{content.commandTitle}</h4>
                                            <p className="text-muted-foreground text-xs md:text-sm font-medium group-hover:text-foreground/80" style={isAr ? { fontFamily: 'var(--font-tajawal)' } : {}}>{content.commandDesc}</p>
                                        </div>
                                    </div>
                                </FadeIn>
                            </div>
                        </div>

                        {/* Right Column: Visual SOP Interface */}
                        <div className="order-1 lg:order-2">
                            <FadeIn delay={0.4}>
                                <div className="relative rounded-2xl p-[1px] bg-gradient-to-b from-border to-transparent shadow-2xl">
                                    <div className="glass-panel p-6 md:p-8 relative overflow-hidden">

                                        {/* Status Badge */}
                                        <div className="flex justify-between items-center mb-8 border-b border-border pb-6">
                                            <div className="flex items-center gap-2">
                                                <ShieldCheck className="text-gold hidden md:block shrink-0" size={20} />
                                                <span className="text-muted-foreground text-xs font-mono uppercase tracking-widest">{content.statusLabel}</span>
                                            </div>
                                            <div className="bg-gold/10 border border-gold/20 text-gold text-[10px] md:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-2 animate-pulse">
                                                <span className="w-2 h-2 rounded-full bg-gold shrink-0"></span>
                                                {content.statusActive}
                                            </div>
                                        </div>

                                        <h4 className="text-foreground font-semibold text-xl md:text-2xl mb-6 font-display">{content.sopTitle}</h4>

                                        <div className="space-y-4">
                                            {content.sopSteps.map((item, idx) => (
                                                <div key={idx} className="flex gap-4 p-3 rounded-xl hover:bg-muted transition-colors group cursor-default border border-transparent hover:border-border">
                                                    <div className="flex-shrink-0 relative">
                                                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-card border border-border flex items-center justify-center text-gold font-bold font-mono group-hover:border-gold group-hover:bg-gold group-hover:text-black transition-all duration-300 z-10 relative shadow-lg">
                                                            {item.step}
                                                        </div>
                                                        {idx !== 2 && <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[1px] h-full bg-border group-hover:bg-primary/20 transition-colors -z-0"></div>}
                                                    </div>
                                                    <div>
                                                        <h5 className="text-foreground font-semibold text-sm md:text-base mb-1 group-hover:text-gold transition-colors font-display">{item.title}</h5>
                                                        <p className="text-muted-foreground text-xs md:text-sm leading-relaxed group-hover:text-foreground/80 transition-colors font-light" style={isAr ? { fontFamily: 'var(--font-tajawal)' } : {}}>
                                                            {item.desc}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Action Button */}
                                        <div className="mt-8 pt-6 border-t border-border text-center">
                                            <a href={isAr ? "/ar/safety" : "/safety"} className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-2 group" style={isAr ? { fontFamily: 'var(--font-tajawal)' } : {}}>
                                                {content.documentationLink}
                                                <Zap size={14} className="text-gold group-hover:fill-gold transition-all shrink-0" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
