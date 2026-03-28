<script setup lang="ts">
import Sidebar from '../components/Sidebar.vue'
</script>

<template>
  <div class="min-h-screen flex bg-gray-100 dark:bg-gray-950">
    <Sidebar />

    <div class="flex-1 flex flex-col">
      <header
        class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-end shadow-sm"
      >
        <router-link
          to="/login"
          class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >Login ?</router-link
        >
      </header>

      <main class="flex-1 p-6">
        <slot />
      </main>

      <footer class="text-center text-xs text-gray-400 dark:text-gray-600 py-4">
        &copy; {{ new Date().getFullYear() }} Libra
      </footer>
    </div>
  </div>
</template>
