<template>
  <div class="note-preview" :class="getResponsiveClasses" @click="click">
    <div class="px-3 py-2">
      <div class="text-lg">{{note.title}}</div>
      <div class="text-sm text-blue-500" :class="getResponsiveClasses">{{ time }}</div>
      <div class="oneline">{{ plainBody }}</div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import marked from "marked";

export default {
  name: "note-preview",
  props: {
    selected: Boolean,
    note: Object
  },
  data: () => ({}),
  computed: {
    /**
     * Adds classes based to current note based on app state.
     */
    getResponsiveClasses() {
      return {
        selected: this.selected
      };
    },
    /**
     * Returns current note's time as 'x days/weeks/etc. ago'
     */
    time() {
      return moment(this.note.created_at).fromNow();
    },
    /**
     * Removes markdown from body to show in preview text.
     */
    plainBody() {
      const html = marked(this.note.body);
      const div = document.createElement("div");
      div.innerHTML = html;
      const text = div.innerText;
      div.remove();
      return text;
    }
  },
  methods: {
    /**
     * Triggers current note to be selected.
     */
    click() {
      this.$store.commit("selectNote", this.note);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* Default note-preview classes. */
.note-preview {
  @apply bg-gray-200;
  border-bottom: 1px rgba(0, 0, 0, 0.1) solid;
}
.note-preview:hover {
  @apply bg-gray-300;
}

/* Special case for currently selected note. */
.selected {
  @apply bg-blue-500;
  @apply text-gray-100;
}
.selected:hover {
  @apply bg-blue-500;
  @apply text-gray-100;
}

/* Set text to be oneline and have '...' on end. */
.oneline {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
