import { ref, watch } from 'vue'

export type VideoCategory = 'sport' | 'social' | 'tech'

export interface VideoItem {
  id: string
  title: string
  description: string
  link: string
  duration: string
  category: VideoCategory
  createdAt: string
}

const STORAGE_KEY = 'libra-videos'

function loadVideos(): VideoItem[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

const videos = ref<VideoItem[]>(loadVideos())

watch(videos, (val) => localStorage.setItem(STORAGE_KEY, JSON.stringify(val)), { deep: true })

export function useVideos() {
  function addVideo(video: Omit<VideoItem, 'id' | 'createdAt'>) {
    videos.value.push({
      ...video,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    })
  }

  function updateVideo(id: string, updatedVideo: Partial<Omit<VideoItem, 'id' | 'createdAt'>>) {
    const index = videos.value.findIndex((v) => v.id === id)
    if (index !== -1) {
      videos.value[index] = { ...videos.value[index], ...updatedVideo }
    }
  }

  function deleteVideo(id: string) {
    videos.value = videos.value.filter((v) => v.id !== id)
  }

  return { videos, addVideo, updateVideo, deleteVideo }
}
