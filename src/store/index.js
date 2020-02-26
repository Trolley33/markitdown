import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedNoteId: 0,
    allNotes: [
      {
        id: 1,
        title: "Creating a Markdown Editor",
        body:
          "## Code highlighting:\n```javascript\nshiftTabPressed(e) {\n\tconsole.log(e);\n}\n```\nNow this may seem like a daunting task, given the scope of the project and some people's inexperience with similar things, it can be easy to get disheartened by your own lack knowledge, for example when you look up the answer online only to find the only other person to ever have asked get called dumb by other programmers.",
        created_at: "2020-02-10"
      }
    ],
    client: null
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
