<template>
  <v-row>
    <v-col cols="12" class="logo">
      <img :src="require('@/assets/logo.svg')" />
    </v-col>
    <v-col cols="4" offset="2">
      <Login />
    </v-col>
    <v-col cols="4">
      <Register />
    </v-col>
  </v-row>
</template>

<script>
import Register from "@/views/Register";
import Login from "@/views/Login";
import { mapGetters, mapActions } from "vuex";
export default {
  data: function(){
    return {
      form: {
        email: "",
        password: ""
      }
    }
  },
  computed: {
    ...mapGetters(["isLoggedIn"])
  },
  methods: {
    ...mapActions(["createUser"]),
    addUser(){
      this.createUser({user: this.form});
    }
  },
  created() {
    if(this.isLoggedIn)
      this.$router.push("/");
  },
  components: {
    Register, Login
  }
}
</script>
<style lang="scss" scoped>
.logo {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 300px;
  }
}
</style>
