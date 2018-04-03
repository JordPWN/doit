<template>
  <div id='home'>
    <task-list></task-list>
  </div>
</template>
<script>
import TaskList from './tasks/TaskList'
export default {
  name: 'Home',
  components: {
    TaskList
  }
}
</script>
<style lang='scss' scoped>
#home {
  height: 100%;
  width: 100%;
}
</style>
