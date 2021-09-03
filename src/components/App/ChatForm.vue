<template>
  <v-sheet>
    <v-divider></v-divider>
    <v-form @submit.prevent="sendMessage">
      <v-row class="mx-4 mb-1">
        <v-col cols="12" class="mt-2">
          <v-textarea
            solo
            dense
            autofocus
            color="indigo"
            label="メッセージを入力"
            v-model="message"
          >
            
          </v-textarea>
          <v-btn 
            color="indigo" 
            class="white--text" 
            type="submit"
            :disabled="!this.message"
          >
            送信
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-sheet>
</template>

<script>
import firebase from "firebase/compat/app";
import'firebase/compat/database';

export default {
  name: 'ChatForm',

  data: () => ({
    message: null,
  }),
  
  methods: {
    sendMessage() {
      
      if (!this.message) { return; }
      
      const newMessage = firebase
        .database()
        .ref("messages")
        .child(this.channel_id)
        .push();
      
      const key_id = newMessage.key;
      
      const time_now = new Date();
      const time_now_str = `${time_now.getFullYear()}/${time_now.getMonth()}/${time_now.getDate()} ${time_now.getHours()}:${time_now.getMinutes()}`;
      
      newMessage.set({
        key: key_id,
        content: this.message,
        user: this.$store.state.currentUser.email,
        name: this.$store.state.currentUserName,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        postTime: time_now_str
      });
      
      this.message = "";
      
    },
  },
  
  computed: {
    channel_id() {
      const sendTo = this.$store.state.currentChannel;
      const currentUser = this.$store.state.currentUser;
      
      if (!sendTo) { 
        return null;
      }

      if (currentUser.uid > sendTo.user_id){
        return currentUser.uid + "-" + sendTo.user_id;
      } else {
        return sendTo.user_id + "-" + currentUser.uid;
      }
    }
  }
};
</script>