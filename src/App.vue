<template>
  <div id="app">
    <Navbar />
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import Navbar from './components/Navbar.vue'
</script>

<style scoped>
#app {
  min-height: 100vh;
  font-family: Arial, sans-serif;
}

.main-content {
  flex: 1;
}
</style>
