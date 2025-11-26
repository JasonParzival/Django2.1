<template>
  <div v-if="show" class="modal fade show d-block"  tabindex="-1" style="background-color: rgba(0,0,0,0.5);">
    <div class="modal-dialog modal-lg">
      <div class="modal-content pb-3">
        <div class="modal-header">
          <h1 class="modal-title fs-5">
            Редактирование товара
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="closeModal"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row g-3">
            <div class="col-12 col-md-6">
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control"
                  v-model="editedProduct.name"
                  placeholder="Название товара"
                />
                <label>Название</label>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-floating">
                <input
                  type="number"
                  class="form-control"
                  v-model="editedProduct.price"
                  placeholder="Цена"
                />
                <label>Цена</label>
              </div>
            </div>
            <div class="col-12">
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control"
                  v-model="editedProduct.description"
                  placeholder="Описание товара"
                />
                <label>Описание</label>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-floating">
                <input
                  type="number"
                  class="form-control"
                  v-model="editedProduct.quantity"
                  placeholder="Количество"
                />
                <label>Количество</label>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-floating">
                <select class="form-select" v-model="editedProduct.category">
                  <option value="" disabled>Выберите категорию</option>
                  <option :value="g.id" v-for="g in categories" :key="g.id">
                    {{ g.name }}
                  </option>
                </select>
                <label>Категория</label>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="closeModal"
          >
            Отмена
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="saveChanges"
            :disabled="!isFormValid"
          >
            Сохранить изменения
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  product: {
    type: Object,
    default: () => ({ 
      id: null, 
      name: '', 
      price: null, 
      description: '', 
      quantity: null, 
      category: null 
    })
  },
  categories: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['save', 'close'])

// Локальная копия продукта для редактирования
const editedProduct = ref({ ...props.product })

// Следим за изменениями props.product
watch(() => props.product, (newProduct) => {
  editedProduct.value = { ...newProduct }
}, { deep: true })

// Валидация формы
const isFormValid = computed(() => {
  return editedProduct.value.name && 
         editedProduct.value.price !== null && 
         editedProduct.value.quantity !== null &&
         editedProduct.value.category
})

// Сохранение изменений
const saveChanges = () => {
  if (isFormValid.value) {
    emit('save', editedProduct.value)
  }
}

// Закрытие модального окна
const closeModal = () => {
  emit('close')
}
</script>

<style scoped>
.form-floating {
  margin-bottom: 1rem;
}

.modal-body {
  padding: 1.5rem;
}

.modal-footer {
  padding: 1rem 1.5rem;
}
</style>