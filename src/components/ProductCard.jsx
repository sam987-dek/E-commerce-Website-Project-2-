import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiStar } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isWished = isInWishlist(product.id);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      whileHover={{ y: -8 }}
      className="bg-white dark:bg-slate-800 rounded-[1.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-500 flex flex-col h-full group relative"
    >
      <div className="relative h-48 p-5 bg-white dark:bg-slate-800 flex items-center justify-center border-b border-slate-100 dark:border-slate-700 overflow-hidden">
        <Link to={`/products/${product.id}`} className="w-full h-full flex items-center justify-center">
          <img src={product.image} alt={product.title} className="max-h-36 object-contain group-hover:scale-110 transition-transform duration-500 ease-out mix-blend-multiply dark:mix-blend-normal dark:bg-white dark:p-4 dark:rounded-xl" />
        </Link>
        <button 
          className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/80 backdrop-blur p-2 rounded-full shadow-sm hover:shadow-md text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 hover:scale-110 transition-all z-10 focus:outline-none focus:ring-2 focus:ring-red-200" 
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
        <span className="text-[10px] uppercase tracking-wider text-blue-600 dark:text-blue-400 font-bold mb-2">{product.category}</span>
        <Link to={`/products/${product.id}`} className="mb-2">
          <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100 line-clamp-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" title={product.title}>{product.title}</h3>
        </Link>

        <div className="flex items-center gap-1 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-auto pb-4">
          <FiStar className="fill-amber-400 text-amber-400" size={14} />
          <span>{product.rating?.rate}</span>
          <span className="text-slate-400 dark:text-slate-500 font-normal ml-1">({product.rating?.count} reviews)</span>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-700 pt-4 mt-2">
          <span className="text-xl font-extrabold text-slate-900 dark:text-white">₹{product.price.toLocaleString('en-IN')}</span>
          <button 
            className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all hover:shadow-lg hover:shadow-blue-500/30 active:scale-95 shadow-sm"
            onClick={(e) => {
              e.preventDefault();
              addToCart(product, 1);
            }}
          >
            <FiShoppingCart size={16} /> Add
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
