/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Cart from './components/Cart';
import McBot from './components/McBot';
import UserModal from './components/UserModal';
import { MenuItem, CartItem } from './types';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const handleAddToCart = (item: MenuItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Navbar 
        cartCount={cartCount} 
        onCartClick={() => setIsCartOpen(true)} 
        onUserClick={() => setIsUserModalOpen(true)}
      />
      
      <main>
        <Hero />
        <Menu onAddToCart={handleAddToCart} />
      </main>

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
      
      <UserModal 
        isOpen={isUserModalOpen} 
        onClose={() => setIsUserModalOpen(false)} 
      />
      
      <McBot />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-bold mb-4 text-[#FFC72C]">About Us</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Our History</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Leadership Team</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Values In Action</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4 text-[#FFC72C]">Careers</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Education Opportunities</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Employee Perks</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Meet Our People</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4 text-[#FFC72C]">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Wi-Fi</a></li>
              <li><a href="#" className="hover:text-white transition-colors">PlayPlaces & Parties</a></li>
              <li><a href="#" className="hover:text-white transition-colors">McDelivery</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4 text-[#FFC72C]">Contact Us</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Gift Card FAQs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Donations</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Employment</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>© 2026 McDonald's. All Rights Reserved. This is a prototype application built with Google AI Studio.</p>
        </div>
      </footer>
    </div>
  );
}
