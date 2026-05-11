import {
  X,
  ChevronLeft,
  ShieldCheck,
  CheckCircle2,
  Ticket,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

interface CheckoutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  total: number;
  originalTotal: number;
  discount: number;
  itemCount: number;
  items?: any[];
}

export default function CheckoutDrawer({
  isOpen,
  onClose,
  onBack,
  total,
  originalTotal,
  discount,
  itemCount,
  items = [],
}: CheckoutDrawerProps) {
  const [step, setStep] = useState<'login' | 'address' | 'payment'>('login');
  const [mobileNumber, setMobileNumber] = useState("");
  const [updatesDefault, setUpdatesDefault] = useState(true);
  
  // Address Form State
  const [addressType, setAddressType] = useState<'home' | 'work'>('home');
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [stateForm, setStateForm] = useState("");
  const [flat, setFlat] = useState("");
  const [area, setArea] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContinue = async () => {
    if (step === 'login' && mobileNumber.length === 10) {
      setStep('address');
    } else if (step === 'address') {
      if (!pincode || !city || !stateForm || !flat || !area || !fullName || !email) {
        alert("Please fill all required fields.");
        return;
      }
      setStep('payment');
    } else if (step === 'payment') {
      setIsSubmitting(true);
      try {
        const { db } = await import("../lib/firebase");
        const { collection, addDoc, serverTimestamp } = await import("firebase/firestore");
        
        await addDoc(collection(db, "orders"), {
          mobileNumber,
          address: {
            pincode,
            city,
            state: stateForm,
            flat,
            area,
            fullName,
            email,
            addressType
          },
          items,
          total,
          originalTotal,
          discount,
          status: 'pending',
          createdAt: serverTimestamp()
        });
        
        alert("Order placed successfully!");
        onClose();
      } catch (err) {
        console.error(err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (step === 'payment') {
      setStep('address');
    } else if (step === 'address') {
      setStep('login');
    } else {
      onBack();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[120]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-[#f9fafb] shadow-2xl z-[120] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white shadow-sm flex-shrink-0">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleBack}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft size={24} className="text-gray-800" />
                </button>
                <div className="font-serif font-bold text-xl tracking-wider text-diveera-dark">
                  DIVEERA
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2 text-xs">
                  {discount > 0 && (
                    <span className="bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">
                      ₹{discount.toLocaleString("en-IN")} saved so far
                    </span>
                  )}
                  <span className="text-gray-500 font-medium">
                    • {itemCount} {itemCount === 1 ? "item" : "items"}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  {discount > 0 && (
                    <span className="text-gray-400 line-through text-sm">
                      ₹{originalTotal.toLocaleString("en-IN")}
                    </span>
                  )}
                  <span className="font-bold text-lg text-gray-900">
                    ₹{total.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-6">
              {step === 'login' && (
                <>
                  <div className="w-full flex justify-end">
                    <span className="bg-gray-200/60 text-gray-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Add GST at next step
                    </span>
                  </div>

                  {/* Login Section */}
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-gray-700 font-medium text-sm mb-4">
                        <div className="w-6 h-6 border-2 border-gray-300 rounded-full flex items-center justify-center">
                          <div className="w-2.5 h-2.5 bg-gray-300 rounded-full" />
                        </div>
                        Login to continue
                      </div>

                      <div className="relative">
                        <label className="absolute -top-2 left-3 bg-white px-1 text-[11px] font-medium text-gray-500 z-10 transition-all">
                          Enter Mobile Number
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3.5 focus-within:border-black focus-within:ring-1 focus-within:ring-black">
                          <span className="text-gray-500 font-medium mr-2">
                            +91 |
                          </span>
                          <input
                            type="tel"
                            value={mobileNumber}
                            onChange={(e) =>
                              setMobileNumber(
                                e.target.value.replace(/\D/g, "").slice(0, 10),
                              )
                            }
                            className="flex-1 w-full focus:outline-none text-black font-medium text-sm"
                            autoFocus
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {step === 'address' && (
                <div className="flex flex-col gap-4">
                  <h3 className="text-sm font-medium text-gray-800 mb-1">Add Delivery Address</h3>
                  
                  {/* Address Inputs */}
                  <div className="flex flex-col gap-4">
                    <div className="relative">
                      <label className="absolute -top-2 left-3 bg-[#f9fafb] px-1 text-[11px] font-medium text-gray-500 z-10">Pincode *</label>
                      <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black bg-transparent text-gray-900 font-medium" value={pincode} onChange={e => setPincode(e.target.value)} />
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="relative flex-1">
                        <label className="absolute -top-2 left-3 bg-[#f9fafb] px-1 text-[11px] font-medium text-gray-500 z-10">City *</label>
                        <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black bg-transparent text-gray-900 font-medium" value={city} onChange={e => setCity(e.target.value)} />
                      </div>
                      <div className="relative flex-1">
                        <label className="absolute -top-2 left-3 bg-[#f9fafb] px-1 text-[11px] font-medium text-gray-500 z-10">State *</label>
                        <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black bg-transparent text-gray-900 font-medium" value={stateForm} onChange={e => setStateForm(e.target.value)} />
                      </div>
                    </div>

                    <div className="relative">
                      <input type="text" placeholder="Flat, House no. *" className="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black bg-transparent placeholder-gray-500" value={flat} onChange={e => setFlat(e.target.value)} />
                    </div>

                    <div className="relative">
                      <input type="text" placeholder="Apartment, Area, Sector, Village *" className="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black bg-transparent placeholder-gray-500" value={area} onChange={e => setArea(e.target.value)} />
                    </div>
                  </div>

                  {/* Customer Information */}
                  <div className="flex flex-col gap-4 mt-2">
                    <h3 className="text-sm font-medium text-gray-800">Customer Information</h3>
                    
                    <div className="relative">
                      <input type="text" placeholder="Full Name *" className="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black bg-transparent placeholder-gray-500" value={fullName} onChange={e => setFullName(e.target.value)} />
                    </div>

                    <div className="relative">
                      <input type="email" placeholder="Email Address *" className="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black bg-transparent placeholder-gray-500" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>

                    <div className="relative">
                      <label className="absolute -top-2 left-3 bg-[#f9fafb] px-1 text-[11px] font-medium text-gray-500 z-10">Recipient Phone Number</label>
                      <input type="tel" className="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black bg-transparent text-gray-900 font-medium" value={mobileNumber} readOnly />
                    </div>
                  </div>

                  {/* Save Address As */}
                  <div className="flex flex-col gap-2 mt-2">
                    <h3 className="text-sm font-medium text-gray-800">Save Address As</h3>
                    <div className="flex gap-3">
                      <label className={`flex items-center justify-between px-4 py-2.5 rounded-full border cursor-pointer flex-1 transition-colors ${addressType === 'home' ? 'border-black' : 'border-gray-300'}`}>
                        <span className="text-sm font-medium text-gray-800">Home</span>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${addressType === 'home' ? 'border-black' : 'border-gray-400'}`}>
                          {addressType === 'home' && <div className="w-2 h-2 bg-black rounded-full" />}
                        </div>
                        <input type="radio" name="addressType" className="hidden" onChange={() => setAddressType('home')} checked={addressType === 'home'} />
                      </label>
                      <label className={`flex items-center justify-between px-4 py-2.5 rounded-full border cursor-pointer flex-1 transition-colors ${addressType === 'work' ? 'border-black' : 'border-gray-300'}`}>
                        <span className="text-sm font-medium text-gray-500">Work</span>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${addressType === 'work' ? 'border-black' : 'border-gray-400'}`}>
                          {addressType === 'work' && <div className="w-2 h-2 bg-black rounded-full" />}
                        </div>
                        <input type="radio" name="addressType" className="hidden" onChange={() => setAddressType('work')} checked={addressType === 'work'} />
                      </label>
                    </div>
                  </div>

                  {/* Shipping Method */}
                  <div className="bg-[#f2f4f5] rounded-2xl p-4 mt-2">
                    <h3 className="text-sm font-medium text-gray-800 mb-3">Shipping Method</h3>
                    <label className="flex items-center justify-between bg-white px-4 py-4 rounded-xl border border-black cursor-pointer">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-medium text-gray-900">Free Shipping</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-[#008f5d] font-medium tracking-wide">Earliest delivery by <span className="font-bold">12 May</span></span>
                          <span className="bg-[#00c98f] text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm">Free</span>
                        </div>
                      </div>
                      <div className="w-4 h-4 rounded-full border border-black flex items-center justify-center">
                        <div className="w-2 h-2 bg-black rounded-full" />
                      </div>
                      <input type="radio" readOnly checked className="hidden" />
                    </label>
                  </div>
                </div>
              )}

              {step === 'payment' && (
                <div className="flex flex-col gap-6 items-center flex-1 justify-center py-6">
                  <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-sm flex flex-col items-center w-full max-w-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Scan to Pay via UPI</h3>

                    {/* QR Code Container */}
                    <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-inner w-56 h-56 flex items-center justify-center mb-4 relative">
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(`upi://pay?pa=6377370687@ibl&pn=Mrs DIMPLE JANGID&am=${total}&cu=INR`)}`} 
                        alt="UPI QR Code" 
                        className="w-full h-full"
                      />
                    </div>

                    <div className="flex flex-col items-center mb-8 border-b border-gray-100 pb-6 w-full">
                      <p className="text-gray-500 text-sm font-medium mb-3">Pay By</p>
                      <div className="flex gap-4 items-center">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg" className="h-6 object-contain grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100" alt="PhonePe" />
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" className="h-5 object-contain grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100" alt="Google Pay" />
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg" className="h-5 object-contain grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100" alt="Paytm" />
                      </div>
                    </div>

                    <p className="text-gray-600 font-medium mb-1">Paying to</p>
                    <p className="text-gray-900 font-bold tracking-wide mb-4">Mrs DIMPLE JANGID</p>
                    <p className="text-3xl font-bold text-gray-900 mb-2">₹{total.toLocaleString("en-IN")}</p>
                  </div>
                </div>
              )}

              <div className="h-10" /> {/* Spacer */}
            </div>

            {/* Footer */}
            <div className="bg-white border-t border-gray-200 p-4 pb-6 flex flex-col gap-4 flex-shrink-0">
              {step === 'login' && (
                <label className="flex items-center gap-3 cursor-pointer">
                  <div
                    className={`w-5 h-5 rounded border flex items-center justify-center ${updatesDefault ? "bg-black border-black text-white" : "border-gray-300"}`}
                  >
                    {updatesDefault && <CheckCircle2 size={14} />}
                  </div>
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={updatesDefault}
                    onChange={() => setUpdatesDefault(!updatesDefault)}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Send me order updates & offers - (no spam)
                  </span>
                </label>
              )}

              <button
                onClick={handleContinue}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-colors ${
                  (step === 'login' ? mobileNumber.length === 10 : true)
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-[#989898] text-white cursor-not-allowed"
                }`}
              >
                {step === 'payment' ? (isSubmitting ? 'Processing...' : 'Confirm Payment') : 'Continue'}
              </button>

              {step === 'login' && (
                <p className="text-[10px] text-center text-gray-500 font-medium mt-1">
                  By proceeding, I agree to Gokwik's{" "}
                  <a href="#" className="underline">
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a href="#" className="underline">
                    T&C
                  </a>
                </p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
