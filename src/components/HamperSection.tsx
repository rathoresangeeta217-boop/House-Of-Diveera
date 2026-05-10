import { PRODUCTS as FALLBACK_PRODUCTS } from '../constants';
import { motion } from 'motion/react';
import { ChevronRight, ShoppingCart, Gift, Zap, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../lib/firebase';
import { collection, getDocs, query, limit, where } from 'firebase/firestore';
import ProductCard from './ProductCard';
import { shuffle } from '../lib/utils';

export default function HamperSection() {
  const [products, setProducts] = useState<any[]>(() => {
    const hamperFallback = FALLBACK_PRODUCTS.filter(p => p.category === 'Hampers');
    return shuffle(hamperFallback.length > 0 ? hamperFallback : FALLBACK_PRODUCTS).slice(0, 4);
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const q = query(
        collection(db, 'products'), 
        where('category', 'in', ['Hampers', 'Gift Sets', 'Gifts']),
        limit(10)
      );
      try {
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (data.length > 0) setProducts(data);
        else {
          // Fallback if no hampers found
          const fallbackQ = query(collection(db, 'products'), limit(20));
          const fallbackSnapshot = await getDocs(fallbackQ);
          const fallbackData = fallbackSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          if (fallbackData.length > 0) setProducts(shuffle(fallbackData).slice(0, 10));
          else setProducts(shuffle(FALLBACK_PRODUCTS).slice(0, 10));
        }
      } catch (error) {
        console.error("Error fetching hampers:", error);
        setProducts(shuffle(FALLBACK_PRODUCTS).slice(0, 10));
      }
    };
    fetchProducts();
  }, []);

  return (
    <section id="hampers" className="pt-2 pb-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl md:text-2xl font-sans font-black text-diveera-dark flex items-center gap-3">
            <div className="flex items-center gap-2 bg-red-50 px-3 py-1 rounded-full border border-red-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
              <span className="text-red-600 text-[10px] tracking-tighter">LIVE</span>
            </div>
            Exquisite <span className="text-red-600 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-red-600">Hampers</span>
          </h2>
          <Link to="/hampers" className="text-red-600 text-xs font-black flex items-center gap-1 hover:underline">
            View All <ChevronRight size={16} />
          </Link>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6 pb-6"
        >
          {products.map((product) => (
            <motion.div 
              key={product.id}
              variants={{
                hidden: { opacity: 0, scale: 0.9, y: 20 },
                show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
              }}
              className="w-full"
            >
              <ProductCard product={product} compact={true} />
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <Link 
            to="/hampers"
            className="inline-flex items-center gap-2 px-10 py-4 bg-red-600 text-white rounded-full font-black uppercase text-[10px] md:text-xs tracking-[0.2em] hover:bg-red-700 transition-all shadow-lg group"
          >
            View All Hampers
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
