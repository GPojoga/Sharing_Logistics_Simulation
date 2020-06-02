/* Mutations are synchronous functions that change the state of the store
 *
 * They can be used by calling
 *      this.$store.commit('mutationName', payload)
 *
 * Payload should be one variable. It can consist of multiple parameter values. For example:
 *      payload = {
 *          index: i,
 *          newList: latLng
 *      }
 */
import {simulationType} from "../classes/simulation/SimulationType";
import {Simulation} from "@/classes/simulation/Simulation";

export const mutations = {
    /**
     * This is the setter function of the map of the webapp.
     * @param state The current state that should be changed.
     * @param map The map object the state should set it's map to.
     */
    setMap(state, {map}){
        state.map = map;
    },

    /**
     * This is the setter function of the max speed of all trucks.
     * @param state The current state that should be changed.
     * @param value The value the max speed should be set too.
     */
    setMaxSpeed(state, {value}) {
        let check = state.checkNumber(value, 0, 1000, false, true);
        state.maxSpeed.error = check[0];
        state.maxSpeed.message = check[1];
        state.maxSpeed.value = value;
    },

    /**
     * This is the setter function of the emission rate of all trucks.
     * @param state The current state that should be changed.
     * @param value The value the emission rate should be set too.
     */
    setEmissionRate(state, {value}) {
        let check = state.checkNumber(value, 0, 100, true, true);
        state.emissionRate.error = check[0];
        state.emissionRate.message = check[1];
        state.emissionRate.value = value;
    },

    /**
     * This function sets the volume of a truck type at a certain index.
     * @param state The current state that should be changed.
     * @param value The value the volume of the truck type should be replaced with.
     * @param index The index of the truck type that should be changed.
     */
    setVolume(state, {value, index}){
        let check = state.checkNumber(value, 0, 999, false, true);
        state.truckTypes[index].volume.error = check[0];
        state.truckTypes[index].volume.message = check[1];
        state.truckTypes[index].volume.value = value;
    },

    /**
     * Creates a Simulation instance and stores it in traditionalSimulation or sharedSimulation in the store's state.
     * @param state The current state that should be changed.
     * @param simType The type of simulation being set.
     * @param store The store of the application.
     */
    setSimulation(state,{type : simType,store : store}){
        if(!state.map){
            throw Error('The map object was not set. The simulation cannot be initialized ');
        }
        switch(simType){
            case simulationType.TRADITIONAL:
                if(state.traditionalSimulation === null) {
                    state.traditionalSimulation = new Simulation(simType, store);
                }
                break;
            case simulationType.SHARED:
                if(state.sharedSimulation === null){
                    state.sharedSimulation = new Simulation(simType,store);
                }
                break;
            default :
                throw Error("Invalid simulation type");
        }
    },

    /**
     * Sets the results of the given simulation type with the given results.
     * @param state The current state that should be changed.
     * @param type The type of simulation that was run.
     * @param results The results of running the simulation.
     */
    setSimulationResults(state, {type, results}) {
        state.isRunning = false;
        if (type === simulationType.TRADITIONAL) state.simulationResults.traditional = results;
        else if (type === simulationType.SHARED) state.simulationResults.shared = results;
    },

    /**
     * This function starts the simulation of the traditional method.
     * @param state The current state that should be changed.
     */
    startTraditionalSimulation(state){
        if(state.traditionalSimulation === null) throw new Error("Traditional simulation was not set");
        if (state.sharedSimulation !== null) state.sharedSimulation.stop();

        state.time.reset();
        state.traditionalSimulation.start();
        state.currentSimulationType = simulationType.TRADITIONAL;
    },

    /**
     * This function starts the simulation of the Sharing logistics method.
     * @param state The current state that should be changed.
     */
    startSharedSimulation(state){
        if(state.sharedSimulation === null) throw new Error("Shared simulation was not set");
        if(state.traditionalSimulation !== null) state.traditionalSimulation.stop();

        state.time.reset();
        state.sharedSimulation.start();
        state.currentSimulationType = simulationType.SHARED;
    },

    /**
     * This function sets the max payload of a truck type at a certain index.
     * @param state The current state that should be changed.
     * @param value The value the max payload of the truck type should be replaced with.
     * @param index The index of the truck type that should be changed.
     */
    setMaxPayload(state, {value, index}){
        let check = state.checkNumber(value, 0, 9999, false, true);
        state.truckTypes[index].maxPayload.error = check[0];
        state.truckTypes[index].maxPayload.message = check[1];
        state.truckTypes[index].maxPayload.value = value;
    },

    /**
     * This function sets the consumption of a empty truck of a truck type at a certain index.
     * @param state The current state that should be changed.
     * @param value The value the empty consumption of the truck type should be replaced with.
     * @param index The index of the truck type that should be changed.
     */
    setConsumptionEmpty(state, {value, index}){
        let check = state.checkNumber(value, 0, 10, true, true);
        state.truckTypes[index].consumptionEmpty.error = check[0];
        state.truckTypes[index].consumptionEmpty.message = check[1];
        state.truckTypes[index].consumptionEmpty.value = value;
    },

    /**
     * This function sets the consumption of a full truck of a truck type at a certain index.
     * @param state The current state that should be changed.
     * @param value The value the full consumption of the truck type should be replaced with.
     * @param index The index of the truck type that should be changed.
     */
    setConsumptionFull(state, {value, index}){
        let check = state.checkNumber(value, 0, 20, true, true);
        state.truckTypes[index].consumptionFull.error = check[0];
        state.truckTypes[index].consumptionFull.message = check[1];
        state.truckTypes[index].consumptionFull.value = value;
    },

    /**
     * This function adds a new good to the list of goods in the state.
     * @param state The current state that should be changed.
     */
    addNewGood(state) {
        let good = {
            quantity : {value: null, error: true, message:"Field can't be empty"},  //The quantity of the good
            weight : {value: null, error: true, message:"Field can't be empty"},    // The weight of the good kg
            volume : {value: null, error: true, message:"Field can't be empty"},    // The volume of the good m^3
            pickupLocation : {value: null, error: true, message:"Field can't be empty", text: null},    // The location the good needs to be pickup
            deliveryLocation : {value: null, error: true, message: "Field can't be empty", text: null}  // The location the good needs to be delivered
        };
        state.goods.push(good);
    },

    /**
     * This function removes a good at a certain index of the goods array in the state.
     * @param state The current state that should be changed.
     * @param index The index of the good that should be removed.
     */
    removeGood(state, {index}){
        state.goods.splice(index, 1);
    },

    /**
     * This is the setter function of the quantity of a good at a certain index in goods.
     * @param state The current state that should be changed.
     * @param value The value the quantity of the good should be set too.
     * @param index The index of the good that should be changed.
     */
    setGoodQuantity(state, {value, index}){
        let check = state.checkNumber(value, 0, 99, false, false);
        state.goods[index].quantity.error = check[0];
        state.goods[index].quantity.message = check[1];
        state.goods[index].quantity.value = value;
    },

    /**
     * This is the setter function of the quantity of a good at a certain index in goods.
     * @param state The current state that should be changed.
     * @param value The value the quantity of the good should be set too.
     * @param index The index of the good that should be changed.
     */
    setGoodWeight(state, {value, index}){
        let check = state.checkNumber(value, 0, 4700, false, true);
        state.goods[index].weight.error = check[0];
        state.goods[index].weight.message = check[1];
        state.goods[index].weight.value = value;
    },

    /**
     * This is the setter function of the volume of a good at a certain index in goods.
     * @param state The current state that should be changed.
     * @param value The value the volume of the good should be set too.
     * @param index The index of the good that should be changed.
     */
    setGoodVolume(state, {value, index}){
        let check = state.checkNumber(value, 0, 8.925, false, true);
        state.goods[index].volume.error = check[0];
        state.goods[index].volume.message = check[1];
        state.goods[index].volume.value = value;
    },

    /**
     * This is the setter function of the pickup location of a good at a certain index in goods.
     * @param state The current state that should be changed.
     * @param location The object the pickup location of the good should be set too.
     * @param index The index of the good that should be changed.
     * @param text The new pickup location in text format.
     */
    setGoodPickupLocation(state, {location, index, text}){
        let check = state.checkLocation(location, text);
        state.goods[index].pickupLocation = {value: location, text: text, error: check[0], message: check[1]};
    },

    /**
     * This is the setter function of the delivery location of a good at a certain index in goods.
     * @param state The current state that should be changed.
     * @param location The object the delivery location of the good should be set too.
     * @param index The index of the good that should be changed.
     * @param text The new delivery location in text format.
     */
    setGoodDeliveryLocation(state, {location, index, text}){
        let check = state.checkLocation(location, text);
        state.goods[index].deliveryLocation = {value: location, text: text, error: check[0], message: check[1]};
    },

    /**
     * This function adds a new truck to the list of trucks in the state.
     * @param state The current state that should be changed.
     */
    addNewTruck(state){
        let truck = {
            type : state.truckTypes[0].key,                                                          // The type of truck inputted from truckTypes, default light van.
            quantity : {value : 1, error : false, message : ""},                                     // The quantity of trucks inputted, default 1
            startLocation : {value: null, error: true, message: "Field can't be empty", text: null}  // The location the truck(s) start at.
        }
        state.trucks.push(truck);
    },

    /**
     * This function removes a truck at a certain index of the trucks array in the state.
     * @param state The current state that should be changed.
     * @param index The index of the good that should be removed.
     */
    removeTruck(state, {index}){
        state.trucks.splice(index, 1);
    },

    /**
     * This function sets the type of a truck at a certain index in the array of trucks in the state.
     * @param state The current state that should be changed.
     * @param type The new type of the truck.
     * @param index The index of the truck that should be changed.
     */
    setTruckType(state, {type, index}){
        state.trucks[index].type = type;
    },

    /**
     * This function sets the quantity of a truck at a certain index in the array of trucks in the state.
     * @param state The current state that should be changed.
     * @param value The new quantity of trucks that should replace the old.
     * @param index The index of the truck that should be changed.
     */
    setTruckQuantity(state, {value: value, index}){
        let check = state.checkNumber(value, 0, 20, false, false);
        state.trucks[index].quantity.error = check[0];
        state.trucks[index].quantity.message = check[1];
        state.trucks[index].quantity.value = value;
    },

    /**
     * This function sets the starting location of a truck at a certain index in the array of trucks in the state.
     * @param state The current state that should be changed.
     * @param location The new starting location.
     * @param index The index of the truck that should be changed.
     * @param text The new starting location in text format.
     */
    setTruckStartingLocation(state, {location, index, text}){
        let check = state.checkLocation(location, text);
        state.trucks[index].startLocation = {value: location, text: text, error: check[0], message: check[1]};
    }
};

export default mutations;