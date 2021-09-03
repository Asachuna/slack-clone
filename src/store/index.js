import Vue from 'vue';
import Vuex from 'vuex';
import firebase from "firebase/compat/app";
import'firebase/compat/database';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isSideMenuOpen: true,
    currentUser: "",
    currentUserName: "",
    currentChannel: null,
    channelState: null
  },
  mutations: {
    
    toggleSideMenu(state) {
      state.isSideMenuOpen = !state.isSideMenuOpen;
    },
    
    setUser(state, user) {
      state.currentUser = user;
      
      if(user) {
        firebase
          .database()
          .ref(`users/${user.uid}`)
          .child("name")
          .on("value", snapshot => {
            state.currentUserName = snapshot.val();
          });
      } else {
        state.currentUserName = "";
      }
    },
    
    setChannel(state, val) {
      state.currentChannel = val;
      state.channelState = val.state;
    },
    
  },
  actions: {
    toggleSideMenu({ commit }) {
      commit('toggleSideMenu');
    },
    setUser({ commit }, user) {
      commit('setUser', user);
    },
    setChannel({ commit }, channel) {
      commit('setChannel', channel);
    },
  },
  modules: {
  }
});
