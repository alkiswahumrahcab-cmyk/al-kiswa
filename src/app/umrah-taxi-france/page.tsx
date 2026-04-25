import { generateMetadataAlternates } from "@/lib/hreflang";
import Link from "next/link";
import { CheckCircle, Phone, MapPin, Star, ArrowRight } from "lucide-react";
import { JsonLdScript } from "@/components/seo/JsonLd";

export const metadata = {
  title: "Transport Omra France | Taxi Djeddah Mecque — Prix Fixes | Al Kiswah",
  description: "Transfert privé pour pèlerins français effectuant la Omra. Djeddah → Mecque → Médine. Prix fixes dès 45€, chauffeurs bilingues, support WhatsApp 24h/24. Réservez en ligne.",
  alternates: {
    canonical: "https://kiswahumrahcab.com/umrah-taxi-france",
    languages: {
      ...generateMetadataAlternates("/umrah-taxi-france").languages,
      "fr": "https://kiswahumrahcab.com/umrah-taxi-france",
      "fr-FR": "https://kiswahumrahcab.com/umrah-taxi-france",
    },
  },
  keywords: [
    "transport Omra France", "taxi Djeddah Mecque pèlerins français",
    "transfert aéroport Djeddah", "Omra 2025 2026 France transport",
    "navette Mecque Médine", "chauffeur privé Arabie Saoudite Omra",
  ],
  openGraph: {
    title: "Transport Omra Pour Pèlerins Français — Al Kiswah",
    description: "Prix fixes dès 45€. Chauffeurs vérifiés. Djeddah → Mecque → Médine.",
    url: "https://kiswahumrahcab.com/umrah-taxi-france",
    locale: "fr_FR",
    alternateLocale: ["ar_SA", "en_GB"],
    images: [{ url: "https://kiswahumrahcab.com/images/og-image.jpg", width: 1200, height: 630 }],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quel est le prix d'un taxi de l'aéroport de Djeddah à la Mecque ?",
      "acceptedAnswer": { "@type": "Answer", "text": "Notre transfert à prix fixe de l'aéroport de Djeddah (KAIA) vers les hôtels de la Mecque commence à partir de 45€ par véhicule. Prix garantis — sans frais cachés." }
    },
    {
      "@type": "Question",
      "name": "Puis-je réserver mon transport Omra depuis la France ?",
      "acceptedAnswer": { "@type": "Answer", "text": "Oui — réservez en ligne ou via WhatsApp avant de quitter la France. Confirmation en quelques minutes. Votre chauffeur vous attendra aux arrivées." }
    },
    {
      "@type": "Question",
      "name": "Les chauffeurs parlent-ils français ?",
      "acceptedAnswer": { "@type": "Answer", "text": "Nos chauffeurs desservant les pèlerins français sont bilingues arabe/français et connaissent parfaitement les itinéraires vers les hôtels du Haram." }
    },
    {
      "@type": "Question",
      "name": "Combien de temps dure le trajet de Djeddah à la Mecque ?",
      "acceptedAnswer": { "@type": "Answer", "text": "Le trajet dure environ 60 à 90 minutes selon la circulation. Notre chauffeur suit votre vol en temps réel en cas de retard." }
    },
    {
      "@type": "Question",
      "name": "Quels véhicules sont disponibles pour les groupes français ?",
      "acceptedAnswer": { "@type": "Answer", "text": "Toyota Hiace (10 pax), Hyundai Staria (11 pax), GMC Yukon AT4 (7 pax luxe), Toyota Camry pour couples. Tous climatisés et agréés Ministère des Transports." }
    }
  ]
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Transport Omra pour Pèlerins Français",
  "provider": { "@type": "LocalBusiness", "name": "Al Kiswah Umrah Transport", "url": "https://kiswahumrahcab.com", "telephone": "+966548707332" },
  "areaServed": [{ "@type": "Country", "name": "France" }, { "@type": "City", "name": "La Mecque" }, { "@type": "City", "name": "Djeddah" }],
  "offers": { "@type": "Offer", "priceCurrency": "EUR", "price": "45", "description": "Transfert aéroport Djeddah vers la Mecque dès 45€" }
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://kiswahumrahcab.com/" },
    { "@type": "ListItem", "position": 2, "name": "Transport Omra France", "item": "https://kiswahumrahcab.com/umrah-taxi-france" }
  ]
};

