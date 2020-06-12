import haversine from "@/util/haversine";

export default class CostHandler{
    plan;
    truck;

    constructor(plan,truck){
        this.plan = plan;
        this.truck = truck;
    }

    getCost(good,pickupIndex,deliveryIndex){
        // Get initial weight and location right before pickup location.
        let weight = pickupIndex === 0 ? 0 : this.plan.orders[pickupIndex - 1].expectedLoad.weight;
        let location = pickupIndex === 0 ? this.truck.initialLocation : this.plan.orders[pickupIndex - 1].location;

        // Fuel used to get to the pickup location.
        let fuel = this.truck.computeFuelConsumed(haversine(location,good.pickUp) ,weight);
        location = good.pickUp;  // Update location and weight.
        weight += good.quantity * good.weight;

        if (pickupIndex < deliveryIndex){  // If the truck returns to the planned path after pickup.
            fuel += this.truck.computeFuelConsumed(haversine(location,this.plan.orders[pickupIndex].location),weight);
            location = this.plan.orders[pickupIndex].location;
            weight = good.quantity * good.weight + this.plan.orders[pickupIndex].expectedLoad.weight;
        }

        for(let i = pickupIndex + 1;i < deliveryIndex;i++){
            // Increase cost of transport due to increase in weight caused by the good.
            let distance = haversine(location,this.plan.orders[i].location)/1000;
            fuel += good.quantity * good.weight * distance * this.truck.properties.consumptionPerKg;
            weight = good.quantity * good.weight + this.plan.orders[i].expectedLoad.weight;
            location = this.plan.orders[i].location;  // Update location and weight
        }

        // Fuel used to get the delivery location.
        fuel += this.truck.computeFuelConsumed(haversine(location,good.delivery),weight);
        weight -= good.quantity * good.weight;  // Update the weight after delivering the good.

        // Return to the planned path if needed.
        if (deliveryIndex < this.plan.orders.length)
            fuel += this.truck.computeFuelConsumed(haversine(good.delivery, this.plan.orders[deliveryIndex].location), weight);

        fuel -= this._savedCost(pickupIndex,deliveryIndex);
        return fuel;
    }


    /**
     * This method finds the fuel used in the parts of the plan that are no longer travelled.
     * @param pickupIndex The index where the pickup order should be added in the plan.
     * @param deliveryIndex The index where the delivery order should be added in the plan.
     * @return {number} The fuel saved by taking a detour through pickup index and delivery index.
     * @private This is a helper function to getCost()
     */
    _savedCost(pickupIndex,deliveryIndex){
        // Get initial the payload weight and location of the truck.
        let weight = pickupIndex === 0 ? 0 : this.plan.orders[pickupIndex - 1].expectedLoad.weight;
        let location = pickupIndex === 0 ? this.truck.initialLocation : this.plan.orders[pickupIndex - 1].location;
        let fuel = 0;

        if (pickupIndex < deliveryIndex){
            fuel += this.truck.computeFuelConsumed(haversine(location,this.plan.orders[pickupIndex].location),weight);
            location = this.plan.orders[deliveryIndex - 1].location;
            weight = this.plan.orders[deliveryIndex - 1].expectedLoad.weight;
        }
        if (deliveryIndex < this.plan.orders.length){
            fuel += this.truck.computeFuelConsumed(haversine(location,this.plan.orders[deliveryIndex].location),weight);
        }
        return fuel;
    }
}