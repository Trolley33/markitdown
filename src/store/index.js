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
     * @param {selectedNoteId, allNotes} state the current Vuex state storage.
     * @param {id, title, body, created_at} note the new note to be inserted.
     */
    addNote(state, note) {
      // Unshift appends to front of array.
      state.allNotes.unshift(note);
      // Update local storage.
      storage.set("data", { notes: state.allNotes });
    },
    /**
     * Removes note from note array.
     * @param {selectedNoteId, allNotes} state the current Vuex state storage.
     * @param {id} note the note to delete.
     */
    deleteNote(state, note) {
      for (let i = 0; i < state.allNotes.length; i++) {
        if (state.allNotes[i].id === note.id) {
          // If there is only 1 element, once we remove it we cannot select a note so default id to 0.
          if (state.allNotes.length == 1) {
            state.selectedNoteId = 0;
          }
          // Otherwise, if we are at the end of notes list, select 2nd to last item.
          else if (i === state.allNotes.length - 1) {
            state.selectedNoteId = state.allNotes[i - 1].id;
          }
          // If we are not at end, select the note below (when shifted the 'selection' will stay in same place).
          else {
            state.selectedNoteId = state.allNotes[i + 1].id;
          }
          // Removes note from location in list.
          state.allNotes.splice(i, 1);
          // Update local storage.
          storage.set("data", { notes: state.allNotes });
          // Terminate loop when correct ID is located.
          return;
        }
      }
    },
    /**
     * Sets specified note to be the currently active one.
     * @param {selectedNoteId, allNotes} state the current Vuex state storage.
     * @param {id, title, body, created_at} note the new note to select.
     */
    selectNote(state, note) {
      state.selectedNoteId = note.id;
    },
    /**
     * Update note object by overwriting with new changes.
     * @param {selectedNoteId, allNotes} state the current Vuex state storage.
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
     * @param {selectedNoteId, allNotes} state the current Vuex state storage.
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
