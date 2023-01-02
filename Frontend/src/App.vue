<template>
  <div id="app">
    <notifications />
    <div v-if="isLoggedIn">
      <b-navbar>
        <template #brand>
          <b-navbar-item tag="router-link" :to="{ path: '/' }">
              <img :src="require('@/assets/logo.svg')" />
          </b-navbar-item>
        </template>
        <template #start>
          <b-navbar-item tag="router-link" :to="{ path: '/' }">
              {{$t('navbar.home')}}
          </b-navbar-item>
          <b-navbar-dropdown>
            <template #label>
                {{$t('navbar.extension')}}
            </template>
            <b-navbar-item @click="prompt">
                {{$t('navbar.extensions.add_playlist')}}
            </b-navbar-item>
          </b-navbar-dropdown>
        </template>

        <template #end>
          <b-navbar-item tag="div">
            <div class="buttons">
                <a class="button is-light" @click="logout">
                  {{$t('navbar.logout')}}
                </a>
            </div>
          </b-navbar-item>
        </template>
      </b-navbar>
      <div class="container is-max-widescreen">
        <router-view/>
      </div>
    </div>
    <div v-else>
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  methods: {
    ...mapActions(["createPlaylist", "logout"]),
    prompt(){
      this.$buefy.dialog.prompt({
        message: this.$t('playlist.create.title'),
        trapFocus: true,
        onConfirm: (value) => this.createPlaylist({name: value})
      })
    },
  },
  computed: {
    ...mapGetters(["isLoggedIn"])
  },
  created() {
    if(this.isLoggedIn && this.$route.name != "login")
      this.$router.push("/");
  }
}
</script>

<style lang="scss">
#app {
  background-color: #EEE;
  height: 100vh;
  .navbar {
    margin-bottom: 30px;
  }
}
</style>
