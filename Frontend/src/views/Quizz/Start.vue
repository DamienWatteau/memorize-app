<template>
  <v-row>
    <v-col cols="12" v-if="loading">
      <h1 class="title is-3">Chargement du module en cours...</h1>
      <i class="fa fa-2x fa-spinner"></i>
    </v-col>
    <v-col cols="2" v-if="!loading && !quizzEnded">
      <v-card>
        <v-card-text>
          <p>{{this.currentWordIndex+1}} / {{this.quizz.length}}</p>
          <p>{{$t('quizz.numberOfValidWords',{number: this.validWords.length})}}</p>
          <p>{{$t('quizz.numberOfWrongWords',{number: this.wrongWords.length})}}</p>
          <v-switch
            v-model="face"
            color="blue"
            hide-details
            ></v-switch>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="10" v-if="!loading && !quizzEnded">
      <v-card>
        <v-card-text>
          {{getCurrentWordToDisplay}}
          <p v-if="visible">{{getCurrentWordToGuess}}</p>
          <v-form @submit.prevent="checkResponse">
            <v-text-field
              v-model="form.value"
            ></v-text-field>
            <v-btn class="ma-2" color="primary" @click.prevent="checkResponse">{{$t('form.submit')}}</v-btn>
            <v-btn class="ma-2" color="secondary" @click="visible = true;">Montrer le mot</v-btn>
            <v-btn class="ma-2" color="secondary" @click="saveStatus(true)">Passer le mot en valide</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" v-if="quizzEnded">
      <v-btn color="primary" @click="resetWords" v-if="wrongWords.length > 0">Restart</v-btn>
      <v-btn color="primary" @click="resetQuizz" v-if="wrongWords.length == 0">Redémarré la série</v-btn>
      <v-data-table
        :headers="headers"
        :items="wrongWords"
        disable-pagination
      ></v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: function(){
    return {
      form: {
        value: ""
      },
      loading: true,
      visible: false,
      headers: [{text: "", value: "key"}, {text: "", value: "value"}],
      face: false
    }
  },
  computed: {
    ...mapGetters(["quizz", "currentWord", "validWords", "wrongWords", "numberOfWordsTreated"]),
    currentWordIndex(){
      return this.quizz.findIndex(f => f["id"] == this.currentWord["id"])
    },
    quizzEnded(){
      return this.numberOfWordsTreated == this.quizz.length;
    },
    getQuizzMode(){
      let tmp = JSON.parse(this.$route.query.step2);
      if(tmp?.option)
        return tmp.option;
      else {
        return "read";
      }
    },
    getCurrentWordToDisplay(){
      return this.face ? this.currentWord.value:this.currentWord.key
    },
    getCurrentWordToGuess(){
      return this.face ? this.currentWord.key:this.currentWord.value
    },
    getQuizzWords(){
      let tmp = JSON.parse(this.$route.query.step1);
      if(tmp?.option)
        return tmp;
      else {
        return {option: "all"};
      }
    }
  },
  methods: {
    ...mapActions(["getQuizz", "setWordStatus", "resetWords"]),
    checkResponse(){
      let status = this.form.value.toLowerCase() == this.getCurrentWordToGuess.toLowerCase();
      this.saveStatus(status);
    },
    saveStatus(status){
      this.visible = false;
      let payload = this.currentWord;
      payload["valid"] = status;
      this.setWordStatus(payload).then(() => {
        this.form.value = "";
      });
    },
    resetQuizz(){
      location.reload();
    }
  },
  created() {
    this.getQuizz({id: this.$route.query.id, words: this.getQuizzWords, mode: this.getQuizzMode}).then(() => {
      this.loading = false;
    });
  }
}
</script>
<style lang="scss" scoped>
.card {height: 100%}
.waiting-card {text-align: center;}
</style>
