import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiSearch, FiMenu } from 'react-icons/fi';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';

const Navbar = () => {
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
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
    <nav className="bg-white/90 backdrop-blur-md fixed top-0 w-full h-[70px] flex items-center border-b border-slate-200 z-50 shadow-sm transition-all">
      <div className="container mx-auto px-4 flex justify-between items-center w-full max-w-7xl">
        <Link to="/" className="text-2xl font-extrabold text-slate-900 tracking-tight hover:opacity-80 transition-opacity">
          S'<span className="text-blue-600">MART</span>
        </Link>

        <form className="hidden md:flex items-center bg-slate-100 rounded-full px-4 py-1.5 w-full max-w-[400px] border border-slate-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all shadow-inner" onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Search products..." 
            className="bg-transparent border-none outline-none w-full text-slate-700 text-sm px-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="text-slate-400 hover:text-blue-600 transition-colors p-1 transform active:scale-95">
            <FiSearch size={18} />
          </button>
        </form>

        <div className="flex items-center gap-4 sm:gap-6">
          <Link to="/products" className="hidden sm:block font-medium text-slate-700 hover:text-blue-600 transition-colors">Products</Link>
          
          <Link to="/wishlist" className="relative text-slate-700 hover:text-blue-600 hover:scale-110 transition-all duration-200 flex items-center group">
            <FiHeart size={22} className="group-hover:fill-blue-50" />
            {wishlistItems.length > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white shadow-sm animate-pulse">{wishlistItems.length}</span>}
          </Link>
          
          <Link to="/cart" className="relative text-slate-700 hover:text-blue-600 hover:scale-110 transition-all duration-200 flex items-center group">
            <FiShoppingCart size={22} className="group-hover:text-blue-600" />
            {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white shadow-sm">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
