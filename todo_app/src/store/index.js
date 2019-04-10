import Vue from 'vue'
import Vuex from 'vuex'
import todos from './todos'
import trashed from './todos/trashed'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    todos,
    trashed,
  },
  state: {
  },
})

export default store
