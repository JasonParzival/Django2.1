<template>
  <div class="category-item card mb-3 shadow-sm">
    <div class="card-body">
      <div class="row align-items-center">
        <div class="col-md-6">
          <h5 class="card-title text-primary mb-2">{{ category.name }}</h5>
        </div>
        
        <div class="col-md-6">
          <div class="d-flex gap-2 justify-content-end">
            <button
              class="btn btn-outline-primary btn-lg"
              @click="$emit('edit', category)"
              title="Редактировать"
            >
              <i class="bi bi-pen-fill"></i>
            </button>
            <button 
              class="btn btn-outline-danger btn-lg"
              @click="$emit('remove', category)"
              title="Удалить"
            >
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
        </div>
      </div>
      
      <div v-if="category.description" class="mt-3">
        <p class="card-text text-muted small">{{ category.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  category: {
    type: Object,
    required: true
  }
})

defineEmits(['edit', 'remove'])

</script>

<style scoped>
.product-item {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.product-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1) !important;
}
</style>