'use client';

import { Shield, Clock, Heart } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import FadeIn from '@/components/common/FadeIn';

interface Props {
    lang?: 'ar' | 'en';
}

const content = {
    en: {
        heading: <>Why Pilgrims Trust <br /><span className="text-gold-primary">Al Kiswah Transport</span></>,
        sub: 'We understand that this is not just a trip; it is a sacred journey. Our mission is to ensure your travel between the Holy Cities is as peaceful as your prayers.',
        features: [
            {
                icon: Shield,
                title: 'Peace of Mind',
                arabic: 'طمأنينة وآمان',
                desc: 'Focus on your worship while we handle the road. Our licensed chauffeurs and insured vehicles guarantee a safe, stress-free journey for you and your family.',
            },
            {
                icon: Clock,
                title: 'Respecting Your Time',
                arabic: 'دقة في المواعيد',
                desc: 'We know every minute in the Holy Land is precious. We track your flight for delays and arrive early, so you never have to rush or wait.',
            },
            {
                icon: Heart,
                title: 'Guest of Allah Hospitality',
                arabic: 'خدمة ضيوف الرحمن',
                desc: 'Serving you is an honor. Experience true Arabian hospitality with our VIP meet & greet service, luggage assistance, and comfortable, cool vehicles.',
            },
        ],
    },
    ar: {
        heading: <>لماذا يثق المعتمرون بـ <br /><span className="text-gold-primary">الكسوة لنقل المعتمرين</span></>,
        sub: 'نحن ندرك أن هذه ليست مجرد رحلة، بل هي سفر روحاني مقدس. مهمتنا ضمان أن يكون تنقلكم بين المدن المقدسة بقدر السكينة والطمأنينة التي تشعرون بها في العبادة.',
        features: [
            {
                icon: Shield,
                title: 'طمأنينة وآمان',
                arabic: 'Peace of Mind',
                desc: 'ركزوا على عبادتكم ونحن نتكفل بالطريق. سائقونا مرخصون وسياراتنا مؤمنة لضمان رحلة آمنة وخالية من القلق لكم ولعائلتكم.',
            },
            {
                icon: Clock,
                title: 'الدقة في المواعيد',
                arabic: 'Always On Time',
                desc: 'نعلم أن كل دقيقة في الأراضي المقدسة ثمينة. نتابع رحلتكم الجوية ونصل مبكراً حتى لا تضطروا للتسرع أو الانتظار.',
            },
            {
                icon: Heart,
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
        <AnimatedSection className="py-20 md:py-28 relative overflow-hidden bg-[#050505]">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-1/4 -left-64 w-96 h-96 bg-gold-primary/5 rounded-full blur-3xl mix-blend-screen" />
                <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-gold-metallic/5 rounded-full blur-3xl mix-blend-screen" />
                <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-[0.03] mix-blend-overlay pointer-events-none bg-repeat" />
            </div>

            <div className="container px-4">
                <FadeIn>
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 font-sans text-white leading-tight">
                        {t.heading}
                    </h2>
                    <p className="text-lg text-gray-400 text-center max-w-2xl mx-auto mb-16 font-light leading-relaxed">
                        {t.sub}
                    </p>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {t.features.map((feature, index) => (
                        <div key={index} className="text-center group relative h-full bg-white/5 backdrop-blur-md rounded-3xl p-8 hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl hover:shadow-gold-primary/10 border border-white/5 hover:border-gold-primary/30">
                            <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold-primary/10 text-gold-primary group-hover:scale-110 group-hover:bg-gold-primary group-hover:text-black transition-all duration-500 shadow-xl shadow-gold-primary/5">
                                <feature.icon size={36} />
                            </div>
                            <h3 className="text-2xl font-bold mb-2 font-sans text-white group-hover:text-gold-primary transition-colors">{feature.title}</h3>
                            <p className="text-gold-metallic/80 font-bold font-reem-kufi mb-4 text-lg">{feature.arabic}</p>
                            <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
}
