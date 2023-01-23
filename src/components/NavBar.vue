<template>
  <v-row>
    <v-col>
  <v-navigation-drawer app>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6">
          <v-img class="mx-auto"
            width=150
            src="../assets/index.png"
          ></v-img>
        </v-list-item-title>

      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-select v-if="saisons.length != 0"
        :items="saisons"
        item-text="dateSaison"
        item-value="saisonId"
        label="Saisons"
        return-object
        @change="updateSelectedSaison"
    ></v-select>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item
          v-for="item in routes"
          :key="item.name"
          link
      >
        <v-list-item-icon>
          <v-icon >{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content @click="$router.push(item.path)">
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</v-col>
  <v-app-bar app height="100"
  >
    <strong>{{loggedIn}}</strong>
    <v-spacer></v-spacer>

    <v-btn v-if="loggedIn" @click="logOut()" color="red" elevation="6">
      <v-icon class="justify-center">
        mdi-logout
      </v-icon>
    </v-btn>
  </v-app-bar>
  </v-row>
</template>

<script>
import {mapGetters, mapState} from "vuex";

export default {
  name: "NavBar",
  mounted() {
    this.$store.dispatch("fetchSaisons")
  },
  computed:{
    ...mapState(["saisons"]),
    loggedIn(){
      if (this.$store.getters.isLoggedIn){
        let user = JSON.parse(localStorage.getItem("user"))
        return `Connecté: ${user.login} - ${user.role}`
      }else{
        return "not logged in !"
      }
    },

    routes(){

      return this.$store.state.routes.filter(r => r.name !== "Login")
    }
  },
  methods:{
    async updateSelectedSaison(saison){
      await this.$store.commit("setSelectedSaison", saison)
      console.log(saison)
      await this.$store.dispatch("loadEveryThing", saison.saisonId)
    },
    logOut(){
      this.$store.dispatch('auth/logout').then(
          () => {
            if(this.user == null){
              this.$router.push('/');
            }
          })
    },
  },
  getters:{
    ...mapGetters(['isLoggedIn'])
  }
}
</script>

<style scoped>

</style>