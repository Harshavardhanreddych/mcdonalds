import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, ShoppingBag, CheckCircle, Loader2, MapPin, CreditCard, Banknote, Smartphone, Car, ChefHat, Clock, Wallet } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

type CheckoutStep = 'cart' | 'details' | 'processing' | 'success' | 'tracking';
type PaymentMethod = 'card' | 'upi' | 'cash' | 'applepay' | 'googlepay' | 'paypal' | 'wallet';

export default function Cart({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem, onClearCart }: CartProps) {
  const [step, setStep] = useState<CheckoutStep>('cart');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [isLocating, setIsLocating] = useState(false);
  
  // Card details state
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [error, setError] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleCheckoutClick = () => {
    setStep('details');
    setError('');
  };

  const handlePlaceOrder = () => {
    setError('');
    if (!address.trim()) {
      setError('Please enter a delivery address or use current location.');
      return;
    }
    
    if (paymentMethod === 'card') {
      if (cardNumber.length < 15 || !cardExpiry || !cardCvv) {
        setError('Please enter valid card details (15-16 digits, MM/YY, CVV)');
        return;
      }
    }
    
    setStep('processing');
    // Simulate payment processing
    setTimeout(() => {
      setStep('tracking');
      onClearCart();
    }, 2000);
  };

  const handleClose = () => {
    setStep('cart');
    setAddress('');
    setPaymentMethod('card');
    setCardNumber('');
    setCardExpiry('');
    setCardCvv('');
    setError('');
    onClose();
  };

  const handleGetLocation = () => {
    setIsLocating(true);
    setError('');
    
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          
          if (data && data.display_name) {
            setAddress(data.display_name);
          } else {
            setError('Could not determine address from location');
          }
        } catch (error) {
          console.error('Error fetching address:', error);
          setError('Failed to get address. Please enter manually.');
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        setError('Failed to get your location. Please ensure location permissions are granted.');
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-[#DA291C]" />
                {step === 'details' ? 'Checkout Details' : 'Your Order'}
              </h2>
              <button
                onClick={handleClose}
                className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {step === 'tracking' ? (
                <div className="flex flex-col h-full">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Order placed!</h3>
                    <div className="flex items-center justify-center gap-2 text-gray-500 font-medium">
                      <Clock className="w-5 h-5" />
                      <span>Estimated delivery: 15-20 mins</span>
                    </div>
                  </div>

                  {/* Map Area */}
                  <div className="relative w-full h-64 bg-gray-100 rounded-2xl overflow-hidden mb-8 border border-gray-200">
                    {/* Simulated Map Grid */}
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                    
                    {/* Route Line */}
                    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                      <path d="M 50,50 Q 150,50 150,150 T 250,200" fill="none" stroke="#DA291C" strokeWidth="4" strokeDasharray="8 8" className="animate-pulse" />
                    </svg>

                    {/* Restaurant Marker */}
                    <div className="absolute top-[30px] left-[30px] w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center z-10">
                      <ChefHat className="w-6 h-6 text-[#DA291C]" />
                    </div>

                    {/* Destination Marker */}
                    <div className="absolute bottom-[30px] right-[30px] w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center z-10">
                      <MapPin className="w-6 h-6 text-black" />
                    </div>

                    {/* Moving Car */}
                    <motion.div 
                      className="absolute w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center z-20"
                      initial={{ top: '30px', left: '30px' }}
                      animate={{ top: 'calc(100% - 70px)', left: 'calc(100% - 70px)' }}
                      transition={{ duration: 15, ease: "linear", repeat: Infinity }}
                    >
                      <Car className="w-6 h-6 text-[#FFC72C]" />
                    </motion.div>
                  </div>

                  {/* Status Tracker */}
                  <div className="space-y-6 mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <CheckCircle className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">Order Confirmed</p>
                        <p className="text-sm text-gray-500">Your order has been received</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-[#DA291C]">
                        <ChefHat className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">Preparing</p>
                        <p className="text-sm text-gray-500">Your food is being prepared</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 opacity-50">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                        <Car className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">On the Way</p>
                        <p className="text-sm text-gray-500">Driver is picking up your order</p>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={handleClose}
                    className="mt-auto w-full py-4 bg-gray-100 text-gray-900 font-bold rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    Close Tracking
                  </button>
                </div>
              ) : step === 'success' ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 15 }}
                  >
                    <CheckCircle className="w-24 h-24 text-green-500 mb-6" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Order Successful!</h3>
                  <p className="text-gray-500 mb-8">Your order is being prepared and will be delivered soon.</p>
                  <button 
                    onClick={handleClose}
                    className="px-8 py-3 bg-[#FFC72C] text-black font-bold rounded-full hover:bg-[#FFC72C]/90 transition-colors"
                  >
                    Back to Menu
                  </button>
                </div>
              ) : step === 'details' || step === 'processing' ? (
                <div className="space-y-6">
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
                      {error}
                    </div>
                  )}
                  {/* Delivery Address */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Delivery Address</h3>
                    <div className="space-y-3">
                      <button
                        onClick={handleGetLocation}
                        disabled={isLocating}
                        className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-xl font-medium transition-colors disabled:opacity-70"
                      >
                        {isLocating ? <Loader2 className="w-5 h-5 animate-spin" /> : <MapPin className="w-5 h-5" />}
                        {isLocating ? 'Detecting Location...' : 'Use Current Location'}
                      </button>
                      <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter full delivery address..."
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FFC72C] focus:border-transparent outline-none resize-none h-24"
                      />
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Payment Method</h3>
                    <div className="space-y-3">
                      <div className={`border rounded-xl transition-colors ${paymentMethod === 'card' ? 'border-[#DA291C] bg-red-50/30' : 'border-gray-200 hover:bg-gray-50'}`}>
                        <label className="flex items-center p-4 cursor-pointer">
                          <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="hidden" />
                          <CreditCard className={`w-6 h-6 mr-3 ${paymentMethod === 'card' ? 'text-[#DA291C]' : 'text-gray-500'}`} />
                          <span className="font-medium text-gray-900">Credit / Debit Card</span>
                          <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'card' ? 'border-[#DA291C]' : 'border-gray-300'}`}>
                            {paymentMethod === 'card' && <div className="w-2.5 h-2.5 rounded-full bg-[#DA291C]" />}
                          </div>
                        </label>
                        <AnimatePresence>
                          {paymentMethod === 'card' && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }} 
                              animate={{ height: 'auto', opacity: 1 }} 
                              exit={{ height: 0, opacity: 0 }}
                              className="px-4 pb-4 overflow-hidden"
                            >
                              <div className="space-y-3 pt-2">
                                <input 
                                  type="text" 
                                  placeholder="Card Number" 
                                  value={cardNumber}
                                  onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FFC72C] focus:border-transparent outline-none bg-white" 
                                />
                                <div className="flex gap-3">
                                  <input 
                                    type="text" 
                                    placeholder="MM/YY" 
                                    value={cardExpiry}
                                    onChange={(e) => setCardExpiry(e.target.value)}
                                    className="w-1/2 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FFC72C] focus:border-transparent outline-none bg-white" 
                                    maxLength={5} 
                                  />
                                  <input 
                                    type="text" 
                                    placeholder="CVV" 
                                    value={cardCvv}
                                    onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                                    className="w-1/2 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FFC72C] focus:border-transparent outline-none bg-white" 
                                  />
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      
                      <div className={`border rounded-xl transition-colors ${paymentMethod === 'upi' ? 'border-[#DA291C] bg-red-50/30' : 'border-gray-200 hover:bg-gray-50'}`}>
                        <label className="flex items-center p-4 cursor-pointer">
                          <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} className="hidden" />
                          <Smartphone className={`w-6 h-6 mr-3 ${paymentMethod === 'upi' ? 'text-[#DA291C]' : 'text-gray-500'}`} />
                          <span className="font-medium text-gray-900">UPI Payment</span>
                          <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'upi' ? 'border-[#DA291C]' : 'border-gray-300'}`}>
                            {paymentMethod === 'upi' && <div className="w-2.5 h-2.5 rounded-full bg-[#DA291C]" />}
                          </div>
                        </label>
                        <AnimatePresence>
                          {paymentMethod === 'upi' && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }} 
                              animate={{ height: 'auto', opacity: 1 }} 
                              exit={{ height: 0, opacity: 0 }}
                              className="px-4 pb-4 overflow-hidden flex flex-col items-center"
                            >
                              <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm mb-2">
                                <img 
                                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=mcdonalds@upi&pn=McDonalds&am=${total.toFixed(2)}`} 
                                  alt="UPI QR Code" 
                                  className="w-32 h-32" 
                                />
                              </div>
                              <p className="text-sm text-gray-500 font-medium">Scan with any UPI app to pay</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === 'applepay' ? 'border-[#DA291C] bg-red-50/30' : 'border-gray-200 hover:bg-gray-50'}`}>
                        <input type="radio" name="payment" value="applepay" checked={paymentMethod === 'applepay'} onChange={() => setPaymentMethod('applepay')} className="hidden" />
                        <svg viewBox="0 0 384 512" className={`w-6 h-6 mr-3 fill-current ${paymentMethod === 'applepay' ? 'text-[#DA291C]' : 'text-gray-500'}`}>
                          <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                        </svg>
                        <span className="font-medium text-gray-900">Apple Pay</span>
                        <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'applepay' ? 'border-[#DA291C]' : 'border-gray-300'}`}>
                          {paymentMethod === 'applepay' && <div className="w-2.5 h-2.5 rounded-full bg-[#DA291C]" />}
                        </div>
                      </label>

                      <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === 'googlepay' ? 'border-[#DA291C] bg-red-50/30' : 'border-gray-200 hover:bg-gray-50'}`}>
                        <input type="radio" name="payment" value="googlepay" checked={paymentMethod === 'googlepay'} onChange={() => setPaymentMethod('googlepay')} className="hidden" />
                        <svg viewBox="0 0 488 512" className={`w-6 h-6 mr-3 fill-current ${paymentMethod === 'googlepay' ? 'text-[#DA291C]' : 'text-gray-500'}`}>
                          <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
                        </svg>
                        <span className="font-medium text-gray-900">Google Pay</span>
                        <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'googlepay' ? 'border-[#DA291C]' : 'border-gray-300'}`}>
                          {paymentMethod === 'googlepay' && <div className="w-2.5 h-2.5 rounded-full bg-[#DA291C]" />}
                        </div>
                      </label>

                      <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === 'paypal' ? 'border-[#DA291C] bg-red-50/30' : 'border-gray-200 hover:bg-gray-50'}`}>
                        <input type="radio" name="payment" value="paypal" checked={paymentMethod === 'paypal'} onChange={() => setPaymentMethod('paypal')} className="hidden" />
                        <svg viewBox="0 0 384 512" className={`w-6 h-6 mr-3 fill-current ${paymentMethod === 'paypal' ? 'text-[#DA291C]' : 'text-gray-500'}`}>
                          <path d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 9.4-16.2 18.1-16.2h205.1c53.2 0 85 23.4 96.4 65 6.9 25.4 1.8 46.5-13.4 66.7-21.6 28.7-61 46.9-106.8 46.9H164.5c-11.3 0-21.4 8.1-23.6 19.3-3.7 18.9-16.9 87.5-29.5 148.6z"/>
                        </svg>
                        <span className="font-medium text-gray-900">PayPal</span>
                        <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'paypal' ? 'border-[#DA291C]' : 'border-gray-300'}`}>
                          {paymentMethod === 'paypal' && <div className="w-2.5 h-2.5 rounded-full bg-[#DA291C]" />}
                        </div>
                      </label>

                      <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === 'wallet' ? 'border-[#DA291C] bg-red-50/30' : 'border-gray-200 hover:bg-gray-50'}`}>
                        <input type="radio" name="payment" value="wallet" checked={paymentMethod === 'wallet'} onChange={() => setPaymentMethod('wallet')} className="hidden" />
                        <Wallet className={`w-6 h-6 mr-3 ${paymentMethod === 'wallet' ? 'text-[#DA291C]' : 'text-gray-500'}`} />
                        <span className="font-medium text-gray-900">Digital Wallet</span>
                        <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'wallet' ? 'border-[#DA291C]' : 'border-gray-300'}`}>
                          {paymentMethod === 'wallet' && <div className="w-2.5 h-2.5 rounded-full bg-[#DA291C]" />}
                        </div>
                      </label>

                      <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === 'cash' ? 'border-[#DA291C] bg-red-50/30' : 'border-gray-200 hover:bg-gray-50'}`}>
                        <input type="radio" name="payment" value="cash" checked={paymentMethod === 'cash'} onChange={() => setPaymentMethod('cash')} className="hidden" />
                        <Banknote className={`w-6 h-6 mr-3 ${paymentMethod === 'cash' ? 'text-[#DA291C]' : 'text-gray-500'}`} />
                        <span className="font-medium text-gray-900">Cash on Delivery</span>
                        <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'cash' ? 'border-[#DA291C]' : 'border-gray-300'}`}>
                          {paymentMethod === 'cash' && <div className="w-2.5 h-2.5 rounded-full bg-[#DA291C]" />}
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              ) : items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <ShoppingBag className="w-16 h-16 mb-4 text-gray-300" />
                  <p className="text-lg font-medium">Your cart is empty</p>
                  <p className="text-sm mt-2">Add some delicious items to get started!</p>
                  <button 
                    onClick={handleClose}
                    className="mt-6 px-6 py-2 bg-[#FFC72C] text-black font-bold rounded-full hover:bg-[#FFC72C]/90 transition-colors"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                <ul className="space-y-6">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="text-base font-bold text-gray-900 line-clamp-2">{item.name}</h3>
                            <p className="font-bold text-[#DA291C] ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{item.calories} Cal.</p>
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() => item.quantity > 1 ? onUpdateQuantity(item.id, item.quantity - 1) : onRemoveItem(item.id)}
                            className="p-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-bold w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="ml-auto text-sm text-gray-500 hover:text-[#DA291C] underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {step !== 'success' && items.length > 0 && (
              <div className="border-t p-6 bg-gray-50">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-gray-900 border-t pt-3">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                
                {step === 'cart' ? (
                  <button 
                    onClick={handleCheckoutClick}
                    className="w-full flex items-center justify-center gap-2 bg-[#DA291C] hover:bg-[#DA291C]/90 text-white py-4 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-red-500/30"
                  >
                    Proceed to Checkout
                  </button>
                ) : (
                  <button 
                    onClick={handlePlaceOrder}
                    disabled={step === 'processing'}
                    className="w-full flex items-center justify-center gap-2 bg-[#DA291C] hover:bg-[#DA291C]/90 text-white py-4 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-red-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {step === 'processing' ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      `Place Order • $${total.toFixed(2)}`
                    )}
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
