<template>
  <v-dialog
    v-model="editDialog"
  >
    <template v-slot:activator="{ on, attrs }">
     
        <v-icon       
          v-bind="attrs"
          v-on="on" 
          >{{ icon }}
        </v-icon>

    </template>

    <v-card v-if="thing">
      <v-card-title>
        <span class="text-h5">{{ formTitle }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col
                cols="12"
                sm="6"
                md="4"
            >
              <v-text-field
                  v-model="thing.login"
                  label="Changer login"
              ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                sm="6"
                md="4"
            >
              <v-text-field
                  v-model="thing.email"
                  label="Changer mail"
              ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                sm="6"
                md="4"
            >
              <v-text-field v-model="password"
              label="Changer le mot de passe">

              </v-text-field>
              <v-select v-model="role" :items="roles" item-text="name" item-value="roleId" label="Choix du Role  "></v-select>
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
  computed: {
    ...mapState(["roles"]),
  },
  props: {
    formTitle: String,
    propThing: Object,
    icon: String
  },
  data: function () {
    return {
      thing: this.propThing,
      editDialog:false,
      password: "",
      role: this.propThing.role
    }
  },
  methods: {
    submit () {
      if(this.password.length == 0 || this.password == null)
        delete this.thing['password']
      this.thing.roleId = this.role
      console.log(this.thing.roleId)
      this.$emit('submit', this.thing)
      this.close()
    },
    close() {
      this.editDialog = false
    }
  }
}
</script>

<style scoped>

</style>