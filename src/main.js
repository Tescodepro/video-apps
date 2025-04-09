import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { createPinia } from 'pinia'

import './assets/main.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle'

const app = createApp(App)
app.use(router)

const pinia = createPinia()
app.use(pinia)

app.mount('#app')
