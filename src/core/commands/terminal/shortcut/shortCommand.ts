import { CommandType } from '@/core/command'
import ComponentOutputType = KTerminal.ComponentOutputType
import { defineAsyncComponent } from 'vue'

const shortcutCommand: CommandType = {
  func: 'shortcut',
  name: '快捷键',
  desc: '查看快捷键',
  alias: [],
  params: [],
  options: [],
  collapsidle: true,
  action(options, terminal): void {
    const output: ComponentOutputType = {
      type: 'component',
      component: defineAsyncComponent(() => import('./ShortcutBox.vue')),
    }
    terminal.writeResult(output)
  },
}

export default shortcutCommand
