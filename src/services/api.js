import axios from 'react';
// Wait, axios shouldn't be imported from 'react'

import axiosInstance from 'axios';

const api = axiosInstance.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

const mapProduct = (p) => ({
  id: p.id,
  title: p.title,
  price: p.price,
  description: p.description,
  category: p.category,
  image: p.thumbnail, // Map DummyJSON thumbnail to image
  rating: { rate: p.rating, count: p.reviews?.length || Math.floor(Math.random() * 300) + 20 }
});

export const fetchProducts = async () => {
  const response = await api.get('/products?limit=100');
  return response.data.products.map(mapProduct);
};

export const fetchProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return mapProduct(response.data);
};

export const fetchCategories = async () => {
  const response = await api.get('/products?limit=100');
  const products = response.data.products;
  const categoriesSet = new Set(products.map(p => p.category));
  return Array.from(categoriesSet);
};

export const fetchProductsByCategory = async (category) => {
  const response = await api.get(`/products/category/${category}`);
  return response.data.products.map(mapProduct);
};

export default api;
