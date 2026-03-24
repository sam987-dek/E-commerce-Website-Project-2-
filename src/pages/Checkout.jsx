import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useCart } from '../hooks/useCart';

const schema = yup.object().shape({
  fullName: yup.string().required('Full Name is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  zip: yup.string().required('Zip code is required').matches(/^[0-9]+$/, 'Must be only digits').min(5, 'Must be exactly 5 digits').max(5, 'Must be exactly 5 digits'),
  cardNumber: yup.string().required('Card Number is required').matches(/^[0-9]+$/, 'Must be only digits').min(16, 'Must be exactly 16 digits').max(16, 'Must be exactly 16 digits'),
  expiry: yup.string().required('Expiry is required').matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Must be MM/YY format'),
  cvv: yup.string().required('CVV is required').matches(/^[0-9]+$/, 'Must be only digits').min(3, 'Must be 3 or 4 digits').max(4, 'Must be 3 or 4 digits'),
});

const InputField = ({ label, register, name, errors, ...props }) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-bold text-slate-700">{label}</label>
    <input 
      className={`bg-slate-50 border-2 rounded-xl px-4 py-3.5 font-semibold text-slate-800 outline-none transition-all shadow-sm ${errors[name] ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 bg-red-50/50' : 'border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 hover:border-slate-300'}`}
      {...register(name)} 
      {...props} 
    />
    {errors[name] && <span className="text-red-500 text-xs font-bold mt-1 bg-red-50 w-max px-2 py-0.5 rounded border border-red-100">{errors[name].message}</span>}
  </div>
);

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const tax = cartTotal * 0.1; // 10% tax
  const finalTotal = cartTotal + tax;

  const onSubmit = (data) => {
    setTimeout(() => {
      toast.success(`Order placed successfully, ${data.fullName}!`);
      clearCart();
      navigate('/');
    }, 1000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="page-container text-center py-32 bg-white rounded-3xl shadow-sm border border-slate-200 my-8">
        <h2 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">Cannot proceed to checkout</h2>
        <p className="text-slate-500 mb-8 font-medium text-lg">Your cart is completely empty.</p>
        <button className="bg-blue-600 font-bold text-white px-10 py-4 rounded-xl hover:bg-blue-700 hover:-translate-y-1 transition-all active:scale-95 shadow-md shadow-blue-500/20" onClick={() => navigate('/products')}>Return to Shop</button>
      </div>
    );
  }

  return (
    <div className="page-container min-h-[70vh]">
      <h1 className="text-4xl font-black text-slate-900 mb-10 tracking-tight border-b-2 border-slate-200 pb-5">Checkout</h1>
      
      <div className="flex flex-col-reverse xl:flex-row gap-10 items-start">
        <div className="w-full xl:w-2/3 bg-white border border-slate-200 rounded-[2rem] p-6 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-emerald-400"></div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-800 mb-8 flex items-center gap-4 border-b border-slate-100 pb-4">
                <span className="bg-blue-100 text-blue-600 rounded-full w-10 h-10 flex items-center justify-center text-lg shadow-inner">1</span> Shipping Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <InputField label="Full Name" name="fullName" register={register} errors={errors} placeholder="John Doe" />
                <InputField label="Email Address" name="email" type="email" register={register} errors={errors} placeholder="john@example.com" />
              </div>
              <div className="mb-6">
                <InputField label="Street Address" name="address" register={register} errors={errors} placeholder="123 Main St, Apartment 4B" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="City" name="city" register={register} errors={errors} placeholder="New York" />
                <InputField label="Zip Code" name="zip" register={register} errors={errors} maxLength="5" placeholder="10001" />
              </div>
            </div>

            <div className="pt-2">
              <h2 className="text-2xl font-extrabold text-slate-800 mb-8 flex items-center gap-4 border-b border-slate-100 pb-4">
                <span className="bg-blue-100 text-blue-600 rounded-full w-10 h-10 flex items-center justify-center text-lg shadow-inner">2</span> Payment Details
              </h2>
              <div className="mb-6">
                <InputField label="Card Number" name="cardNumber" register={register} errors={errors} maxLength="16" placeholder="0000 0000 0000 0000" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <InputField label="Expiry Date" name="expiry" register={register} errors={errors} placeholder="MM/YY" maxLength="5"/>
                <InputField label="CVV" name="cvv" register={register} errors={errors} maxLength="4" placeholder="123" />
              </div>
            </div>

            <div className="border-t-2 border-slate-100 pt-8 mt-4">
              <button type="submit" className="w-full bg-slate-900 mx-auto hover:bg-slate-800 text-white font-black text-2xl px-8 py-5 rounded-2xl transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/30 active:translate-y-0 active:scale-95 shadow-lg flex justify-center items-center gap-3 group">
                Confirm & Pay <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </button>
              <p className="text-center text-slate-400 font-medium text-xs mt-4 flex items-center justify-center gap-1">
                🔒 Guaranteed safe and secure checkout process.
              </p>
            </div>
          </form>
        </div>

        <div className="w-full xl:w-1/3 bg-slate-50 border border-slate-200 rounded-[2rem] p-8 sm:p-10 sticky top-[100px] shadow-sm">
          <h2 className="text-2xl font-extrabold text-slate-800 mb-6 pb-5 border-b-2 border-slate-200">Order Summary</h2>
          <div className="max-h-80 overflow-y-auto mb-6 pr-3 space-y-4 custom-scrollbar">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-start text-sm font-bold text-slate-600 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm transition-transform hover:-translate-y-0.5">
                <span className="flex-1 pr-4 line-clamp-2 leading-snug">{item.quantity}x {item.title}</span>
                <span className="text-slate-900 font-black text-base">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t-2 border-slate-200 pt-6 space-y-4 font-bold text-slate-600">
            <div className="flex justify-between text-base">
              <span>Subtotal</span>
              <span className="text-slate-900">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base">
              <span>Tax (10%)</span>
              <span className="text-slate-900">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-green-600 text-base">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-3xl font-black text-slate-900 pt-6 mt-6 border-t-2 border-slate-200">
              <span>Total</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
