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

        // Inputs (Variables)
        locations : {
            list: new Array(2).fill(null),
            currentNrLocations: 0,
            event: '',
            get: function () {
                return this.list;
            },
            set: function (newList, index) {
                if (index === undefined) { // one argument
                    let newLocations = 0;
                    let changed = false;
                    for (let i = 0; i < newList.length; i++) {
                        newLocations += newList[i] !== null;
                        changed = changed || (newList[i] !== this.list[i]);
                        this.list[i] = newList[i];
                    }
                    if (changed) {
                        let event = this.currentNrLocations !== newLocations ?
                            'locationListUpdate' : 'locationUpdate';
                        this.currentNrLocations = newLocations;
                        this.event = event;
                        this.__ob__.dep.notify();
                    }
                } else { // 2 arguments
                    const a = newList === null;
                    const b = this.list[index] === null;
                    let event = String;
                    if (newList !== this.list[index]) {
                        if (a ? !b : b) {
                            event = 'locationListUpdate';
                            this.currentNrLocations += a ? -1 : 1;
                        } else {
                            event = 'locationUpdate';
                        }
                        this.list[index] = newList;
                        this.event = event;
                        this.__ob__.dep.notify();
                    }
                }
            }
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
    getters: {},
    mutations: {},
    actions: {}
});