// import './assets/main.css'
import './index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// https://github.com/Maronato/vue-toastification?tab=readme-ov-file
import toast, { POSITION } from 'vue-toastification'
// Import the default CSS
import 'vue-toastification/dist/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(toast, {
  // Setting the global default position
  position: POSITION.BOTTOM_RIGHT,
  // Customizing style
  toastClassName: "toast-custom",
  closeButtonClassName: "close-toast-button",
})

app.mount('#app')
