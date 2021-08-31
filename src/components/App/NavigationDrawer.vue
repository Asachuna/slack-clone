<template>
    <v-navigation-drawer app dark permanent hide-overlay v-model="$store.state.isSideMenuOpen" clipped-top color="indigo darken-1">
        <v-container>
          <v-list-item class="mb-2">
            <v-list-item-content>
              <v-list-item-title class="title">Slack Clone</v-list-item-title>
              <v-list-item-subtitle>aaaaa@aaa.com</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-subheader class="font-weight-bold grey--text text--lighten-2">チャンネル</v-subheader>
          <v-list-item nav v-for="channel in channels" :key="channel.id" class="grey--text text--lighten-2">
            <v-list-item-title>#{{channel.channel_name}}</v-list-item-title>
          </v-list-item>
        </v-container>
    </v-navigation-drawer>
</template>

<script>

export default {
  props: {
    user: Object
  },
  data() {
    return{
      channels: [
        {
          id: 1,
          channel_name: "営業"
        },
        {
          id: 2,
          channel_name: "マーケティング"
        },
        {
          id: 3,
          channel_name: "情シス"
        }
      ]
    }
  },
}
</script>