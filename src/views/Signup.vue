<template>
  <v-sheet
    height="100%"
    width="100%"
    color="#f5f5f5"
  >
    <v-container>
      <v-row>
        <v-col cols="11" sm="10" md="8" lg="6" class="mx-auto">
          <v-card class="mt-5 pa-3 mb-2">
            <v-card-title>
              <h2>アカウントを作成する</h2>
            </v-card-title>
            
            <v-alert
              border="right"
              colored-border
              type="warning"
              elevation="2"
              class= "mx-6"
              v-if="error"
            >
              {{error}}
            </v-alert>
            
            <v-card-text>
              <v-form class="px-2" @submit.prevent="submitSignup">
                
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
                  label="パスワード(6文字以上)"
                  :type="showPassword ? 'text' : 'password'"
                  color="indigo"
                  prepend-icon="mdi-lock"
                  append-icon="mdi-eye-off"
                  @click:append="showPassword = !showPassword"
                  v-model="password"
                ></v-text-field>
                
                <div class="text-center">
                  <span class="caption">ユーザー名, メールアドレスは公開されます</span>
                  <span class="caption d-block">架空のメールアドレスでも登録可能です(例：aiueo@example.com)</span>
                </div>
                
                
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
  </v-sheet>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import'firebase/compat/database';

export default {
  name:'Login',
  data: () => ({
    showPassword: false,
    name: "",
    email: "",
    password: "",
    error: ""
  }),
  methods: {
    submitSignup() {
      this.errors = [];
      //一応フロントエンド側でバリデーションしてるけど本来はバックエンド側でもやった方が良い
      if (!this.name) {
        this.errors.push("ユーザー名を入力してください。");
        return;
      }
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(response => {
          const user = response.user;
          firebase
            .database()
            .ref("users")
            .child(user.uid)
            .set({
              user_id: user.uid,
              name: this.name,
              email: this.email.toLowerCase()
            })
            .catch(e => {
              console.log(e);
            });
        })
        .catch(e => {
          console.log(e);
          if (e.code == "auth/email-already-in-use") {
            this.error = ("入力されたメールアドレスは登録済みです。");
          } else if(e.code == "auth/weak-password") {
            this.error = ("パスワードは6文字以上で入力してください。");
          } else {
            this.error = (
              "入力されたメールアドレスかパスワードに問題があります。"
            );
          }
        });
    }
  }
};
</script>