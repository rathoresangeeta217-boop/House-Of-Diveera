import { motion } from 'motion/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import AnnouncementBar from './AnnouncementBar';
import WhatsAppButton from './WhatsAppButton';
import { Search, Package, Truck, MapPin, HelpCircle, ChevronRight } from 'lucide-react';

export default function TrackOrder() {
  const [orderId, setOrderId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowStatus(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <AnnouncementBar />
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-diveera-green/10 text-diveera-green mb-6"
          >
            <Package size={32} />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-sans font-black uppercase tracking-tighter text-diveera-dark mb-4">
            Track Your Order
          </h1>
          <p className="text-gray-500 font-medium max-w-md mx-auto">
            See the real-time status of your luxury jewelry hamper and estimated delivery time.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-black/5 border border-gray-100 mb-12"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="orderId" className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3 ml-1">
                Order Reference Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="orderId"
                  placeholder="e.g. DIV-12345678"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="w-full h-16 bg-[#fafafa] border-2 border-gray-100 rounded-2xl px-6 pl-14 font-bold text-lg focus:border-diveera-green focus:outline-none transition-all placeholder:text-gray-300"
                  required
                />
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full h-16 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-3 ${
                isSubmitting 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-diveera-dark text-white hover:bg-diveera-green shadow-lg shadow-diveera-green/20'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                  Locating Package...
                </>
              ) : (
                <>
                  Track My Order
                  <ChevronRight size={18} />
                </>
              )}
            </button>
          </form>

          {showStatus && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-12 pt-12 border-t border-gray-100"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Current Status</p>
                  <h3 className="text-xl font-black uppercase text-diveera-green">In Transit</h3>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Expected Delivery</p>
                  <h3 className="text-xl font-black uppercase text-diveera-dark">May 12, 2024</h3>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="space-y-8 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
                <div className="relative pl-16">
                  <div className="absolute left-[18px] top-1 w-3 h-3 rounded-full bg-diveera-green ring-4 ring-diveera-green/20 z-10" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-diveera-green mb-1">On the way</p>
                  <h4 className="font-bold text-diveera-dark mb-1">Arrived at hub - New Delhi</h4>
                  <p className="text-xs text-gray-500">May 10, 2024 • 02:45 PM</p>
                </div>
                <div className="relative pl-16">
                  <div className="absolute left-[18px] top-1 w-3 h-3 rounded-full bg-gray-200 z-10" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Dispatched</p>
                  <h4 className="font-bold text-gray-400 mb-1">Shipped from Warehouse - Jaipur</h4>
                  <p className="text-xs text-gray-400">May 09, 2024 • 10:20 AM</p>
                </div>
                <div className="relative pl-16">
                  <div className="absolute left-[18px] top-1 w-3 h-3 rounded-full bg-gray-200 z-10" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Confirmed</p>
                  <h4 className="font-bold text-gray-400 mb-1">Order Received & Beautifully Packed</h4>
                  <p className="text-xs text-gray-400">May 08, 2024 • 11:15 PM</p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Helpful Quick Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center mb-4">
              <HelpCircle size={20} />
            </div>
            <h4 className="font-black uppercase text-[10px] tracking-widest mb-2">Need Help?</h4>
            <p className="text-xs text-gray-500 leading-relaxed">Cannot find your order ID? Check your order confirmation email or SMS.</p>
          </div>
          <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center mb-4">
              <Truck size={20} />
            </div>
            <h4 className="font-black uppercase text-[10px] tracking-widest mb-2">Shipping Info</h4>
            <p className="text-xs text-gray-500 leading-relaxed">We ship using premium partners to ensure your jewelry reaches you safely.</p>
          </div>
          <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center mb-4">
              <MapPin size={20} />
            </div>
            <h4 className="font-black uppercase text-[10px] tracking-widest mb-2">Delivery Range</h4>
            <p className="text-xs text-gray-500 leading-relaxed">Serving over 1000+ cities with real-time tracking for every step.</p>
          </div>
        </div>

        <div className="mt-20 text-center">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-6">Want to explore more?</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/gifts-for-her" className="px-8 py-3 rounded-full border border-gray-200 text-[10px] font-black uppercase tracking-widest hover:border-diveera-green transition-colors">Gifts For Her</Link>
            <Link to="/hampers" className="px-8 py-3 rounded-full border border-gray-200 text-[10px] font-black uppercase tracking-widest hover:border-diveera-green transition-colors">Gift Hampers</Link>
            <Link to="/collections/best-sellers" className="px-8 py-3 rounded-full border border-gray-200 text-[10px] font-black uppercase tracking-widest hover:border-diveera-green transition-colors">Best Sellers</Link>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
