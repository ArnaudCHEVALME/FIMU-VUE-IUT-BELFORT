<template>
  <v-dialog v-model="editDialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on">
        <v-icon>
          mdi-plus
        </v-icon>
      </v-btn>
    </template>
    <v-card v-if="thing">
      <v-card-title>
        <span class="text-h5">{{ formTitle }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
          <template>
            <v-date-picker
                v-model="thing.debut"
                show-adjacent-months>
            </v-date-picker>
          </template>
            </v-col>
            <v-col>
              <v-time-picker
                  v-model="thing.heure"
                  elevation="15"
              ></v-time-picker>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
              v-model="thing.duree"
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
              v-model="thing.artisteId">
            </v-select>
            </v-col>
            <v-col cols="12" sm="6" md="4">

              <v-select
              :items="scenes"
              item-text="nom"
              item-value='sceneId'
              label="Scene"
              v-model="thing.sceneId"
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
        <v-btn color="blue darken-1" text @click="submit">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: "concertModifier",
  props: {
    formTitle: String,
    propThing: Object,
  },
  data: function () {
    return {
      thing: this.propThing,
      editDialog: false,
    }
  },
  methods: {
    submit() {
      this.thing.duree = parseInt(this.thing.duree)
      this.thing.heure = this.thing.heure.toString()
      this.$emit('submit', this.thing)
      this.close()
    },
    close() {
      this.editDialog = false
    },
  },
  computed: {
    ...mapState(['concerts', 'artistes', 'scenes']),
  }
}
</script>

<style scoped>

</style>