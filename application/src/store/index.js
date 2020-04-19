import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const storage = new Vuex.Store({
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
        route:{
            distance: 0, //default value of 186.6795 km (distance between Groningen and Amsterdam).
            time:{
                hours: 0,
                minutes: 0,
            }
        },
        // Inputs (Variables)
        locations : {
            list: new Array(2).fill(null),
            currentNrLocations: 0,
            event: ''
        },

        A : {
            vehicles : new Array(3).fill(0),
            cargo : []
        },
        B : {
            vehicles : new Array(3).fill(0),
            cargo : []
        }


    },

    getters: {
        locations: state => {
            return state.locations.list;
        }
    },

    // Mutations are synchronous functions that change the state.
    mutations: {
        setRoute(state, payload) {
            this.distance = payload.dist;
            this.time = payload.time;
            state.route.__ob__.dep.notify();
        },

        /**
         * Writes the given location to the given index of state.locations.
         * @param state
         * @param payload: consists of two fields, newList (which is the latLng coordinates) and index
         */
        setLocations(state, payload) {
            const newList = payload.newList;
            const index = payload.index;
            const locations = state.locations;

            if (index === undefined) { // one argument
                let newLocations = 0;
                let changed = false;
                for (let i = 0; i < newList.length; i++) {
                    newLocations += newList[i] !== null;
                    changed = changed || (newList[i] !== locations.list[i]);
                    locations.list[i] = newList[i];
                }
                if (changed) {
                    const event = locations.currentNrLocations !== newLocations ?
                        'locationListUpdate' : 'locationUpdate';
                    locations.currentNrLocations = newLocations;
                    locations.event = event;
                    locations.__ob__.dep.notify();
                }
            } else { // 2 arguments
                const a = newList === null;
                const b = locations.list[index] === null;
                let event = String;
                if (newList !== locations.list[index]) {
                    if (a ? !b : b) {
                        event = 'locationListUpdate';
                        locations.currentNrLocations += a ? -1 : 1;
                    } else {
                        event = 'locationUpdate';
                    }
                    locations.list[index] = newList;
                    locations.event = event;
                    locations.__ob__.dep.notify();
                }
            }

            if (locations.currentNrLocations <= 1){
                state.route.distance = 0;
                state.route.time = {hours: 0, minutes: 0};
            }
        }
    },

    // Actions can be asynchronous and they can call mutations, unlike mutations themselves.
    actions: {
        /**
         * This function adds the new location in the first empty spot available
         * in the locations array, if it conforms to the conditions.
         * @param latlng latitude and longitude of the location to be added
         */
        addLocation(context, latlng) {
            let maxNrLocations = context.state.maxNrLocations;
            let locations = context.state.locations.list;
            for (let i = 0;i < maxNrLocations;i++){
                if (locations[i] === null){
                    context.commit('setLocations', {
                        newList: latlng,
                        index: i
                    });
                    break;
                }
            }
        },
    }
});
export default storage;