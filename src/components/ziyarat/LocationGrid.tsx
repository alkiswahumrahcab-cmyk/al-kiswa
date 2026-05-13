'use client';
import { MapPin, Clock, Users, Accessibility } from 'lucide-react';
import { useState } from 'react';
import type { ZiyaratSite } from '@/data/ziyarat-locations';

export function LocationGrid({ sites, city }: { sites: ZiyaratSite[]; city: string }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {sites.map((site) => (
        <button
          key={site.id}
          onClick={() => setExpanded(expanded === site.id ? null : site.id)}
          className={`text-left p-5 rounded-2xl border transition-all duration-300 group ${
            expanded === site.id
              ? 'bg-[#D4AF37]/5 border-[#D4AF37]/40 col-span-1 md:col-span-2 lg:col-span-3'
              : 'bg-white/5 border-white/10 hover:border-[#D4AF37]/30 hover:bg-white/10'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="bg-[#D4AF37]/10 p-2.5 rounded-xl text-[#D4AF37] border border-[#D4AF37]/20 group-hover:bg-[#D4AF37] group-hover:text-black transition-colors shrink-0">
              <MapPin size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-white text-base mb-1">{site.name}</h4>
              <p className="text-xs text-[#D4AF37]/80 font-medium mb-1">{site.significance}</p>
              {expanded === site.id ? (
                <div className="mt-3 space-y-3 animate-in fade-in duration-300">
                  <p className="text-sm text-gray-300 leading-relaxed font-light">{site.desc}</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Clock size={14} className="text-[#D4AF37]" />
                      <span>{site.bestTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Accessibility size={14} className="text-[#D4AF37]" />
                      <span>{site.accessibility}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Users size={14} className="text-[#D4AF37]" />
                      <span>{site.familyFriendly ? 'Family friendly' : 'Adults recommended'}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-gray-500 mt-1">Tap to read more →</p>
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
