<script setup lang="ts">
import MainLayout from '../layouts/MainLayout.vue'
import PageHeader from '../components/PageHeader.vue'
import { useI18n } from 'vue-i18n'
import VideoCard from '../components/video/VideoCard.vue'
import VideoDialog from '../components/video/VideoDialog.vue'

import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import { computed, ref } from 'vue'
import { useVideos, type VideoItem } from '../composables/useVideos'
import FilterPanel from '../components/video/FilterPanel.vue'
const { t } = useI18n()

const { videos, deleteVideo } = useVideos()
const dialogVisible = ref(false)
const editingVideo = ref<VideoItem | undefined>()

function openCreate() {
  editingVideo.value = undefined
  dialogVisible.value = true
}

function openEdit(video: VideoItem) {
  editingVideo.value = video
  dialogVisible.value = true
}

function handleDelete(id: string) {
  if (confirm('Are you sure you want to delete this video?')) {
    deleteVideo(id)
  }
}

const activeTab = ref('0')
const filters = ref({
  search: '',
  duration: null,
  hashtags: [],
})
const tabs = {
  '0': 'sport',
  '1': 'social',
  '2': 'tech',
}

const filteredVideos = computed(() => {
  return videos.value.filter((v) => {
    const matchesTab = v.category === tabs[activeTab.value]
    if (!matchesTab) return false

    const matchesSearch = v.title.toLowerCase().includes(filters.value.search.toLowerCase())
    if (!matchesSearch) return false

    if (filters.value.duration) {
      const parts = v.duration.split(':').map(Number)
      let minutes = 0
      if (parts.length === 3) {
        // HH:MM:SS
        minutes = parts[0] * 60 + parts[1] + parts[2] / 60
      } else if (parts.length === 2) {
        // MM:SS
        minutes = parts[0] + parts[1] / 60
      } else {
        minutes = parts[0] || 0
      }

      if (filters.value.duration === 'short' && minutes >= 5) return false
      if (filters.value.duration === 'medium' && (minutes < 5 || minutes > 15)) return false
      if (filters.value.duration === 'long' && minutes <= 15) return false
    }

    if (filters.value.hashtags.length > 0) {
      const matchesHashtags = filters.value.hashtags.every((tag) => v.hashtags?.includes(tag))
      if (!matchesHashtags) return false
    }

    return true
  })
})
</script>
<template>
  <MainLayout>
    <div class="flex items-center justify-between mb-6">
      <PageHeader :title="t('library')" subtitle="Your personal library" />
      <button
        @click="openCreate"
        class="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all shadow-lg hover:opacity-90 active:scale-95"
        :style="{ backgroundColor: 'var(--color-brand)' }"
      >
        <span class="text-lg leading-none">+</span>
        {{ t('add_video') }}
      </button>
    </div>

    <Tabs v-model:value="activeTab">
      <TabList>
        <Tab value="0">Sport</Tab>
        <Tab value="1">Social</Tab>
        <Tab value="2">Tech</Tab>
      </TabList>
      <TabPanels class="h-[680px] bg-transparent overflow-scroll">
        <FilterPanel v-model:filters="filters" />
        <TabPanel value="0" class="bg-transparent">
          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"
            v-if="filteredVideos.length"
          >
            <VideoCard
              v-for="video in filteredVideos"
              :key="video.id"
              :item="video"
              @edit="openEdit"
              @delete="handleDelete"
            />
          </div>
          <div v-else class="text-center text-gray-500 dark:text-gray-400 mt-4">Add video</div>
        </TabPanel>
        <TabPanel value="1" class="bg-transparent">
          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"
            v-if="filteredVideos.length"
          >
            <VideoCard
              v-for="video in filteredVideos"
              :key="video.id"
              :item="video"
              @edit="openEdit"
              @delete="handleDelete"
            />
          </div>
        </TabPanel>
        <TabPanel value="2" class="bg-transparent">
          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"
            v-if="filteredVideos.length"
          >
            <VideoCard
              v-for="video in filteredVideos"
              :key="video.id"
              :item="video"
              @edit="openEdit"
              @delete="handleDelete"
            />
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>

    <VideoDialog v-model:visible="dialogVisible" :video="editingVideo" />
  </MainLayout>
</template>
