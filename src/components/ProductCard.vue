<template>
  <div class="product-card" @click="handleCardClick">
    <div class="product-image">
      <img 
        :src="product.thumbnailUrl || product.imageUrl" 
        :alt="product.name"
      />
    </div>
    <div class="product-info">
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-price">{{ $t('productList.price', { price: product.price }) }}</p>
      <button class="buy-button" @click.stop="handleBuyClick">
        {{ $t('productList.buyButton') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { EcwidProduct } from '../types/ecwid'
import { useCart } from '../stores/cart'

// Props
interface Props {
  product: EcwidProduct
}

const props = defineProps<Props>()
const { addToCart } = useCart()

// Emits
const emit = defineEmits<{
  click: [productId: number]
}>()

// Handle card click (navigate to product details)
const handleCardClick = () => {
  emit('click', props.product.id)
}

// Handle buy button click
const handleBuyClick = () => {
  addToCart(props.product)
}
</script>

<style scoped>
.product-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.product-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  text-align: left;
}

.product-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
}

.product-price {
  font-size: 1.3rem;
  font-weight: 700;
  color: #42b883;
  margin: 0 0 1rem 0;
}

.buy-button {
  background: #42b883;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  width: 100%;
  font-size: 1rem;
  transition: background-color 0.2s;
}

.buy-button:hover {
  background: #369870;
}
</style>
