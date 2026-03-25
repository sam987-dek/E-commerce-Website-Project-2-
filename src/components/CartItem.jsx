import React from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import { useCart } from '../hooks/useCart';
import { motion } from 'framer-motion';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      layout
      transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
      className="flex flex-col md:flex-row items-center gap-6 p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl mb-4 shadow-sm hover:shadow-md transition-shadow group"
    >
      <Link to={`/products/${item.id}`} className="w-28 h-28 shrink-0 flex items-center justify-center bg-white dark:bg-slate-900 rounded-xl p-2 border border-slate-100 dark:border-slate-700 group-hover:border-blue-100 dark:group-hover:border-blue-500/50 transition-colors">
        <img src={item.image} alt={item.title} className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300 mix-blend-multiply dark:mix-blend-normal dark:bg-white dark:rounded-md dark:p-1" />
      </Link>

      <div className="flex-grow w-full md:w-auto text-center md:text-left">
        <Link to={`/products/${item.id}`}>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1.5 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{item.title}</h4>
        </Link>
        <p className="text-xs font-black text-blue-600 dark:text-blue-400 opacity-80 uppercase tracking-widest mb-3">{item.category}</p>
        <span className="font-extrabold text-2xl text-slate-900 dark:text-slate-100">₹{item.price.toLocaleString('en-IN')}</span>
      </div>

      <div className="flex flex-wrap md:flex-nowrap items-center justify-center md:justify-end gap-x-6 gap-y-4 w-full md:w-auto mt-4 md:mt-0 pt-5 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-700">
        <div className="flex items-center border-2 border-slate-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-500/50 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-900 transition-colors">
          <button
            className="p-3 hover:bg-white dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 active:bg-slate-100 dark:active:bg-slate-700"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            <FiMinus size={18} />
          </button>
          <span className="w-12 text-center font-bold text-base text-slate-800 dark:text-slate-200">{item.quantity}</span>
          <button
            className="p-3 hover:bg-white dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 active:bg-slate-100 dark:active:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            disabled={item.quantity >= 5}
            title="Increase quantity (Max 5)"
          >
            <FiPlus size={18} />
          </button>
        </div>

        <div className="font-black text-2xl min-w-[120px] text-right text-slate-900 dark:text-white">
          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
        </div>

        <button
          className="p-3 text-slate-400 dark:text-slate-500 hover:text-white dark:hover:text-white hover:bg-red-500 dark:hover:bg-red-500 bg-slate-50 dark:bg-slate-700 rounded-xl transition-all shadow-sm hover:shadow-md active:scale-95"
          onClick={() => {
            removeFromCart(item.id);
          }}
          aria-label="Remove item"
        >
          <FiTrash2 size={22} />
        </button>
      </div>
    </motion.div>
  );
};

export default CartItem;
