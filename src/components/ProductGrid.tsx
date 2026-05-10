import { PRODUCTS as MOCK_PRODUCTS } from '../constants';
import { motion } from 'motion/react';
import ProductCard from './ProductCard';
import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, onSnapshot, query, orderBy, where, getDocs, limit } from 'firebase/firestore';

export default function ProductGrid() {
  const [products, setProducts] = useState(MOCK_PRODUCTS);

  useEffect(() => {
    const q = query(
      collection(db, 'products'), 
      where('inDiveeraCollection', '==', true),
      orderBy('name', 'asc')
    );
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      if (!snapshot.empty) {
        const firestoreProducts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as any));
        setProducts(firestoreProducts);
      } else {
        // If none marked, try showing any latest products from Firestore
        try {
          const fallbackQ = query(collection(db, 'products'), limit(12));
          const fallbackSnapshot = await getDocs(fallbackQ);
          if (!fallbackSnapshot.empty) {
            const fallbackData = fallbackSnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            } as any));
            setProducts(fallbackData);
          } else {
            setProducts(MOCK_PRODUCTS.slice(0, 8));
          }
        } catch (error) {
          setProducts(MOCK_PRODUCTS.slice(0, 8));
        }
      }
    }, (error) => {
      console.error("Error fetching collection products:", error);
      // If index doesn't exist yet, show some fallback
      setProducts(MOCK_PRODUCTS.slice(0, 8));
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className="pt-20 pb-4 bg-white" id="products">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-2xl font-sans font-black text-diveera-dark flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
            </span>
            The Diveera <span className="text-red-600 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-red-600">Collections</span>
          </h2>
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
                staggerChildren: 0.15
              }
            }
          }}
          className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-2"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
              }}
            >
              <ProductCard product={product} compact={true} />
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <button className="btn-outline px-12">VIEW ALL PRODUCTS</button>
        </div>
      </div>
    </section>
  );
}
