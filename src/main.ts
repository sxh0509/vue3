// 引入vant样式
import 'vant/lib/index.css'
// 引入公共样式
import './styles/main.css'

import { createApp } from 'vue'
import pinia from '@/stores/index'

import App from './App.vue'
import router from './router'
// console.log('router', router.currentRoute)

const app = createApp(App)

app.use(router)
app.use(pinia)

app.mount('#app')

// console.log(import.meta.env)
