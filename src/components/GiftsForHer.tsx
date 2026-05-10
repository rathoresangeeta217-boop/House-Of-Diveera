import { motion } from 'motion/react';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import ProductCard from './ProductCard';
import Navbar from './Navbar';
import Footer from './Footer';
import AnnouncementBar from './AnnouncementBar';
import WhatsAppButton from './WhatsAppButton';
import { ChevronRight, Filter, IndianRupee, Tag, Zap } from 'lucide-react';

const CATEGORIES = ['All', 'Rings', 'Earrings', 'Necklaces', 'Pendants', 'Bracelets', 'Sets'];

export default function GiftsForHer() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [priceRange, setPriceRange] = useState<{ min: number; max: number; label: string } | null>(null);
  const [visibleCount, setVisibleCount] = useState(8);
  const [allVisibleCount, setAllVisibleCount] = useState(12);
  const productsRef = useRef<HTMLDivElement>(null);
  
  const womenProducts = PRODUCTS.filter(p => p.category !== 'Men');
  let filteredProducts = activeCategory === 'All' 
    ? womenProducts 
    : womenProducts.filter(p => p.category.toLowerCase().includes(activeCategory.toLowerCase()) || p.name.toLowerCase().includes(activeCategory.toLowerCase()));

  if (priceRange) {
    filteredProducts = filteredProducts.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);
  }

  const handlePriceClick = (min: number, max: number, label: string) => {
    setPriceRange({ min, max, label });
    setActiveCategory('All');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setActiveCategory('All');
    setPriceRange(null);
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <AnnouncementBar />
      <Navbar />
      
      {/* Conditionally render Hero or Filter Header */}
      {!priceRange ? (
        <section className="relative h-[300px] md:h-[450px] overflow-hidden bg-[#fff0f3]">
          <img 
            src="https://images.unsplash.com/photo-1515562141207-7a18b5ce7142?q=80&w=1600&h=800&auto=format&fit=crop" 
            alt="Women's Jewelry Collection" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-800 text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-sans font-extrabold text-3xl md:text-6xl uppercase mb-2 md:mb-4 text-[#4a2c2a]">
                Gifts For Her
              </h1>
              <p className="text-sm md:text-xl font-medium tracking-wide max-w-2xl mx-auto opacity-90 text-[#6b4e4c]">
                Exquisite premium jewelry crafted for the woman who shines. 
                Timeless pieces for every occasion.
              </p>
              <div className="mt-6 md:mt-8 flex items-center justify-center gap-4">
                <div className="h-[1px] w-8 md:w-16 bg-[#4a2c2a]/30" />
                <span className="text-[10px] md:text-sm uppercase tracking-widest font-bold text-[#4a2c2a]">The Grace Collection</span>
                <div className="h-[1px] w-8 md:w-16 bg-[#4a2c2a]/30" />
              </div>
            </motion.div>
          </div>
        </section>
      ) : (
        <section className="bg-[#4a2c2a] py-16 md:py-24 text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto"
          >
            <button 
              onClick={clearFilters}
              className="text-gray-300 hover:text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 mx-auto mb-6 transition-colors"
            >
              <ChevronRight className="rotate-180" size={14} />
              Back to All Gifts
            </button>
            <h1 className="text-white font-sans font-extrabold text-4xl md:text-7xl uppercase mb-4 tracking-tighter">
              {priceRange.label}
            </h1>
            <div className="h-1 w-24 bg-[#e8a3a3] mx-auto rounded-full mb-6" />
            <p className="text-gray-300 text-sm md:text-lg font-medium uppercase tracking-[0.2em]">
              Elegant Essentials For Her
            </p>
          </motion.div>
        </section>
      )}

      {/* Breadcrumbs & Filters */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center gap-2 text-[10px] md:text-xs text-gray-500 uppercase tracking-widest mb-8">
          <Link to="/" className="hover:text-black">Home</Link>
          <ChevronRight size={10} />
          <Link to="/gifts" className="hover:text-black">Gifts</Link>
          <ChevronRight size={10} />
          <button onClick={clearFilters} className={priceRange ? "hover:text-black" : "text-black font-bold"}>
            Gifts for Her
          </button>
          {priceRange && (
            <>
              <ChevronRight size={10} />
              <span className="text-black font-bold">{priceRange.label}</span>
            </>
          )}
        </div>

        {/* Hide categories and price grid when a price filter is active */}
        {!priceRange && (
          <>
            {/* Shop By Specific Product Category (Visual) */}
            <div className="mb-12">
              <h2 className="text-sm font-extrabold uppercase tracking-widest mb-6">Shop by Category</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {[
                  { name: 'Rings', image: 'https://images.unsplash.com/photo-1543294064-451a77143946?q=80&w=300&h=300&auto=format&fit=crop' },
                  { name: 'Earrings', image: 'https://images.unsplash.com/photo-1590548237356-32243b0c897f?q=80&w=300&h=300&auto=format&fit=crop' },
                  { name: 'Necklaces', image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=300&h=300&auto=format&fit=crop' },
                  { name: 'Pendants', image: 'https://images.unsplash.com/photo-1515562141207-7a18b5ce7142?q=80&w=300&h=300&auto=format&fit=crop' },
                  { name: 'Bracelets', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=300&h=300&auto=format&fit=crop' },
                  { name: 'Sets', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=300&h=300&auto=format&fit=crop' },
                  { name: 'Nose Pins', image: 'https://images.unsplash.com/photo-1589128777073-263566ae5e4d?q=80&w=300&h=300&auto=format&fit=crop' }
                ].map((cat) => (
                  <button 
                    key={cat.name}
                    onClick={() => {
                      setActiveCategory(cat.name);
                      setPriceRange(null);
                      setTimeout(() => {
                        productsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }, 100);
                    }}
                    className="relative h-28 md:h-48 rounded-xl overflow-hidden group"
                  >
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-[#4a2c2a]/20 group-hover:bg-[#4a2c2a]/10 transition-colors" />
                    <div className="absolute inset-x-0 bottom-0 py-3 bg-gradient-to-t from-[#4a2c2a]/80 to-transparent flex items-center justify-center">
                      <span className="text-white font-bold uppercase tracking-widest text-[10px] md:text-sm">{cat.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Shop By Price (Visual - Premium Design) */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-extrabold uppercase tracking-widest">Shop by Price</h2>
                <div className="h-[1px] flex-grow mx-6 bg-gray-100" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
                {[
                  { label: 'Under ₹999', min: 0, max: 999, icon: <Tag className="text-[#e8a3a3]" />, desc: 'Thoughtful tokens', color: 'bg-[#fff5f5]' },
                  { label: '₹1000 - ₹1999', min: 1000, max: 1999, icon: <Zap className="text-[#a3b1e8]" />, desc: 'Bestselling favorites', color: 'bg-[#f5f7ff]' },
                  { label: '₹2000 - ₹2999', min: 2000, max: 2999, icon: <IndianRupee className="text-[#a3e8b1]" />, desc: 'Premium elegance', color: 'bg-[#f5fff7]' },
                  { label: 'Above ₹3000', min: 3001, max: 10000, icon: <Filter className="text-[#e8d5a3]" />, desc: 'Grand gestures', color: 'bg-[#fffcf5]' },
                ].map((range) => (
                  <button
                    key={range.label}
                    onClick={() => handlePriceClick(range.min, range.max, range.label)}
                    className={`group relative overflow-hidden rounded-2xl p-6 text-left transition-all hover:shadow-xl border-2 ${
                      priceRange?.min === range.min ? 'border-[#4a2c2a] bg-white' : 'border-transparent ' + range.color
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-white shadow-sm group-hover:scale-110 transition-transform`}>
                        {range.icon}
                      </div>
                      <ChevronRight className="text-gray-300 group-hover:text-[#4a2c2a] group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="text-xl font-extrabold text-[#4a2c2a] uppercase mb-1">
                      {range.label}
                    </h3>
                    <p className="text-gray-500 text-[10px] font-medium uppercase tracking-widest">
                      {range.desc}
                    </p>
                    <div className="absolute -right-2 -bottom-2 opacity-10 scale-150 group-hover:scale-125 group-hover:opacity-20 transition-all">
                       {range.icon}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12" ref={productsRef}>
          <div className="flex items-center gap-2 md:gap-4 overflow-x-auto pb-2 no-scrollbar">
            <button
              onClick={clearFilters}
              className={`px-4 py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest border transition-all whitespace-nowrap ${
                activeCategory === 'All' && priceRange === null
                  ? 'bg-[#4a2c2a] text-white border-[#4a2c2a]' 
                  : 'bg-white text-gray-500 border-gray-200 hover:border-[#4a2c2a] hover:text-[#4a2c2a]'
              }`}
            >
              All
            </button>
            {CATEGORIES.slice(1).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setPriceRange(null);
                }}
                className={`px-4 py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest border transition-all whitespace-nowrap ${
                  activeCategory === cat 
                    ? 'bg-[#4a2c2a] text-white border-[#4a2c2a]' 
                    : 'bg-white text-gray-500 border-gray-200 hover:border-[#4a2c2a] hover:text-[#4a2c2a]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
             {priceRange && (
               <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-[#4a2c2a] bg-[#fff5f5] px-3 py-1.5 rounded-full">
                 <span className="text-gray-500">Price:</span> {priceRange.label}
                 <button onClick={() => setPriceRange(null)} className="ml-1 text-red-500 hover:text-red-700">✕</button>
               </div>
             )}
            <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-2 border border-gray-200 bg-white rounded-md shadow-sm hover:border-black transition-colors">
              <Filter size={14} /> 
              Filters
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="min-h-[400px]">
          {filteredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6 mb-8">
                {filteredProducts.slice(0, visibleCount).map((product, idx) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="w-full"
                  >
                    <ProductCard product={product} compact={true} />
                  </motion.div>
                ))}
              </div>
              
              {visibleCount < filteredProducts.length && (
                <div className="text-center mb-16">
                  <button 
                    onClick={() => setVisibleCount(prev => prev + 8)}
                    className="px-10 py-4 border-2 border-[#4a2c2a] rounded-full font-black uppercase text-[10px] tracking-[0.2em] hover:bg-[#4a2c2a] hover:text-white transition-all"
                  >
                    View More Gift Designs
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200 mb-16">
              <p className="text-gray-400 font-bold uppercase tracking-widest mb-4">No products found for {priceRange ? priceRange.label : activeCategory}</p>
              <button 
                onClick={clearFilters}
                className="text-[#4a2c2a] font-bold uppercase text-xs tracking-tighter border-b-2 border-[#4a2c2a] pb-1 hover:text-red-500 hover:border-red-500 transition-colors"
              >
                View All Gifts
              </button>
            </div>
          )}
        </div>

        {/* Show story and styling only when NOT in filtered view to keep it "full page" focus */}
        {!priceRange && (
          <>
            {/* Premium Visual Banner */}
            <section className="relative h-[300px] md:h-[450px] rounded-2xl overflow-hidden mb-16 shadow-lg group">
              <img 
                src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&h=600&auto=format&fit=crop" 
                alt="Diveera Elegant Women's Collection" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#4a2c2a]/60 to-transparent flex items-center px-10 md:px-20 text-white">
                <div className="max-w-md">
                  <span className="text-[#e8a3a3] font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4 block">Ethereal Beauty</span>
                  <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 leading-none">
                    Elegance In<br/>Every Detail
                  </h2>
                  <p className="text-gray-200 text-xs md:text-sm uppercase tracking-widest font-medium mb-8">
                    Luxury Fine Jewelry with 18K Rose Gold Plating
                  </p>
                  <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="border-b-2 border-white pb-1 font-bold uppercase text-[10px] md:text-xs tracking-widest hover:text-[#e8a3a3] hover:border-[#e8a3a3] transition-colors">
                    Explore Collection
                  </button>
                </div>
              </div>
            </section>

            {/* Celebrate Women - Gifting Guide */}
            <section className="bg-[#fff9fa] py-16 px-4 md:px-8 rounded-[2.5rem] mb-16 text-center">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-black text-[#5c3c3a] mb-3 tracking-tighter">
                  Celebrate Her
                </h2>
                <div className="flex items-center justify-center gap-4 mb-12">
                   <div className="h-[1px] w-8 md:w-16 bg-[#e8a3a3]" />
                   <p className="text-sm md:text-xl text-[#8a6a68] font-bold uppercase tracking-[0.2em]">
                     Gifts for Every Beautiful Relation
                   </p>
                   <div className="h-[1px] w-8 md:w-16 bg-[#e8a3a3]" />
                </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
                  {[
                    { label: 'SISTER', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=600&h=800&auto=format&fit=crop' },
                    { label: 'WIFE', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&h=800&auto=format&fit=crop' },
                    { label: 'MOTHER', image: 'https://images.unsplash.com/photo-1520333789090-1afc82db536a?q=80&w=600&h=800&auto=format&fit=crop' },
                    { label: 'FRIEND', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&h=800&auto=format&fit=crop' },
                    { label: 'YOURSELF', image: 'https://images.unsplash.com/photo-1529139513055-07f909ef3d0f?q=80&w=600&h=800&auto=format&fit=crop' }
                  ].map((item) => (
                    <div key={item.label} className="relative aspect-[3/4] rounded-[2rem] md:rounded-[3rem] overflow-hidden group shadow-xl border-4 border-white transform transition-transform duration-500 hover:-translate-y-2">
                      <img 
                        src={item.image} 
                        alt={item.label} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-x-2 md:inset-x-4 bottom-0">
                        <div className="bg-gradient-to-b from-[#fce4ec] to-[#f8bbd0] py-3 rounded-t-[1.5rem] md:rounded-t-[2rem] shadow-lg border-t border-white/50">
                          <span className="text-[10px] md:text-xs font-black text-[#880e4f] uppercase tracking-widest">
                            {item.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Full Collection Section */}
            <section className="mb-16">
              <div className="flex items-center justify-center gap-4 mb-10">
                <div className="h-[1px] w-8 md:w-16 bg-gray-200" />
                <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight">
                  The Full Collection
                </h2>
                <div className="h-[1px] w-8 md:w-16 bg-gray-200" />
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6 px-2">
                {womenProducts.slice(0, allVisibleCount).map((product, idx) => (
                  <motion.div
                    key={`${product.id}-full-her`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: (idx % 4) * 0.1 }}
                  >
                    <ProductCard product={product} compact={true} />
                  </motion.div>
                ))}
              </div>

              {allVisibleCount < womenProducts.length && (
                <div className="mt-16 text-center">
                  <button 
                    onClick={() => setAllVisibleCount(prev => prev + 12)}
                    className="group relative px-10 py-4 overflow-hidden rounded-full transition-all"
                  >
                    <div className="absolute inset-0 bg-[#4a2c2a] transition-transform duration-300 group-hover:scale-105" />
                    <span className="relative text-white text-[10px] md:text-xs font-black uppercase tracking-[0.3em] flex items-center gap-2">
                      Load More Designs
                      <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </div>
              )}
            </section>

            {/* Big Testimonial (Rose Gold Style) */}
            <section className="py-20 border-t border-gray-100 text-center bg-[#fffafa]">
                <div className="max-w-2xl mx-auto">
                  <span className="text-[#e8a3a3] text-4xl mb-6 block">★★★★★</span>
                  <p className="text-xl md:text-2xl font-bold text-[#5c3c3a] mb-8 leading-relaxed italic">
                    "I received the rose gold pendant as a gift and I've never received so many compliments. 
                    It feels so dainty yet strong. Truly beautiful packaging too!"
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                       <img src="https://i.pravatar.cc/150?u=a042581f4e290267041" alt="Buyer" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-sm uppercase tracking-widest text-[#4a2c2a]">Meera Singh</p>
                      <p className="text-gray-400 text-xs">Verified Buyer</p>
                    </div>
                  </div>
                </div>
            </section>
          </>
        )}
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
