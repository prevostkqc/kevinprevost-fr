import { createStore } from 'vuex';

export default createStore({
  state: {
    counter: 0 // État global : compteur
  },
  mutations: {
    increment(state) {
      state.counter++; // Mutations : augmenter le compteur
    },
    decrement(state) {
      state.counter--; // Mutations : diminuer le compteur
    }
  },
  actions: {
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit('increment'); // Action : augmenter le compteur de manière asynchrone
      }, 1000);
    }
  },
  getters: {
    doubleCounter: state => state.counter * 2 // Getter : double la valeur du compteur
  }
});
