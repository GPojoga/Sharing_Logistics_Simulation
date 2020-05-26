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
    disabled = false;

    /**
     * An array of best insertions for each available truck in the simulation.
     */
    trucksInserts = Array;
    /**
     * This insertion with the lowest cost from all the truck insertions.
     */
    bestInsert = Object;

    constructor(quantity, weight, volume, pickUp, delivery, mapObj){
        super();
        this.quantity = quantity.value;
        this.weight = weight.value;
        this.volume = volume.value;
        this.pickUp = pickUp;
        this.delivery = delivery;
        this.addListener(new GoodView(this, mapObj));
    }

    /**
     * This method initializes the cheapest insertions for each truck and as well as the overall cheapest insertion.
     * @param trucks The array of trucks of the simulation.
     */
    giveTruckList(trucks) {
        this.trucksInserts = new Array(trucks.length);
        this.bestInsert = {cost: Infinity, pickup: null, delivery: null, truckIndex: null};
        for (let i = 0; i < this.trucksInserts.length; i++){
            let insert = trucks[i].getLowestCost(this);
            insert.truckIndex = i;
            this.trucksInserts[i] = insert;
            if (this.bestInsert.cost > insert.cost) this.bestInsert = insert;
        }
    }

    /**
     * This method updates the cheapest insertion of a truck in the trucksInserts array.
     * @param truck The truck that's insertion needs to be updated.
     * @param index The index of the truck that should be updated.
     */
    updateTruck(truck, index) {
        let insert = truck.getLowestCost(this);
        insert.truckIndex = index;
        this.trucksInserts[index] = insert;
        if (this.bestInsert === index) {
            // Case the truck that has been updated held the previous title of best insert.
            this.findBestInsert();
        } else {
            // Case another truck was updated.
            if (this.bestInsert.cost > insert.cost) this.bestInsert = insert;
        }
    }

    /**
     * This method is call in cases where the truck with the best insert has been updated and the best insert is lost.
     */
    findBestInsert(){
        this.bestInsert = {cost: Infinity, pickup: null, delivery: null, truckIndex: null};
        for (let i = 0; i < this.trucksInserts.length; i++){
            if (this.bestInsert.cost > this.trucksInserts[i].cost) this.bestInsert = this.trucksInserts[i];
        }
    }

    /**
     * @returns {ObjectConstructor} This method returns the best insertion for this product.
     */
    getBestInsert() {
        return this.bestInsert;
    }

    /**
     * @returns {number} This method returns the current lowest cost of adding this product for all trucks.
     */
    getLowestCost() {
        return this.bestInsert.cost;
    }

    disable(){
       this.disabled = true;
       this.notify();
    }
}