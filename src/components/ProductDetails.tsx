import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS, Product } from '../constants';
import { db } from '../lib/firebase';
import { doc, getDoc, collection, addDoc, query, where, onSnapshot, serverTimestamp, orderBy } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, 
  Heart, 
  Share2, 
  ShoppingCart, 
  Zap, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  Minus,
  Plus,
  ChevronRight,
  Info,
  User,
  MessageSquare,
  ThumbsUp
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import AnnouncementBar from './AnnouncementBar';
import WhatsAppButton from './WhatsAppButton';
import ProductCard from './ProductCard';
import HamperSection from './HamperSection';
import { handleFirestoreError, OperationType } from '../lib/firebase';

export default function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isGiftWrapped, setIsGiftWrapped] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<null | 'success' | 'error'>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  
  // Reviews State
  const [reviews, setReviews] = useState<any[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '', name: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    if (!productId) return;

    const q = query(
      collection(db, 'reviews'),
      where('productId', '==', productId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedReviews = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Sort client-side to avoid needing a composite index in Firestore
      fetchedReviews.sort((a: any, b: any) => {
        const dateA = a.createdAt?.seconds || 0;
        const dateB = b.createdAt?.seconds || 0;
        return dateB - dateA;
      });
      setReviews(fetchedReviews);
      setLoadingReviews(false);
    }, (error) => {
      console.error("Error fetching reviews:", error);
      setLoadingReviews(false);
    });

    return () => unsubscribe();
  }, [productId]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId || !newReview.comment || !newReview.name) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'reviews'), {
        productId,
        rating: newReview.rating,
        comment: newReview.comment,
        name: newReview.name,
        createdAt: serverTimestamp(),
        verified: true // Assuming verified for now as demo
      });
      setNewReview({ rating: 5, comment: '', name: '' });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'reviews');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        if (!productId) return;

        // Try Firebase first
        const docRef = doc(db, 'products', productId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = { id: docSnap.id, ...docSnap.data() } as any;
          setProduct(data);
          // Find related products (same category)
          const related = PRODUCTS.filter((p: Product) => p.category === data.category && p.id !== data.id).slice(0, 4);
          setRelatedProducts(related);
        } else {
          // Fallback to static data
          const staticProduct = PRODUCTS.find((p: Product) => p.id === productId);
          if (staticProduct) {
            setProduct(staticProduct);
            const related = PRODUCTS.filter((p: Product) => p.category === staticProduct.category && p.id !== staticProduct.id).slice(0, 4);
            setRelatedProducts(related);
          }
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
        window.scrollTo(0, 0);
      }
    };

    fetchProduct();
  }, [productId]);

  const handlePincodeCheck = () => {
    if (pincode.length === 6) {
      setPincodeStatus('success');
    } else {
      setPincodeStatus('error');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-diveera-green border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4 text-center">
        <h2 className="text-2xl font-black mb-4">Product Not Found</h2>
        <p className="text-diveera-grey mb-8">The product you are looking for doesn't exist or has been removed.</p>
        <Link to="/" className="bg-diveera-green text-white px-8 py-3 rounded-full font-black uppercase tracking-wider">
          Go Back Home
        </Link>
      </div>
    );
  }

  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
  
  // Use multiple shots if available
  const mainImage = product.image || (product as any).imageUrl || 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&h=600&auto=format&fit=crop';
  const productImages = [mainImage, ...(product.additionalImages || [])].filter(url => !!url && url !== 'Demo');

  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Navbar />

      <main className="pt-[100px] pb-20">
        <div className="container mx-auto px-4 md:px-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-[9px] md:text-xs text-diveera-grey mb-6 overflow-x-auto no-scrollbar whitespace-nowrap">
            <Link to="/" className="hover:text-diveera-green">HOME</Link>
            <ChevronRight size={14} />
            <Link to={`/collections/${product.category.toLowerCase()}`} className="hover:text-diveera-green uppercase">{product.category}</Link>
            <ChevronRight size={14} />
            <span className="text-diveera-dark font-black uppercase truncate">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Image Gallery (Sticky) */}
            <div className="lg:col-span-7 lg:sticky lg:top-[120px]">
              <div className="flex flex-col-reverse md:flex-row gap-4">
                {/* Thumbnails */}
                <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto no-scrollbar md:w-20 lg:w-24 shrink-0">
                  {productImages.map((img: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all shrink-0 w-16 md:w-full ${
                        selectedImage === idx ? 'border-diveera-green' : 'border-transparent bg-gray-50'
                      }`}
                    >
                      <img 
                        src={img || 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&h=600&auto=format&fit=crop'} 
                        alt="" 
                        className="w-full h-full object-cover" 
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&h=600&auto=format&fit=crop';
                        }}
                      />
                    </button>
                  ))}
                </div>

                {/* Main Image */}
                <div className="flex-grow relative aspect-square rounded-2xl overflow-hidden bg-gray-50 group">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={selectedImage}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      src={productImages[selectedImage] || 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&h=600&auto=format&fit=crop'}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&h=600&auto=format&fit=crop';
                      }}
                    />
                  </AnimatePresence>
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isBestSeller && (
                      <span className="bg-yellow-400 text-black text-[10px] md:text-xs font-black px-3 py-1 rounded shadow-sm">
                        BEST SELLER
                      </span>
                    )}
                    {discount > 0 && (
                      <span className="bg-red-500 text-white text-[10px] md:text-xs font-black px-3 py-1 rounded shadow-sm">
                        {discount}% OFF
                      </span>
                    )}
                  </div>

                  <button className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur rounded-full text-diveera-grey hover:text-red-500 transition-colors shadow-md">
                    <Heart size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="mb-4">
                <p className="text-diveera-green font-black text-[10px] md:text-xs uppercase tracking-widest mb-1">
                  {product.category}
                </p>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h1 className="text-xl md:text-2xl font-sans font-black text-diveera-dark leading-tight">
                    {product.name}
                  </h1>
                  <button 
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: product.name,
                          text: `Check out this beautiful ${product.name} on Diveera!`,
                          url: window.location.href,
                        });
                      } else {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Link copied to clipboard!');
                      }
                    }}
                    className="p-2 text-diveera-grey hover:text-diveera-green transition-colors"
                    title="Share Product"
                  >
                    <Share2 size={20} />
                  </button>
                </div>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center bg-gray-100 px-2 py-0.5 rounded-lg">
                    <Star size={14} className="text-yellow-500 fill-current" />
                    <span className="ml-1 font-black text-xs">{product.rating}</span>
                  </div>
                  <span className="text-diveera-grey text-xs font-medium border-l pl-3">
                    {product.reviews} Reviews
                  </span>
                </div>

                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-2xl md:text-3xl font-black text-diveera-dark">₹{(product.price + (isGiftWrapped ? 50 : 0)).toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-diveera-grey line-through font-medium">₹{product.originalPrice.toLocaleString()}</span>
                  )}
                  {discount > 0 && (
                    <span className="text-base text-green-600 font-bold">-{discount}%</span>
                  )}
                </div>
                <p className="text-[9px] md:text-[10px] text-diveera-grey font-bold uppercase tracking-wider">
                  Inclusive of all taxes
                </p>
              </div>

              {/* Quantity & Actions */}
              <div className="mb-6 p-5 border rounded-xl bg-gray-50/50">
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-3 py-2 px-1">
                    <label className="relative flex items-center cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="peer sr-only" 
                        checked={isGiftWrapped}
                        onChange={() => setIsGiftWrapped(!isGiftWrapped)}
                      />
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:bg-diveera-green peer-checked:border-diveera-green transition-all group-hover:border-diveera-green flex items-center justify-center">
                        <div className={`w-2 h-3 border-r-2 border-b-2 border-white rotate-45 mb-0.5 ${isGiftWrapped ? 'block' : 'hidden'}`} />
                      </div>
                    </label>
                    <p className="text-[13px] font-medium text-diveera-dark">
                      Is this a <span className="text-diveera-green font-bold">Gift?</span> 🎁 Wrap it for just <span className="font-bold font-sans">(₹50)</span>
                    </p>
                  </div>

                  <div>
                    <label className="text-[9px] font-black uppercase mb-2 block text-diveera-grey">Quantity</label>
                    <div className="flex items-center w-28 border-2 border-diveera-dark/10 bg-white rounded-lg overflow-hidden hover:border-diveera-green transition-colors">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 text-diveera-dark hover:bg-gray-100 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="flex-grow text-center font-black text-base">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2 text-diveera-dark hover:bg-gray-100 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <button className="flex-1 bg-white border-2 border-diveera-dark text-diveera-dark px-4 py-3 rounded-lg font-black uppercase text-xs tracking-wider flex items-center justify-center gap-2 hover:bg-diveera-dark hover:text-white transition-all duration-300">
                      <ShoppingCart size={18} />
                      Add To Cart
                    </button>
                    <button className="flex-1 bg-diveera-green text-white px-4 py-3 rounded-lg font-black uppercase text-xs tracking-wider flex items-center justify-center gap-2 hover:bg-diveera-dark transition-all duration-300 shadow-lg shadow-diveera-green/20">
                      <Zap size={18} className="fill-current" />
                      Buy It Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Pincode Check */}
              <div className="mb-6 border rounded-2xl p-4 bg-gray-50/30 overflow-hidden">
                {!pincodeStatus || pincodeStatus === 'error' ? (
                  <div className="flex flex-col gap-3">
                    <h3 className="text-[10px] font-black uppercase flex items-center gap-2 text-diveera-grey">
                      <Truck size={14} className="text-diveera-green" />
                      Check Delivery Support
                    </h3>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Enter Pincode" 
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        className="flex-grow border-2 rounded-lg px-3 py-2 text-sm outline-none focus:border-diveera-green transition-colors bg-white font-sans"
                      />
                      <button 
                        onClick={handlePincodeCheck}
                        className="bg-diveera-dark text-white px-4 py-2 rounded-lg font-black text-[10px] uppercase transition-transform active:scale-95"
                      >
                        Check
                      </button>
                    </div>
                    {pincodeStatus === 'error' && (
                      <p className="text-red-500 text-[9px] font-bold">Please enter a valid 6-digit pincode</p>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-pink-400">📍</span>
                        <span className="text-[11px] font-bold text-diveera-dark font-sans tracking-tight">Deliver to {pincode}</span>
                      </div>
                      <button 
                        onClick={() => {
                          setPincodeStatus(null);
                          setPincode('');
                        }}
                        className="text-[10px] font-bold text-pink-500 hover:underline"
                      >
                        Change
                      </button>
                    </div>

                    <div className="bg-white/80 rounded-xl p-3 border border-gray-100 flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-diveera-green animate-pulse" />
                      <div>
                        <p className="text-[11px] leading-tight text-diveera-dark font-medium">
                          {pincode.startsWith('302') ? 'Free Delivery' : 'Standard Delivery'} by <span className="font-black text-diveera-dark">
                            {(() => {
                              const d = new Date();
                              // Jaipur (302) gets 7 days, others get 10
                              const days = pincode.startsWith('302') ? 7 : 10;
                              d.setDate(d.getDate() + days);
                              return d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
                            })()}
                          </span>
                        </p>
                        <p className="text-[10px] text-diveera-grey mt-0.5">Order within <span className="font-black text-diveera-dark">14 hours 57 minutes</span></p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* USPs */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="flex items-start gap-2.5 p-3 bg-cream rounded-xl border border-diveera-green/10">
                  <Zap className="text-diveera-green shrink-0" size={16} />
                  <div>
                    <p className="text-[9px] font-black uppercase leading-none mb-1">Trending Design</p>
                    <p className="text-[8px] text-diveera-grey">Most loved by our community</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 p-3 bg-cream rounded-xl border border-diveera-green/10">
                  <RotateCcw className="text-diveera-green shrink-0" size={16} />
                  <div>
                    <p className="text-[9px] font-black uppercase leading-none mb-1">Easy 7 Days Return</p>
                    <p className="text-[8px] text-diveera-grey">No questions asked policy</p>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-t pt-6">
                <div className="flex gap-6 border-b pb-3 mb-4 sticky top-[100px] bg-white z-10 overflow-x-auto no-scrollbar">
                  {['description', 'specifications', 'shipping', 'reviews'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-colors relative ${
                        activeTab === tab ? 'text-diveera-green' : 'text-diveera-grey hover:text-diveera-dark'
                      }`}
                    >
                      {tab} {tab === 'reviews' && reviews.length > 0 && `(${reviews.length})`}
                      {activeTab === tab && (
                        <motion.div layoutId="activeTab" className="absolute -bottom-3 left-0 right-0 h-0.5 bg-diveera-green" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="min-h-[80px]">
                  {activeTab === 'reviews' && (
                    <div className="space-y-8">
                      {/* Review Stats */}
                      <div className="flex flex-col md:flex-row gap-6 md:items-center bg-gray-50 p-6 rounded-2xl border border-gray-100">
                        <div className="text-center md:border-r md:pr-10">
                          <h4 className="text-4xl font-black text-diveera-dark mb-1">
                            {reviews.length > 0 
                              ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) 
                              : product.rating}
                          </h4>
                          <div className="flex items-center justify-center gap-1 mb-2">
                             {[...Array(5)].map((_, i) => (
                               <Star key={i} size={14} className={i < Math.round(product.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'} />
                             ))}
                          </div>
                          <p className="text-[10px] font-black text-diveera-grey uppercase tracking-wider">{reviews.length} Customer Reviews</p>
                        </div>
                        
                        <div className="flex-grow space-y-2">
                          {[5, 4, 3, 2, 1].map(star => {
                            const count = reviews.filter(r => r.rating === star).length;
                            const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                            return (
                              <div key={star} className="flex items-center gap-3">
                                <span className="text-[10px] font-bold w-3">{star}</span>
                                <div className="flex-grow h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                  <div className="h-full bg-yellow-500" style={{ width: `${percentage}%` }} />
                                </div>
                                <span className="text-[10px] text-diveera-grey w-8 text-right font-medium">{count}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Add Review */}
                      <div className="bg-white border rounded-2xl p-6 shadow-sm">
                        <h4 className="text-sm font-black uppercase mb-4 flex items-center gap-2">
                          <MessageSquare size={16} className="text-diveera-green" />
                          Write a Review
                        </h4>
                        <form onSubmit={handleSubmitReview} className="space-y-4">
                          <div>
                            <p className="text-[10px] font-bold text-diveera-grey uppercase mb-2">Your Rating</p>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  type="button"
                                  onMouseEnter={() => setHoverRating(star)}
                                  onMouseLeave={() => setHoverRating(0)}
                                  onClick={() => setNewReview({ ...newReview, rating: star })}
                                  className="p-1 transition-transform active:scale-90"
                                >
                                  <Star 
                                    size={24} 
                                    className={`${
                                      star <= (hoverRating || newReview.rating) 
                                        ? 'text-yellow-500 fill-current' 
                                        : 'text-gray-200'
                                    } transition-colors`} 
                                  />
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <input 
                               type="text" 
                               placeholder="Your Name" 
                               required
                               value={newReview.name}
                               onChange={e => setNewReview({ ...newReview, name: e.target.value })}
                               className="w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none focus:border-diveera-green text-sm"
                             />
                             <div className="relative group">
                                <textarea 
                                  placeholder="Share your experience with this product..." 
                                  required
                                  rows={1}
                                  value={newReview.comment}
                                  onChange={e => setNewReview({ ...newReview, comment: e.target.value })}
                                  className="w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none focus:border-diveera-green text-sm resize-none"
                                />
                             </div>
                          </div>
                          <button 
                            disabled={isSubmitting}
                            className="bg-diveera-dark text-white px-8 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-diveera-green transition-colors disabled:opacity-50"
                          >
                            {isSubmitting ? 'Posting...' : 'Submit Review'}
                          </button>
                        </form>
                      </div>

                      {/* Review List */}
                      <div className="space-y-6">
                        {loadingReviews ? (
                          <div className="flex justify-center p-8">
                             <div className="w-8 h-8 border-3 border-diveera-green border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        ) : reviews.length > 0 ? (
                          reviews.map((review) => (
                            <div key={review.id} className="border-b pb-6 last:border-0">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-diveera-green/10 rounded-full flex items-center justify-center text-diveera-green border border-diveera-green/20">
                                    <User size={20} />
                                  </div>
                                  <div>
                                    <h5 className="text-[13px] font-black">{review.name}</h5>
                                    <div className="flex items-center gap-2 mt-0.5">
                                      <div className="flex gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                          <Star key={i} size={10} className={i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-200'} />
                                        ))}
                                      </div>
                                      <span className="text-[9px] text-diveera-grey uppercase font-bold tracking-wider">
                                        {review.createdAt?.toDate().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                {review.verified && (
                                  <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded text-[9px] font-black text-green-600 uppercase tracking-tighter">
                                    <ShieldCheck size={10} /> Verified
                                  </div>
                                )}
                              </div>
                              <p className="text-[13px] text-diveera-dark/80 leading-relaxed font-medium pl-13">
                                {review.comment}
                              </p>
                              <div className="mt-4 pl-13 flex items-center gap-4">
                                <button className="flex items-center gap-1 text-[10px] font-bold text-diveera-grey hover:text-diveera-green">
                                  <ThumbsUp size={12} /> Useful {review.likes || 0}
                                </button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-12 bg-gray-50/50 rounded-2xl border-2 border-dashed">
                             <MessageSquare className="mx-auto text-gray-300 mb-2" size={32} />
                             <p className="text-xs font-bold text-diveera-grey uppercase tracking-widest">No reviews yet. Be the first to share your thoughts!</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  {activeTab === 'description' && (
                    <div className="prose prose-sm max-w-none text-diveera-dark/80 text-[13px] leading-relaxed font-medium">
                      {product.description ? (
                        <div dangerouslySetInnerHTML={{ __html: product.description.replace(/\n/g, '<br/>') }} />
                      ) : (
                        <>
                          <p>Experience the epitome of elegance with the {product.name}. A masterpiece from our {product.category} collection, this piece is designed to celebrate your unique story.</p>
                          <p className="mt-3">Perfect for both daily wear and special occasions, it adds a touch of sophistication to any ensemble. Handcrafted with precision and love by artisan craftsmen.</p>
                        </>
                      )}
                    </div>
                  )}
                  {activeTab === 'specifications' && (
                    <ul className="space-y-2">
                      {(product.specifications && Array.isArray(product.specifications)) ? (
                        product.specifications.map((spec: any, i: number) => (
                          <li key={i} className="flex justify-between border-b border-dashed pb-1.5 text-[10px] md:text-sm">
                            <span className="text-diveera-grey font-bold uppercase">{spec.label}</span>
                            <span className="text-diveera-dark font-black">{spec.value}</span>
                          </li>
                        ))
                      ) : (
                        [
                          { label: 'Material', value: '925 Hallmarked Fine Jewelry' },
                          { label: 'Stone', value: 'AAA Crystal / Pearl' },
                          { label: 'Weight', value: '4.5g' },
                          { label: 'Chain Length', value: '16 inch + 2 inch adjustable' },
                          { label: 'Finish', value: 'High Polish White Rhodium' }
                        ].map((spec, i) => (
                          <li key={i} className="flex justify-between border-b border-dashed pb-1.5 text-[10px] md:text-sm">
                            <span className="text-diveera-grey font-bold uppercase">{spec.label}</span>
                            <span className="text-diveera-dark font-black">{spec.value}</span>
                          </li>
                        ))
                      )}
                    </ul>
                  )}
                  {activeTab === 'shipping' && (
                    <div className="text-[10px] md:text-sm text-diveera-dark/80 space-y-3 font-medium">
                      {product.shippingInfo ? (
                        <div className="flex items-start gap-2.5">
                          <Truck className="text-diveera-green" size={16} />
                          <p dangerouslySetInnerHTML={{ __html: product.shippingInfo.replace(/\n/g, '<br/>') }} />
                        </div>
                      ) : (
                        <>
                          <div className="flex items-start gap-2.5">
                            <Truck className="text-diveera-green" size={16} />
                            <p>Free standard shipping on all orders above ₹999. Delivered within 3-5 business days across India.</p>
                          </div>
                          <div className="flex items-start gap-2.5">
                            <ShieldCheck className="text-diveera-green" size={16} />
                            <p>Every piece comes in a signature Diveera gift box with a certificate of authenticity and a jewelry care kit.</p>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <section className="mt-12 pt-12 border-t">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-sans font-black flex items-center gap-3">
                  <span className="w-8 h-1 px-1 bg-diveera-green hidden sm:block"></span>
                  Pairs Perfect With
                </h2>
                <Link to={`/collections/${product.category.toLowerCase()}`} className="text-[10px] font-black uppercase flex items-center gap-1 group">
                  View All
                  <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}

          {/* Hampers Section */}
          <div className="mt-8">
            <HamperSection />
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />

      {/* Sticky Bottom Actions (Mobile) */}
      <div className="lg:hidden fixed bottom-16 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t z-50 flex gap-3">
        <button className="flex-1 bg-diveera-dark text-white py-3 rounded-xl font-black uppercase text-xs flex items-center justify-center gap-2">
          <ShoppingCart size={16} />
          Add To Cart
        </button>
        <button className="flex-1 bg-diveera-green text-white py-3 rounded-xl font-black uppercase text-xs flex items-center justify-center gap-2">
          <Zap size={16} fill="currentColor" />
          Buy Now
        </button>
      </div>
    </div>
  );
}
