'use client';

import { PremiumIcon, PremiumIconName } from '@/components/ui/PremiumIcon';
import AnimatedSection from '@/components/ui/AnimatedSection';
import FadeIn from '@/components/common/FadeIn';

interface Props {
    lang?: 'ar' | 'en';
}

const content = {
    en: {
        heading: <>Why Pilgrims Trust <br /><span className="text-gold">Al Kiswah Transport</span></>,
        sub: 'We understand that this is not just a trip; it is a sacred journey. Our mission is to ensure your travel between the Holy Cities is as peaceful as your prayers.',
        features: [
            {
                iconName: 'safety' as PremiumIconName,
                title: 'Peace of Mind',
                arabic: 'طمأنينة وآمان',
                desc: 'Focus on your worship while we handle the road. Our licensed chauffeurs and insured vehicles guarantee a safe, stress-free journey for you and your family.',
            },
            {
                iconName: 'time' as PremiumIconName,
                title: 'Respecting Your Time',
                arabic: 'دقة في المواعيد',
                desc: 'We know every minute in the Holy Land is precious. We track your flight for delays and arrive early, so you never have to rush or wait.',
            },
            {
                iconName: 'premium-quality' as PremiumIconName,
                title: 'Guest of Allah Hospitality',
                arabic: 'خدمة ضيوف الرحمن',
                desc: 'Serving you is an honor. Experience true Arabian hospitality with our VIP meet & greet service, luggage assistance, and comfortable, cool vehicles.',
            },
        ],
    },
    ar: {
        heading: <>لماذا يثق المعتمرون بـ <br /><span className="text-gold">الكسوة لنقل المعتمرين</span></>,
        sub: 'نحن ندرك أن هذه ليست مجرد رحلة، بل هي سفر روحاني مقدس. مهمتنا ضمان أن يكون تنقلكم بين المدن المقدسة بقدر السكينة والطمأنينة التي تشعرون بها في العبادة.',
        features: [
            {
                iconName: 'safety' as PremiumIconName,
                title: 'طمأنينة وآمان',
                arabic: 'Peace of Mind',
                desc: 'ركزوا على عبادتكم ونحن نتكفل بالطريق. سائقونا مرخصون وسياراتنا مؤمنة لضمان رحلة آمنة وخالية من القلق لكم ولعائلتكم.',
            },
            {
                iconName: 'time' as PremiumIconName,
                title: 'الدقة في المواعيد',
                arabic: 'Always On Time',
                desc: 'نعلم أن كل دقيقة في الأراضي المقدسة ثمينة. نتابع رحلتكم الجوية ونصل مبكراً حتى لا تضطروا للتسرع أو الانتظار.',
            },
            {
                iconName: 'premium-quality' as PremiumIconName,
                title: 'ضيافة ضيوف الرحمن',
                arabic: 'True Hospitality',
                desc: 'خدمتكم شرف لنا. اختبروا الضيافة العربية الأصيلة مع خدمة الاستقبال الفردي VIP، وحمل الأمتعة، والمركبات الفاخرة المكيفة.',
            },
        ],
    },
};

export default function Features({ lang = 'en' }: Props) {
    const t = content[lang];

    return (
        <AnimatedSection className="py-20 md:py-28 relative overflow-hidden bg-bg">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-1/4 -left-64 w-96 h-96 bg-gold/5 rounded-full blur-3xl mix-blend-screen" />
                <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-gold-metallic/5 rounded-full blur-3xl mix-blend-screen" />
                <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-[0.03] mix-blend-overlay pointer-events-none bg-repeat" />
            </div>

            <div className="container px-4">
                <FadeIn>
                    <h2 className="text-4xl md:text-5xl font-semibold text-center mb-6 font-display text-ink leading-tight">
                        {t.heading}
                    </h2>
                    <p className="text-lg text-ink-muted text-center max-w-2xl mx-auto mb-16 font-light leading-relaxed">
                        {t.sub}
                    </p>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {t.features.map((feature, index) => (
                        <div key={index} className="card text-center group h-full p-8 flex flex-col items-center justify-start">
                            <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold/10 text-gold group-hover:scale-110 group-hover:bg-gold group-hover:text-black hover-icon-black transition-all duration-500 shadow-xl shadow-gold/5">
                                <PremiumIcon name={feature.iconName} size="feature" className="group-hover:!text-black" />
                            </div>
                            <h3 className="text-2xl font-semibold mb-2 font-display text-ink group-hover:text-gold transition-colors">{feature.title}</h3>
                            <p className="text-gold-metallic/80 font-bold font-reem-kufi mb-4 text-lg">{feature.arabic}</p>
                            <p className="text-ink-muted leading-relaxed group-hover:text-ink transition-colors">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
}
