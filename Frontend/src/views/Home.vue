<template>
  <v-row>
    <v-col cols="12">
      <v-card elevation="4">
        <v-card-title>
          <h2 class="launch-quizz">{{$t('playlist.index.title')}}</h2>
          <v-btn color="info" @click="createPlaylistPrompt">{{$t('navbar.extensions.add_playlist')}}</v-btn>
        </v-card-title>
      </v-card>
    </v-col>

    <v-col
      cols="5"
      v-for="playlist in playlists" :key="playlist.name">
      <v-card elevation="4">
        <v-card-title>
          <h2>{{playlist.name}}</h2>
        </v-card-title>
        <v-card-actions>
          <v-btn color="secondary" @click="$router.push({name: 'show_playlist', params: {id: playlist.id}})">
            <v-icon dark left>mdi-eye</v-icon>
            {{$t('card.view')}}
          </v-btn>
          <v-btn color="error" @click="confirmDelete(playlist.id)"><v-icon dark left>mdi-trash-can</v-icon> {{$t('card.delete')}}</v-btn>
          <v-btn color="info" :to="{'name': 'pre_quizz', 'query': {id: playlist.id}}"><v-icon dark left>mdi-play</v-icon> {{$t('playlist.quizz')}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["playlists"])
  },
  methods: {
    ...mapActions(["createPlaylist", "getPlaylists", "deletePlaylist"]),
    async confirmDelete(playlist_id){
      const response = await this.$dialog.confirm({
        text: this.$t('confirm.delete')
      });
      if(response)
        this.deletePlaylist({id: playlist_id});
    },
    async createPlaylistPrompt(){
      let response = await this.$dialog.prompt({
        text: this.$t('playlist.create.title')
      });
      if(response)
        this.createPlaylist({name: response});
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
.v-card__actions {
  display: flex;
  justify-content: center;
}
</style>
