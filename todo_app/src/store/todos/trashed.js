import Axios from 'axios'

const state = {
  items: [],
  uri: 'http://localhost:5000/api/trashed/todo',
}

const getters = {}

const mutations = {
  SET(state, payload) {
    state.items = payload
  }
}

const actions = {
  getTrashed({ state, commit }) {
    Axios.get(state.uri)
      .then(response => {
        commit('SET', response.data)
      })
  },

  destroyToDo({ state }, todo) {
    return Axios.delete(`${state.uri}/${todo.id}`, todo)
  },

  restoreToDo({ state }, todo) {
    return Axios.patch(`${state.uri}/${todo.id}`, todo)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
