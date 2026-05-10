import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lock, User, Chrome } from 'lucide-react';
import { auth } from '../lib/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

export default function AdminLogin() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    console.log('Login attempt with ID:', userId);
    if (userId === 'Anshuman' && password === 'Anshu9785') {
      localStorage.setItem('admin_session', 'active');
      setIsSuccess(true);
      setTimeout(() => navigate('/admin'), 1000);
    } else {
      setError('Invalid ID or Password');
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log('Google login success for:', result.user.email);
      localStorage.setItem('admin_session', 'active');
      setIsSuccess(true);
      setTimeout(() => navigate('/admin'), 1000);
    } catch (err: any) {
      console.error('Google login error:', err);
      setError(err.message || 'Google Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif italic text-diveera-green mb-2">Diveera Admin</h1>
          <p className="text-gray-500 text-sm">Sign in with Google to manage live data</p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-white border-2 border-diveera-green/30 text-gray-700 py-4 rounded-xl font-black flex items-center justify-center gap-3 hover:bg-diveera-green/5 transition-all mb-6 shadow-sm"
          >
            <Chrome size={20} className="text-blue-500" />
            Continue with Google
          </button>

          <div className="relative flex items-center py-5">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-[10px] font-black uppercase tracking-widest">Demo Access Only</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4 opacity-60 hover:opacity-100 transition-opacity">
            <div>
              <label className="block text-xs font-black uppercase text-diveera-grey tracking-wider mb-2">Login ID</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-diveera-green focus:border-transparent transition-all outline-none"
                  placeholder="Enter ID"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-diveera-grey tracking-wider mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-diveera-green focus:border-transparent transition-all outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-center text-sm font-bold">{error}</p>}
            {isSuccess && <p className="text-green-500 text-center text-sm font-bold">Successfully Logged In! Redirecting...</p>}

            <button 
              type="submit"
              disabled={loading || isSuccess}
              className="w-full bg-gray-100 text-gray-500 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 text-xs"
            >
              {loading ? 'Processing...' : isSuccess ? 'Redirecting...' : 'Enter Preview Mode'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
