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
export const mutations = {
    /**
     * This is the setter function of the max speed of all trucks.
     * @param state The current state that should be changed.
     * @param value The value the max speed should be set too.
     */
    setMaxSpeed(state, {value}) {
        let check = state.checkNumber(value, 0, 1000, false);
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
        let check = state.checkNumber(value, 0, 100, true);
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
        let check = state.checkNumber(value, 0, 999, false);
        state.truckTypes[index].volume.error = check[0];
        state.truckTypes[index].volume.message = check[1];
        state.truckTypes[index].volume.value = value;
    },

    /**
     * This function sets the max payload of a truck type at a certain index.
     * @param state The current state that should be changed.
     * @param value The value the max payload of the truck type should be replaced with.
     * @param index The index of the truck type that should be changed.
     */
    setMaxPayload(state, {value, index}){
        let check = state.checkNumber(value, 0, 9999, false);
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
        let check = state.checkNumber(value, 0, 10, true);
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
        let check = state.checkNumber(value, 0, 10, true);
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
            quantity : null,
            weight : null,
            volume : null,
            pickupLocation : null,
            deliveryLocation : null
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
        // TODO: Add checking the quantity here.
        state.goods[index].quantity = value;
    },

    /**
     * This is the setter function of the quantity of a good at a certain index in goods.
     * @param state The current state that should be changed.
     * @param value The value the quantity of the good should be set too.
     * @param index The index of the good that should be changed.
     */
    setGoodWeight(state, {value, index}){
        // TODO: Add checking the weight here.
        state.goods[index].weight = value;
    },

    /**
     * This is the setter function of the volume of a good at a certain index in goods.
     * @param state The current state that should be changed.
     * @param value The value the volume of the good should be set too.
     * @param index The index of the good that should be changed.
     */
    setGoodVolume(state, {value, index}){
        // TODO: Add checking the volume here.
        state.goods[index].volume = value;
    },

    /**
     * This is the setter function of the pickup location of a good at a certain index in goods.
     * @param state The current state that should be changed.
     * @param pickup The object the pickup location of the good should be set too.
     * @param index The index of the good that should be changed.
     */
    setGoodPickupLocation(state, {pickup, index}){
        // TODO: Add checking the location here.
        state.goods[index].pickupLocation = pickup;
    },

    /**
     * This is the setter function of the delivery location of a good at a certain index in goods.
     * @param state The current state that should be changed.
     * @param delivery The object the delivery location of the good should be set too.
     * @param index The index of the good that should be changed.
     */
    setGoodDeliveryLocation(state, {delivery, index}){
        // TODO: Add checking the value here.
        state.goods[index].deliveryLocation = delivery;
    },

    /**
     * This function adds a new truck to the list of trucks in the state.
     * @param state The current state that should be changed.
     */
    addNewTruck(state){
        let truck = {
            type : null,
            quantity : 1,
            startLocation : null
        };
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
        // TODO: Add checking the value here.
        state.trucks[index].type = type;
    },

    /**
     * This function sets the quantity of a truck at a certain index in the array of trucks in the state.
     * @param state The current state that should be changed.
     * @param quantity The new quantity of trucks that should replace the old.
     * @param index The index of the truck that should be changed.
     */
    setTruckQuantity(state, {quantity, index}){
        // TODO: add checking the value here.
        state.trucks[index].quantity = quantity;
    },

    /**
     * This function sets the starting location of a truck at a certain index in the array of trucks in the state.
     * @param state The current state that should be changed.
     * @param startingLocation The new starting location.
     * @param index The index of the truck that should be changed.
     */
    setTruckStartingLocation(state, {startingLocation, index}){
        // TODO: add checking the location here.
        state.trucks[index].startLocation = startingLocation;
    },



    // Route mutations
    /**
     * Changes the distance and time that the route between the given points will take.
     *
     * @param state
     * @param payload, has type {
     *     distance: Float,
     *     time: Object
     * }
     */
    setRoute(state, payload) {
        state.route.distance = payload.dist;
        state.route.time = payload.time;
        state.route.__ob__.dep.notify();
    },

    // Location mutations
    /**
     * Overwrites the location at the given index of the locations array by null.
     * @param state
     * @param index
     */
    eraseLocation(state, index) {
        state.locations.list[index] = null;
        state.locations.__ob__.dep.notify();
    },

    /**
     * Actually removes the location at the given index of the locations array and therefore resizes it.
     * @param state
     * @param payload, has type {
     *     index: Integer,
     *     deleteCount: Integer
     * }
     */
    removeLocation(state, payload) {
        state.locations.list.splice(payload.index,payload.deleteCount);
        state.locations.__ob__.dep.notify();
    },

    /**
     *
     * @param state
     * @param payload, has type {
     *     newList: Object,
     *     index: Integer
     * }
     */
    setLocationByIndex(state, payload) {
        const newList = payload.newList;
        const index = payload.index;
        const locations = state.locations;

        const a = newList === null;
        const b = locations.list[index] === null;
        let event = String;
        if (newList !== locations.list[index]) { // If the new location is not equal to the old one
            // Set the type of event
            if (a ? !b : b) { // If exactly one of the new and old locations is null
                event = 'locationListUpdate';
            } else { // Else both the new and old locations are null, or both are not null
                event = 'locationUpdate';
            }

            locations.list[index] = newList;
            locations.event = event;
            locations.__ob__.dep.notify();
        }
    },

    /**
     * Writes the given location to the given index of state.locations.
     * @param state
     * @param payload has type {
     *     newList: Object (latLng coordinates),
     *     currentNrLocations: Integer
     * }
     */
    setLocations(state, payload) {
        const locations = state.locations;
        const newList = payload.newList;
        const currentNrLocations = payload.currentNrLocations;

        let newLocations = 0;
        let changed = false;
        for (let i = 0; i < newList.length; i++) {
            newLocations += newList[i] !== null;
            changed = changed || (newList[i] !== locations.list[i]);
            locations.list[i] = newList[i];
        }
        if (changed) {
            locations.event = currentNrLocations !== newLocations ?
                'locationListUpdate' : 'locationUpdate';
            locations.__ob__.dep.notify();
        }

        if (currentNrLocations <= 1){
            state.route.distance = 0;
            state.route.time = {hours: 0, minutes: 0};
        }
    },

    /**
     * Resizes the locations array. If it is too long, the values at the end will be deleted.
     * @param state
     * @param newSize
     */
    resizeLocations(state, newSize) {
        const arr = state.locations.list;

        while (newSize > arr.length) {
            arr.push(null);
        }
        while (newSize < arr.length) {
            arr.pop();
        }
    },

    // Cargo mutations
    addProduct(state) {
        state.A.cargo.push({
            quantity: "",
            weight: "",
            volume: "",
            from: null,
            to: null
        });
    },

    removeProduct(state, index) {
        state.A.cargo.splice(index, 1); // Removes one element starting from specified index of array.
    },

    // Vehicle mutations
    addVehicle(state) {
        state.A.vehicles.push({
            indexTruckType: null
        });
    },

    removeVehicle(state, index) {
        state.A.vehicles.splice(index, 1); // Removes one element starting from specified index of array.
    },

    /**
     *
     * @param state
     * @param payload has type {
     *     index: Number,
     *     type: Number
     * }
     */
    setVehicleType(state, payload) {
        state.A.vehicles[payload.index].indexTruckType = payload.type;
    }
};

export default mutations;