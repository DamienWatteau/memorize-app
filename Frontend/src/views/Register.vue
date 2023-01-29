<template>
  <v-card elevation="2" dense rounded>
    <v-card-title>
      <h2>{{$t("register.title")}}</h2>
    </v-card-title>
    <v-card-text>
      <v-form @submit.prevent="addUser">
        <v-text-field
          v-model="form.first_name"
          :label="$t('form.first_name')">
        </v-text-field>
        <v-text-field
          v-model="form.last_name"
          :label="$t('form.last_name')">
        </v-text-field>
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
          @click.prevent="addUser">
          {{$t('register.form.submit')}}
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
        first_name: "",
        last_name: "",
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
    ...mapActions(["createUser"]),
    addUser(){
      this.createUser({user: this.form});
    }
  }
}
</script>
<style lang="scss" scoped></style>
