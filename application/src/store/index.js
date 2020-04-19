import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import actions from "./actions";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // Constants
        maxNrLocations : 2,
        fuelPrice : 1.45,
        emissionBurnt : 2.67,
        averageSpeed : 100,
        numberTrucks : 3,
        truckTypes : [
            {
                key : "Light",
                volume : 8.925,
                maxPayload : 4700,
                consumption0 : 0.2374,
                consumption1 : 0.3616
            },
            {
                key : "Heavy",
                volume : 91.223,
                maxPayload : 32018,
                consumption0 : 0.2374,
                consumption1 : 0.3616
            },
            {
                key : "Train",
                volume : 115.0,
                maxPayload : 35300,
                consumption0 : 0.2374,
                consumption1 : 0.3616
            }
        ],

        // Variables (computed)
        route:{
            distance: 0, //default value of 186.6795 km (distance between Groningen and Amsterdam).
            time:{
                hours: 0,
                minutes: 0,
            }
        },

        // Variables (based on input)
        locations : {
            list: new Array(2).fill(null),
            event: ''
        },

        // The vehicles that dispatch from the start location.
        A : {
            vehicles : new Array(3).fill(0),
            cargo : []
        },

        // TODO currently not used.
        // The vehicles that dispatch from the end location.
        B : {
            vehicles : new Array(3).fill(0),
            cargo : []
        }


    },

    getters: {
        locations: state => {
            return state.locations.list;
        },

        /**
         * Calculates the number of spots in the locations array that contain a value.
         *
         * @param state
         * @param getters
         * @returns {number}
         */
        currentNrLocations: (state, getters) => {
            let nrLocations = 0;
            getters.locations.forEach(element => { nrLocations += (element !== null); });
            return nrLocations;
        }
    },

    // Imported from the files mutations.js and actions.js.
    mutations,
    actions
});