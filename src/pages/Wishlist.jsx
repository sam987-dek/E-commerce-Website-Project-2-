import React from 'react';
import { useWishlist } from '../hooks/useWishlist';
import ProductGrid from '../components/ProductGrid';
import { Link, useNavigate } from 'react-router-dom';
import { FiHeart, FiShoppingBag } from 'react-icons/fi';

const Wishlist = () => {
  const { wishlistItems } = useWishlist();
  const navigate = useNavigate(); // Initialized useNavigate

  if (wishlistItems.length === 0) {
    return (
      <div className="page-container min-h-[70vh]">
        <div className="flex justify-between items-end mb-8 border-b-2 border-slate-200 dark:border-slate-800 pb-4 transition-colors">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">Your Wishlist <span className="text-blue-600 dark:text-blue-400">({wishlistItems.length})</span></h1>
        </div>
        <div className="text-center py-32 px-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center justify-center transition-colors">
          <div className="bg-red-50 dark:bg-red-900/20 p-8 rounded-full mb-6">
            <FiHeart className="text-red-400 dark:text-red-500" size={64} />
          </div>
          <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-4">Your Wishlist is Empty</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8 font-medium">Save items you love here to easily find them later and add them to your cart.</p>
          <button 
            onClick={() => navigate('/products')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95 inline-flex items-center gap-2 justify-center group">
            <FiShoppingBag className="group-hover:animate-bounce" /> Explore Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container min-h-[70vh]">
      <div className="flex justify-between items-end mb-8 border-b-2 border-slate-200 dark:border-slate-800 pb-4 transition-colors">
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">Your Wishlist <span className="text-blue-600 dark:text-blue-400">({wishlistItems.length})</span></h1>
      </div>
      
      <ProductGrid products={wishlistItems} />
    </div>
  );
};

export default Wishlist;
