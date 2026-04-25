import { generateMetadataAlternates } from "@/lib/hreflang";
import Link from "next/link";
import { CheckCircle, Phone, MapPin, Star, ArrowRight } from "lucide-react";
import { JsonLdScript } from "@/components/seo/JsonLd";

export const metadata = {
  title: "Umrah Vervoer Nederland | Taxi Jeddah Mekka — Vaste Prijzen | Al Kiswah",
  description: "Privé Umrah-transfer voor Nederlandse pelgrims. Luchthaven Jeddah (KAIA) → Mekka → Medina. Vaste prijzen vanaf €45, professionele chauffeurs, 24/7 WhatsApp-support. Nu boeken.",
  alternates: {
    canonical: "https://kiswahumrahcab.com/umrah-taxi-nederland",
    languages: {
      ...generateMetadataAlternates("/umrah-taxi-nederland").languages,
      "nl": "https://kiswahumrahcab.com/umrah-taxi-nederland",
      "nl-NL": "https://kiswahumrahcab.com/umrah-taxi-nederland",
    },
  },
  keywords: [
    "Umrah vervoer Nederland", "taxi Jeddah Mekka Nederlandse pelgrims",
    "Umra transfer luchthaven Jeddah", "Umrah 2025 2026 Nederland boeken",
    "privé transfer Mekka Medina", "Umrah taxi Rotterdam Amsterdam",
    "luchthaven KAIA Jeddah taxi", "islamitische reis Saoedi-Arabië vervoer",
  ],
  openGraph: {
    title: "Umrah Vervoer voor Nederlandse Pelgrims — Al Kiswah | Jeddah → Mekka",
    description: "Vaste prijzen vanaf €45. Geverifieerde chauffeurs. Jeddah → Mekka → Medina. Boek uw privé transfer.",
    url: "https://kiswahumrahcab.com/umrah-taxi-nederland",
    locale: "nl_NL",
    alternateLocale: ["ar_SA", "en_GB"],
    images: [{ url: "https://kiswahumrahcab.com/images/og-image.jpg", width: 1200, height: 630 }],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wat kost een taxi van de luchthaven Jeddah naar Mekka voor Nederlandse pelgrims?",
      acceptedAnswer: { "@type": "Answer", text: "Onze vaste-prijstransfer van de luchthaven Jeddah (KAIA) naar Mekka-hotels begint vanaf €45 per voertuig. Geen verborgen kosten, geen toeslagen — de prijs wordt bij boeking vastgelegd." }
    },
    {
      "@type": "Question",
      name: "Kan ik mijn Umrah-transfer vanuit Nederland boeken?",
      acceptedAnswer: { "@type": "Answer", text: "Ja — boek online via ons formulier of via WhatsApp voor uw vertrek uit Nederland. We bevestigen binnen enkele minuten. Uw chauffeur wacht met een naambordje in de aankomsthal." }
    },
    {
      "@type": "Question",
      name: "Spreken de chauffeurs Nederlands of Engels?",
      acceptedAnswer: { "@type": "Answer", text: "Onze chauffeurs spreken Engels en Arabisch en zijn uitstekend bekend met de hotelwijken rondom de Haram-zone en de poorten van de Grote Moskee." }
    },
    {
      "@type": "Question",
      name: "Hoe lang duurt de rit van de luchthaven Jeddah naar Mekka?",
      acceptedAnswer: { "@type": "Answer", text: "De rit duurt ongeveer 60 tot 90 minuten afhankelijk van het verkeer, dat vooral tijdens de Ramadan en schoolvakanties drukker kan zijn. Uw chauffeur volgt uw vlucht in real-time." }
    },
    {
      "@type": "Question",
      name: "Welke voertuigen zijn er beschikbaar voor Nederlandse pelgrimsgroepen?",
      acceptedAnswer: { "@type": "Answer", text: "Toyota Hiace (10 personen), Hyundai Staria (11 personen), GMC Yukon AT4 (7 personen, luxe), Toyota Camry voor koppels of individuen. Alle voertuigen zijn geklimatiseerd, gedesinfecteerd en gelicentieerd door het Ministerie van Transport." }
    }
  ]
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Umrah Vervoer voor Nederlandse Pelgrims",
  description: "Privé luchthavenstransfers en intercity-vervoer voor Nederlandse pelgrims die Umrah verrichten in Saoedi-Arabië.",
  provider: { "@type": "LocalBusiness", name: "Al Kiswah Umrah Transport", url: "https://kiswahumrahcab.com", telephone: "+966548707332" },
  areaServed: [{ "@type": "Country", name: "Netherlands" }, { "@type": "City", name: "Mekka" }, { "@type": "City", name: "Jeddah" }],
  offers: { "@type": "Offer", priceCurrency: "EUR", price: "45", description: "Luchthaven Jeddah naar Mekka vanaf €45" }
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Startpagina", item: "https://kiswahumrahcab.com/" },
    { "@type": "ListItem", position: 2, name: "Umrah Vervoer Nederland", item: "https://kiswahumrahcab.com/umrah-taxi-nederland" }
  ]
};

