import Truck from "@/classes/trucks/Truck.js"

export default class TraditionalTruck extends Truck{

    constructor(type,location,store,tickRate){
        super(type,location,store,tickRate);
    }

    /**
     * This method finds the minimal cost of adding a good to the trucks plan assuming traditional logistics.
     * @param good The good that we should find the lowest cost of adding.
     * @returns {{delivery: number, cost: number, pickup: number}} Object containing; cost, pickup and delivery indexes.
     * Note: If the truck can't transport the good the returned cost is Infinity!
     */
    getLowestCost(good) {
        // Keeps track of the best place to added product for the lowest cost.
        let best = {cost: Infinity, pickup: 0, delivery: 0};

        // Case the truck can't transport the product, meaning it doesn't fit in the truck.
        if (good.weight * good.quantity > this.properties.maxPayload ||
            good.volume * good.quantity > this.properties.volume) return best;

        // Loop over all orders, that aren't delivery orders.
        let lowestIndex = (this.planManager.getPlanLength() !== 0) ? this.planManager.getIndex() + 1: 0;
        for (let pickup = lowestIndex; pickup <= this.planManager.getPlanLength(); pickup++) {
            if (pickup < this.planManager.getPlanLength() && this.planManager.getOrder(pickup).type === "delivery") continue;
            let delivery = pickup;
            let cost = this.getCost(good, pickup, delivery);
            if (cost < best.cost) best = {cost: cost, pickup: pickup, delivery: delivery};
        }
        return best;
    }
}