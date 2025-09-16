import { CommandType } from '@/core/command'

const clearCommand: CommandType = {
  func: 'clear',
  name: '清屏',
  alias: ['cl'],
  options: [],
  action(options, terminal): void {
    setTimeout(() => {
      terminal.clear()
    }, 100)
  },
}

export default clearCommand
