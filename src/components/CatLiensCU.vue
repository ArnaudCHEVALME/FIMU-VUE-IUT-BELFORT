<template>
  <v-dialog
      v-model="editDialog"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-icon v-on="on" v-bind="attrs">{{ icon }}</v-icon>
    </template>

    <v-card v-if="cat">
      <v-card-title>
        <span class="text-h5">{{ formTitle }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-text-field
                v-model="cat.libelle"
                label="Nom de la catégorie"
            ></v-text-field>
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
            @click="send"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>

export default {
  name: "CatLiensCU",
  props: {
    formTitle: String,
    propCat: Object,
    icon: String
  },
  data: function () {
    return {
      cat: this.propCat,
      editDialog: false
    }
  },
  methods: {
    send(){
      this.close()
      console.log("in catCU")
      console.log(this.cat)
      this.$emit('send', this.cat)
    },
    close() {
      this.editDialog = false
    },
  }
}
</script>

<style scoped>

</style>