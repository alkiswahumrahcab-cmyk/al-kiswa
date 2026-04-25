import { generateMetadataAlternates } from "@/lib/hreflang";
import Link from "next/link";
import { CheckCircle, Phone, MapPin, Star, ArrowRight } from "lucide-react";
import { JsonLdScript } from "@/components/seo/JsonLd";

export const metadata = {
  title: "Umrah Transport Deutschland | Taxi Dschidda Mekka — Festpreise | Al Kiswah",
  description: "Privater Umrah-Transfer für deutsche Pilger. Flughafen Dschidda (KAIA) → Mekka → Medina. Festpreise ab 45€, erfahrene Fahrer, 24/7 WhatsApp-Support. Jetzt buchen.",
  alternates: {
    canonical: "https://kiswahumrahcab.com/umrah-transport-germany",
    languages: {
      ...generateMetadataAlternates("/umrah-transport-germany").languages,
      "de": "https://kiswahumrahcab.com/umrah-transport-germany",
      "de-DE": "https://kiswahumrahcab.com/umrah-transport-germany",
    },
  },
  keywords: [
    "Umrah Transport Deutschland", "Taxi Dschidda Mekka deutsche Pilger",
    "Umra Transfer Flughafen Dschidda", "Umrah 2025 2026 Deutschland",
    "privater Transfer Mekka Medina", "Umrah Taxi buchen Deutschland",
    "Flughafen KAIA Dschidda Taxi", "islamische Reise Arabien Transport",
  ],
  openGraph: {
    title: "Umrah Transport für Deutsche Pilger — Al Kiswah | Dschidda → Mekka",
    description: "Festpreise ab 45€. Geprüfte Fahrer. Dschidda → Mekka → Medina. Privaten Transfer jetzt buchen.",
    url: "https://kiswahumrahcab.com/umrah-transport-germany",
    locale: "de_DE",
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
      name: "Was kostet ein Taxi vom Flughafen Dschidda nach Mekka für deutsche Pilger?",
      acceptedAnswer: { "@type": "Answer", text: "Unser Festpreistransfer vom Flughafen Dschidda (KAIA) zu Mekka Hotels beginnt ab 45€ pro Fahrzeug. Kein Preisaufschlag, keine versteckten Gebühren — Preis wird bei Buchung festgelegt." }
    },
    {
      "@type": "Question",
      name: "Kann ich meinen Umrah-Transport von Deutschland aus buchen?",
      acceptedAnswer: { "@type": "Answer", text: "Ja — buchen Sie online über unser Formular oder per WhatsApp noch vor Ihrem Abflug aus Deutschland. Wir bestätigen innerhalb weniger Minuten. Ihr Fahrer erwartet Sie mit Namensschild am Ausgang." }
    },
    {
      "@type": "Question",
      name: "Sprechen die Fahrer Deutsch oder Englisch?",
      acceptedAnswer: { "@type": "Answer", text: "Unsere Fahrer für deutsche Pilger sprechen Arabisch und Englisch. Alle sind mit den Hotelvierteln rund um die Haram-Zone und den Moscheetoren bestens vertraut." }
    },
    {
      "@type": "Question",
      name: "Wie lange dauert die Fahrt vom Flughafen Dschidda nach Mekka?",
      acceptedAnswer: { "@type": "Answer", text: "Die Fahrt dauert je nach Verkehr etwa 60 bis 90 Minuten. Besonders während des Ramadans und der Schulferien kann die Strecke voller sein. Ihr Fahrer verfolgt Ihren Flug in Echtzeit." }
    },
    {
      "@type": "Question",
      name: "Welche Fahrzeuge stehen für Pilgergruppen aus Deutschland zur Verfügung?",
      acceptedAnswer: { "@type": "Answer", text: "Toyota Hiace (10 Personen), Hyundai Staria (11 Personen), GMC Yukon AT4 (7 Personen, Luxus) und Toyota Camry für Einzelreisende oder Paare. Alle Fahrzeuge sind klimatisiert, desinfiziert und vom Verkehrsministerium zugelassen." }
    }
  ]
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Umrah Transport für Deutsche Pilger",
  description: "Privater Flughafentransfer und Intercity-Transport für deutsche Pilger, die Umrah in Saudi-Arabien durchführen.",
  provider: { "@type": "LocalBusiness", name: "Al Kiswah Umrah Transport", url: "https://kiswahumrahcab.com", telephone: "+966548707332" },
  areaServed: [{ "@type": "Country", name: "Germany" }, { "@type": "City", name: "Mekka" }, { "@type": "City", name: "Dschidda" }],
  offers: { "@type": "Offer", priceCurrency: "EUR", price: "45", description: "Flughafen Dschidda nach Mekka ab 45€" }
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Startseite", item: "https://kiswahumrahcab.com/" },
    { "@type": "ListItem", position: 2, name: "Umrah Transport Deutschland", item: "https://kiswahumrahcab.com/umrah-transport-germany" }
  ]
};

