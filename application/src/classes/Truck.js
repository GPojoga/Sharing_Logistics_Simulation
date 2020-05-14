
import store from "../store/index.js";
import {Observable} from "@/classes/Observable";
import {TruckView} from "@/classes/TruckView";
import Router from "@/classes/Router";
import euclidDist from "@/classes/EuclidDist";

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

    distance = 0;
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
     * start following the plan
     * @private
     */
    _start(){
        if(!this.isMoving && this.plan.length > 0){
            console.log("Truck started");
            this.isMoving = true;
            let order = this.plan.shift();
            this.router.getRoute(this.location,order.location).then( route => {
                this._currentRoute = route;
                this._followRoute(0,order);
            });
        }
    }

    /**
     * follow the current route
     * @private
     */
    _followRoute(index,order){
        setTimeout(() => {
            if(index < this._currentRoute.route.length - 1){
               this._followRoute(this._updateRouteProgress(index),order);
            } else {
                this._routeFinished(order);
            }
        },1000/this._tickRate);
    }

    _routeFinished(order){
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
        console.log("type = ",this.properties.type);
        console.log("expected distance = ",this._currentRoute.distance);
        console.log("current distance = ",this.distance);
        this._start();
    }

    /**
     * update the position of the truck by following the route
     * @param index the index of the last route segment that was visited
     * @private
     */
    _updateRouteProgress(index){
        let distance = 0;
        let time = 1/this._tickRate;
        let route = this._currentRoute.route;
        let position = this.location;
        let begin = route[index].coordinates;
        let ratio = euclidDist(begin,position) / euclidDist(begin,route[index + 1].coordinates);
        let timeSegment = (1 - ratio) * route[index].duration;
        let distanceSegment = (1 - ratio) * route[index].distance;
        while(time > timeSegment){
            if(route[index].duration === 0){
                this.fuelConsumed += this._computeFuelConsumed(distance);
                this.distance += distance;
                this._setLocation(route[index].coordinates);
                return index;
            }
            index += 1;
            distance += distanceSegment;
            time -= timeSegment;
            distanceSegment = route[index].distance;
            timeSegment = route[index].duration;
            position = route[index].coordinates;
        }
        ratio = time / timeSegment;
        distance += ratio * distanceSegment;
        this.fuelConsumed += this._computeFuelConsumed(distance);
        this.distance += distance;

        this._setLocation({
            lat : (route[index + 1].coordinates.lat - position.lat) * ratio +
                    position.lat,
            lng : (route[index + 1].coordinates.lng - position.lng) * ratio +
                    position.lng
        });
        return index;
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
        // console.log("New location was set");
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