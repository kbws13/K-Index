import { CommandType } from './command'
import dateCommand from './commands/dateCommand'
import clearCommand from './commands/terminal/clearCommand'
import historyCommand from './commands/terminal/historyCommand'
import shortcutCommand from './commands/terminal/shortcut/shortCommand'

const commandList: CommandType[] = [dateCommand, shortcutCommand, historyCommand, clearCommand]

const commandMap: Record<string, CommandType> = {}

commandList.forEach((command) => {
  commandMap[command.func] = command
  command.alias?.forEach((name) => {
    commandMap[name] = command
  })
})

export { commandList, commandMap }
