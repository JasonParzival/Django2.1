<template>
  <div class="container my-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1>Товары</h1>
      <button @click="refreshData" class="btn btn-outline-primary">
        Обновить
      </button>
    </div>

    <ProductForm
      :product-data="productToAdd"
      :categories="categories"
      submit-text="Добавить товар"
      @submit="onProductAdd"
    />

    <EditProductModal
      :show="showEditModal"
      :product="productToEdit"
      :categories="categories"
      @save="onUpdateProduct"
      @close="showEditModal = false"
    />

    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Загрузка...</span>
      </div>
    </div>

    <div v-else>
      <ProductItem
        v-for="item in products"
        :key="item.id"
        :product="item"
        :groups-by-id="groupsById"
        @edit="onProductEditClick"
        @remove="onRemoveClick"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie'
import ProductForm from './ProductForm.vue'
import ProductItem from './ProductItem.vue'
import EditProductModal from './EditProductModal.vue'

const loading = ref(false)
const products = ref([])
const categories = ref([])
const showEditModal = ref(false)

const productToAdd = ref({ name: '', price: null, description: '', quantity: null, category: null })
const productToEdit = ref({ id: null, name: '', price: null, description: '', quantity: null, category: null })

const groupsById = computed(() => {
  const map = {}
  categories.value.forEach(cat => {
    map[cat.id] = cat
  })
  return map
})

// API функции
async function fetchProducts() {
  loading.value = true
  const r = await axios.get("/api/products/")
  products.value = r.data
  loading.value = false
}

async function fetchCategories() {
  const r = await axios.get("/api/categories/")
  categories.value = r.data
}

async function onProductAdd(productData) {
  await axios.post("/api/products/", productData)
  await refreshData()
  // Сброс формы
  productToAdd.value = { name: '', price: null, description: '', quantity: null, category: null }
}

async function onUpdateProduct(productData) {
  await axios.put(`/api/products/${productData.id}/`, productData)
  await refreshData()
  showEditModal.value = false
}

async function onRemoveClick(product) {
  await axios.delete(`/api/products/${product.id}/`)
  await refreshData()
}

function onProductEditClick(product) {
  productToEdit.value = { ...product }
  showEditModal.value = true
}

async function refreshData() {
  await Promise.all([fetchProducts(), fetchCategories()])
}

// Инициализация
onMounted(() => {
  axios.defaults.headers.common['X-CSRFToken'] = Cookies.get("csrftoken")
  refreshData()
})
</script>