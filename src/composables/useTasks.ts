import { ref, watch } from 'vue'

export type TaskStatus = 'todo' | 'in-progress' | 'done'

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  createdAt: string
}

const STORAGE_KEY = 'libra-tasks'

function loadTasks(): Task[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
  } catch {
    return []
  }
}

const tasks = ref<Task[]>(loadTasks())

watch(tasks, (val) => localStorage.setItem(STORAGE_KEY, JSON.stringify(val)), { deep: true })

export function useTasks() {
  function addTask(title: string, description: string) {
    tasks.value.push({
      id: crypto.randomUUID(),
      title,
      description,
      status: 'todo',
      createdAt: new Date().toISOString(),
    })
  }

  function moveTask(id: string, status: TaskStatus) {
    const task = tasks.value.find((t) => t.id === id)
    if (task) task.status = status
  }

  function deleteTask(id: string) {
    tasks.value = tasks.value.filter((t) => t.id !== id)
  }

  function updateTask(id: string, title: string, description: string) {
    const task = tasks.value.find((t) => t.id === id)
    if (task) {
      task.title = title
      task.description = description
    }
  }

  function tasksByStatus(status: TaskStatus) {
    return tasks.value.filter((t) => t.status === status)
  }

  return { tasks, addTask, moveTask, deleteTask, updateTask, tasksByStatus }
}
