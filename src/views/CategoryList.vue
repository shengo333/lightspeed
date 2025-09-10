<template>
  <div class="category-list-page">
    <h1>{{ $t('categoryList.title') }}</h1>
    
    <div v-if="loading" class="loading">
      {{ $t('categoryList.loading') }}
    </div>
    
    <div v-else-if="error" class="error">
      <p>{{ $t('categoryList.error', { error }) }}</p>
      <button @click="loadData">{{ $t('categoryList.retry') }}</button>
    </div>
    
    <div v-else>
      <!-- Categories Section -->
      <section v-if="categories.length > 0" class="categories-section">
        <h2>{{ $t('categoryList.categoriesTitle') }}</h2>
        <p>{{ $t('categoryList.foundCategories', { count: categories.length }) }}</p>
        <div class="categories-grid">
          <CategoryCard 
            v-for="category in categories" 
            :key="category.id" 
            :category="category"
            @click="viewCategory"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getCategories } from '../services/ecwidService'
import type { EcwidCategory } from '../types/ecwid'
import CategoryCard from '../components/CategoryCard.vue'

const router = useRouter()

// Reactive state
const categories = ref<EcwidCategory[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

// Load categories only
const loadData = async () => {
  try {
    loading.value = true
    error.value = null
    categories.value = await getCategories()
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

// Load data on component mount
onMounted(() => {
  loadData()
})
</script>

<style scoped>
.category-list-page {
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

/* Sections */
.categories-section {
  margin-bottom: 3rem;
}

/* Responsive Design */
/* Large Desktop */
@media (min-width: 1400px) {
  .categories-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }
}

/* Desktop */
@media (min-width: 1024px) and (max-width: 1399px) {
  .category-list-page {
    padding: 2rem 1.5rem;
  }
  
  .categories-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }
}

/* Tablet */
@media (min-width: 769px) and (max-width: 1023px) {
  .category-list-page {
    padding: 1.5rem;
  }
  
  .categories-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .category-list-page {
    padding: 1rem;
  }
  
  .categories-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }
}

/* Small Mobile */
@media (max-width: 480px) {
  .category-list-page {
    padding: 0.75rem;
  }
  
  .categories-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  
  h1 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
}
</style>
