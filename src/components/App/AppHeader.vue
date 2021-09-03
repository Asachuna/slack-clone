<template>
    <v-app-bar color="white" light app clipped elevation="3" dense>
      <v-avatar 
        size="32" 
        class="me-2" 
        v-if="$store.state.channelState === 'DirectMail'"
      >
        <v-img
          :src="getAvatar($store.state.currentChannel.email)"
          alt="avatar"
        ></v-img>
      </v-avatar>
      <span class="title" v-if="$store.state.channelState">{{$store.state.currentChannel.name}}</span>
      <span class="title" v-else>チャンネルを選択</span>
      <v-spacer></v-spacer>
      <v-btn @click="signOut" color="indigo" dark>サインアウト</v-btn>
    </v-app-bar>
</template>

<script>
import firebase from "firebase/compat/app";
import'firebase/compat/database';

export default {
  
  methods: {
    signOut() {
      firebase.auth().signOut();
      
      firebase
        .database()
        .ref("connections")
        .remove();
      this.$router.push("/signin");
  
    },
    getAvatar(email) {
      return `https://i.pravatar.cc/150?u=${email}`;
    }
  }
};
</script>