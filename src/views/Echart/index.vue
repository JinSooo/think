<template>
  <!-- 数据来源:https://www.iesdouyin.com/web/api/v2/hotsearch/billboard/word/ -->
  <el-container>
    <el-aside class="box-shadow_right" :width="collapseWidth">
      <header>
        Echart
      </header>
      <el-menu :default-active="defaultActive" :collapse="isCollapse" router @select="handleSelect">
        <el-menu-item index="/echart/hot">
          <i class="el-icon-menu"></i>
          <template #title>导航一</template>
        </el-menu-item>
        <el-menu-item index="/echart/map">
          <i class="el-icon-document"></i>
          <template #title>导航二</template>
        </el-menu-item>
        <el-menu-item index="/echart/user">
          <i class="el-icon-setting"></i>
          <template #title>导航三</template>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header :style="{ paddingLeft: collapseWidth }">
        <span class="back" @click="isCollapse = !isCollapse">
          <i v-if="!isCollapse" class="el-icon-s-fold"></i>
          <i v-else class="el-icon-s-unfold"></i>
        </span>
        <span class="back" @click="goBack"><i class="el-icon-switch-button"></i></span>
      </el-header>
      <el-main :style="{ marginLeft: collapseWidth }">
        <!-- 路由缓存 -->
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { computed, defineComponent, inject, ref } from 'vue'
import { getDefaultIndex, setDefaultIndex } from '@/utils/localStorage'
export default defineComponent({
  name: 'Echart',
  setup() {
    // 是否折叠导航菜单
    const isCollapse = ref(false)
    // 折叠后导航菜单的宽度
    const collapseWidth = computed(() => {
      return isCollapse.value ? '64px' : '200px'
    })
    // 全局对象
    const Store = inject('Store')
    // 返回主菜单
    const goBack = () => {
      Store.router.push('/home')
    }
    // 默认激活的菜单
    const defaultActive = getDefaultIndex() ? getDefaultIndex() : '/echart/hot'

    // 监听defaultActive的变化
    const handleSelect = index => {
      setDefaultIndex(index)
    }

    return {
      goBack,
      isCollapse,
      collapseWidth,
      defaultActive,
      handleSelect
    }
  }
})
</script>

<style lang="stylus" scoped>
.el-menu
  border 0
.el-aside
  position absolute
  left 0
  top 0
  z-index 99
  height 100%
  background rgba(255,255,255,.5)
  header
    height 60px
    font-size 30px
    line-height 60px
    text-align center
.el-header
  background #fff
  border-bottom 1px solid #e6e6e6
  line-height 60px
  font-size 20px
  font-weight 700
  display flex
  justify-content space-between
  transition .3s
  margin-left 10px
  span
    cursor pointer
    &:hover
      color #409EFF
.el-main
  background #f9f9f9
  box-sizing border-box
  transition .3s
  overflow inherit
</style>
