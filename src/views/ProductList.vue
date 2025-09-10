<template>
  <div class="products-categories-page">
    <h1>{{ $t('productList.title') }}</h1>
    
    <div v-if="loading" class="loading">
      {{ $t('productList.loading') }}
    </div>
    
    <div v-else-if="error" class="error">
      <p>{{ $t('productList.error', { error }) }}</p>
      <button @click="loadData">{{ $t('productList.retry') }}</button>
    </div>
    
    <div v-else>
      <!-- Categories Section -->
      <section v-if="categories.length > 0" class="categories-section">
        <h2>{{ $t('productList.categoriesTitle') }}</h2>
        <p>{{ $t('productList.foundCategories', { count: categories.length }) }}</p>
        <div class="categories-grid">
          <CategoryCard 
            v-for="category in categories" 
            :key="category.id" 
            :category="category"
            @click="viewCategory"
          />
        </div>
      </section>

      <!-- Products Section -->
      <section v-if="products.length > 0" class="products-section">
        <h2>{{ $t('productList.productsTitle') }}</h2>
        <p>{{ $t('productList.foundProducts', { count: products.length }) }}</p>
        <div class="products-grid">
          <ProductCard 
            v-for="product in products" 
            :key="product.id" 
            :product="product"
            @buy="buyProduct"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getProducts, getCategories } from '../services/ecwidService'
import type { EcwidProduct, EcwidCategory } from '../types/ecwid'
import ProductCard from '../components/ProductCard.vue'
import CategoryCard from '../components/CategoryCard.vue'

const router = useRouter()

// Reactive state
const products = ref<EcwidProduct[]>([])
const categories = ref<EcwidCategory[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

// Load both products and categories
const loadData = async () => {
  try {
    loading.value = true
    error.value = null
    
    // Load both products and categories in parallel
    const [productsData, categoriesData] = await Promise.all([
      getProducts(),
      getCategories()
    ])
    
    products.value = productsData
    categories.value = categoriesData
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

// Navigate to category details
const viewCategory = (categoryId: number) => {
  router.push(`/category/${categoryId}`)
}

// Buy product function
const buyProduct = (productId: number) => {
  console.log('Buy product:', productId)
  // TODO: Implement buy functionality
  alert(`Product ${productId} added to cart!`)
}

// Load data on component mount
onMounted(() => {
  loadData()
})
</script>

<style scoped>
.products-categories-page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  color: #42b883;
  text-align: center;
  margin-bottom: 2rem;
}

h2 {
  color: #333;
  margin: 2rem 0 1rem 0;
  border-bottom: 2px solid #42b883;
  padding-bottom: 0.5rem;
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

/* Categories Grid */
.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

/* Products Grid */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

/* Sections */
.categories-section, .products-section {
  margin-bottom: 3rem;
}

/* Responsive */
@media (max-width: 768px) {
  .products-categories-page {
    padding: 1rem;
  }
  
  .categories-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }
  
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }
}
</style>