const features = [
  "Prix fixes — sans frais cachés",
  "Chauffeurs bilingues (Arabe/Français)",
  "Support WhatsApp 24h/24 et 7j/7",
  "Véhicules modernes et désinfectés",
  "Autorisé par le Ministère des Transports",
  "Plus de 10 ans d'expérience",
];

const testimonials = [
  { name: "Karim B.", city: "Paris", text: "Réservé depuis la France, le chauffeur nous attendait avec notre nom. Trajet confortable. Je recommande vivement.", stars: 5 },
  { name: "Nadia M.", city: "Lyon", text: "Voyage en famille avec 5 personnes. Le Staria était parfait, chauffeur très professionnel. Baraka Allahou Fikoum.", stars: 5 },
  { name: "Youssef A.", city: "Marseille", text: "Prix fixe, pas de négociation à l'aéroport. Exactement ce dont on a besoin après 6 heures de vol.", stars: 5 },
];

const faqs = [
  { q: "Quel est le prix d'un taxi de l'aéroport de Djeddah à la Mecque ?", a: "Notre transfert à prix fixe commence à partir de 45€ par véhicule. Prix garantis dès la réservation — sans frais cachés." },
  { q: "Puis-je réserver depuis la France avant mon départ ?", a: "Oui — réservez en ligne ou via WhatsApp. Confirmation en quelques minutes. Votre chauffeur vous attendra aux arrivées." },
  { q: "Les chauffeurs parlent-ils français ?", a: "Nos chauffeurs desservant les pèlerins français sont bilingues arabe/français et connaissent parfaitement les hôtels du Haram." },
  { q: "Quels véhicules pour les groupes français ?", a: "Toyota Hiace (10 pax), Hyundai Staria (11 pax), GMC Yukon AT4 (7 pax luxe) et Toyota Camry pour individuels ou couples." },
  { q: "Combien de temps dure le trajet Djeddah–Mecque ?", a: "Environ 60 à 90 minutes selon la circulation. Votre chauffeur suit votre vol en temps réel." },
];

