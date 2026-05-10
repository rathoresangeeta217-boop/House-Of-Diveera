import { motion } from 'motion/react';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import ProductCard from './ProductCard';
import Navbar from './Navbar';
import Footer from './Footer';
import AnnouncementBar from './AnnouncementBar';
import WhatsAppButton from './WhatsAppButton';
import { ChevronRight, Gift, Sparkles, Heart, Clock } from 'lucide-react';

export default function HampersPage() {
  const [allVisibleCount, setAllVisibleCount] = useState(12);
  const productsRef = useRef<HTMLDivElement>(null);
  
  const hamperProducts = PRODUCTS.filter(p => p.category === 'Hampers');
  // If no hampers in constants yet, fallback to some items
  const productsToShow = hamperProducts.length > 0 ? hamperProducts : PRODUCTS.slice(0, 8);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <AnnouncementBar />
      <Navbar />
      
      {/* Hero Banner Section */}
      <section className="relative h-[400px] md:h-[600px] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1549465220-1d8c9d9c4701?q=80&w=1600&h=800&auto=format&fit=crop" 
          alt="Luxury Hampers" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex items-center">
          <div className="container mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl text-white"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-red-600 text-[10px] md:text-xs font-black px-3 py-1 rounded-full uppercase tracking-[0.2em]">New Launch</span>
                <div className="h-[1px] w-12 bg-white/30" />
              </div>
              <h1 className="text-4xl md:text-7xl font-sans font-black uppercase mb-6 leading-[0.9] tracking-tighter">
                Wrapped In <br/>
                <span className="text-red-500">Perfection</span>
              </h1>
              <p className="text-sm md:text-xl font-medium text-gray-200 mb-10 max-w-lg leading-relaxed">
                Our curated gift hampers are more than just presents—they're experiences. 
                Hand-picked jewelry paired with premium essentials for your special moments.
              </p>
              <button 
                onClick={() => productsRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-black px-8 py-4 rounded-full font-black uppercase text-[10px] md:text-xs tracking-[0.2em] hover:bg-red-600 hover:text-white transition-all shadow-xl flex items-center gap-3 group"
              >
                Shop Hampers
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <div className="bg-white border-b border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center gap-4 border-r border-gray-100 last:border-0">
             <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                <Sparkles size={18} />
             </div>
             <div>
               <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">Premium Curation</p>
               <p className="text-[9px] text-gray-500 uppercase tracking-tighter">Hand-picked Excellence</p>
             </div>
          </div>
          <div className="flex items-center gap-4 border-r border-gray-100 last:border-0 lg:block xl:flex">
             <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                <Clock size={18} />
             </div>
             <div>
               <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">Express Delivery</p>
               <p className="text-[9px] text-gray-500 uppercase tracking-tighter">Across 1000+ Cities</p>
             </div>
          </div>
          <div className="flex items-center gap-4 border-r border-gray-100 last:border-0 lg:block xl:flex">
             <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                <Heart size={18} />
             </div>
             <div>
               <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">Personalized Touch</p>
               <p className="text-[9px] text-gray-500 uppercase tracking-tighter">Add custom messages</p>
             </div>
          </div>
          <div className="flex items-center gap-4 last:border-0 lg:block xl:flex">
             <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                <Gift size={18} />
             </div>
             <div>
               <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">Luxury Packaging</p>
               <p className="text-[9px] text-gray-500 uppercase tracking-tighter">Eco-friendly & Elite</p>
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16" ref={productsRef}>
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="text-red-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">The Art of Gifting</span>
          <h2 className="text-4xl md:text-6xl font-black text-black uppercase tracking-tighter mb-6">
            Bestselling Hampers
          </h2>
          <div className="h-1 w-24 bg-red-600 mx-auto rounded-full mb-8" />
          <p className="max-w-2xl mx-auto text-gray-500 font-medium text-sm md:text-lg">
            Make every occasion unforgettable with our signature hampers. 
            Designed to bring smiles and celebrate bonds that last forever.
          </p>
        </div>

        {/* Categories/Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {[
            { title: 'For Her', tag: 'Elegant & Graceful', img: 'https://images.unsplash.com/photo-1512909006721-3d6018887183?q=80&w=800&h=600&auto=format&fit=crop', color: 'from-pink-500' },
            { title: 'For Him', tag: 'Bold & Sophisticated', img: 'https://images.unsplash.com/photo-1510255191414-7f9746f9914b?q=80&w=800&h=600&auto=format&fit=crop', color: 'from-blue-600' },
            { title: 'For Couples', tag: 'Celebrate Together', img: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=800&h=600&auto=format&fit=crop', color: 'from-red-600' }
          ].map((cat) => (
            <div key={cat.title} className="relative h-64 rounded-3xl overflow-hidden group shadow-lg">
              <img src={cat.img} alt={cat.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} to-transparent opacity-60`} />
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-80">{cat.tag}</p>
                <h3 className="text-2xl font-black uppercase tracking-tight">{cat.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-20">
          {productsToShow.slice(0, allVisibleCount).map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* View More / Browse More */}
        <div className="text-center mb-20">
          {allVisibleCount < productsToShow.length ? (
            <button 
              onClick={() => setAllVisibleCount(prev => prev + 8)}
              className="px-10 py-4 bg-red-600 text-white rounded-full font-black uppercase text-[10px] md:text-xs tracking-[0.2em] hover:bg-red-700 transition-all shadow-lg inline-flex items-center gap-2 group"
            >
              Discover More Hampers
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <Link 
              to="/collections/all"
              className="px-10 py-4 border-2 border-black text-black rounded-full font-black uppercase text-[10px] md:text-xs tracking-[0.2em] hover:bg-black hover:text-white transition-all inline-flex items-center gap-2 group"
            >
              Browse All Collections
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>

        {/* Big Promotional Banner - Image Only */}
        <section className="relative h-[250px] md:h-[450px] rounded-[3rem] overflow-hidden mb-20 shadow-2xl">
           <img 
             src="https://images.unsplash.com/photo-1549463778-312bb372b057?q=80&w=1600&auto=format&fit=crop" 
             alt="Gift box banner" 
             className="w-full h-full object-cover" 
           />
        </section>

        {/* FAQ - Quick section */}
        <section className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-black uppercase text-center mb-10">Gifting FAQ</h2>
          <div className="space-y-4">
             {[
               { q: "Can I add a personalized message?", a: "Yes, every hamper includes a complimentary gift card where we can print your heartwarming message." },
               { q: "How are the hampers packaged?", a: "We use premium, eco-friendly luxury boxes with foam padding and tissue wrap to ensure safe and beautiful delivery." },
               { q: "What is the delivery timeline?", a: "Most hampers are delivered within 3-5 business days across India. Express shipping is also available." }
             ].map((faq, idx) => (
               <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100">
                  <h4 className="font-bold text-sm uppercase text-black mb-2">{faq.q}</h4>
                  <p className="text-gray-500 text-sm">{faq.a}</p>
               </div>
             ))}
          </div>
        </section>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
