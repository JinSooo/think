import { provide, reactive } from 'vue'

// 全局变量
const store = {
  a: 1
}

export const mixins = {
  mounted() {
    // 存放全局变量
    provide('Store', reactive(store))
  }
}
