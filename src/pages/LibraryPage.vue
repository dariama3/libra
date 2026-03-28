<script setup lang="ts">
import MainLayout from '../layouts/MainLayout.vue'
import PageHeader from '../components/PageHeader.vue'
import { useI18n } from 'vue-i18n'
import VideoCard from '../components/VideoCard.vue'
const { t } = useI18n()

const videos = [
  {
    title: 'Introduction to Vue',
    description: 'Learn the basics of Vue.js',
    link: 'https://youtu.be/jLOuMXnM5wk?si=17boFSfVpBg3I3x8',
  },
  {
    title: 'Advanced Vue Features',
    description: 'Explore advanced Vue features',
    link: 'https://youtu.be/NPPRJdfrl5U?si=xJ2x2PUtzVoMRdmj',
  },
  { title: 'Vue Router Guide', description: 'Master navigation in Vue apps' },
  { title: 'Pinia State Management', description: 'Effective state management for Vue' },
  { title: 'PrimeVue Components', description: 'How to use PrimeVue UI components' },
  { title: 'Testing Vue Apps', description: 'Write unit and E2E tests for Vue' },
]
</script>
<template>
  <MainLayout>
    <PageHeader :title="t('library')" subtitle="Your personal library" />
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="video in videos" :key="video.title">
        <VideoCard :item="video" />
      </div>
    </div>
  </MainLayout>
</template>
