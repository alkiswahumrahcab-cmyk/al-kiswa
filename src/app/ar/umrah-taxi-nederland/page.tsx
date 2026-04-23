import { generateMetadataAlternates } from "@/lib/hreflang";
import Link from "next/link";
import { CheckCircle, Phone, MapPin } from "lucide-react";

export const metadata = {
  title: "مواصلات العمرة هولندا | تاكسي مطار جدة مكة | الكسوة",
  description: "خدمة نقل مريحة لحجاج هولندا. من مطار جدة إلى مكة المكرمة والمدينة المنورة. سيارات مكيفة، أسعار ثابتة وسائقون محترفون. احجز رحلتك الآن.",
  alternates: generateMetadataAlternates("/umrah-taxi-nederland"),
  keywords: [
    "مواصلات العمرة هولندا", "تاكسي جدة مكة هولندا",
    "نقل مطار جدة للمعتمرين", "عمرة 2025 هولندا",
    "نقل خاص مكة والمدينة", "الكسوة حجاج هولندا",
    "تاكسي الحرم هولندا", "سائق عمرة موثوق"
  ],
  openGraph: {
    title: "مواصلات العمرة للحجاج من هولندا — الكسوة",
    description: "أسعار ثابتة. سائقون محترفون. جدة ← مكة ← المدينة. احجز نقلك المريح الآن.",
    url: "https://kiswahumrahcab.com/ar/umrah-taxi-nederland",
    locale: "ar_SA",
    alternateLocale: ["nl_NL", "en_GB"],
    images: [{ url: "https://kiswahumrahcab.com/images/og-image.jpg", width: 1200, height: 630 }],
  },
};

const features = [
  "أسعار ثابتة — لا توجد رسوم خفية",
  "سائقون محترفون ومهذبون",
  "دعم واتساب على مدار الساعة",
  "سيارات واسعة ومريحة للعائلات",
  "تصاريح رسمية من وزارة النقل",
  "استقبال في المطار مع لوحة بالاسم",
];

export default function NederlandPilgrimsArabicPage() {
  return (
    <main className="min-h-screen bg-primary-black text-white pt-24 pb-16 font-arabic" dir="rtl">
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none fixed" />
      <div className="container relative z-10 mx-auto px-4 max-w-5xl">

        <div className="text-center mb-16">
          <span className="text-gold-primary font-bold uppercase tracking-widest text-sm">🇳🇱 للحجاج من هولندا</span>
          <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6 leading-tight">
            مواصلات العمرة<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-primary to-amber-400">للحجاج من هولندا</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            استمتع برحلة روحانية براحة تامة. من مطار جدة إلى الحرم، نقدم لكم خدمة نقل موثوقة وآمنة في خدمة الحجاج من أمستردام، روتردام وكل هولندا.
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
          <h2 className="text-2xl font-bold mb-6 text-white text-center md:text-right">أهم المسارات والأسعار</h2>
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
          <h2 className="text-2xl font-bold mb-3">ابدأ رحلتك الروحانية باطمئنان</h2>
          <p className="text-gray-400 mb-6">احجز بكل سهولة وسنكون بانتظارك عند الوصول.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/ar/booking" className="bg-gold-primary text-black font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform text-lg">
              احجز نقلك الآن
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
