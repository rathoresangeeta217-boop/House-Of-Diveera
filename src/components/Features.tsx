import { ShieldCheck, Truck, RotateCcw, Info, Heart, Sparkles } from 'lucide-react';

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "100% Anti-Tarnish",
    subtitle: "Lifetime Warranty",
    hasInfo: true
  },
  {
    icon: Heart,
    title: "Hypoallergenic",
    subtitle: "Skin Friendly"
  },
  {
    icon: Sparkles,
    title: "Sweat & Perfume Proof",
    subtitle: "Daily Wear"
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
    <div className="bg-[#eff4f7] py-4 md:py-6 border-b border-gray-200 overflow-hidden" id="trust-features-bar">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center gap-6 md:gap-4 overflow-x-auto no-scrollbar justify-start md:justify-between whitespace-nowrap">
          {FEATURES.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2 md:gap-3 flex-shrink-0 md:flex-shrink md:flex-1 justify-center">
              <div className="flex-shrink-0 text-diveera-dark opacity-85">
                <feature.icon className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-black text-[11px] md:text-sm text-diveera-dark tracking-tight leading-tight">
                  {feature.title}
                </span>
                <div className="flex items-center gap-0.5 md:gap-1">
                  <span className="font-sans text-[9px] md:text-xs text-diveera-grey font-bold leading-tight">
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

