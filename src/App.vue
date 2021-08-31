<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <Header_nologin v-if="!$store.state.currentUser"/>
    <Footer v-if="!$store.state.currentUser"/>
    
    <AppHeader v-if="!!$store.state.currentUser"/>
    <NavigationDrawer v-if="!!$store.state.currentUser"/>
    
    <v-main><router-view/></v-main>
  </v-app>
</template>

<script>
import Footer from './components/Home/Footer.vue';
import NavigationDrawer from './components/App/NavigationDrawer.vue';
import Header_nologin from './components/Home/Header_nologin.vue';
import AppHeader from './components/App/AppHeader.vue';

export default {
  name: 'App',

  data: () => ({
  }),
  components: {
    Footer,
    NavigationDrawer,
    Header_nologin,
    AppHeader
  },
};
</script>
