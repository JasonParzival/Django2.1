<template>
  <div class="container my-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1>Категории</h1>
      <button @click="refreshData" class="btn btn-outline-primary">
        Обновить
      </button>
    </div>

    <CategoryForm
      :category-data="categoryToAdd"
      submit-text="Добавить категорию"
      @submit="onCategoryAdd"
    />

    <EditCategoryModal
      :show="showEditModal"
      :category="categoryToEdit"
      @save="onUpdateCategory"
      @close="showEditModal = false"
    />

    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Загрузка...</span>
      </div>
    </div>

    <div v-else>
      <CategoryItem
        v-for="item in categories"
        :key="item.id"
        :category="item"
        @edit="onCategoryEditClick"
        @remove="onRemoveClick"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie'
import CategoryItem from './CategoryItem.vue'
import EditCategoryModal from './EditCategoryModal.vue'
import CategoryForm from './CategoryForm.vue'

const loading = ref(false)
const categories = ref([])
const showEditModal = ref(false)

const categoryToAdd = ref({ name: '', description: '' })
const categoryToEdit = ref({ id: null, name: '', description: '' })

// API функции

async function fetchCategories() {
  loading.value = true
  const r = await axios.get("/api/categories/")
  categories.value = r.data
  loading.value = false
}

async function onCategoryAdd(categoryData) {
  await axios.post("/api/categories/", categoryData)
  await refreshData()
  // Сброс формы
  categoryToAdd.value = { name: '', description: '' }
}

async function onUpdateCategory(categoryData) {
  await axios.put(`/api/categories/${categoryData.id}/`, categoryData)
  await refreshData()
  showEditModal.value = false
}

async function onRemoveClick(category) {
  await axios.delete(`/api/categories/${category.id}/`)
  await refreshData()
}

function onCategoryEditClick(category) {
  categoryToEdit.value = { ...category }
  showEditModal.value = true
}

async function refreshData() {
  await Promise.all([fetchCategories()])
}

// Инициализация
onMounted(() => {
  axios.defaults.headers.common['X-CSRFToken'] = Cookies.get("csrftoken")
  refreshData()
})
</script>