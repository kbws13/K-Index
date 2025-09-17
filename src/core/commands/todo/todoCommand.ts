import { CommandType } from '@/core/command'
import ComponentOutputType = KTerminal.ComponentOutputType
import addCommand from './subCommands/addCommand'
import { defineAsyncComponent } from 'vue'

const todoCommand: CommandType = {
  func: 'todo',
  name: '待办事项',
  desc: '记录和管理任务',
  params: [
    {
      key: 'subCommand',
      desc: '子命令',
      required: true,
    },
  ],
  options: [],
  subCommands: {
    add: addCommand,
  },
  collapsidle: true,
  action(options, terminal) {
    const { _ } = options
    if (_.length < 1) {
      const output: ComponentOutputType = {
        type: 'component',
        component: defineAsyncComponent(() => import('./TodoBox.vue')),
      }
      terminal.writeResult(output)
      return
    }
  },
}

export default todoCommand
