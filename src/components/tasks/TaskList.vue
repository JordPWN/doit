<template>
  <div class='tasklist-container'>
    <task :task='task[0]' />
  </div>
</template>
<script>
import get from 'lodash/fp/get'

import Task from './Task'

export default {
  name: 'TaskList',
  components: {
    Task
  },
  computed: {
    task () {
      return get('tasks')(this.$store.state)
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
