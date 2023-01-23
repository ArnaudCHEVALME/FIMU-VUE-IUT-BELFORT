<template>
  <v-img :src="require('../assets/fimu.jpg')">
  <v-container fluid fill-height >
    <v-card elevation="24" class="mx-auto" >
      <v-card-title class="justify-center">
        Connexion FIMU
      </v-card-title>
      <v-card-text
        @keyup.enter="handleLogin">
        <v-form ref="form">
                <v-text-field
                    label="Login"
                    prepend-icon="mdi-account"
                    hide-details="auto"
                    v-model="user.login"
                    required
                ></v-text-field>
                <v-text-field
                    prepend-icon="mdi-key"
                    v-model="user.password"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show ? 'text' : 'password'"
                    label="Mot de passe"
                    counter
                    required
                    @click:append="show = !show"
                ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="handleLogin">
          <v-icon>
            mdi-arrow-right-circle-outline
          </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>

  </v-img>
</template>

<script>
import User from '../models/user';
export default {
  name: "LoginView",
  data: () => {
    return {
      user: new User('',''),
      loading: false,
      show: false,
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      if (this.user.login && this.user.password) {
        this.$store.dispatch('auth/login', this.user).then(
            () => {
              this.$router.push('/stats');
            },
            error => {
              this.loading = false;
              this.message =
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString();
            }
        );
      }
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/stats');
    }
  },
};
</script>

<style scoped>

</style>