import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters.js";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // Global Variables:
        emissionRate : { value : "2.67", error : false, message : "" },  // The amount of emission released for a liter of petrol.
        maxSpeed : { value : "100", error : false, message : ""},        // The max speed a truck can traveling in km/h

        // TruckType Variables:
        truckTypes : [
            {
                key : "Light",
                name: "Light-duty van",
                img: 'light_duty_van.svg',
                volume : { value: "8.925", error : false, message : ""},             // The volume of goods the truck can transport m^3.
                maxPayload : { value: "4700", error : false, message : ""},          // The max weight of goods the truck can transport kg.
                consumptionEmpty : { value : ".2374", error : false, message : ""},  // The fuel consumption when the truck is empty L/km.
                consumptionFull : { value : ".3616", error : false, message : ""},   // The fuel consumption when the truck is full L/km.
            },
            {
                key : "Heavy",
                name: "Heavy-duty van",
                img: 'heavy_duty_van.svg',
                volume : { value: "91.223", error : false, message : ""},             // The volume of goods the truck can transport m^3.
                maxPayload : { value: "32018", error : false, message : ""},          // The max weight of goods the truck can transport kg.
                consumptionEmpty : { value : ".2374", error : false, message : ""},   // The fuel consumption when the truck is empty L/km.
                consumptionFull : { value : ".3616", error : false, message : ""},    // The fuel consumption when the truck is full L/km.
            },
            {
                key : "Train",
                name: "Train truck",
                img: 'train_truck.svg',
                volume : { value: "115.0", error : false, message : ""},              // The volume of goods the truck can transport m^3.
                maxPayload : { value: "35300", error : false, message : ""},          // The max weight of goods the truck can transport kg.
                consumptionEmpty : { value : ".2374", error : false, message : ""},   // The fuel consumption when the truck is empty L/km.
                consumptionFull : { value : ".3616", error : false, message : ""},    // The fuel consumption when the truck is full L/km.
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
                quantity : {value: null, error: true, message:"Field can't be empty"},  //The quantity of the good
                weight : {value: null, error: true, message:"Field can't be empty"},    // The weight of the good kg
                volume : {value: null, error: true, message:"Field can't be empty"},    // The volume of the good m^3
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
        },

        /**
         * This is a helper function to check if number fields are valid.
         * @param num The number being checked as a String.
         * @param min The lower bound of the number.
         * @param max The upper bound of the number.
         * @param canZero If the number can be equal to zero or not.
         * @return Array has type [
         *      0 Boolean: First element of the array is a boolean stating if the number is valid.
         *      1 String: Second element of the array is a corresponding error message.
         * ]
         */
        checkNumber : function(num, min, max, canZero){
            if (num === "") {
                return [true, "Field can't be empty"];
            }
            let value = Number(num);
            if (isNaN(value)){
                return [true, "Must be a number"];
            }
            if (!(min <= value && value <= max)) {
                return [true, ("Must be between " + String(min) + " and " + String(max))];
            }
            if (!canZero && value === 0) {
                return [true, "Must not be 0"];
            }
            return [false, ""];
        }
    },

    // Imported from the files getters.js, mutations.js and actions.js.
    getters,
    mutations,
    actions
});