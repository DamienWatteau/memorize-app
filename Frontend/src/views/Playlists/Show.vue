<template>
  <v-row>
    <v-col cols="8" offset="2" v-if="this.playlist != undefined">
      <v-card elevation="4">
        <v-card-title>
          <h2>{{$t('playlist.show.title')}} {{playlist.name}} ({{playlist.words.length}} words)</h2>
        </v-card-title>
        <v-card-text>
          <div class="add-action" v-if="playlist.words.length > 10">
            <div @click="addWords">
              <v-icon right>mdi-plus-circle</v-icon>
            </div>
            <v-text-field type="number" v-model.number="add_form.number"></v-text-field>
          </div>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-data-table
            :search="search"
            :headers="headers"
            :items="playlist.words"
            :footer-props="{'items-per-page-options':[30, 50, 100, -1]}"
            v-if="playlist.words != undefined">

            <template v-slot:[`item.key`]="{ item }">
              <v-text-field v-model="item.key"></v-text-field>
            </template>
            <template v-slot:[`item.value`]="{ item }">
              <v-text-field v-model="item.value"></v-text-field>
            </template>
            <template v-slot:[`item.id`]="{ item }">
              <div class="text-center">
                <v-btn dense color="error" @click="deleteWord(item)"><v-icon dark>mdi-trash-can</v-icon></v-btn>
              </div>
            </template>
          </v-data-table>
          <div class="add-action">
            <div @click="addWords">
              <v-icon right>mdi-plus-circle</v-icon>
            </div>
            <v-text-field type="number" v-model.number="add_form.number"></v-text-field>
          </div>
          <v-btn color="primary" @click="submitPlaylist">Valider</v-btn>
        </v-card-text>
      </v-card>
    </v-col>
    <p v-else>
      {{$t('playlist.show.loading')}}
    </p>
  </v-row>
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
      word_pattern: {"key":"", "key_lang": "", "value": "", "value_lang": ""},
      headers: [
        { text: '', value: 'key' },
        { text: '', value: 'value' },
        { text: '', value: 'id' }
      ],
      search: ""
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
    deleteWord(item){
      if(item.id == undefined){
        this.removeWordByIndex(item.index);
      } else {
        this.removeWord({id: item.id, playlist_id: this.$route.params["id"]})
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
