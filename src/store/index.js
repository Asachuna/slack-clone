import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isSideMenuOpen: false
  },
  mutations: {
    toggleSideMenu(state) {
      state.isSideMenuOpen = !state.isSideMenuOpen;
    },
  },
  actions: {
    toggleSideMenu({ commit }) {
      commit('toggleSideMenu');
    },
  },
  modules: {
  }
})
