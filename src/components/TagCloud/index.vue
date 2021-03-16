<template>
  <ul class="cloud" role="navigation" aria-label="Webdev tag cloud">
    <li><a href="javascript:;">HTTP</a></li>
    <li><a href="javascript:;">Ember</a></li>
    <li><a href="javascript:;">Sass</a></li>
    <li><a href="javascript:;">HTML</a></li>
    <li><a href="javascript:;">FlexBox</a></li>
    <li><a href="javascript:;">API</a></li>
    <li><a href="javascript:;">VueJS</a></li>
    <li><a href="javascript:;">Grid</a></li>
    <li><a href="javascript:;">Rest</a></li>
    <li><a href="javascript:;">JavaScript</a></li>
    <li><a href="javascript:;">Animation</a></li>
    <li><a href="javascript:;">React</a></li>
    <li><a href="javascript:;">CSS</a></li>
    <li><a href="javascript:;">Cache</a></li>
    <li><a href="javascript:;">Less</a></li>
  </ul>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
export default defineComponent({
  name: 'TagCloud',
  setup() {
    onMounted(() => {
      const aList = [...document.querySelectorAll('.cloud li a')]

      // 遍历设置权重
      aList.forEach(a => {
        const ran = Math.random() * 10
        a.style.fontSize = ran * 0.25 + 0.5 + 'rem'
        a.style.opacity = ran * 0.15
      })
    })
  }
})
</script>

<style lang="stylus" scoped>
.cloud
  list-style none
  width 100%
  height 100%

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content center
  line-height: 2.5rem;
  li a
    position: relative;
    font-size: 1.5rem;
    padding: 0.125rem 0.25rem;
    color: #409eff;
.cloud li:nth-child(2n + 1) a
  color: #67c23a;
.cloud li:nth-child(3n + 1) a
  color: #e6a23c;
.cloud li:nth-child(4n + 1) a
  color: #f56c6c;
.cloud li a:hover
  font-weight: 700;
</style>
