import { CATEGORIES } from '../constants';
import { motion, useAnimationControls } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Categories() {
  const [isScrolling, setIsScrolling] = useState(false);
  const controls = useAnimationControls();

  // Create a tripled list for seamless infinite loop
  const duplicatedCategories = [...CATEGORIES, ...CATEGORIES, ...CATEGORIES];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsScrolling(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-2xl md:text-3xl font-sans font-black text-diveera-dark flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
            </span>
            Shop by <span className="text-red-600 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-red-600">Categories</span>
          </h2>
          <Link to="/collections/all" className="text-diveera-green text-xs font-black flex items-center gap-1 hover:underline">
            View All <ChevronRight size={16} />
          </Link>
        </div>

        <div className="relative w-full overflow-hidden">
          <div 
            className={`flex gap-8 md:gap-14 px-2 ${isScrolling ? 'animate-marquee pause-on-hover' : ''}`}
            style={{ width: 'max-content' }}
          >
            {duplicatedCategories.map((cat, idx) => (
              <Link 
                to={cat.name.includes("Men's") ? "/gifts-for-him" : `/collections/${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                key={`${cat.id}-${idx}`}
              >
                <div className="flex flex-col items-center gap-5 min-w-[110px] md:min-w-[140px] cursor-pointer group">
                  <div className="w-24 h-24 md:w-36 md:h-36 rounded-full bg-[#f2f4f7] overflow-hidden flex items-center justify-center p-3 group-hover:bg-gray-200 transition-colors shadow-sm group-hover:shadow-md transition-all">
                    <img 
                      src={cat.image} 
                      alt={cat.name} 
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <span className="font-sans font-black text-xs md:text-base uppercase tracking-tight text-center leading-tight group-hover:text-diveera-green transition-colors whitespace-nowrap">
                    {cat.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
