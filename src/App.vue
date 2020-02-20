<template>
  <div id="app" tabindex="0" @keydown.esc="escapePressed" class="flex" style="max-width:100vw;">
    <div class="sidebar-wrapper flex-none">
      <notebar />
    </div>
    <div class="content-wrapper flex-auto">
      <note-full />
    </div>
  </div>
</template>

<script>
import Notebar from "@/components/Notebar/Notebar";
import NoteFull from "@/components/Note/Note";

export default {
  components: {
    Notebar,
    NoteFull
  },
  methods: {
    escapePressed() {
      console.log("Escape pressed");
      this.$store.commit("selectNote", {
        id: 0,
        title: "",
        body: "",
        created_at: ""
      });
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  outline: none;
}

.sidebar-wrapper {
  /* float: left; */
  width: 275px;
}

.content-wrapper {
  /* margin-left: 280px; */
}
</style>
