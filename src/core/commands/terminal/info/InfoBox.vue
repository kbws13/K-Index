<template>
  <div>关于本站: K-Index</div>
  <div>
    <a href="https://github.com/kbws13/K-Index" target="_blank">欢迎 star</a>
  </div>
  <div></div>
  <div>
    作者:
    <a href="https://github.com/kbws13" target="_blank">空白无上</a>
  </div>
</template>

<script lang="ts" setup>
interface InfoBoxProps {
  seconds: string
}

const props = withDefaults(defineProps<InfoBoxProps>(), {})
</script>

<style scoped></style>
