<template>
  <div class='task-container'>
    <div class='task-status' :class='{done: task.done }'>
      <span class='back-icon' :class='{ active: task.parentId ? true: false }' />
      <h1 class='title' @click='toggleShow'>{{ task.label }}</h1>
      <span class='complete-status' :class='{done: task.done}' @click='toggleDone'/>
    </div>
    <div class='task-content' :class='{shrunk: shrunk}'>
      <p>
        {{ task.description }}
      </p>
      <task v-if='subtasks' v-for='subtask in subtasks' :key='subtask.id' :task='subtask'/>
      <div class='task-controls'>
        <div class='add-subtask' @click='addSubtask'>
          ⨁ Add Subtask
        </div>
        <div class='delete-subtask'>
          Delete
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import get from 'lodash/fp/get'
// const blankTask = {
//   label: 'Made from scratch.',
//   done: false,
//   parentId: this.task.id
// }
export default {
  name: 'Task',
  props: ['task'],
  methods: {
    addSubtask () {
      this.subtask.push()
    },
    toggleDone () {
      this.task.done = !this.task.done
    },
    toggleShow () {
      this.shrunk = !this.shrunk
    },
    findTaskById (taskId) {
      return get('tasks')(this.$store.state).find(task => taskId === task.id)
    },
    filterTasks (tasks) {
      const results = []
      tasks.filter(task => {
        const found = this.findTaskById(task)
        console.log('found: ', found)
        if (found) results.push(found)
      })
      return results
    }
  },
  computed: {
    subtasks () {
      if (this.task.subtasks) return this.filterTasks(this.task.subtasks)
    }
  },
  data () {
    return {
      shrunk: true
    }
  }
}
</script>
<style lang='scss' scoped>
@keyframes anim {
  0% {
    display: none;
  }
  1% {
    display: flex;
    transform: scaleY(0);
  }
  100% {
    transform: scaleY(1);
  }
}
.task-container {
  display: flex;
  flex-direction: column;
  max-width: 40em;
  border: 1em solid grey;
  padding: 1em;
  .task-content {
    max-height: 100%;
    animation: anim .1s ease-in-out;
    &.shrunk {
      display: none;
      max-height: 0em;
      overflow: hidden;
    }
  }
  .task-status {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    background-color: tomato;
    margin: -1em;
    margin-bottom: 0;
    &.done {
      background-color: chartreuse;
    }
  }
  .back-icon.active:after {
    font-size: 2em;
    content: '⤺';
  }
  .complete-status {
    font-size: 2em;
    cursor: pointer;
    &:after {
      content: '☒';
    }
    &.done:after {
      content: '☑';
    }
  }
  .add-subtask, .delete-subtask {
    cursor: pointer;
    &:hover {
      color: lightblue;
    }
  }
}
</style>
