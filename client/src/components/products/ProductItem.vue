<template>
  <div class="product-item card mb-3 shadow-sm">
    <div class="card-body">
      <div class="row align-items-center">
        <div class="col-md-6">
          <h5 class="card-title text-primary mb-2">{{ product.name }}</h5>
          <div class="d-flex align-items-center">
            <span class="badge bg-success me-2">Категория:</span>
            <span class="text-muted">{{ categoryName }}</span>
          </div>
        </div>
        
        <div class="col-md-3">
          <div class="product-meta">
            <small class="text-muted d-block">Цена: {{ product.price }} ₽</small>
            <small class="text-muted d-block">В наличии: {{ product.quantity }} шт.</small>
          </div>
        </div>
        
        <div class="col-md-3">
          <div class="d-flex gap-2 justify-content-end">
            <button
              class="btn btn-outline-primary btn-lg"
              @click="$emit('edit', product)"
              title="Редактировать"
            >
              <i class="bi bi-pen-fill"></i>
            </button>
            <button 
              class="btn btn-outline-danger btn-lg"
              @click="$emit('remove', product)"
              title="Удалить"
            >
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
        </div>
      </div>
      
      <div v-if="product.description" class="mt-3">
        <p class="card-text text-muted small">{{ product.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  groupsById: {
    type: Object,
    default: () => ({})
  }
})

defineEmits(['edit', 'remove'])

const categoryName = computed(() => {
  return props.groupsById[props.product.category]?.name || 'Без категории'
})
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