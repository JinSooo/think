<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import { mixins } from './store'
// import { useRoute } from 'vue-router'
export default defineComponent({
  name: 'App',
  // 混合全局变量 将其provide出去
  mixins: [mixins]
})
</script>
