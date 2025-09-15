import type { CommandType } from '@/core/command'
import { useTerminalConfigStore } from './terminalConfigStore'

const welcomeCommand: CommandType = {
  func: 'welcome',
  name: '自定义终端欢迎语',
  alias: [],
  params: [
    {
      key: 'texts',
      desc: '终端提示文本（支持多个值，不填则无欢迎语）',
      required: false,
    },
  ],
  options: [],
  async action(options) {
    const { _ } = options
    const welcomeTexts = _
    const { setWelcomeText } = useTerminalConfigStore()
    setWelcomeText(welcomeTexts)
  },
}

export default welcomeCommand
