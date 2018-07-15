<template>
  <div class='tasklist-container'>
    <task :task='task' />
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
      return get('tasks')(this.$store.state)[1]
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
