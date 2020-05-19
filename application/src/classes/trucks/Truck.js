
import store from "../../store";
import {Observable} from "../Observable";
import {TruckView} from "./TruckView";
import Router from "../Router";

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

    /**
     * [{
     *     location : {
     *         lat : latitude,
     *         lng : longitude
     *     }
     *     type : "pickUp" | "delivery" | "home"
     *     good : {
     *         quantity : number of goods of the same type
     *         volume : the volume of the good
     *         weight : the weight of the good
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
        if (this.constructor === Truck) {
            throw new Error('Can not instantiate abstract class Truck!');
        }
        console.log('truck type: ' + type);
        this.initialLocation = location;
        this.location = location;
        this._tickRate = tickRate;
        this._setProperties(type);
        this.addListener(new TruckView(this,mapObj));
    }

    hasSpace() {
        return new Error('Can not call abstract method hasSpace of Truck!');
    }

    isEmpty() {
        return (this.plan === []);
    }

    /**
     * send the truck home
     */
    sendHome(){
        this.plan.push({
            location : this.initialLocation,
            type : "home",
            good : null
        });
        this._start();
    }

    /**
     * assign this truck to the given good
     * @param good
     */
    assignToGood(good){
        this._addGood(good);
        this._start();
    }

    /**
     * assign this truck to the good
     * @param good the good to be transported
     */
    // eslint-disable-next-line no-unused-vars
    _addGood(good){
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
                this.transportedWeight += order.good.quantity * order.good.weight;
                this.transportedVolume += order.good.quantity * order.volume;
                break;
            case "delivery":
                this.transportedWeight -= order.good.quantity * order.good.weight;
                this.transportedVolume -= order.good.quantity * order.good.volume;
                this.nrDeliveredGoods += 1;
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
        let time = 1/this._tickRate;
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

    /**
     * This method returns the expected extra cost to the truck if it wants to pickup and deliver the given good.
     *
     * @param good
     * @returns number, where 0 <= number <= 10.
     */
    // eslint-disable-next-line no-unused-vars
    getCostOfAddingGood(good) {
        // TODO: filler random number
        return Math.random() * 10;
    }
}