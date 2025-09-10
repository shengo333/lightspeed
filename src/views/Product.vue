<template>
  <div class="products-page">
    <h1>{{ $t('products.title') }}</h1>
    
    <div v-if="loading" class="loading">
      {{ $t('products.loading') }}
    </div>
    
    <div v-else-if="error" class="error">
      <p>{{ $t('products.error', { error }) }}</p>
      <button @click="loadProducts">{{ $t('products.retry') }}</button>
    </div>
    
    <div v-else>
      <p>{{ $t('products.foundProducts', { count: products.length }) }}</p>
      <div class="products-grid">
        <ProductCard 
          v-for="product in products" 
          :key="product.id" 
          :product="product"
          @click="viewProduct"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getProducts } from '../services/ecwidService'
import type { EcwidProduct } from '../types/ecwid'
import ProductCard from '../components/ProductCard.vue'

const router = useRouter()

// Reactive state
const products = ref<EcwidProduct[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

// Load all products
const loadProducts = async () => {
  try {
    loading.value = true
    error.value = null
    products.value = await getProducts()
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

// Navigate to product details
const viewProduct = (productId: number) => {
  router.push(`/product/${productId}`)
}

// Load data on component mount
onMounted(() => {
  loadProducts()
})
</script>

<style scoped>
.products-page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  color: #42b883;
  text-align: center;
  margin-bottom: 2rem;
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

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

@media (max-width: 768px) {
  .products-page {
    padding: 1rem;
  }
  
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }
}
</style>
