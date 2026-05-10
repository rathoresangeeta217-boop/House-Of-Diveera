import { Search, ShoppingBag, User, Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

import { CATEGORIES } from '../constants';
import CartDrawer from './CartDrawer';

export default function Navbar() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const categoriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target as Node)) {
        setShowCategories(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8",
      isScrolled ? "top-0 py-3 bg-white shadow-md" : "top-[37px] py-4 bg-white"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Mobile Menu Toggle & Logo */}
        <div className="flex items-center gap-2">
          <button 
            className="md:hidden p-2 -ml-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <Link to="/" className="flex items-center gap-1.5 cursor-pointer group">
            <div className="bg-diveera-green px-3 py-1 rounded-sm shadow-sm transform group-hover:scale-105 transition-transform duration-300">
              <h1 className="text-lg md:text-xl font-sans font-black tracking-widest text-cream uppercase leading-none">
                House of Diveera
              </h1>
            </div>
          </Link>
        </div>

        {/* Center: Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-[11px] font-sans font-black tracking-tight text-diveera-dark/90 h-full">
          <div 
            ref={categoriesRef}
            className="h-full flex items-center"
            onMouseEnter={() => setShowCategories(true)}
            onMouseLeave={() => setShowCategories(false)}
          >
            <button 
              onClick={() => setShowCategories(!showCategories)}
              className="flex items-center gap-1 hover:text-diveera-green transition-colors uppercase whitespace-nowrap py-4"
            >
              Categories <ChevronDown size={12} className={cn("opacity-60 transition-transform duration-200", showCategories && "rotate-180")} />
            </button>

            {/* Desktop Mega Menu */}
            <AnimatePresence>
              {showCategories && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-0 right-0 top-full bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-t border-gray-100 py-12 px-8 overflow-hidden"
                >
                  <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-4 gap-y-10 gap-x-12">
                      {CATEGORIES.map((cat) => (
                        <Link 
                          key={cat.id} 
                          to={`/collections/${cat.name.toLowerCase().replace(/\s+/g, '-')}`} 
                          onClick={() => setShowCategories(false)}
                          className="flex items-center group/item gap-4"
                        >
                          <div className="w-12 h-12 rounded-full overflow-hidden bg-cream flex-shrink-0 border border-gray-100 group-hover/item:border-diveera-green/30 transition-colors">
                            <img 
                              src={cat.image} 
                              alt={cat.name} 
                              className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500" 
                            />
                          </div>
                          <span className="text-[12px] font-black text-diveera-dark/80 group-hover/item:text-diveera-green transition-colors uppercase tracking-tight">
                            {cat.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link to="/gifts-for-him" className="hover:text-diveera-green transition-colors uppercase whitespace-nowrap">Gift for him</Link>
          <Link to="/gifts-for-her" className="hover:text-diveera-green transition-colors uppercase whitespace-nowrap">Gift for her</Link>
          <Link to="/hampers" className="hover:text-diveera-green transition-colors uppercase whitespace-nowrap">Hampers</Link>
          <Link to="/track-order" className="hover:text-diveera-green transition-colors uppercase whitespace-nowrap">Track Order</Link>
        </div>

        {/* Right: Search & Icons */}
        <div className="flex items-center gap-3 lg:gap-6">
          {/* Pill-style Search Bar */}
          <div className="hidden lg:flex items-center bg-gray-100/80 border border-transparent rounded-full px-5 py-2.5 focus-within:bg-white focus-within:border-diveera-green/30 focus-within:shadow-sm transition-all w-64">
            <Search size={18} className="text-diveera-grey mr-3" />
            <input 
              type="text" 
              placeholder='Search "Bangles"' 
              className="bg-transparent border-none outline-none text-[12px] font-medium w-full placeholder:text-diveera-grey/70"
            />
          </div>
          
          <button className="hover:text-diveera-green transition-colors lg:hidden"><Search size={22} /></button>
          
          <div className="flex items-center gap-4 whitespace-nowrap">
            <button className="hover:text-diveera-green transition-colors relative">
              <User size={24} strokeWidth={1.5} />
              <div className="absolute -top-0.5 -right-0.5 bg-yellow-400 w-2 h-2 rounded-full border-2 border-white shadow-sm" />
            </button>
            <button 
              className="relative hover:text-diveera-green transition-colors"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag size={24} strokeWidth={1.5} />
              <span className="absolute -top-1.5 -right-1.5 bg-diveera-green text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold shadow-sm">0</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed inset-0 top-[60px] bg-white z-40 p-6 flex flex-col gap-6"
          >
            <div className="flex flex-col">
              <button 
                onClick={() => setIsMobileCategoriesOpen(!isMobileCategoriesOpen)}
                className={cn(
                  "text-xl font-sans font-black uppercase flex items-center justify-between p-3 rounded-xl transition-all duration-300",
                  isMobileCategoriesOpen ? "bg-diveera-green text-cream shadow-md" : "bg-gray-50 text-diveera-dark"
                )}
              >
                Categories <ChevronDown size={20} className={cn("transition-transform duration-300", isMobileCategoriesOpen && "rotate-180")} />
              </button>
              <AnimatePresence>
                {isMobileCategoriesOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-white/80 backdrop-blur-sm rounded-b-xl border-x border-b border-gray-100 -mt-2 pt-2"
                  >
                    <div className="py-2 flex flex-col">
                      {CATEGORIES.map(cat => (
                        <Link 
                          key={cat.id} 
                          to={`/collections/${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="px-6 py-3.5 text-[13px] font-black text-diveera-dark/70 uppercase tracking-tight hover:text-diveera-green border-b border-gray-50 last:border-none flex items-center gap-4 active:bg-gray-50 transition-colors"
                        >
                          <div className="w-10 h-10 rounded-full overflow-hidden bg-cream flex-shrink-0 shadow-sm border border-white">
                            <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                          </div>
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link to="/gifts-for-him" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-sans font-black uppercase text-diveera-dark">Gift for him</Link>
            <Link to="/gifts-for-her" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-sans font-black uppercase text-diveera-dark">Gift for her</Link>
            <Link to="/hampers" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-sans font-black uppercase text-diveera-dark">Hampers</Link>
            <Link to="/track-order" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-sans font-black uppercase text-diveera-dark">Track Order</Link>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  );
}
