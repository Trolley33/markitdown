import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedNote: { id: 0, title: "", body: "", created_at: "" },
    allNotes: [{ id: 1, title: "Creating a Markdown Editor", body: "Now this may seem like a daunting task, given the scope of the project and some people's inexperience with similar things, it can be easy to get disheartened by your own lack knowledge, for example when you look up the answer online only to find the only other person to ever have asked get called dumb by other programmers.", created_at: "2020-02-10" }]
  },
  mutations: {
    createNewNote(state, note) {
      // Add new note to from of array.
      state.allNotes.unshift(note);
    },
    selectNote(state, noteID) {
      const note = state.allNotes.reduce((final_note, curr_note) => {
        if (curr_note.id === noteID) return curr_note;
        return final_note;
      }, { id: -1 });
      if (note.id !== -1) state.selectedNote = note;
    }
  },
  getters: {
    getNewNoteId(state) {
      // Get maximum current ID, and add 1 to generate new maximum ID.
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
