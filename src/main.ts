import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import App from './App.vue'
import './style.css'

const app = createApp(App)
app.config.errorHandler = (err, _i, info) => {
  console.error('[app error]', info, err)
}
app.use(MotionPlugin).mount('#app')
