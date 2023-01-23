<template>
  <v-container>
    <v-btn @click="openCreate">
      Créer un utilisateur
    </v-btn>
    <v-data-table v-if="users.lenght != 0" :items="users" :headers="[
      { text: 'login', value: 'login' },
      { text: 'Email', value: 'email' },
      { text: 'role', value: 'role.name' },
      { text: 'actions', value: 'actions', align: 'end' }
    ]">


      <template v-slot:[`item.actions`]="{ item }">
        <UserModifier 
        icon="mdi-pencil" 
        formTitle="User" 
        :propThing='item'
        @submit="updateUser"
        ></UserModifier>
        <v-icon small @click="deleteDialog = true">
          mdi-delete
        </v-icon>



        <v-dialog v-model="deleteDialog">
          <v-card>
            <v-card-title>
              Voulez vous vraiment supprimer cette utilisateur ?
            </v-card-title>
            <v-card-actions>
              <v-btn @click="deleteDialog = false">annulez</v-btn>
              <v-btn @click="deleteUser(item)">confirmer</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </template>

    </v-data-table>

     


    <v-dialog
        v-model="createDialog"
    >
      <v-card>
        <v-card-title>
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
                    v-model="login"
                    label="login"
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <v-text-field
                    v-model="email"
                    label="mail"
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <v-text-field v-model="password"
                              label="mot de passe">

                </v-text-field>
                <v-select v-model="roleId" :items="roles" item-text="name" item-value="roleId" label="Choix du Role  "></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="blue darken-1"
              text
              @click="createDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
              color="blue darken-1"
              text
              @click="createUser"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>




  </v-container>
  
</template>

<script>
//import

import axios from "axios";
import {mapState} from "vuex";
import UserModifier from "@/components/UserModifier.vue";

export default {
  name: "UserView",
  data() {
    return {
      createDialog: false,
      login: "",
      email: "",
      password: "",
      roleId: null,
      deleteDialog: false,
    }
  },
  computed: {
    ...mapState(["users", "roles"]),
  },
  methods: {
    async deleteUser(item){
      console.log(item);
      try {
        
        await axios.delete("/api/users/" + item.userId)
        await this.$store.dispatch("fetchUsers")
      } catch (error) {
        console.error(error)
      }
    },
    async updateUser(user){
      try {
        await axios.put("api/auth/" + user.userId, user)
        await this.$store.dispatch("fetchUsers")
        this.deleteDialog = false
      } catch (error) {
        console.error(error)
      }
    },
    closeCreate(){
      this.createDialog = false
    },
    openCreate(){
      this.createDialog = true
      this.login = ""
      this.email = ""
      this.password = ""
      this.roleId = null
    },
    async createUser(){
      let user = {
        login: this.login,
        email: this.email,
        password: this.password,
        roleId: this.roleId
      }
      try{
        await axios.post("/api/auth/signup", user)
        await this.$store.dispatch("fetchUsers")
        this.closeCreate()
      }catch (e) {
        console.error(e)
      }
    }
  },
  components:
  {
    UserModifier
  }
}

</script>

<style scoped>

</style>