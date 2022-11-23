<template>
  <div class="login columns is-multiline">
    <div class="column is-narrow is-offset-4 is-3">
      <div class="card">
        <div class="card-content">
          <p class="title">
            Login
          </p>
          <form @submit.prevent="authenticate">
            <b-field label="Email">
              <b-input v-model="form.email"></b-input>
            </b-field>
            <b-field label="Password">
              <b-input type="password"
                v-model="form.password"
                password-reveal>
              </b-input>
            </b-field>
            <input class="button is-primary margin-bottom" type="submit" @click.prevent="authenticate" />
          </form>
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
  },
  created() {
    if(this.isLoggedIn)
      this.$router.push("/");
  }
}
</script>
<style lang="scss" scoped>
.card {margin-top: 20px;}
</style>