const features = [
  "Vaste prijzen — geen verborgen kosten",
  "Engelstalige, geverifieerde chauffeurs",
  "24/7 WhatsApp-support",
  "Moderne, gedesinfecteerde voertuigen",
  "Gelicentieerd door het Ministerie van Transport",
  "Meer dan 10 jaar ervaring met pelgrims",
];

const pricingRows = [
  { from: "Luchthaven Jeddah (KAIA)", to: "Hotels Mekka", price: "Vanaf €45", note: "~60–90 min." },
  { from: "Mekka", to: "Medina", price: "Vanaf €75", note: "~4,5 uur" },
  { from: "Luchthaven Medina (OEMA)", to: "Hotels Medina", price: "Vanaf €25", note: "~30 min." },
  { from: "Jeddah", to: "Medina (direct)", price: "Vanaf €95", note: "~5,5 uur" },
];

const testimonials = [
  { name: "Yusuf D.", city: "Amsterdam", text: "Geboekt vanuit Nederland, chauffeur stond klaar met bordje. Comfortabele rit, geen gedoe. Zeker voor de volgende keer aanbevolen.", stars: 5 },
  { name: "Fatima E.", city: "Rotterdam", text: "Met het hele gezin (7 personen) in de Staria — perfect. Chauffeur kende alle hotelgebieden rond de Haram. Barakallahu feek.", stars: 5 },
  { name: "Hassan B.", city: "Den Haag", text: "Vaste prijs, geen onderhandeling op de luchthaven. Precies wat je nodig hebt na een lange vlucht. Professioneel en stipt.", stars: 5 },
];

const faqs = [
  { q: "Wat kost een taxi van Jeddah Airport naar Mekka?", a: "Vanaf €45 per voertuig — vaste prijs bij boeking. Geen toeslagen, geen verborgen kosten." },
  { q: "Kan ik vanuit Nederland boeken?", a: "Ja — online of via WhatsApp voor vertrek. Bevestiging in minuten. Chauffeur wacht met naambordje." },
  { q: "Spreken de chauffeurs Nederlands of Engels?", a: "Alle chauffeurs spreken Engels en Arabisch. Uitstekend bekend met de Haram-hotelwijken." },
  { q: "Hoe lang duurt de rit Jeddah–Mekka?", a: "60–90 minuten afhankelijk van verkeer. Uw chauffeur volgt uw vlucht in real-time — geen meerkosten bij vertraging." },
  { q: "Welke voertuigen voor Nederlandse groepen?", a: "Toyota Hiace (10 pax), Hyundai Staria (11 pax), GMC Yukon AT4 (7 pax luxe), Toyota Camry voor koppels." },
];

