<template>
  <div class="container mb-5">
    <form @submit.prevent.stop="$emit('submit', category)">
      <div class="row">
        <div class="col">
          <div class="form-floating">
            <input
              type="text"
              class="form-control"
              v-model="category.name"
              required
            />
            <label>Название</label>
          </div>
        </div>
        <div class="col">
          <div class="form-floating">
            <input
              type="text"
              class="form-control"
              v-model="category.description"
              required
            />
            <label>Описание</label>
          </div>
        </div>
        <div class="col-auto">
          <button type="submit" class="btn btn-primary">
            {{ submitText }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  categoryData: {
    type: Object,
    default: () => ({ name: '', description: ''})
  },
  submitText: {
    type: String,
    default: 'Добавить'
  }
})

const emit = defineEmits(['submit'])

const category = ref({ ...props.categoryData })

watch(() => props.categoryData, (newVal) => {
  category.value = { ...newVal }
}, { deep: true })
</script>