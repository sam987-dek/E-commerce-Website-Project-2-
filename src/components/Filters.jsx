import React from 'react';

const Filters = ({ categories, selectedCategory, onCategoryChange, priceRange, onPriceChange, sortBy, onSortChange }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 h-max relative lg:sticky top-[90px]">
      <div className="mb-8 last:mb-0">
        <h3 className="text-lg font-extrabold mb-4 text-slate-800 border-b-2 border-slate-100 pb-2">Categories</h3>
        <ul className="flex flex-col gap-3">
          <li>
            <label className="flex items-center gap-3 cursor-pointer text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors group">
              <input 
                type="radio" 
                name="category" 
                value="" 
                checked={selectedCategory === ''} 
                onChange={() => onCategoryChange('')} 
                className="w-4 h-4 accent-blue-600 cursor-pointer group-hover:scale-110 transition-transform"
              />
              All Products
            </label>
          </li>
          {categories.map((cat) => (
            <li key={cat}>
              <label className="flex items-center gap-3 cursor-pointer text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors group">
                <input 
                  type="radio" 
                  name="category" 
                  value={cat} 
                  checked={selectedCategory === cat} 
                  onChange={() => onCategoryChange(cat)} 
                  className="w-4 h-4 accent-blue-600 cursor-pointer group-hover:scale-110 transition-transform"
                />
                {cat.split('-').join(' ').replace(/\b\w/g, l => l.toUpperCase())}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-8 last:mb-0">
        <h3 className="text-lg font-extrabold mb-4 text-slate-800 border-b-2 border-slate-100 pb-2">Price Range</h3>
        <select 
          className="w-full p-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-700 text-sm outline-none cursor-pointer focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all font-semibold hover:border-slate-300"
          value={priceRange} 
          onChange={(e) => onPriceChange(e.target.value)}
        >
          <option value="all">All Prices</option>
          <option value="0-5000">₹0 - ₹5,000</option>
          <option value="5000-20000">₹5,000 - ₹20,000</option>
          <option value="20000-50000">₹20,000 - ₹50,000</option>
          <option value="50000+">₹50,000+</option>
        </select>
      </div>

      <div className="mb-0 last:mb-0">
        <h3 className="text-lg font-extrabold mb-4 text-slate-800 border-b-2 border-slate-100 pb-2">Sort By</h3>
        <select 
          className="w-full p-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-700 text-sm outline-none cursor-pointer focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all font-semibold hover:border-slate-300" 
          value={sortBy} 
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
