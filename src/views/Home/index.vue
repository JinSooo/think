<template>
  <div class="main">
    <header>测试工程</header>
    <ul class="project_list">
      <li class="project_item">
        <a href="javascript:;">
          <img src="../../assets/img/icon/宇航员.svg" alt="" width="80" height="80" />
          <p>内容</p>
        </a>
      </li>
      <li class="project_item">
        <a href="javascript:;">
          <img src="../../assets/img/icon/外星人.svg" alt="" width="80" height="80" />
          <p>内容</p>
        </a>
      </li>
      <li class="project_item">
        <a href="javascript:;">
          <img src="../../assets/img/icon/卫星接收器.svg" alt="" width="80" height="80" />
          <p>内容</p>
        </a>
      </li>
      <li class="project_item">
        <a href="javascript:;">
          <img src="../../assets/img/icon/土星.svg" alt="" width="80" height="80" />
          <p>内容</p>
        </a>
      </li>
      <li class="project_item">
        <a href="javascript:;">
          <img src="../../assets/img/icon/流星1.svg" alt="" width="80" height="80" />
          <p>内容</p>
        </a>
      </li>
      <li class="project_item">
        <a href="javascript:;">
          <img src="../../assets/img/icon/流星2.svg" alt="" width="80" height="80" />
          <p>内容</p>
        </a>
      </li>
      <li class="project_item">
        <a href="javascript:;">
          <img src="../../assets/img/icon/火箭.svg" alt="" width="80" height="80" />
          <p>内容</p>
        </a>
      </li>
      <li class="project_item">
        <a href="javascript:;">
          <img src="../../assets/img/icon/地球.svg" alt="" width="80" height="80" />
          <p>内容</p>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup></script>

<style lang="stylus" scoped>
.main
  margin 0 auto
  margin-top 50px
  width 800px
  height 430px
  background rgba(255,255,255,.2)
  border-radius 20px
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
</style>
