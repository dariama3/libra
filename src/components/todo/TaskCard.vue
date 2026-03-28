<script setup lang="ts">
import type { Task } from '../../composables/useTasks'
import { useTasks } from '../../composables/useTasks'
import { Pencil, Trash2 } from 'lucide-vue-next'
import Button from 'primevue/button'

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
      <h3 class=" font-semibold text-gray-800 dark:text-gray-100 leading-snug">
        {{ task.title }}
      </h3>
      <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
        <Button
          unstyled
          @click="emit('edit', task)"
          class="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors cursor-pointer"
        >
          <Pencil class="w-4 h-4" />
        </button>
        <Button
          unstyled
          @click="deleteTask(task.id)"
          class="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer"
          title="Delete"
        >
          <Trash2 class="w-4 h-4" />
        </Button>
      </div>
    </div>
    <p v-if="task.description" class="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-3">
      {{ task.description }}
    </p>
  </div>
</template>
