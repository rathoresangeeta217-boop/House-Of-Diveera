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

const CATEGORIES = ['All', 'Rings', 'Earrings', 'Chains', 'Spiritual Picks', 'Pendants', 'Bracelets', 'Sets'];

export default function GiftsForHim() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [priceRange, setPriceRange] = useState<{ min: number; max: number; label: string } | null>(null);
  const [allVisibleCount, setAllVisibleCount] = useState(12);
  const productsRef = useRef<HTMLDivElement>(null);
  
  const menProducts = PRODUCTS.filter(p => p.category === 'Men');
  let filteredProducts = activeCategory === 'All' 
    ? menProducts 
    : menProducts.filter(p => p.name.toLowerCase().includes(activeCategory.toLowerCase()));

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
        <section className="relative h-[300px] md:h-[450px] overflow-hidden bg-[#1a1a1a]">
          <img 
            src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=1600&h=800&auto=format&fit=crop" 
            alt="Men's Jewelry Collection" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-sans font-extrabold text-3xl md:text-6xl uppercase mb-2 md:mb-4">
                Gifts For Him
              </h1>
              <p className="text-sm md:text-xl font-medium tracking-wide max-w-2xl mx-auto opacity-90">
                Discover our curated collection of premium jewelry for men. 
                Modern classics for the modern man.
              </p>
              <div className="mt-6 md:mt-8 flex items-center justify-center gap-4">
                <div className="h-[1px] w-8 md:w-16 bg-white/50" />
                <span className="text-[10px] md:text-sm uppercase tracking-widest font-bold">Diveera Men's Edition</span>
                <div className="h-[1px] w-8 md:w-16 bg-white/50" />
              </div>
            </motion.div>
          </div>
        </section>
      ) : (
        <section className="bg-black py-16 md:py-24 text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto"
          >
            <button 
              onClick={clearFilters}
              className="text-gray-400 hover:text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 mx-auto mb-6 transition-colors"
            >
              <ChevronRight className="rotate-180" size={14} />
              Back to All Gifts
            </button>
            <h1 className="text-white font-sans font-extrabold text-4xl md:text-7xl uppercase mb-4 tracking-tighter">
              {priceRange.label}
            </h1>
            <div className="h-1 w-24 bg-red-600 mx-auto rounded-full mb-6" />
            <p className="text-gray-400 text-sm md:text-lg font-medium uppercase tracking-[0.2em]">
              Premium Essentials For Men
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
            Gifts for Him
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
                  { name: 'Rings', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=300&h=300&auto=format&fit=crop' },
                  { name: 'Earrings', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=300&h=300&auto=format&fit=crop' },
                  { name: 'Chains', image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=300&h=300&auto=format&fit=crop' },
                  { name: 'Spiritual Picks', image: 'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?q=80&w=300&h=300&auto=format&fit=crop' },
                  { name: 'Pendants', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=300&h=300&auto=format&fit=crop' },
                  { name: 'Bracelets', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=300&h=300&auto=format&fit=crop' },
                  { name: 'Sets', image: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=300&h=300&auto=format&fit=crop' }
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
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                    <div className="absolute inset-x-0 bottom-0 py-3 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-center">
                      <span className="text-white font-bold uppercase tracking-widest text-[10px] md:text-sm">{cat.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Shop By Price (Visual - Premium Design) */}
            <div className="mb-12">
              <h2 className="text-sm font-extrabold uppercase tracking-widest mb-6">Shop by Price</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {[
                  { label: 'Under ₹500', min: 0, max: 500, icon: <Tag className="text-red-500" />, desc: 'Budget-friendly essentials', color: 'bg-red-50' },
                  { label: '₹501 - ₹999', min: 501, max: 999, icon: <Zap className="text-blue-500" />, desc: 'Most popular choices', color: 'bg-blue-50' },
                  { label: '₹1000 - ₹1499', min: 1000, max: 1499, icon: <IndianRupee className="text-green-500" />, desc: 'Premium style picks', color: 'bg-green-50' },
                ].map((range) => (
                  <button
                    key={range.label}
                    onClick={() => handlePriceClick(range.min, range.max, range.label)}
                    className={`group relative overflow-hidden rounded-2xl p-6 text-left transition-all hover:shadow-xl border-2 ${
                      priceRange?.min === range.min ? 'border-black bg-white' : 'border-transparent ' + range.color
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-white shadow-sm group-hover:scale-110 transition-transform`}>
                        {range.icon}
                      </div>
                      <ChevronRight className="text-gray-300 group-hover:text-black group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-black uppercase mb-1">
                      {range.label}
                    </h3>
                    <p className="text-gray-500 text-xs font-medium uppercase tracking-widest">
                      {range.desc}
                    </p>
                    
                    {/* Decorative element */}
                    <div className="absolute -right-2 -bottom-2 opacity-5 scale-150 group-hover:scale-125 group-hover:opacity-10 transition-all">
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
                  ? 'bg-black text-white border-black' 
                  : 'bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black'
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
                    ? 'bg-black text-white border-black' 
                    : 'bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
             {priceRange && (
               <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-black bg-gray-100 px-3 py-1.5 rounded-full">
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6 mb-16">
              {filteredProducts.slice(0, 8).map((product, idx) => (
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
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200 mb-16">
              <p className="text-gray-400 font-bold uppercase tracking-widest mb-4">No products found for {priceRange ? priceRange.label : activeCategory}</p>
              <button 
                onClick={clearFilters}
                className="text-black font-bold uppercase text-xs tracking-tighter border-b-2 border-black pb-1 hover:text-red-500 hover:border-red-500 transition-colors"
              >
                View All Products
              </button>
            </div>
          )}
        </div>

        {/* Show story and styling only when NOT in filtered view to keep it "full page" focus */}
        {!priceRange && (
          <>
            {/* Premium Visual Banner (Same size as previous section) */}
            <section className="relative h-[300px] md:h-[450px] rounded-2xl overflow-hidden mb-16 shadow-lg group">
              <img 
                src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1200&h=600&auto=format&fit=crop" 
                alt="Diveera Premium Men's Collection" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center px-10 md:px-20 text-white">
                <div className="max-w-md">
                  <span className="text-red-500 font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4 block">New Season</span>
                  <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 leading-none">
                    Uncompromising<br/>Quality
                  </h2>
                  <p className="text-gray-200 text-xs md:text-sm uppercase tracking-widest font-medium mb-8">
                    Crafted in 925 Sterling with Rhodium Finish
                  </p>
                  <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="border-b-2 border-white pb-1 font-bold uppercase text-[10px] md:text-xs tracking-widest hover:text-red-500 hover:border-red-500 transition-colors">
                    Explore Collection
                  </button>
                </div>
              </div>
            </section>

            {/* Celebrate Men - Gifting Guide (As per image) */}
            <section className="bg-[#f7f0eb] py-16 px-4 md:px-8 rounded-[2.5rem] mb-16 text-center">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-black text-[#3d2416] mb-3 tracking-tighter">
                  Celebrate Men
                </h2>
                <p className="text-sm md:text-xl text-gray-600 font-bold uppercase tracking-[0.2em] mb-12">
                  A Gifting Guide For Them
                </p>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  {[
                    { label: 'BROTHERS', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&h=800&auto=format&fit=crop' },
                    { label: 'HUSBANDS', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&h=800&auto=format&fit=crop' },
                    { label: 'COUPLE GIFTS', image: 'https://images.unsplash.com/photo-1510255191414-7f9746f9914b?q=80&w=600&h=800&auto=format&fit=crop' },
                    { label: 'BOYFRIENDS', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&h=800&auto=format&fit=crop' }
                  ].map((item) => (
                    <div key={item.label} className="relative aspect-[3/4] rounded-[2rem] md:rounded-[3rem] overflow-hidden group shadow-xl border-4 border-white transform transition-transform duration-500 hover:-translate-y-2">
                      <img 
                        src={item.image} 
                        alt={item.label} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-x-4 bottom-0">
                        <div className="bg-gradient-to-b from-[#f3e3b3] to-[#e6cc81] py-3 rounded-t-[1.5rem] md:rounded-t-[2rem] shadow-lg border-t border-white/50">
                          <span className="text-[10px] md:text-sm font-black text-black uppercase tracking-widest">
                            {item.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Full Collection Section - 3 horizontal lines (12 products) initially */}
            <section className="mb-16">
              <div className="flex items-center justify-center gap-4 mb-10">
                <div className="h-[1px] w-8 md:w-16 bg-gray-200" />
                <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight">
                  Discover Full Collection
                </h2>
                <div className="h-[1px] w-8 md:w-16 bg-gray-200" />
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6 px-2">
                {menProducts.slice(0, allVisibleCount).map((product, idx) => (
                  <motion.div
                    key={`${product.id}-full`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: (idx % 4) * 0.1 }}
                  >
                    <ProductCard product={product} compact={true} />
                  </motion.div>
                ))}
              </div>

              {allVisibleCount < menProducts.length && (
                <div className="mt-16 text-center">
                  <button 
                    onClick={() => setAllVisibleCount(prev => prev + 12)}
                    className="group relative px-10 py-4 overflow-hidden rounded-full transition-all"
                  >
                    <div className="absolute inset-0 bg-black transition-transform duration-300 group-hover:scale-105" />
                    <span className="relative text-white text-[10px] md:text-xs font-black uppercase tracking-[0.3em] flex items-center gap-2">
                      View More Collection
                      <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </div>
              )}
            </section>

            {/* Big Testimonial */}
            <section className="py-20 border-t border-gray-100 text-center">
                <div className="max-w-2xl mx-auto">
                  <span className="text-yellow-500 text-4xl mb-6 block">★★★★★</span>
                  <p className="text-xl md:text-2xl font-bold text-gray-800 mb-8 leading-relaxed">
                    "Finding quality fine jewelry for men was always a struggle until I found House of Diveera. 
                    The finish is incredible and it feels substantial."
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                       <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Avi" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-sm uppercase tracking-widest">Avi Rathore</p>
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
