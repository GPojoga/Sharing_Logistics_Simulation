import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        maxNrLocations : 2,
        locations : new Array(2).fill(null),
    },
    getters: {},
    mutations: {},
    actions: {}
});