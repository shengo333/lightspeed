<template>
  <div class="product-list">
    <h1>Product List</h1>
    
    <div v-if="loading">
      Loading products...
    </div>
    
    <div v-else-if="error" class="error">
      <p>Error: {{ error }}</p>
      <button @click="loadProducts">Retry</button>
    </div>
    
    <div v-else>
      <p>Found {{ products.length }} products</p>
      <div v-for="product in products" :key="product.id" class="product-item">
        <h3>{{ product.name }}</h3>
        <p>Price: ${{ product.price }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getProducts } from '../services/ecwidService'

// Simple reactive state
const products = ref([])
const loading = ref(true)
const error = ref(null)

// Load products function
const loadProducts = async () => {
  try {
    loading.value = true
    error.value = null
    products.value = await getProducts()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

// Load products on component mount
onMounted(() => {
  loadProducts()
})
</script>

<style scoped>
.product-list {
  padding: 2rem;
}

h1 {
  color: #42b883;
}

.error {
  color: red;
}

.product-item {
  border: 1px solid #ddd;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 4px;
}

button {
  background: #42b883;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #369870;
}
</style>
