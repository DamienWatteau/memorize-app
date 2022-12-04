<template>
  <div class="start-quizz columns">
    <div class="column is-12" v-if="loading">
      <div class="card waiting-card">
        <div class="card-content">
          <h1 class="title is-3">Chargement du module en cours...</h1>
          <i class="fa fa-2x fa-spinner"></i>
        </div>
      </div>
    </div>
    <div class="column is-narrow is-2" v-if="!loading && !quizzEnded">
      <div class="card">
        <div class="card-content">
          <p>{{this.currentWordIndex+1}} / {{this.quizz.length}}</p>
          <p>{{$t('quizz.numberOfValidWords',{number: this.validWords.length})}}</p>
          <p>{{$t('quizz.numberOfWrongWords',{number: this.wrongWords.length})}}</p>
        </div>
      </div>
    </div>
    <div class="column is-narrow is-10" v-if="!loading && !quizzEnded">
      <div class="card">
        <div class="card-content">
          {{this.currentWord.key}}
          <p v-if="visible">{{this.currentWord.value}}</p>
          <form @submit.prevent="submitResponse">

            <b-field><b-input v-model="form.value"></b-input></b-field>
            <input class="button is-primary margin-bottom" :value="$t('form.submit')" type="submit" @click.prevent="checkResponse" />
            <b-button @click="visible = true;">je sais pas</b-button>
          </form>
        </div>
      </div>
    </div>
    <div class="column is-12" v-if="quizzEnded">
      <b-button class="button is-primary" @click="resetWords">Restart</b-button>
      <b-table
        :data="wrongWords">
        <b-table-column field="key" label="" v-slot="props">
            <b-field><b-input v-model="props.row.key" disabled="true"></b-input></b-field>
        </b-table-column>

        <b-table-column field="value" label="" v-slot="props">
            <b-field><b-input v-model="props.row.value" disabled="true"></b-input></b-field>
        </b-table-column>
      </b-table>
    </div>
  </div>
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
      visible: false
    }
  },
  computed: {
    ...mapGetters(["quizz", "currentWord", "validWords", "wrongWords", "numberOfWordsTreated"]),
    currentWordIndex(){
      return this.quizz.findIndex(f => f["id"] == this.currentWord["id"])
    },
    quizzEnded(){
      return this.numberOfWordsTreated == this.quizz.length;
    }
  },
  methods: {
    ...mapActions(["getQuizz", "setWordStatus", "resetWords"]),
    checkResponse(){
      this.visible = false;
      let payload = this.currentWord;
      payload["valid"] = this.form.value.toLowerCase() == this.currentWord.value.toLowerCase();
      this.setWordStatus(payload).then(() => {
        this.form.value = "";
      });
    }
  },
  created() {
    this.getQuizz().then(() => {
      this.loading = false;
    });
  }
}
</script>
<style lang="scss" scoped>
.card {height: 100%}
.waiting-card {text-align: center;}
</style>
