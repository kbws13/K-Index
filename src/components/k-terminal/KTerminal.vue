<template>
  <div class="k-terminal-wrapper" :style="wrapperStyle" @click="handleClickWrapper">
    <div ref="terminalRef" class="k-terminal">
      <a-collapse :bordered="false" expand-icon-position="right" v-model:activeKey="activeKeys">
        <template v-for="(output, index) in outputList" :key="index">
          <a-collapse-panel v-if="output.collapsible" :key="index" class="terminal-row">
            <template #header>
              <span style="user-select: none; margin-right: 10px;">
                {{ prompt }}
              </span>
              <span>{{ output.text }}</span>
            </template>
            <div v-for="(result, idx) in output.resultList" :key="idx" class="terminal-row">
              <content-output :output="result" />
            </div>
          </a-collapse-panel>
          <template v-else>
            <template v-if="output.type === 'command'">
              <div class="terminal-row">
                <span style="user-select: none; margin-right: 10px;">
                  {{ prompt }}
                </span>
                <span>{{ output.text }}</span>
              </div>
              <div v-for="(result, idx) in output?.resultList" :key="idx" class="terminal-row">
                <content-output :output="result" />
              </div>
            </template>
            <template v-else>
              <div class="terminal-row">
                <content-output :output="output" />
              </div>
            </template>
          </template>
        </template>
      </a-collapse>
      <div class="terminal-row">
        <a-input ref="commandInputRef" v-model:value="inputCommand.text" :disable="isRunning" class="command-input"
          :placeholder="inputCommand.placeholder" :bordered="false" autofocus @press-enter="doSubmitCommand">
          <template #addonBefore>
            <span class="command-input-prompt">{{ prompt }}</span>
          </template>
        </a-input>
      </div>
      <div v-if="hint && !isRunning" class="terminal-row" style="color: #bbb;">
        hint: {{ hint }}
      </div>
      <div style="margin-bottom: 16px;"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ContentOutput from "./ContentOutput.vue"
import { computed, onMounted, ref, toRefs, watchEffect } from "vue"
import useHint from "./hint"
import useHistory from "./history"
import { registerShortcuts } from "./shortcuts"
import { LOCAL_USER } from "../../core/commands/user/userConstant"
import { useTerminalConfigStore } from "../../core/commands/terminal/config/terminalConfigStore"
interface KTerminalProps {
  height?: string | number
  fullScreen?: boolean
  user?: User.UserType
  onSubmitCommand?: (inputText: string) => void
}

const props = withDefaults(defineProps<KTerminalProps>(), {
  height: '400px',
  fullScreen: false,
  user: LOCAL_USER as any,
})

const { user } = toRefs(props)

const terminalRef = ref()
const activeKeys = ref<number[]>([])
const outputList = ref<KTerminal.OutputType[]>([]);
const commandList = ref<KTerminal.CommandOutputType[]>([]);
const commandInputRef = ref()

const { hint, setHint, debounceSetHint } = useHint();

const isRunning = ref(false)

const configStore = useTerminalConfigStore()

const initCommand: KTerminal.CommandInputType = {
  text: "",
  placeholder: ""
}

const inputCommand = ref<KTerminal.CommandInputType>({ ...initCommand })

let currentNewCommand: KTerminal.CommandOutputType;
const prompt = computed(() => {
  return `[${user.value.username}]`
})

const { commandHistoryPos, showPrevCommand, showNextCommand, listHistoryCommand } = useHistory(commandList.value, inputCommand)

const mainStyle = computed(() => {
  const fullStyleStyle = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    background: 'black',
  }

  return props.fullScreen ? fullStyleStyle : { height: props.height }
})

const wrapperStyle = computed(() => {
  const { background } = configStore;
  const style: Record<string, any> = {
    ...mainStyle.value
  }

  if (background.startsWith('http')) {
    style.background = `url(${background})`
  } else {
    style.background = background
  }
  return style
})

function handleClickWrapper(event: Event) {
  // @ts-expect-error TS2339
  if (event.target.name === 'k-terminal') {
    focusInput()
  }
}

const doSubmitCommand = async () => {
  isRunning.value = true
  setHint('')
  let inputText = inputCommand.value.text
  if (inputText.startsWith('!')) { }
  const commandIndex = Number(inputText.substring(1))
  const command = commandList.value[commandIndex - 1]
  if (command) {
    inputText = command.text
  }
  const newCommand: KTerminal.CommandOutputType = {
    text: inputText,
    type: 'command',
    resultList: []
  }
  currentNewCommand = newCommand
  await props.onSubmitCommand?.(inputText)
  outputList.value.push(newCommand)
  if (inputText) {
    commandList.value.push(newCommand)
    commandHistoryPos.value = commandList.value.length
  }
  inputCommand.value = { ...initCommand }
  activeKeys.value.push(outputList.value.length - 1)
  setTimeout(() => {
    terminalRef.value.scrollTop = terminalRef.value.scrollHeight
  }, 50)
  isRunning.value = false
}

