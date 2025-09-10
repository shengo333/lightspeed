<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-container">
        <h2 class="nav-logo">Vue App</h2>
        <ul class="nav-menu">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link">Product List</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/product" class="nav-link">Product</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/cart" class="nav-link">Shopping Cart</RouterLink>
          </li>
        </ul>
      </div>
    </nav>
    
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
// No imports needed - RouterLink and RouterView are globally available
</script>

<style scoped>
#app {
  min-height: 100vh;
  font-family: Arial, sans-serif;
}

.navbar {
  background: #42b883;
  color: white;
  padding: 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

.nav-logo {
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-menu {
  list-style: none;
  display: flex;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin: 0;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-link.router-link-active {
  background-color: rgba(255, 255, 255, 0.2);
  font-weight: 600;
}

.main-content {
  flex: 1;
}
</style>
