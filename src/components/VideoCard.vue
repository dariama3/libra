<script setup lang="ts">
import Card from 'primevue/card'

interface VideoItem {
  title: string
  description: string
  link: string
}

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
  <Card class="max-w-96.5">
    <template #header>
      <iframe
        :src="getEmbedUrl(props.item.link)"
        width="386"
        height="217"
        allowfullscreen
        class="rounded-t-xl"
      />
    </template>
    <template #title>{{ props.item.title }}</template>
    <template #subtitle> {{ props.item.description }} </template>
  </Card>
</template>
