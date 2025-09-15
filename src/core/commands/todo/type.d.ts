declare namespace Todo {
  interface TaskType {
    name: string
    isFinished: boolean
    createTime: date
    finishTime?: date
  }
}
