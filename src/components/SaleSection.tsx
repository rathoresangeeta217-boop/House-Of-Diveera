import { PRODUCTS as FALLBACK_PRODUCTS } from '../constants';
import { motion } from 'motion/react';
import { Star, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, query, limit, where, onSnapshot, getDocs } from 'firebase/firestore';
import ProductCard from './ProductCard';
import { shuffle } from '../lib/utils';

export default function SaleSection() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'products'), 
      where('onSale', '==', true),
      limit(10)
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      try {
        if (!snapshot.empty) {
          const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setProducts(data);
          setLoading(false);
        } else {
          // If no products marked as onSale, show random selection for variety
          try {
            const fallbackQ = query(collection(db, 'products'), limit(20));
            const fallbackSnapshot = await getDocs(fallbackQ);
            if (!fallbackSnapshot.empty) {
              const fallbackData = fallbackSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
              setProducts(shuffle(fallbackData).slice(0, 10));
            } else {
              setProducts(shuffle(FALLBACK_PRODUCTS.filter(p => p.onSale)).slice(0, 4));
            }
          } catch (err) {
            setProducts(shuffle(FALLBACK_PRODUCTS.filter(p => p.onSale)).slice(0, 4));
          }
          setLoading(false);
        }
      } catch (err) {
        handleFirestoreError(err, OperationType.LIST, 'products');
        setProducts(shuffle(FALLBACK_PRODUCTS.filter(p => p.onSale)).slice(0, 4));
        setLoading(false);
      }
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, 'products');
      setProducts(shuffle(FALLBACK_PRODUCTS.filter(p => p.onSale)).slice(0, 4));
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className="py-8 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-sans font-black text-diveera-dark flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5 md:h-3 md:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 md:h-3 md:w-3 bg-red-600"></span>
            </span>
            Sale Is <span className="text-red-600 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-red-600">Live</span>
          </h2>
          <Link to="/collections/all" className="text-diveera-green text-[10px] md:text-xs font-black flex items-center gap-1 hover:underline uppercase tracking-widest">
            View All <ChevronRight size={14} />
          </Link>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.05
              }
            }
          }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6 pb-6"
        >
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-square bg-gray-50 animate-pulse rounded-xl" />
            ))
          ) : products.length > 0 ? products.map((product) => (
            <motion.div 
              key={product.id}
              variants={{
                hidden: { opacity: 0, scale: 0.95, y: 15 },
                show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
              }}
              className="w-full"
            >
              <ProductCard product={product} compact={true} />
            </motion.div>
          )) : (
            <div className="col-span-full py-10 text-center text-gray-400">
              No sale products found.
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
