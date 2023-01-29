<template>
  <v-row>
    <v-col>
      <v-stepper v-model="activeStep">
        <v-stepper-header>
          <v-stepper-step :complete="activeStep > 1" step="1">
            Choisir les mots
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="2">
            Choisir le mode d'apprentissage
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <WordsTargeted ref="wordsTargeted"/>
            <v-btn color="primary" @click="goToNextStep(1)">Continue</v-btn>
            <v-btn text to="/">Cancel</v-btn>
          </v-stepper-content>

          <v-stepper-content step="2">
            <ModeTargeted ref="modeTargeted"/>

            <v-btn
              color="primary"
              @click="goToNextStep(2)"
            >
              Continue
            </v-btn>

            <v-btn text to="/">
              Cancel
            </v-btn>
          </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
  </v-col>
</v-row>
</template>

<script>
import WordsTargeted from "@/views/Learn/WordsTargeted";
import ModeTargeted from "@/views/Learn/ModeTargeted";
export default {
  data: function(){
    return {
      activeStep: 1,
      stepValues: {}
    }
  },
  computed: {},
  methods: {
    goToNextStep(step){
      switch(step){
        case 1:
          this.stepValues["step1"] = this.$refs.wordsTargeted.submit();
          this.activeStep = 2;
          break;
        case 2:
          this.stepValues["step2"] = this.$refs.modeTargeted.submit();
          this.$router.push({
            name: "quizz",
            query: {id: this.$route.query.id, step1: JSON.stringify(this.stepValues["step1"]), step2: JSON.stringify(this.stepValues["step2"])}
          })
          break;
      }
    }
  },
  components: {
    WordsTargeted, ModeTargeted
  }
}
</script>
<style lang="scss" scoped></style>
