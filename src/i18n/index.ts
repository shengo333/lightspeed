import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import ru from './locales/ru.json'

// Get saved language from localStorage or default to English
const savedLocale = localStorage.getItem('locale') || 'en'

const i18n = createI18n({
  locale: savedLocale,
  fallbackLocale: 'en',
  legacy: false, // Enable Composition API mode
  messages: {
    en,
    ru
  }
})

export default i18n
