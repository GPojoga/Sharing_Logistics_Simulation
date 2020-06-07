
import {Observable} from "../util/Observable";
import {TruckView} from "../view/TruckView";
import PlanManager from "@/classes/trucks/PlanManager";
import UpdateMessage from "@/classes/util/UpdateMessage";
import TruckPropertyHandler from "@/classes/trucks/TruckPropertyHandler";
import {truckState} from "./TruckState";

/**
 * this is the abstract class for truck
 * it must not be instantiated
 *
 * @class Truck
 * @abstract
 */
export default class Truck extends Observable {
    // Constant: signifies the time that a truck takes to load or unload a good.
    LOADING_TIME = 60; // 1 minute

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
     * total distance travelled
     * @type {number}
     */
    distanceTravelled = 0;

    /**
     * total number of delivered goods by this truck
     * @type {number}
     */
    nrDeliveredGoods = 0;

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
    route = Object;

    /**
     * updates per second
     */
    _tickRate = 30;

    /**
     * @type {number} The last time the truck was updated in simulation time.
     * @private
     */
    _lastUpdate = 0;

    store;

    state;

    planManager = Object;

    currentOrder = Object;
    /**
     *
     * @param type truck type ("Light"|"Heavy"|"Train")
     * @param location initial location of the truck
     * @param store the map on which the truck is visualized
     * @param tickRate updates per second
     */
    constructor(type,location,store,tickRate) {
        super();
        if (this.constructor === Truck) {
            throw new Error('Can not instantiate abstract class Truck!');
        }
        this.state = truckState.WAITING_FOR_ORDER;
        this.initialLocation = location;
        this.location = location;
        this._tickRate = tickRate;
        this.store = store;
        this.planManager = new PlanManager(this);
        this.properties = TruckPropertyHandler.getProperties(store,type);
        this.addListener(new TruckView(this,store.getters.map));
        this.addListener(this.planManager);
    }

    disable(){
        this.state = truckState.DISABLED;
        console.log("Truck : disabled");
        this.notify(UpdateMessage.Disabled);
    }

    /**
     * send the truck home
     */
    sendHome() {
        this.planManager.goHome();
    }

    /**
     * assign this truck to the given good
     * @param good
     * @param pickupIndex
     * @param deliveryIndex
     */
    assignToGood(good,pickupIndex,deliveryIndex){
        this.planManager.addGood(good,pickupIndex,deliveryIndex);
    }

    /**
     * This method calculates the change in cost of adding a good at certain indexes in the plan.
     * @param good The good that is being added.
     * @param pickupIndex The index in the plan where the truck should pick up the good.
     * @param deliveryIndex The index in the plan where the truck should deliver the good.
     * @returns {number} A number representing the change in cost.
     */
    getCost(good,pickupIndex,deliveryIndex){
        return this.planManager.getCost(good,pickupIndex,deliveryIndex);
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
     * follow the current route
     * @private
     */
    _followOrder(order){
        this.currentOrder = order;
        if (this.state === truckState.DISABLED){
            return;
        }
        setTimeout(() => {
            if(this.route.index < this.route.route.length - 1){
                this._updateRouteProgress();
                this.followOrder(order);
            } else {
                // Truck has arrived at the next location.
                this._completeOrder(order);
            }
        },1000/this._tickRate);
    }

    /**
     * the actions to be taken after the order was completed
     * @param order the order that was finished
     * @private
     */
    _completeOrder(order){
        this.state = truckState.LOADING;
        const self = this;
        switch (order.type) {
            case "pickUp":
                console.log('Truck is loading a good...');
                this._loadOrUnload(0, function() {
                    self._pickupGood(order);
                });
                break;
            case "delivery":
                console.log('Truck is unloading a good...');
                this._loadOrUnload(0, function() {
                    self._deliverGood(order);
                });
                break;
            case "home":
                console.log("Truck finished route and arrived at home");
                this.notify(UpdateMessage.FinishedPlan);
                this.state = truckState.WAITING_FOR_ORDER;
                this.notify(UpdateMessage.FinishedOrder);
        }
    }


    /**
     * update the position of the truck by following the route
     * @private
     */
    _updateRouteProgress(){
        let time = this.store.getters.time.getTimePassed(this._lastUpdate);
        this._lastUpdate += time;
        this._updateRouteProgressHelper(this.route.route,time);
    }

    /**
     * this is a helper function for _updateRouteProgress()
     * @param route the route to be followed
     * @param time the time interval in during which the truck was not updated
     * @private
     */
    _updateRouteProgressHelper(route,time){
        let distance = 0;
        while(time >= this.route.timeSegment){
            if(this.route.index === this.route.route.length - 1){
                this.distanceTravelled += distance;
                this.fuelConsumed += this.computeFuelConsumed(distance, this.currentLoad.weight);
                this._setLocation(route[this.route.index].coordinates);
                return ;
            }
            this.route.index += 1;
            distance += this.route.distSegment;
            time -= this.route.timeSegment;
            this.route.distSegment = route[this.route.index].distance;
            this.route.timeSegment = route[this.route.index].duration;
        }
        let ratio = time / this.route.timeSegment;
        distance += ratio * this.route.distSegment;
        this.fuelConsumed += this.computeFuelConsumed(distance, this.currentLoad.weight);
        this.route.timeSegment -= time;
        this.route.distSegment -= ratio * this.route.distSegment;
        this.distanceTravelled += distance;
        this._setLocation({
            lat : ratio * (route[this.route.index + 1].coordinates.lat -
                this.location.lat) + this.location.lat,
            lng : ratio * (route[this.route.index + 1].coordinates.lng -
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
    computeFuelConsumed(distance, weight){
        return (distance / 1000) * (weight * this.properties.consumptionPerKg +
            this.properties.consumptionEmpty);
    }

    /**
     * set the new location of the truck and notify the observers. Calculate the difference between the current location
     * and the new one and add to distanceTravelled.
     * @param location
     * @private
     */
    _setLocation(location){
        this.location = location;
        this.notify(UpdateMessage.Relocated);
    }

    _pickupGood(order) {
        console.log("Truck picked up good");
        order.good.pickup();
        this.currentLoad.weight += order.good.quantity * order.good.weight;
        this.currentLoad.volume += order.good.quantity * order.good.volume;

        this.state = truckState.WAITING_FOR_ORDER;
        this.notify(UpdateMessage.FinishedOrder);
    }

    _deliverGood(order) {
        console.log("Truck delivered good");
        order.good.deliver();
        this.currentLoad.weight -= order.good.quantity * order.good.weight;
        this.currentLoad.volume -= order.good.quantity * order.good.volume;
        this.nrDeliveredGoods += 1;

        this.state = truckState.WAITING_FOR_ORDER;
        this.notify(UpdateMessage.FinishedOrder);
    }

    /**
     * makes the truck wait a constant amount of time at a place of delivery or pickup
     * @param waitedTime
     * @param callback
     * @private
     */
    _loadOrUnload(waitedTime, callback){
        setTimeout(() => {
            let time = this.store.getters.time.getTimePassed(this._lastUpdate);
            this._lastUpdate += time;
            if (waitedTime < this.LOADING_TIME) {
                this._loadOrUnload(waitedTime + time, callback)
            } else {
                callback();
            }
        },1000/this._tickRate);
    }
}