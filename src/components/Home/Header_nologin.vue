<template>
    <v-app-bar color="white" light app clipped-left elevation="3" class="font-weight-bold">
      <router-link style="text-decoration: none;" :to="{ name: 'Home' }" class="ms-4 indigo--text">
        <v-toolbar-title>Slack Clone</v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer>

      <v-btn outlined color="indigo" :to="{ name: 'Signup' }" class="me-3">新規登録</v-btn>
      <v-btn outlined color="indigo" :to="{ name: 'Login' }">サインイン</v-btn>
    </v-app-bar>
</template>

<script>

export default {
  components: {
  }
};
</script>