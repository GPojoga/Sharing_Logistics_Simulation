
import store from "../store/index.js";
import {Observable} from "@/classes/Observable";
import {TruckView} from "@/classes/TruckView";
import Router from "@/classes/Router";
import euclidDist from "./EuclidDist";

/**
 * this is the abstract class for truck
 * it must not be instantiated
 */
export default class Truck extends Observable{

    /**
     * {
     *  type: Truck type,
     *  volume : The volume of goods the truck can transport m^3.
     *  maxPayload : The max weight of goods the truck can transport kg.
     *  consumptionEmpty : the fuel consumed when empty l/km
     *  consumptionPerKg : the fuel consumed for transporting l/(kg*km)
     * }
     * @type {null,object}
     */
    properties = null;

    /**
     * current location
     * @type {{lng: Number, lat: Number}}
     */
    location = {
        lat: Number,
        lng: Number,
    };

    /**
     * initial location
     * @type {{lng: NumberConstructor, lat: NumberConstructor}}
     */
    initialLocation = {
        lat: Number,
        lng: Number,
    };

    /**
     * total fuel consumed
     * @type {number}
     */
    fuelConsumed = 0;


    /**
     * total number of delivered products by this truck
     * @type {number}
     */
    nrDeliveredProducts = 0;

    /**
     * an instance of Router. It is liable for computing a route
     * @type {Router}
     */
    router = new Router();

    /**
     * [{
     *     location : {
     *         lat : latitude,
     *         lng : longitude
     *     }
     *     type : "pickUp" | "delivery" | "home"
     *     product : {
     *         quantity : number of products of the same type
     *         volume : the volume of the product
     *         weight : the weight of the product
     *     }
     *
     * }]
     */
    plan = [];

    transportedWeight = 0;

    transportedVolume = 0;

    /**
     * {
     *     start : starting location
     *     end : ending location
     *     distance : route distance
     *     duration : route duration
     *     route : [{
     *         coordinates : beginning of the segment
     *         duration : time necessary to pass this segment in seconds
     *         distance : distance of this segment in meters
     *     }]
     *     index : current route segment
     *     distSegment : distance necessary to complete the current segment
     *     timeSegment : time necessary to complete the current segment
     * }
     * @private
     */
    _currentRoute;

    /**
     * updates per second
     */
    _tickRate = 30;

    /**
     * @type {number} The last time the truck was updated in simulation time.
     * @private
     */
    _lastUpdate = 0;

    /**
     * the state of the truck : moving | not moving
     */
    isMoving = false;

    /**
     *
     * @param type truck type ("Light"|"Heavy"|"Train")
     * @param location initial location of the truck
     * @param mapObj the map on which the truck is visualized
     * @param tickRate updates per second
     */
    constructor(type,location,mapObj,tickRate) {
        super();
        this.initialLocation = location;
        this.location = location;
        this._tickRate = tickRate;
        this._setProperties(type);
        this.addListener(new TruckView(this,mapObj));
    }

    /**
     * send the truck home
     */
    sendHome(){
        this.plan.push({
            location : this.initialLocation,
            type : "home",
            product : null
        });
        this._start();
    }

    /**
     * assign this truck to the given product
     * @param product
     */
    assignToProduct(product){
        this._addProduct(product);
        this._start();
    }

    /**
     * assign this truck to the product
     * @param product the product to be transported
     */
    // eslint-disable-next-line no-unused-vars
    _addProduct(product){
        throw new Error("Cannot call an abstract method");
    }

    /**
     * This method calculates the change in cost of adding a product at certain indexes in the plan.
     * @param product The product that is being added.
     * @param pickup The index in the plan where the truck should pick up the product.
     * @param delivery The index in the plan where the truck should deliver the product.
     * @returns {number} A number representing the change in cost.
     */
    getCost(product, pickup, delivery){
        let detour;

        // Leave the planned path to pickup product.
        detour = euclidDist(this.plan[pickup - 1].location, product.pickUp);

        if (pickup === delivery) {
            // Case: Go straight to deliver added product.
            detour += euclidDist(product.pickUp, product.delivery);
            detour -= euclidDist(this.plan[pickup - 1].location, this.plan[delivery].location);
        } else {
            // Case: Go back to planned path after picking up.
            detour += euclidDist(product.pickUp, this.plan[pickup].location);
            detour -= euclidDist(this.plan[pickup - 1].location, this.plan[pickup].location);

            // Leave the planned path to deliver the product.
            detour += euclidDist(this.plan[delivery - 1].location, product.delivery);
            if (delivery !== this.plan.length) detour -= euclidDist(this.plan[delivery - 1].location, this.plan[delivery]);
        }

        // Return to the planned path, if needed.
        if (delivery !== this.plan.length) detour += euclidDist(product.delivery, this.plan[delivery].location);

        return detour;  //As of now the cost is equal to the detour, this is overly simplistic, TODO change if possible.
    }

