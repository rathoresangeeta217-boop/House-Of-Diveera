import React from 'react';
import { Quote, Star, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

interface Testimonial {
  id: number;
  name: string;
  rating: number;
  text: string;
  source: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sailaja Suman Malladi",
    rating: 5,
    text: "It's a beautiful nose pin. The diamonds used are very bright and the make is to the perfection. Thank you so much for a prompt shipping too 😊",
    source: "Google Reviews"
  },
  {
    id: 2,
    name: "Phoenix Rising",
    rating: 5,
    text: "Beautiful jewellery and even better service!",
    source: "Google Reviews"
  },
  {
    id: 3,
    name: "Meghateethee Bishnu",
    rating: 5,
    text: "Amazing experience. From placing order to getting the piece delivered, i was assisted in each and every step. Super happy with the purchase. Highly recommend.",
    source: "Google Reviews"
  },
  {
    id: 4,
    name: "M Nithyakumari",
    rating: 5,
    text: "So beautiful ❤️ . i got my chain in 3 gms which is not easier to make such a design in that gms. now a days gold price hikes and unable to afford huge amt. but in gehna all r in affordable weigh...",
    source: "Google Reviews"
  }
];

export default function Testimonials() {
  return (
    <section className="bg-[#632a31] py-24 px-6 relative overflow-hidden" id="testimonials">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <Quote className="text-[#a87a7d] w-12 h-12 mb-8 opacity-40" />
          <h2 className="text-4xl md:text-6xl font-serif italic text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-[#a87a7d] font-sans font-black text-[10px] md:text-xs uppercase tracking-[0.3em]">
            VERIFIED REVIEWS FROM GOOGLE & OUR CUSTOMERS
          </p>
        </div>

        <div className="relative overflow-hidden py-4 -mx-6 px-6">
          <motion.div 
            className="flex gap-6"
            animate={{
              x: [0, -1456], // Move by the total width of one set of items (approx)
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
          >
            {/* Double the array for seamless loop */}
            {[...testimonials, ...testimonials].map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="flex-shrink-0 w-[340px] bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 flex flex-col h-full hover:bg-white/10 transition-colors group"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-[#eab308] text-[#eab308]" />
                  ))}
                </div>
                <p className="text-white/90 font-sans text-sm leading-relaxed mb-10 flex-grow">
                  "{item.text}"
                </p>
                <div className="pt-6 border-t border-white/10">
                  <h4 className="text-white font-sans font-bold text-sm tracking-wide">
                    {item.name}
                  </h4>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Gradient Fades for a smoother edges */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#632a31] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#632a31] to-transparent z-10 pointer-events-none" />
        </div>

        <div className="mt-16 flex flex-col items-center gap-6">
          <button className="border border-[#a87a7d] text-[#e8d5d6] px-10 py-4 rounded-full font-sans font-black text-[11px] uppercase tracking-[0.2em] hover:bg-white/5 transition-all flex items-center gap-3">
            READ ALL REVIEWS ON GOOGLE
            <ArrowUpRight size={16} />
          </button>
          
          <div className="flex items-center gap-4 text-[#a87a7d] font-sans text-[10px] font-medium tracking-wider uppercase">
            <span>2 decades of trust</span>
            <span className="w-1 h-1 rounded-full bg-white/20"></span>
            <span>BIS Hallmarked</span>
            <span className="w-1 h-1 rounded-full bg-white/20"></span>
            <span>Verified by Google</span>
          </div>
        </div>
      </div>
      
      {/* Texture/Overlay elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-white/5 rounded-full blur-[120px] -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-black/20 rounded-full blur-[100px] -ml-32 -mb-32"></div>
    </section>
  );
}
