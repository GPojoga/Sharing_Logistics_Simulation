import Truck from "./Truck"

export default class SharedTruck extends Truck{
    constructor(type,location,mapObj,tickRate) {
        super(type,location,mapObj,tickRate);
    }

    hasSpace() {
        // FIXME Truck class doesn't have a capacity field, so can't check if truck is full!!
        return true;
    }

    /**
     * This method updates the capacity of a truck when it passes over a point in it's plan.
     * @param capacity an object that represents the capacity of the truck.
     * @param point a point in the plan of the truck, it should be; "home" | "pickUp" | "delivery".
     * @private helper function to the function getLowestCost.
     */
    _updateCapacity(capacity, point) {
        if (point.type === "home") return ;
        capacity.payload += point.quantity * point.weight * (point.type === "pickUp") ? 1 : -1;
        capacity.volume += point.quantity * point.volume * (point.type === "pickUp") ? 1 : -1;
    }

    /**
     * This method finds the minimal cost of adding a good to the trucks plan assuming traditional logistics.
     * @param good The good that we should find the lowest cost of adding.
     * @returns {{delivery: number, cost: number, pickup: number}} Object containing; cost, pickup and delivery indexes.
     * Note: If the truck can't transport the good the returned cost is Infinity!
     */
    getLowestCost(good) {
        // Keeps track of the best place to added good for the lowest cost.
        let best = {cost: Infinity, pickup: 0, delivery: 0};

        // Loop over all possible indexes where the product can be picked-up and delivered.
        for (let pickup = this.plan.currentIndex; pickup <= this.plan.orders.length; pickup += 1) {
            for (let delivery = pickup; delivery <= this.plan.orders.length; delivery += 1) {
                // Exit inner loop if the truck can't carry to good anymore.
                if (this.plan.orders[delivery].payload + good.weight * good.quantity > this.properties.maxPayload ||
                    this.plan.orders[delivery].volume + good.volume * good.quantity > this.properties.volume) break;

                let cost = this.getCost(good, pickup, delivery);
                if (cost < best.cost) best = {cost: cost, pickup: pickup, delivery: delivery};
            }
        }
        console.log(best);
        return best;
    }
}