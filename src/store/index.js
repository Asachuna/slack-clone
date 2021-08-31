import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isSideMenuOpen: true,
    currentUser: ""
  },
  mutations: {
    toggleSideMenu(state) {
      state.isSideMenuOpen = !state.isSideMenuOpen;
    },
    setUser(state, val) {
      state.currentUser = val;
    },
  },
  actions: {
    toggleSideMenu({ commit }) {
      commit('toggleSideMenu');
    },
    setUser({ commit }, user) {
      commit('setUser', user);
    },
  },
  modules: {
  }
})
