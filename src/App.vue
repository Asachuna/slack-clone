<template>
  <v-app>
    <Header_nologin v-if="!currentUser"/>
    <Footer v-if="!currentUser"/>
    
    <AppHeader v-if="!!currentUser"/>
    <NavigationDrawer v-if="!!currentUser" :currentUser="currentUser" :channels="channels" :users="users"/>
    
    <v-main><router-view :users="users"/></v-main>
  </v-app>
</template>

<script>
import Footer from './components/Home/Footer.vue';
import NavigationDrawer from './components/App/NavigationDrawer.vue';
import Header_nologin from './components/Home/Header_nologin.vue';
import AppHeader from './components/App/AppHeader.vue';
import firebase from "firebase/compat/app";
import'firebase/compat/database';

export default {
  name: 'App',

  data: () => ({
    currentUser: null,
    users: [],
    channels: []
  }),
  
  components: {
    Footer,
    NavigationDrawer,
    Header_nologin,
    AppHeader
  },
  
  created() {
    firebase.auth().onAuthStateChanged((user) =>{
      if(user){
        this.currentUser = user;
      }else{
        this.currentUser = null;
      }
    });
    firebase
      .database()
      .ref("users")
      .on("child_added", snapshot => {
        let user = snapshot.val();
        user.onlineStatus = "offline";
        if (this.$store.state.connections) {
          const connection = this.$store.state.connections.find(
            connection => connection.user_id === user.user_id
          );
          if(connection) {
            user.onlineStatus = "online";
          }
        }
        this.users.push(user);
      });
    firebase
      .database()
      .ref("channel")
      .on("child_added", snapshot => {
        this.channels.push(snapshot.val());
      });
  },
  
  //後始末
  beforeDestroy() {
    firebase
      .database()
      .ref("users")
      .off();
      
    firebase
      .database()
      .ref(".info/connected")
      .off();
  }
  
};
</script>
