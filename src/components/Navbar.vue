<template>
  <nav class="navbar">
    <div class="nav-container">
      <h2 class="nav-logo">{{ $t('nav.appName') }}</h2>
      <ul class="nav-menu">
        <li class="nav-item">
          <RouterLink to="/" class="nav-link">{{ $t('nav.categories') }}</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/product" class="nav-link">{{ $t('nav.products') }}</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/cart" class="nav-link cart-link">
            <span class="cart-icon">🛒</span>
            <span class="cart-text">{{ $t('nav.shoppingCart') }}</span>
            <span v-if="cartItemCount > 0" class="cart-count">{{ cartItemCount }}</span>
          </RouterLink>
        </li>
      </ul>
      <div class="nav-actions">
        <div class="language-switcher">
          <button @click="switchLanguage('en')" :class="{ active: locale === 'en' }" class="lang-btn">EN</button>
          <button @click="switchLanguage('ru')" :class="{ active: locale === 'ru' }" class="lang-btn">RU</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useCart } from '../stores/cart'

const { locale } = useI18n()
const { cartItemCount } = useCart()

const switchLanguage = (lang: string) => {
  locale.value = lang
  localStorage.setItem('locale', lang)
}
</script>

<style scoped>
.navbar {
  background: #42b883;
  color: white;
  padding: 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.nav-container {
  width: 80vw;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

.nav-actions {
  display: flex;
  align-items: center;
  min-width: 80px; /* Prevent layout jump */
}

.language-switcher {
  display: flex;
  gap: 0.5rem;
  min-width: 80px; /* Fixed width to prevent jump */
  justify-content: center;
}

.lang-btn {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  min-width: 35px; /* Fixed width for each button */
  text-align: center;
}

.lang-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.lang-btn.active {
  background: rgba(255, 255, 255, 0.3);
  font-weight: 600;
}

/* Cart link styling */
.cart-link {
  position: relative;
  display: flex !important;
  align-items: center;
  gap: 0.5rem;
}

.cart-icon {
  font-size: 1.2rem;
}

.cart-text {
  white-space: nowrap; /* Prevent text wrapping */
}

.cart-count {
  position: absolute;
  top: -0.2rem;
  right: -0.2rem;
  background: #ff4757;
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.15rem 0.3rem;
  border-radius: 50%;
  min-width: 1rem;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.nav-logo {
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-menu {
  list-style: none;
  display: flex;
  gap: 1rem;
  margin: 0;
  padding: 0;
  flex: 1;
  justify-content: center;
}

.nav-item {
  margin: 0;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  white-space: nowrap; /* Prevent text wrapping */
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-link.router-link-active {
  background-color: rgba(255, 255, 255, 0.2);
  font-weight: 600;
}

/* Responsive navigation */
@media (max-width: 768px) {
  .nav-container {
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav-menu {
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .nav-link {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
  
  .cart-text {
    display: none; /* Hide text on mobile, keep icon */
  }
  
  .cart-icon {
    font-size: 1.4rem;
  }
  
  .nav-actions {
    min-width: auto;
  }
  
  .language-switcher {
    min-width: auto;
  }
  
  .nav-logo {
    font-size: 1.3rem;
  }
}
</style>
