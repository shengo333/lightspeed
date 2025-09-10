import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import CategoryList from '../views/CategoryList.vue'
import Product from '../views/Product.vue'
import ProductDetails from '../views/ProductDetails.vue'
import ShoppingCart from '../views/ShoppingCart.vue'
import CategoryDetails from '../views/CategoryDetails.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'CategoryList',
    component: CategoryList
  },
  {
    path: '/category/:id',
    name: 'CategoryDetails',
    component: CategoryDetails
  },
  {
    path: '/product/:id',
    name: 'ProductDetails',
    component: ProductDetails
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
