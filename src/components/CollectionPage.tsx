import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Filter, ChevronDown, LayoutGrid, List, SlidersHorizontal } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import AnnouncementBar from './AnnouncementBar';
import ProductCard from './ProductCard';
import WhatsAppButton from './WhatsAppButton';
import { db } from '../lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { PRODUCTS as MOCK_PRODUCTS, CATEGORIES } from '../constants';

export default function CollectionPage() {
  const { categorySlug } = useParams();
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [sortBy, setSortBy] = useState('featured');
  const [loading, setLoading] = useState(true);

  // Helper to get category name from slug
  const getCategoryName = (slug: string) => {
    return CATEGORIES.find(c => c.name.toLowerCase().replace(/\s+/g, '-') === slug)?.name || 
           slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const categoryName = categorySlug ? getCategoryName(categorySlug) : 'All Products';

  useEffect(() => {
    setLoading(true);
    // Real-time listener for products in this category
    const q = categorySlug === 'all' 
      ? query(collection(db, 'products'))
      : query(collection(db, 'products'), where('category', '==', categoryName));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let filteredProducts = [];
      if (!snapshot.empty) {
        filteredProducts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as any));
      } else {
        // Fallback to mock data for demo if no products in DB
        filteredProducts = MOCK_PRODUCTS.filter(p => 
          categorySlug === 'all' || p.category === categoryName
        );
      }
      setProducts(filteredProducts);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching products:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [categorySlug, categoryName]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'newest') return (b as any).createdAt?.seconds - (a as any).createdAt?.seconds;
    return 0; // Default featured
  });

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      
      <main className="min-h-screen pt-[100px] bg-white">
        {/* Banner Section */}
        <section className="bg-white pt-2 pb-10 mb-4 border-b">
          <div className="container mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-black italic text-diveera-dark relative inline-block">
                {categoryName}
                <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-red-600 rounded-full"></span>
              </h1>
            </motion.div>
          </div>
        </section>

        <section className="container mx-auto px-6 pb-20">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-6 mb-8">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 border px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-gray-50 transition-colors">
                <SlidersHorizontal size={16} /> Filters
              </button>
              <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest whitespace-nowrap">
                {products.length} Products
              </p>
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-2 text-gray-400">
                <LayoutGrid size={18} className="text-diveera-dark" />
                <List size={18} className="cursor-pointer hover:text-diveera-dark" />
              </div>
              <div className="relative group">
                <button className="flex items-center gap-2 font-black text-xs uppercase tracking-wider">
                  Sort By: {sortBy.replace('-', ' ')} <ChevronDown size={14} />
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
                  {['featured', 'newest', 'price-low', 'price-high'].map((option) => (
                    <button
                      key={option}
                      onClick={() => setSortBy(option)}
                      className={`w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-wider hover:bg-gray-50 transition-colors ${sortBy === option ? 'text-diveera-green' : 'text-gray-600'}`}
                    >
                      {option.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-diveera-green border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-2">
              {sortedProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <ProductCard product={product} compact={true} />
                </motion.div>
              ))}
            </div>
          )}

          {!loading && products.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-xl font-black mb-2">No products found</h3>
              <p className="text-gray-500">Try checking back later or explore other categories.</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
