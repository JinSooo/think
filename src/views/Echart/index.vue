<template>
  <!-- 数据来源:https://www.iesdouyin.com/web/api/v2/hotsearch/billboard/word/ -->
  <Container>
    <template #name>Echart</template>
    <template #aside="{ isCollapse }">
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
    </template>
    <template #main>
      <!-- 路由缓存 -->
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </template>
  </Container>
</template>

<script>
import { defineComponent } from 'vue'
import { getDefaultIndex, setDefaultIndex } from '@/utils/localStorage'
import Container from '@/components/Container'
export default defineComponent({
  name: 'Echart',
  components: {
    Container
  },
  setup() {
    // 默认激活的菜单
    const defaultActive = getDefaultIndex() ? getDefaultIndex() : '/echart/hot'
    // 监听defaultActive的变化
    const handleSelect = index => {
      setDefaultIndex(index)
    }
    return {
      defaultActive,
      handleSelect
    }
  }
})
</script>
