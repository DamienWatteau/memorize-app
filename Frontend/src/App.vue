<template>
  <v-app>
    <notifications />
    <v-app-bar
      app
      color="white"
      white
      dense
      v-if="isLoggedIn"
    >
      <div class="d-flex align-center">
        <router-link to="/">
          <v-img
            alt="Memorize Logo"
            class="shrink mr-2"
            contain
            :src="require('@/assets/logo.svg')"
            transition="scale-transition"
            width="150"
          />
        </router-link>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        text
        @click="logout"
      >
        {{$t('navbar.logout')}}
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  methods: {
    ...mapActions(["logout"])
  },
  computed: {
    ...mapGetters(["isLoggedIn"])
  },
  created() {
  if(this.isLoggedIn != true && this.$route.name != "login")
    this.$router.push("/");
  }
};
</script>
<style lang="scss">
#app {
  min-height: 100vh;
  background-color: #EEE;
}
</style>
