import { CommandType } from '@/core/command'
import { useTerminalConfigStore } from './terminalConfigStore'

const resetCommand: CommandType = {
  func: 'reset',
  name: '重置终端配置',
  alias: [],
  options: [],
  action(options, terminal) {
    const { reset } = useTerminalConfigStore()
    reset()
    terminal.writeTextSuccessResult('已重置终端配置')
  },
}

export default resetCommand
