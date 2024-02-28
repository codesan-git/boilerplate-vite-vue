import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import './styles/index.css'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css';

const pinia = createPinia()
const app = createApp(App)

app.use(VueQueryPlugin)
app.use(Antd)
app.use(pinia)
app.mount('#app')

