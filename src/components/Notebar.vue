<template>
  <div id="notebar" class="bg-gray-200 h-screen overflow-y-scroll">
    <div class="grid grid-cols-4 p-2">
      <div class="col-span-1 text-left align-middle">...</div>
      <div class="col-span-2 text-center align-middle text-xl">Notes</div>
      <div class="col-span-1 text-right">
        <div class="text-gray-800 hover:text-blue-600 cursor-pointer" @click="createNewNote">
          <font-awesome-icon class="align-middle" icon="plus" />
        </div>
      </div>
    </div>

    <note-preview
      v-for="(note, index) in getNotes"
      :key="note.id"
      :selected="selectedNoteId === note.id"
      :note="note"
      @click="clickNote(index)"
    ></note-preview>
  </div>
</template>

<script>
import NotePreview from "@/components/Note/NotePreview";

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
      this.$store.commit("createNewNote", {
        id: this.$store.getters.getNewNoteId,
        title: "Default Title",
        body: "Default body",
        created_at: "2020-02-19"
      });
    },
    clickNote(index) {
      console.log("help?");
      const clickedNote = this.getNotes[index];
      this.$store.commit("selectNote", clickedNote.id);
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
