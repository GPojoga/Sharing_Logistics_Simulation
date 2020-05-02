
import store from "../store/index.js";
import {euclideanDistance} from "@/classes/euclideanDistance";

export class Truck{

    /**
     * properties of the truck
     * @type {null,object}
     */
    properties = null;

    /**
     * truck location
     * @type {{lng: Number, lat: Number}}
     */
    location = {
        lat: Number,
        lng: Number,
    };

    /**
     * total fuel consumed
     * @type {number}
     */
    fuelConsumed = 0;

    /**
     * The sum of delivery time for all products transported by this truck
     * @type {number}
     */
    totalDeliveryTime = 0;

    /**
     * total number of delivered products by this truck
     * @type {number}
     */
    nrDeliveredProducts = 0;

    /**
     * Number of products cached inside truck
     * @type {number}
     * @private
     */
    __cacheSize = 10;

    /**
     * List of nearest products. Cleared when a new route is assigned.
     * @type {*[]}
     * @private
     */
    __cache = [];

    /**
     *
     * @param type truck type ("Light"|"Heavy"|"Train")
     * @param method simulation method ("Traditional" | "Shared")
     * @param location initial location of the truck
     */
    constructor(type,location) {
        this.location = location;
        this.__setProperties(type);
    }

    /**
     * This function retrieves the properties of the given truck type
     * from the store. If the type does not exist in the store, the
     * Train type is set by default
     * @param type truck type
     * @private
     */
    __setProperties(type){
        let tType = store.state.truckTypes.find(x => x.key === type);
        if(tType !== undefined){
            this.properties = tType;
        }else{
            console.error("Truck : Undefined truck type (default : Train)");
            this.properties = store.state.truckTypes.find(x => x.key === "Train");
        }
    }

    /** DEBUG VERSION (wrong list of products)
     * This function returns the nth preferred product of the truck.
     * The most preferred product (0th), will require the smallest amount of fuel to pick up.
     * @param n nth preferred product
     */
    getPreferredProduct(n){
        if(this.__cache.length === 0){
            this.__updateCache();
        }

        if(n >= store.state.debugListProducts.length){
            console.error("Invalid index of the Preferred Product");
            return ;
        }

        if(this.__cacheSize > n){
            return this.__cache[n];
        } else {
            let list = store.state.debugListProducts.slice();
            return list.sort((a,b) => this.__compareFuelConsumption(a.from,b.from))[n];
        }
    }

    /**     DEBUG VERSION (remaining distance from the current route is not considered)
     *
     *  This function computes the amount of fuel necessary to reach the given location.
     *  The result is computed using the amount of fuel necessary to finish the current route (if any),
     *  and the fuel consumed to arrive (empty) at the location.
     * @param location
     * @returns {number} the amount of fuel
     */
    fuelToReach(location){
        let emptyDistance = euclideanDistance(this.location,location);
        return emptyDistance * this.properties.consumption0;
    }

    /**
     *  Stores in the cached the nth most preferred products.
     *  n = this.__cacheSize
     * @private
     */
    __updateCache(){
        let list = store.state.debugListProducts.slice();
        list.sort((a,b) => this.__compareFuelConsumption(a.from,b.from));
        this.__cache = list.slice(0,this.__cacheSize);
    }

    /**
     *
     * @param a location a
     * @param b location b
     * @returns {number} if the fuel necessary to reach a > fuel necessary to reach b then 1 else -1
     * @private
     */
    __compareFuelConsumption(a,b){
        return this.fuelToReach(a) > this.fuelToReach(b) ? 1 : -1;
    }

}