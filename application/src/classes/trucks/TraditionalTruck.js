import Truck from "./Truck"

export default class TraditionalTruck extends Truck{

    constructor(type,location,mapObj,tickRate){
        super(type,location,mapObj,tickRate);
    }

    hasSpace() {
        return this.isEmpty();
    }

    /**
     * This method finds the minimal cost of adding a product to the trucks plan assuming traditional logistics.
     * @param product The product that we should find the lowest cost of adding.
     * @returns {{delivery: number, cost: number, pickup: number}} Object containing; cost, pickup and delivery indexes.
     * Note: If the truck can't transport the product the returned cost is Infinity!
     */
    getLowestCost(product) {
        // Keeps track of the best place to added product for the lowest cost.
        let best = {cost: Infinity, pickup: 0, delivery: 0};

        // Case the truck can't transport the product, meaning it doesn't fit in the truck.
        if (product.weight * product.quantity > this.properties.maxPayload ||
            product.volume * product.quantity > this.properties.volume) return best;

        // Loop over all orders, that aren't delivery orders.
        for (let pickup = this.plan.currentIndex; pickup <= this.plan.orders.length; pickup++) {
            if (pickup < this.plan.length && this.plan.orders[pickup].type === "delivery") continue;
            let delivery = pickup;
            let cost = this.getCost(product, pickup, delivery);
            if (cost < best.cost) best = {cost: cost, pickup: pickup, delivery: delivery};
        }
        return best;
    }
}