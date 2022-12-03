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
    <div class="column is-narrow is-2" v-if="!loading">
      <div class="card">
        <div class="card-content">
          <p>{{this.currentWordIndex+1}} / {{this.quizz.length}}</p>
          <p>{{$t('quizz.numberOfValidWords',{number: this.numberOfValidWords})}}</p>
          <p>{{$t('quizz.numberOfWrongWords',{number: this.numberOfWrongWords})}}</p>
        </div>
      </div>
    </div>
    <div class="column is-narrow is-10" v-if="!loading">
      <div class="card">
        <div class="card-content">
          {{this.currentWord.key}}
          <form @submit.prevent="submitResponse">
            <b-field><b-input v-model="form.value"></b-input></b-field>
            <input class="button is-primary margin-bottom" :value="$t('form.submit')" type="submit" @click.prevent="checkResponse" />
          </form>
        </div>
      </div>
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
      loading: true
    }
  },
  computed: {
    ...mapGetters(["quizz", "currentWord", "numberOfValidWords", "numberOfWrongWords"]),
    currentWordIndex(){
      return this.quizz.findIndex(f => f["id"] == this.currentWord["id"])
    }
  },
  methods: {
    ...mapActions(["getQuizz", "setWordStatus"]),
    checkResponse(){
      let payload = this.currentWord;
      payload["valid"] = this.form.value.toLowerCase() == this.currentWord.key.toLowerCase();
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
