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
export class Simulation {
    _trucksList = [];
    _goodsList = [];
    _store = null;
    _simType = null;

    simulate(simType, store){
        this._simType = simType;
        this._store = store;

        // 1. Initialize goods into instances of Good.
        console.log('start simulation');

        store.state.goods.forEach(good => {
            this._goodsList.push(new Good(
                good.quantity,          // quantity
                good.weight,            // weight
                good.volume,            // volume
                good.pickupLocation,    // pickUp
                good.deliveryLocation,  // delivery
                store.state.map               // map object
            ));
        });

        // 2. Initialize trucks into instances of the type of truck corresponding to the simulation type.
        if (simType === simulationType.SHARED) {
            store.state.trucks.forEach(truck => {
                const sharedTruck = new SharedTruck(
                    truck.type,             // type
                    truck.startLocation,    // location
                    store.state.map,        // map object
                    30                      // tick rate
                );
                sharedTruck.addListenerHasFinished(this);
                this._trucksList.push(sharedTruck);
            });
        } else if (simType === simulationType.TRADITIONAL) {
            store.state.trucks.forEach(truck => {
                const traditionalTruck = new TraditionalTruck(
                    truck.type,             // type
                    truck.startLocation,    // location
                    store.state.map,        // map object
                    30                      // tick rate
                );
                traditionalTruck.addListenerHasFinished(this);
                this._trucksList.push(traditionalTruck);
            });

            // alert('Traditional simulation has not been fulled implemented yet.');
        } else {
            console.err("Simulate function got an unknown input value for the parameter 'type'.");
        }

        // 3. Create a freight platform manager.
        let freightPlatform = new FreightPlatform(this._trucksList, this._goodsList);

        // 4. Let all goods choose a truck.
        freightPlatform.distributeGoodsOverTrucks();

        // 5. Start the simulation
        store.state.isRunning = true;
        store.getters.time.run(); // TODO trucks already start earlier, in distributeGoodsOverTrucks
    }

    updateHasFinished() {
        this._trucksList = this._trucksList.filter(truck => !truck.hasFinished()); // TODO nicely remove elements, also from map

        if (this._trucksList === []) {
            this.finish();
        }
    }

    finish(){
        const results = {
            distance : 'not implemented yet',
            numberOfTrucks : this._trucksList.filter(truck => truck.nrDeliveredGoods > 0).length, // Not necessarily equal to the length of the trucks array! Some trucks may be left unused.
            fuelConsumed : this._trucksList.reduce((total,nextTruck) => {
                return total + nextTruck.fuelConsumed;
            }, 0),
            co2emissions : 'not implemented yet'
        };

        console.log(results);

        const sim = this._simType;
        this._store.commit('setSimulationResults', {sim, results});
    }
}