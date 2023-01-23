<template>
  <v-container>
    <CatLiensCU
      form-title="nouvelle catégorie"
      :prop-cat="{libelle:null}"
      icon="mdi-plus"
      @send="addCat"
    />
    <v-data-table
        :items="categoriesLiens"
        :headers="[
          {
            text:'Type de Liens',
            align:'start',
            value:'libelle',
            sortable:false
          },
          {
            text: 'Actions',
            value: 'actions',
            align: 'end',
            sortable:false
          },
        ]"
        sort-by="libelle"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <CatLiensCU
          form-title="Editer catégorie"
          :prop-cat="item"
          icon="mdi-pencil"
          @send="updateCat(item)"
        />
        <v-icon
            @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import {mapState} from "vuex";
import axios from "axios";
import CatLiensCU from "@/components/CatLiensCU.vue";

export default {
  name: "TypeLiens.vue",
  components: {CatLiensCU},
  computed: {
    ...mapState(["categoriesLiens"]),
  },
  methods:{
    async deleteItem(item){
      try {
        let saisonId = this.$store.state.selectedSaison.saisonId;
        console.log(item)
        await axios.delete("/api/categoriesReseaux/"+ item.categorieReseauId)
        await this.$store.dispatch('fetchCategoriesLiens', saisonId)
        await this.$store.dispatch('fetchArtists', saisonId)
      } catch (err) {
        console.error(err)
      }
    },
    async updateCat(cat){
      try {
        console.log("in uipdate")
        console.log(cat)
        let saisonId = this.$store.state.selectedSaison.saisonId;
        await axios.put("/api/categoriesReseaux/"+cat.categorieReseauId, cat)
        await this.$store.dispatch('fetchCategoriesLiens', saisonId)
        await this.$store.dispatch('fetchArtists', saisonId)
      } catch (err) {
        console.error(err)
      }
    },
    async addCat(cat){
      try {
        let saisonId = this.$store.state.selectedSaison.saisonId;
        await axios.post("/api/categoriesReseaux/", cat)
        await this.$store.dispatch('fetchCategoriesLiens', saisonId)
        await this.$store.dispatch('fetchArtists', saisonId)
      }catch (err) {
        console.error(err)
      }
    }
  }
}
</script>

<style scoped>

</style>