<template>
<v-container>
  サインイン中
  <v-btn @click="signOut">サインアウト</v-btn>
</v-container>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export default {
  name: 'Home',

  methods: {
    signOut() {
      firebase.auth().signOut();
      this.$router.push("/signin");
    }
  }
};
</script>
