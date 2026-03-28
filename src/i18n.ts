import ar from './locales/ar.json'
import en from './locales/en.json'
import es from './locales/es.json'
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') || 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    ar,
    es,
  },
})

document.documentElement.setAttribute('dir', i18n.global.locale.value === 'ar' ? 'rtl' : 'ltr')
document.documentElement.setAttribute('lang', i18n.global.locale.value)

export function setLocale(locale: string) {
  i18n.global.locale.value = locale as any
  localStorage.setItem('locale', locale)
  document.documentElement.setAttribute('dir', locale === 'ar' ? 'rtl' : 'ltr')
  document.documentElement.setAttribute('lang', locale)
}

export default i18n
