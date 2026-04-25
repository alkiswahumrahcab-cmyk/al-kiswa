import { generateMetadataAlternates } from "@/lib/hreflang";
import Link from "next/link";
import { CheckCircle, Phone, MapPin, Star, ArrowRight, Clock, Shield } from "lucide-react";
import { JsonLdScript } from "@/components/seo/JsonLd";

export const metadata = {
  title: "Umrah Transport for UK Pilgrims | Jeddah · Makkah · Madinah | Al Kiswah",
  description: "Private Umrah taxi from Jeddah Airport to Makkah for UK pilgrims. Fixed prices from £35, English-speaking drivers, 24/7 support. Trusted by 5,000+ British pilgrims. Book online.",
  alternates: {
    canonical: "https://kiswahumrahcab.com/umrah-transport-uk-pilgrims",
    languages: {
      ...generateMetadataAlternates("/umrah-transport-uk-pilgrims").languages,
      "en-GB": "https://kiswahumrahcab.com/umrah-transport-uk-pilgrims",
    },
  },
  keywords: [
    "Umrah taxi for UK pilgrims", "Jeddah airport transfer British pilgrims",
    "Makkah taxi from UK pilgrim", "Umrah transport London pilgrims",
    "private transfer Jeddah Makkah UK", "Umrah 2025 taxi UK",
    "Al Kiswah UK pilgrims", "British Hajj transport Saudi Arabia",
    "Jeddah KAIA airport taxi English driver", "umrah package transport UK 2026"
  ],
  openGraph: {
    title: "Umrah Transport for UK Pilgrims — Al Kiswah | Jeddah → Makkah",
    description: "Fixed-price private transfers from £35. English-speaking drivers. Trusted by 5,000+ UK pilgrims.",
    url: "https://kiswahumrahcab.com/umrah-transport-uk-pilgrims",
    locale: "en_GB",
    alternateLocale: ["ar_SA"],
    images: [{ url: "https://kiswahumrahcab.com/images/og-image.jpg", width: 1200, height: 630 }],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does a taxi from Jeddah Airport to Makkah cost for UK pilgrims?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our fixed-price transfer from Jeddah King Abdulaziz International Airport (KAIA) to Makkah hotels starts from £35 per vehicle. Prices are fixed — no surge pricing, no hidden fees."
      }
    },
    {
      "@type": "Question",
      "name": "Can I book Umrah transport from the UK before I travel?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — you can book online via our website or WhatsApp before you fly from the UK. We confirm your booking within minutes. Your driver will be waiting at arrivals with your name."
      }
    },
    {
      "@type": "Question",
      "name": "Do your drivers speak English?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. All drivers serving UK pilgrims are English-speaking and experienced in assisting British pilgrims with Haram gate routes and hotel districts."
      }
    },
    {
      "@type": "Question",
      "name": "What vehicles are available for UK pilgrim groups?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Toyota Hiace (10 passengers), Hyundai Staria (11 passengers), GMC Yukon AT4 (7 passengers luxury), and Toyota Camry for individuals or couples. All vehicles are air-conditioned, sanitised, and Ministry-licensed."
      }
    },
    {
      "@type": "Question",
      "name": "What is the best way to get from Jeddah Airport to Makkah?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A private taxi or minivan is the safest and most comfortable option for pilgrims — especially for families or groups with luggage. The journey takes approximately 1 to 1.5 hours. Public transport is not available to pilgrims in the Haram zone."
      }
    }
  ]
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Umrah Transport for UK Pilgrims",
  "description": "Private airport transfers and intercity transport for British pilgrims performing Umrah in Saudi Arabia.",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Al Kiswah Umrah Transport",
    "url": "https://kiswahumrahcab.com",
    "telephone": "+966548707332"
  },
  "areaServed": [
    { "@type": "Country", "name": "United Kingdom" },
    { "@type": "City", "name": "Makkah" },
    { "@type": "City", "name": "Madinah" },
    { "@type": "City", "name": "Jeddah" }
  ],
  "serviceType": "Airport Transfer",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "GBP",
    "price": "35",
    "description": "Jeddah Airport to Makkah private transfer from £35"
  }
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://kiswahumrahcab.com/" },
    { "@type": "ListItem", "position": 2, "name": "UK Pilgrims Umrah Transport", "item": "https://kiswahumrahcab.com/umrah-transport-uk-pilgrims" }
  ]
};

const features = [
  "Fixed prices — no surprise fees",
  "English-speaking, vetted drivers",
  "24/7 WhatsApp support from the UK",
  "Modern, sanitised fleet (GMC, Staria, Hiace)",
  "Ministry of Transport licensed",
  "10+ years serving British pilgrims",
];

