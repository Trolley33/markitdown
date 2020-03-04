import Vue from "vue";
import Vuex from "vuex";
import storage from "electron-json-storage";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedNoteId: 0,
    allNotes: []
  },
  mutations: {
    setAllNotes(state, newNotes) {
      state.allNotes = [...newNotes];
    },
    /**
     * Adds new note to beginning of note array.
     * @param {selectedNote, allNotes} state the current Vuex state storage.
     * @param {id, title, body, created_at} note the new note to be inserted.
     */
    addNote(state, note) {
      // Unshift appends to front of array.
      state.allNotes.unshift(note);
      storage.set("data", { notes: state.allNotes });
    },
    /**
     * Sets specified note to be the currently active one.
     * @param {selectedNote, allNotes} state the current Vuex state storage.
     * @param {id, title, body, created_at} note the new note to select.
     */
    selectNote(state, note) {
      state.selectedNoteId = note.id;
    },
    /**
     * Update note object by overwriting with new changes.
     * @param {selectedNote, allNotes} state the current Vuex state storage.
     * @param {id, title, body} changes any changed attributes of the given note object.
     */
    updateNote(state, changes) {
      // Get current note as object.
      const currentNote = state.allNotes.filter(
        note => note.id === changes.id
      )[0];
      // Get index of current note.
      const index = state.allNotes.indexOf(currentNote);
      // Create new node from previous
      const newNote = { ...currentNote, ...changes };
      // Update global notes array.
      state.allNotes.splice(index, 1, newNote);
      storage.set("data", { notes: state.allNotes });
    }
  },
  getters: {
    /**
     *  Gets the next non-used ID from current notes.
     * @param {selectedNote, allNotes} state the current Vuex state storage.
     */
    getNewNoteId(state) {
      // Add 1 to current highest ID to get unique ID.
      return (
        1 +
        state.allNotes.reduce((maxID, currentNote) => {
          if (maxID < currentNote.id) {
            maxID = currentNote.id;
          }
          return maxID;
        }, 0)
      );
    },
    getSelectedNote(state) {
      return state.allNotes.filter(note => note.id === state.selectedNoteId)[0];
    }
  },
  actions: {},
  modules: {}
});
