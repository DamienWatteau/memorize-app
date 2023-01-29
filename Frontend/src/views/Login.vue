<template>
  <v-card elevation="2" dense rounded>
    <v-card-title>
      <h2>{{$t("login.title")}}</h2>
    </v-card-title>
    <v-card-text>
      <v-form @submit.prevent="authenticate">
        <v-text-field
          v-model="form.email"
          :label="$t('form.email')">
        </v-text-field>
        <v-text-field
          v-model="form.password"
          :append-icon="passwordReveal ? 'mdi-eye' : 'mdi-eye-off'"
          :type="passwordReveal ? 'text' : 'password'"
          :label="$t('form.password')"
          @click:append="passwordReveal = !passwordReveal">
        </v-text-field>
        <v-btn
          type="submit"
          @click.prevent="authenticate">
          {{$t('login.form.submit')}}
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: function(){
    return {
      form: {
        email: "",
        password: ""
      },
      passwordReveal: false
    }
  },
  computed: {
    ...mapGetters(["isLoggedIn"])
  },
  methods: {
    ...mapActions(["login"]),
    authenticate(){
      this.login({user: this.form});
    }
  }
}
</script>
<style lang="scss" scoped></style>
