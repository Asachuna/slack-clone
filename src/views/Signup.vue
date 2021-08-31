<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="11" sm="10" md="8" lg="6" class="mx-auto">
          <v-card class="mt-5 pa-3">
            <v-card-title>
              <h2>アカウントを作成する</h2>
            </v-card-title>
            <v-card-text>
              <v-form class="px-2 mt-2" @submit.prevent="submitSignup">
                
                <v-text-field
                  label="ユーザー名"
                  color="indigo"
                  prepend-icon="mdi-account-circle"
                  v-model="name"
                ></v-text-field>
                
                <v-text-field
                  label="メールアドレス"
                  type="email"
                  color="indigo"
                  prepend-icon="mdi-email"
                  v-model="email"
                ></v-text-field>
                
                <v-text-field
                  label="パスワード"
                  :type="showPassword ? 'text' : 'password'"
                  color="indigo"
                  prepend-icon="mdi-lock"
                  append-icon="mdi-eye-off"
                  @click:append="showPassword = !showPassword"
                  v-model="password"
                ></v-text-field>
                
                <v-card-actions class="mt-2">
                  <v-btn 
                    color="indigo"
                    dark
                    width="100%"
                    type="submit"
                  >
                    アカウントを作成
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export default {
  name:'Login',
  data: () => ({
    showPassword: false,
    name: "",
    email: "",
    password: ""
  }),
  methods: {
    submitSignup() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(response => {
          console.log(response);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>