import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters.js";
import {Time} from "../classes/Time.js";
import {simulationType} from "@/classes/simulation/SimulationType.js";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // Boolean to keep track of if the simulation is running.
        isRunning: false,

        // Simulation objects
        map : Object,
        time: new Time(),

        // The results of the two types of simulations.
        simulationResults : {
            traditional : {
                distance : 0,
                numberOfTrucks : 0,
                co2emissions : 0,
                fuelConsumed : 0,
                time : 0
            },
            shared : {
                distance : 0,
                numberOfTrucks : 0,
                co2emissions : 0,
                fuelConsumed : 0,
                time : 0
            }
        },

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
                type : null,                                            // The type of truck inputted from truckTypes
                quantity : {value : 1, error : false, message : ""},    // The quantity of trucks inputted, default 1
                startLocation : null                                    // The location the truck(s) start at.
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

        tempForMap : false,
        tempForForward : null,
        tempForSetter : null,

        currentSimulationType : simulationType.None,
        traditionalSimulation : null,
        sharedSimulation : null,

        /**
         * This is a helper function to check if number fields are valid.
         * @param num The number being checked as a String.
         * @param min The lower bound of the number.
         * @param max The upper bound of the number.
         * @param canZero If the number can be equal to zero or not.
         * @param canDecimal If the number can be a decimal number or not.
         * @return Array has type [
         *      0 Boolean: First element of the array is a boolean stating if the number is valid.
         *      1 String: Second element of the array is a corresponding error message.
         * ]
         */
        checkNumber : function(num, min, max, canZero, canDecimal){
            let value = Number(num);

            if (num === "") return [true, "Field can't be empty"];
            if (isNaN(value)) return [true, "Must be a number"];
            if (!(min <= value && value <= max)) return [true, ("Must be between " + String(min) + " and " + String(max))];
            if (!canZero && value === 0) return [true, "Must not be 0"];
            if (!canDecimal && !Number.isInteger(value)) return [true, "Must be an integer number"]

            return [false, ""];  // Passes all checks
        }
    },

    // Imported from the files getters.js, mutations.js and actions.js.
    getters,
    mutations,
    actions
});