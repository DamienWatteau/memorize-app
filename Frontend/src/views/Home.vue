<template>
  <div class="home columns is-multiline">
    <div class="box column is-12">
      <h1 class="title is-3 launch-quizz">{{$t('playlist.index.title')}}</h1>
      <b-button class="is-info is-light" @click="createPlaylistPrompt">{{$t('navbar.extensions.add_playlist')}}</b-button>
    </div>
    <div class="column is-narrow is-4" v-for="playlist in playlists" :key="playlist.name">
      <div class="card">
        <div class="card-content">
          <p class="title">
            {{playlist.name}}
          </p>
        </div>
        <footer class="card-footer">
          <div class="card-footer-item buttons">
            <b-button class="is-primary" icon-left="eye" @click="$router.push({name: 'show_playlist', params: {id: playlist.id}})">{{$t('card.view')}}</b-button>
            <b-button class="is-danger" icon-left="delete" @click="confirmDelete(playlist.id)">{{$t('card.delete')}}</b-button>
            <b-button class="is-info is-light" tag="router-link" :to="{'name': 'quizz', 'query': {id: playlist.id}}">{{$t('playlist.quizz')}}</b-button>
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
    ...mapActions(["createPlaylist", "getPlaylists", "deletePlaylist"]),
    confirmDelete(playlist_id){
      this.$buefy.dialog.confirm({
        message: this.$t('confirm.delete'),
        onConfirm: () => {
          this.deletePlaylist({id: playlist_id})
        }
      })
    },
    createPlaylistPrompt(){
      this.$buefy.dialog.prompt({
        message: this.$t('playlist.create.title'),
        trapFocus: true,
        onConfirm: (value) => this.createPlaylist({name: value})
      })
    }
  },
  created() {
    this.getPlaylists();
  }
}
</script>
<style lang="scss">
.launch-quizz {
  display: inline-block;
  margin-right: 30px;
  margin-bottom: 0px !important;
}
</style>
