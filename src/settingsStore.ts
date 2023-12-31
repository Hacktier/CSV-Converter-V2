import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state() {
    return {
      clubNumber: '1321012',
      managerID: true
    };
  },
  mutations: {
    setClubNumber(state, newClubNumber) {
      state.clubNumber = newClubNumber;
    },

    setManagerID(state, newManagerId) {
      state.managerID = newManagerId;
    }
  },
  plugins: [createPersistedState()]
});
