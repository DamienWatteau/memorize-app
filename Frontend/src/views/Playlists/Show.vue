<template>
  <div class="show-playlist">
    <div v-if="this.playlist != undefined">
      <div class="box">
        <div class="columns is-multiline">
          <b-table
            class="column is-12"
            :data="playlist.words">

            <b-table-column field="key" label="" v-slot="props">
                <b-field><b-input v-model="props.row.key"></b-input></b-field>
            </b-table-column>

            <b-table-column field="value" label="" v-slot="props">
                <b-field><b-input v-model="props.row.value"></b-input></b-field>
            </b-table-column>

            <b-table-column field="action" label="" v-slot="props">
                <!-- {{props}} -->
                <b-button class="is-danger" icon-left="delete" @click="deleteWord(props)"></b-button>
            </b-table-column>
          </b-table>
          <div class="end column is-12 add-action" @click="addWord">
            <b-icon
              pack="fas"
              icon="plus"
              size="is-medium"
              @click="addWord"
              >
            </b-icon>
          </div>
        </div>
      </div>
        <b-button type="is-primary" @click="submitPlaylist">Valider</b-button>
    </div>
    <p v-else>
      {{$t('playlist.show.loading')}}
    </p>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  data: function(){
    return {
      table: {
        columns: ["key", "value"]
      },
      word_pattern: {"key":"", "key_lang": "", "value": "", "value_lang": ""}
    }
  },
  computed: {
    ...mapGetters(["playlist"])
  },
  methods: {
    ...mapActions(["getPlaylist", "removeWord", "savePlaylist"]),
    ...mapMutations(["setWord", "removeWordByIndex"]),
    addWord(){
      this.setWord(this.word_pattern)
    },
    deleteWord(props){
      if(props.row.id == undefined){
        this.removeWordByIndex(props.index);
      } else {
        this.removeWord({id: props.row.id, playlist_id: this.$route.params["id"]})
      }
    },
    submitPlaylist(){
      this.savePlaylist({id: this.$route.params["id"]});
    }
  },
  created() {
    let playlistId = this.$route.params["id"];
    if(this.playlist == undefined){
      this.getPlaylist({id: playlistId});
    }
  }
}
</script>
<style lang="scss" scoped>
.add-action {text-align: center;}
</style>
