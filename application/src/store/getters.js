export const getters = {
    /**
     * Getter for whether or not the simulation is currently being run.
     * @param state The current state of the webapp.
     * @returns {boolean} True if the simulation is running and False otherwise.
     */
    isRunning: state => {
        return state.isRunning;
    },

    /**
     * Getter of the time of the simulation.
     * @param state The current state of the webapp.
     * @returns {Time} Time object controlling the passage of time in the simulation.
     */
    time: state => {
        return state.time;
    },

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
     * Getter of the map of the webapp.
     * @param state The current state of the webapp.
     * @returns {ObjectConstructor}  The map represented by a map object.
     */
    map: state => {
        return state.map;
    },

    traditionalSimulation : state => {
        return state.traditionalSimulation;
    },

    sharedSimulation : state => {
        return state.sharedSimulation;
    },

    currentSimulationType : state => {
        return state.currentSimulationType;
    }
};

export default getters;