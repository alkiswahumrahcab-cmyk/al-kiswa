import { generateMetadataAlternates } from "@/lib/hreflang";
import Link from "next/link";
import { CheckCircle, Phone, MapPin } from "lucide-react";

export const metadata = {
  title: "Transport Omra France | Taxi Djeddah Mecque | Al Kiswah",
  description: "Service de transport privé pour pèlerins français effectuant la Omra. Transfert aéroport Djeddah → Mecque · La Médine. Prix fixes, chauffeurs professionnels. Réservez en ligne.",
  alternates: generateMetadataAlternates("/umrah-taxi-france"),
  keywords: [
    "transport Omra France", "taxi Djeddah Mecque pèlerins français",
    "transfert aéroport Djeddah", "Omra 2025 France transport",
    "navette Mecque Médine", "Al Kiswah pèlerins France",
    "agence voyage Omra France taxi", "chauffeur privé Arabie Saoudite Omra"
  ],
  openGraph: {
    title: "Transport Omra Pour Pèlerins Français — Al Kiswah",
    description: "Prix fixes. Chauffeurs vérifiés. Djeddah → Mecque → Médine. Réservez votre transfert privé.",
    url: "https://kiswahumrahcab.com/umrah-taxi-france",
    locale: "fr_FR",
    alternateLocale: ["ar_SA", "en_GB"],
    images: [{ url: "https://kiswahumrahcab.com/images/og-image.jpg", width: 1200, height: 630 }],
  },
};

const features = [
  "Prix fixes — sans frais cachés",
  "Chauffeurs bilingues (Arabe/Français)",
  "Support WhatsApp 24h/24 et 7j/7",
  "Véhicules modernes et désinfectés",
  "Autorisé par le Ministère des Transports",
  "Plus de 10 ans d'expérience",
];

export default function FrancePilgrimsPage() {
  return (
    <main className="min-h-screen bg-primary-black text-white pt-24 pb-16">
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none fixed" />
      <div className="container relative z-10 mx-auto px-4 max-w-5xl">

        <div className="text-center mb-16">
          <span className="text-gold-primary font-bold uppercase tracking-widest text-sm">🇫🇷 Pour les Pèlerins Français</span>
          <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6 leading-tight">
            Transport Omra<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-primary to-amber-400">Pour Pèlerins Français</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            De l&apos;aéroport de Djeddah jusqu&apos;au Haram — transfert privé, confortable et à prix fixe.
            Au service des pèlerins de Paris, Lyon, Marseille et toute la France.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link href="/booking" className="bg-gold-primary text-black font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(212,175,55,0.4)] uppercase tracking-wider">
              Réserver Maintenant
            </Link>
            <a href="https://wa.me/966548707332" className="border border-gold-primary/50 text-gold-primary font-bold px-8 py-4 rounded-full hover:bg-gold-primary/10 transition-colors uppercase tracking-wider">
              WhatsApp
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
          <h2 className="text-2xl font-bold mb-6 text-white">Trajets Populaires</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { from: "Aéroport Djeddah (KAIA)", to: "Hôtels Mecque", price: "Dès 45€" },
              { from: "Mecque", to: "Médine", price: "Dès 75€" },
              { from: "Aéroport Médine", to: "Hôtels Médine", price: "Dès 25€" },
              { from: "Djeddah", to: "Médine (direct)", price: "Dès 95€" },
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

        <div className="text-center bg-gradient-to-r from-gold-primary/10 to-amber-500/10 rounded-2xl border border-gold-primary/30 p-10">
          <h2 className="text-2xl font-bold mb-3">Prêt à réserver votre transfert ?</h2>
          <p className="text-gray-400 mb-6">Contactez-nous par WhatsApp — réponse en quelques minutes.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking" className="bg-gold-primary text-black font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform">
              Réserver en Ligne
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
