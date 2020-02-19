<template>
  <div id="notebar" class="bg-gray-200 h-screen overflow-y-scroll">
    <div class="grid grid-cols-4 p-2 sticky top-0 bg-gray-200">
      <div class="col-span-1 text-left pl-1">
        <font-awesome-icon
          @click="createNewNote"
          class="align-bottom text-gray-700 hover:text-blue-600 cursor-pointer"
          icon="plus"
        />
      </div>
      <div class="col-span-2 text-center align-middle text-2xl">Notes</div>
      <div class="col-span-1 text-right pr-1">
        <font-awesome-icon
          @click="createNewNote"
          class="align-bottom text-gray-700 hover:text-blue-600 cursor-pointer"
          icon="plus"
        />
      </div>
    </div>

    <note-preview
      v-for="(note) in getNotes"
      :key="note.id"
      :selected="selectedNoteId === note.id"
      :note="note"
    ></note-preview>
  </div>
</template>

<script>
import moment from "moment";

import NotePreview from "@/components/Notebar/NotebarPreview";

export default {
  name: "notebar",
  components: {
    NotePreview
  },
  data: () => ({}),
  computed: {
    getNotes() {
      return this.$store.state.allNotes;
    },
    selectedNoteId() {
      return this.$store.state.selectedNote.id;
    }
  },
  methods: {
    createNewNote() {
      // Generate new default note, with unique ID.
      this.$store.commit("addNote", {
        id: this.$store.getters.getNewNoteId,
        title: "New Note",
        body: "Lets get writing!",
        created_at: moment().format("YYYY-MM-DD")
      });
    }
  }
};
</script>

<style scoped>
#notebar::-webkit-scrollbar {
  width: 7px;
}
#notebar::-webkit-scrollbar-track {
  @apply bg-gray-300;
}
#notebar::-webkit-scrollbar-thumb {
  @apply bg-gray-500;
}
#notebar::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-600;
}
</style>
