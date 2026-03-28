import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Mail, Lock, LogOut } from 'lucide-react';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserModal({ isOpen, onClose }: UserModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (email && password && (!isLogin ? name : true)) {
      // Simulate login/signup
      setTimeout(() => {
        setIsLoggedIn(true);
      }, 500);
    } else {
      setError('Please fill in all fields');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    setName('');
    setError('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <User className="w-6 h-6 text-[#DA291C]" />
                {isLoggedIn ? 'My Profile' : (isLogin ? 'Welcome Back' : 'Create Account')}
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {isLoggedIn ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-16 h-16 bg-[#FFC72C] rounded-full flex items-center justify-center text-2xl font-bold text-gray-900">
                      {(name || email || 'U')[0].toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{name || 'McApp User'}</h3>
                      <p className="text-gray-500">{email}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-xl font-medium transition-colors">
                      Order History
                    </button>
                    <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-xl font-medium transition-colors">
                      Saved Addresses
                    </button>
                    <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-xl font-medium transition-colors">
                      Payment Methods
                    </button>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 py-3 text-[#DA291C] font-bold hover:bg-red-50 rounded-xl transition-colors mt-4"
                  >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
                      {error}
                    </div>
                  )}
                  {!isLogin && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FFC72C] focus:border-transparent outline-none"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FFC72C] focus:border-transparent outline-none"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FFC72C] focus:border-transparent outline-none"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#DA291C] text-white font-bold py-3 rounded-xl hover:bg-[#DA291C]/90 transition-colors mt-6"
                  >
                    {isLogin ? 'Sign In' : 'Create Account'}
                  </button>

                  <div className="text-center mt-4">
                    <button
                      type="button"
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-sm text-gray-600 hover:text-[#DA291C] font-medium"
                    >
                      {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
