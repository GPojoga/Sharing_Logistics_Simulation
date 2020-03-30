import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // Constants
        maxNrLocations : 2,
        fuelPrice : 1.45,
        emissionBurnt : 2.67,
        averageSpeed : 100,
        TruckTypes : [
            {
                volume : 8.925,
                maxPayload : 4700
            },
            {
                volume : 91.223,
                maxPayload : 32018
            },
            {
                volume : 115.0,
                maxPayload : 35300
            }
        ],

        // Inputs
        locations : new Array(2).fill(null),
        departureDate : "",
        A : {
            vehicles : new Array(3).fill(0),
            cargo : []
        },
        B : {
            vehicles : new Array(3).fill(0),
            cargo : []
        }

    },
    getters: {},
    mutations: {},
    actions: {}
});