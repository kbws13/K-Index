import type { CommandType } from '../command'

const commandList: CommandType[] = []

const commandMap: Record<string, CommandType> = {}

commandList.forEach((command) => {
  commandMap[command.func] = command
  command.alias?.forEach((name) => {
    commandMap[name] = command
  })
})

export { commandList, commandMap }
