import Axios from "axios";

const state = {
  items: [],
  uri: 'http://localhost:5000/api/todo',
}

const getters = {}

const mutations = {
  SET(state, payload) {
    state.items = payload
  },
}

const actions = {
  getToDos({ state, commit }) {
    Axios.get(state.uri)
      .then(response => {
        commit('SET', response.data)
      })
  },

  getToDo({ state }, id) {
    return Axios.get(`${state.uri}/${id}`)
      .then(response => {
        return response.data
      })
  },

  createToDo({ state }, todo) {
    return Axios.post(state.uri, todo)
  },

  updateToDo({state}, todo) {
    return Axios.put(`${state.uri}/${todo.id}`, todo)
  },

  deleteToDo({state}, todo) {
    return Axios.delete(`${state.uri}/${todo.id}`)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
