import { generateMetadataAlternates } from "@/lib/hreflang";
import Link from "next/link";
import { CheckCircle, Phone, MapPin } from "lucide-react";

export const metadata = {
  title: "مواصلات العمرة فرنسا | تاكسي جدة مكة | الكسوة",
  description: "خدمة نقل خاصة لحجاج فرنسا المعتمرين. نقل مطار جدة ← مكة ← المدينة. أسعار ثابتة، سائقون محترفون. احجز عبر الإنترنت.",
  alternates: generateMetadataAlternates("/umrah-taxi-france"),
  keywords: [
    "مواصلات العمرة فرنسا", "تاكسي جدة مكة الحجاج الفرنسيين",
    "نقل مطار جدة", "عمرة 2025 فرنسا نقل",
    "نقل مكة المدينة", "الكسوة حجاج فرنسا",
    "وكالة سفر العمرة فرنسا تاكسي", "سائق خاص السعودية عمرة"
  ],
  openGraph: {
    title: "مواصلات العمرة للحجاج الفرنسيين — الكسوة",
    description: "أسعار ثابتة. سائقون معتمدون. جدة ← مكة ← المدينة. احجز نقلك الخاص.",
    url: "https://kiswahumrahcab.com/ar/umrah-taxi-france",
    locale: "ar_SA",
    alternateLocale: ["fr_FR", "en_GB"],
    images: [{ url: "https://kiswahumrahcab.com/images/og-image.jpg", width: 1200, height: 630 }],
  },
};

const features = [
  "أسعار ثابتة — بدون رسوم خفية",
  "سائقون يتحدثون لغتين (العربية/الفرنسية)",
  "دعم واتساب 24/7",
  "سيارات حديثة ومعقمة",
  "مرخص من وزارة النقل",
  "أكثر من 10 سنوات من الخبرة",
];

export default function FrancePilgrimsArabicPage() {
  return (
    <main className="min-h-screen bg-primary-black text-white pt-24 pb-16 font-arabic" dir="rtl">
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none fixed" />
      <div className="container relative z-10 mx-auto px-4 max-w-5xl">

        <div className="text-center mb-16">
          <span className="text-gold-primary font-bold uppercase tracking-widest text-sm">🇫🇷 للحجاج الفرنسيين</span>
          <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6 leading-tight">
            مواصلات العمرة<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-primary to-amber-400">للحجاج الفرنسيين</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            من مطار جدة إلى الحرم — نقل خاص ومريح بأسعار ثابتة. في خدمة الحجاج من باريس، ليون، مارسيليا وجميع أنحاء فرنسا.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link href="/ar/booking" className="bg-gold-primary text-black font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(212,175,55,0.4)] uppercase tracking-wider text-lg">
              احجز الآن
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
          <h2 className="text-2xl font-bold mb-6 text-white text-center md:text-right">المسارات الشائعة</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { from: "مطار جدة (KAIA)", to: "فنادق مكة", price: "تبدأ من ٤٥ يورو" },
              { from: "مكة", to: "المدينة", price: "تبدأ من ٧٥ يورو" },
              { from: "مطار المدينة", to: "فنادق المدينة", price: "تبدأ من ٢٥ يورو" },
              { from: "جدة", to: "المدينة (مباشر)", price: "تبدأ من ٩٥ يورو" },
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
          <p className="text-gray-400 mb-6">تواصل معنا عبر واتساب — وسنرد عليك في دقائق.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/ar/booking" className="bg-gold-primary text-black font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform text-lg">
              احجز عبر الإنترنت
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
