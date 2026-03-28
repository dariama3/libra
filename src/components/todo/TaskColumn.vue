<script setup lang="ts">
import { ref } from 'vue'
import type { Task, TaskStatus } from '../../composables/useTasks'
import { useTasks } from '../../composables/useTasks'
import TaskCard from './TaskCard.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const props = defineProps<{
  status: TaskStatus
  label: string
  tasks: Task[]
  accent: string
}>()

const emit = defineEmits<{ edit: [task: Task] }>()

const { moveTask } = useTasks()
const isDragOver = ref(false)

function onDragOver(e: DragEvent) {
  e.preventDefault()
  e.dataTransfer!.dropEffect = 'move'
  isDragOver.value = true
}

function onDragLeave() {
  isDragOver.value = false
}

function onDrop(e: DragEvent) {
  e.preventDefault()
  isDragOver.value = false
  const taskId = e.dataTransfer!.getData('taskId')
  if (taskId) moveTask(taskId, props.status)
}
</script>

<template>
  <div class="flex flex-col flex-1 min-w-0">
    <!-- Column header -->
    <div class="flex items-center gap-2 mb-3 px-1">
      <span class="w-2.5 h-2.5 rounded-full shrink-0" :style="{ backgroundColor: accent }" />
      <h2 class="text-sm font-semibold text-gray-700 dark:text-gray-300">{{ label }}</h2>
      <span
        class="ml-auto text-xs font-medium text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full"
      >
        {{ tasks.length }}
      </span>
    </div>

    <!-- Drop zone -->
    <div
      @dragover="onDragOver"
      @dragleave="onDragLeave"
      @drop="onDrop"
      class="flex flex-col gap-3 flex-1 rounded-2xl p-3 min-h-64 transition-colors"
      :class="
        isDragOver
          ? 'bg-[var(--color-brand-subtle)] border-2 border-dashed border-[var(--color-brand)]'
          : 'bg-gray-100 dark:bg-gray-900 border-2 border-transparent'
      "
    >
      <TaskCard v-for="task in tasks" :key="task.id" :task="task" @edit="emit('edit', $event)" />

      <div
        v-if="tasks.length === 0 && !isDragOver"
        class="flex-1 flex items-center justify-center text-xs text-gray-400 dark:text-gray-600 select-none"
      >
        {{ t('drop_here') }}
      </div>
    </div>
  </div>
</template>
