import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedNote: { id: 0, title: "", body: "", created_at: "" },
    allNotes: [{ id: 1, title: "Creating a Markdown Editor", body: "Now this may seem like a daunting task, given the scope of the project and some people's inexperience with similar things, it can be easy to get disheartened by your own lack knowledge, for example when you look up the answer online only to find the only other person to ever have asked get called dumb by other programmers.", created_at: "2020-02-10" }]
  },
  mutations: {
    /**
     * Adds new note to beginning of note array.
     * @param {selectedNote, allNotes} state the current Vuex state storage.
     * @param {id, title, body, created_at} note the new note to be inserted.
     */
    addNote(state, note) {
      // Unshift appends to front of array.
      state.allNotes.unshift(note);
    },
    /**
     * Sets specified note to be the currently active one.
     * @param {selectedNote, allNotes} state the current Vuex state storage.
     * @param {id, title, body, created_at} note the new note to select.
     */
    selectNote(state, note) {
      // No need for {...note} as we want the 2 objects to be identical (even by reference).
      state.selectedNote = note;
    }
  },
  getters: {
    /**
     *  Gets the next non-used ID from current notes.
     * @param {selectedNote, allNotes} state the current Vuex state storage.
     */
    getNewNoteId(state) {
      // Add 1 to current highest ID to get unique ID.
      return 1 + state.allNotes.reduce((maxID, currentNote) => {
        if (maxID < currentNote.id) {
          maxID = currentNote.id;
        }
        return maxID
      }, 0);
    }
  },
  actions: {},
  modules: {}
});
