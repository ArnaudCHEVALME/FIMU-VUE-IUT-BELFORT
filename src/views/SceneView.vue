<template>
  <v-container>
    <v-btn @click="openCreate">
      Créer une scène
    </v-btn>
    <v-data-table v-if="scenes.lenght != 0" :items="scenes" :headers="[
      { text: 'Nom', value: 'nom' },
      { text: 'Latitude', value: 'latitude' },
      { text: 'Longitude', value: 'longitude' },
      { text: 'Interieur', value: 'interieur' },
      { text: 'Capacite', value: 'capacite' },
      {text: 'Actions', value:'actions', align:'end'}
    ]">
      <template v-slot:[`item.interieur`]="{ item }">
        <v-icon v-if="item.interieur != false">
          mdi-check
        </v-icon>
        <v-icon v-else>
          mdi-close
        </v-icon>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
            small
            class="mr-2"
            @click="sure"
        >
          mdi-delete
        </v-icon>
        <v-dialog v-model="deleteDialog">
          <v-card>
            <v-card-title>
              Voulez vous vraiment supprimer cette scène?
            </v-card-title>
            <v-card-actions>
              <v-btn @click="deleteDialog = false">annulez</v-btn>
              <v-btn @click="deleteItem(item)">confirmer</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-text>
          <v-text-field v-model="itemChosen.nom" label="Nom">
          </v-text-field>
          <div v-if="safeName">
        <p>Veuillez insérez un nom</p>
          </div>
          <v-text-field v-model="itemChosen.latitude" label="Latitude">
          </v-text-field>
          <v-text-field v-model="itemChosen.longitude" label="Longitude">
          </v-text-field>
          <v-text-field v-model="itemChosen.capacite" label="Capacité ">
          </v-text-field>
          <v-checkbox v-model="itemChosen.interieur"  label="Interieur">
          </v-checkbox>

        </v-card-text>
        <v-card-actions>
          <v-btn @click="createItem" 
          :disabled="safeName">
            valider
          </v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import axios from "axios";
export default {
  name: "SceneView.vue",
  data () {
    return {
      create: true,
      idscene: null,
      itemChosen: {
        nom:"",
        latitude: 0,
        longitude: 0,
        interieur: false,
        capacite: 0,
      },
      dialog: false,
      deleteDialog: false
    }
  },
  computed: {
    ...mapState(["scenes", "selectedSaison"]),

    safeName() {
    return this.itemChosen.nom === ""
    }

  },
  methods: {
    sure(){
      this.deleteDialog = true
    },
    async deleteItem(item){
      await axios.delete("/api/scene/"+((Object.assign({}, item)).sceneId))
      await this.$store.dispatch("fetchScenes")
      this.deleteDialog = false
    },
    editItem(item){
        this.itemChosen.nom = item.nom
      this.itemChosen.latitude = item.latitude
      this.itemChosen.longitude = item.longitude
      this.itemChosen.interieur = item.interieur
      this.itemChosen.capacite = item.capacite
      this.idscene = (Object.assign({}, item)).sceneId
      this.create = false
      console.log(this.itemChosen.nom)
      this.dialog = !this.dialog
      
      
    },
    openCreate(){
      this.dialog = !this.dialog
      this.create = true
    },
    async createItem(){
        if(this.create){
        console.log("here")
        await axios.post("/api/scene/", this.itemChosen)
      }else{
        await axios.put("/api/scene/"+this.idscene, this.itemChosen)
      }
      await this.$store.dispatch("fetchScenes")
      this.dialog = false
      this.safeName = true
      
    }
  }
}
</script>

<style scoped>

</style>