import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useDebounce } from '../hooks/useDebounce';
import Filters from '../components/Filters';
import ProductGrid from '../components/ProductGrid';
import { FiSearch, FiSliders } from 'react-icons/fi';

const Products = () => {
  const { products, categories, loading } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const urlSearch = searchParams.get('search') || '';
  const urlCategory = searchParams.get('category') || '';
  const urlPrice = searchParams.get('price') || 'all';
  const urlSort = searchParams.get('sort') || 'default';

  const [localSearch, setLocalSearch] = useState(urlSearch);
  const debouncedSearch = useDebounce(localSearch, 500);

  useEffect(() => {
    if (urlSearch !== localSearch) {
      setLocalSearch(urlSearch);
    }
  }, [urlSearch]);

  const updateQuery = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== 'all' && value !== 'default') {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams, { replace: true });
  };

  // Removed useMemo so this code is extremely easy to explain:
  // We simply copy the products array and filter it line-by-line before displaying!
  let filteredProducts = [...products];

  if (urlSearch) {
    const s = urlSearch.toLowerCase();
    filteredProducts = filteredProducts.filter(p => 
      p.title.toLowerCase().includes(s) || 
      p.description.toLowerCase().includes(s)
    );
  }

  if (urlCategory) {
    filteredProducts = filteredProducts.filter(p => p.category === urlCategory);
  }

  if (urlPrice !== 'all') {
    if (urlPrice.includes('+')) {
      const min = Number(urlPrice.replace('+', ''));
      filteredProducts = filteredProducts.filter(p => p.price >= min);
    } else {
      const [minStr, maxStr] = urlPrice.split('-');
      filteredProducts = filteredProducts.filter(p => 
        p.price >= Number(minStr) && p.price <= Number(maxStr)
      );
    }
  }

  switch (urlSort) {
    case 'price-asc': 
      filteredProducts.sort((a, b) => a.price - b.price); 
      break;
    case 'price-desc': 
      filteredProducts.sort((a, b) => b.price - a.price); 
      break;
    case 'rating': 
      filteredProducts.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0)); 
      break;
    default: 
      break;
  }

  if (loading) return (
    <div className="page-container min-h-[80vh] flex flex-col items-center justify-center gap-6">
      <div className="w-16 h-16 border-4 border-slate-200 dark:border-slate-700 border-l-blue-600 dark:border-l-blue-400 rounded-full animate-spin"></div>
      <p className="text-slate-500 dark:text-slate-400 font-bold animate-pulse text-lg">Loading amazing products...</p>
    </div>
  );

  return (
    <div className="page-container min-h-[80vh]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-5 mb-8 border-b-2 border-slate-200 dark:border-slate-800 pb-6 transition-colors">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight capitalize">{urlCategory ? urlCategory.split('-').join(' ') : 'All Products'}</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-2 flex items-center gap-2">
            Showing <span className="text-slate-900 dark:text-white font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded shadow-inner">{filteredProducts.length}</span> result(s)
            {urlSearch && <span>for <strong className="text-blue-600 dark:text-blue-400 ml-1">"{urlSearch}"</strong></span>}
          </p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button 
            className="md:hidden flex items-center justify-center gap-2 bg-slate-900 dark:bg-blue-600 text-white px-5 py-3 rounded-xl font-bold hover:bg-slate-800 dark:hover:bg-blue-700 transition-colors shadow-md w-full sm:w-auto"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <FiSliders /> Filters
          </button>
          
          <div className="relative w-full md:w-80 hidden sm:block">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={20} />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl pl-12 pr-4 py-3 font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm placeholder-slate-400 dark:placeholder-slate-500"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <aside className={`lg:w-72 shrink-0 w-full ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
          <Filters 
            categories={categories}
            selectedCategory={urlCategory}
            onCategoryChange={(val) => updateQuery('category', val)}
            priceRange={urlPrice}
            onPriceChange={(val) => updateQuery('price', val)}
            sortBy={urlSort}
            onSortChange={(val) => updateQuery('sort', val)}
          />
        </aside>

        <main className="flex-grow w-full">
          {/* Mobile search visible only on bare mobile */}
          <div className="relative w-full mb-6 sm:hidden">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl pl-11 pr-4 py-3 font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
            />
          </div>
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-800/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-700 text-center px-4 transition-colors">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-100 mb-4">No products found</h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium text-lg max-w-md">We couldn't find any items matching your current filters or search query.</p>
              <button 
                onClick={() => { updateQuery('search', 'all'); updateQuery('category', 'all'); updateQuery('price', 'all'); }} 
                className="mt-8 bg-slate-900 dark:bg-blue-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-slate-800 dark:hover:bg-blue-700 transition-all hover:-translate-y-1 shadow-lg"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <ProductGrid products={filteredProducts} />
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;
