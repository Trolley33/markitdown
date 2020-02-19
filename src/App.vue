<template>
  <div id="app">
    <div class="sidebar-wrapper">
      <Notebar />
    </div>
    <div class="content-wrapper">
      <router-view />
    </div>
  </div>
</template>

<script>
import Notebar from "./components/Notebar";

export default {
  components: {
    Notebar
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
  width: 260px;
}

.content-wrapper {
  margin-left: 260px;
}
</style>
