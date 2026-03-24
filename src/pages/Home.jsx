import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductGrid from '../components/ProductGrid';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Home = () => {
  const { products, categories, loading } = useProducts();

  const featuredProducts = products
    .filter(p => p.rating && p.rating.rate > 4.5)
    .slice(0, 8);

  const heroBanners = [
    {
      id: 1,
      title: "Discover Your Next Favorite Thing",
      subtitle: "Explore our latest collection of premium products at unmatched prices.",
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=2070",
      cta: "Shop Now"
    },
    {
      id: 2,
      title: "Style Meets Technology",
      subtitle: "Upgrade your gear with our newest electronics and fashion lines.",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=2070",
      cta: "Explore Collections"
    }
  ];

  if (loading) {
    return <div className="flex items-center justify-center min-h-[50vh]"><div className="w-12 h-12 border-4 border-slate-200 border-l-blue-600 rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="pb-16 bg-slate-50">
      <section className="w-full h-[60vh] min-h-[450px] max-h-[700px] relative group overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          className="w-full h-full [&_.swiper-pagination-bullet-active]:bg-blue-600 [&_.swiper-button-next]:text-white [&_.swiper-button-prev]:text-white [&_.swiper-button-next]:drop-shadow-lg [&_.swiper-button-prev]:drop-shadow-lg hover:[&_.swiper-button-next]:scale-125 hover:[&_.swiper-button-prev]:scale-125 hover:[&_.swiper-button-next]:text-blue-600 hover:[&_.swiper-button-prev]:text-blue-600 [&_.swiper-button-next]:transition-all [&_.swiper-button-prev]:transition-all"
        >
          {heroBanners.map(banner => (
            <SwiperSlide key={banner.id}>
              <div className="w-full h-full bg-cover bg-center relative flex items-center transform transition-transform duration-[10000ms] ease-linear hover:scale-105" style={{ backgroundImage: `url(${banner.image})` }}>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent z-10 w-full h-full"></div>
                <div className="relative z-20 text-white max-w-3xl px-8 md:px-16 animate-fade-in-up">
                  <span className="inline-block py-1 px-3 rounded-full bg-blue-600/30 text-blue-300 font-bold text-sm tracking-widest uppercase mb-4 shadow-sm border border-blue-500/30">New Arrivals</span>
                  <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tighter text-white drop-shadow-xl">{banner.title}</h1>
                  <p className="text-xl md:text-2xl mb-10 opacity-90 font-medium drop-shadow-md text-slate-200 max-w-2xl">{banner.subtitle}</p>
                  <Link to="/products" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-extrabold px-10 py-4 rounded-xl transition-all hover:-translate-y-1 active:scale-95 shadow-xl shadow-blue-500/40 text-lg group">
                    {banner.cta} <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="page-container mt-8">
        <div className="flex justify-between items-end mb-8 border-b-2 border-slate-200 pb-4">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Shop by Category</h2>
        </div>
        <div className="flex overflow-x-auto snap-x no-scrollbar pb-6 px-1 md:px-0 md:pb-0 md:grid md:grid-cols-4 gap-4 md:gap-6">
          {categories.slice(0, 4).map(cat => (
            <Link to={`/products?category=${cat}`} key={cat} className="group relative h-48 shrink-0 w-[70vw] sm:w-[45vw] md:w-auto snap-center rounded-2xl overflow-hidden flex items-center justify-center text-center transition-all hover:shadow-2xl hover:shadow-blue-500/20 bg-slate-800">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-700 to-emerald-400 opacity-90 group-hover:opacity-100 transition-opacity z-0"></div>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
              <div className="relative z-20 p-6 transform group-hover:scale-110 transition-transform duration-500 flex flex-col items-center">
                <h3 className="text-white text-2xl font-black mb-2 drop-shadow-md capitalize tracking-tight">{cat.split('-').join(' ')}</h3>
                <span className="text-white bg-white/20 px-4 py-1.5 rounded-full text-sm font-bold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 backdrop-blur-sm border border-white/30 flex items-center gap-1 shadow-lg">Browse <span className="text-lg leading-none">&rarr;</span></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="page-container mt-4">
        <div className="flex justify-between items-end mb-8 border-b-2 border-slate-200 pb-4">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full animate-pulse shadow-lg shadow-red-500/30">HOT</span>
            Trending Now
          </h2>
          <Link to="/products" className="text-blue-600 font-bold hover:text-blue-700 flex items-center gap-1 group bg-blue-50 px-4 py-2 rounded-lg transition-colors hover:bg-blue-100">View All <span className="group-hover:translate-x-1 transition-transform">&rarr;</span></Link>
        </div>
        <ProductGrid products={featuredProducts} />
      </section>
    </div>
  );
};

export default Home;
