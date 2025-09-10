<template>
  <div class="product-details">
    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <RouterLink to="/">{{ $t('productDetails.backToHome') }}</RouterLink>
      <span> > {{ product?.name }}</span>
    </div>

    <!-- Loading/Error States -->
    <div v-if="loading" class="loading">{{ $t('productDetails.loading') }}</div>
    <div v-else-if="error" class="error">
      <p>{{ $t('productDetails.error', { error }) }}</p>
      <button @click="loadProduct">{{ $t('productDetails.retry') }}</button>
    </div>
    
    <!-- Product Content -->
    <div v-else-if="product" class="product-content">
      <div class="product-image-section">
        <img 
          :src="product.thumbnailUrl || product.imageUrl" 
          :alt="product.name"
          class="product-main-image"
        />
      </div>
      
      <div class="product-info-section">
        <h1 class="product-title">{{ product.name }}</h1>
        
        <div class="product-price">
          {{ $t('productDetails.price', { price: product.price }) }}
        </div>
        
        <div v-if="product.description" class="product-description" v-html="product.description"></div>
        <div v-else class="no-description">{{ $t('productDetails.noDescription') }}</div>
        
        <button class="buy-button" @click="buyProduct">
          {{ $t('productDetails.buyButton') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getProduct } from '../services/ecwidService'
import type { EcwidProduct } from '../types/ecwid'
import { useCart } from '../stores/cart'

const route = useRoute()
const { addToCart } = useCart()

// State
const product = ref<EcwidProduct | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

// Computed
const productId = computed(() => Number(route.params.id))

// Methods
const loadProduct = async () => {
  try {
    loading.value = true
    error.value = null
    product.value = await getProduct(productId.value)
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const buyProduct = () => {
  if (product.value) {
    addToCart(product.value)
  }
}

// Lifecycle
onMounted(loadProduct)
</script>

<style scoped>
.product-details {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
  min-height: calc(100vh - 200px);
}

.breadcrumb {
  margin-bottom: 2rem;
  font-size: 0.9rem;
  color: #666;
}

.breadcrumb a {
  color: #42b883;
  text-decoration: none;
}

.loading, .error {
  text-align: center;
  padding: 2rem;
  font-size: 1.1rem;
}

.error {
  color: #dc3545;
}

.error button {
  background: #42b883;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
}

.error button:hover {
  background: #369870;
}

.product-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: start;
  margin: 2rem 0;
}

.product-image-section {
  text-align: center;
}

.product-main-image {
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.product-info-section {
  padding: 1rem 0;
}

.product-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #42b883;
  margin: 0 0 1rem 0;
  line-height: 1.3;
  text-align: center;
}

.product-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  margin: 0 0 2rem 0;
}

.product-description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #666;
  margin: 0 0 2rem 0;
}

.no-description {
  font-style: italic;
  color: #999;
  margin: 0 0 2rem 0;
}

.buy-button {
  background: #42b883;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: background-color 0.2s;
  min-width: 150px;
}

.buy-button:hover {
  background: #369870;
}

/* Responsive Design */
/* Large Desktop */
@media (min-width: 1400px) {
  .product-content {
    gap: 3rem;
  }
  
  .product-main-image {
    max-width: 500px;
  }
  
  .product-title {
    font-size: 2rem;
  }
  
  .product-price {
    font-size: 1.6rem;
  }
}

/* Desktop */
@media (min-width: 1024px) and (max-width: 1399px) {
  .product-details {
    padding: 2rem 1.5rem;
  }
  
  .product-content {
    gap: 2.5rem;
  }
  
  .product-main-image {
    max-width: 450px;
  }
}

/* Tablet */
@media (min-width: 769px) and (max-width: 1023px) {
  .product-details {
    padding: 1.5rem;
  }
  
  .product-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
  
  .product-main-image {
    max-width: 400px;
  }
  
  .product-title {
    font-size: 1.6rem;
  }
  
  .product-price {
    font-size: 1.4rem;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .product-details {
    padding: 1rem;
  }
  
  .product-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin: 1rem 0;
    text-align: center;
  }
  
  .product-title {
    font-size: 1.4rem;
  }
  
  .product-price {
    font-size: 1.3rem;
  }
  
  .product-main-image {
    max-width: 300px;
  }
  
  .buy-button {
    width: 100%;
    min-width: auto;
  }
}

/* Small Mobile */
@media (max-width: 480px) {
  .product-details {
    padding: 0.75rem;
  }
  
  .product-content {
    gap: 1rem;
    margin: 0.5rem 0;
  }
  
  .product-title {
    font-size: 1.2rem;
    margin-bottom: 0.75rem;
  }
  
  .product-price {
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }
  
  .product-main-image {
    max-width: 250px;
  }
  
  .product-description {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .buy-button {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }
}
</style>
