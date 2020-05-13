
import store from "../store/index.js";
import {Observable} from "@/classes/Observable";
import {TruckView} from "@/classes/TruckView";
import {Router} from "@/classes/Router";

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
     *         speed : average speed on this segment
     *     }]
     * }
     * @type {ObjectConstructor}
     * @private
     */
    _currentRoute = Object;

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
            this._goTo(this.plan.shift());
        }
    }

    /**
     * fulfill the given order
     * @param order
     * @private
     */
    _goTo(order){
        this._currentRoute = this.router.getRoute(this.location,order.location);
        this.isMoving = true;
        this._followRoute(0);
        switch (order.type) {
            case "pickUp":
                this.transportedWeight += order.weight;
                this.transportedVolume += order.volume;
                break;
            case "delivery":
                this.transportedWeight -= order.weight;
                this.transportedVolume -= order.volume;
                this.nrDeliveredProducts += 1;
                break;
        }
    }

    /**
     * follow the current route
     * @private
     */
    _followRoute(index){
        setTimeout(() => {
            if(index < this._currentRoute.length){
               this._followRoute(this._updateRouteProgress(index));
            } else {
                this.isMoving = false;
                this._start();
            }
        },1000/this._tickRate);
    }

    /**
     * update the position of the truck by following the route
     * @param index the index of the last route segment that was visited
     * @private
     */
    // eslint-disable-next-line no-unused-vars
    _updateRouteProgress(index){

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