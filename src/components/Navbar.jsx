import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiSearch, FiMenu, FiSun, FiMoon } from 'react-icons/fi';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const { isDark, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md fixed top-0 w-full h-[70px] flex items-center border-b border-slate-200 dark:border-slate-800 z-50 shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 py-3 md:py-4 flex justify-between items-center w-full max-w-7xl">
        <Link to="/" className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight hover:opacity-80 transition-opacity">
          S'<span className="text-blue-600 dark:text-blue-400">MART</span>
        </Link>

        <form className="hidden md:flex items-center bg-slate-100 dark:bg-slate-800 rounded-full px-4 py-1.5 w-full max-w-[400px] border border-slate-200 dark:border-slate-700 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 dark:focus-within:ring-blue-900/50 transition-all shadow-inner" onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Search products..." 
            className="bg-transparent border-none outline-none w-full text-slate-700 dark:text-slate-200 text-sm px-2 placeholder-slate-400 dark:placeholder-slate-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-1 transform active:scale-95">
            <FiSearch size={18} />
          </button>
        </form>

        <div className="flex items-center gap-5 sm:gap-7">
          <button 
            onClick={toggleTheme} 
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 bg-slate-100 dark:bg-slate-800 rounded-full transition-all hover:scale-110 active:scale-95 border border-slate-200 dark:border-slate-700 shadow-sm"
            aria-label="Toggle Theme"
          >
            {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          <Link to="/products" className="hidden sm:block font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Products</Link>
          
          <Link to="/wishlist" className="relative text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 transition-all duration-200 flex items-center group">
            <FiHeart size={22} className="group-hover:fill-blue-50 dark:group-hover:fill-slate-800" />
            {wishlistItems.length > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900 shadow-sm animate-pulse">{wishlistItems.length}</span>}
          </Link>
          
          <Link to="/cart" className="relative text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 transition-all duration-200 flex items-center group">
            <FiShoppingCart size={22} className="group-hover:text-blue-600 dark:group-hover:text-blue-400" />
            {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900 shadow-sm">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
