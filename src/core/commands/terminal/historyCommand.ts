import { CommandType } from '@/core/command'

const historyCommand: CommandType = {
  func: 'history',
  name: '查看执行历史',
  alias: ['h'],
  options: [],
  action(options, terminal): void {
    const commandOutputType = terminal.listHistoryCommand()
    commandOutputType.forEach((command, index) => {
      terminal.writeTextResult(`${index + 1} ${command.text}`)
    })
  },
}

export default historyCommand
