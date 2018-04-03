<template>
  <div class='tasklist-container'>
    <task :task='task' />
  </div>
</template>
<script>
import Task from './Task'
export default {
  name: 'TaskList',
  components: {
    Task
  },
  data () {
    // parentId | id | subtasks { taskId join table }
    return {
      task: {
        id: 1,
        label: 'First Task',
        description: 'Do the things.',
        done: false,
        subtasks: [
          {
            id: 2,
            parentId: 1,
            label: 'Subtask 1',
            description: 'Do the things.',
            done: false,
            subtasks: [
              {
                id: 3,
                parentId: 2,
                label: 'Sub-subtask 1',
                description: 'Do the things.',
                done: true
              }
            ]
          },
          {
            id: 4,
            parentId: 1,
            label: 'Subtask 2',
            description: 'Do the things.',
            done: false
          }
        ]
      }
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
