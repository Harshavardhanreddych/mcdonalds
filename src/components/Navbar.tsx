import { ShoppingBag, Menu as MenuIcon, User, MapPin } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

export default function Navbar({ cartCount, onCartClick }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Mobile Menu */}
          <div className="flex items-center gap-4">
            <button className="p-2 lg:hidden text-gray-600 hover:bg-gray-100 rounded-full">
              <MenuIcon className="w-6 h-6" />
            </button>
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
              {/* McDonald's like M logo */}
              <svg viewBox="0 0 100 100" className="w-10 h-10 text-[#FFC72C] fill-current">
                <path d="M10,90 Q25,10 50,50 Q75,10 90,90" stroke="currentColor" strokeWidth="12" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-xl font-bold tracking-tight hidden sm:block">McApp</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <a href="#" className="text-gray-900 font-semibold hover:text-[#DA291C] transition-colors">Our Menu</a>
            <a href="#" className="text-gray-900 font-semibold hover:text-[#DA291C] transition-colors">Download App</a>
            <a href="#" className="text-gray-900 font-semibold hover:text-[#DA291C] transition-colors">MyRewards</a>
            <a href="#" className="text-gray-900 font-semibold hover:text-[#DA291C] transition-colors">Exclusive Deals</a>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
              <MapPin className="w-4 h-4" />
              <span>Locate</span>
            </button>
            
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
              <User className="w-6 h-6" />
            </button>
            
            <button 
              onClick={onCartClick}
              className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors bg-[#FFC72C]/10"
            >
              <ShoppingBag className="w-6 h-6 text-[#DA291C]" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[#DA291C] rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            
            <button className="hidden sm:block bg-[#FFC72C] hover:bg-[#FFC72C]/90 text-black px-6 py-2.5 rounded-full font-bold transition-colors">
              Order Now
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