export default function FrancePilgrimsPage() {
  return (
    <main className="min-h-screen bg-primary-black text-white pt-24 pb-16">
      <JsonLdScript schema={faqSchema} />
      <JsonLdScript schema={serviceSchema} />
      <JsonLdScript schema={breadcrumbSchema} />
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none fixed" />
      <div className="container relative z-10 mx-auto px-4 max-w-5xl">

        <nav aria-label="Fil d'Ariane" className="text-sm text-gray-500 mb-10 flex items-center gap-2">
          <Link href="/" className="hover:text-gold-primary transition-colors">Accueil</Link>
          <span>/</span>
          <span className="text-gray-300">Transport Omra France</span>
        </nav>

        <div className="text-center mb-14">
          <span className="text-gold-primary font-bold uppercase tracking-widest text-sm">🇫🇷 Pour les Pèlerins Français</span>
          <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6 leading-tight">
            Transport Omra<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-primary to-amber-400">Pour Pèlerins Français</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            De l&apos;aéroport de Djeddah jusqu&apos;au Haram — transfert privé, confortable et à prix fixe.
            Au service des pèlerins de Paris, Lyon, Marseille et toute la France depuis 2014.
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

        <div className="grid sm:grid-cols-3 gap-6 text-center mb-16">
          {[{ stat: "3 000+", label: "Pèlerins Européens Servis" }, { stat: "5★", label: "Note Moyenne" }, { stat: "10+", label: "Ans d'Expérience" }].map((s, i) => (
            <div key={i} className="bg-white/5 rounded-xl p-6 border border-white/10">
              <div className="text-4xl font-bold text-gold-primary">{s.stat}</div>
              <div className="text-gray-400 mt-2 text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-16">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-3 bg-white/5 rounded-xl p-4 border border-white/10">
              <CheckCircle className="text-gold-primary shrink-0" size={20} />
              <span className="text-gray-200">{f}</span>
            </div>
          ))}
        </div>

        {/* Pricing Guide */}
        <div className="bg-white/5 rounded-2xl border border-gold-primary/20 p-8 mb-12">
          <h2 className="text-2xl font-bold mb-2 text-white">Guide Tarifaire — Transport Omra pour Pèlerins Français</h2>
          <p className="text-gray-400 text-sm mb-6">Tous les prix sont par véhicule, fixes à la réservation. Pas de surprime, pas de suppléments nocturnes.</p>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {[
              { from: "Aéroport Djeddah (KAIA)", to: "Hôtels Mecque", price: "Dès 45€", note: "~1h de trajet" },
              { from: "Mecque", to: "Médine", price: "Dès 75€", note: "~5h de trajet" },
              { from: "Aéroport Médine (OEMA)", to: "Hôtels Médine", price: "Dès 25€", note: "~30 min" },
              { from: "Djeddah", to: "Médine (direct)", price: "Dès 95€", note: "~5h30" },
            ].map((route, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-black/30 rounded-xl border border-white/5">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin size={14} className="text-gold-primary shrink-0" />
                    <span className="text-gray-300">{route.from} → {route.to}</span>
                  </div>
                  <span className="text-gray-500 text-xs pl-5">{route.note}</span>
                </div>
                <span className="text-gold-primary font-bold text-sm shrink-0 ml-4">{route.price}</span>
              </div>
            ))}
          </div>
          <div className="bg-gold-primary/10 border border-gold-primary/20 rounded-xl p-4 text-sm text-gray-300">
            <strong className="text-gold-primary">Conseil :</strong> Prix par véhicule — un groupe dans un Staria (11 places) revient à environ 4–5€ par personne Djeddah→Mecque.
          </div>
          <div className="mt-4 text-center">
            <Link href="/pricing" className="text-gold-primary hover:underline font-semibold text-sm inline-flex items-center gap-1">
              Voir le tableau complet des tarifs <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-4">Comment Réserver Votre Transfert Omra</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {[
              { step: 1, title: "Réservez en Ligne ou WhatsApp", desc: "Indiquez votre numéro de vol, date d'arrivée et hôtel à la Mecque. 2 minutes via formulaire ou WhatsApp." },
              { step: 2, title: "Confirmation Immédiate", desc: "Confirmation par email et WhatsApp. Coordonnées du chauffeur 24h avant votre arrivée." },
              { step: 3, title: "Retrouvez Votre Chauffeur", desc: "Votre chauffeur bilingue vous accueille à KAIA avec votre nom. Direction votre hôtel, sans escale." },
            ].map((s) => (
              <div key={s.step} className="text-center bg-white/5 rounded-2xl border border-white/10 p-6">
                <div className="w-12 h-12 rounded-full bg-gold-primary/10 border border-gold-primary/30 flex items-center justify-center text-gold-primary mx-auto mb-4 font-bold text-lg">{s.step}</div>
                <h3 className="font-bold text-white mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SEO Travel Guide */}
        <div className="bg-white/5 rounded-2xl border border-white/10 p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4 text-white">Guide Pratique : Transport Omra pour les Pèlerins de France</h2>
          <div className="text-gray-300 text-sm space-y-4 leading-relaxed">
            <p>Chaque année, des milliers de musulmans français se rendent à la Mecque pour la Omra. Organiser un transport fiable depuis Djeddah est l&apos;une des décisions logistiques les plus importantes de votre pèlerinage.</p>
            <h3 className="text-white font-semibold mt-4">Pourquoi éviter les taxis non réservés à Djeddah ?</h3>
            <p>Les rabatteurs à KAIA pratiquent des tarifs gonflés avec des véhicules non agréés. En réservant avec Al Kiswah, vous bénéficiez d&apos;un prix fixe, d&apos;un véhicule agréé Ministère des Transports et d&apos;un chauffeur professionnel.</p>
            <h3 className="text-white font-semibold mt-4">Meilleur véhicule pour les familles françaises</h3>
            <p>Le <Link href="/fleet/hyundai-staria" className="text-gold-primary hover:underline">Hyundai Staria</Link> (11 places) est idéal pour les familles. Le <Link href="/fleet/toyota-camry" className="text-gold-primary hover:underline">Toyota Camry</Link> convient aux couples. Les grands groupes choisiront le <Link href="/fleet/toyota-hiace" className="text-gold-primary hover:underline">Toyota Hiace</Link>.</p>
            <h3 className="text-white font-semibold mt-4">Trajet Mecque–Médine : conseils pratiques</h3>
            <p>Le trajet Mecque–Médine fait ~430 km (4h30–5h). Réservez à l&apos;avance, surtout pendant le Ramadan. Voir notre page <Link href="/services/makkah-madinah-taxi" className="text-gold-primary hover:underline">Taxi Mecque–Médine</Link> pour plus de détails.</p>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Ce que disent les Pèlerins Français</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white/5 rounded-2xl border border-white/10 p-6">
                <div className="flex gap-1 mb-3">{Array.from({ length: t.stars }).map((_, j) => <Star key={j} size={14} className="fill-gold-primary text-gold-primary" />)}</div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                <div className="text-sm font-semibold text-gold-primary">{t.name} <span className="text-gray-500 font-normal">— {t.city}</span></div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Questions Fréquentes</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white/5 rounded-xl border border-white/10 p-6">
                <h3 className="font-bold text-white mb-2">{faq.q}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Internal Links */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6 text-white">Explorer Nos Services et Notre Flotte</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { href: "/fleet/gmc-yukon-at4", label: "GMC Yukon AT4", desc: "SUV luxe 7 places" },
              { href: "/fleet/hyundai-staria", label: "Hyundai Staria", desc: "Van 11 places — le plus populaire" },
              { href: "/fleet/toyota-hiace", label: "Toyota Hiace", desc: "Minivan 10 places" },
              { href: "/services/jeddah-airport-transfer", label: "Transfert Aéroport Djeddah", desc: "Arrivées & départs KAIA" },
              { href: "/services/makkah-madinah-taxi", label: "Taxi Mecque–Médine", desc: "Transport inter-cités" },
              { href: "/pricing", label: "Grille Tarifaire Complète", desc: "Tous véhicules et tarifs" },
            ].map((link, i) => (
              <Link key={i} href={link.href} className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold-primary/30 rounded-xl p-4 transition-all group">
                <div className="font-semibold text-white group-hover:text-gold-primary transition-colors text-sm">{link.label}</div>
                <div className="text-gray-500 text-xs mt-1">{link.desc}</div>
              </Link>
            ))}
          </div>
        </div>

        <div className="text-center bg-gradient-to-r from-gold-primary/10 to-amber-500/10 rounded-2xl border border-gold-primary/30 p-10">
          <h2 className="text-2xl font-bold mb-3">Prêt à réserver votre transfert Omra ?</h2>
          <p className="text-gray-400 mb-6">Contactez-nous par WhatsApp ou réservez en ligne — réponse en quelques minutes.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking" className="bg-gold-primary text-black font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform">Réserver en Ligne</Link>
            <a href="tel:+966548707332" className="flex items-center justify-center gap-2 border border-white/20 text-white font-bold px-8 py-4 rounded-full hover:bg-white/5 transition-colors">
              <Phone size={18} /> +966 54 870 7332
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
