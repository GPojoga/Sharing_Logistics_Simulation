import {FreightPlatform} from "./FreightPlatform";
import {simulationType} from "./SimulationType";
import SharedTruck from "./trucks/SharedTruck";
import Good from "./goods/Good";
import TraditionalTruck from "./trucks/TraditionalTruck";

/**
 * This comment is a TODO.
 *
 * @param simType
 * @param store
 */
export function simulate(simType, store) {
    // 1. Initialize goods into instances of Good.
    console.log('start simulation');

    console.log(state.goods);
    let goodsList = [];
    store.state.goods.forEach(good => {
        goodsList.push(new Good(
            good.quantity,          // quantity
            good.weight,            // weight
            good.volume,            // volume
            good.pickupLocation,    // pickUp
            good.deliveryLocation,  // delivery
            store.state.map               // map object
        ));
    });

    // 2. Initialize trucks into instances of the type of truck corresponding to the simulation type.
    let trucksList = [];

    console.log(store.state.trucks);
    if (simType === simulationType.SHARED) {
        store.state.trucks.forEach(truck => {
            trucksList.push(new SharedTruck(
                truck.type,             // type
                truck.startLocation,    // location
                store.state.map,        // map object
                30                      // tick rate
            ));
        });
    } else if (simType === simulationType.TRADITIONAL) {
        store.state.trucks.forEach(truck => {
            trucksList.push(new TraditionalTruck(
                truck.type,             // type
                truck.startLocation,    // location
                store.state.map,        // map object
                30                      // tick rate
            ));
        });

        alert('Traditional simulation has not been fulled implemented yet.');
    } else {
        console.err("Simulate function got an unknown input value for the parameter 'type'.");
    }

    // 3. Create a freight platform manager.
    let freightPlatform = new FreightPlatform(trucksList, goodsList);

    // 4. Let all goods choose a truck.
    freightPlatform.distributeGoodsOverTrucks(simType);

    // 5. Wait for the simulation to finish and store the results in the store.

    // TODO some waiter/observer here?

    const results = {
        distance : 'not implemented yet',
        numberOfTrucks : trucksList.filter(truck => truck.nrDeliveredGoods > 0).length, // Not necessarily equal to the length of the trucks array! Some trucks may be left unused.
        fuelConsumed : trucksList.reduce((total,nextTruck) => {
            return total + nextTruck.fuelConsumed;
        }, 0),
        co2emissions : 'not implemented yet'
    };

    console.log(results);

    store.commit('setSimulationResults', {simType, results});
}