const features = [
  "Festpreise — keine versteckten Gebühren",
  "Englischsprachige, geprüfte Fahrer",
  "24/7 WhatsApp-Support",
  "Moderne, desinfizierte Fahrzeuge",
  "Lizenziert vom Transportministerium",
  "Über 10 Jahre Erfahrung mit Pilgern",
];

const pricingRows = [
  { from: "Flughafen Dschidda (KAIA)", to: "Hotels Mekka", price: "Ab 45€", note: "~60–90 Min." },
  { from: "Mekka", to: "Medina", price: "Ab 75€", note: "~4,5 Std." },
  { from: "Flughafen Medina (OEMA)", to: "Hotels Medina", price: "Ab 25€", note: "~30 Min." },
  { from: "Dschidda", to: "Medina (direkt)", price: "Ab 95€", note: "~5,5 Std." },
];

const testimonials = [
  { name: "Ibrahim S.", city: "Berlin", text: "Problemlos gebucht, Fahrer stand mit Schild bereit. Sauberes Fahrzeug, pünktlich. Für Pilger aus Deutschland sehr zu empfehlen.", stars: 5 },
  { name: "Mariam K.", city: "Hamburg", text: "Wir waren 8 Personen — der Hiace war ideal. Fahrer kannte alle Haram-Eingänge. Insha'Allah nächstes Jahr wieder.", stars: 5 },
  { name: "Ali R.", city: "München", text: "Festpreis bedeutet keine Überraschungen nach einem langen Flug. Genau das braucht man. Sehr professioneller Service.", stars: 5 },
];

const faqs = [
  { q: "Was kostet ein Taxi vom Flughafen Dschidda nach Mekka?", a: "Ab 45€ pro Fahrzeug — Festpreis bei Buchung garantiert. Keine Aufschläge, keine versteckten Gebühren." },
  { q: "Kann ich von Deutschland aus buchen?", a: "Ja — online oder per WhatsApp vor Ihrem Abflug. Bestätigung in Minuten. Ihr Fahrer wartet mit Namensschild." },
  { q: "Sprechen die Fahrer Deutsch oder Englisch?", a: "Alle Fahrer sprechen Englisch und Arabisch. Bestens vertraut mit den Haram-Hotelvierteln." },
  { q: "Wie lange dauert die Fahrt Dschidda–Mekka?", a: "60–90 Minuten je nach Verkehr. Ihr Fahrer verfolgt Ihren Flug in Echtzeit — kein Aufpreis bei Verspätung." },
  { q: "Welche Fahrzeuge gibt es für Gruppen aus Deutschland?", a: "Toyota Hiace (10 Pax), Hyundai Staria (11 Pax), GMC Yukon AT4 (7 Pax Luxus), Toyota Camry für Paare." },
];

