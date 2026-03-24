import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiStar } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isWished = isInWishlist(product.id);

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-blue-200 flex flex-col h-full group relative transform hover:-translate-y-1">
      <div className="relative h-48 p-5 bg-white flex items-center justify-center border-b border-slate-100 overflow-hidden">
        <Link to={`/products/${product.id}`} className="w-full h-full flex items-center justify-center">
          <img src={product.image} alt={product.title} className="max-h-36 object-contain group-hover:scale-110 transition-transform duration-500 ease-out" />
        </Link>
        <button 
          className="absolute top-3 right-3 bg-white/90 backdrop-blur p-2 rounded-full shadow-sm hover:shadow-md text-slate-400 hover:text-red-500 hover:scale-110 transition-all z-10 focus:outline-none focus:ring-2 focus:ring-red-200" 
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          aria-label="Toggle Wishlist"
        >
          {isWished ? <FaHeart className="text-red-500" size={18} /> : <FiHeart size={18} />}
        </button>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <span className="text-[10px] uppercase tracking-wider text-blue-600 font-bold mb-2">{product.category}</span>
        <Link to={`/products/${product.id}`} className="mb-2">
          <h3 className="text-base font-semibold text-slate-800 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors" title={product.title}>{product.title}</h3>
        </Link>

        <div className="flex items-center gap-1 text-sm font-semibold text-slate-700 mb-auto pb-4">
          <FiStar className="fill-amber-400 text-amber-400" size={14} />
          <span>{product.rating?.rate}</span>
          <span className="text-slate-400 font-normal ml-1">({product.rating?.count} reviews)</span>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-2">
          <span className="text-xl font-extrabold text-slate-900">${product.price.toFixed(2)}</span>
          <button 
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-lg text-sm font-medium transition-all hover:shadow-lg hover:shadow-blue-500/30 active:scale-95 shadow-sm"
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
          >
            <FiShoppingCart size={16} /> Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
