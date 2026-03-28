import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import router from './router'
import i18n from './i18n'
const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})

app.use(router)
app.use(i18n)
app.mount('#app')
