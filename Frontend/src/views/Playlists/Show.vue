<template>
  <div class="show-playlist">
    <div v-if="this.playlist != undefined">
      <div class="box">
        <div class="columns is-multiline">
          <div class="column is-12">
            <h1 class="title is-2">{{$t('playlist.show.title')}} {{playlist.name}} ({{playlist.words.length}} words)</h1>
          </div>
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
          <div class="end column is-12 add-action">
            <div @click="addWords">
              <b-icon
                pack="fas"
                icon="plus"
                size="is-large"
                @click="addWords"
                >
              </b-icon>
            </div>
            <b-field><b-input type="number" v-model="add_form.number"></b-input></b-field>
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
      add_form: {
        number: 1
      },
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
    ...mapMutations(["setPlaylist", "setWord", "removeWordByIndex"]),
    addWords(){
      for(let i = 0; i < this.add_form.number; i+=1) {
        this.setWord({...this.word_pattern})
      }
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
  },
  destroyed() {
    this.setPlaylist(null);
  }
}
</script>
<style lang="scss" scoped>
.add-action {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
<style lang="scss">
.add-action {
  input {margin-left: 10px; width: 80px;}
}
</style>
