import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { Plus, Trash2, Edit2, LogOut, Image as ImageIcon, Layout, Tag, DollarSign, List, X, Upload, Copy, Check, CheckCircle2, MapPin, Calendar, User, Phone, ShoppingBag, Eye, RefreshCw, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'banners' | 'products' | 'orders'>('orders');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const additionalFileInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [formData, setFormData] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleUpdateOrderStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'orders', id), { status: newStatus });
      fetchData();
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `orders/${id}`);
    }
  };

  const formatOrderDate = (createdAt: any) => {
    if (!createdAt) return "Just now";
    const date = createdAt.toDate ? createdAt.toDate() : new Date(createdAt);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  useEffect(() => {
    fetchData();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Firebase Auth State:', user?.email);
      if (!user) {
        const session = localStorage.getItem('admin_session');
        if (session !== 'active') {
          navigate('/admin/login');
        }
      } else {
        localStorage.setItem('admin_session', 'active');
      }
    });

    return () => unsubscribe();
  }, [activeTab]);

  const compressImage = (base64: string, maxWidth = 800, quality = 0.7): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = (maxWidth / width) * height;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
    });
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      let q;
      if (activeTab === 'products') {
        q = query(collection(db, activeTab), orderBy('name', 'asc'));
      } else if (activeTab === 'orders') {
        q = query(collection(db, activeTab), orderBy('createdAt', 'desc'));
      } else {
        q = query(collection(db, activeTab));
      }
      const snapshot = await getDocs(q);
      setItems(snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as object) })));
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, activeTab);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, isMain: boolean) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type.startsWith('video/')) {
      // For videos, we just show a message or handle differently as we don't have large blob storage in this setup
      // We can use a local Blob URL for preview, but saving to Firestore as base64 is risky for videos
      alert("Video upload is limited by Firestore size constraints. Please use a URL or upload shorter clips.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      const compressed = await compressImage(base64);
      
      setFormData(prev => {
        if (isMain) {
          if (activeTab === 'products') return { ...prev, image: compressed };
          return { ...prev, imageUrl: compressed };
        } else {
          const currentImages = prev.additionalImages || [];
          return { ...prev, additionalImages: [...currentImages, compressed] };
        }
      });
      if (e.target) e.target.value = '';
    };
    reader.readAsDataURL(file);
  };

  const removeAdditionalImage = (index: number) => {
    setFormData(prev => {
      const currentImages = [...(prev.additionalImages || [])];
      currentImages.splice(index, 1);
      return { ...prev, additionalImages: currentImages };
    });
  };

  const addSpecification = () => {
    setFormData(prev => {
      const specs = [...(prev.specifications || [])];
      specs.push({ label: '', value: '' });
      return { ...prev, specifications: specs };
    });
  };

  const updateSpecification = (index: number, field: 'label' | 'value', val: string) => {
    setFormData(prev => {
      const specs = [...(prev.specifications || [])];
      specs[index] = { ...specs[index], [field]: val };
      return { ...prev, specifications: specs };
    });
  };

  const removeSpecification = (index: number) => {
    setFormData(prev => {
      const specs = [...(prev.specifications || [])];
      specs.splice(index, 1);
      return { ...prev, specifications: specs };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    if (!auth.currentUser) {
      alert("You are not signed in to Firebase. Please try logging out and logging in again with Google.");
      return;
    }

    setIsSubmitting(true);
    try {
      const dataToSave = { 
        ...formData,
        updatedAt: serverTimestamp()
      };
      
      if (!editingId) {
        dataToSave.createdAt = serverTimestamp();
        dataToSave.authorEmail = auth.currentUser.email;
      }

      delete dataToSave.id; // Remove ID field if it exists

      if (editingId) {
        await updateDoc(doc(db, activeTab, editingId), dataToSave);
      } else {
        await addDoc(collection(db, activeTab), dataToSave);
      }
      setShowModal(false);
      setEditingId(null);
      setFormData({});
      fetchData();
    } catch (err) {
      handleFirestoreError(err, editingId ? OperationType.UPDATE : OperationType.CREATE, activeTab);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!auth.currentUser) {
      alert("You are not signed in to Firebase.");
      return;
    }

    if (confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteDoc(doc(db, activeTab, id));
        fetchData();
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, `${activeTab}/${id}`);
      }
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem('admin_session');
    await auth.signOut();
    navigate('/admin/login');
  };

  const openForm = (item?: any) => {
    setFormData(item || { 
      specifications: [{ label: '', value: '' }], 
      features: [], 
      additionalImages: [],
      rating: 4.8,
      reviews: Math.floor(Math.random() * 200) + 50,
      inDiveeraCollection: true,
      onSale: false,
      isBestSeller: false,
      isBigDeal: false
    });
    setEditingId(item?.id || null);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-diveera-dark text-white p-6 flex flex-col">
        <h1 className="text-2xl font-serif italic mb-10">Diveera Admin</h1>
        <nav className="flex-grow space-y-2">
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'products' ? 'bg-diveera-green shadow-lg scale-105' : 'hover:bg-white/10'}`}
          >
            <Tag size={20} />
            <span className="font-bold text-sm">Products</span>
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'orders' ? 'bg-diveera-green shadow-lg scale-105' : 'hover:bg-white/10'}`}
          >
            <List size={20} />
            <span className="font-bold text-sm">Orders</span>
          </button>
        </nav>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/20 text-red-100 transition-all mt-auto"
        >
          <LogOut size={20} />
          <span className="font-bold text-sm">Sign Out</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-10 overflow-y-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-black text-diveera-dark capitalize tracking-tight">{activeTab}</h2>
            <p className="text-diveera-grey text-sm">Manage your store's {activeTab} information</p>
          </div>
          {activeTab !== 'orders' && (
            <button 
              onClick={() => openForm()}
              className="bg-diveera-green text-white px-6 py-3 rounded-xl font-black flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <Plus size={20} strokeWidth={3} />
              Add {activeTab === 'products' ? 'Product' : 'Banner'}
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-diveera-green border-t-transparent"></div>
          </div>
        ) : activeTab === 'orders' ? (
          <div className="flex flex-col gap-6">
            {items.map((order) => {
              const customerInitial = order.address?.fullName?.charAt(0).toUpperCase() || 'C';
              return (
                <div 
                  key={order.id} 
                  className="bg-white rounded-2xl shadow-sm border border-neutral-200/80 overflow-hidden hover:shadow-md transition-all duration-200 group"
                >
                  {/* Shopify Top Header Bar */}
                  <div className="bg-neutral-50 px-6 py-4 border-b border-neutral-100 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-xs text-neutral-400 font-bold">ORDER</span>
                        <h3 className="font-mono font-black text-neutral-950 tracking-wider">
                          #{order.id.slice(-6).toUpperCase()}
                        </h3>
                        <button 
                          onClick={() => handleCopyId(order.id)} 
                          className="text-neutral-400 hover:text-neutral-600 transition-colors p-1"
                          title="Copy Full Document ID"
                        >
                          {copiedId === order.id ? (
                            <Check size={13} className="text-emerald-500" />
                          ) : (
                            <Copy size={13} />
                          )}
                        </button>
                      </div>
                      
                      <span className="h-4 w-[1px] bg-neutral-200 hidden sm:block"></span>
                      
                      <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                        <Calendar size={13} className="text-neutral-400" />
                        <span>{formatOrderDate(order.createdAt)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Detailed Badging */}
                      {order.status === 'completed' || order.status === 'delivered' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 uppercase tracking-widest">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          Fulfilled
                        </span>
                      ) : order.status === 'cancelled' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-neutral-100 text-neutral-600 border border-neutral-200 uppercase tracking-widest">
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-400"></span>
                          Cancelled
                        </span>
                      ) : order.status === 'processing' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-100 uppercase tracking-widest">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                          Processing
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200/60 uppercase tracking-widest">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                          Unfulfilled
                        </span>
                      )}

                      {/* Shopify-style Fulfillment Select Action */}
                      <select 
                        value={order.status || 'pending'} 
                        onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                        className="text-xs bg-white border border-neutral-200 hover:border-neutral-300 font-bold text-neutral-700 px-2.5 py-1.5 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-diveera-dark transition-all cursor-pointer"
                      >
                        <option value="pending">Mark Pending</option>
                        <option value="processing">Mark Processing</option>
                        <option value="completed">Mark Completed</option>
                        <option value="cancelled">Mark Cancelled</option>
                      </select>
                    </div>
                  </div>

                  {/* Shopify Grid Content */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
                    {/* Col 1: Products */}
                    <div className="lg:col-span-6 lg:border-r lg:border-neutral-100 lg:pr-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                          <ShoppingBag size={11} />
                          ITEMS PURCHASED
                        </span>
                        <span className="text-[10px] font-bold uppercase text-neutral-400 bg-neutral-100 px-1.5 py-0.5 rounded">
                          {order.items?.length || 0} Line {order.items?.length === 1 ? 'item' : 'items'}
                        </span>
                      </div>

                      <div className="space-y-3.5 max-h-[220px] overflow-y-auto no-scrollbar pr-1">
                        {order.items?.map((item: any, i: number) => {
                          const itemImage = item.image || item.imageUrl || item.thumbnail || 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=200&h=200&auto=format&fit=crop';
                          return (
                            <div key={i} className="flex gap-3 bg-neutral-50/50 p-2.5 rounded-xl border border-neutral-100 items-center justify-between hover:bg-neutral-50 transition-colors">
                              <div className="flex gap-3 items-center min-w-0">
                                <div className="relative w-12 h-12 bg-white rounded-lg border border-neutral-200/80 overflow-hidden shrink-0 flex items-center justify-center">
                                  <img 
                                    src={itemImage} 
                                    alt={item.name || item.title} 
                                    className="w-full h-full object-cover" 
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement;
                                      target.src = 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=200&h=200&auto=format&fit=crop';
                                    }}
                                  />
                                </div>
                                <div className="text-xs min-w-0">
                                  <p className="font-black text-neutral-800 truncate max-w-[240px] leading-snug">
                                    {item.name || item.title}
                                  </p>
                                  <p className="text-[10px] text-neutral-400 font-mono mt-0.5">
                                    Price: ₹{(item.price || (order.total / item.quantity)).toLocaleString('en-IN')}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right shrink-0">
                                <span className="font-mono font-black text-xs text-neutral-900 bg-neutral-100/80 border border-neutral-200 px-2 py-0.5 rounded-md">
                                  x{item.quantity}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Col 2: Customer Details */}
                    <div className="lg:col-span-3 lg:border-r lg:border-neutral-100 lg:pr-6 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5 mb-3">
                          <User size={11} />
                          CUSTOMER & DELIVERY
                        </span>

                        <div className="space-y-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-diveera-dark text-white font-sans font-black flex items-center justify-center text-xs shrink-0 select-none">
                              {customerInitial}
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-neutral-900 truncate">
                                {order.address?.fullName}
                              </p>
                              {order.address?.email && (
                                <p className="text-[10px] text-neutral-400 truncate mt-0.5 flex items-center gap-1">
                                  <span>{order.address.email}</span>
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="pt-2.5 border-t border-neutral-100 space-y-1.5 text-xs text-neutral-600">
                            {order.mobileNumber && (
                              <p className="flex items-center gap-1.5 font-bold text-neutral-800">
                                <Phone size={11} className="text-neutral-400" />
                                <span>+91 {order.mobileNumber}</span>
                              </p>
                            )}

                            <div className="flex items-start gap-1.5 leading-relaxed text-neutral-500 text-[11px] mt-1 pl-0.5">
                              <MapPin size={11} className="text-neutral-400 mt-0.5 shrink-0" />
                              <div>
                                <p className="font-medium text-neutral-800">{order.address?.flat}, {order.address?.area}</p>
                                <p>{order.address?.city}, {order.address?.state}</p>
                                <div className="mt-1 flex items-center gap-1.5">
                                  <span className="bg-neutral-100 text-neutral-600 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold">
                                    {order.address?.pincode}
                                  </span>
                                  {order.address?.addressType && (
                                    <span className="bg-neutral-100/50 text-neutral-500 border border-neutral-200/55 px-1.5 py-0.5 rounded text-[8px] font-sans font-bold uppercase tracking-wider">
                                      {order.address?.addressType}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Col 3: Pricing Summary */}
                    <div className="lg:col-span-3 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5 mb-3">
                          <DollarSign size={11} />
                          PAYMENT & BILLING
                        </span>

                        <div className="space-y-1.5 text-xs">
                          {order.originalTotal && order.originalTotal !== order.total && (
                            <div className="flex justify-between text-neutral-400">
                              <span>Cart Subtotal</span>
                              <span className="line-through font-mono">₹{order.originalTotal.toLocaleString('en-IN')}</span>
                            </div>
                          )}

                          {order.discount && order.discount > 0 && (
                            <div className="flex justify-between text-emerald-600 font-bold">
                              <span>Discount Applied</span>
                              <span className="font-mono">-₹{order.discount.toLocaleString('en-IN')}</span>
                            </div>
                          )}

                          <div className="pt-2 border-t border-neutral-100 flex justify-between items-baseline">
                            <span className="font-bold text-neutral-500">GRAND TOTAL</span>
                            <div className="text-right">
                              <span className="text-lg font-black text-neutral-900 font-mono">
                                ₹{order.total?.toLocaleString('en-IN') || '0'}
                              </span>
                              <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider mt-0.5">
                                Paid via COD
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-neutral-400">
                          ID: {order.id.slice(0, 8)}...
                        </span>
                        
                        <button 
                          onClick={() => handleDelete(order.id)} 
                          className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors px-2.5 py-1.5 rounded-lg text-xs font-bold"
                          title="Delete Order Record"
                        >
                          <Trash2 size={12} />
                          <span>Delete Order</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <motion.div 
                layout
                key={item.id} 
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group"
              >
                <div className="aspect-video bg-gray-100 relative">
                  <img 
                    src={item.imageUrl || item.image || item.thumbnail || 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&h=600&auto=format&fit=crop'} 
                    alt={item.name || item.title} 
                    className="w-full h-full object-cover" 
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&h=600&auto=format&fit=crop';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button onClick={() => openForm(item)} className="bg-white p-3 rounded-full text-diveera-dark hover:scale-110 transition-transform">
                      <Edit2 size={20} />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="bg-white p-3 rounded-full text-red-500 hover:scale-110 transition-transform">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-black text-lg mb-1">{item.name || item.title}</h3>
                  {activeTab === 'products' && (
                    <>
                      <p className="text-diveera-green font-black">₹{item.price}</p>
                      {item.features && item.features.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {item.features.map((f: string, i: number) => (
                            <span key={i} className="text-[9px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
                              {f}
                            </span>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                  {activeTab === 'banners' && (
                    <p className="text-diveera-grey text-sm italic">{item.subtitle}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8 max-h-[90vh] overflow-y-auto custom-scrollbar">
                <h3 className="text-2xl font-black mb-6 flex items-center justify-between">
                  <span>{editingId ? 'Edit' : 'Add New'} {activeTab === 'products' ? 'Product' : 'Banner'}</span>
                  <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                    <X size={20} />
                  </button>
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {activeTab === 'products' ? (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                          <label className="block text-xs font-black uppercase mb-1">Product Name</label>
                          <input 
                            type="text" 
                            required
                            value={formData.name || ''} 
                            onChange={e => setFormData({...formData, name: e.target.value})}
                            className="w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-diveera-green/20" 
                            placeholder="e.g. Classic Diamond Necklace"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-black uppercase mb-1">Price (₹)</label>
                          <input 
                            type="number" 
                            required
                            value={formData.price || ''} 
                            onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                            className="w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none" 
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-black uppercase mb-1">Original Price (₹)</label>
                          <input 
                            type="number" 
                            value={formData.originalPrice || ''} 
                            onChange={e => setFormData({...formData, originalPrice: Number(e.target.value)})}
                            className="w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none" 
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-black uppercase mb-1">Category</label>
                        <select 
                          value={formData.category || ''} 
                          onChange={e => setFormData({...formData, category: e.target.value})}
                          className="w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none"
                        >
                          <option value="">Select Category</option>
                          <option value="Bracelet">Bracelet</option>
                          <option value="Chains">Chains</option>
                          <option value="Earrings">Earrings</option>
                          <option value="Hair accessories">Hair accessories</option>
                          <option value="Hath phul">Hath phul</option>
                          <option value="Necklace">Necklace</option>
                          <option value="Nosepin">Nosepin</option>
                          <option value="Pendant">Pendant</option>
                          <option value="Rings">Rings</option>
                          <option value="Hampers">Hampers</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-black uppercase mb-1">Product Description</label>
                        <textarea 
                          rows={4}
                          value={formData.description || ''} 
                          onChange={e => setFormData({...formData, description: e.target.value})}
                          className="w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none resize-none font-medium text-sm"
                          placeholder="Tell the story of this piece..."
                        />
                      </div>

                      <div className="space-y-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-black uppercase">Specifications (Fill in the blanks)</label>
                          <button 
                            type="button"
                            onClick={addSpecification}
                            className="text-[10px] font-black uppercase text-diveera-green flex items-center gap-1 hover:underline"
                          >
                            <Plus size={12} /> Add Field
                          </button>
                        </div>
                        <div className="space-y-2">
                          {(formData.specifications || []).map((spec: any, idx: number) => (
                            <div key={idx} className="flex gap-2 items-center">
                              <input 
                                type="text"
                                placeholder="Label (e.g. Material)"
                                value={spec.label}
                                onChange={e => updateSpecification(idx, 'label', e.target.value)}
                                className="flex-1 px-3 py-2 bg-white border rounded-lg text-xs outline-none"
                              />
                              <input 
                                type="text"
                                placeholder="Value (e.g. 18K Gold)"
                                value={spec.value}
                                onChange={e => updateSpecification(idx, 'value', e.target.value)}
                                className="flex-1 px-3 py-2 bg-white border rounded-lg text-xs outline-none"
                              />
                              <button 
                                type="button" 
                                onClick={() => removeSpecification(idx)}
                                className="p-1.5 text-red-500 hover:bg-red-50 rounded"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-black uppercase mb-1">Shipping & Delivery Info</label>
                        <textarea 
                          rows={2}
                          value={formData.shippingInfo || ''} 
                          onChange={e => setFormData({...formData, shippingInfo: e.target.value})}
                          className="w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none resize-none font-medium text-sm"
                          placeholder="e.g. Free shipping above ₹999, Includes certificate..."
                        />
                      </div>

                      <div className="space-y-4">
                        <label className="block text-xs font-black uppercase">Images</label>
                        <div className="grid grid-cols-4 gap-4">
                          <div className="col-span-1">
                            <p className="text-[10px] font-black mb-2 uppercase text-gray-400">Main</p>
                            <div 
                              onClick={() => fileInputRef.current?.click()}
                              className="aspect-square bg-gray-50 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors overflow-hidden"
                            >
                              {formData.image ? (
                                <img src={formData.image} className="w-full h-full object-cover" />
                              ) : (
                                <Upload size={20} className="text-diveera-green mb-1" />
                              )}
                              <input 
                                type="file" 
                                ref={fileInputRef} 
                                className="hidden" 
                                accept="image/*"
                                onChange={e => handleFileUpload(e, true)}
                              />
                            </div>
                          </div>
                          <div className="col-span-3">
                            <p className="text-[10px] font-black mb-2 uppercase text-gray-400">Gallery</p>
                            <div className="flex flex-wrap gap-2">
                              {(formData.additionalImages || []).map((img: string, i: number) => (
                                <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden group">
                                  <img src={img} className="w-full h-full object-cover" />
                                  <button 
                                    onClick={() => removeAdditionalImage(i)}
                                    className="absolute inset-0 bg-red-500/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                                  >
                                    <Trash2 size={12} />
                                  </button>
                                </div>
                              ))}
                              <button 
                                type="button"
                                onClick={() => additionalFileInputRef.current?.click()}
                                className="w-16 h-16 bg-gray-50 border-2 border-dashed rounded-lg flex items-center justify-center text-diveera-green hover:bg-gray-100"
                              >
                                <Plus size={16} />
                                <input 
                                  type="file" 
                                  ref={additionalFileInputRef} 
                                  className="hidden" 
                                  accept="image/*"
                                  onChange={e => handleFileUpload(e, false)}
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-black uppercase mb-1">Rating (1-5)</label>
                          <input 
                            type="number" 
                            step="0.1"
                            min="1"
                            max="5"
                            value={formData.rating || ''} 
                            onChange={e => setFormData({...formData, rating: Number(e.target.value)})}
                            className="w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none" 
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-black uppercase mb-1">Reviews Count</label>
                          <input 
                            type="number" 
                            value={formData.reviews || ''} 
                            onChange={e => setFormData({...formData, reviews: Number(e.target.value)})}
                            className="w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none" 
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl">
                        <div className="flex items-center gap-2">
                          <input 
                            type="checkbox" 
                            id="isBestSeller"
                            checked={formData.isBestSeller || false}
                            onChange={e => setFormData({...formData, isBestSeller: e.target.checked})}
                            className="w-4 h-4 rounded border-gray-300 text-diveera-green focus:ring-diveera-green"
                          />
                          <label htmlFor="isBestSeller" className="text-xs font-black uppercase">Bestseller</label>
                        </div>
                        <div className="flex items-center gap-2">
                          <input 
                            type="checkbox" 
                            id="onSale"
                            checked={formData.onSale || false}
                            onChange={e => setFormData({...formData, onSale: e.target.checked})}
                            className="w-4 h-4 rounded border-gray-300 text-diveera-green focus:ring-diveera-green"
                          />
                          <label htmlFor="onSale" className="text-xs font-black uppercase">On Sale</label>
                        </div>
                        <div className="flex items-center gap-2">
                          <input 
                            type="checkbox" 
                            id="isBigDeal"
                            checked={formData.isBigDeal || false}
                            onChange={e => setFormData({...formData, isBigDeal: e.target.checked})}
                            className="w-4 h-4 rounded border-gray-300 text-diveera-green focus:ring-diveera-green"
                          />
                          <label htmlFor="isBigDeal" className="text-xs font-black uppercase">Big Deal</label>
                        </div>
                        <div className="flex items-center gap-2">
                          <input 
                            type="checkbox" 
                            id="inDiveeraCollection"
                            checked={formData.inDiveeraCollection || false}
                            onChange={e => setFormData({...formData, inDiveeraCollection: e.target.checked})}
                            className="w-4 h-4 rounded border-gray-300 text-diveera-green focus:ring-diveera-green"
                          />
                          <label htmlFor="inDiveeraCollection" className="text-xs font-black uppercase">Collection</label>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-xs font-black uppercase mb-1">Banner Title</label>
                        <input 
                          type="text" 
                          required
                          value={formData.title || ''} 
                          onChange={e => setFormData({...formData, title: e.target.value})}
                          className="w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-black uppercase mb-1">Subtitle</label>
                        <input 
                          type="text" 
                          value={formData.subtitle || ''} 
                          onChange={e => setFormData({...formData, subtitle: e.target.value})}
                          className="w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-black uppercase mb-1">Banner Image</label>
                        <div 
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full aspect-video bg-gray-50 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 overflow-hidden"
                        >
                          {formData.imageUrl ? (
                            <img src={formData.imageUrl} className="w-full h-full object-cover" />
                          ) : (
                            <Upload size={32} className="text-diveera-green mb-2" />
                          )}
                          <input 
                            type="file" 
                            ref={fileInputRef} 
                            className="hidden" 
                            accept="image/*"
                            onChange={e => handleFileUpload(e, true)}
                          />
                        </div>
                      </div>
                    </>
                  )}
                  <div className="pt-6 flex gap-3">
                    <button 
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="flex-1 px-6 py-4 border rounded-xl font-black uppercase text-sm hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 px-6 py-4 bg-diveera-green text-white rounded-xl font-black uppercase text-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSubmitting && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                      {editingId ? 'Save Changes' : 'Create Item'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
