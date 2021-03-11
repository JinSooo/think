<template>
  <!-- 背景canvas -->
  <iframe id="bgCanv" src="bg.html" frameborder="0"></iframe>
  <Home />
  <Timeline />
</template>

<script>
import { defineComponent } from 'vue'
import { mixins } from './store'
import Home from '@/views/Home'
import Timeline from '@/components/Timeline'
export default defineComponent({
  name: 'App',
  mixins: [mixins],
  components: {
    Home,
    Timeline
  }
})
</script>

<style lang="stylus" scoped>
#bgCanv
  position absolute
  left 0
  top 0
  z-index -1
</style>
