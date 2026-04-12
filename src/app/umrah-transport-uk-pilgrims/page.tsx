import { generateMetadataAlternates } from "@/lib/hreflang";
import Link from "next/link";
import { CheckCircle, Phone, MapPin, Star } from "lucide-react";

export const metadata = {
  title: "Umrah Transport for UK Pilgrims | Al Kiswah | Jeddah · Makkah · Madinah",
  description: "Private Umrah taxi from Jeddah Airport to Makkah for UK pilgrims. Fixed prices, English-speaking drivers, 24/7 support. Trusted by 5,000+ British pilgrims. Book online.",
  alternates: generateMetadataAlternates("/umrah-transport-uk-pilgrims"),
  keywords: [
    "Umrah taxi for UK pilgrims", "Jeddah airport transfer British pilgrims",
    "Makkah taxi from UK pilgrim", "Umrah transport London pilgrims",
    "private transfer Jeddah Makkah UK", "Umrah 2025 taxi UK",
    "Al Kiswah UK pilgrims", "British Hajj transport Saudi Arabia"
  ],
  openGraph: {
    title: "Umrah Transport for UK Pilgrims — Al Kiswah | Jeddah → Makkah",
    description: "Fixed-price private transfers from Jeddah Airport. English-speaking drivers. Trusted by 5,000+ UK pilgrims.",
    url: "https://kiswahumrahcab.com/umrah-transport-uk-pilgrims",
    locale: "en_GB",
    alternateLocale: ["ar_SA"],
    images: [{ url: "https://kiswahumrahcab.com/images/og-image.jpg", width: 1200, height: 630 }],
  },
};

const features = [
  "Fixed prices — no surprise fees",
  "English-speaking, vetted drivers",
  "24/7 WhatsApp support from the UK",
  "Modern, sanitised fleet (GMC, Staria, Hiace)",
  "Ministry of Transport licensed",
  "10+ years serving British pilgrims",
];

export default function UKPilgrimsPage() {
  return (
    <main className="min-h-screen bg-primary-black text-white pt-24 pb-16">
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none fixed" />
      <div className="container relative z-10 mx-auto px-4 max-w-5xl">

        {/* Hero */}
        <div className="text-center mb-16">
          <span className="text-gold-primary font-bold uppercase tracking-widest text-sm">🇬🇧 For UK Pilgrims</span>
          <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6 leading-tight">
            Umrah Transport<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-primary to-amber-400">Trusted by British Pilgrims</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            From Jeddah Airport to the Haram — private, comfortable, and fixed-price.
            Serving UK pilgrims from London, Birmingham, Manchester, and beyond.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link href="/booking" className="bg-gold-primary text-black font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(212,175,55,0.4)] uppercase tracking-wider">
              Book Your Transfer
            </Link>
            <a href="https://wa.me/966548707332" className="border border-gold-primary/50 text-gold-primary font-bold px-8 py-4 rounded-full hover:bg-gold-primary/10 transition-colors uppercase tracking-wider">
              WhatsApp Us
            </a>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-4 mb-16">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-3 bg-white/5 rounded-xl p-4 border border-white/10">
              <CheckCircle className="text-gold-primary shrink-0" size={20} />
              <span className="text-gray-200">{f}</span>
            </div>
          ))}
        </div>

        {/* Routes */}
        <div className="bg-white/5 rounded-2xl border border-white/10 p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Popular Routes for UK Pilgrims</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { from: "Jeddah Airport (KAIA)", to: "Makkah Hotels", price: "From £35" },
              { from: "Makkah", to: "Madinah", price: "From £65" },
              { from: "Madinah Airport", to: "Madinah Hotels", price: "From £20" },
              { from: "Jeddah Airport", to: "Madinah (direct)", price: "From £85" },
            ].map((route, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-black/30 rounded-xl border border-white/5">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin size={14} className="text-gold-primary" />
                  <span className="text-gray-300">{route.from} → {route.to}</span>
                </div>
                <span className="text-gold-primary font-bold text-sm">{route.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trust signals */}
        <div className="grid sm:grid-cols-3 gap-6 text-center mb-12">
          {[
            { stat: "5,000+", label: "UK Pilgrims Served" },
            { stat: "5★", label: "Average Rating" },
            { stat: "10+", label: "Years Experience" },
          ].map((s, i) => (
            <div key={i} className="bg-white/5 rounded-xl p-6 border border-white/10">
              <div className="text-4xl font-bold text-gold-primary">{s.stat}</div>
              <div className="text-gray-400 mt-2 text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-gold-primary/10 to-amber-500/10 rounded-2xl border border-gold-primary/30 p-10">
          <h2 className="text-2xl font-bold mb-3">Ready to book your Umrah transfer?</h2>
          <p className="text-gray-400 mb-6">WhatsApp us or book online — we reply within minutes.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking" className="bg-gold-primary text-black font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform">
              Book Online
            </Link>
            <a href="tel:+966548707332" className="flex items-center justify-center gap-2 border border-white/20 text-white font-bold px-8 py-4 rounded-full hover:bg-white/5 transition-colors">
              <Phone size={18} /> +966 54 870 7332
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
