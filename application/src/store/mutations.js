
/* Mutations are synchronous functions that change the state of the store
 */
export const mutations = {
    setRoute(state, payload) {
        this.distance = payload.dist;
        this.time = payload.time;
        state.route.__ob__.dep.notify();
    },

    /**
     * Writes the given location to the given index of state.locations.
     * @param state
     * @param payload: consists of two fields, newList (which is the latLng coordinates) and index
     */
    setLocations(state, payload) {
        const newList = payload.newList;
        const index = payload.index;
        const locations = state.locations;

        if (index === undefined) { // one argument
            let newLocations = 0;
            let changed = false;
            for (let i = 0; i < newList.length; i++) {
                newLocations += newList[i] !== null;
                changed = changed || (newList[i] !== locations.list[i]);
                locations.list[i] = newList[i];
            }
            if (changed) {
                const event = locations.currentNrLocations !== newLocations ?
                    'locationListUpdate' : 'locationUpdate';
                locations.currentNrLocations = newLocations;
                locations.event = event;
                locations.__ob__.dep.notify();
            }
        } else { // 2 arguments
            const a = newList === null;
            const b = locations.list[index] === null;
            let event = String;
            if (newList !== locations.list[index]) {
                if (a ? !b : b) {
                    event = 'locationListUpdate';
                    locations.currentNrLocations += a ? -1 : 1;
                } else {
                    event = 'locationUpdate';
                }
                locations.list[index] = newList;
                locations.event = event;
                locations.__ob__.dep.notify();
            }
        }

        if (locations.currentNrLocations <= 1){
            state.route.distance = 0;
            state.route.time = {hours: 0, minutes: 0};
        }
    }
};

export default mutations;