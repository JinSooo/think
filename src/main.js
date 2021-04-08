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
// nprogress
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// echart
import * as echarts from 'echarts'
// china.js
import china from '@/mock/china.json'
import jiangsu from '@/mock/city/jiangsu.json'
// 应用地图
echarts.registerMap('china', china)
echarts.registerMap('jiangsu', jiangsu)

const app = createApp(App)
// 全局对象
app.config.globalProperties.$echarts = echarts
app.config.globalProperties.$nprogress = nprogress

app
  .use(router)
  .use(ElementPlus, { locale })
  .mount('#app')
