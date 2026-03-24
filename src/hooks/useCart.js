import { useCartContext } from '../context/CartContext';

export const useCart = () => {
  const { cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCartContext();
  return { cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal };
};
