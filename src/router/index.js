import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          next();
        } else {
          next("/login");
        }
      });
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    beforeEnter: (to, from, next) => {
      firebase.auth().onAuthStateChanged(user => {
        if (!user) {
          next();
        } else {
          next("/");
        }
      });
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "signup" */ '../views/Signup.vue'),
    beforeEnter: (to, from, next) => {
      firebase.auth().onAuthStateChanged(user => {
        if (!user) {
          next();
        } else {
          next("/");
        }
      });
    }
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
