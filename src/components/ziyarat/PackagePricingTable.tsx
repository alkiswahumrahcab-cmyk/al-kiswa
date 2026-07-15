import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { TourPackage } from '@/data/ziyarat-packages';
import { vehicleLabels } from '@/data/ziyarat-packages';

export function PackagePricingTable({ packages, whatsappLink }: { packages: TourPackage[]; whatsappLink: string }) {
  const vehicleKeys = ['camry', 'staria', 'starex', 'gmc', 'hiace', 'coaster'] as const;

  return (
    <div className="overflow-x-auto rounded-[20px] border border-border bg-surface shadow-sm">
      <table className="w-full text-[15px] border-collapse min-w-[800px]">
        <thead>
          <tr className="border-b border-border bg-bg/50">
            <th className="text-left py-5 px-6 font-body font-bold text-ink tracking-wide">Tour Package</th>
            <th className="text-center py-5 px-4 font-body font-bold text-ink tracking-wide border-l border-border/50">Duration</th>
            {vehicleKeys.map(v => (
              <th key={v} className="text-center py-5 px-4 font-body font-bold text-ink tracking-wide border-l border-border/50">
                <div className="text-[14px] leading-tight mb-1">{vehicleLabels[v].name}</div>
                <div className="text-[12px] text-body-light font-medium tracking-normal">{vehicleLabels[v].capacity}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {packages.map((pkg, idx) => (
            <tr key={pkg.id} className={`border-b border-border transition-colors hover:bg-gold/5 ${idx % 2 === 0 ? 'bg-bg/20' : 'bg-transparent'}`}>
              <td className="py-6 px-6">
                <div className="font-bold text-ink text-[16px] mb-1">{pkg.name}</div>
                <div className="text-[13px] text-body-light font-medium">{pkg.city} • {pkg.distance}</div>
              </td>
              <td className="text-center py-6 px-4 text-body font-medium border-l border-border/50">{pkg.duration}</td>
              {vehicleKeys.map(v => (
                <td key={v} className="text-center py-6 px-4 border-l border-border/50">
                  <span className="text-gold font-bold text-[17px]">SAR {pkg.prices[v]}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center py-8 bg-bg/30 border-t border-border">
        <Link href={whatsappLink} className="inline-flex items-center btn-gold px-10 py-4 rounded-btn font-bold transition-all uppercase tracking-[0.15em] text-[13px] text-black hover:scale-[1.02]">
          Book Your Tour Now <ArrowRight size={18} className="ml-2" />
        </Link>
        <p className="mt-4 text-[13px] text-body-light font-medium">All prices per vehicle • Fuel, tolls & waiting included • No hidden charges</p>
      </div>
    </div>
  );
}
