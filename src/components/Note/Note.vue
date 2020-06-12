<template>
  <div>
    <div v-if="note && note.id !== 0" class="pt-4 px-4" ref="container">
      <div ref="note_header" class="mb-2">
        <editable-h1 @update="updateTitle">{{ note.title }}</editable-h1>
        <note-toolbar :preview="preview" @toggle-preview="togglePreview" />
        <hr />
      </div>
      <div>
        <div
          ref="preview_box"
          class="overflow-y-auto"
          v-show="preview"
          v-html="renderedBody"
          @dblclick="togglePreview"
        ></div>
        <textarea
          ref="editor"
          v-show="!preview"
          class="w-full p-1 resize-none"
          style="box-sizing: border-box;"
          v-model="tempBody"
          @keydown.tab.exact="tabPressed"
          @keydown.shift.tab.exact="shiftTabPressed"
        ></textarea>
      </div>
    </div>
    <no-note v-else />
  </div>
</template>

<script>
import marked from "marked";
import dompurify from "dompurify";
import _ from "lodash";

import hljs from "highlight.js";

import NoNote from "@/components/Note/NoNote";
import NoteToolbar from "@/components/Note/NoteToolbar";
import EditableH1 from "@/components/Utilities/EditableH1";

export default {
  name: "note-full",
  components: {
    NoNote,
    NoteToolbar,
    EditableH1
  },
  data: () => ({
    preview: true,
    tempBody: ""
  }),
  mounted() {
    window.addEventListener("resize", _.debounce(this.windowResize, 250));
    const vm = this;
    this.$nextTick(() => {
      vm.windowResize();
      vm.highlightCodeBlocks();
    });
  },
  watch: {
    note(to, from) {
      if (this.preview === false) {
        this.$store.commit("updateNote", { id: from.id, body: this.tempBody });
      }
      this.preview = true;
      const vm = this;
      this.$nextTick(() => {
        vm.windowResize();
        vm.highlightCodeBlocks();
      });
    }
  },
  computed: {
    /**
     * Return current note object.
     */
    note() {
      return this.$store.getters.getSelectedNote;
    },
    /**
     *
     */
    renderedBody() {
      return dompurify.sanitize(marked(this.note.body));
    }
  },
  methods: {
    windowResize() {
      if (!this.note || this.note.id === 0) return;
      const remaining_h =
        document.documentElement.clientHeight -
        this.$refs.note_header.clientHeight -
        32;
      this.$refs.editor.style.height = `${remaining_h}px`;
      this.$refs.preview_box.style.height = `${remaining_h}px`;
    },
    updateTitle(newTitle) {
      this.$store.commit("updateNote", {
        id: this.note.id,
        title: newTitle
      });
    },
    togglePreview() {
      if (this.preview === true) {
        this.tempBody = this.note.body;
        this.preview = false;
      } else {
        this.$store.commit("updateNote", {
          id: this.note.id,
          body: this.tempBody
        });
        this.preview = true;
        // After content has loaded back into DOM, go through each code block and apply highlighting.
        const vm = this;
        this.$nextTick(() => {
          vm.highlightCodeBlocks;
        });
      }
    },
    highlightCodeBlocks() {
      document.querySelectorAll("code").forEach(block => {
        hljs.highlightBlock(block);
      });
    },
    editBody(e) {
      this.tempBody = e.target.innerText;
    },
    tabPressed(e) {
      e.preventDefault();
      const field = e.target;
      const start = e.target.selectionStart;
      field.value =
        field.value.substring(0, start) +
        "\t" +
        field.value.substring(start, field.value.length);
      e.target.selectionStart = e.target.selectionEnd = start + 1;
    },
    shiftTabPressed() {}
  }
};
</script>

<style scoped>
*:focus {
  outline-width: 2em;
  outline-color: rgb(77, 144, 254);
}
</style>
