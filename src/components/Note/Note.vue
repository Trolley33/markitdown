<template>
  <div>
    <div v-if="note && (note.id !== 0)" class="p-4">
      <h2 class="text-3xl">{{note.title}}</h2>

      <div>{{note.body}}</div>
    </div>
    <div v-else class="text-center pt-10">
      <img class="h-48 inline-block" src="@/assets/images/main_icon.png" />
      <h1 class="text-4xl">Markbook</h1>
      <div>
        Open source, free, stylish markdown note keeping app.
        For all issues/suggestions, head over to
        <span
          class="text-blue-600 font-bold cursor-pointer"
          @click="openExternalUrl('https://github.com/Trolley33/markbook')"
        >my Github</span>.
      </div>
    </div>
  </div>
</template>

<script>
import { shell } from "electron";

export default {
  name: "note-full",
  data: () => ({}),
  computed: {
    /**
     * Return current note object.
     */
    note() {
      return this.$store.state.selectedNote;
    }
  },
  methods: {
    openExternalUrl(url) {
      shell.openExternal(url);
    }
  }
};
</script>

<style scoped>
</style>
