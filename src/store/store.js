import Vue from 'vue'
import Vuex from 'vuex'

import { actions } from './actions'
import { getters } from './getters'
import { mutations } from './mutations'

Vue.use(Vuex)

const defaultState = {
  tasks: {
    1: {
      id: 1,
      label: 'First Task',
      description: 'Do the things.',
      done: false,
      subtasks: [2, 4]
    },
    2: {
      id: 2,
      parentId: 1,
      label: 'Subtask 1',
      description: 'Do the things.',
      done: false,
      subtasks: [3]
    },
    3: {
      id: 3,
      parentId: 2,
      label: 'Sub-subtask 1',
      description: 'Do the things.',
      done: true
    },
    4: {
      id: 4,
      parentId: 1,
      label: 'Subtask 2',
      description: 'Do the things.',
      done: false
    }
  }
}

const state = { ...defaultState }

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
