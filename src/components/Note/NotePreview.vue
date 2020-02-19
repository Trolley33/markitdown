<template>
  <div class="note-preview" :class="getClasses" @click="click">
    <div class="px-3 py-2">
      <div class="text-lg">{{note.title}}</div>
      <div class="oneline">{{note.body}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "note-preview",
  props: {
    selected: Boolean,
    note: Object
  },
  data: () => ({}),
  computed: {
    getClasses() {
      return {
        selected: this.selected
      };
    }
  },
  methods: {
    click() {
      this.$emit("click");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.note-preview {
  @apply bg-gray-200;
  border-bottom: 1px rgba(0, 0, 0, 0.1) solid;
}
.note-preview:hover {
  @apply bg-gray-300;
}

.selected {
  @apply bg-blue-500;
  @apply text-gray-100;
}
.selected:hover {
  @apply bg-blue-500;
  @apply text-gray-100;
}

.oneline {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
