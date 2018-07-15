export const mutations = {
  addTask (state, task) {
    state.tasks.push(task)
  },
  addSubtask (state, taskId, subtask) {
    state.tasks.push(subtask)
  }
}
