import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function FullWidthBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-[#f9f7f3] py-8 md:py-12">
      <img 
        src="/forever-mom-banner.png" 
        alt="Happy Mother's Day Sale"
        className="w-full h-auto object-contain block"
      />
    </section>
  );
}
