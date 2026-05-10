import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const images = [
  "/hero-banner.png",
  "/second-banner.png"
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#f9f7f3] mt-[70px] md:mt-[84px]">
      {/* Invisible placeholder to establish the exact natural height of the banner */}
      <img 
        src={images[0]} 
        className="w-full h-auto invisible pointer-events-none" 
        alt="placeholder" 
        aria-hidden="true" 
      />
      
      <AnimatePresence>
        <motion.img 
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Jewelry Showcase ${currentIndex + 1}`}
          className="absolute top-0 left-0 w-full h-full object-contain"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        />
      </AnimatePresence>
    </section>
  );
}
