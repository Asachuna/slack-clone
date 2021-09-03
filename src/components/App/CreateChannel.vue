<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{on, attrs}">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon color="grey-darken-1" small>mdi-plus-circle-outline</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        チャンネルを作成
        <v-spacer></v-spacer>
        <v-btn icon @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="10" class="mx-auto">
              <v-text-field
                label="チャンネル名" 
                v-model="channelName"
                color="indigo"
              >
              </v-text-field>
            </v-col>
            <v-col cols="10" class="mx-auto text-right">
              <v-btn 
                color="indigo" 
                class="white--text" 
                :disabled="!this.channelName"
                @click="addChannel"
              >
                作成する
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
  </v-card>
  </v-dialog>
</template>

<script>
import firebase from "firebase/compat/app";
import'firebase/compat/database';

export default {
  data: () => ({
    channelName: null,
    dialog: false
  }),
  
  methods: {
    addChannel() {
      const newChannel = firebase
        .database()
        .ref("channel")
        .push();
        
      const key_id = newChannel.key;
      
      newChannel
        .set({
          name: this.channelName,
          id: key_id
        }).then(() => {
          this.dialog = false;
        });
    }
  }
};
</script>