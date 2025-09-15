import { defineStore } from 'pinia'

export const useTerminalConfigStore = defineStore('terminalConfig', {
  state: () => ({
    background: 'black',
    showHint: true,
    welcomeTexts: [] as string[],
  }),
  getters: {},
  persist: {
    key: 'terminal-config-store',
    storage: window.localStorage,
    serializer: {
      serialize: (state) => {
        console.log('save state:', state)
        return JSON.stringify(state)
      },
      deserialize: (value) => {
        const parsed = JSON.parse(value)
        console.log('load state from localStorage:', parsed)
        return parsed
      },
    },
  },
  actions: {
    setBackground(url: string) {
      if (!url) return
      this.background = url
    },
    setOrToogleShowHint(hint?: string) {
      if (!hint) {
        this.showHint = !this.showHint
        return this.showHint
      }
      if (hint === 'on') {
        this.showHint = true
      } else if (hint === 'off') {
        this.showHint = false
      }
      return this.showHint
    },
    setWelcomeText(welcomeTexts: string[]) {
      this.welcomeTexts = welcomeTexts
    },
    reset() {
      this.$reset()
    },
  },
})
