<template>
  <a href="javascript:;" class="timeline">
    <transition name="left_move">
      <img
        src="../../assets/img/icon/星座.svg"
        alt=""
        width="50"
        height="50"
        @click="isShowTimeline = true"
        v-show="!isShowTimeline"
      />
    </transition>
    <transition name="top_move">
      <!-- 时间线 -->
      <el-timeline v-show="isShowTimeline" @click="isShowTimeline = false">
        <el-timeline-item v-for="(line, index) in timelineInfo" :key="index" :timestamp="line.time">
          {{ line.title }}
        </el-timeline-item>
      </el-timeline>
    </transition>
  </a>
</template>

<script>
import { defineComponent, ref } from 'vue'
import timelineInfo from '@/mock/timeline.json'
export default defineComponent({
  name: 'Timeline',
  setup() {
    const isShowTimeline = ref(false)
    return {
      isShowTimeline,
      timelineInfo
    }
  }
})
</script>

<style lang="stylus" scoped>
.timeline
  position absolute
  top 20px
  left 20px
.top_move-enter-active,.top_move-leave-active
  transition transform .8s
.top_move-enter-from,.top_move-leave-to
  transform translateY(-100% - 60px)
.top_move-enter-to,.top_move-leave-from
  transform translateY(-53px)
.left_move-enter-active,.left_move-leave-active
  transition transform .8s
.left_move-enter-from,.left_move-leave-to
  transform translateX(-200%)
</style>
