import { ParsedOptions } from 'getopts'
import TerminalType = KTerminal.TerminalType

interface CommandType {
  // unique key
  func: string
  name: string
  desc?: string
  alias?: string[]
  params?: CommandParamsType[]
  options?: CommandOptionsType[]
  subCommands?: Record<string, CommandType>
  action: (options: ParsedOptions, terminal: TerminalType, parentCommand?: CommandType) => void
  collapsidle?: boolean
}

interface CommandParamsType {
  key: string
  desc?: string
  defaultValue?: string | boolean
  required?: boolean
}

interface CommandOptionsType {
  key: string
  alias?: string[]
  desc?: string
  type: 'string' | 'boolean'
  defaultValue?: string | boolean
  required?: boolean
}
