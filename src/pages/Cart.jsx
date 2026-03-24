import React from 'react';
import { useCart } from '../hooks/useCart';
import CartItem from '../components/CartItem';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiCreditCard } from 'react-icons/fi';

const Cart = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="page-container min-h-[70vh]">
        <div className="text-center py-32 px-5 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center justify-center">
          <div className="bg-slate-50 p-10 rounded-full mb-8 shadow-inner border border-slate-100">
            <FiShoppingCart className="text-slate-300" size={80} />
          </div>
          <h2 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">Your cart is empty</h2>
          <p className="text-slate-500 mb-10 max-w-md text-lg font-medium">Looks like you haven't added anything to your cart yet. Discover something new today!</p>
          <Link to="/products" className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-10 py-5 rounded-xl transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/30 active:scale-95 text-lg">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container min-h-[70vh]">
      <div className="flex flex-wrap items-center justify-between mb-8 border-b-2 border-slate-200 pb-5 gap-4">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Shopping Cart</h1>
        <button onClick={clearCart} className="text-red-500 font-bold hover:text-red-700 hover:underline px-4 py-2 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200 active:scale-95">Clear Cart</button>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        <div className="w-full lg:w-2/3">
          {cartItems.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="w-full lg:w-1/3 bg-slate-900 text-white border border-slate-800 rounded-3xl p-8 static lg:sticky top-[100px] shadow-2xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-emerald-500/20 pointer-events-none"></div>
          <h2 className="text-2xl font-black mb-8 border-b-2 border-slate-700/50 pb-4 relative z-10">Order Summary</h2>
          
          <div className="flex flex-col gap-5 mb-8 text-slate-300 font-semibold relative z-10">
            <div className="flex justify-between items-center text-lg">
              <span>Subtotal ({cartItems.length} items)</span>
              <span className="font-bold text-white">₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center text-lg">
              <span>Estimated Tax</span>
              <span className="font-medium opacity-80 text-sm">Calculated at checkout</span>
            </div>
            <div className="flex justify-between items-center text-lg bg-slate-800/50 p-3 rounded-lg border border-slate-700">
              <span className="flex items-center gap-2">🚚 Shipping</span>
              <span className="font-extrabold text-emerald-400">FREE</span>
            </div>
          </div>
          
          <div className="border-t-2 border-slate-700/50 pt-6 mb-8 relative z-10">
            <div className="flex justify-between items-center text-3xl font-black text-white">
              <span>Total</span>
              <span>₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>
          
          <button 
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xl py-5 rounded-2xl transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/40 active:scale-[0.98] flex items-center justify-center gap-3 relative z-10 border border-blue-400/30 text-shadow-sm"
            onClick={() => navigate('/checkout')}
          >
            <FiCreditCard size={24} /> Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
