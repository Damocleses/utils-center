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

import EditTableColumn from '@/components/custom/custom-edit-column'
import CustomInput from '@/components/custom/custom-input'
import FastTable from '@/components/custom/fast-table'


registerStore()

createApp(App)
.use(router)
.component("custom-edit-column",EditTableColumn)
.component("custom-input", CustomInput)
.component("fast-table", FastTable)
.use(i18n)
.use(ElementPlus)
.use(SvgIcon)
.mount('#app')
