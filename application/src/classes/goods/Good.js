import {Observable} from "../Observable";
import {GoodView} from "./GoodView";
import {simulationType} from "../SimulationType";

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

    chooseTruck(trucks, simType) {
        let lowestCost = Number.MAX_VALUE;
        let lowestCostTruck = null;

        trucks.forEach(truck => {
            if (simType === simulationType.SHARED || (simType === simulationType.TRADITIONAL && truck.isEmpty())) {
                const cost = truck.getLowestCost(this);

                if (cost < lowestCost) {
                    lowestCost = cost;
                    lowestCostTruck = truck;
                }
            }
        });

        if (lowestCostTruck == null) return;
        lowestCostTruck.assignToGood(this);
        console.log('Good');
        console.log(this);
        console.log('assigned to');
        console.log(lowestCostTruck);
    }
}