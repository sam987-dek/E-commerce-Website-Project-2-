import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiShoppingCart, FiHeart, FiStar, FiTruck, FiShield, FiRefreshCcw, FiMinus, FiPlus } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { fetchProductById } from '../services/api';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { toast } from 'react-toastify';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-[60vh]"><div className="w-16 h-16 border-[6px] border-slate-200 border-l-blue-600 rounded-full animate-spin"></div></div>;
  }

  if (!product) {
    return (
      <div className="text-center py-32 px-5 bg-white border border-slate-200 rounded-3xl m-8 shadow-sm">
        <h2 className="text-3xl font-black text-slate-800 mb-4">Product not found</h2>
        <button onClick={() => navigate('/products')} className="bg-blue-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">Back to Shop</button>
      </div>
    );
  }

  const isWished = isInWishlist(product.id);

  return (
    <div className="page-container min-h-[80vh]">
      <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-slate-500 font-extrabold hover:text-blue-600 mb-8 transition-colors group bg-white px-5 py-2.5 rounded-full shadow-sm border border-slate-200">
        <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back
      </button>

      <div className="bg-white rounded-3xl overflow-hidden shadow-md border border-slate-200 flex flex-col md:flex-row gap-0 md:gap-10">
        <div className="w-full md:w-1/2 p-8 md:p-14 bg-white flex items-center justify-center relative border-b md:border-b-0 md:border-r border-slate-100 group">
          <button 
            className="absolute top-6 right-6 p-4 bg-slate-50 border border-slate-200 hover:bg-white rounded-full text-slate-400 hover:text-red-500 transition-all shadow-md hover:shadow-lg hover:scale-110 active:scale-95 z-10"
            onClick={() => toggleWishlist(product)}
            title={isWished ? "Remove from wishlist" : "Add to wishlist"}
          >
            {isWished ? <FaHeart className="text-red-500" size={24} /> : <FiHeart size={24} />}
          </button>
          <img src={product.image} alt={product.title} className="max-w-full max-h-[500px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700 ease-out" />
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <p className="inline-block py-1.5 px-4 bg-blue-50 text-blue-600 font-black text-xs uppercase tracking-widest rounded-full mb-6 w-max border border-blue-100 shadow-inner">
            {product.category}
          </p>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight tracking-tight">{product.title}</h1>
          
          <div className="flex items-center gap-2 mb-8 bg-slate-50 w-max px-5 py-2.5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex text-amber-400">
              <FiStar className="fill-amber-400" size={20} />
            </div>
            <span className="font-extrabold text-slate-900 text-lg">{product.rating?.rate}</span>
            <span className="text-slate-500 font-bold ml-1 text-sm">({product.rating?.count} verified reviews)</span>
          </div>

          <div className="text-4xl md:text-5xl font-black text-slate-900 mb-8 tracking-tighter flex items-center gap-4">
            ₹{product.price.toLocaleString('en-IN')}
            <span className="text-sm font-black text-emerald-600 bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200 uppercase tracking-wider shadow-inner">In Stock</span>
          </div>

          <p className="text-slate-600 text-lg leading-relaxed mb-10 font-medium">
            {product.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-5 mb-10 border-b-2 border-slate-100 pb-10">
            <div className="flex items-center border-2 border-slate-200 rounded-2xl overflow-hidden bg-slate-50 w-max focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all shadow-inner">
              <button 
                className="p-5 text-slate-500 hover:text-blue-600 hover:bg-white transition-colors active:bg-slate-100"
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
              >
                <FiMinus size={22} />
              </button>
              <span className="w-14 text-center font-black text-2xl text-slate-900">{quantity}</span>
              <button 
                className="p-5 text-slate-500 hover:text-blue-600 hover:bg-white transition-colors active:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
                onClick={() => setQuantity(q => Math.min(5, q + 1))}
                disabled={quantity >= 5}
                title="Increase quantity (Max 5)"
              >
                <FiPlus size={22} />
              </button>
            </div>
            
            <button 
              className="flex-grow flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-black text-xl px-8 py-5 rounded-2xl transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/30 active:scale-95 shadow-lg shadow-blue-500/20"
              onClick={() => {
                addToCart(product, quantity);
                toast.success(`${quantity}x ${product.title} added to cart!`);
              }}
            >
              <FiShoppingCart size={24} /> Add to Cart
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm font-bold text-slate-700">
            <div className="flex items-center gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-sm transition-transform hover:-translate-y-1">
              <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                <FiTruck size={24} />
              </div>
              <span>Free Delivery<br/><span className="text-slate-500 font-semibold text-xs mt-0.5 inline-block">Orders over ₹5,000</span></span>
            </div>
            <div className="flex items-center gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-sm transition-transform hover:-translate-y-1">
              <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                <FiRefreshCcw size={24} />
              </div>
              <span>30 Days<br/><span className="text-slate-500 font-semibold text-xs mt-0.5 inline-block">Easy Returns</span></span>
            </div>
            <div className="flex items-center gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-sm transition-transform hover:-translate-y-1">
              <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                <FiShield size={24} />
              </div>
              <span>Secure<br/><span className="text-slate-500 font-semibold text-xs mt-0.5 inline-block">100% Guaranteed</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
