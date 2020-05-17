<template>
  <div class="text-center my-48">
    <img class="h-48 inline-block" src="@/assets/images/main_icon.png" />
    <h1>Markbook</h1>
    <div class="text-lg">
      Open source, free, stylish markdown note keeping app. For all
      issues/suggestions, head over to
      <span
        class="text-blue-600 font-bold cursor-pointer"
        @click="openExternalUrl('https://github.com/Trolley33/markbook')"
        >my Github</span
      >.
    </div>
  </div>
</template>

<script>
import { shell } from "electron";

export default {
  name: "no-note",
  methods: {
    openExternalUrl(url) {
      shell.openExternal(url);
    }
  }
};
</script>

<style scoped>
.center-vertical {
  position: absolute;
  top: 50%;
  transform: translateY(-75%);
}
</style>
