<template>
  <v-container>
    <v-btn @click="openCreateGenreDialog">
      + Genre
    </v-btn>

    <v-btn @click="openCreateSousGenreDialog">
      + Sous Genre
    </v-btn>
    <v-data-table v-if="genres.length != 0" :items="genres" :headers="[
        {text: 'Genre', value: 'libelle'},
        {text: 'Actions', value:'actions', align:'end'}
    ]">
      <template v-slot:[`item.actions`]="{ item }">
        <template v-if="item.genreId">
          <v-icon small class="mr-2" @click="editGenre(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteGenre(item.genreId)">
            mdi-delete
          </v-icon>
        </template>
      </template>
    </v-data-table>
    <v-data-table v-if="sousGenres.lenght != 0" :items="sousGenres" :headers="[
        { text: 'Sous genre', value: 'libelle'},
        { text: 'Actions', value: 'actions', align:'end'}
    ]">
      <template v-slot:[`item.actions`]="{item}">
        <template v-if="item.sousGenreId">
          <v-icon small class="mr-2" @click="editSousGenre(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteSousGenre(item.sousGenreId)">
            mdi-delete
          </v-icon>
        </template>
      </template>
    </v-data-table>

    <v-dialog v-model="genreDialog">
      <v-card>
        <v-card-text>
          <v-text-field v-model="genreChosen.libelle" label="Libelle"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="createGenre">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="sousGenreDialog">
      <v-card>
        <v-card-text>
          <v-text-field v-model="sousGenreChosen.libelle" label="Libelle"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="createSousGenre">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import {mapState} from "vuex";
import axios from "axios";

export default {
  name: "GenreView.vue",
  data(){
    return {
      genreDialog: false,
      sousGenreDialog:false,
      genreChosen:{
        libelle: "",
      },
      sousGenreChosen:{
        libelle:"",
      }
    }
  },
  computed: {
    ...mapState(["genres", "sousGenres"])
  },
  methods: {

    async deleteGenre(genreId) {
      console.log(genreId)
      await axios.delete("/api/genres/"+ genreId);
      await this.$store.dispatch("fetchGenres")
    },
    async editGenre(item){
      this.genreChosen.libelle=item.libelle;
      this.genreChosen.genreId=item.genreId;
      this.genreDialog = true;
    },
    async createGenre(){
      if (this.genreChosen.genreId){
        const data = {
          libelle: this.genreChosen.libelle,
        };
        await axios.put("/api/genres/"+ this.genreChosen.genreId, data);
      }else {
        const data={
          libelle: this.genreChosen.libelle,
        };
        await axios.post("/api/genres/", data);
      }
      await this.$store.dispatch("fetchGenres");
      this.genreDialog = false;
    },

    openCreateGenreDialog(){
      this.genreChosen = {
        libelle: "",
      };
      this.genreDialog = true;
    },
    openCreateSousGenreDialog(){
      this.sousGenreChosen={
        libelle: "",
      };
      this.sousGenreDialog = true
    },
    async deleteSousGenre(sousGenreId) {
      await axios.delete("/api/sousGenre/"+ sousGenreId);
      await this.$store.dispatch("fetchSousGenres");
    },
    async editSousGenre(item) {
      this.sousGenreChosen.libelle=item.libelle;
      this.sousGenreChosen.sousGenreId = item.sousGenreId;
      this.sousGenreDialog = true;
    },
    async createSousGenre() {
      if (this.sousGenreChosen.sousGenreId){
        const data = {
          libelle: this.sousGenreChosen.libelle,
        };
        await axios.put("/api/sousGenre/"+ this.sousGenreChosen.sousGenreId, data);
      }else {
        const data={
          libelle: this.sousGenreChosen.libelle,
        };
        await axios.post("/api/sousGenre/", data);
      }
      await this.$store.dispatch("fetchSousGenres");
      this.sousGenreDialog = false;
    },
  }
}
</script>

<style scoped></style>