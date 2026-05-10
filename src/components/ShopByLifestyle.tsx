import { motion } from 'motion/react';
import { ArrowRightCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const LIFESTYLES = [
  {
    id: 1,
    title: "For Fitness",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600&h=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "For Parties",
    image: "https://images.unsplash.com/photo-1549476464-37392f71752a?q=80&w=600&h=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "For Work",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&h=800&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "For Him",
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=600&h=800&auto=format&fit=crop",
  }
];

export default function ShopByLifestyle() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-left">
          <h2 className="text-2xl font-sans font-black text-diveera-dark flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
            </span>
            Shop by <span className="text-red-600 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-red-600">Lifestyle</span>
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
          className="flex overflow-x-auto lg:grid lg:grid-cols-4 gap-5 md:gap-5 no-scrollbar pb-6 lg:pb-0 snap-x snap-mandatory px-6 lg:px-0"
        >
          {LIFESTYLES.map((item) => (
            <Link 
              key={item.id} 
              to={item.title === "For Him" ? "/gifts-for-him" : "/collections/all"}
              className="flex flex-col group cursor-pointer min-w-[280px] w-[80vw] lg:w-auto flex-shrink-0 lg:min-w-0 snap-center"
            >
              <motion.div 
                variants={{
                  hidden: { opacity: 0, scale: 0.95, y: 20 },
                  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
                }}
              >
                {/* Domed Arch Background */}
                <div className="relative aspect-[3/4] bg-[#eff4f7] rounded-t-full overflow-hidden flex items-end justify-center">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ 
                      maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                      WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
                    }}
                  />
                </div>
                
                {/* Footer Content */}
                <div className="bg-[#eff4f7] py-4 px-2 rounded-b-lg text-center flex flex-col items-center gap-1 group-hover:bg-gray-100 transition-colors">
                  <h3 className="font-sans font-black text-sm text-diveera-dark">{item.title}</h3>
                  <div className="flex items-center gap-1 text-diveera-green group-hover:gap-2 transition-all">
                    <span className="text-[10px] font-black uppercase tracking-tight">View All</span>
                    <ArrowRightCircle size={14} strokeWidth={2.5} />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
