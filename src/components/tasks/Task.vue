<template>
  <div class='task-container' :style='borderColor'>
    <div class='task-status' :class='{done: task.done }' :style='backgroundColor()'>
      <span class='back-icon' :class='{ active: task.parentId ? true : false }' />
      <h1 class='title' @click='toggleShow'>{{ task.label }}</h1>
      <span class='complete-status' :class='{done: task.done}' @click='toggleDone'/>
    </div>
    <div class='task-content' :class='{shrunk: shrunk}' :style='backgroundColor("light")'>
      <p>
        {{ task.description }}
      </p>
      <div class='task-controls'>
        <div class='add-subtask' @click='addSubtask'>
          ⨁ Add Subtask
        </div>
        <div class='delete-subtask'>
          Delete
        </div>
      </div>
      <task v-if='subtasks' v-for='subtask in subtasks' :key='subtask.id' :task='subtask'/>
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
      // const subtask = {
      //   description: '',
      //   done: false,
      //   label: '',
      //   parentId: this.task.id
      // }
      console.log('addedTask')
      this.$store.dispatch('addTask', 99, this.task.id)
    },
    toggleDone () {
      this.task.done = !this.task.done
    },
    toggleShow () {
      this.shrunk = !this.shrunk
    },
    findSubtasks () {
      const subtasks = []
      this.task.subtasks.filter(task => {
        subtasks.push(get('tasks')(this.$store.state)[task])
      })
      return subtasks
    },
    LightenDarkenColor (col, amt) {
      let usePound = false
      if (col[0] === '#') {
        col = col.slice(1)
        usePound = true
      }
      let num = parseInt(col, 16)
      let r = (num >> 16) + amt

      if (r > 255) r = 255
      else if (r < 0) r = 0

      let b = ((num >> 8) & 0x00FF) + amt

      if (b > 255) b = 255
      else if (b < 0) b = 0

      var g = (num & 0x0000FF) + amt

      if (g > 255) g = 255
      else if (g < 0) g = 0

      return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16)
    },
    backgroundColor (color = null) {
      let bgColor = this.gradientColor
      if (color === 'light') bgColor = this.LightenDarkenColor(bgColor, +150)
      if (color === 'dark') bgColor = this.LightenDarkenColor(bgColor, -100)

      console.log(bgColor, 'bgColor')

      return { backgroundColor: bgColor }
    }
  },
  computed: {
    gradientColor () {
      return this.gradient[this.task.id * 2]
    },
    borderColor () {
      return { border: '1em solid ' + this.gradientColor }
    },
    subtasks () {
      if (this.task.subtasks) return this.findSubtasks()
    }
  },
  data () {
    return {
      shrunk: true,
      gradient: ['#00E552', '#00E10E', '#34DD00', '#74D900', '#B2D500', '#D2B500', '#CE7400', '#CA3500', '#C60006', '#C20041', '#BF0079']
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
  box-sizing: border-box;
  .task-content {
    max-height: 100%;
    animation: anim .1s ease-in-out;
    &.shrunk {
      display: none;
      max-height: 0em;
      overflow: hidden;
    }
  }
  .task-controls {
    padding-bottom: 1em;
  }
  .task-status {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    margin: -1em;
    margin-bottom: 0;
    &.done {
      // background-color: chartreuse;
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
