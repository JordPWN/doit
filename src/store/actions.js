export const actions = {
  addTask (context, id, parent = null) {
    const tasks = context.state.tasks
    const val = tasks.find(x => x.id === id)
    console.log('context: ', val)
    context.commit('updateTask', val)
  }
}
