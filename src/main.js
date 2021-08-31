import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import firebase from "firebase/compat/app";

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyCwp3znCyuApabog8NG8TTCsyPB1kUd6JU",
  authDomain: "vue-slack-clone-69b96.firebaseapp.com",
  databaseURL: "https://vue-slack-clone-69b96-default-rtdb.firebaseio.com",
  projectId: "vue-slack-clone-69b96",
  storageBucket: "vue-slack-clone-69b96.appspot.com",
  messagingSenderId: "1089182449860",
  appId: "1:1089182449860:web:70206252572d80dc510991",
  measurementId: "G-DDN5B3J6C1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged((user) =>{
  if(user){
    store.dispatch('setUser', user);
  }else{
    store.dispatch('setUser', null);
  }
});

window.firebase = firebase;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
