<template>
  <el-container>
    <el-aside class="box-shadow_right" :width="collapseWidth">
      <header class="over_word">
        <!-- 标题名称插槽 -->
        <slot name="name"></slot>
      </header>
      <!-- 侧边栏插槽 -->
      <!-- 插槽传值给使用的组件 -->
      <slot name="aside" :isCollapse="isCollapse"></slot>
    </el-aside>
    <el-container>
      <el-header :style="{ paddingLeft: collapseWidth }">
        <!-- collaspe icon -->
        <a class="collaspe" @click="isCollapse = !isCollapse">
          <i v-if="!isCollapse" class="el-icon-s-fold"></i>
          <i v-else class="el-icon-s-unfold"></i>
        </a>
        <!-- back icon -->
        <router-link to="/home" class="back" v-show="backVisible">
          <span><i class="el-icon-switch-button"></i></span>
        </router-link>
        <!-- 头部插槽 -->
        <slot name="header"></slot>
      </el-header>
      <el-main :style="{ marginLeft: collapseWidth, padding: isPadding ? '0px' : '20px' }">
        <!-- 主体区域插槽 -->
        <slot name="main"></slot>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue'
export default defineComponent({
  name: 'Container',
  props: {
    isPadding: Boolean
  },
  setup() {
    // 是否折叠导航菜单
    const isCollapse = ref(false)
    // 是否显示退出按钮
    const backVisible = ref(true)
    // 折叠后导航菜单的宽度
    const collapseWidth = computed(() => {
      if (window.innerWidth > 768) {
        return isCollapse.value ? '64px' : '200px'
      } else {
        return isCollapse.value ? window.innerWidth - 60 + 'px' : '0px'
      }
    })
    // 监听并修改显示退出按钮
    watch(isCollapse, newValue => {
      if (window.innerWidth < 768) {
        backVisible.value = !newValue
      }
    })
    return {
      isCollapse,
      collapseWidth,
      backVisible
    }
  }
})
</script>

<style lang="stylus" scoped>
.el-aside
  position absolute
  left 0
  top 0
  z-index 99
  height 100%
  background rgba(255,255,255,.5)
  overflow hidden
  header
    height 60px
    font-size 30px
    line-height 60px
    text-align center
    font-family '楷体'
.el-header
  position relative
  background #fff
  border-bottom 1px solid #e6e6e6
  line-height 60px
  font-size 20px
  font-weight 700
  display flex
  justify-content space-between
  .collaspe
    padding-left 20px
  .back
    padding-right 10px
.el-main
  background #f9f9f9
  box-sizing border-box
  transition .3s
  overflow inherit
  margin-left 200px
  position relative
</style>
