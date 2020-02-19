<template>
  <div id="app">
    <div class="sidebar-wrapper">
      <notebar />
    </div>
    <div class="content-wrapper">
      <note-full />
    </div>
  </div>
</template>

<script>
import Notebar from "@/components/Notebar";
import NoteFull from "@/components/Note/NoteFull";

export default {
  components: {
    Notebar,
    NoteFull
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.sidebar-wrapper {
  float: left;
  width: 280px;
}

.content-wrapper {
  margin-left: 280px;
}
</style>
