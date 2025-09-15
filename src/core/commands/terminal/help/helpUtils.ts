import type { CommandOptionsType, CommandType } from '@/core/command'

export const getUsageStr = (command: CommandType, parentCommand?: CommandType) => {
  if (!command) return ''
  let str = ''
  if (parentCommand) {
    str += parentCommand.func + ' '
  }
  str += command.func
  if (command.params && command.params.length > 0) {
    const paramsStrList: string[] = command.params.map((param) => {
      let word = param.key
      if (param.desc) {
        word = param.desc
      }
      if (param.required) {
        return `<${word}>`
      } else {
        return `[${word}]`
      }
    })
    str += ' ' + paramsStrList.join(' ')
  }
  if (command.options && command.options.length > 0) {
    const optionStrList: string[] = command.options.map((option) => {
      const optionKey = getOptionKey(option)
      if (option.type === 'boolean') {
        let word = optionKey
        if (option.desc) {
          word += ` ${option.desc}`
        }
        if (option.required) {
          return `<${word}>`
        } else {
          return `[${word}]`
        }
      } else {
        let word = option.key
        if (option.desc) {
          word = option.desc
        }
        if (option.required) {
          return `<${optionKey} ${word}>`
        } else {
          return `[${optionKey} ${word}]`
        }
      }
    })
    str += ' ' + optionStrList.join(' ')
  }
  return str
}

export const getOptionKey = (option: CommandOptionsType) => {
  // 优先用简写
  if (option.alias && option.alias.length > 0) {
    return '-' + option.alias[0]
  }
  return '--' + option.key
}