watchEffect(() => {
  debounceSetHint(inputCommand.value.text)
})

const clear = () => {
  outputList.value = [];
};

const writeTextResult = (text: string, status?: KTerminal.OutputStatusType) => {
  const newOutput: KTerminal.TextOutputType = {
    text,
    type: "text",
    status,
  };
  currentNewCommand.resultList.push(newOutput);
};

const writeTextErrorResult = (text: string) => {
  writeTextResult(text, "error");
};

const writeTextSuccessResult = (text: string) => {
  writeTextResult(text, "success");
};

const writeResult = (output: KTerminal.OutputType) => {
  currentNewCommand.resultList.push(output);
};


const writeTextOutput = (text: string, status?: KTerminal.OutputStatusType) => {
  const newOutput: KTerminal.OutputType = {
    text,
    type: "text",
    status,
    resultList: []
  };
  outputList.value.push(newOutput);
};

const setCommandCollapsible = (collapsible: boolean) => {
  currentNewCommand.collapsible = collapsible;
};

const writeOutput = (newOutput: KTerminal.OutputType) => {
  outputList.value.push(newOutput);
};

const focusInput = () => {
  commandInputRef.value.focus();
};

const isInputFocused = () => {
  return (
    (commandInputRef.value.input as HTMLInputElement) == document.activeElement
  );
};

const setTabCompletion = () => {
  if (hint.value) {
    inputCommand.value.text = `${hint.value.split(" ")[0]}${hint.value.split(" ").length > 1 ? " " : ""
      }`;
  }
};

const toggleAllCollapse = () => {
  // 展开
  if (activeKeys.value.length === 0) {
    activeKeys.value = outputList.value.map((_, index) => {
      return index;
    });
  } else {
    // 折叠
    activeKeys.value = [];
  }
};

const terminal: KTerminal.TerminalType = {
  writeTextResult,
  writeTextErrorResult,
  writeTextSuccessResult,
  writeResult,
  writeTextOutput,
  writeOutput,
  clear,
  focusInput,
  isInputFocused,
  setTabCompletion,
  doSubmitCommand,
  showNextCommand,
  showPrevCommand,
  listHistoryCommand,
  toggleAllCollapse,
  setCommandCollapsible,
};

onMounted(() => {
  registerShortcuts(terminal)
  const { welcomeTexts } = configStore
  if (welcomeTexts.length > 0) {
    welcomeTexts.forEach((welcomeText) => {
      terminal.writeTextOutput(welcomeText)
    })
  } else {
    terminal.writeTextOutput(
      `Welcome to KTerminal! Type 'help' to get started.` +
      `<a href="//github.com/kbws13/K-Index" target="_blank"">GitHub Open Source</a>`
    )
    terminal.writeTextOutput(
      `Author: <a href="//github.com/kbws13" target="_blank"">kbws13</a>` +
      `: please input 'help' to get started.`
    )
  }
})


defineExpose({
  terminal,
});
</script>

<style scoped>
.k-terminal-wrapper {
  background: black;
}

.k-terminal {
  background: rgba(0, 0, 0, 0.6);
  padding: 20px;
  overflow: scroll;
}

.k-terminal::-webkit-scrollbar {
  display: none;
}

.k-terminal span {
  font-size: 16px;
}

.k-terminal:deep(.ant-collapse-icon-position-right > .ant-collapse-item > .ant-collapse.header) {
  color: white;
  padding: 0;
}

.k-terminal:deep(.ant-collapse) {
  background: none;
}

.yu-terminal :deep(.ant-collapse-borderless > .ant-collapse-item) {
  border: none;
}

.yu-terminal :deep(.ant-collapse-content > .ant-collapse-content-box) {
  padding: 0;
}

.command-input {
  caret-color: white;
}

.command-input :deep(input) {
  color: white !important;
  font-size: 16px;
  padding: 0 10px;
}

.command-input :deep(.ant-input-group-addon) {
  background: none;
  border: none;
  padding: 0;
}

.command-input-prompt {
  color: white;
  background: transparent;
  font-family: courier-new, courier, monospace;
}

.terminal-row {
  color: white;
  font-size: 16px;
  font-family: courier-new, courier, monospace;
}
</style>
