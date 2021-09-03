<template>
  <v-sheet
    height="100%"
    width="100%"
    color="#f5f5f5"
  >
    <v-container>
      <v-row>
        <v-col cols="11" sm="10" md="8" lg="6" class="mx-auto">
          <v-card class="mt-5 pa-3">
            <v-card-title>
              <h2>サインイン</h2>
            </v-card-title>
            
            <v-alert
              border="right"
              colored-border
              type="warning"
              elevation="2"
              class= "mx-6"
              v-if="error"
              transition="scale-transition"
            >
              {{error}}
            </v-alert>
            
            <v-card-text>
              <v-form class="px-2 mt-2" @submit.prevent="signIn">
                
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
                  v-model="password"
                  color="indigo"
                  prepend-icon="mdi-lock"
                  append-icon="mdi-eye-off"
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
                
                <v-card-actions class="mt-2">
                  <v-btn color="indigo" dark width="100%" type="submit">サインイン</v-btn>
                </v-card-actions>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols=12 class="mx-auto text-center font-weight-bold">
          <div class="indigo--text">アカウントがありませんか？</div>
          <span><router-link :to="{ name: 'Signup' }">アカウントを作成する</router-link></span>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export default {
  name:'Login',
  data: () => ({
    showPassword: false,
    email: "",
    password: "",
    error: null
  }),
  methods: {
    signIn() {
      this.errors = [];
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(response => {
          console.log(response);
        })
        .catch(() => {
          this.password = "";
          this.error = ("メールアドレスかパスワードに誤りがあります。");
        });
    }
  }
};
</script>