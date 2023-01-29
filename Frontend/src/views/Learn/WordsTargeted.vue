<template>
  <v-row>
    <v-col cols="4">
      <v-card>
        <v-card-title>
          Travailler toute la playlist
        </v-card-title>
        <v-card-text>
          <v-radio-group
            v-model="form.optionSelected" column>
            <v-radio
              label="Choisir cette option"
              value="all"
            ></v-radio>
          </v-radio-group>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="4">
      <v-card>
        <v-card-title>
          Travailler seulement les X derniers
        </v-card-title>
        <v-card-text>
          <v-text-field
            type="number"
            v-model.number="form.x_words.value"
          ></v-text-field>
          <v-radio-group
            v-model="form.optionSelected" column>
            <v-radio
              label="Choisir cette option"
              value="x_words"
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
        optionSelected: "all",
        x_words: {
          value: 20
        }
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
