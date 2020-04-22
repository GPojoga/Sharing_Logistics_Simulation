
/* Actions can alter the state of the store.
 * They can
 * 1) be asynchronous, and
 * 2) call mutations (unlike mutations themselves), and
 * 3) call getters (unlike mutations), and
 * 4) call other actions
 *
 * As a guideline, you should create a mutation if you can. If not, you can create an action instead.
 * Actions can also be a sort of wrappers that call multiple mutations.
 *
 * They can be used by calling
 *      this.$store.dispatch('actionName', payload)
 *
 * Payload should contain one or multiple parameter values. For example:
 *      payload = {
 *          index: i,
 *          newList: latLng
 *      }
 */
export const actions = {
    // Locations actions
    /**
     * This function adds the new location in the first empty spot available
     * in the locations array, if it conforms to the conditions.
     * @param context
     * @param latlng latitude and longitude of the location to be added
     */
    addLocation(context, latlng) {
        let maxNrLocations = context.getters.maxNrLocations;
        let locations = context.state.locations.list;
        for (let i = 0;i < maxNrLocations;i++){
            if (locations[i] === null){
                context.dispatch('setLocationByIndex', {
                    newList: latlng,
                    index: i
                });
                break;
            }
        }
    },

    setLocationByIndex(context, payload) {
        context.commit('setLocationByIndex', {
            newList: payload.newList,
            index: payload.index,
            currentNrLocations: context.getters.currentNrLocations
        });
    },

    setLocations(context, newList) {
        context.commit('setLocations', {
            newList: newList,
            currentNrLocations: context.getters.currentNrLocations
        });
    },

    // Cargo actions
    /**
     *
     * @param context
     */
    addProduct(context) {
        context.commit('addProduct'); // This method indirectly changes the value of maxNrLocations.
        context.commit('resizeLocations', context.getters.maxNrLocations);
    },

    /**
     * Removes the product at the given location from the cargo list and the locations array.
     * @param context
     * @param index
     */
    removeProduct(context, index) {
        context.commit('removeProduct', index); // This method indirectly changes the value of maxNrLocations.
        context.commit('removeLocation', {
            index: 2*index + context.getters.nrVehicleLocations, // 2*index, plus the starting index of the products' locations.
            deleteCount: 2
        }); // Remove 'from' and 'to' locations.
        // Ensure that the array's size stays correct. This call shouldn't do anything.
        context.commit('resizeLocations', context.getters.maxNrLocations);
    },

    // Vehicle actions
    addVehicle(context) {
        context.commit('addVehicle');
        context.commit('resizeLocations', context.getters.maxNrLocations);
    },

    removeVehicle(context, index) {
        context.commit('removeVehicle', index);
        context.commit('removeLocation', {
            index: 2*index,
            deleteCount: 2
        }); // Remove 'from' and 'to' locations of this vehicle
        context.commit('resizeLocations', context.getters.maxNrLocations);
    }
};

export default actions;