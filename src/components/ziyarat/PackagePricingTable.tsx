import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { TourPackage } from '@/data/ziyarat-packages';
import { vehicleLabels } from '@/data/ziyarat-packages';

export function PackagePricingTable({ packages, whatsappLink }: { packages: TourPackage[]; whatsappLink: string }) {
  const vehicleKeys = ['camry', 'gmc', 'staria', 'starex', 'hiace', 'coaster'] as const;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-4 px-4 text-gray-400 font-medium uppercase tracking-wider text-xs">Tour Package</th>
            <th className="text-center py-4 px-2 text-gray-400 font-medium uppercase tracking-wider text-xs">Duration</th>
            {vehicleKeys.map(v => (
              <th key={v} className="text-center py-4 px-2 text-gray-400 font-medium uppercase tracking-wider text-xs">
                <div>{vehicleLabels[v].name}</div>
                <div className="text-[10px] text-gray-500 font-normal">{vehicleLabels[v].capacity}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {packages.map((pkg, idx) => (
            <tr key={pkg.id} className={`border-b border-white/5 hover:bg-white/5 transition-colors ${idx % 2 === 0 ? 'bg-white/[0.02]' : ''}`}>
              <td className="py-4 px-4">
                <div className="font-bold text-white">{pkg.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">{pkg.city} • {pkg.distance}</div>
              </td>
              <td className="text-center py-4 px-2 text-gray-300">{pkg.duration}</td>
              {vehicleKeys.map(v => (
                <td key={v} className="text-center py-4 px-2">
                  <span className="text-[#D4AF37] font-bold">SAR {pkg.prices[v]}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center mt-8">
        <Link href={whatsappLink} className="inline-flex items-center btn-gold px-10 py-3.5 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] uppercase tracking-[0.15em] text-sm text-black hover:scale-105">
          Book Your Tour Now <ArrowRight size={18} className="ml-2" />
        </Link>
        <p className="mt-4 text-xs text-gray-500">All prices per vehicle • Fuel, tolls & waiting included • No hidden charges</p>
      </div>
    </div>
  );
}
