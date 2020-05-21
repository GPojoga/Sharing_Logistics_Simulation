import {Observable} from "../Observable";
import {GoodView} from "./GoodView";

export default class Good extends Observable{

    quantity = Number;
    weight = Number;
    volume = Number;

    /**
     * {
     *  { pickup
     *     lat : latitude
     *     lng : longitude
     *  }
     *  { delivery
     *     lat : latitude
     *     lng : longitude
     *  }
     * }
     *
     * @type {ObjectConstructor}
     */
    pickUp = Object;
    delivery = Object;

    constructor(quantity,weight,volume,pickUp, delivery, mapObj){
        super();
        this.quantity = quantity.value;
        this.weight = weight.value;
        this.volume = volume.value;
        this.pickUp = pickUp;
        this.delivery = delivery;
        this.addListener(new GoodView(this, mapObj));
    }

    chooseTruck(trucks) {
        let lowestCost = {cost : Number.MAX_VALUE};
        let lowestCostTruck = null;
        trucks.forEach(truck => {
            const cost = truck.getLowestCost(this);

            if (cost.cost < lowestCost.cost) {
                lowestCost = cost;
                lowestCostTruck = truck;
            }
        });
        lowestCostTruck.assignToGood(this,lowestCost.pickup,lowestCost.delivery);
    }
}