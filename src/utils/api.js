import axios from 'axios'

// Base URL untuk API
const API_BASE = 'https://fakestoreapi.com'

// Create axios instance dengan default config
const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// API functions
export const api = {
  // Get all products
  getProducts: async () => {
    try {
      const response = await apiClient.get('/products')
      return response.data
    } catch (error) {
      throw new Error('Failed to fetch products')
    }
  },

  // Get single product by ID
  getProduct: async (id) => {
    try {
      const response = await apiClient.get(`/products/${id}`)
      return response.data
    } catch (error) {
      throw new Error('Failed to fetch product')
    }
  },

  // Get all categories
  getCategories: async () => {
    try {
      const response = await apiClient.get('/products/categories')
      return response.data
    } catch (error) {
      throw new Error('Failed to fetch categories')
    }
  },

  // Get products by category
  getProductsByCategory: async (category) => {
    try {
      const response = await apiClient.get(`/products/category/${category}`)
      return response.data
    } catch (error) {
      throw new Error('Failed to fetch products by category')
    }
  },

  // Get limited products (untuk pagination)
  getLimitedProducts: async (limit = 10) => {
    try {
      const response = await apiClient.get(`/products?limit=${limit}`)
      return response.data
    } catch (error) {
      throw new Error('Failed to fetch limited products')
    }
  }
}

export default api
