import React from 'react';
import { cn } from '@/lib/utils';
import { 
  PlaneLanding, 
  PlaneTakeoff, 
  Building, 
  Map, 
  Compass, 
  UserCheck, 
  Crown, 
  CarFront, 
  Users, 
  Bus, 
  Car, 
  Briefcase, 
  Radar, 
  Handshake, 
  Luggage, 
  BadgeCheck, 
  Clock, 
  Headset, 
  ShieldCheck, 
  Navigation, 
  Zap, 
  CalendarDays, 
  CreditCard, 
  MessageCircle, 
  Phone, 
  Mail, 
  MapPin, 
  Route, 
  Banknote, 
  Calendar, 
  Landmark, 
  Bed, 
  Plane, 
  Star, 
  MessageSquareQuote, 
  Shield, 
  Award,
  LucideIcon
} from 'lucide-react';

export type PremiumIconName = 
  | 'airport-pickup' | 'airport-dropoff' | 'hotel-transfer' | 'makkah-transfer' | 'madinah-transfer'
  | 'ziyarat-tours' | 'vip-chauffeur' | 'luxury-fleet' | 'family-transport' | 'group-transport'
  | 'executive-sedan' | 'business-travel' | 'flight-tracking' | 'meet-greet' | 'luggage-assistance'
  | 'professional-driver' | '24-7-service' | 'customer-support' | 'secure-booking' | 'verified-service'
  | 'gps-navigation' | 'instant-confirmation' | 'flexible-scheduling' | 'online-payment' | 'whatsapp-booking'
  | 'phone-support' | 'email' | 'live-location' | 'time' | 'distance' | 'passenger-capacity'
  | 'luggage-capacity' | 'price' | 'calendar' | 'clock' | 'route' | 'mosque' | 'kaaba' | 'hotel'
  | 'airport' | 'vehicle-types' | 'reviews' | 'testimonials' | 'safety' | 'shield' | 'premium-quality';

const IconMap: Record<PremiumIconName, LucideIcon> = {
  'airport-pickup': PlaneLanding,
  'airport-dropoff': PlaneTakeoff,
  'hotel-transfer': Building,
  'makkah-transfer': Landmark,
  'madinah-transfer': Landmark,
  'ziyarat-tours': Compass,
  'vip-chauffeur': Crown,
  'luxury-fleet': CarFront,
  'family-transport': Users,
  'group-transport': Bus,
  'executive-sedan': Car,
  'business-travel': Briefcase,
  'flight-tracking': Radar,
  'meet-greet': Handshake,
  'luggage-assistance': Luggage,
  'professional-driver': UserCheck,
  '24-7-service': Clock,
  'customer-support': Headset,
  'secure-booking': ShieldCheck,
  'verified-service': BadgeCheck,
  'gps-navigation': Navigation,
  'instant-confirmation': Zap,
  'flexible-scheduling': CalendarDays,
  'online-payment': CreditCard,
  'whatsapp-booking': MessageCircle,
  'phone-support': Phone,
  'email': Mail,
  'live-location': MapPin,
  'time': Clock,
  'distance': Route,
  'passenger-capacity': Users,
  'luggage-capacity': Luggage,
  'price': Banknote,
  'calendar': Calendar,
  'clock': Clock,
  'route': Route,
  'mosque': Landmark,
  'kaaba': Landmark,
  'hotel': Bed,
  'airport': Plane,
  'vehicle-types': CarFront,
  'reviews': Star,
  'testimonials': MessageSquareQuote,
  'safety': Shield,
  'shield': Shield,
  'premium-quality': Award,
};

export type IconSize = 'small' | 'default' | 'standard' | 'large' | 'feature' | 'hero';

const SizeMap: Record<IconSize, number> = {
  small: 16,     // Inline UI
  default: 20,   // Standard buttons
  standard: 24,  // Standard icons
  large: 32,     // Prominent features
  feature: 44,   // Feature cards (40-48px)
  hero: 60,      // Hero/Highlight (56-64px)
};

interface PremiumIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: PremiumIconName;
  size?: IconSize;
  className?: string;
  glow?: boolean;
}

export const PremiumIcon: React.FC<PremiumIconProps> = ({ 
  name, 
  size = 'standard', 
  className, 
  glow = false,
  ...props 
}) => {
  const Icon = IconMap[name];
  
  if (!Icon) {
    console.warn(`PremiumIcon: Icon "${name}" not found in map.`);
    return null;
  }

  const pxSize = SizeMap[size];

  return (
    <span 
      className={cn(
        "inline-flex items-center justify-center lucide-hoverable",
        glow && "relative after:absolute after:inset-0 after:bg-gold/20 after:blur-md after:rounded-full after:animate-pulse",
        className
      )}
      {...props}
    >
      <Icon 
        size={pxSize} 
        strokeWidth={1.5} 
        className={cn(
          "transition-all duration-250 ease-out",
          glow && "relative z-10"
        )} 
      />
    </span>
  );
};
