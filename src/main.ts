import { createApp } from 'vue'
import { createPinia } from 'pinia' // Import Pinia
import App from './App.vue'
import router from './router'
import './style.css'
// Buat instance Pinia
const pinia = createPinia()

const app = createApp(App)

// Gunakan Pinia dan router
app.use(pinia)
app.use(router)
app.mount('#app')