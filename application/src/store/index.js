import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters.js";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // Global Variables:
        emissionRate : 2.67,  // The amount of emission released for a liter of petrol.
        maxSpeed : 100,       // The max speed a truck can traveling in km/h

        // TruckType Variables:
        truckTypes : [
            {
                key : "Light",
                name: "Light-duty van",
                img: 'light_duty_van.svg',
                volume : 8.925,             // The volume of goods the truck can transport m^3.
                maxPayload : 4700,          // The max weight of goods the truck can transport kg.
                consumptionEmpty : 0.2374,  // The fuel consumption when the truck is empty L/km.
                consumptionFull : 0.3616    // The fuel consumption when the truck is full L/km.
            },
            {
                key : "Heavy",
                name: "Heavy-duty van",
                img: 'heavy_duty_van.svg',
                volume : 91.223,            // The volume of goods the truck can transport m^3.
                maxPayload : 32018,         // The max weight of goods the truck can transport kg.
                consumptionEmpty : 0.2374,  // The fuel consumption when the truck is empty L/km.
                consumptionFull : 0.3616    // The fuel consumption when the truck is full L/km.
            },
            {
                key : "Train",
                name: "Train truck",
                img: 'train_truck.svg',
                volume : 115.0,             // The volume of goods the truck can transport m^3.
                maxPayload : 35300,         // The fuel consumption when the truck is empty L/km.
                consumptionEmpty : 0.2374,  // The fuel consumption when the truck is empty L/km.
                consumptionFull : 0.3616    // The fuel consumption when the truck is full L/km.
            }
        ],

        // Input Variables:
        // An array of inputted truck objects
        trucks : [
            // Default a single truck with no info.
            {
                type : null,          // The type of truck inputted from truckTypes
                quantity : 1,         // The quantity of trucks inputted, default 1
                startLocation : null  // The location the truck(s) start at.
            }
        ],
        // An array of inputted good objects
        goods : [
            // Default a single good with no info.
            {
                quantity : null,
                weight : null,           // The weight of the good kg
                volume : null,           // The volume of the good m^3
                pickupLocation : null,   // The location the good needs to be pickup
                deliveryLocation : null  // The location the good needs to be delivered
            }
        ],



        fuelPrice : 1.45,
        emissionBurnt : 2.67,
        averageSpeed : 100,
        numberTrucks : 3,

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

        A : {
            // The vehicles that dispatch from the start location.
            vehicles : new Array(0).fill(null),

            // The goods that need to be delivered by these vehicles.
            cargo : []
        }
    },

    // Imported from the files getters.js, mutations.js and actions.js.
    getters,
    mutations,
    actions
});