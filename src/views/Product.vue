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
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
  min-height: calc(100vh - 200px);
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

/* Responsive Design */
/* Large Desktop */
@media (min-width: 1400px) {
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 2.5rem;
  }
}

/* Desktop */
@media (min-width: 1024px) and (max-width: 1399px) {
  .products-page {
    padding: 2rem 1.5rem;
  }
  
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }
}

/* Tablet */
@media (min-width: 769px) and (max-width: 1023px) {
  .products-page {
    padding: 1.5rem;
  }
  
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .products-page {
    padding: 1rem;
  }
  
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }
}

/* Small Mobile */
@media (max-width: 480px) {
  .products-page {
    padding: 0.75rem;
  }
  
  .products-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  
  h1 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
}
</style>
