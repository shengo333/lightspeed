import { ref, computed, watch } from 'vue'
import type { EcwidProduct } from '../types/ecwid'

export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  thumbnailUrl?: string
  imageUrl?: string
}

// Reactive cart state
const cartItems = ref<CartItem[]>([])

// Load cart from localStorage on initialization
const loadCartFromStorage = () => {
  try {
    const stored = localStorage.getItem('shopping-cart')
    if (stored) {
      cartItems.value = JSON.parse(stored)
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error)
    cartItems.value = []
  }
}

// Save cart to localStorage
const saveCartToStorage = () => {
  try {
    localStorage.setItem('shopping-cart', JSON.stringify(cartItems.value))
  } catch (error) {
    console.error('Error saving cart to localStorage:', error)
  }
}

// Watch for changes and save to localStorage
watch(cartItems, saveCartToStorage, { deep: true })

// Computed properties
const cartItemCount = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.quantity, 0)
})

const cartTotal = computed(() => {
  const total = cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  return total.toFixed(2)
})

// Cart actions
const addToCart = (product: EcwidProduct, quantity: number = 1) => {
  const existingItem = cartItems.value.find(item => item.id === product.id)
  
  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    cartItems.value.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      thumbnailUrl: product.thumbnailUrl,
      imageUrl: product.imageUrl
    })
  }
}

const removeFromCart = (productId: number) => {
  const index = cartItems.value.findIndex(item => item.id === productId)
  if (index > -1) {
    cartItems.value.splice(index, 1)
  }
}

const updateQuantity = (productId: number, quantity: number) => {
  const item = cartItems.value.find(item => item.id === productId)
  if (item) {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      item.quantity = quantity
    }
  }
}

const clearCart = () => {
  cartItems.value = []
}

// Initialize cart from localStorage
loadCartFromStorage()

// Export cart store
export const useCart = () => {
  return {
    cartItems: cartItems.value,
    cartItemCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  }
}