    /**
     * This method finds the minimal cost of adding a product to the trucks plan.
     * @param product The product that we should find the cost of adding.
     * @returns {{delivery: number, cost: number, pickup: number}} Object containing the cost, pickup & delivery index.
     */
    // eslint-disable-next-line no-unused-vars
    getLowestCost(product){
        throw new Error("Cannot call an abstract method");
    }

    /**
     * start following the plan
     * @private
     */
    _start(){
        if(!this.isMoving && this.plan.length > 0){
            console.log("Truck started");
            this.isMoving = true;
            let order = this.plan.shift();
            this.router.getRoute(this.location,order.location).then( route => {
                this._currentRoute = Object.assign(route,{
                    index : 0,
                    distSegment : route.route[0].distance,
                    timeSegment : route.route[0].duration
                });
                this._followOrder(order);
            });
        }
    }

    /**
     * follow the current route
     * @private
     */
    _followOrder(order){
        setTimeout(() => {
            if(this._currentRoute.index < this._currentRoute.route.length - 1){
                this._updateRouteProgress();
                this._followOrder(order);
            } else {
                this._completeOrder(order);
            }
        },1000/this._tickRate);
    }

    /**
     * the actions to be take after the order was completed
     * @param order the order that was finished
     * @private
     */
    _completeOrder(order){
        console.log("Route finished");
        this.isMoving = false;
        switch (order.type) {
            case "pickUp":
                this.transportedWeight += order.product.quantity * order.product.weight;
                this.transportedVolume += order.product.quantity * order.volume;
                break;
            case "delivery":
                this.transportedWeight -= order.product.quantity * order.product.weight;
                this.transportedVolume -= order.product.quantity * order.product.volume;
                this.nrDeliveredProducts += 1;
                break;
        }
        this._start();
    }


    /**
     * update the position of the truck by following the route
     * @private
     */
    _updateRouteProgress(){
        let distance = 0;
        let time = store.getters.time.getTimePassed(this._lastUpdate);
        this._lastUpdate += time;
        let route = this._currentRoute.route;
        while(time > this._currentRoute.timeSegment){
            if(route[this._currentRoute.index].duration === 0){
                this.fuelConsumed += this._computeFuelConsumed(distance);
                this._setLocation(route[this._currentRoute.index].coordinates);
                return ;
            }
            this._currentRoute.index += 1;
            distance += this._currentRoute.distSegment;
            time -= this._currentRoute.timeSegment;
            this._currentRoute.distSegment = route[this._currentRoute.index].distance;
            this._currentRoute.timeSegment = route[this._currentRoute.index].duration;
        }
        let ratio = time / this._currentRoute.timeSegment;
        distance += ratio * this._currentRoute.distSegment;
        this.fuelConsumed += this._computeFuelConsumed(distance);
        this._currentRoute.timeSegment -= time;
        this._currentRoute.distSegment -= ratio * this._currentRoute.distSegment;
        this._setLocation({
            lat : ratio * (route[this._currentRoute.index + 1].coordinates.lat -
                    this.location.lat) + this.location.lat,
            lng : ratio * (route[this._currentRoute.index + 1].coordinates.lng -
                    this.location.lng) + this.location.lng,
        });
    }

    /**
     * fuel consumed by traveling the given distance with the current weight
     * @param distance
     * @return {number}
     * @private
     */
    _computeFuelConsumed(distance){
        return (distance / 1000) * (this.transportedWeight * this.properties.consumptionPerKg +
            this.properties.consumptionEmpty);
    }

    /**
     * set the location of the truck and notify the observers
     * @param location
     * @private
     */
    _setLocation(location){
        this.location = location;
        this.notify();
    }

    /**
     * This function retrieves the properties of the given truck type
     * from the store. If the type does not exist in the store, the
     * Train type is set by default
     * @param type truck type
     * @private
     * @return Object
     */
    _getProperties(type){
        let tType = store.state.truckTypes.find(x => x.key === type);
        let props;
        if(tType !== undefined){
            props = tType;
        }else{
            console.error("Truck : Undefined truck type (default : Train)");
            props = store.state.truckTypes.find(x => x.key === "Train");
        }
        return props;
    }

    /**
     * This method retrieves the description of the truck from storage
     * and sets the properties of the truck according to its type
     * @param type truck type
     * @private
     */
    _setProperties(type){
        let props = this._getProperties(type);
        this.properties = {
            type : type,
            volume : parseFloat(props.volume.value),
            maxPayload : parseFloat(props.maxPayload.value),
            consumptionEmpty : parseFloat(props.consumptionEmpty.value),
            consumptionPerKg :
                (props.consumptionFull.value - props.consumptionEmpty.value) / props.maxPayload.value,
        }
    }
}