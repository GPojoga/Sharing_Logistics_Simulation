
import {Observable} from "../Observable";
import {TruckView} from "./TruckView";
import Router from "../Router";
import store from "../../store/index.js";
import haversine from "@/util/haversine";

/**
 * this is the abstract class for truck
 * it must not be instantiated
 *
 * @class Truck
 * @abstract
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
     * total number of delivered goods by this truck
     * @type {number}
     */
    nrDeliveredGoods = 0;

    /**
     * an instance of Router. It is liable for computing a route
     * @type {Router}
     */
    router = new Router();

    /**{
     *  [{
     *     location : {
     *         lat : latitude,
     *         lng : longitude
     *     }
     *     type : "pickUp" | "delivery" | "home"
     *     good : see Good.js
     *     expectedLoad : {
     *        weight : weight of the transported goods after the order is completed
     *        volume : volume of the transported goods after the order is completed
     *      }
     *  }],
     *  currentIndex : current plan item that is processed
     *
     * }
     */
    plan = {
        orders : [],
        currentIndex : 0
    };


    currentLoad = {
        weight : 0,
        volume : 0
    };

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

    finished = false;

    /**
     *
     * @param type truck type ("Light"|"Heavy"|"Train")
     * @param location initial location of the truck
     * @param mapObj the map on which the truck is visualized
     * @param tickRate updates per second
     */
    constructor(type,location,mapObj,tickRate) {
        super();
        if (this.constructor === Truck) {
            throw new Error('Can not instantiate abstract class Truck!');
        }
        console.log('new truck of type: ' + type);
        this.initialLocation = location;
        this.location = location;
        this._tickRate = tickRate;
        this._setProperties(type);
        this.addListener(new TruckView(this,mapObj));
    }

    hasFinished() {
        return this.finished;
    }

    hasSpace() {
        return new Error('Can not call abstract method hasSpace of Truck!');
    }

    isEmpty() {
        return (this.plan.orders === []);
    }

    /**
     * send the truck home
     */
    sendHome(){
        this.plan.orders.push({
            location : this.initialLocation,
            type : "home",
            good : null
        });
        this._start();
    }

    /**
     * assign this truck to the given good
     * @param good
     * @param pickupIndex
     * @param deliveryIndex
     */
    assignToGood(good,pickupIndex,deliveryIndex){
        this._addGood(good,pickupIndex,deliveryIndex);
        this._start();
    }

    /**
     * assign this truck to the good
     * @param good the good to be transported
     * @param pickupIndex
     * @param deliveryIndex
     */
    _addGood(good,pickupIndex,deliveryIndex){
        let pickUp = {
            location: good.pickUp,
            type: "pickUp",
            good: good,
            expectedLoad : {
                weight : this.plan.orders.length === 0 ?
                            good.weight :
                            this.plan.orders[pickupIndex - 1].expectedLoad.weight + good.weight,
                volume : this.plan.orders.length === 0 ?
                            good.volume :
                            this.plan.orders[pickupIndex - 1].expectedLoad.volume + good.volume,
            }
        };
        this.plan.orders.splice(pickupIndex,0,pickUp);

        for(let i = pickupIndex + 1;i <= deliveryIndex;i++){
            this.plan.orders[i].expectedLoad.weight += good.weight;
            this.plan.orders[i].expectedLoad.volume += good.volume;
        }

        let delivery = {
            location: good.delivery,
            type: "delivery",
            good: good,
            expectedLoad: {
                weight : this.plan.orders[deliveryIndex].expectedLoad.weight - good.weight,
                volume : this.plan.orders[deliveryIndex].expectedLoad.volume - good.volume
            }
        };
        this.plan.orders.splice(deliveryIndex + 1,0,delivery);
    }

    /**
     * This method calculates the change in cost of adding a good at certain indexes in the plan.
     * @param good The good that is being added.
     * @param pickupIndex The index in the plan where the truck should pick up the good.
     * @param deliveryIndex The index in the plan where the truck should deliver the good.
     * @returns {number} A number representing the change in cost.
     */
    getCost(good,pickupIndex,deliveryIndex){
        let weight = pickupIndex === 0 ? 0 : this.plan.orders[pickupIndex - 1].expectedLoad.weight;
        let location = pickupIndex === 0 ? this.initialLocation : this.plan.orders[pickupIndex - 1].location;
        let dist = haversine(location,good.pickUp);
        let fuel = this._computeFuelConsumed(dist,weight);
        location = good.pickUp;
        weight += good.quantity * good.weight;
        if (pickupIndex < deliveryIndex){
            fuel += this._computeFuelConsumed(haversine(location,this.plan.orders[pickupIndex].location),weight);
            location = this.plan.orders[pickupIndex].location;
        }
        for(let i = pickupIndex + 1;i < deliveryIndex;i++){
            dist = haversine(location,this.plan.orders[i].location);
            fuel += weight * (dist/1000) * this.properties.consumptionPerKg;
            weight = good.quantity * good.weight + this.plan.orders[i].expectedLoad.weight;
            location = this.plan.orders[i].location;
        }
        dist = haversine(location,good.delivery);
        fuel += this._computeFuelConsumed(dist,weight);
        location = deliveryIndex >= this.plan.orders.length ? good.delivery : this.plan.orders[deliveryIndex].location;
        dist = haversine(good.delivery,location);
        weight -= good.quantity * good.weight;
        fuel += this._computeFuelConsumed(dist,weight);
        fuel -= this._savedCost(pickupIndex,deliveryIndex);
        return fuel;
    }

    /**
     * This is a helper function for getCost
     * @param pickupIndex
     * @param deliveryIndex
     * @return {number}
     * @private
     */
    _savedCost(pickupIndex,deliveryIndex){
        let weight = pickupIndex === 0 ? 0 : this.plan.orders[pickupIndex - 1].expectedLoad.weight;
        let location = pickupIndex === 0 ? this.initialLocation : this.plan.orders[pickupIndex - 1].location;
        let fuel = 0;

        if (pickupIndex >= this.plan.orders.length){
            return 0;
        }
        if (pickupIndex < deliveryIndex){
            fuel += this._computeFuelConsumed(haversine(location,this.plan.orders[pickupIndex].location),weight);
            location = this.plan.orders[deliveryIndex - 1].location;
            weight = this.plan.orders[deliveryIndex - 1].expectedLoad.weight;
        }
        if (deliveryIndex >= this.plan.orders.length){
            return fuel;
        } else {
            fuel += this._computeFuelConsumed(haversine(location,this.plan.orders[deliveryIndex].location),weight);
            return fuel;
        }
    }

    /**
     * This method finds the minimal cost of adding a good to the trucks plan.
     * @param good The good that we should find the cost of adding.
     * @returns {{delivery: number, cost: number, pickup: number}} Object containing the cost, pickup & delivery index.
     */
    // eslint-disable-next-line no-unused-vars
    getLowestCost(good){
        throw new Error("Cannot call an abstract method");
    }

    /**
     * start following the plan
     * @private
     */
    _start(){
        if(!this.isMoving && this.plan.currentIndex < this.plan.orders.length){
            console.log("Truck started");
            this.isMoving = true;
            let order = this.plan.orders[this.plan.currentIndex];
            this.router.getRoute(this.location,order.location).then( route => {
                this._currentRoute = Object.assign(route,{
                    index : 0,
                    distSegment : route.route[0].distance,
                    timeSegment : route.route[0].duration
                });
                this._followOrder(order);
            });
        } else {
            this.finished = true;
            this.notifyHasFinishedListeners();
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
        switch (order.type) {
            case "pickUp":
                this.currentLoad.weight += order.good.quantity * order.good.weight;
                this.currentLoad.volume += order.good.quantity * order.volume;
                break;
            case "delivery":
                this.currentLoad.weight -= order.good.quantity * order.good.weight;
                this.currentLoad.volume -= order.good.quantity * order.good.volume;
                this.nrDeliveredgoods += 1;
                break;
        }
        this.isMoving = false;
        this.plan.currentIndex += 1;
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
                this.fuelConsumed += this._computeFuelConsumed(distance, this.currentLoad.weight);
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
        this.fuelConsumed += this._computeFuelConsumed(distance, this.currentLoad.weight);
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
     * @param weight
     * @return {number}
     * @private
     */
    _computeFuelConsumed(distance, weight){
        return (distance / 1000) * (weight * this.properties.consumptionPerKg +
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