<script setup lang="ts">
import { RouterLink } from 'vue-router'

const links = [
  { label: 'Dashboard', to: '/', icon: '▦' },
  { label: 'Calendar', to: '/calendar', icon: '⊟' },
]
</script>

<template>
  <aside class="w-56 min-h-screen bg-white shadow-sm flex flex-col py-6 px-4">
    <div class="text-xl font-bold text-gray-800 mb-8 px-2">Libra</div>
    <nav class="flex flex-col gap-1">
      <RouterLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
        active-class="bg-gray-100 text-gray-900 font-medium"
      >
        <span>{{ link.icon }}</span>
        <span>{{ link.label }}</span>
      </RouterLink>
    </nav>
  </aside>
</template>
