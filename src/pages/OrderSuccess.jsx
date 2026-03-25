import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiPackage, FiShoppingBag } from 'react-icons/fi';

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state?.orderData;

  useEffect(() => {
    // If someone visits directly without ordering, send them home
    if (!orderData) {
      navigate('/products', { replace: true });
    }
  }, [orderData, navigate]);

  if (!orderData) return null;

  return (
    <div className="page-container min-h-[80vh] flex items-center justify-center py-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
        className="max-w-2xl w-full bg-white dark:bg-slate-800 rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-700 transition-colors"
      >
        <div className="bg-gradient-to-br from-emerald-500 to-teal-700 p-12 text-center relative overflow-hidden">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 12 }}
            className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl relative z-10"
          >
            <FiCheckCircle className="text-emerald-500" size={50} />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 relative z-10">Order Confirmed!</h1>
          <p className="text-emerald-50 font-medium text-lg relative z-10">Thanks for shopping with us. Your order is being processed.</p>
          
          {/* Animated background bubbles */}
          <motion.div animate={{ y: [0, -20, 0], opacity: [0.1, 0.2, 0.1] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="absolute -top-10 -left-10 w-40 h-40 bg-white rounded-full blur-2xl pointer-events-none"></motion.div>
          <motion.div animate={{ y: [0, 20, 0], opacity: [0.1, 0.2, 0.1] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} className="absolute -bottom-10 -right-10 w-56 h-56 bg-white rounded-full blur-3xl pointer-events-none"></motion.div>
        </div>

        <div className="p-8 md:p-12">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-100 dark:border-slate-700 pb-4">
            <FiPackage className="text-blue-500 dark:text-blue-400" size={24} />
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Order Details</h2>
          </div>

          <div className="space-y-4 mb-8">
            {orderData.items.map((item, index) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + (index * 0.1), type: "spring" }}
                key={item.id} 
                className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors p-4 rounded-xl"
              >
                <img src={item.image} alt={item.title} className="w-16 h-16 object-contain bg-white dark:bg-slate-800 p-2 rounded-lg mix-blend-multiply dark:mix-blend-normal shadow-sm" />
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">{item.title}</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase mt-1 tracking-wider text-[10px]">{item.category}</p>
                </div>
                <div className="text-right">
                  <div className="font-black text-slate-900 dark:text-white text-lg">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 text-xs font-medium">Qty: {item.quantity}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-xl shadow-blue-900/5 p-8 md:p-12 relative overflow-hidden border border-slate-100 dark:border-slate-700 w-full z-10 transition-colors"
          >
             <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-indigo-600/30 opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
             <div className="flex justify-between items-center p-4 bg-slate-100 dark:bg-slate-900/50 rounded-xl">
               <span className="text-slate-900 dark:text-white font-black text-lg">Total</span>
               <span className="text-blue-600 dark:text-blue-400 font-black text-2xl">₹{orderData.total.toLocaleString('en-IN')}</span>
             </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <Link to="/products" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-lg px-10 py-4 rounded-xl transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/30 active:scale-95 group">
              <FiShoppingBag className="group-hover:scale-110 transition-transform" /> Continue Shopping
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
