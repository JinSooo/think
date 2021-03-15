<template>
  <ul class="cloud" role="navigation" aria-label="Webdev tag cloud">
    <li><a data-weight="4" href="javascript:;">HTTP</a></li>
    <li><a data-weight="2" href="javascript:;">Ember</a></li>
    <li><a data-weight="5" href="javascript:;">Sass</a></li>
    <li><a data-weight="8" href="javascript:;">HTML</a></li>
    <li><a data-weight="6" href="javascript:;">FlexBox</a></li>
    <li><a data-weight="4" href="javascript:;">API</a></li>
    <li><a data-weight="5" href="javascript:;">VueJS</a></li>
    <li><a data-weight="6" href="javascript:;">Grid</a></li>
    <li><a data-weight="3" href="javascript:;">Rest</a></li>
    <li><a data-weight="9" href="javascript:;">JavaScript</a></li>
    <li><a data-weight="3" href="javascript:;">Animation</a></li>
    <li><a data-weight="7" href="javascript:;">React</a></li>
    <li><a data-weight="8" href="javascript:;">CSS</a></li>
    <li><a data-weight="1" href="javascript:;">Cache</a></li>
    <li><a data-weight="3" href="javascript:;">Less</a></li>
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
        a.style.fontSize = a.getAttribute('data-weight') * 0.25 + 0.5 + 'rem'
        a.style.opacity = a.getAttribute('data-weight') * 0.1
      })
    })
  }
})
</script>

<style lang="stylus" scoped>
.cloud
  margin: 100px 60px;
  list-style: none;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
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
