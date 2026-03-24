import React from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import { useCart } from '../hooks/useCart';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 p-5 bg-white border border-slate-200 rounded-2xl mb-4 shadow-sm hover:shadow-md transition-all group">
      <Link to={`/products/${item.id}`} className="w-28 h-28 shrink-0 flex items-center justify-center bg-white rounded-xl p-2 border border-slate-100 group-hover:border-blue-100 transition-colors">
        <img src={item.image} alt={item.title} className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300" />
      </Link>
      
      <div className="flex-grow w-full md:w-auto text-center md:text-left">
        <Link to={`/products/${item.id}`}>
          <h4 className="text-lg font-bold text-slate-900 mb-1.5 line-clamp-2 hover:text-blue-600 transition-colors">{item.title}</h4>
        </Link>
        <p className="text-xs font-black text-blue-600 opacity-80 uppercase tracking-widest mb-3">{item.category}</p>
        <span className="font-extrabold text-2xl text-slate-900">₹{item.price.toLocaleString('en-IN')}</span>
      </div>

      <div className="flex flex-wrap md:flex-nowrap items-center justify-center md:justify-end gap-x-6 gap-y-4 w-full md:w-auto mt-4 md:mt-0 pt-5 md:pt-0 border-t md:border-t-0 border-slate-100">
        <div className="flex items-center border-2 border-slate-100 hover:border-blue-200 rounded-xl overflow-hidden bg-slate-50 transition-colors">
          <button 
            className="p-3 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-slate-500 hover:text-blue-600 active:bg-slate-100"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            <FiMinus size={18} />
          </button>
          <span className="w-12 text-center font-bold text-base text-slate-800">{item.quantity}</span>
          <button 
            className="p-3 hover:bg-white transition-colors text-slate-500 hover:text-blue-600 active:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            disabled={item.quantity >= 5}
            title="Increase quantity (Max 5)"
          >
            <FiPlus size={18} />
          </button>
        </div>
        
        <div className="font-black text-2xl min-w-[120px] text-right text-slate-900">
          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
        </div>
        
        <button 
          className="p-3 text-slate-400 hover:text-white hover:bg-red-500 bg-slate-50 rounded-xl transition-all shadow-sm hover:shadow-md active:scale-95" 
          onClick={() => {
            removeFromCart(item.id);
          }}
          aria-label="Remove item"
        >
          <FiTrash2 size={22} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
