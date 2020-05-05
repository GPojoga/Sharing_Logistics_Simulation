export const getters = {
    /**
     * Getter of the max speed of trucks variable.
     * @param state The current state of the webapp.
     * @returns {any} The max speed of trucks as a Number.
     */
    maxSpeed: state => {
        return state.maxSpeed;
    },

    /**
     * Getter of the emission rate of all trucks.
     * @param state The current state of the webapp.
     * @returns {any} The emission rate of trucks as a Number.
     */
    emissionRate: state => {
        return state.emissionRate;
    },

    /**
     * Getter of the truck types of the app.
     * @param state The current state of the webapp.
     * @returns {any} The array of truck types objects.
     */
    truckTypes: state => {
        return state.truckTypes;
    },

    /**
     * Getter of the trucks inputted by the user.
     * @param state The current state of the webapp.
     * @returns {any} The array of trucks objects.
     */
    trucks: state => {
        return state.trucks;
    },

    /**
     * Getter of goods inputted by the user.
     * @param state The current state of the webapp.
     * @returns {any} The array of good objects.
     */
    goods: state => {
        return state.goods;
    },

    /**
     * Returns an array with the number of trucks that are available of each type.
     * @param state
     * @returns {any[]}
     */
    trucksByType: state => {
        let arr = new Array(state.truckTypes.length).fill(0);
        state.A.vehicles.forEach( v => {
            arr[v.indexTruckType]++;
        });
        return arr;
    },

    /**
     * The maximum number of locations that can be contained in the locations array.
     * It is equal to the general 'from' and 'to' locations of the trucks (2*number of trucks),
     * plus the 'from' and 'to' locations of each product (2*number of products):
     *      2*state.A.vehicles.length + 2*state.A.cargo.length;
     * @param state
     * @returns {number}
     */
    maxNrLocations: (state, getters) => {
        return getters.nrVehicleLocations + 2*state.A.cargo.length;
    },

    /**
     * The number of locations of the vehicles in the locations array.
     * @param state
     * @returns {number}
     */
    nrVehicleLocations: state => {
        return 2*state.A.vehicles.length;
    },

    locations: state => {
        return state.locations.list;
    },

    /**
     * Calculates the number of spots in the locations array that contain a value.
     *
     * @param state
     * @param getters
     * @returns {number}
     */
    currentNrLocations: (state, getters) => {
        let nrLocations = 0;
        getters.locations.forEach(element => { nrLocations += (element !== null); });
        return nrLocations;
    }
};

export default getters;