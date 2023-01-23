<template>
  <v-dialog
    v-model="editDialog"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs" v-on="on"
      >
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
              <v-text-field v-model="editedItem.libelle" label="Libelle genre"></v-text-field>
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
          Cancel
        </v-btn>
        <v-btn
            color="blue darken-1"
            text
            @click="submit"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>

import {mapState} from "vuex";

export default {
  name: "genreModifier",
  props: {
    formTitle: String,
    propThing: Object,
  },
  data: function () {
    return {
      thing: this.propThing,
      editDialog:false,
    }
  },
  methods: {
    submit () {
      this.$emit('submit', this.thing)
      this.close()
    },
    close() {
      this.editDialog = false
    }
  },
  computed: {
    ...mapState(['genres'])
  }
}
</script>

<style scoped>

</style>