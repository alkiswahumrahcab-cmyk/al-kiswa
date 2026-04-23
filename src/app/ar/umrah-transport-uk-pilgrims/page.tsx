import { generateMetadataAlternates } from "@/lib/hreflang";
import Link from "next/link";
import { CheckCircle, Phone, MapPin } from "lucide-react";

export const metadata = {
  title: "مواصلات العمرة بريطانيا | تاكسي مكة جدة | الكسوة",
  description: "نقل العمرة الموثوق للحجاج من المملكة المتحدة. نقل من مطار جدة إلى مكة والمدينة. سائقون يتحدثون الإنجليزية، أسعار ثابتة.",
  alternates: generateMetadataAlternates("/umrah-transport-uk-pilgrims"),
  keywords: [
    "مواصلات العمرة بريطانيا", "تاكسي مطار جدة مكة",
    "نقل حجاج بريطانيا", "عمرة 2025 تاكسي",
    "نقل خاص مكة", "الكسوة حجاج بريطانيا",
    "نقل كبار الشخصيات عمرة", "حجز تاكسي عمرة بريطانيا"
  ],
  openGraph: {
    title: "مواصلات العمرة للحجاج من بريطانيا — الكسوة",
    description: "أسعار ثابتة. سائقون معتمدون يتحدثون الإنجليزية. جدة ← مكة ← المدينة.",
    url: "https://kiswahumrahcab.com/ar/umrah-transport-uk-pilgrims",
    locale: "ar_SA",
    alternateLocale: ["en_GB"],
    images: [{ url: "https://kiswahumrahcab.com/images/og-image.jpg", width: 1200, height: 630 }],
  },
};

const features = [
  "أسعار ثابتة — بدون رسوم خفية",
  "سائقون يتحدثون الإنجليزية لتواصل أسهل",
  "دعم واتساب 24/7 (فريق بريطاني)",
  "سيارات حديثة ونظيفة",
  "مرخص ومعتمد رسمياً",
  "استقبال وترحيب في المطار",
];

export default function UKPilgrimsArabicPage() {
  return (
    <main className="min-h-screen bg-primary-black text-white pt-24 pb-16 font-arabic" dir="rtl">
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none fixed" />
      <div className="container relative z-10 mx-auto px-4 max-w-5xl">

        <div className="text-center mb-16">
          <span className="text-gold-primary font-bold uppercase tracking-widest text-sm">🇬🇧 للحجاج من المملكة المتحدة</span>
          <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6 leading-tight">
            مواصلات العمرة<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-primary to-amber-400">للحجاج من بريطانيا</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            من مطار جدة إلى الحرم — نقل خاص، موثوق ومريح. في خدمة الحجاج من لندن، برمنغهام، مانشستر وعموم بريطانيا.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link href="/ar/booking" className="bg-gold-primary text-black font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(212,175,55,0.4)] uppercase tracking-wider text-lg">
              احجز عبر الإنترنت
            </Link>
            <a href="https://wa.me/966548707332" className="border border-gold-primary/50 text-gold-primary font-bold px-8 py-4 rounded-full hover:bg-gold-primary/10 transition-colors uppercase tracking-wider text-lg">
              تواصل عبر واتساب
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-16">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-3 bg-white/5 rounded-xl p-4 border border-white/10">
              <CheckCircle className="text-gold-primary shrink-0" size={20} />
              <span className="text-gray-200">{f}</span>
            </div>
          ))}
        </div>

        <div className="bg-white/5 rounded-2xl border border-white/10 p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white text-center md:text-right">المسارات الموصى بها</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { from: "مطار جدة (KAIA)", to: "فنادق مكة", price: "تبدأ من £٤٠" },
              { from: "مكة", to: "المدينة", price: "تبدأ من £٦٥" },
              { from: "مطار المدينة", to: "فنادق المدينة", price: "تبدأ من £٢٥" },
              { from: "جدة", to: "المدينة (مباشر)", price: "تبدأ من £٨٥" },
            ].map((route, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-black/30 rounded-xl border border-white/5">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin size={14} className="text-gold-primary" />
                  <span className="text-gray-300">{route.from} ← {route.to}</span>
                </div>
                <span className="text-gold-primary font-bold text-sm" dir="ltr">{route.price}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center bg-gradient-to-r from-gold-primary/10 to-amber-500/10 rounded-2xl border border-gold-primary/30 p-10">
          <h2 className="text-2xl font-bold mb-3">هل أنت مستعد لحجز نقلك؟</h2>
          <p className="text-gray-400 mb-6">تواصل معنا عبر واتساب — وسنرد عليك باللغتين الإنجليزية أو العربية.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/ar/booking" className="bg-gold-primary text-black font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform text-lg">
              احجز رحلتك
            </Link>
            <a href="tel:+966548707332" className="flex items-center justify-center gap-2 border border-white/20 text-white font-bold px-8 py-4 rounded-full hover:bg-white/5 transition-colors text-lg" dir="ltr">
              <Phone size={18} /> +966 54 870 7332
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
