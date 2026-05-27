import { Product } from '../constants';
import { Heart, Star, ShoppingCart, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
  layout?: 'vertical' | 'horizontal';
}

export default function ProductCard({ product, compact = false, layout = 'vertical', ...props }: ProductCardProps & { key?: string }) {
  if (layout === 'horizontal') {
    return (
      <motion.div
        {...props}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="group relative bg-[#f8f9fa] border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 w-full"
      >
        <div className="flex bg-white p-2 md:p-3 h-full">
          {/* Left Side: Image container */}
          <div className="w-[40%] md:w-[45%] relative rounded-xl overflow-hidden bg-[#e5e5e5] shrink-0">
            <Link to={`/products/${product.id}`} className="block w-full h-full aspect-square">
              <img 
                src={product.image || (product as any).imageUrl || 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&h=600&auto=format&fit=crop'} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&h=600&auto=format&fit=crop';
                }}
              />
            </Link>
            
            {/* Badges on image */}
            <div className="absolute top-1 left-1 flex flex-col gap-1">
              {product.tag && (
                <span className={cn(
                  "text-white font-bold px-1.5 py-0.5 border border-white/20 rounded-sm flex items-center gap-1 uppercase tracking-tighter shadow-sm text-[8px] md:text-[9px]",
                  product.tag.toLowerCase().includes('off') ? "bg-black" : "bg-[#1a1a1a]"
                )}>
                   {product.tag.toLowerCase().includes('launch') ? '⚡' : product.tag.toLowerCase().includes('off') ? '🏷️' : ''} {product.tag}
                </span>
              )}
            </div>

            {/* Bottom yellow bar on image */}
            <div className="absolute bottom-0 left-0 right-0 bg-[#fecb01] text-black text-center font-bold text-[9px] md:text-[10px] py-1 truncate px-1">
              {(product as any).features?.[0] || 'Premium Audio'}
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="w-[60%] md:w-[55%] flex flex-col pl-3 md:pl-4 py-1 relative">
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-1.5">
              <div className="flex items-center gap-1 font-bold text-[10px] md:text-xs">
                <Star size={10} className="text-[#fecb01] fill-[#fecb01]" />
                {product.rating} <span className="text-gray-300">|</span> 
                <span>{product.reviews || Math.floor(Math.random() * 500) + 10}</span>
                <CheckCircle2 size={10} className="text-green-500 fill-green-100" />
              </div>
            </div>

            {/* Title */}
            <Link to={`/products/${product.id}`}>
              <h3 className="font-bold text-black text-sm md:text-base leading-tight hover:text-red-500 transition-colors line-clamp-2 mb-2">
                {product.name}
              </h3>
            </Link>

            {/* Price section & Swatches */}
            <div className="flex items-end justify-between mb-3 w-full">
               <div className="flex items-baseline flex-wrap gap-x-1.5 gap-y-0.5">
                 <span className="text-black font-black text-sm md:text-lg">
                   ₹{(Number(product.price) || 0).toLocaleString()}
                 </span>
                 {product.originalPrice && (
                   <span className="text-gray-400 line-through text-[9px] md:text-[11px]">
                     ₹{(Number(product.originalPrice) || 0).toLocaleString()}
                   </span>
                 )}
                 {product.originalPrice && product.originalPrice > product.price && (
                   <span className="text-[#00c68c] font-black text-[9px] md:text-xs tracking-tight">
                     {Math.round(((Number(product.originalPrice) - Number(product.price)) / Number(product.originalPrice)) * 100)}% off
                   </span>
                 )}
               </div>
               
               {/* Category Text instead of Color Swatches */}
               <span className="text-[10px] md:text-xs text-gray-500 font-medium tracking-wide uppercase shrink-0">
                  {product.category || 'Jewelry'}
               </span>
            </div>

            {/* Features tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {(product as any).features?.slice(0,2).map((feat: string, i: number) => (
                <span key={i} className="bg-[#f0f2f5] text-gray-700 text-[8px] md:text-[9px] font-medium px-2 py-0.5 rounded-full border border-gray-200">
                  {feat}
                </span>
              )) || (
                <>
                  <span className="bg-[#f0f2f5] text-gray-700 text-[8px] md:text-[9px] font-medium px-2 py-0.5 rounded-full border border-gray-200">ENx™ Tech</span>
                  <span className="bg-[#f0f2f5] text-gray-700 text-[8px] md:text-[9px] font-medium px-2 py-0.5 rounded-full border border-gray-200">ASAP™ Charge</span>
                </>
              )}
            </div>

            {/* Fill space */}
            <div className="flex-grow"></div>

            {/* Add To Cart Button */}
            <button className="w-full bg-[#1a1a1a] hover:bg-black text-white text-xs md:text-[13px] font-bold py-2 md:py-2.5 rounded-lg transition-colors mt-auto">
              Add To Cart
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Vertical layout (default)
  return (
    <motion.div
      {...props}
      initial={compact ? undefined : { opacity: 0, y: 20 }}
      whileInView={compact ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full touch-pan-y",
        compact ? "rounded-xl" : "rounded-2xl"
      )}
    >
      {/* Badges */}
      <div className={cn("absolute z-10 flex flex-col gap-1", compact ? "top-1 left-1" : "top-2 left-2")}>
        {product.isBestSeller && (
          <span className={cn(
            "bg-[#1a1a1a] text-white font-bold px-1.5 py-0.5 rounded-sm flex items-center gap-1 uppercase tracking-tighter",
            compact ? "text-[7px] md:text-[9px]" : "text-[9px] md:text-[11px]"
          )}>
            <Star size={compact ? 8 : 11} fill="currentColor" /> Best Seller
          </span>
        )}
        {product.tag && (
          <span className={cn(
            "text-white font-bold px-1.5 py-0.5 rounded-sm flex items-center gap-1 uppercase tracking-tighter shadow-sm",
            compact ? "text-[7px] md:text-[9px]" : "text-[9px] md:text-[11px]",
            product.tag.toLowerCase().includes('off') ? "bg-[#00c68c]" : "bg-[#1a1a1a]"
          )}>
             {product.tag.toLowerCase().includes('launch') ? '🚀' : product.tag.toLowerCase().includes('off') ? '🏷️' : '✨'} {product.tag}
          </span>
        )}
      </div>

      <button className={cn("absolute z-20 bg-white hover:bg-gray-100 rounded-full text-gray-500 hover:text-red-500 transition-colors shadow-md", compact ? "top-2 right-2 p-1.5" : "top-3 right-3 p-2")}>
        <Heart size={compact ? 14 : 20} />
      </button>

      {/* Image Container */}
      <div className="relative">
        <Link to={`/products/${product.id}`} className={cn("relative overflow-hidden bg-[#f4f4f4] flex items-center justify-center aspect-square w-full")}>
          <img 
            src={product.image || (product as any).imageUrl || 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&h=600&auto=format&fit=crop'} 
            alt={product.name} 
            className={cn("w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700")}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&h=600&auto=format&fit=crop';
            }}
          />

        </Link>
      </div>

      {/* Content */}
      <div className={cn("flex flex-col flex-grow bg-white text-left", compact ? "p-2.5" : "p-3.5")}>
        
        {/* Rating row */}
        <div className="flex items-center gap-1 mb-1.5">
          <Star size={13} fill="#fecb01" className="text-[#fecb01]" />
          <span className="font-bold text-[13px] text-black">{product.rating}</span>
          <span className="text-gray-300 px-0.5 text-xs">|</span>
          <span className="text-[13px] text-black font-medium">{product.reviews || Math.floor(Math.random() * 500) + 10}</span>
          <CheckCircle2 size={14} fill="#00c68c" className="text-white" />
        </div>

        {/* Title */}
        <Link to={`/products/${product.id}`} className="mb-2 block">
          <h3 className={cn("font-bold text-black hover:text-[#ff0000] transition-colors line-clamp-1", compact ? "text-sm md:text-base" : "text-base md:text-[17px]")}>
            {product.name}
          </h3>
        </Link>
        
        {/* Price row with swatches */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className={cn("text-black font-black", compact ? "text-base md:text-lg" : "text-lg md:text-xl")}>
              ₹{(Number(product.price) || 0).toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-gray-400 line-through text-xs md:text-sm font-medium">
                ₹{(Number(product.originalPrice) || 0).toLocaleString()}
              </span>
            )}
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-[#00c68c] font-bold text-xs md:text-sm">
                {Math.round(((Number(product.originalPrice) - Number(product.price)) / Number(product.originalPrice)) * 100)}% off
              </span>
            )}
          </div>
          
          {/* Category Text instead of Color Swatches */}
          <span className="text-[11px] md:text-xs text-gray-500 font-medium tracking-wide uppercase shrink-0">
            {product.category || 'Jewelry'}
          </span>
        </div>

        {/* Dashed line separator */}
        <div className="border-t border-gray-200 border-dashed w-full my-2" />

        {/* Features tags */}
        <div className="flex flex-wrap gap-1.5 mb-2.5">
          {((product as any).features?.slice(0,2) || ['Hi-Res Audio with LDAC', 'boAt Spatial Audio']).map((feat: string, i: number) => (
            <span key={i} className="bg-[#f0f2f5] text-gray-700 text-[9px] md:text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap">
              {feat}
            </span>
          ))}
        </div>

        {/* Add to Cart */}
        <div className="mt-auto">
          <button className="w-full bg-[#1a1a1a] hover:bg-black text-white rounded-[8px] font-bold py-2 md:py-2.5 transition-colors text-[12px] md:text-[14px] active:scale-95">
            Add To Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}
