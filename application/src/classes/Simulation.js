
/* Calls FreightPlatform.js and stuff. This comment is a TODO.

Two types of simulations:

1. Shared: initialize sharedTruck
2. Traditional: initialize traditionalTruck

 */

import {FreightPlatform} from "./FreightPlatform";
import {simulationType} from "./SimulationType";

export function simulate(type, state) {
    if (type === simulationType.SHARED) {
        // 1. Initialize trucks of the given type.


        // 2. Create a freight platform manager.
        let freightPlatform = new FreightPlatform(state.trucks, state.goods);

        // 3. Let all products choose a truck.
        freightPlatform.distributeGoodsOverTrucks();

        alert("Shared logistics simulation hasn't been implemented yet!");
    } else if (type === simulationType.TRADITIONAL) {

        alert("Traditional simulation hasn't been implemented yet!");
    } else {
        console.err("simulate function got an unknown input value for the parameter 'type'");
    }
}