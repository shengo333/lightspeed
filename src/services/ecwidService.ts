import axios from 'axios'
import { getApiUrl, getHeaders } from '../config/api'

// Create axios instance with basic configuration
const apiClient = axios.create({
  timeout: 10000, // 10 second timeout
  headers: getHeaders()
})

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

/**
 * Test API connection by fetching basic products
 */
export const getProducts = async () => {
  try {
    const response = await apiClient.get(getApiUrl('products?limit=10'))
    return response.data.items
  } catch (error) {
    console.error('Error fetching products:', error)
    throw new Error('Failed to fetch products')
  }
}

/**
 * Fetch categories
 */
export const getCategories = async () => {
  try {
    const response = await apiClient.get(getApiUrl('categories'))
    return response.data.items
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw new Error('Failed to fetch categories')
  }
}

/**
 * Fetch products by category ID
 */
export const getProductsByCategory = async (categoryId: number) => {
  try {
    const response = await apiClient.get(getApiUrl(`products?category=${categoryId}`))
    return response.data.items
  } catch (error) {
    console.error('Error fetching products by category:', error)
    throw new Error('Failed to fetch products by category')
  }
}

/**
 * Fetch single product by ID
 */
export const getProduct = async (productId: number) => {
  try {
    const response = await apiClient.get(getApiUrl(`products/${productId}`))
    return response.data
  } catch (error) {
    console.error('Error fetching product:', error)
    throw new Error('Failed to fetch product')
  }
}

// Export the configured axios instance for future custom requests
export { apiClient }
