<template>
  <div>
    <v-container id="messageContainer">
      <h5>メッセージ一覧</h5>
      <div>
        <v-list three-line class="overflow-y-auto" :key="reload">
          <v-list-item
            v-for="message in messages"
            :key="message.key"
          >
            <v-list-item-avatar size="45">
              <v-img
                :src="getAvatar(message.user)"
                alt="avatar"
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="body-1 mt-1">
                <span class="font-weight-bold body-2">{{message.name}}</span>
                <span class="gray--text caption ms-5">{{message.postTime}}</span>
                <p class="text-pre-wrap mt-1">{{message.content}}</p>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import'firebase/compat/database';

export default {
  name: 'ChatArea',
  data() {
    return {
      reload: "false"
    };
  },
  mounted() {
    this.reload = !this.reload;
  },
  computed: {
    messages() {
      let messages = [];
      
      if (this.$store.state.currentChannel.state === "DirectMail") {
        const sendTo = this.$store.state.currentChannel;
        const currentUser = this.$store.state.currentUser;
        let channel_id = "";
        
        if (currentUser.uid > sendTo.user_id){
          channel_id = currentUser.uid + "-" + sendTo.user_id;
        } else {
          channel_id = sendTo.user_id + "-" + currentUser.uid;
        }
        
        firebase
          .database()
          .ref("messages")
          .child(channel_id)
          .on("child_added", snapshot => {
            messages.push(snapshot.val());
            this.reload = !this.reload;
          });
      } else if (this.$store.state.channelState === "Channel") {
        const channel_id = this.$store.state.currentChannel.channel_id;
        firebase
          .database()
          .ref("messages")
          .child(channel_id)
          .on("child_added", snapshot => {
            messages.push(snapshot.val());
            this.reload = !this.reload;
          });
      }
      
      
      return messages;
    },
    pageHeight () {
      return document.body.scrollHeight;
    }
  },
  
  methods: {
    getAvatar(email) {
      return `https://i.pravatar.cc/150?u=${email}`;
    },
    scrollToEnd() {
      const element = document.documentElement;
      const bottom = element.scrollHeight - element.clientHeight;
      window.scroll(0, bottom);
    },
  },
  
  updated() {
    this.scrollToEnd();
  }
  
};
</script>