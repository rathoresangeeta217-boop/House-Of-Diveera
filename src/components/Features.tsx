import { ShieldCheck, Truck, RotateCcw, Info } from 'lucide-react';

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "12+3 Months",
    subtitle: "Warranty",
    hasInfo: true
  },
  {
    icon: Truck,
    title: "Free Express",
    subtitle: "Delivery*"
  },
  {
    icon: RotateCcw,
    title: "7-day",
    subtitle: "Replacement"
  }
];

export default function Features() {
  return (
    <div className="bg-[#eff4f7] py-4 md:py-6 border-b border-gray-200 overflow-hidden">
      <div className="container mx-auto px-2 md:px-4">
        <div className="flex justify-between items-center gap-1 md:gap-4">
          {FEATURES.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-1.5 md:gap-4 flex-1 justify-center">
              <div className="flex-shrink-0 text-diveera-dark opacity-80">
                <feature.icon className="w-5 h-5 md:w-8 md:h-8" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-black text-[9px] md:text-sm text-diveera-dark tracking-tight leading-tight">
                  {feature.title}
                </span>
                <div className="flex items-center gap-0.5 md:gap-1">
                  <span className="font-sans text-[8px] md:text-xs text-diveera-grey font-bold leading-tight">
                    {feature.subtitle}
                  </span>
                  {feature.hasInfo && (
                    <Info className="w-2.5 h-2.5 md:w-3 md:h-3 text-diveera-grey cursor-pointer hover:text-diveera-green transition-colors" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
