import getopts, { ParsedOptions } from 'getopts'
import TerminalType = KTerminal.TerminalType
import { CommandOptionsType, CommandType } from './command'
import helpCommand from './commands/terminal/help/helpCommand'
import { commandMap } from './commandRegister'

export const doCommandExecute = async (
  text: string,
  terminal: TerminalType,
  parentCommand?: CommandType,
) => {
  text = text.trim()
  if (!text) {
    return
  }
  const command: CommandType = getCommand(text, parentCommand)
  if (!command) {
    terminal.writeTextErrorResult('找不到命令')
    return
  }
  const parsedOptions = doParse(text, command.options!)
  const { _ } = parsedOptions
  if (_.length > 0 && command.subCommands && Object.keys(command.subCommands).length > 0) {
    const subText = text.substring(text.indexOf(' ') + 1)
    await doCommandExecute(subText, terminal, command)
    return
  }
  await doAction(command, parsedOptions, terminal, parentCommand)
}

const getCommand = (text: string, parentCommand?: CommandType): CommandType => {
  let func = text.split(' ', 1)[0]
  func = func.toLowerCase()
  let commands = commandMap
  if (
    parentCommand &&
    parentCommand.subCommands &&
    Object.keys(parentCommand.subCommands).length > 0
  ) {
    commands = parentCommand.subCommands
  }
  const command = commands[func]
  console.log('getCommand: ', command)
  return command
}

const doParse = (text: string, commandOptions: CommandOptionsType[]): getopts.ParsedOptions => {
  const args: string[] = text.split(' ').slice(1)
  const options: getopts.Options = {
    alias: {},
    default: {},
    string: [],
    boolean: [],
  }
  commandOptions.forEach((commandOption) => {
    const { alias, key, type, defaultValue } = commandOption
    if (alias && options.alias) {
      options.alias[key] = alias
    }
    options[type]?.push(key)
    if (defaultValue && options.default) {
      options.default[key] = defaultValue
    }
  })
  const parsedOptions = getopts(args, options)
  console.log('parsedOptions: ', parsedOptions)
  return parsedOptions
}

const doAction = async (
  command: CommandType,
  options: ParsedOptions,
  terminal: TerminalType,
  parentCommand?: CommandType,
) => {
  const { help } = options
  if (command.collapsidle || help) {
    terminal.setCommandCollapsible(true)
  }
  if (help) {
    const newOptions = { ...options, _: [command.func] }
    helpCommand.action(newOptions, terminal, parentCommand)
    return
  }
  await command.action(options, terminal)
}
