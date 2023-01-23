<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(file, titleIndex) in Object.keys(files)"
        :key="titleIndex" cols="4"
      >
        <ImportComponent
          v-model="files[file]"
          :title="file"
        >
        </ImportComponent>
      </v-col>
    </v-row>
    <v-row>
      <v-btn
        :disabled="!allValid"
        color="green"
        @click="submit"
      >Valider
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import ImportComponent from "@/components/ImportComponent.vue";
import axios from "axios";

export default {
  name: "ImportView",
  components: {ImportComponent},
  data() {
    return {
      files: {
        artistes: {valid: false, csv: null},
        scenes: {valid: false, csv: null},
        concerts: {valid: false, csv: null},
        stand: {valid: false, csv: null},
      }
    }
  },
  computed: {
    allValid() {
      return Object.keys(this.files).every(file => this.files[file].valid)
    }
  },
  methods: {
    async submit() {
      if (!this.allValid) return
      await axios.post("/api/importCSV/", this.files)
    },
    remplaceField(obj, old_key, new_key) {
      Object.defineProperty(obj, new_key,
        Object.getOwnPropertyDescriptor(obj, old_key));
      delete obj[old_key];
      return obj;
    },
    formatGenres() {
      return this.files.genres.csv.map(o => {
        return this.remplaceField(o, "GENRES_PRINCIPAUX", "libelle")
      })
    },
    formatSousGenres() {
      return this.files.sousGenres.csv.map(o => {
        return this.remplaceField(o, "SOUS_GENRES", "libelle")
      })
    },
    formatPays() {
      return this.files.pays.csv.map(o => {
        return this.remplaceField(o, "NOM_PAYS", "nompays")
      })
    },
    formatTypesStand() {
      return this.files.typesStand.csv.map(o => {
        return this.remplaceField(o, "TYPES_POINT_INTERET", "libelle")
      })
    },
    formatTypesService() {
      return this.files.services.csv.map(o => {
        return this.remplaceField(o, "SERVICES", "libelle")
      })
    },
    formatStand() {
      return this.files.stand.csv.map(o => {
        o = this.remplaceField(o, "Nom", "nom")
        return o
      })
    },
  }
}
</script>

<style scoped>

</style>