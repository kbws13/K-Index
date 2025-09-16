<template>
  <k-terminal ref="terminalRef" :user="loginUser" full-screen :on-submit-command="onSubmitCommand" />
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useUserStore } from '../core/commands/user/userStore';
import KTerminal from '../components/k-terminal/KTerminal.vue'
import { doCommandExecute } from '@/core/commandExecutor';

const terminalRef = ref()

const onSubmitCommand = async (inputText: string) => {
  if (!inputText) return
  const terminal = terminalRef.value.terminal
  await doCommandExecute(inputText, terminal)
}

const userStore = useUserStore()
const { loginUser } = storeToRefs(userStore)

onMounted(() => {
  userStore.getAndSetLoginUser()
})
</script>

<style scoped></style>
