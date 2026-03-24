import { useCartContext } from '../context/CartContext';

export const useWishlist = () => {
  const { wishlistItems, toggleWishlist, isInWishlist } = useCartContext();
  return { wishlistItems, toggleWishlist, isInWishlist };
};
