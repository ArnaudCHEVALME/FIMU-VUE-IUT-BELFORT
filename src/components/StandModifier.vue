<template>
  <v-dialog
    v-model="editDialog"
  >
    <template v-slot:activator="{on, attrs}">
      <v-btn
        v-bind="attrs"
        v-on="on"
        >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>

    <v-card v-if="thing">
      <v-card-title>
        <span class="text-h5">{{formTitle}}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="4"
            >
              <v-row>
                <v-text-field
                    v-model="thing.nom"
                    label="Changer nom du stand">
                </v-text-field>
              </v-row>
              <v-row>
                <v-select
                  :items="typeStands"
                  item-text="libelle"
                  item-value="typeStandId"
                  label="Changer de type de stand"
                  v-model="thing.typeStandsId"
                >
                </v-select>
              </v-row>
              <v-row>
                <v-text-field
                  v-model="thing.latitude"
                  label="Changer la latitude du stand"
                >
                </v-text-field>
              </v-row>
              <v-row>
                <v-text-field
                  v-model="thing.longitude"
                  label="CHanger la longitude du stand"
                >
                </v-text-field>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          @click="close"
          >
          Annuler
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="submit"
          >
          Update
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapState} from "vuex";
export default {
  name: "StandModifier",
  props:{
    formTitle: String,
    propThing: Object,
  },
  data: function (){
    return {
      thing: this.propThing,
      editDialogue: false,
    }
  },
  methods: {
    submit(){
      this.close()
      this.$emit('submit', this.thing)
    },
    close() {
      this.editDialogue = false
    },
    computed: {
      ...mapState(['typesStands'])
    }
  }
}
</script>

<style scoped>

</style>