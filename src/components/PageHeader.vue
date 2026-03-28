<script setup lang="ts">
const props = defineProps<{ title: string; subtitle: string }>()
</script>
<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100">{{ props.title }}</h2>
    <p class="text-gray-500 dark:text-gray-400 mt-1">{{ props.subtitle }}</p>
  </div>
</template>
