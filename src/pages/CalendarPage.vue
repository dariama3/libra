<script setup lang="ts">
import MainLayout from '../layouts/MainLayout.vue'
import AppCalendar from '../components/AppCalendar.vue'
</script>

<template>
  <MainLayout>
    <div class="flex flex-col gap-6">
      <div>
        <h1 class="text-3xl font-bold text-gray-800">Calendar</h1>
        <p class="text-gray-500 mt-1">Select a date to get started.</p>
      </div>

      <AppCalendar />
    </div>
  </MainLayout>
</template>
