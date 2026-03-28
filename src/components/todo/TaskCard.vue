<script setup lang="ts">
import type { Task } from '../../composables/useTasks'
import { useTasks } from '../../composables/useTasks'

const props = defineProps<{ task: Task }>()
const emit = defineEmits<{ edit: [task: Task] }>()

const { deleteTask } = useTasks()

function onDragStart(e: DragEvent) {
  e.dataTransfer!.setData('taskId', props.task.id)
  e.dataTransfer!.effectAllowed = 'move'
}
</script>

<template>
  <div
    draggable="true"
    @dragstart="onDragStart"
    class="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
      rounded-xl p-4 cursor-grab active:cursor-grabbing shadow-sm
      hover:shadow-md hover:border-[var(--color-brand)] transition-all"
  >
    <div class="flex items-start justify-between gap-2">
      <h3 class="text-sm font-semibold text-gray-800 dark:text-gray-100 leading-snug">
        {{ task.title }}
      </h3>
      <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5">
        <button
          @click="emit('edit', task)"
          class="text-gray-400 hover:text-[var(--color-brand)] text-xs"
          title="Edit"
        >
          ✎
        </button>
        <button
          @click="deleteTask(task.id)"
          class="text-gray-400 hover:text-red-500 text-xs"
          title="Delete"
        >
          ✕
        </button>
      </div>
    </div>
    <p v-if="task.description" class="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed line-clamp-3">
      {{ task.description }}
    </p>
  </div>
</template>
