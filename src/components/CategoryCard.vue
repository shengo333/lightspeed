<template>
  <div class="category-card" @click="handleClick">
    <div class="category-placeholder">
      <div class="category-icon">{{ isSubcategory ? '📂' : '📁' }}</div>
      <span class="product-count">{{ category.productCount }} {{ $t('categoryList.products') }}</span>
    </div>
    <div class="category-info">
      <h3 class="category-name">{{ category.name }}</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { EcwidCategory } from '../types/ecwid'

// Props
interface Props {
  category: EcwidCategory
  isSubcategory?: boolean
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  click: [categoryId: number]
}>()

// Handle category click
const handleClick = () => {
  emit('click', props.category.id)
}
</script>

<style scoped>
.category-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.category-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.category-placeholder {
  /* width: 100%; */
  height: 150px;
  background: linear-gradient(135deg, #42b883, #369870);
  border-radius: 4px;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
}

.category-icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.product-count {
  font-size: 0.9rem;
  font-weight: 500;
  opacity: 0.9;
}

.category-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin: 0;
  text-align: center;
}
</style>
