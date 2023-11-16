import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state() {
    return {
      clubNumber: '1321012'
    };
  },
  mutations: {
    setClubNumber(state, newClubNumber) {
      state.clubNumber = newClubNumber;
    }
  },
  plugins: [createPersistedState()]
});
