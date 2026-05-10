import { motion } from 'motion/react';

export default function AnnouncementBar() {
  return (
    <div className="bg-[#f7f7f7] text-diveera-dark py-2.5 px-4 text-center text-[10px] md:text-xs font-sans font-medium tracking-wider border-b border-gray-100 relative z-[60]">
      <div className="container mx-auto flex items-center justify-center gap-2 flex-wrap">
        <span className="opacity-80">Get Extra 5% Off On Prepaid Orders | Code: </span>
        <span className="font-bold text-diveera-green tracking-widest uppercase">DIVEERA5</span>
        <span className="hidden sm:inline mx-1">|</span>
        <a href="#" className="underline font-bold hover:text-diveera-green transition-colors flex items-center gap-1">
          Shop Now
        </a>
      </div>
    </div>
  );
}
