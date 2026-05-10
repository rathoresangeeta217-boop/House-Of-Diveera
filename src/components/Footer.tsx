import { Instagram, Facebook, Twitter, Youtube, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-diveera-dark text-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 text-center md:text-left">
          {/* Brand Info */}
          <div>
            <h2 className="text-2xl font-serif italic mb-6">
              House of <span className="font-bold not-italic">Diveera</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Premium jewelry and lifestyle accessories designed to bring out your inner elegance. Wear your sparkle with House of Diveera.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="https://www.instagram.com/house_of_diveera?igsh=MWhod3I0NDk1NGhrbg==" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-diveera-green transition-colors"><Instagram size={20} /></a>
              <a href="https://www.facebook.com/people/Houseof-Diveera/61581096568220/#" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-diveera-green transition-colors"><Facebook size={20} /></a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-diveera-green transition-colors"><Twitter size={20} /></a>
              <a href="https://youtube.com/@houseofdiveera?si=GNe0QtVnXTkH1DMY" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-diveera-green transition-colors"><Youtube size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-sans font-bold mb-6 text-white uppercase tracking-widest">Shop</h3>
            <ul className="space-y-4 text-gray-400 text-sm font-sans font-medium">
              <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Best Sellers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Gift Hampers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sale</a></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-lg font-sans font-bold mb-6 text-white uppercase tracking-widest">Help</h3>
            <ul className="space-y-4 text-gray-400 text-sm font-sans font-medium">
              <li><Link to="/track-order" className="hover:text-white transition-colors">Track Your Order</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Return Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-sans font-bold mb-6 text-white uppercase tracking-widest">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-6">Join the Diveera community for exclusive updates and early access.</p>
            <div className="flex gap-2 p-1 bg-white/5 rounded-full border border-white/10 focus-within:border-diveera-green transition-all">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-transparent border-none outline-none text-sm px-4 flex-grow w-full"
              />
              <button className="bg-diveera-green p-2 rounded-full hover:scale-105 transition-transform">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-gray-500 text-xs text-center">
            © 2026 House of Diveera. Created for you.
          </p>
          <div className="flex gap-8 text-[10px] text-gray-500 font-bold uppercase tracking-widest items-center">
            <Link to="/admin/login" className="hover:text-diveera-green transition-colors">Admin Login</Link>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