export default function NederlandPilgrimsPage() {
  return (
    <main className="min-h-screen bg-primary-black text-white pt-24 pb-16">
      <JsonLdScript schema={faqSchema} />
      <JsonLdScript schema={serviceSchema} />
      <JsonLdScript schema={breadcrumbSchema} />
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none fixed" />
      <div className="container relative z-10 mx-auto px-4 max-w-5xl">

        <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-10 flex items-center gap-2">
          <Link href="/" className="hover:text-gold-primary transition-colors">Startpagina</Link>
          <span>/</span>
          <span className="text-gray-300">Umrah Vervoer Nederland</span>
        </nav>

        {/* Hero */}
        <div className="text-center mb-14">
          <span className="text-gold-primary font-bold uppercase tracking-widest text-sm">🇳🇱 Voor Nederlandse Pelgrims</span>
          <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6 leading-tight">
            Umrah Vervoer<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-primary to-amber-400">Voor Nederlandse Pelgrims</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Van de luchthaven van Jeddah tot de Haram — privé, comfortabel en tegen vaste prijzen.
            In dienst van pelgrims uit Amsterdam, Rotterdam, Den Haag, Utrecht en heel Nederland sinds 2014.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link href="/booking" className="bg-gold-primary text-black font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(212,175,55,0.4)] uppercase tracking-wider">
              Nu Boeken
            </Link>
            <a href="https://wa.me/966548707332" className="border border-gold-primary/50 text-gold-primary font-bold px-8 py-4 rounded-full hover:bg-gold-primary/10 transition-colors uppercase tracking-wider">
              WhatsApp
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-6 text-center mb-16">
          {[{ stat: "3.000+", label: "Europese Pelgrims Vervoerd" }, { stat: "5★", label: "Gemiddelde Beoordeling" }, { stat: "10+", label: "Jaar Ervaring" }].map((s, i) => (
            <div key={i} className="bg-white/5 rounded-xl p-6 border border-white/10">
              <div className="text-4xl font-bold text-gold-primary">{s.stat}</div>
              <div className="text-gray-400 mt-2 text-sm">{s.label}</div>
            </div>
          ))}
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

        {/* Pricing Guide */}
        <div className="bg-white/5 rounded-2xl border border-gold-primary/20 p-8 mb-12">
          <h2 className="text-2xl font-bold mb-2 text-white">Prijsoverzicht — Umrah-Transfer voor Nederlandse Pelgrims</h2>
          <p className="text-gray-400 text-sm mb-6">Alle prijzen per voertuig, vast bij boeking. Geen luchthaventoeslagen, geen nachttoeslagen.</p>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {pricingRows.map((route, i) => (
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
            <strong className="text-gold-primary">Prijstip:</strong> Prijs per voertuig — een gezin in een Staria (11 plaatsen) betaalt slechts ca. €4–5 per persoon op de route Jeddah → Mekka.
          </div>
          <div className="mt-4 text-center">
            <Link href="/pricing" className="text-gold-primary hover:underline font-semibold text-sm inline-flex items-center gap-1">
              Bekijk volledige prijslijst <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-4">Hoe Boekt U Uw Umrah-Transfer</h2>
          <p className="text-center text-gray-400 text-sm mb-8 max-w-xl mx-auto">De meeste pelgrims uit Nederland bevestigen hun transfer in minder dan 5 minuten.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: 1, title: "Boek Online of WhatsApp", desc: "Vlucht­nummer, aankomst­datum en hotel in Mekka invullen. 2 minuten via formulier of WhatsApp." },
              { step: 2, title: "Directe Bevestiging", desc: "Boekingsbevestiging per e-mail en WhatsApp. Chauffeurgegevens 24u voor aankomst." },
              { step: 3, title: "Ontmoet Uw Chauffeur", desc: "Uw Engelstalige chauffeur wacht in de aankomsthal met een naambordje. Direct naar uw hotel." },
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
          <h2 className="text-2xl font-bold mb-4 text-white">Reisgids: Umrah-Vervoer voor Pelgrims uit Nederland</h2>
          <div className="text-gray-300 text-sm space-y-4 leading-relaxed">
            <p>Elk jaar reizen duizenden Nederlandse moslims naar Mekka en Medina voor de Umrah. Het regelen van betrouwbaar vervoer vanaf de luchthaven van Jeddah is een van de belangrijkste logistieke beslissingen van uw pelgrimsreis.</p>
            <h3 className="text-white font-semibold mt-5">Luchthaven Jeddah (KAIA) naar Mekka — Wat u moet weten</h3>
            <p>De King Abdulaziz International Airport ligt ongeveer 80 km van het Masjid al-Haram in Mekka. De rit duurt doorgaans <strong>60–90 minuten</strong> afhankelijk van het verkeer, dat met name tijdens de Ramadan en Nederlandse schoolvakanties drukker kan zijn. Uw Al Kiswah-chauffeur volgt uw vlucht in real-time — bij vertraging van uw vlucht uit Amsterdam of Rotterdam passen we ons zonder meerkosten aan.</p>
            <h3 className="text-white font-semibold mt-5">Waarom geen ongeregistreerde taxi's op Jeddah Airport?</h3>
            <p>Ongeregistreerde taxichauffeurs bij KAIA zijn een bekend probleem voor pelgrims. Tarieven worden ter plekke tegen hoge prijzen onderhandeld en voertuigen zijn vaak niet geïnspecteerd. Door vooraf te boeken bij Al Kiswah — een door het Ministerie van Transport erkende aanbieder — geniet u van een vaste prijs, een goedgekeurd voertuig en een professionele chauffeur.</p>
            <h3 className="text-white font-semibold mt-5">Beste voertuig voor Nederlandse pelgrimsfamilies</h3>
            <p>Voor gezinnen van 4–8 personen is de <Link href="/fleet/hyundai-staria" className="text-gold-primary hover:underline">Hyundai Staria</Link> (11 zitplaatsen) onze populairste keuze. Koppels kiezen vaak voor de <Link href="/fleet/toyota-camry" className="text-gold-primary hover:underline">Toyota Camry</Link>. Grotere groepen kiezen de <Link href="/fleet/toyota-hiace" className="text-gold-primary hover:underline">Toyota Hiace</Link> minibus.</p>
            <h3 className="text-white font-semibold mt-5">Route Mekka–Medina: Praktische tips</h3>
            <p>De route Mekka–Medina is ca. 430 km (~4,5–5 uur rijden). Boek deze rit ruim van tevoren, zeker tijdens de Ramadan. Zie onze pagina <Link href="/services/makkah-madinah-taxi" className="text-gold-primary hover:underline">Taxi Mekka–Medina</Link> voor alle details.</p>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Wat Nederlandse Pelgrims Zeggen</h2>
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
          <h2 className="text-2xl font-bold text-center mb-8">Veelgestelde Vragen</h2>
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
          <h2 className="text-xl font-bold mb-6 text-white">Onze Voertuigen &amp; Services</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { href: "/fleet/gmc-yukon-at4", label: "GMC Yukon AT4", desc: "Luxe SUV, 7 zitplaatsen" },
              { href: "/fleet/hyundai-staria", label: "Hyundai Staria", desc: "11 zitplaatsen — meest populair" },
              { href: "/fleet/toyota-hiace", label: "Toyota Hiace", desc: "Minibus 10 zitplaatsen" },
              { href: "/services/jeddah-airport-transfer", label: "Luchthaventransfer Jeddah", desc: "Aankomst & vertrek KAIA" },
              { href: "/services/makkah-madinah-taxi", label: "Taxi Mekka–Medina", desc: "Intercity pelgrimsvervoer" },
              { href: "/pricing", label: "Volledige Prijslijst", desc: "Alle routes en voertuigen" },
            ].map((link, i) => (
              <Link key={i} href={link.href} className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold-primary/30 rounded-xl p-4 transition-all group">
                <div className="font-semibold text-white group-hover:text-gold-primary transition-colors text-sm">{link.label}</div>
                <div className="text-gray-500 text-xs mt-1">{link.desc}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-gold-primary/10 to-amber-500/10 rounded-2xl border border-gold-primary/30 p-10">
          <h2 className="text-2xl font-bold mb-3">Klaar om te boeken?</h2>
          <p className="text-gray-400 mb-6">Neem contact op via WhatsApp of boek online — antwoord binnen enkele minuten.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking" className="bg-gold-primary text-black font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform">Online Boeken</Link>
            <a href="tel:+966548707332" className="flex items-center justify-center gap-2 border border-white/20 text-white font-bold px-8 py-4 rounded-full hover:bg-white/5 transition-colors">
              <Phone size={18} /> +966 54 870 7332
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
