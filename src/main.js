import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
// 引入ElementPlus中文语言
import locale from 'element-plus/lib/locale/lang/zh-cn'

// reset css
import '@/assets/css/reset.css'

// global css
import '@/assets/stylus/global.styl'

createApp(App)
  .use(router)
  .use(ElementPlus, { locale })
  .mount('#app')
