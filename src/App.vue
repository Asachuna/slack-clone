<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <Header/>
    <NavigationDrawer/>
    <v-main><router-view/></v-main>
    <Footer/>
  </v-app>
</template>

<script>
import Header from './components/Home/Header.vue';
import Footer from './components/Home/Footer.vue';
import NavigationDrawer from './components/Home/NavigationDrawer.vue';

export default {
  name: 'App',

  data: () => ({
    //
  }),
  components: {
    Header,
    Footer,
    NavigationDrawer
  }
};
</script>
