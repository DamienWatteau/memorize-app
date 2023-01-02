<template>
  <div class="column is-narrow is-offset-2 is-4">
    <div class="card">
      <div class="card-content">
        <div class="columns">
          <div class="column is-12">
            <p class="title">
              {{$t("login.title")}}
            </p>
            <form @submit.prevent="authenticate">
              <b-field :label="$t('form.email')">
                <b-input v-model="form.email"></b-input>
              </b-field>
              <b-field :label="$t('form.password')">
                <b-input type="password"
                  v-model="form.password"
                  password-reveal>
                </b-input>
              </b-field>
              <input class="button is-primary margin-bottom" :value="$t('login.form.submit')" type="submit" @click.prevent="authenticate" />
            </form>
          </div>
        </div>
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
        email: "",
        password: ""
      }
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
