<script setup lang="ts">
import { ref, watch } from 'vue'
import { z } from 'zod'
import Dialog from 'primevue/dialog'
import type { Task } from '../../composables/useTasks'
import { useTasks } from '../../composables/useTasks'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const props = defineProps<{ task?: Task }>()
const visible = defineModel<boolean>('visible')

const { addTask, updateTask } = useTasks()

const isEdit = ref(false)
const title = ref('')
const description = ref('')
const errors = ref<{ title?: string }>({})

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string(),
})

watch(visible, (val) => {
  if (val) {
    isEdit.value = !!props.task
    title.value = props.task?.title ?? ''
    description.value = props.task?.description ?? ''
    errors.value = {}
  }
})

function submit() {
  const result = schema.safeParse({ title: title.value, description: description.value })
  if (!result.success) {
    errors.value.title = result.error.flatten().fieldErrors.title?.[0]
    return
  }
  if (isEdit.value && props.task) {
    updateTask(props.task.id, title.value, description.value)
  } else {
    addTask(title.value, description.value)
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
    :header="isEdit ? t('edit_task') : t('create_task')"
    :style="{ width: '28rem' }"
    :pt="{
      root: { class: 'rounded-2xl overflow-hidden' },
      header: {
        class:
          'bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 px-6 py-4',
      },
      content: { class: 'bg-white dark:bg-gray-900 px-6 py-4' },
      footer: {
        class: 'bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-6 py-4',
      },
    }"
  >
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-1">
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
          {{ t('task_title') }}
        </label>
        <input
          v-model="title"
          type="text"
          :placeholder="t('task_title')"
          class="w-full px-3 py-2 rounded-lg border text-sm outline-none transition-colors bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:border-[var(--color-brand)] focus:ring-2 focus:ring-[var(--color-brand-light)]"
        />
        <span v-if="errors.title" class="text-xs text-red-500">{{ errors.title }}</span>
      </div>

      <div class="flex flex-col gap-1">
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
          {{ t('description') }}
        </label>
        <textarea
          v-model="description"
          :placeholder="t('add_description')"
          rows="4"
          class="w-full px-3 py-2 rounded-lg border text-sm outline-none transition-colors resize-none bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:border-[var(--color-brand)] focus:ring-2 focus:ring-[var(--color-brand-light)]"
        />
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end gap-2">
        <button
          @click="close"
          class="px-4 py-2 rounded-lg text-sm font-medium transition-colors text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {{ t('cancel') }}
        </button>
        <button
          @click="submit"
          class="px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors hover:opacity-90"
          :style="{ backgroundColor: 'var(--color-brand)' }"
        >
          {{ isEdit ? t('save_changes') : t('create_task') }}
        </button>
      </div>
    </template>
  </Dialog>
</template>
