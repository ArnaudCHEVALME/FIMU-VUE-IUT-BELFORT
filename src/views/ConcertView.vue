<template>
  <v-container>
    <ConcertModifier
        formTitle="Nouveau Concert"
        :propThing="defaultConcert"
        @submit="addConcert">
    </ConcertModifier>

    <v-data-table v-if="concerts.lenght != 0" :items="concerts" :headers="[
      { text: 'Date de début', value: 'debut' },
      { text: 'Heure de début', value: 'heure' },
      { text: 'durée(min)', value: 'duree' },
      { text: 'Artiste', value: 'name' },
      { text: 'Scene', value: 'nom' },
      { text: 'actions', value: 'actions', align: 'end' }
    ]">

      <template v-slot:[`item.actions`]="{ item }">

        <v-dialog v-model="dialog">

          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on" @click="updateConcert(item)">mdi-pencil</v-icon>
          </template>

          <v-card>
            <v-card-title>
              <span class="text-h5">Truc</span>
            </v-card-title>


            <v-card-text>


              <v-container>
                <v-row>
                  <v-col>
                    <template>
                      <v-date-picker
                          v-model="editConcert.debut"
                          show-adjacent-months>
                      </v-date-picker>
                    </template>
                  </v-col>
                  <v-col>
                    <v-time-picker
                        v-model="editConcert.heure"
                        elevation="15"
                    ></v-time-picker>
                  </v-col>
                </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                          v-model="editConcert.duree"
                          label="durée"
                          type="number">
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                          :items="artistes"
                          item-text='name'
                          item-value='artisteId'
                          label="Artiste"
                          v-model="editConcert.artisteId">
                      </v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                          :items="scenes"
                          item-text="nom"
                          item-value='sceneId'
                          label="Scene"
                          v-model="editConcert.sceneId"
                      >
                      </v-select>
                    </v-col>
                  </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">
                Cancel
              </v-btn>
              <v-btn color="blue darken-1" text @click="updateCommit">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="areYouSureDialog">
          <v-card>
            <v-card-title>
              Etes vous sur de vouloir supprimer ce concert???????
            </v-card-title>
            <v-card-actions>
              <v-btn @click="close">Annulez</v-btn>
              <v-btn @click="deleteConcert(item)" >Confirmer</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-icon small @click="areyousure(item)">
          mdi-delete
        </v-icon>
      </template>

    </v-data-table>
  </v-container>
</template>

<script>
import axios from 'axios';
import {mapState} from 'vuex';
import ConcertModifier from "@/components/ConcertModifier.vue";


export default {
  name: "ConcertView.vue",
  components: {ConcertModifier},
  data: function () {
    return {
      deleteId: -1,
      editConcert: {
        artisteId: null,
        sceneId: null,
        duree: null,
        debut: null,
        heure: null
      },
      editConcertIndex: -1,
      defaultConcert: {
        artisteId: null,
        sceneId: null,
        duree: null,
        debut: null,
        heure: null
      },
      dialog: false,
      areYouSureDialog: false
    }
  },
  computed: {
    ...mapState(["concerts", "artistes", "scenes"]),
  },
  methods: {
    submit() {
      this.thing.duree = parseInt(this.thing.duree)
      this.$emit('submit', this.thing)
      this.close()
    },
    close() {
      this.editDialog = false
      this.areYouSureDialog = false
    },
    areyousure(concert){
      this.deleteId = (Object.assign({}, concert)).concertId
      console.log(this.deleteId)
      this.areYouSureDialog = true
    },
    async deleteConcert() {
      try {
        await axios.delete("/api/concerts/" + this.deleteId)
        await this.$store.dispatch("fetchConcerts", this.$store.state.selectedSaison.saisonId)
        this.areYouSureDialog = false
      } catch (error) {
        console.error(error)
      }
    },
    async addConcert(concert) {
      try {
        let saisonId = this.$store.state.selectedSaison.saisonId;
        concert.saisonId = saisonId
        concert.debut = concert.debut.toString()
        console.log(concert.sceneId)
        if (concert.debut != null) {
          await axios.post('/api/concerts/', concert)
          await this.$store.dispatch("fetchConcerts", saisonId)
        }
      } catch (err) {
        console.error(err)
      }
    },
    updateConcert(concert) {
      this.editConcertIndex = this.concerts.indexOf(concert)
      this.editConcert = Object.assign({}, concert)
      this.dialog = true
    },
    async updateCommit(){
      try {
        let saisonId = this.$store.state.selectedSaison.saisonId;
        if (this.editConcert.debut != null) {
          await axios.put('/api/concerts/' + this.editConcert.concertId, this.editConcert)
          await this.$store.dispatch("fetchConcerts", saisonId)
          this.dialog = false
        }
      }catch (err) {
        console.error(err)
      }
    },
  components:
    {
      ConcertModifier
    }
  }
}
</script>

<style scoped>

</style>