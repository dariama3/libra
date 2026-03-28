<script setup lang="ts">
import { ref, watch } from 'vue'
import { z } from 'zod'
import Dialog from 'primevue/dialog'
import Select from 'primevue/select'
import type { VideoItem } from '../../composables/useVideos'
import { useVideos } from '../../composables/useVideos'
import { useI18n } from 'vue-i18n'
import { extractYoutubeId, parseISO8601Duration } from '../../utils/youtube.ts'
import { fetchVideoMetadata } from '../../services/youtube.ts'
const { t } = useI18n()
const props = defineProps<{ video?: VideoItem }>()
const visible = defineModel<boolean>('visible')

const { addVideo, updateVideo } = useVideos()

const isEdit = ref(false)
const video = ref(null)
const title = ref('')
const description = ref('')
const link = ref('')
const duration = ref('')
const category = ref<'sport' | 'social' | 'tech'>('sport')

const errors = ref<{ title?: string; link?: string; duration?: string }>({})

async function loadVideo() {
  const id = extractYoutubeId(link.value)
  if (!id) return

  const metadata = await fetchVideoMetadata(id)
  if (!metadata) return

  video.value = metadata
  title.value = metadata.snippet.title
  description.value = metadata.snippet.description
  duration.value = parseISO8601Duration(metadata.contentDetails.duration)
}

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string(),
  link: z.string().url('Invalid URL'),
  duration: z.string().min(1, 'Duration is required'),
  category: z.enum(['sport', 'social', 'tech']),
})

const categories = [
  { label: 'Sport', value: 'sport' },
  { label: 'Social', value: 'social' },
  { label: 'Tech', value: 'tech' },
]

watch(visible, (val) => {
  if (val) {
    isEdit.value = !!props.video
    title.value = props.video?.title ?? ''
    description.value = props.video?.description ?? ''
    link.value = props.video?.link ?? ''
    duration.value = props.video?.duration ?? ''
    category.value = props.video?.category ?? 'sport'
    errors.value = {}
  }
})

function submit() {
  const result = schema.safeParse({
    title: title.value,
    description: description.value,
    link: link.value,
    duration: duration.value,
    category: category.value,
  })

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors
    errors.value = {
      title: fieldErrors.title?.[0],
      link: fieldErrors.link?.[0],
      duration: fieldErrors.duration?.[0],
    }
    return
  }

  const videoData = {
    title: title.value,
    description: description.value,
    link: link.value,
    duration: duration.value,
    category: category.value,
  }

  if (isEdit.value && props.video) {
    updateVideo(props.video.id, videoData)
  } else {
    addVideo(videoData)
  }
  visible.value = false
}

function close() {
  visible.value = false
}
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    :header="isEdit ? t('edit_video') : t('add_video')"
    :style="{ width: '32rem' }"
    :pt="{
      root: { class: 'rounded-2xl overflow-hidden shadow-2xl border-0' },
      header: {
        class:
          'bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 border-b border-gray-100 dark:border-gray-800 px-6 py-4',
      },
      content: { class: 'bg-white dark:bg-gray-900 px-6 py-6' },
      footer: {
        class: 'bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 px-6 py-4',
      },
    }"
  >
    <div class="flex flex-col gap-4 my-2">
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-semibold uppercase tracking-wider text-gray-500">
          {{ t('video_link') }}
        </label>
        <input
          v-model="link"
          type="text"
          placeholder="https://youtube.com/..."
          class="w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all bg-gray-50/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 focus:border-[var(--color-brand)] focus:ring-4 focus:ring-[var(--color-brand-light)]"
          @change="loadVideo"
        />
        <span v-if="errors.link" class="text-xs text-red-500 font-medium ml-1">
          {{ errors.link }}
        </span>
        <button @click="loadVideo" class="mt-2 text-sm text-blue-500 hover:underline">Load</button>
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-semibold uppercase tracking-wider text-gray-500">
            {{ t('video_title') }}
          </label>
          <input
            v-model="title"
            type="text"
            :placeholder="t('video_title')"
            class="w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all bg-gray-50/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 focus:border-[var(--color-brand)] focus:ring-4 focus:ring-[var(--color-brand-light)]"
          />
          <span v-if="errors.title" class="text-xs text-red-500 font-medium ml-1">
            {{ errors.title }}
          </span>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-semibold uppercase tracking-wider text-gray-500">
            {{ t('duration') }}
          </label>
          <input
            v-model="duration"
            type="text"
            placeholder="e.g. 10:45"
            class="w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all bg-gray-50/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 focus:border-[var(--color-brand)] focus:ring-4 focus:ring-[var(--color-brand-light)]"
          />
          <span v-if="errors.duration" class="text-xs text-red-500 font-medium ml-1">
            {{ errors.duration }}
          </span>
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-semibold uppercase tracking-wider text-gray-500">
            {{ t('category') }}
          </label>
          <Select
            v-model="category"
            :options="categories"
            optionLabel="label"
            optionValue="value"
            class="w-full !rounded-xl !border-gray-200 dark:!border-gray-700 !bg-gray-50/50 dark:!bg-gray-800/50"
            :pt="{
              root: {
                class:
                  'bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700',
              },
              label: { class: 'text-gray-800 dark:text-gray-100 text-sm' },
              list: {
                class: 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700',
              },
              option: ({ context }) => ({
                class: [
                  'px-4 py-2 text-sm transition-colors cursor-pointer',
                  context.focused ? 'bg-gray-100 dark:bg-gray-800' : '',
                  context.selected
                    ? 'text-[var(--color-brand)] font-bold'
                    : 'text-gray-700 dark:text-gray-300',
                ],
              }),
            }"
          />
        </div>
      </div>

      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-semibold uppercase tracking-wider text-gray-500">
          {{ t('description') }}
        </label>
        <textarea
          v-model="description"
          :placeholder="t('add_description')"
          rows="3"
          class="w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all resize-none bg-gray-50/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 focus:border-[var(--color-brand)] focus:ring-4 focus:ring-[var(--color-brand-light)]"
        />
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end gap-3">
        <button
          @click="close"
          class="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {{ t('cancel') }}
        </button>
        <button
          @click="submit"
          class="px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all shadow-lg hover:shadow-[var(--color-brand-light)] active:scale-95"
          :style="{ backgroundColor: 'var(--color-brand)' }"
        >
          {{ isEdit ? t('save_changes') : t('add_video') }}
        </button>
      </div>
    </template>
  </Dialog>
</template>
