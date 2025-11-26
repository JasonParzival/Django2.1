import { createRouter, createWebHistory } from 'vue-router'
import ProductsView from '../views/ProductsView.vue'
import CategoriesView from '../views/CategoriesView.vue'
// Импортируйте другие views

const routes = [
  {
    path: '/',
    redirect: '/products'
  },
  {
    path: '/products',
    name: 'products',
    component: ProductsView
  },
  {
    path: '/categories',
    name: 'categories',
    component: CategoriesView
  },
  // Добавьте маршруты для других моделей
  // {
  //   path: '/users',
  //   name: 'users',
  //   component: UsersView
  // }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