export default function GermanyPilgrimsPage() {
  return (
    <main className="min-h-screen bg-primary-black text-white pt-24 pb-16">
      <JsonLdScript schema={faqSchema} />
      <JsonLdScript schema={serviceSchema} />
      <JsonLdScript schema={breadcrumbSchema} />
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none fixed" />
      <div className="container relative z-10 mx-auto px-4 max-w-5xl">

        <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-10 flex items-center gap-2">
          <Link href="/" className="hover:text-gold-primary transition-colors">Startseite</Link>
          <span>/</span>
          <span className="text-gray-300">Umrah Transport Deutschland</span>
        </nav>

        {/* Hero */}
        <div className="text-center mb-14">
          <span className="text-gold-primary font-bold uppercase tracking-widest text-sm">🇩🇪 Für Deutsche Pilger</span>
          <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6 leading-tight">
            Umrah Transport<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-primary to-amber-400">Für Deutsche Pilger</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Vom Flughafen Dschidda bis zum Haram — privat, komfortabel und zum Festpreis.
            Im Dienst von Pilgern aus Berlin, Hamburg, München, Frankfurt und ganz Deutschland seit 2014.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link href="/booking" className="bg-gold-primary text-black font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(212,175,55,0.4)] uppercase tracking-wider">
              Jetzt Buchen
            </Link>
            <a href="https://wa.me/966548707332" className="border border-gold-primary/50 text-gold-primary font-bold px-8 py-4 rounded-full hover:bg-gold-primary/10 transition-colors uppercase tracking-wider">
              WhatsApp
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-6 text-center mb-16">
          {[{ stat: "3.000+", label: "Europäische Pilger Befördert" }, { stat: "5★", label: "Durchschnittliche Bewertung" }, { stat: "10+", label: "Jahre Erfahrung" }].map((s, i) => (
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
          <h2 className="text-2xl font-bold mb-2 text-white">Preisübersicht — Umrah-Transfer für Deutsche Pilger</h2>
          <p className="text-gray-400 text-sm mb-6">Alle Preise pro Fahrzeug, Festpreis bei Buchung. Keine Flughafenzuschläge, keine Nachtzuschläge.</p>
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
            <strong className="text-gold-primary">Preistipp:</strong> Preis pro Fahrzeug — ein Familiengroup im Staria (11 Sitze) zahlt nur ca. 4–5€ pro Person auf der Strecke Dschidda → Mekka.
          </div>
          <div className="mt-4 text-center">
            <Link href="/pricing" className="text-gold-primary hover:underline font-semibold text-sm inline-flex items-center gap-1">
              Vollständige Preisliste ansehen <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-4">Wie Sie Ihren Umrah-Transfer Buchen</h2>
          <p className="text-center text-gray-400 text-sm mb-8 max-w-xl mx-auto">Die meisten Pilger aus Deutschland bestätigen ihren Transfer in unter 5 Minuten.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: 1, title: "Online oder WhatsApp Buchen", desc: "Flugnummer, Ankunftsdatum und Hotel in Mekka angeben. 2 Minuten über Formular oder WhatsApp." },
              { step: 2, title: "Sofortige Bestätigung", desc: "Buchungsbestätigung per E-Mail und WhatsApp. Fahrerdaten 24 Std. vor Ankunft." },
              { step: 3, title: "Fahrer am Flughafen Treffen", desc: "Ihr englischsprachiger Fahrer erwartet Sie an den Ankunftshallen mit Namensschild." },
            ].map((s) => (
              <div key={s.step} className="text-center bg-white/5 rounded-2xl border border-white/10 p-6">
                <div className="w-12 h-12 rounded-full bg-gold-primary/10 border border-gold-primary/30 flex items-center justify-center text-gold-primary mx-auto mb-4 font-bold text-lg">{s.step}</div>
                <h3 className="font-bold text-white mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SEO Guide */}
        <div className="bg-white/5 rounded-2xl border border-white/10 p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4 text-white">Reiseführer: Umrah-Transport für Pilger aus Deutschland</h2>
          <div className="text-gray-300 text-sm space-y-4 leading-relaxed">
            <p>Jedes Jahr reisen tausende Muslime aus Deutschland zur Umrah nach Mekka und Medina. Die Organisation eines zuverlässigen Transfers vom Flughafen Dschidda ist eine der wichtigsten logistischen Entscheidungen Ihrer Pilgerreise.</p>
            <h3 className="text-white font-semibold mt-5">Flughafen Dschidda (KAIA) nach Mekka — Was Sie wissen müssen</h3>
            <p>Der King Abdulaziz International Airport liegt etwa 80 km vom Masjid al-Haram in Mekka entfernt. Die Fahrt dauert <strong>60–90 Minuten</strong> je nach Verkehr, der besonders während des Ramadans und der deutschen Schulferien hoch sein kann. Ihr Al Kiswah-Fahrer verfolgt Ihren Flug in Echtzeit — bei Verspätung Ihres Fluges aus Frankfurt, München oder Berlin passen wir uns ohne Aufpreis an.</p>
            <h3 className="text-white font-semibold mt-5">Warum nicht-lizenzierte Taxis in Dschidda vermeiden?</h3>
            <p>An KAIA sind unregistrierte Taxivermittler ein bekanntes Problem. Fahrpreise werden vor Ort zu überhöhten Tarifen ausgehandelt, Fahrzeuge oft nicht geprüft. Mit einer Vorab-Buchung bei Al Kiswah — einem vom Verkehrsministerium lizenzierten Anbieter — erhalten Sie einen Festpreis, ein geprüftes Fahrzeug und einen professionellen Fahrer.</p>
            <h3 className="text-white font-semibold mt-5">Bestes Fahrzeug für deutsche Pilgerfamilien</h3>
            <p>Für Familien mit 4–8 Personen empfehlen wir den <Link href="/fleet/hyundai-staria" className="text-gold-primary hover:underline">Hyundai Staria</Link> (11 Sitze) — geräumig, klimatisiert, viel Gepäckraum. Paare wählen oft den <Link href="/fleet/toyota-camry" className="text-gold-primary hover:underline">Toyota Camry</Link>. Für Gruppen ab 10 Personen bietet der <Link href="/fleet/toyota-hiace" className="text-gold-primary hover:underline">Toyota Hiace</Link> das beste Preis-Leistungs-Verhältnis.</p>
            <h3 className="text-white font-semibold mt-5">Strecke Mekka–Medina: Praktische Tipps</h3>
            <p>Die Strecke Mekka–Medina beträgt ca. 430 km (~4,5–5 Std. Fahrt) — ein Klassiker für deutsche Pilger auf dem vollständigen Umrah-Rundkurs. Besonders im Ramadan unbedingt frühzeitig buchen. Details unter <Link href="/services/makkah-madinah-taxi" className="text-gold-primary hover:underline">Mekka–Medina Taxi</Link>.</p>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Was Deutsche Pilger Sagen</h2>
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
          <h2 className="text-2xl font-bold text-center mb-8">Häufig Gestellte Fragen</h2>
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
          <h2 className="text-xl font-bold mb-6 text-white">Unsere Fahrzeuge & Services</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { href: "/fleet/gmc-yukon-at4", label: "GMC Yukon AT4", desc: "Luxus SUV, 7 Sitze" },
              { href: "/fleet/hyundai-staria", label: "Hyundai Staria", desc: "11 Sitze — beliebteste Wahl" },
              { href: "/fleet/toyota-hiace", label: "Toyota Hiace", desc: "Minibus 10 Sitze für Gruppen" },
              { href: "/services/jeddah-airport-transfer", label: "Flughafentransfer Dschidda", desc: "Ankunft & Abflug KAIA" },
              { href: "/services/makkah-madinah-taxi", label: "Taxi Mekka–Medina", desc: "Interstädtischer Pilgertransport" },
              { href: "/pricing", label: "Vollständige Preisliste", desc: "Alle Strecken und Fahrzeuge" },
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
          <h2 className="text-2xl font-bold mb-3">Bereit zur Buchung Ihres Umrah-Transfers?</h2>
          <p className="text-gray-400 mb-6">Kontaktieren Sie uns per WhatsApp oder buchen Sie online — Antwort in Minuten.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking" className="bg-gold-primary text-black font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform">Online Buchen</Link>
            <a href="tel:+966548707332" className="flex items-center justify-center gap-2 border border-white/20 text-white font-bold px-8 py-4 rounded-full hover:bg-white/5 transition-colors">
              <Phone size={18} /> +966 54 870 7332
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
