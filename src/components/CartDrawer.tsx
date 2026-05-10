import {
  X,
  Trash2,
  Minus,
  Plus,
  BadgePercent,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import { Link } from "react-router-dom";
import { useState } from "react";
import CheckoutDrawer from "./CheckoutDrawer";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const [items, setItems] = useState([
    {
      id: 1,
      title: "Emerald Diamond Pendant",
      price: 14490,
      originalPrice: 24490,
      image:
        "https://images.unsplash.com/photo-1599643478524-fb66f7f2b1a8?q=80&w=400&fit=crop",
      engraving: "Love Forever",
      quantity: 1,
    },
  ]);
  const [couponApplied, setCouponApplied] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const updateQuantity = (id: number, delta: number) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }),
    );
  };

  const removeItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const originalSubtotal = items.reduce(
    (acc, item) => acc + item.originalPrice * item.quantity,
    0,
  );
  const discount = couponApplied ? subtotal * 0.05 : 0;
  const total = subtotal - discount;
  const totalItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[110]"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-[110] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-100">
                <h2 className="text-2xl font-bold font-sans text-diveera-dark">
                  Your Cart
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} className="text-diveera-dark" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                {/* Cart Items */}
                <div className="flex flex-col gap-6">
                  {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-diveera-grey">
                      <p className="mb-4">Your cart is empty.</p>
                      <button
                        onClick={onClose}
                        className="bg-[#1f2328] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-black transition-colors"
                      >
                        Continue Shopping
                      </button>
                    </div>
                  ) : (
                    items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="w-24 h-24 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 relative border border-gray-100">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 flex flex-col justify-between py-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-diveera-dark">
                                {item.title}
                              </h3>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="font-black text-diveera-dark">
                                  ₹ {item.price.toLocaleString("en-IN")}
                                </span>
                                <span className="text-xs text-diveera-grey line-through">
                                  ₹ {item.originalPrice.toLocaleString("en-IN")}
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-diveera-grey hover:text-red-500 transition-colors p-1"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>

                          <div className="flex items-end justify-between mt-4">
                            {item.engraving && (
                              <div className="flex flex-col gap-1.5 text-[11px]">
                                <span className="text-diveera-grey uppercase tracking-wider font-semibold">
                                  Your Engraving
                                </span>
                                <div className="bg-gray-50 px-3 py-1 rounded-md text-diveera-dark font-medium border border-gray-100">
                                  {item.engraving}
                                </div>
                              </div>
                            )}
                            {!item.engraving && <div />}

                            {/* Quantity Controls */}
                            <div className="flex items-center bg-gray-50 rounded-lg border border-gray-100">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                disabled={item.quantity <= 1}
                                className="p-2 text-diveera-dark hover:bg-gray-200 disabled:opacity-50 disabled:hover:bg-transparent rounded-l-lg transition-colors"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="w-8 text-center font-bold text-sm text-diveera-dark">
                                {item.quantity.toString().padStart(2, "0")}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="p-2 text-diveera-dark hover:bg-gray-200 rounded-r-lg transition-colors"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Footer / Checkout Section */}
              {items.length > 0 && (
                <div className="border-t border-gray-100 bg-white">
                  {/* Coupons */}
                  <div className="p-6 pb-4">
                    <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex flex-col gap-4">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-2">
                          <BadgePercent
                            size={20}
                            className="text-diveera-dark mt-0.5"
                          />
                          <div>
                            <p className="font-bold text-sm text-diveera-dark">
                              5% off on Prepaid Orders
                            </p>
                            <p className="text-xs text-diveera-grey mt-0.5 uppercase tracking-wide font-medium">
                              Code: DIVEERA5
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => setCouponApplied(!couponApplied)}
                          className={cn(
                            "px-4 py-1.5 rounded-lg text-xs font-bold transition-colors",
                            couponApplied
                              ? "bg-diveera-green text-white hover:bg-diveera-green/90"
                              : "bg-[#1f2328] text-white hover:bg-[#1f2328]/90",
                          )}
                        >
                          {couponApplied ? "Applied" : "Apply"}
                        </button>
                      </div>
                      {couponApplied && (
                        <div className="text-sm font-medium text-diveera-green mt-1">
                          - ₹{" "}
                          {discount.toLocaleString("en-IN", {
                            maximumFractionDigits: 0,
                          })}{" "}
                          savings applied!
                        </div>
                      )}
                      <div className="h-px bg-gray-200/50 w-full" />
                      <button className="text-sm font-bold text-diveera-dark flex items-center justify-center gap-1 hover:text-diveera-green transition-colors">
                        View all coupons &rarr;
                      </button>
                    </div>
                  </div>

                  {/* Notice */}
                  <div className="px-6 mb-4">
                    <div className="bg-diveera-green text-white text-[11px] font-medium text-center py-2.5 px-4 rounded-lg shadow-sm">
                      Products with engraving message are not eligible for
                      cancellations or refunds once packed
                    </div>
                  </div>

                  {/* Total and CTA */}
                  <div className="p-6 pt-2 flex gap-4 items-center bg-white">
                    <div className="flex flex-col">
                      <span className="text-2xl font-black text-diveera-dark">
                        ₹{" "}
                        {total.toLocaleString("en-IN", {
                          maximumFractionDigits: 0,
                        })}
                      </span>
                      <span className="text-[10px] text-diveera-grey uppercase tracking-wide italic font-medium flex items-center gap-0.5">
                        Inclusive of all taxes <ChevronDown size={12} />
                      </span>
                    </div>
                    <button
                      onClick={() => setIsCheckoutOpen(true)}
                      className="flex-1 bg-[#1f2328] text-white py-4 rounded-xl font-bold text-lg hover:bg-black transition-colors shadow-xl shadow-black/10"
                    >
                      Pay Now
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CheckoutDrawer
        isOpen={isCheckoutOpen}
        onClose={() => {
          setIsCheckoutOpen(false);
          setItems([]);
          onClose(); // Optional: close entire cart flow
        }}
        onBack={() => setIsCheckoutOpen(false)}
        total={total}
        originalTotal={originalSubtotal}
        discount={originalSubtotal - subtotal + discount}
        itemCount={totalItemCount}
        items={items}
      />
    </>
  );
}
