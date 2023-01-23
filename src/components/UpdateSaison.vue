<template>
  <v-card>
    <v-card-title>
      Création d'une saison
    </v-card-title>
    <v-card-text>
      <v-select v-model="saison_modif.paysHonneurId"
                :items="pays"
                item-text="nompays"
                item-value="paysId"
                label="Pays à l'honneur"
                prepend-icon="mdi-earth"
                required
      >
      </v-select>
      <v-text-field
          prepend-icon="mdi-palette"
          v-model="saison_modif.theme"
          label="Thème de la Saison"
          
      >
      </v-text-field>


      <input
  type="file"
  accept="image/jpeg/*"
  @change="uploadImage()"
/>
      <v-img v-if="saison.image != null "  width="400" height="400"></v-img>
      <div v-else>Pas d'image pour cette Saison</div>
      <DatePicker
          v-model="saison_modif.dateSaison"
          :label="'Date de la Saison'"
      ></DatePicker>
      <v-row>
        <v-col cols="6">
          <v-color-picker mode="hexa" v-model="saison_modif.couleur1">
          </v-color-picker>
        </v-col>
        <v-col cols="6">
          <v-color-picker mode="hexa" v-model="saison_modif.couleur2">
          </v-color-picker>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="$emit('ChangeStateDialog')">
        Annulez
      </v-btn>
      <v-btn @click="createSaison">
        Valider
      </v-btn>



    </v-card-actions>
  </v-card>
</template>

<script>
import {mapState} from "vuex";
import DatePicker from "@/components/DatePicker.vue";
import axios from "axios";
export default {
  name: "createSaison",
  components: {DatePicker},
  computed: {
    ...mapState(['pays'])
  },
  props: {
    saison: Object
  },
  data () {
    return {
      saison_modif: this.saison,
      base64String: "",
    }
  },
  methods: {
    async uploadImage() {
      const file = document.querySelector('input[type=file]').files[0]
      const reader = new FileReader()

      let rawImg;
      reader.onloadend = () => {
        rawImg = reader.result
        this.base64String = rawImg
        console.log(rawImg)
      }
      reader.readAsDataURL(file)
      console.log(file)
  },
    async createSaison(){
      let newSaison = {
        dateSaison: this.saison.dateSaison.toString(),
        theme: this.saison.theme,
        paysHonneurId: this.saison.paysHonneurId,
        couleur1: this.saison.couleur1.hexa,
        couleur2: this.saison.couleur2.hexa,
        img64: this.base64String
      }
      await axios.post('/api/saisons/', newSaison)
      await this.$store.dispatch('fetchSaisons')
      this.$emit('ChangeStateDialog')
    }
  }
}
</script>

<style scoped>

</style>