<template>
  <div v-if="show" class="modal fade show d-block"  tabindex="-1" style="background-color: rgba(0,0,0,0.5);">
    <div class="modal-dialog modal-lg">
      <div class="modal-content pb-3">
        <div class="modal-header">
          <h1 class="modal-title fs-5">
            Редактирование категории
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
                  v-model="editedCategory.name"
                  placeholder="Название категории"
                />
                <label>Название</label>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control"
                  v-model="editedCategory.description"
                  placeholder="Описание категории"
                />
                <label>Описание</label>
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
  category: {
    type: Object,
    default: () => ({ 
      id: null, 
      name: '', 
      description: ''
    })
  }
})

const emit = defineEmits(['save', 'close'])

// Локальная копия продукта для редактирования
const editedCategory = ref({ ...props.category })

// Следим за изменениями props.category
watch(() => props.category, (newCategory) => {
  editedCategory.value = { ...newCategory }
}, { deep: true })

// Валидация формы
const isFormValid = computed(() => {
  return editedCategory.value.name && 
         editedCategory.value.description
})

// Сохранение изменений
const saveChanges = () => {
  if (isFormValid.value) {
    emit('save', editedCategory.value)
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