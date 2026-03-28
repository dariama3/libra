<script setup lang="ts">
import MainLayout from '../layouts/MainLayout.vue'

const hour = new Date().getHours()
const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'
</script>

<template>
  <MainLayout>
    <div class="flex flex-col gap-2">
      <h1 class="text-3xl font-bold text-gray-800">{{ greeting }} 👋</h1>
      <p class="text-gray-500">Welcome back to Libra. Here's your overview for today.</p>
    </div>
  </MainLayout>
</template>
