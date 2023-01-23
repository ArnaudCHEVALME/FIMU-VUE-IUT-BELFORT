<template>
  <v-dialog
      v-model="editDialog"
  >
    <template v-slot:activator="{on, attrs}">
      <v-btn
          class="ma-2"
          v-bind="attrs"
          v-on="on"
      >
        <v-icon>mdi-moins</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        Supprimer la news
      </v-card-title>
      <v-card-subtitle>
        Etes-vous sur?
      </v-card-subtitle>
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
            @click="deleteNews"
        >
          Supprimer
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>


export default {
  name: "DeleteNews",
  methods: {
    deleteNews() {
      this.close()
      this.$emit('deleteNews', this.news)
    },
    close() {
      this.editDialog = false
    },
  }
}
</script>

<style scoped>

</style>