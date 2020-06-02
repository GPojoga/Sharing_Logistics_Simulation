/**
 * Enum describing the possible states that a Truck is in.
 *
 * @type {{LOADING: number, MOVING: number, FINISHED: number}}
 */
export const truckState = {
    WAITING_FOR_ORDER : 0,
    MOVING : 1,
    LOADING : 2,
    DISABLED : 3
};