const testimonials = [
  { name: "Ahmed K.", city: "London", text: "Booked the day before my flight. Driver was waiting at KAIA with a name sign. Smooth ride to Makkah. Will use again for Hajj insha'Allah.", stars: 5 },
  { name: "Fatima R.", city: "Birmingham", text: "Travelling with 3 kids and elderly parents — the Staria was perfect. Driver helped with all our bags. Highly recommend to UK families.", stars: 5 },
  { name: "Tariq M.", city: "Manchester", text: "Fixed price, no negotiation at the airport. Exactly what you need after a long flight from the UK. Professional and punctual.", stars: 5 },
];

const faqs = [
  {
    q: "How much does a taxi from Jeddah Airport to Makkah cost for UK pilgrims?",
    a: "Our fixed-price transfer from Jeddah KAIA to Makkah starts from £35 per vehicle. No surge pricing, no hidden fees — price agreed at booking.",
  },
  {
    q: "Can I book Umrah transport from the UK before I travel?",
    a: "Yes — book online or via WhatsApp before you fly. We confirm within minutes. Your driver will be at arrivals with a name board.",
  },
  {
    q: "Do your drivers speak English?",
    a: "Yes. All drivers serving UK pilgrims are English-speaking and experienced with British pilgrim groups and Haram zone navigation.",
  },
  {
    q: "What vehicles are available for UK pilgrim groups?",
    a: "Toyota Hiace (10 pax), Hyundai Staria (11 pax), GMC Yukon AT4 (7 pax luxury), and Toyota Camry for individuals and couples.",
  },
  {
    q: "What is the best way to get from Jeddah Airport to Makkah?",
    a: "A private taxi or minivan is safest and fastest (~1–1.5 hrs). Public transport is unavailable to pilgrims in the Haram zone.",
  },
];

