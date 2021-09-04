<template>
  <div style="height: 100%;">
    <ChatArea v-if="!!$store.state.channelState"/>
    
    <div style="position: sticky; bottom: 0px;">
      <ChatForm v-if="!!$store.state.channelState"/>
    </div>
  </div>
</template>

<script>
import ChatArea from "../components/App/ChatArea.vue";
import ChatForm from '../components/App/ChatForm.vue';
import "firebase/compat/auth";
import firebase from "firebase/compat/app";
import'firebase/compat/database';
import store from '../store';


export default {
  
  name: 'Home',
  
  props: {
    users: Array
  },
  
  components: {
    ChatArea,
    ChatForm
  },
  
  created() {
    
    //現在ログイン中のユーザーIDを保存
    firebase
      .database()
      .ref(".info/connected")
      .on("value", snapshot => {
        if (snapshot.val() === true) {
          let connectionRef = firebase
            .database()
            .ref("connections")
            .push();
          connectionRef.onDisconnect().remove();
          store.dispatch('setConnectionId', connectionRef.key);
          connectionRef.set({
            user_id: this.$store.state.currentUser.uid,
            key: connectionRef.key
          });
        }
      });

    //ユーザーのログイン/ログアウトを監視
    let connections = [];
    
    firebase
      .database()
      .ref("connections")
      .on("child_added", snapshot => {
        const new_connection = snapshot.val();
        connections.push(new_connection);
        if (this.users) {
          const user = this.users.find(
            user => user.user_id === new_connection.user_id
          );
          if(user) {
            user.onlineStatus = "online";
          }
        }
      });
    firebase
      .database()
      .ref("connections")
      .on("child_removed", snapshot => {
        const remove_connection = snapshot.val();
        connections = connections.filter(
          connection => connection.key !== remove_connection.key
        );

        if (this.users) {
          const user = this.users.find(
            user => user.user_id === remove_connection.user_id
          );
          if(user) {
            console.log("child removed");
            user.onlineStatus = "offline";
          }
        }
      });
    store.dispatch('setConnections', connections);
  },
  
  beforeDestroy() {
    firebase
      .database()
      .ref(".info/connected")
      .off();
      
    firebase
      .database()
      .ref("connections")
      .off();
  }
};
</script>
