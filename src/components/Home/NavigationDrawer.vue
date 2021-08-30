<template>
    <v-navigation-drawer app v-model="$store.state.isSideMenuOpen" clipped>
        <v-container>

            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="grey--text text--darker">
                        Navigation Lists
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list dense nav>
              <v-list-group
                v-for="nav in nav_lists" 
                :key="nav.name"
                :prepend-icon="nav.icon"
                no-action
                :append-icon="nav.lists ? undefined : ''"
              >

                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title>{{nav.name}}</v-list-item-title>
                  </v-list-item-content>
                </template>

                <v-list-item v-for="list in nav.lists" :key="list">
                  <v-list-item-content>
                    <v-list-item-title>{{list}}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>
            </v-list>
        </v-container>
    </v-navigation-drawer>
</template>

<script>
export default {
  data(){
    return{
      nav_lists:[
        {
          name: 'Getting Started',
          icon: 'mdi-speedometer',
          lists:['Quick Start','Pre-made layouts']
        },
        {
          name: 'Customization',
          icon: 'mdi-cogs' 
        },
        {
          name: 'Styles & animations',
          icon: 'mdi-palette',
          lists:['Colors','Content','Display']
        },
        {
          name: 'UI Components',
          icon: 'mdi-view-dashboard',
          lists:['API explorer','Alerts']
        },
        {
          name: 'Directives',
          icon: 'mdi-function'
        },
        {
          name: 'Preminum themes',
          icon: 'mdi-vuetify'
        },
      ]
    }
  }
}
</script>