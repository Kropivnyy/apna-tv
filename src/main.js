import '@/styles/index.scss'
import 'virtual:svg-icons-register'

import log from 'loglevel'
import { createApp, getCurrentInstance, h } from 'vue'
import { useI18n } from 'vue-i18n'

import App from '@/App.vue'
import { i18n } from '@/localization'
import { ICON_NAMES } from '@/const'

const app = createApp({
  setup() {
    const app = getCurrentInstance()
    const { t, locale } = useI18n({ useScope: 'global' })
    if (app) {
      app.appContext.config.globalProperties.$t = t
      app.appContext.config.globalProperties.$locale = locale
    }
  },
  render: () => h(App)
})

const initApp = async () => {
  try {
    app.use(i18n)

    app.config.globalProperties.$icons = ICON_NAMES

    app.config.errorHandler = function (error, instance, info) {
      log.error(error)
      log.error(instance)
      log.error(info)
    }

    app.mount('#app')
  } catch (err) {
    log.error('Error while initializing app', err)
  }
}

initApp()
