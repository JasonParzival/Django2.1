<template>
  <div class="container mb-5">
    <form @submit.prevent.stop="$emit('submit', product)">
      <div class="row">
        <div class="col">
          <div class="form-floating">
            <input
              type="text"
              class="form-control"
              v-model="product.name"
              required
            />
            <label>Название</label>
          </div>
        </div>
        <div class="col">
          <div class="form-floating">
            <input
              type="number"
              class="form-control"
              v-model="product.price"
              required
            />
            <label>Цена</label>
          </div>
        </div>
        <div class="col">
          <div class="form-floating">
            <input
              type="text"
              class="form-control"
              v-model="product.description"
              required
            />
            <label>Описание</label>
          </div>
        </div>
        <div class="col">
          <div class="form-floating">
            <input
              type="number"
              class="form-control"
              v-model="product.quantity"
              required
            />
            <label>Количество</label>
          </div>
        </div>
        <div class="col-auto">
          <div class="form-floating">
            <select class="form-select" v-model="product.category" required>
              <option :value="g.id" v-for="g in categories">{{ g.name }}</option>
            </select>
            <label>Категория</label>
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
  productData: {
    type: Object,
    default: () => ({ name: '', price: null, description: '', quantity: null, category: null })
  },
  categories: {
    type: Array,
    default: () => []
  },
  submitText: {
    type: String,
    default: 'Добавить'
  }
})

const emit = defineEmits(['submit'])

const product = ref({ ...props.productData })

// Следим за изменениями productData
watch(() => props.productData, (newVal) => {
  product.value = { ...newVal }
}, { deep: true })
</script>