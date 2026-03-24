import React from 'react';
import { useWishlist } from '../hooks/useWishlist';
import ProductGrid from '../components/ProductGrid';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingBag } from 'react-icons/fi';

const Wishlist = () => {
  const { wishlistItems } = useWishlist();

  return (
    <div className="page-container min-h-[70vh]">
      <div className="flex items-center gap-4 mb-10 border-b-2 border-slate-200 pb-5">
        <div className="bg-red-100 text-red-500 p-3 rounded-2xl shadow-inner">
          <FiHeart className="fill-red-500/30" size={36} />
        </div>
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Your Wishlist</h1>
          <p className="text-slate-500 font-medium mt-1">Saved items you love</p>
        </div>
        <span className="bg-slate-900 text-white px-4 py-1.5 rounded-full text-sm font-black ml-auto shadow-md">{wishlistItems.length} Items</span>
      </div>
      
      {wishlistItems.length === 0 ? (
        <div className="text-center py-32 px-5 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center justify-center">
          <div className="bg-slate-50 p-8 rounded-full mb-8 shadow-inner border border-slate-100">
            <FiHeart className="text-slate-300 fill-slate-200" size={80} />
          </div>
          <h2 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">Your wishlist is empty</h2>
          <p className="text-slate-500 mb-10 max-w-md text-lg font-medium">Browse our products and click the heart icon to save your favorite items here for later.</p>
          <Link to="/products" className="inline-flex items-center gap-2 justify-center bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-10 py-4 rounded-xl transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/30 active:translate-y-0 active:scale-95 text-lg group">
            <FiShoppingBag className="group-hover:animate-bounce" /> Explore Products
          </Link>
        </div>
      ) : (
        <ProductGrid products={wishlistItems} />
      )}
    </div>
  );
};

export default Wishlist;
