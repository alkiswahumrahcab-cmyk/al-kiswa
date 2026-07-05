export interface Stat {
  id: string;
  value: number;
  suffix: string;
  label: string;
  labelAr: string;
  icon: string;
  description: string;
  descriptionAr: string;
  link: string;
  ctaText: string;
  ctaTextAr: string;
  decimals?: number;
}

export const COMPANY_STATS: Stat[] = [
  {
    id: "pilgrims",
    value: 5000,
    suffix: "+",
    label: "Happy Pilgrims Served",
    labelAr: "حاج سعيد خدمناهم",
    icon: "🕋",
    description: "Pilgrims who trusted us with their sacred journey",
    descriptionAr: "معتمرون وثقوا بنا في رحلتهم الروحانية",
    link: "/about#reviews",
    ctaText: "Read their stories →",
    ctaTextAr: "اقرأ تجاربهم ←"
  },
  {
    id: "trips",
    value: 12000,
    suffix: "+",
    label: "Trips Completed",
    labelAr: "رحلة مكتملة",
    icon: "🚗",
    description: "Safe transfers between Jeddah, Makkah and Madinah",
    descriptionAr: "رحلات نقل آمنة بين مطار جدة، مكة المكرمة، والمدينة المنورة",
    link: "/routes",
    ctaText: "See our routes →",
    ctaTextAr: "شاهد مساراتنا ←"
  },
  {
    id: "rating",
    value: 5.0,
    suffix: "★",
    label: "5-Star Rating",
    labelAr: "تقييم خمس نجوم",
    icon: "⭐",
    description: "Average rating across Google and Trustpilot reviews",
    descriptionAr: "متوسط التقييمات عبر جوجل ومواقع المراجعات",
    decimals: 1,
    link: "https://www.google.com/search?q=Al+Kiswah+Umrah+Transport",
    ctaText: "View on Google →",
    ctaTextAr: "شاهد تقييماتنا على جوجل ←"
  },
  {
    id: "years",
    value: 10,
    suffix: "+",
    label: "Years of Trusted Service",
    labelAr: "سنوات من الخدمة الموثوقة",
    icon: "🏅",
    description: "Serving pilgrims since 2014",
    descriptionAr: "نخدم ضيوف الرحمن منذ عام ٢٠١٤",
    link: "/about",
    ctaText: "Our story →",
    ctaTextAr: "تعرف على قصتنا ←"
  }
];

export const SOCIAL_PROOF_MESSAGES = [
  "🇬🇧 Ahmed from London booked a GMC Yukon to Makkah — 2 hours ago",
  "🇫🇷 Fatima from Paris confirmed a Makkah → Madinah transfer — 5 hours ago",
  "🇸🇦 Abdullah from Riyadh booked a family Ziyarat tour — 1 hour ago",
  "🇩🇪 Ibrahim from Berlin reserved airport pickup for next Friday — 3 hours ago",
  "🇰🇼 Mariam from Kuwait booked a GMC Yukon for 6 passengers — 30 mins ago",
  "🇦🇪 Khalid from Dubai confirmed a VIP Madinah transfer — 4 hours ago",
];

export const SOCIAL_PROOF_MESSAGES_AR = [
  "🇬🇧 أحمد من لندن حجز سيارة يوكن إلى مكة — قبل ساعتين",
  "🇫🇷 فاطمة من باريس أكدت حجز نقل من مكة للمدينة — قبل ٥ ساعات",
  "🇸🇦 عبدالله من الرياض حجز جولة مزارات عائلية — قبل ساعة",
  "🇩🇪 إبراهيم من برلين حجز استقبال من المطار ليوم الجمعة — قبل ٣ ساعات",
  "🇰🇼 مريم من الكويت حجزت سيارة يوكن لـ ٦ ركاب — قبل ٣٠ دقيقة",
  "🇦🇪 خالد من دبي أكد حجز توصيل VIP للمدينة — قبل ٤ ساعات",
];
