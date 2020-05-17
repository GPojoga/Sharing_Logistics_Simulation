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
        this.quantity = quantity;
        this.weight = weight;
        this.volume = volume;
        this.pickUp = pickUp;
        this.delivery = delivery;
        this.addListener(new GoodView(this, mapObj));
    }

    chooseTruck(trucks) {
        let lowestCost = Number.MAX_VALUE;
        let lowestCostTruck = null;

        trucks.forEach(truck => {
            const cost = truck.getCostOfAddingGood(this);

            if (cost < lowestCost) {
                lowestCost = cost;
                lowestCostTruck = truck;
            }
        });

        lowestCostTruck.assignToGood(this);
        console.log('Good');
        console.log(this);
        console.log('assigned to');
        console.log(lowestCostTruck);
    }
}