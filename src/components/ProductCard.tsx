import { Product } from '../constants';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export default function ProductCard({ product, compact = false, ...props }: ProductCardProps & { key?: string }) {
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

      <button className={cn("absolute z-20 bg-white/60 hover:bg-white rounded-full text-diveera-grey hover:text-red-500 transition-colors shadow-sm", compact ? "top-1 right-1 p-0.5" : "top-2 right-2 p-1.5")}>
        <Heart size={compact ? 12 : 18} />
      </button>

      {/* Image Container */}
      <div className="relative">
        <Link to={`/products/${product.id}`} className={cn("relative overflow-hidden bg-[#f4f4f4] flex items-center justify-center aspect-square")}>
          <img 
            src={product.image || (product as any).imageUrl || 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&h=600&auto=format&fit=crop'} 
            alt={product.name} 
            className={cn("w-full h-full object-contain group-hover:scale-105 transition-transform duration-700", compact ? "p-2 md:p-3" : "p-4 md:p-6")}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&h=600&auto=format&fit=crop';
            }}
          />

          {/* Yellow Status Bar (boAt style) */}
          <div className={cn("absolute bottom-0 left-0 right-0 bg-[#fecb01] flex items-center justify-between px-2 md:px-3", compact ? "h-4 md:h-5" : "h-6")}>
            <span className={cn("text-black font-bold truncate max-w-[60%]", compact ? "text-[8px] md:text-[10px]" : "text-[10px] md:text-[12px]")}>
              {(product as any).features?.[0] || 'Premium'}
            </span>
            <div className={cn("bg-white px-1 py-0.5 rounded flex items-center gap-0.5 font-bold", compact ? "text-[8px] md:text-[10px]" : "text-[10px] md:text-[12px]")}>
              <Star size={compact ? 8 : 11} fill="#fecb01" className="text-[#fecb01]" />
              {product.rating}
            </div>
          </div>
        </Link>
      </div>

      {/* Content */}
      <div className={cn("flex flex-col flex-grow bg-white text-left border-t border-gray-100", compact ? "p-1.5 md:p-3" : "p-3 md:p-4")}>
        <div className={cn("flex items-center justify-between", compact ? "mb-1" : "mb-1.5")}>
          <Link to={`/products/${product.id}`} className="flex-grow">
            <h3 className={cn("font-sans font-bold text-black group-hover:text-[#ff0000] transition-colors line-clamp-1", compact ? "text-[10px] md:text-[13px]" : "text-[13px] md:text-[16px]")}>
              {product.name}
            </h3>
          </Link>
        </div>
        
        <div className={cn("border-t border-dotted border-gray-300 w-full", compact ? "mb-1" : "mb-2")} />

        <div className="mt-auto">
          <div className="flex items-center flex-wrap gap-x-1 md:gap-x-1.5">
            <span className={cn("text-black font-extrabold", compact ? "text-[12px] md:text-[16px]" : "text-[16px] md:text-[20px]")}>
              ₹{(Number(product.price) || 0).toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className={cn("text-gray-400 line-through", compact ? "text-[8px] md:text-[10px]" : "text-[11px] md:text-[13px]")}>
                ₹{(Number(product.originalPrice) || 0).toLocaleString()}
              </span>
            )}
            {product.originalPrice && product.originalPrice > product.price && (
              <span className={cn("text-[#00c68c] font-black", compact ? "text-[8px] md:text-[11px]" : "text-[11px] md:text-[14px]")}>
                {Math.round(((Number(product.originalPrice) - Number(product.price)) / Number(product.originalPrice)) * 100)}% off
              </span>
            )}
          </div>
          
          {/* Footer Info */}
          <div className={cn("flex items-center justify-between", compact ? "mt-1.5" : "mt-2.5")}>
            <div className={cn("flex", compact ? "-space-x-1" : "-space-x-1.5")}>
              <div className={cn("rounded-full bg-black border-2 border-white", compact ? "w-2 h-2" : "w-3 h-3")} />
              <div className={cn("rounded-full bg-blue-900 border-2 border-white", compact ? "w-2 h-2" : "w-3 h-3")} />
              <div className={cn("rounded-full bg-gray-400 border-2 border-white", compact ? "w-2 h-2" : "w-3 h-3")} />
            </div>
            
            <div className={cn("bg-[#1a1a1a] text-white p-1 rounded-md opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0", compact ? "p-0.5" : "p-1")}>
               <ShoppingCart size={compact ? 10 : 14} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
