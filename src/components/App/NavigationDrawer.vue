<template>
    <v-navigation-drawer app dark permanent hide-overlay v-model="$store.state.isSideMenuOpen" clipped-top color="indigo darken-1" class="pr-0">
        <v-container class="pr-0">
          
          <v-list-item class="mb-2">
            <v-list-item-content>
              <v-list-item-title class="title">Slack Clone</v-list-item-title>
              <v-list-item-subtitle class="mt-3 white--text">
                
                <v-avatar size="32" class="me-2" v-show="avator_url">
                  <img
                    :src="avator_url"
                    alt="avator"
                  >
                </v-avatar>
                <v-progress-circular
                  :width="3"
                  :size="30"
                  color="white"
                  indeterminate
                  v-if="!avator_url"
                ></v-progress-circular>
                
                {{$store.state.currentUserName}}
                
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          
          <v-divider></v-divider>
          
          <v-subheader class="font-weight-bold grey--text text--lighten-2">
            チャンネル
            <v-spacer></v-spacer>
            <CreateChannel/>
          </v-subheader>
          
          <v-list-item nav dense v-for="channel in channels" :key="channel.id" class="font-weight-bold grey--text text--lighten-2">
            <v-list-item-group class="pr-3">
              <v-list-item
                nav
                dense
                v-for="channel in channels"
                :key="channel.id"
                class="grey--text 
                text--lighten-2"
              >
                 <v-list-item-title>#{{channel.name}}</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list-item>
          
          <v-subheader class="font-weight-bold grey--text text--lighten-2">
            ダイレクトメッセージ
          </v-subheader>
          
          <v-list-item-group class="pr-3">
            <v-list-item
              nav
              dense
              v-for="user in users"
              :key="user.user_id"
              class="grey--text 
              text--lighten-2"
              @click="setDirectMail(user)"
            >
              <v-avatar size="25" class="me-2" v-show="avator_url">
                <img
                  :src="getAvatar(user)"
                  alt="avator"
                >
              </v-avatar>
              <v-list-item-title>{{user.name}}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
          
        </v-container>
    </v-navigation-drawer>
</template>

<script>
import store from '../../store';
import CreateChannel from './CreateChannel.vue';

export default {
  props: {
    'currentUser': {
      type: Object
    },
    'users': {
      type: Array
    },
    'channels': {
      type: Array
    },
  },
  
  components: {
    CreateChannel
  },
  
  data() {
    return{
    };
  },
  
  methods: {
    getAvatar(user) {
      return `https://i.pravatar.cc/150?u=${user.email}`;
    },
    setDirectMail(user) {
      const channel = {
        state: "DirectMail",
        user_id: user.user_id,
        name: user.name,
        email: user.email
      };
      store.dispatch('setChannel', channel);
    }
  },
  
  computed: {
    avator_url() {
      if(this.currentUser.email) {
        return this.getAvatar(this.currentUser);
      } else {
        return null;
      }
    }
  },
  
  created() {
    console.log(this.channels);
  }
};
</script>