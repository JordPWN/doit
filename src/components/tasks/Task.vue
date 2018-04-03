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
      <task v-for='subtask in task.subtasks' :key='subtask.id' :task='subtask'/>
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
const blankTask = {
  label: 'Made from scratch.',
  done: false,
  parentId: this.task.id
}
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
.task-container {
  display: flex;
  flex-direction: column;
  max-width: 40em;
  border: 1em solid grey;
  padding: 1em;
  .task-content {
    &.shrunk {
      height: 0em;
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
