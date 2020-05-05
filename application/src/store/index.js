import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import actions from "./actions";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        map : Object,
        // Constants
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

        debugListProducts : [
            {
                quantity: 1,
                weight: 1,
                volume: 1,
                from: [1,1],
                to: [1,2]
            },
            {
                quantity: 1,
                weight: 1,
                volume: 1,
                from: [3,1],
                to: [1,3]
            },
            {
                quantity: 1,
                weight: 1,
                volume: 1,
                from: [2,3],
                to: [2,2]
            }],

        // Variables (computed)
        route : {
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
        }
    },

    // The store's computed properties, in a way.
    getters: {
        /**
         * The maximum number of locations that can be contained in the locations array.
         * It is equal to the general 'from' and 'to' locations of the trucks (2),
         * plus the 'from' and 'to' locations of each product (2*number of products): 2 + 2*state.A.cargo.length;
         * @param state
         * @returns {number}
         */
        maxNrLocations: state => {
            return 2 + 2*state.A.cargo.length;
        },

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