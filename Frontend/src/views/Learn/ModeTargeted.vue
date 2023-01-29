<template>
  <v-row>
    <v-col cols="4">
      <v-card>
        <v-card-title>
          Mode Lecture
        </v-card-title>
        <v-card-text>
          <v-radio-group
            v-model="form.optionSelected" column>
            <v-radio
              label="Choisir cette option"
              value="read"
            ></v-radio>
          </v-radio-group>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="4">
      <v-card>
        <v-card-title>
          Mode Ecriture
        </v-card-title>
        <v-card-text>
          <v-radio-group
            v-model="form.optionSelected" column>
            <v-radio
              label="Choisir cette option"
              value="write"
            ></v-radio>
          </v-radio-group>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: function(){
    return {
      form: {
        optionSelected: "write"
      }
    }
  },
  computed: {},
  methods: {
    submit(){
      return {option: this.form.optionSelected, value: this.form[this.form.optionSelected]?.value}
    }
  }
}
</script>
<style lang="scss" scoped>
.actions {
  display: flex;
  justify-content: center;
}

</style>
