import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// element-plus
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

// reset css
import '@/assets/css/reset.css'

// global css
import '@/assets/stylus/global.styl'

createApp(App)
  .use(router)
  .use(ElementPlus)
  .mount('#app')
