import { useTerminalConfigStore } from '@/core/commands/terminal/config/terminalConfigStore'
import { ref } from 'vue'
import _, { trim } from 'lodash'
import { getUsageStr } from '@/core/commands/terminal/help/helpUtils'
import { commandMap } from '@/core/commandRegister'

const useHint = () => {
  const hint = ref('')
  const { showHint } = useTerminalConfigStore()

  const setHint = (inputText: string) => {
    if (!showHint) return
    if (!inputText) {
      hint.value = ''
      return
    }
    const args = trim(inputText).split(' ')
    const func = args[0].toLowerCase()
    const likeKey = Object.keys(commandMap).filter((key) => key.startsWith(func))[0]
    const command = commandMap[likeKey]
    if (!command) {
      hint.value = ''
      return
    }
    if (command.subCommands && Object.keys(command.subCommands).length > 0 && args.length > 1) {
      hint.value = getUsageStr(command.subCommands[args[1]], command)
    } else {
      hint.value = getUsageStr(command)
    }
  }

  const debounceSetHint = _.debounce(function (inputText: string) {
    debounceSetHint(inputText)
  }, 500)

  return {
    hint,
    setHint,
    debounceSetHint,
  }
}

export default useHint
