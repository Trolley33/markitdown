<template>
  <div v-if="note && (note.id !== 0)" class="p-4">
    <h2 class="text-xl">{{note.title}}</h2>
    <div class="oneline">{{note.body}}</div>
  </div>
</template>

<script>
export default {
  name: "note-full",
  data: () => ({}),
  computed: {
    note() {
      return this.$store.state.selectedNote;
    }
  },
  methods: {}
};
</script>

<style scoped>
</style>
