<template>
  <div class="shopping-cart">
    <h1>{{ $t('cart.title') }}</h1>
    
    <!-- Empty Cart -->
    <div v-if="cartItems.length === 0" class="empty-cart">
      <p>{{ $t('cart.emptyMessage') }}</p>
      <RouterLink to="/" class="continue-shopping">
        {{ $t('cart.continueShopping') }}
      </RouterLink>
    </div>
    
    <!-- Cart Items -->
    <div v-else class="cart-content">
      <div class="cart-items">
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <div class="item-image">
            <img 
              :src="item.thumbnailUrl || item.imageUrl" 
              :alt="item.name"
            />
          </div>
          
          <div class="item-info">
            <h3 class="item-name">{{ item.name }}</h3>
            <p class="item-price">{{ $t('cart.price', { price: item.price }) }}</p>
          </div>
          
          <div class="item-quantity">
            <button @click="updateQuantity(item.id, item.quantity - 1)" class="quantity-btn">-</button>
            <span class="quantity">{{ item.quantity }}</span>
            <button @click="updateQuantity(item.id, item.quantity + 1)" class="quantity-btn">+</button>
          </div>
          
          <div class="item-total">
            {{ $t('cart.price', { price: (item.price * item.quantity).toFixed(2) }) }}
          </div>
          
          <button @click="removeFromCart(item.id)" class="delete-btn">
            {{ $t('cart.deleteButton') }}
          </button>
        </div>
      </div>
      
      <div class="cart-summary">
        <div class="total">
          <strong>{{ $t('cart.total', { total: cartTotal }) }}</strong>
        </div>
        
        <button @click="placeOrder" class="place-order-btn">
          {{ $t('cart.placeOrderButton') }}
        </button>
      </div>
    </div>
    
    <!-- Order Success Modal -->
    <div v-if="showOrderSuccess" class="modal-overlay" @click="closeOrderSuccess">
      <div class="modal" @click.stop>
        <h2>🎉 {{ $t('cart.orderSuccess') }}</h2>
        <p>{{ $t('cart.orderSuccessMessage') }}</p>
        <button @click="closeOrderSuccess" class="close-btn">{{ $t('cart.closeButton') }}</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCart } from '../stores/cart'

const { cartItems, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart()
const showOrderSuccess = ref(false)

const placeOrder = () => {
  showOrderSuccess.value = true
  clearCart()
}

const closeOrderSuccess = () => {
  showOrderSuccess.value = false
}
</script>

<style scoped>
.shopping-cart {
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

.empty-cart {
  text-align: center;
  padding: 3rem;
}

.empty-cart p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
}

.continue-shopping {
  background: #42b883;
  color: white;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 6px;
  font-weight: 600;
  transition: background-color 0.2s;
}

.continue-shopping:hover {
  background: #369870;
}

.cart-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  display: grid;
  grid-template-columns: 80px 1fr auto auto auto;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: white;
}

.item-image {
  width: 80px;
  height: 80px;
  overflow: hidden;
  border-radius: 4px;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-info {
  text-align: left;
}

.item-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 0.5rem 0;
}

.item-price {
  color: #42b883;
  font-weight: 600;
  margin: 0;
}

.item-quantity {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantity-btn {
  background: #f0f0f0;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
}

.quantity-btn:hover {
  background: #e0e0e0;
}

.quantity {
  min-width: 30px;
  text-align: center;
  font-weight: 600;
}

.item-total {
  font-weight: 700;
  color: #42b883;
  font-size: 1.1rem;
}

.delete-btn {
  background: #ff4757;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.delete-btn:hover {
  background: #ff3742;
}

.cart-summary {
  text-align: right;
  padding: 2rem;
  border-top: 2px solid #e0e0e0;
}

.total {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 2rem;
}

.place-order-btn {
  background: #42b883;
  color: white;
  border: none;
  padding: 1rem 3rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1.1rem;
  transition: background-color 0.2s;
}

.place-order-btn:hover {
  background: #369870;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 3rem;
  border-radius: 12px;
  text-align: center;
  max-width: 400px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.modal h2 {
  color: #42b883;
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
}

.modal p {
  color: #666;
  margin: 0 0 2rem 0;
  font-size: 1.1rem;
}

.close-btn {
  background: #42b883;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

.close-btn:hover {
  background: #369870;
}

/* Responsive Design */
/* Large Desktop */
@media (min-width: 1400px) {
  .cart-item {
    padding: 2rem;
    gap: 2rem;
  }
  
  .item-image {
    width: 120px;
    height: 120px;
  }
  
  .item-name {
    font-size: 1.3rem;
  }
  
  .item-price {
    font-size: 1.2rem;
  }
}

/* Desktop */
@media (min-width: 1024px) and (max-width: 1399px) {
  .shopping-cart {
    padding: 2rem 1.5rem;
  }
  
  .cart-item {
    padding: 1.5rem;
    gap: 1.5rem;
  }
}

/* Tablet */
@media (min-width: 769px) and (max-width: 1023px) {
  .shopping-cart {
    padding: 1.5rem;
  }
  
  .cart-item {
    padding: 1.25rem;
    gap: 1.25rem;
  }
  
  .item-image {
    width: 90px;
    height: 90px;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .shopping-cart {
    padding: 1rem;
  }
  
  .cart-item {
    grid-template-columns: 60px 1fr;
    grid-template-rows: auto auto auto;
    gap: 0.5rem;
    padding: 1rem;
  }
  
  .item-image {
    width: 60px;
    height: 60px;
  }
  
  .item-quantity,
  .item-total,
  .delete-btn {
    grid-column: 1 / -1;
    justify-self: start;
  }
  
  .cart-summary {
    text-align: center;
  }
}

/* Small Mobile */
@media (max-width: 480px) {
  .shopping-cart {
    padding: 0.75rem;
  }
  
  .cart-item {
    padding: 0.75rem;
    gap: 0.5rem;
  }
  
  .item-name {
    font-size: 1rem;
  }
  
  .item-price {
    font-size: 0.9rem;
  }
  
  .quantity-btn {
    padding: 0.3rem 0.6rem;
    font-size: 0.8rem;
  }
  
  .delete-btn {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
  
  .place-order-btn {
    padding: 1rem;
    font-size: 1rem;
  }
  
  h1 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
}
</style>
