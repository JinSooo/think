<template>
  <h1>Hello</h1>
  <el-button type="primary">a</el-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mixins } from './store'
export default defineComponent({
  name: 'App',
  mixins: [mixins]
})
</script>

<style></style>
