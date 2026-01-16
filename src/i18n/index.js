import { createI18n } from 'vue-i18n'
import de from './de.json'
import it from './it.json'

const i18n = createI18n({
  legacy: false,
  locale: 'de',
  fallbackLocale: 'de',
  messages: {
    de,
    it
  }
})

export default i18n
