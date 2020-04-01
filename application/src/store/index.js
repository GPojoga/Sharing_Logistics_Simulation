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
            },
            set: function(dist,time){
                this.distance = dist;
                this.time = time;
                this.__ob__.dep.notify();
            }
        },
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
                if (this.currentNrLocations <= 1){
                    storage.state.route.set(0,{hours:0,minutes:0});
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
export default storage;