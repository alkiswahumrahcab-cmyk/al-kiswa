import { MapPin, Clock, Users, Accessibility } from 'lucide-react';
import type { ZiyaratSite } from '@/data/ziyarat-locations';

export function LocationGrid({ sites }: { sites: ZiyaratSite[] }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sites.map((site) => (
        <details
          key={site.id}
          className="group p-5 rounded-[20px] border border-border bg-surface transition-all duration-300 hover:shadow-md hover:border-gold/30 open:bg-gold/5 open:border-gold/40 open:shadow-sm"
        >
          <summary className="flex items-start gap-3 cursor-pointer outline-none marker:hidden list-none [&::-webkit-details-marker]:hidden">
            <div className="bg-gold/10 p-2.5 rounded-xl text-gold border border-gold/20 group-hover:bg-gold group-hover:text-white transition-colors shrink-0 mt-0.5">
              <MapPin size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-body font-bold text-ink text-[17px] leading-tight mb-1 group-open:text-gold transition-colors">{site.name}</h4>
              <p className="text-[13px] text-body-light font-medium leading-relaxed">{site.significance}</p>
              <p className="text-[13px] text-gold font-semibold mt-3 group-open:hidden flex items-center">
                Tap to read more <span className="ml-1">&rarr;</span>
              </p>
            </div>
          </summary>
          
          <div className="mt-5 pt-4 pl-[52px] border-t border-border/50 space-y-4 animate-in fade-in duration-300">
            <p className="text-[15px] text-body leading-relaxed font-light">{site.desc}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2 text-[13px] text-body-light">
                <Clock size={16} className="text-gold shrink-0 mt-0.5" />
                <span className="leading-tight">{site.bestTime}</span>
              </div>
              <div className="flex items-start gap-2 text-[13px] text-body-light">
                <Accessibility size={16} className="text-gold shrink-0 mt-0.5" />
                <span className="leading-tight">{site.accessibility}</span>
              </div>
              <div className="flex items-start gap-2 text-[13px] text-body-light">
                <Users size={16} className="text-gold shrink-0 mt-0.5" />
                <span className="leading-tight">{site.familyFriendly ? 'Family friendly' : 'Adults recommended'}</span>
              </div>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}
