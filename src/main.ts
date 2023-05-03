import 'virtual:svg-icons-register'
import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import { i18n } from './i18n'
import { router } from './router'
import { registerStore } from './store'

import '@/icons/iconfont/iconfont'
import '@/styles/index.scss'
import 'element-plus/dist/index.css'

import 'xe-utils'

import SvgIcon from '@/components/svg-icon'


registerStore()

createApp(App)
.use(router)
.use(i18n)
.use(ElementPlus)
.use(SvgIcon)
.mount('#app')
