<template>
    <v-container>
      <v-row>
        <v-col cols="10">
          <v-text-field v-model="message"></v-text-field>
        </v-col>
        <v-col>
          <v-btn color="primary" @click="addMessage">メッセージを追加</v-btn>
        </v-col>
        <v-col cols="12">
          <v-list>
            <v-subheader>メッセージ一覧</v-subheader>
            <v-list-item-group color="primary">
              <v-list-item v-for="(message, index) in messages" :key="index">
                <v-list-item-icon>
                  <v-btn icon @click.stop="deleteMessage(index)">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-list-item-icon>
                <v-list-item-title>{{message.user.name}}:{{message.content}}</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/database";

export default {
  data() {
    return {
      message: "",
      messages: []
    };
  },
  
  methods: {
    addMessage() {
      console.log("addMessage Called");
      firebase.database().ref("slack")
        .push({
          content: this.message,
          user: {
            name: "John Doe"
          }
        });
    },
    deleteMessage(index) {
      firebase
        .database()
        .ref("slack")
        .child(index)
        .remove();
    }
  },
  mounted() {
    firebase.database().ref("slack")
      .on("value", snapshot => (this.messages = snapshot.val()));
  }
};
</script>