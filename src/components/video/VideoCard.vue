<script setup lang="ts">
import Card from 'primevue/card'
import type { VideoItem } from '../../composables/useVideos'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const props = defineProps<{ item: VideoItem }>()

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
      <div class="flex items-center justify-between mx-1.5">
        <span class="truncate">{{ props.item.title }}</span>
        <span
          class="text-xs font-normal text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"
        >
          {{ props.item.duration }}
        </span>
      </div>
    </template>
    <template #subtitle>
      <div class="flex flex-col gap-2 mx-1.5">
        <p class="text-sm line-clamp-2">{{ props.item.description }}</p>
        <div class="flex items-center gap-2">
          <span class="text-[10px] uppercase tracking-wider font-bold text-[var(--color-brand)]">
            {{ props.item.category }}
          </span>
        </div>
      </div>
    </template>
  </Card>
</template>
