<script setup lang="ts">
import Accordion from 'primevue/accordion'
import AccordionPanel from 'primevue/accordionpanel'
import AccordionHeader from 'primevue/accordionheader'
import AccordionContent from 'primevue/accordioncontent'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import MultiSelect from 'primevue/multiselect'

import { computed } from 'vue'
import { useVideos } from '../../composables/useVideos'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { videos } = useVideos()

const filters = defineModel<{
  search: string
  duration: string | null
  hashtags: string[]
}>('filters', {
  default: () => ({
    search: '',
    duration: null,
    hashtags: [],
  }),
})

const durationOptions = computed(() => [
  { label: t('any'), value: null },
  { label: `< 5 ${t('min')}`, value: 'short' },
  { label: `5-20 ${t('min')}`, value: 'medium' },
  { label: `> 20 ${t('min')}`, value: 'long' },
])

const allHashtags = computed(() => {
  const tags = new Set<string>()
  videos.value.forEach((v) => {
    v.hashtags?.forEach((tag) => tags.add(tag))
  })
  return Array.from(tags).map((tag) => ({ label: tag, value: tag }))
})
</script>

<template>
  <div class="mb-6">
    <Accordion value="0">
      <AccordionPanel value="0">
        <AccordionHeader
          class="text-lg font-semibold border-none py-2 hover:text-[var(--color-brand)] transition-colors"
        >
          <div class="flex items-center gap-2">
            <i class="pi pi-filter" />
            <span>{{ t('filters') }}</span>
          </div>
        </AccordionHeader>
        <AccordionContent class="border-none p-0">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
            <div class="flex flex-col gap-1.5">
              <label
                for="search"
                class="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] px-1"
                >{{ t('search_name') }}</label
              >
              <InputText
                id="search"
                v-model="filters.search"
                :placeholder="t('enter_video_title')"
                class="w-full"
              />
            </div>

            <div class="flex flex-col gap-1.5">
              <label
                for="duration"
                class="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] px-1"
                >{{ t('duration') }}</label
              >
              <Select
                id="duration"
                v-model="filters.duration"
                :options="durationOptions"
                optionLabel="label"
                optionValue="value"
                :placeholder="t('select_duration')"
                class="w-full"
              />
            </div>

            <div class="flex flex-col gap-1.5">
              <label
                for="hashtags"
                class="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] px-1"
                >{{ t('hashtags') }}</label
              >
              <MultiSelect
                id="hashtags"
                v-model="filters.hashtags"
                :options="allHashtags"
                optionLabel="label"
                optionValue="value"
                :placeholder="t('select_hashtags')"
                :maxSelectedLabels="3"
                class="w-full"
                display="chip"
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  </div>
</template>
