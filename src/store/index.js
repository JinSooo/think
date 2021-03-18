import { getCurrentInstance, provide, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// 全局变量
export const store = {
  route: null,
  router: null,
  ctx: null
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
