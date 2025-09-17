import { CommandType } from './command'
import dateCommand from './commands/dateCommand'
import searchCommand from './commands/search/searchCommand'
import clearCommand from './commands/terminal/clearCommand'
import resetCommand from './commands/terminal/config/resetCommand'
import helpCommand from './commands/terminal/help/helpCommand'
import historyCommand from './commands/terminal/historyCommand'
import infoCommand from './commands/terminal/info/infoCommand'
import shortcutCommand from './commands/terminal/shortcut/shortCommand'
import todoCommand from './commands/todo/todoCommand'

const commandList: CommandType[] = [
  dateCommand,
  shortcutCommand,
  historyCommand,
  clearCommand,
  helpCommand,
  resetCommand,
  infoCommand,
  todoCommand,
  ...searchCommand,
]

const commandMap: Record<string, CommandType> = {}

commandList.forEach((command) => {
  commandMap[command.func] = command
  command.alias?.forEach((name) => {
    commandMap[name] = command
  })
})

export { commandList, commandMap }
