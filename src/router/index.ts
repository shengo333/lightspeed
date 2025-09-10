import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import ProductList from '../views/ProductList.vue'
import Product from '../views/Product.vue'
import ShoppingCart from '../views/ShoppingCart.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'ProductList',
    component: ProductList
  },
  {
    path: '/product',
    name: 'Product',
    component: Product
  },
  {
    path: '/cart',
    name: 'ShoppingCart',
    component: ShoppingCart
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
