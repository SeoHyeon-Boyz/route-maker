import Vue from 'vue'
import Vuex from 'vuex'

const lodash = require('lodash')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    routeStorage: []
  },
  mutations: {
    'ADD_ROUTE' (state, payload) {
      const copy = lodash.cloneDeep(state.routeStorage)
      copy.push(payload)
      state.routeStorage = copy
    }
  },
  actions: {
    addRoute ({ commit }, payload) {
      commit('ADD_ROUTE', payload)
    }
  },
  getters: {
    getRouteStorage: state => state.routeStorage
  },
  modules: {
  }
})
