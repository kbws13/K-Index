import { defineStore } from 'pinia'
import { LOCAL_USER } from './userConstant'
import './type'

export const useUserStore = defineStore('user', {
  state: () => ({ loginUser: { ...LOCAL_USER } }),
  getters: {},
  persist: {
    key: 'user-store',
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
    async getAndSetLoginUser() {},
    setLoginUser(user: User.UserType) {
      this.loginUser = user
    },
  },
})