export default function UKPilgrimsPage() {
  return (
    <main className="min-h-screen bg-primary-black text-white pt-24 pb-16">
      <JsonLdScript schema={faqSchema} />
      <JsonLdScript schema={serviceSchema} />
      <JsonLdScript schema={breadcrumbSchema} />

      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none fixed" />
      <div className="container relative z-10 mx-auto px-4 max-w-5xl">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-10 flex items-center gap-2">
          <Link href="/" className="hover:text-gold-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-gray-300">UK Pilgrims Umrah Transport</span>
        </nav>

        {/* Hero */}
        <div className="text-center mb-14">
          <span className="text-gold-primary font-bold uppercase tracking-widest text-sm">🇬🇧 For UK Pilgrims</span>
          <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6 leading-tight">
            Umrah Transport<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-primary to-amber-400">Trusted by British Pilgrims</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            From Jeddah Airport to the Haram — private, comfortable, and fixed-price.
            Serving UK pilgrims from London, Birmingham, Manchester, Bradford, and beyond since 2014.
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

        {/* Trust Stats */}
        <div className="grid sm:grid-cols-3 gap-6 text-center mb-16">
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
          <h2 className="text-2xl font-bold mb-2 text-white">Umrah Transport Pricing Guide for UK Pilgrims</h2>
          <p className="text-gray-400 text-sm mb-6">All prices are per vehicle, fixed at time of booking. No airport surcharges, no night supplements.</p>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {[
              { from: "Jeddah Airport (KAIA)", to: "Makkah Hotels", price: "From £35", note: "~1 hr journey" },
              { from: "Makkah", to: "Madinah", price: "From £65", note: "~5 hr journey" },
              { from: "Madinah Airport (OEMA)", to: "Madinah Hotels", price: "From £20", note: "~30 min journey" },
              { from: "Jeddah Airport", to: "Madinah (direct)", price: "From £85", note: "~5.5 hr journey" },
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
            <strong className="text-gold-primary">Pricing tip:</strong> Prices are per vehicle, so larger groups get better value. A Hyundai Staria (11 seats) from Jeddah to Makkah works out to around £3–4 per person for a family group.
          </div>
          <div className="mt-4 text-center">
            <Link href="/pricing" className="text-gold-primary hover:underline font-semibold text-sm inline-flex items-center gap-1">
              View full pricing table with all vehicle options <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-4">How to Book Your Umrah Transfer</h2>
          <p className="text-center text-gray-400 text-sm mb-10 max-w-xl mx-auto">Booking from the UK is simple. Most pilgrims confirm their transfer within 5 minutes of enquiring.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: 1, title: "Book Online or WhatsApp", desc: "Fill in your flight number, arrival date, and Makkah hotel. Takes 2 minutes via our booking form or WhatsApp." },
              { step: 2, title: "Instant Confirmation", desc: "Receive your booking confirmation by email and WhatsApp. Driver details shared 24 hours before arrival." },
              { step: 3, title: "Meet Your Driver at Arrivals", desc: "Your English-speaking driver greets you with a name board at KAIA Terminal 1. Direct to your hotel, no stops." },
            ].map((s) => (
              <div key={s.step} className="text-center bg-white/5 rounded-2xl border border-white/10 p-6">
                <div className="w-12 h-12 rounded-full bg-gold-primary/10 border border-gold-primary/30 flex items-center justify-center text-gold-primary mx-auto mb-4 font-bold text-lg">
                  {s.step}
                </div>
                <h3 className="font-bold text-white mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SEO Travel Guide */}
        <div className="bg-white/5 rounded-2xl border border-white/10 p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4 text-white">UK Pilgrim's Guide to Umrah Transport in Saudi Arabia</h2>
          <div className="prose prose-invert prose-sm max-w-none text-gray-300 space-y-4">
            <p>
              Every year, thousands of British Muslims travel from UK cities to perform Umrah in Makkah and Madinah. Arranging reliable, halal-certified transport from Jeddah Airport is one of the most important logistical decisions you will make for your pilgrimage.
            </p>
            <h3 className="text-white font-bold text-lg mt-6">Jeddah Airport (KAIA) to Makkah — What to Expect</h3>
            <p>
              King Abdulaziz International Airport (KAIA) is located approximately 80 km from the Masjid al-Haram in Makkah. The drive typically takes <strong>60 to 90 minutes</strong> depending on traffic, which can be heavy during peak Umrah seasons (Ramadan, school holidays). With Al Kiswah, your driver monitors your flight in real time — so if your flight from London, Manchester, or Birmingham is delayed, we adjust at no extra charge.
            </p>
            <h3 className="text-white font-bold text-lg mt-6">Why Avoid Airport Taxis in Jeddah</h3>
            <p>
              Unregistered taxi touts at KAIA are a known issue for pilgrims. Fares can be negotiated on the spot at inflated rates, and vehicles are often unregulated. Pre-booking with a Ministry-licensed operator like Al Kiswah guarantees a fixed price, a licensed vehicle, and a professional driver — exactly what you need after a long-haul flight from the UK.
            </p>
            <h3 className="text-white font-bold text-lg mt-6">Best Vehicle for UK Pilgrim Families</h3>
            <p>
              For families of 4–8 travelling together, the <Link href="/fleet/hyundai-staria" className="text-gold-primary hover:underline">Hyundai Staria</Link> is our most popular choice — spacious, air-conditioned, and able to carry large luggage. For couples or individuals, the <Link href="/fleet/toyota-camry" className="text-gold-primary hover:underline">Toyota Camry</Link> offers a comfortable, affordable option. Groups of 10 or more should consider the <Link href="/fleet/toyota-hiace" className="text-gold-primary hover:underline">Toyota Hiace</Link> minivan.
            </p>
            <h3 className="text-white font-bold text-lg mt-6">Makkah to Madinah Transfer Tips</h3>
            <p>
              The Makkah to Madinah intercity route is approximately 430 km and takes around 4.5–5 hours by road. This is a popular route for UK pilgrims doing the classic Umrah circuit. We recommend booking this leg in advance — especially during Ramadan when demand is very high. See our <Link href="/services/makkah-madinah-taxi" className="text-gold-primary hover:underline">Makkah to Madinah taxi</Link> service page for full details.
            </p>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-10">What UK Pilgrims Say About Us</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white/5 rounded-2xl border border-white/10 p-6">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} size={14} className="fill-gold-primary text-gold-primary" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div className="text-sm font-semibold text-gold-primary">{t.name} <span className="text-gray-500 font-normal">— {t.city}</span></div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white/5 rounded-xl border border-white/10 p-6">
                <h3 className="font-bold text-white mb-2">{faq.q}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Internal Links / Explore More */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6 text-white">Explore Our Services & Fleet</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { href: "/fleet/gmc-yukon-at4", label: "GMC Yukon AT4", desc: "Luxury 7-seat SUV for VIP pilgrims" },
              { href: "/fleet/hyundai-staria", label: "Hyundai Staria", desc: "11-seat family van — most popular" },
              { href: "/fleet/toyota-hiace", label: "Toyota Hiace", desc: "10-seat minivan for large groups" },
              { href: "/services/jeddah-airport-transfer", label: "Jeddah Airport Transfer", desc: "KAIA arrivals & departures" },
              { href: "/services/makkah-madinah-taxi", label: "Makkah to Madinah Taxi", desc: "Intercity pilgrim transport" },
              { href: "/pricing", label: "Full Price List", desc: "All routes, all vehicles, all fares" },
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
