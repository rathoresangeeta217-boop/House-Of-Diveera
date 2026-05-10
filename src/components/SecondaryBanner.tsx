import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export default function SecondaryBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-cream py-8 md:py-12">
      <img 
        src="/my-new-banner.png" 
        alt="Forever Mom - Gold made for Mom"
        className="w-full h-auto object-contain block"
      />
    </section>
  );
}
