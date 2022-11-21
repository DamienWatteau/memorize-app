<template>
  <div class="show-playlist">

  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["playlist"])
  },
  methods: {
    ...mapActions(["getPlaylist"])
  },
  created() {
    this.getPlaylist({id: this.$router.params["id"]});
  }
}
</script>
