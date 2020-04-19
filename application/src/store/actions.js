
/* Actions can alter the state of the store.
 * They can
 * 1) be asynchronous, and
 * 2) call mutations, unlike mutations themselves.
 *
 * As a guideline, you should create a mutation if you can. If not, you can create an action instead.
 */
export const actions = {
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
};

export default actions;