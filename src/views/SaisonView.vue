<template>
  <v-container>
    <v-btn @click="openDialog">
      + Saison
    </v-btn>
    <v-btn @click="deleteDialog = true">
      Backup / Current / Next
    </v-btn>
    <card-saison v-for="(saison, id) in saisons" :key="id"
                 :saison="saison">
    </card-saison>
    <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
    >
      <update-saison :saison="saison_null" @ChangeStateDialog="openDialog"></update-saison>
    </v-dialog>
    <v-dialog v-model="deleteDialog">
      <v-card>
        <v-card-title>
          Voulez vous vraiment créer une saison ?
        </v-card-title>
        <v-card-actions>
          <v-btn @click="deleteDialog = false">annulez</v-btn>
          <v-btn @click="processSaison">confirmer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import CardSaison from "@/components/CardSaison.vue";
import UpdateSaison from "@/components/UpdateSaison.vue";
import {mapState} from "vuex";
import axios from "axios";
export default {
  name: "SaisonPage",
  computed: {
    ...mapState(['saisons']),
  },
  components: {
    UpdateSaison,
    CardSaison
  },
  data() {
    return {
      dialog: false,
      deleteDialog: false,
      saison_null: {
        paysHonneurId: null,
        dateSaison: null,
        theme: null,
        image: null
      }
    }
  },
  methods: {
    openDialog() {
      this.dialog = !this.dialog
    },
    async updateSaison(){
      let saison = {
        dateSaison: this.dateSaison.toISOString(),
        theme: this.theme.theme,
        bannierePath: null
      }
      await axios.put('/api/saisons/'+this.saison.saisonId, saison)
      await this.$store.dispatch('fetchSaisons')
      this.openDialog()
    },
    async processSaison()
    {
      await axios.post('api/backup/')
      await this.$store.dispatch("loadEveryThing")
      this.deleteDialog = false
      this.dialog = true
    },
  }
}
</script>

<style scoped>

</style>