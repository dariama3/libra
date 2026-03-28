<script setup lang="ts">
import { ref } from 'vue'
import MainLayout from '../layouts/MainLayout.vue'
import TaskColumn from '../components/todo/TaskColumn.vue'
import TaskDialog from '../components/todo/TaskDialog.vue'
import type { Task } from '../composables/useTasks'
import { useTasks } from '../composables/useTasks'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const { tasksByStatus } = useTasks()
const dialogVisible = ref(false)
const editingTask = ref<Task | undefined>()

function openCreate() {
  editingTask.value = undefined
  dialogVisible.value = true
}

function openEdit(task: Task) {
  editingTask.value = task
  dialogVisible.value = true
}

const columns = [
  { status: 'todo' as const, label: t('todo'), accent: '#9ca3af' },
  { status: 'in-progress' as const, label: t('in_progress'), accent: '#646cff' },
  { status: 'done' as const, label: t('done'), accent: '#22c55e' },
]
</script>

<template>
  <MainLayout>
    <div class="flex flex-col gap-6 h-full">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-100">{{ t('todo_list') }}</h1>
          <p class="text-gray-500 dark:text-gray-400 mt-1 text-sm">
            {{ t('drag_and_drop') }}
          </p>
        </div>
        <button
          @click="openCreate"
          class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white transition-colors hover:opacity-90"
          :style="{ backgroundColor: 'var(--color-brand)' }"
        >
          <span class="text-base leading-none">+</span>
          {{ t('add_task') }}
        </button>
      </div>

      <!-- Columns -->
      <div class="grid grid-cols-3 gap-4 flex-1">
        <TaskColumn
          v-for="col in columns"
          :key="col.status"
          :status="col.status"
          :label="col.label"
          :accent="col.accent"
          :tasks="tasksByStatus(col.status)"
          @edit="openEdit"
        />
      </div>
    </div>

    <TaskDialog v-model:visible="dialogVisible" :task="editingTask" />
  </MainLayout>
</template>
