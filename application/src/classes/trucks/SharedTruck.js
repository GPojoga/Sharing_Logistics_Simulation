import Truck from "@/classes/trucks/Truck.js"

export default class SharedTruck extends Truck{
    constructor(type,location,store,tickRate) {
        super(type,location,store,tickRate);
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
        let lowestIndex = (this.planManager.getPlanLength() !== 0) ? this.planManager.getIndex() + 1: 0;
        for (let pickup = lowestIndex; pickup <= this.planManager.getPlanLength(); pickup += 1) {
            for (let delivery = pickup; delivery <= this.planManager.getPlanLength(); delivery += 1) {
                // Exit inner loop if the truck can't carry to good anymore.
                if (0 < delivery &&
                    (this.planManager.getOrder(delivery - 1).expectedLoad.payload + good.weight * good.quantity > this.properties.maxPayload ||
                    this.planManager.getOrder(delivery - 1).expectedLoad.volume + good.volume * good.quantity > this.properties.volume)) break;

                let cost = this.getCost(good, pickup, delivery);
                if (cost < best.cost) best = {cost: cost, pickup: pickup, delivery: delivery};
            }
        }
        return best;
    }
}