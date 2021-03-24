<template>
  <div class="main-container">
    <div class="main">
      <header>测试工程</header>
      <!-- 图标列表 -->
      <ul class="project_list">
        <li class="project_item">
          <router-link to="/echart">
            <img src="../../assets/img/icon/宇航员.svg" alt="" width="80" height="80" />
            <p>echart</p>
          </router-link>
        </li>
        <li class="project_item">
          <router-link to="/location">
            <img src="../../assets/img/icon/外星人.svg" alt="" width="80" height="80" />
            <p>Location</p>
          </router-link>
        </li>
        <li class="project_item">
          <img src="../../assets/img/icon/卫星接收器.svg" alt="" width="80" height="80" />
          <p>内容</p>
        </li>
        <li class="project_item">
          <img src="../../assets/img/icon/土星.svg" alt="" width="80" height="80" />
          <p>内容</p>
        </li>
        <li class="project_item">
          <img src="../../assets/img/icon/流星1.svg" alt="" width="80" height="80" />
          <p>内容</p>
        </li>
        <li class="project_item">
          <img src="../../assets/img/icon/流星2.svg" alt="" width="80" height="80" />
          <p>内容</p>
        </li>
        <li class="project_item">
          <img src="../../assets/img/icon/火箭.svg" alt="" width="80" height="80" />
          <p>内容</p>
        </li>
        <li class="project_item">
          <img src="../../assets/img/icon/地球.svg" alt="" width="80" height="80" />
          <p>内容</p>
        </li>
      </ul>
    </div>
  </div>
  <!-- 工程时间线 -->
  <Timeline />
  <!-- 背景canvas -->
  <iframe id="bgCanv" src="bg.html" frameborder="0"></iframe>
</template>

<script>
import { defineComponent } from 'vue'
import Timeline from '@/components/Timeline'
export default defineComponent({
  name: 'Home',
  components: {
    Timeline
  }
})
</script>

<style lang="stylus" scoped>
.main-container
  box-sizing border-box
  padding-top 50px
.main
  margin 0 auto
  width 800px
  height 430px
  background rgba(255,255,255,.2)
  border-radius 20px
  overflow hidden
  header
    padding-top 50px
    text-align center
    font-size 35px
    font-weight 600
    letter-spacing 1.2rem
    color #eee
  .project_list
    box-sizing border-box
    padding 30px 100px 10px 100px
    height 320px
    display flex
    flex-wrap wrap
    align-content space-around
    .project_item
      width 25%
      text-align center
      p
        color #eee
        font-size 16px
        padding-top 10px
        letter-spacing 1px
#bgCanv
  position absolute
  left 0
  top 0
  z-index -1
</style>
