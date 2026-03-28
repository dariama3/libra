<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useTheme } from '../composables/useTheme'
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { House, CalendarHeart, Clapperboard, ListCheck } from 'lucide-vue-next'

const { t } = useI18n()
const { isDark, toggle } = useTheme()

const links = computed(() => [
  { label: t('dashboard'), to: '/', icon: House },
  { label: t('calendar'), to: '/calendar', icon: CalendarHeart },
  { label: t('todo_list'), to: '/todo', icon: ListCheck },
  { label: t('library'), to: '/library', icon: Clapperboard },
])
</script>

<template>
  <aside
    class="w-56 min-h-screen flex flex-col py-6 px-4 shadow-sm bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700"
  >
    <div class="text-xl font-bold mb-8 px-2 text-gray-800 dark:text-gray-100">Libra</div>

    <nav class="flex flex-col gap-1 flex-1">
      <RouterLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        active-class="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-medium"
      >
        <component :is="link.icon" class="w-5 h-5" />
        <span>{{ link.label }}</span>
      </RouterLink>
    </nav>

    <Button
      unstyled
      @click="toggle"
      :class="[
        'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm w-full border cursor-pointer',
        isDark
          ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-gray-100'
          : 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200 hover:text-gray-900',
      ]"
    >
      <span>{{ isDark ? '☀️' : '🌙' }}</span>
      <span>{{ isDark ? t('light_mode') : t('dark_mode') }}</span>
    </Button>
  </aside>
</template>
