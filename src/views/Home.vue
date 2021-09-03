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


export default {
  
  name: 'Home',
  
  components: {
    ChatArea,
    ChatForm
  },
  
  mounted() {
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
          connectionRef.set({
            user_id: this.$store.state.currentUser.uid,
            key: connectionRef.key
          });
        }
      });
  }
};
</script>
