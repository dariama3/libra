<script setup lang="ts">
import MainLayout from '../layouts/MainLayout.vue'
import PageHeader from '../components/PageHeader.vue'
import { useI18n } from 'vue-i18n'
import VideoCard from '../components/VideoCard.vue'

import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import { computed, ref } from 'vue'
const { t } = useI18n()

const activeTab = ref('0')
const tabs = {
  '0': 'sport',
  '1': 'social',
  '2': 'tech',
}

const filteredVideos = computed(() => {
  return videos.filter((v) => v.category === tabs[activeTab.value])
})
const videos = [
  {
    title: 'Introduction to Vue',
    description: 'Learn the basics of Vue.js',
    link: 'https://youtu.be/jLOuMXnM5wk?si=17boFSfVpBg3I3x8',
    category: 'sport',
  },
  {
    title: 'Advanced Vue Features',
    description: 'Explore advanced Vue features',
    link: 'https://youtu.be/NPPRJdfrl5U?si=xJ2x2PUtzVoMRdmj',
    category: 'sport',
  },
  {
    title: 'Vue Router Guide',
    description: 'Master navigation in Vue apps',
    link: 'https://youtu.be/NPPRJdfrl5U?si=xJ2x2PUtzVoMRdmj',
    category: 'tech',
  },
  {
    title: 'Pinia State Management',
    description: 'Effective state management for Vue',
    link: 'https://youtu.be/NPPRJdfrl5U?si=xJ2x2PUtzVoMRdmj',
    category: 'social',
  },
  {
    title: 'PrimeVue Components',
    description: 'How to use PrimeVue UI components',
    link: 'https://youtu.be/NPPRJdfrl5U?si=xJ2x2PUtzVoMRdmj',
    category: 'social',
  },
  {
    title: 'Testing Vue Apps',
    description: 'Write unit and E2E tests for Vue',
    link: 'https://youtu.be/NPPRJdfrl5U?si=xJ2x2PUtzVoMRdmj',
    category: 'social',
  },
]
</script>
<template>
  <MainLayout>
    <PageHeader :title="t('library')" subtitle="Your personal library" />
    <Tabs v-model:value="activeTab">
      <TabList>
        <Tab value="0">Sport</Tab>
        <Tab value="1">Social</Tab>
        <Tab value="2">Tech</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            <VideoCard v-for="video in filteredVideos" :key="video.title" :item="video" />
          </div>
        </TabPanel>
        <TabPanel value="1">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            <VideoCard v-for="video in filteredVideos" :key="video.title" :item="video" />
          </div>
        </TabPanel>
        <TabPanel value="2">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            <VideoCard v-for="video in filteredVideos" :key="video.title" :item="video" />
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </MainLayout>
</template>
