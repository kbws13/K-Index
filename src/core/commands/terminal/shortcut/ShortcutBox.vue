<template>
  <div>
    <div>快捷键:</div>
    <div v-for="(shortcut, index) in shortcutList" :key="index">
      <a-row v-if="shortcut.desc" :gutter="16">
        <a-col :span="4">{{ shortcut.keyDesc ?? shortcut.code }}</a-col>
        <a-col :span="4">{{ shortcut.desc }}</a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { shortcutList } from '@/components/k-terminal/shortcuts';
import { onMounted } from 'vue';

onMounted(() => { })

</script>

<style></style>
