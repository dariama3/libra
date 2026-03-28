<script setup lang="ts">
import MainLayout from '../layouts/MainLayout.vue'
import Calendar from '../components/Calendar.vue'
</script>

<template>
  <MainLayout>
    <div class="flex flex-col gap-6">
      <div>
        <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-100">Calendar</h1>
        <p class="text-gray-500 dark:text-gray-400 mt-1">Select a date to get started.</p>
      </div>

      <Calendar />
    </div>
  </MainLayout>
</template>
