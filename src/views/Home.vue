<template>
<v-container>
  <v-row class="mb-9">
    <v-col cols="12" sm="6" md="4" lg="3" xl="2">
    <SaleGraph />
    </v-col>
    <v-col cols="12" sm="6" md="4" lg="3" xl="2">
    <SaleGraph />
    </v-col>
    <v-col cols="12" sm="6" md="4" lg="3" xl="2">
    <SaleGraph />
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import SaleGraph from '../components/SaleGraph';

export default {
  name: 'Home',

  components: {
    SaleGraph
  },
};
</script>
