<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="#">Интернет-магазин</a>
        <div class="navbar-nav">
          <router-link to="/products" class="nav-link">Товары</router-link>
          <router-link to="/categories" class="nav-link">Категории</router-link>
          <!-- Добавьте другие ссылки -->
        </div>
      </div>
    </nav>
    
    <router-view></router-view>
  </div>
</template>

<script setup>
// Основной компонент приложения
</script>