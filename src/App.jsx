import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import AnimatedPage from './components/AnimatedPage';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />
      <main className="flex-grow pt-[70px]">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
            <Route path="/products" element={<AnimatedPage><Products /></AnimatedPage>} />
            <Route path="/products/:id" element={<AnimatedPage><ProductDetails /></AnimatedPage>} />
            <Route path="/wishlist" element={<AnimatedPage><Wishlist /></AnimatedPage>} />
            <Route path="/cart" element={<AnimatedPage><Cart /></AnimatedPage>} />
            <Route path="/checkout" element={<AnimatedPage><Checkout /></AnimatedPage>} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
