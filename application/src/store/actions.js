
/* Actions can alter the state of the store.
 * They can
 * 1) be asynchronous, and
 * 2) call mutations (unlike mutations themselves), and
 * 3) call getters (unlike mutations)
 *
 * As a guideline, you should create a mutation if you can. If not, you can create an action instead.
 *
 * They can be used by calling
 *      this.$store.dispatch('actionName', payload)
 *
 * Payload should contain one or multiple parameter values. For example:
 *      payload = {
 *          index: i,
 *          newList, latLng
 *      }
 */
export const actions = {
    /**
     * This function adds the new location in the first empty spot available
     * in the locations array, if it conforms to the conditions.
     * @param context
     * @param latlng latitude and longitude of the location to be added
     */
    addLocation(context, latlng) {
        let maxNrLocations = context.state.maxNrLocations;
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

    setLocations(context, payload) {
        context.commit('setLocations', {
            newList: payload.newList,
            currentNrLocations: context.getters.currentNrLocations
        });
    }
};

export default actions;