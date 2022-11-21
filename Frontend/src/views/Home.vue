<template>
  <div class="home columns">
    <div class="column is-narrow is-one-quarter" v-for="playlist in playlists" :key="playlist.name">
      <div class="card">
        <div class="card-content">
          <p class="title">
            {{playlist.name}}
          </p>
        </div>
        <footer class="card-footer">
          <div class="card-footer-item buttons">
            <b-button class="is-primary" icon-left="eye">{{$t('card.view')}}</b-button>
            <b-button class="is-danger" icon-left="delete" @click="confirmDelete(playlist.id)">{{$t('card.delete')}}</b-button>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["playlists"])
  },
  methods: {
    ...mapActions(["getPlaylists", "deletePlaylist"]),
    confirmDelete(playlist_id){
      this.$buefy.dialog.confirm({
        message: this.$t('confirm.delete'),
        onConfirm: () => {
          this.deletePlaylist({id: playlist_id})
        }
      })
    }
  },
  created() {
    this.getPlaylists();
  }
}
</script>
<style lang="scss">
</style>
