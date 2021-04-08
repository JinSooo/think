import { getCurrentInstance, provide, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// 全局变量
export const store = {
  route: null, // 路由实例
  router: null, // 路由器实例
  ctx: null, // vue实例
  ak: 'Yp3G9k9xsIsu1y5xOQjAL6ydsoAAgYnB', // 百度地图验证AK
  BMapGL: null // 百度地图实例
}

export const mixins = {
  mounted() {
    const Store = reactive(store)
    // 存放路由实例
    Store.route = useRoute()
    Store.router = useRouter()
    // 存放组件实例
    Store.ctx = getCurrentInstance().ctx
    // 存放全局变量
    provide('Store', Store)
  }
}
