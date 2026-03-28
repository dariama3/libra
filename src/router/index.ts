import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../pages/LoginPage.vue'
import DashboardPage from '../pages/DashboardPage.vue'
import CalendarPage from '../pages/CalendarPage.vue'
import TodoPage from '../pages/TodoPage.vue'
import LibraryPage from '../pages/LibraryPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', component: LoginPage },
    { path: '/', component: DashboardPage },
    { path: '/calendar', component: CalendarPage },
    { path: '/todo', component: TodoPage },
    { path: '/library', component: LibraryPage },
  ],
})

export default router
