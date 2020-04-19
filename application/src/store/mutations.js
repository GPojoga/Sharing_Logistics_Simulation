
/* Mutations are synchronous functions that change the state of the store
 *
 * They can be used by calling
 *      this.$store.commit('mutationName', payload)
 *
 * Payload should contain one or multiple parameter values. For example:
 *      payload = {
 *          index: i,
 *          newList, latLng
 *      }
 */
export const mutations = {
    /**
     * Changes the distance and time that the route between the given points will take.
     *
     * @param state
     * @param payload {
     *     distance: Float,
     *     time: Object
     * }
     */
    setRoute(state, payload) {
        this.distance = payload.dist;
        this.time = payload.time;
        state.route.__ob__.dep.notify();
    },

    removeLocation(state, index) {
        state.locations.list[index] = null;
        state.locations.__ob__.dep.notify();
    },

    /**
     *
     * @param state
     * @param payload: {
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
     * @param newList: Object (latLng coordinates)
     */
    setLocations(state, newList) {
        const locations = state.locations;
        const currentNrLocations = state.locations.currentNrLocations;

        let newLocations = 0;
        let changed = false;
        for (let i = 0; i < newList.length; i++) {
            newLocations += newList[i] !== null;
            changed = changed || (newList[i] !== locations.list[i]);
            locations.list[i] = newList[i];
        }
        if (changed) {
            const event = currentNrLocations !== newLocations ?
                'locationListUpdate' : 'locationUpdate';
            // locations.currentNrLocations = newLocations;
            locations.event = event;
            locations.__ob__.dep.notify();
        }

        if (currentNrLocations <= 1){
            state.route.distance = 0;
            state.route.time = {hours: 0, minutes: 0};
        }
    }
};

export default mutations;