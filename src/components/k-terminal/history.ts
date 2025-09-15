import { ref, type Ref } from 'vue'

const useHistory = (
  commandList: KTerminal.CommandOutputType[],
  inputCommand: Ref<KTerminal.CommandInputType>,
) => {
  const commandHistoryPos = ref(commandList.length)

  const listHistoryCommand = () => {
    return commandList
  }

  const showNextCommand = () => {
    console.log(commandHistoryPos.value, commandList, inputCommand)
    if (commandHistoryPos.value < commandList.length - 1) {
      commandHistoryPos.value += 1
      inputCommand.value.text = commandList[commandHistoryPos.value].text
    } else if (commandHistoryPos.value === commandList.length - 1) {
      commandHistoryPos.value += 1
      inputCommand.value.text = ''
    }
  }

  const showPrevCommand = () => {
    if (commandHistoryPos.value >= 1) {
      commandHistoryPos.value -= 1
      inputCommand.value.text = commandList[commandHistoryPos.value].text
    }
  }

  return {
    commandHistoryPos,
    listHistoryCommand,
    showNextCommand,
    showPrevCommand,
  }
}

export default useHistory
