<script setup lang="ts">
import Card from 'primevue/card'
import Button from 'primevue/button'
import type { VideoItem } from '../../composables/useVideos'
import { useI18n } from 'vue-i18n'
import { Pencil, Trash2 } from 'lucide-vue-next'

const { t } = useI18n()
const props = defineProps<{ item: VideoItem }>()
const emit = defineEmits<{
  (e: 'edit', item: VideoItem): void
  (e: 'delete', id: string): void
}>()

const getEmbedUrl = (url: string): string => {
  try {
    const parsed = new URL(url)

    // youtube.com/watch?v=VIDEO_ID
    if (parsed.hostname.includes('youtube.com') && parsed.pathname === '/watch') {
      const videoId = parsed.searchParams.get('v')
      if (videoId) return `https://www.youtube-nocookie.com/embed/${videoId}`
    }

    // youtu.be/VIDEO_ID
    if (parsed.hostname === 'youtu.be') {
      const videoId = parsed.pathname.replace('/', '').split('?')[0]
      if (videoId) return `https://www.youtube-nocookie.com/embed/${videoId}`
    }

    // shorts /shorts/VIDEO_ID
    if (parsed.hostname.includes('youtube.com') && parsed.pathname.startsWith('/shorts/')) {
      const videoId = parsed.pathname.split('/')[2]
      if (videoId) return `https://www.youtube-nocookie.com/embed/${videoId}`
    }

    // live /live/VIDEO_ID
    if (parsed.hostname.includes('youtube.com') && parsed.pathname.startsWith('/live/')) {
      const videoId = parsed.pathname.split('/')[2]
      if (videoId) return `https://www.youtube-nocookie.com/embed/${videoId}`
    }

    return url // fallback
  } catch {
    return url // invalid URL fallback
  }
}
</script>
<template>
  <Card
    class="w-full sm:max-w-96.5 overflow-hidden"
    :pt="{
      root: {
        class: 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm',
      },
      title: { class: 'text-gray-900 dark:text-gray-100' },
      subtitle: { class: 'text-gray-600 dark:text-gray-400' },
    }"
  >
    <template #header>
      <div class="aspect-video w-full">
        <iframe
          :src="getEmbedUrl(props.item.link)"
          class="w-full h-full rounded-t-xl"
          allowfullscreen
        />
      </div>
    </template>
    <template #title>
      <div class="flex items-center justify-between mx-1.5 gap-2">
        <span class="truncate">{{ props.item.title }}</span>
        <div class="flex items-center gap-1">
          <Button
            unstyled
            @click="emit('edit', props.item)"
            class="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors cursor-pointer"
          >
            <Pencil class="w-4 h-4" />
          </Button>
          <Button
            unstyled
            @click="emit('delete', props.item.id)"
            class="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer"
          >
            <Trash2 class="w-4 h-4" />
          </Button>
          <span
            class="text-xs font-normal text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded ml-1"
          >
            {{ props.item.duration }}
          </span>
        </div>
      </div>
    </template>
    <template #subtitle>
      <div class="flex flex-col gap-2 mx-1.5">
        <p class="text-sm line-clamp-2">{{ props.item.description }}</p>
        <div class="flex items-center gap-2 flex-wrap">
          <span class="text-[10px] uppercase tracking-wider font-bold text-[var(--color-brand)]">
            {{ props.item.category }}
          </span>
          <span
            v-for="tag in props.item.hashtags"
            :key="tag"
            class="text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-1.5 py-0.5 rounded"
          >
            #{{ tag }}
          </span>
        </div>
      </div>
    </template>
  </Card>
</template>
