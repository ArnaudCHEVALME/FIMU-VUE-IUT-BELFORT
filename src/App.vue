<template>
  <v-app>
    <v-main>
      <router-view name="menu"/>
      <router-view/>
    </v-main>
  </v-app>
</template>
<script>



import {mapGetters} from "vuex";

export default {
  name: 'App',
  data: () => ({}),
  mounted() {
    this.$store.dispatch("loadEveryThing")
  },
  computed: {
    ...mapGetters(["isLoggedIn"])
  }
};
</script>
<header/>
