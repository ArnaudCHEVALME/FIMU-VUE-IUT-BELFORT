<template>
  <v-container>
    <v-btn @click="openCreate">
      Créer un artiste
    </v-btn>
    <v-data-table v-if="artistes.lenght != 0" :items="artistes" :headers="[
      { text: 'Nom', value: 'name' },
      { text: 'Sous-Genres', value:'sousGenres'},
      { text: 'Genres', value:'genres'},
      { text: 'Pays', value:'pays'},
      {text: 'Actions', value:'actions', align:'end'}
    ]">

      <template v-slot:[`item.pays`]="{ item }">
        <span v-for=" (pays, i) in item.pays" :key="i">{{ pays.nompays }},<br></span>
      </template>

      <template v-slot:[`item.sousGenres`]="{ item }">
        <span v-for=" (sousGenre, i) in item.sousGenres" :key="i">{{ sousGenre.libelle }},<br></span>
      </template>

      <template v-slot:[`item.genres`]="{ item }">
        <span v-for=" (genre, i) in item.genres" :key="i">{{ genre.libelle }},<br></span>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-text>
          <v-text-field v-model="name" label="Nom">
          </v-text-field>
          <v-textarea v-model="bio" label="Biographie">
          </v-textarea>
          <v-text-field v-model="linkClip" label="Lien du clip video">
          </v-text-field>
          <v-select v-model="sousGenresTemp" :items="sousGenres" item-text="libelle" item-value="sousGenreId" label="Sous-Genre" multiple chips></v-select>
          <v-select v-model="genresTemp" :items="genres" item-text="libelle" item-value="genreId" label="Genre" multiple chips></v-select>
          <v-select v-model="paysId" :items="pays" item-text="nompays" item-value="paysId" label="Pays des Artistes" multiple chips></v-select>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="createItem()">
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
      sousGenresTemp: [],
      create: true,
      idscene: null,
      name:"",
      bio: "",
      linkClip: "",
      genresTemp: [],
      paysId: [],
      dialog: false
    }
  },
  mounted: {
    load(){
      this.$store.dispatch("fetchSousGenres")
      this.$store.dispatch("fetchGenres")
    }
  },
  computed: {
    ...mapState(["artistes", "artistesDetails", "genres", "sousGenres", "pays"]),
  },
  methods: {
    async deleteItem(item){
      await axios.delete("/api/artistes/"+item.artisteId)
      await this.$store.dispatch("fetchArtists", this.$store.state.selectedSaison.saisonId)
    },
    async editItem(item){
      this.name = ""
      this.bio = ""
      this.linkClip = ""
      this.sousGenresTemp = []
      this.paysId = []
      this.genresTemp = []
      await this.$store.dispatch("fetchArtistsDetails", item.artisteId).then(()=>{
        this.name = this.artistesDetails.name
        this.bio = this.artistesDetails.bio
        this.linkClip = this.artistesDetails.linkClip
        this.artistesDetails.pays.forEach( p => {
          this.paysId.push(p.paysId)
        })
        this.artistesDetails.genres.forEach(g =>{
          this.genresTemp.push(g.genreId)
        })
        this.artistesDetails.sousGenres.forEach(sg =>{
          this.sousGenresTemp.push(sg.sousGenreId)
        })
        console.log(this.artistesDetails)
        this.create = false
        this.dialog = true
      })
    },
    openCreate(){
      this.name = ""
      this.bio = ""
      this.linkClip = ""
      this.sousGenres = []
      this.paysId = []
      this.sousGenresTemp = []

      this.dialog = true
      this.create = true
    },
    async createItem(){
      let artiste = {
        name: this.name,
        bio: this.bio,
        linkClip: this.linkClip,
        sousGenres: "",
        genres: "",
        pays: ""
      }
      artiste.sousGenres = this.sousGenresTemp.join("|")
      artiste.genres = this.genresTemp.join("|")
      artiste.pays = this.pays.map(p => p.paysId).join("|")
      if(this.create){
        await axios.post("/api/artistes/", artiste)
      }else{
        await axios.put("/api/artistes/"+this.artistesDetails.artisteId, artiste)
      }
      await this.$store.dispatch("fetchArtists", this.$store.state.selectedSaison.saisonId)
      // await this.$store.dispatch("fetchArtistsDetails", this.artistesDetails.artisteId)
      this.dialog = false
    }
  }
}
</script>

<style scoped>

</style>