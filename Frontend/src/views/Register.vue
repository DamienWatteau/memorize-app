<template>
  <div class="column is-narrow is-4">
    <div class="card">
      <div class="card-content">
        <p class="title">
          {{$t("register.title")}}
        </p>
        <form @submit.prevent="addUser">
          <b-field :label="$t('form.first_name')">
            <b-input type="text"
              v-model="form.first_name">
            </b-input>
          </b-field>
          <b-field :label="$t('form.last_name')">
            <b-input type="text"
              v-model="form.last_name">
            </b-input>
          </b-field>
          <b-field :label="$t('form.email')">
            <b-input v-model="form.email"></b-input>
          </b-field>
          <b-field :label="$t('form.password')">
            <b-input type="password"
              v-model="form.password"
              password-reveal>
            </b-input>
          </b-field>
          <input class="button is-primary margin-bottom" :value="$t('register.form.submit')" type="submit" @click.prevent="addUser" />
        </form>
      </div>
    </div>
  </div>
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
      }
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
