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
const { t } = useI18n()

const { videos } = useVideos()
const dialogVisible = ref(false)
const editingVideo = ref<VideoItem | undefined>()

function openCreate() {
  editingVideo.value = undefined
  dialogVisible.value = true
}

const activeTab = ref('0')
const tabs = {
  '0': 'sport',
  '1': 'social',
  '2': 'tech',
}

const filteredVideos = computed(() => {
  return videos.value.filter((v) => v.category === tabs[activeTab.value])
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
      <TabList
        :pt="{
          root: { class: 'bg-transparent border-gray-200 dark:border-gray-700' },
          tab: ({ context }) => ({
            class: [
              'transition-all duration-300 font-medium px-6 py-3 border-b-2 -mb-px',
              context.active
                ? 'text-[var(--color-brand)] border-[var(--color-brand)]'
                : 'text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600',
            ],
          }),
        }"
      >
        <Tab value="0">Sport</Tab>
        <Tab value="1">Social</Tab>
        <Tab value="2">Tech</Tab>
      </TabList>
      <TabPanels class="min-h-[320px] bg-transparent">
        <TabPanel value="0" class="bg-transparent">
          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"
            v-if="filteredVideos.length"
          >
            <VideoCard v-for="video in filteredVideos" :key="video.title" :item="video" />
          </div>
          <div v-else class="text-center text-gray-500 dark:text-gray-400 mt-4">Add video</div>
        </TabPanel>
        <TabPanel value="1" class="bg-transparent">
          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"
            v-if="filteredVideos.length"
          >
            <VideoCard v-for="video in filteredVideos" :key="video.title" :item="video" />
          </div>
        </TabPanel>
        <TabPanel value="2" class="bg-transparent">
          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"
            v-if="filteredVideos.length"
          >
            <VideoCard v-for="video in filteredVideos" :key="video.title" :item="video" />
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>

    <VideoDialog v-model:visible="dialogVisible" :video="editingVideo" />
  </MainLayout>
</template>
