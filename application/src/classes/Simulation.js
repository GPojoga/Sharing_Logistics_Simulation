import {FreightPlatform} from "./FreightPlatform";
import {simulationType} from "./SimulationType";
import SharedTruck from "./trucks/SharedTruck";
import Good from "./Good";
import TraditionalTruck from "./trucks/TraditionalTruck";

/**
 * This comment is a TODO.
 *
 * @param type
 * @param state
 */
export function simulate(type, state) {
    // 1. Initialize goods into instances of Good.
    let goodsList = [];
    state.goods.forEach(good => {
        goodsList.push(new Good(
            good.quantity,          // quantity
            good.weight,            // weight
            good.volume,            // volume
            good.pickupLocation,    // pickUp
            good.deliveryLocation,  // delivery
            state.map               // map object
        ));
    });

    // 2. Initialize trucks into instances of the type of truck corresponding to the simulation type.
    let trucksList = [];

    if (type === simulationType.SHARED) {
        state.trucks.forEach(truck => {
            trucksList.push(new SharedTruck(
                truck.type,             // type
                truck.startLocation,    // location
                state.map,              // map object
                30                      // tick rate
            ));
        });
    } else if (type === simulationType.TRADITIONAL) {
        state.trucks.forEach(truck => {
            trucksList.push(new TraditionalTruck(
                truck.type,             // type
                truck.startLocation,    // location
                state.map,              // map object
                30                      // tick rate
            ));
        });

        alert('Traditional simulation has not been fulled implemented yet.');
    } else {
        console.err("Simulate function got an unknown input value for the parameter 'type'.");
    }

    // 3. Create a freight platform manager.
    let freightPlatform = new FreightPlatform(trucksList, goodsList);

    // 4. Let all products choose a truck.
    freightPlatform.distributeGoodsOverTrucks(); // TODO only sharing logistics method !!
    console.log(this.__trucks);

    // 5. TODO Actually run the simulation and store the results.
}