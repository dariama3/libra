<script setup lang="ts">
import Sidebar from '../components/Sidebar.vue'
</script>

<template>
  <div class="min-h-screen flex bg-gray-100">
    <Sidebar />

    <div class="flex-1 flex flex-col">
      <header class="bg-white shadow-sm px-6 py-4 flex items-center justify-end">
        <router-link to="/login" class="text-sm text-gray-600 hover:text-gray-900">Logout</router-link>
      </header>

      <main class="flex-1 p-6">
        <slot />
      </main>

      <footer class="text-center text-xs text-gray-400 py-4">
        &copy; {{ new Date().getFullYear() }} Libra
      </footer>
    </div>
  </div>
</template>
