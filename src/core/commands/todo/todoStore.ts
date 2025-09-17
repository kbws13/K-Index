import { defineStore } from 'pinia'
import TaskType = Todo.TaskType

export const useTodoStore = defineStore('todo', {
  state: () => ({
    taskList: [
      {
        name: '写下你要做的事',
        isFinished: false,
        createTime: new Date(),
      },
      {
        name: '已完成的事项',
        isFinished: true,
        createTime: new Date(),
      },
    ] as TaskType[],
  }),
  getters: {},
  persist: {
    key: 'todo-store',
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
    addTask(task: TaskType) {
      if (!task || !task.name) {
        return false
      }
      task.isFinished = false
      task.createTime = new Date()
      this.taskList.push(task)
      return true
    },
    deleteTask(index: number) {
      if (index < 0 || index >= this.taskList.length) {
        return false
      }
      this.taskList.splice(index, 1)
      return true
    },
    updateTask(index: number, newTask: TaskType) {
      if (index < 0 || index >= this.taskList.length) {
        return false
      }
      this.taskList[index] = { ...this.taskList[index], ...newTask }
    },
  },
})
