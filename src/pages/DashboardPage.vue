<script setup lang="ts">
import MainLayout from '../layouts/MainLayout.vue'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { t } = useI18n()

const hour = new Date().getHours()
const greeting = computed(() => {
  if (hour < 12) return t('morning')
  if (hour < 18) return t('afternoon')
  return t('evening')
})
</script>

<template>
  <MainLayout>
    <div class="flex flex-col gap-2">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-100">{{ greeting }} 👋</h1>
      <p class="text-gray-500 dark:text-gray-400">{{ t('welcome') }}</p>
    </div>
  </MainLayout>
</template>
