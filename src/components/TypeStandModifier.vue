<template>
  <v-dialog
    v-model="editDialog"
  >
    <template v-slot:activator="{on, attrs}">
      <v-btn
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-pensil</v-icon>
      </v-btn>
    </template>

    <v-card v-if="thing">
      <v-card-title>
        <span class="text-h5">{{formTitle}}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-col>
            <v-row>
              <v-text-field
                v-model="thing.libelle"
                label="Changer le nom du type de stand"
                >
              </v-text-field>
            </v-row>
          </v-col>
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

export default {
  name: "TypeStandModifier",
  props: {
    formTitle: String,
    propThing: Object
  },
  data: function (){
    return {
      thing: this.propThing,
      editDialog:false
    }
  },
  methods: {
    submit(){
      this.close()
      this.$emit('submit', this.thing)
    },
    close(){
      this.editDialog = false
    }
  }
}
</script>

<style scoped>

</style>