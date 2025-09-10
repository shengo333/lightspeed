<template>
  <div class="category-details">
    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <RouterLink to="/">{{ $t('categoryDetails.backToCategories') }}</RouterLink>
      <span> > {{ currentCategory?.name }}</span>
    </div>

    <h1>{{ currentCategory?.name }}</h1>
    
    <!-- Loading/Error States -->
    <div v-if="loading" class="loading">{{ $t('categoryDetails.loading') }}</div>
    <div v-else-if="error" class="error">
      <p>{{ $t('categoryDetails.error', { error }) }}</p>
      <button @click="loadData">{{ $t('categoryDetails.retry') }}</button>
    </div>
    
    <!-- Content -->
    <div v-else>
      <!-- Subcategories -->
      <section v-if="subcategories.length > 0">
        <h2>{{ $t('categoryDetails.subcategoriesTitle') }}</h2>
        <div class="grid">
          <CategoryCard 
            v-for="subcategory in subcategories" 
            :key="subcategory.id" 
            :category="subcategory"
            :is-subcategory="true"
            @click="viewCategory"
          />
        </div>
      </section>

      <!-- Products -->
      <section v-if="products.length > 0">
        <h2>{{ $t('categoryDetails.productsTitle') }}</h2>
        <div class="grid">
          <ProductCard 
            v-for="product in products" 
            :key="product.id" 
            :product="product"
            @click="viewProduct"
          />
        </div>
      </section>

      <!-- Empty State -->
      <div v-if="!subcategories.length && !products.length" class="empty">
        {{ $t('categoryDetails.emptyCategory') }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getCategories, getProductsByCategory } from '../services/ecwidService'
import type { EcwidProduct, EcwidCategory } from '../types/ecwid'
import ProductCard from '../components/ProductCard.vue'
import CategoryCard from '../components/CategoryCard.vue'

const route = useRoute()
const router = useRouter()

// State
const products = ref<EcwidProduct[]>([])
const allCategories = ref<EcwidCategory[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

// Computed
const categoryId = computed(() => Number(route.params.id))
const currentCategory = computed(() => allCategories.value.find(cat => cat.id === categoryId.value))
const subcategories = computed(() => allCategories.value.filter(cat => cat.parentId === categoryId.value))

// Methods
const loadData = async () => {
  try {
    loading.value = true
    error.value = null
    const [categoriesData, productsData] = await Promise.all([
      getCategories(),
      getProductsByCategory(categoryId.value)
    ])
    allCategories.value = categoriesData
    products.value = productsData
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const viewCategory = (newCategoryId: number) => router.push(`/category/${newCategoryId}`)
const viewProduct = (productId: number) => router.push(`/product/${productId}`)

// Lifecycle
onMounted(loadData)
watch(() => route.params.id, loadData)
</script>

<style scoped>
.category-details {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
  min-height: calc(100vh - 200px);
}

.breadcrumb {
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #666;
}

.breadcrumb a {
  color: #42b883;
  text-decoration: none;
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

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.empty {
  text-align: center;
  padding: 3rem;
  color: #666;
  font-size: 1.1rem;
}

/* Responsive Design */
/* Large Desktop */
@media (min-width: 1400px) {
  .grid {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 2.5rem;
  }
}

/* Desktop */
@media (min-width: 1024px) and (max-width: 1399px) {
  .category-details {
    padding: 2rem 1.5rem;
  }
  
  .grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }
}

/* Tablet */
@media (min-width: 769px) and (max-width: 1023px) {
  .category-details {
    padding: 1.5rem;
  }
  
  .grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .category-details {
    padding: 1rem;
  }
  
  .grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }
}

/* Small Mobile */
@media (max-width: 480px) {
  .category-details {
    padding: 0.75rem;
  }
  
  .grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  
  h1 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  h2 {
    font-size: 1.3rem;
    margin: 1.5rem 0 1rem 0;
  }
}
</style>
