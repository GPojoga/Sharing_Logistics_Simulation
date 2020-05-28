import Router from "@/classes/Router";
import UpdateMessage from "@/classes/util/UpdateMessage";
import CostHandler from "@/classes/trucks/CostHandler";

export default class PlanManager{

    truck = Object;

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

    /**
     * an instance of Router. It is liable for computing a route
     * @type {Router}
     */
    router = new Router();

    costHandler;

    constructor(truck) {
        this.truck = truck;
        this.costHandler = new CostHandler(this.plan,truck);
    }

    /**
     * send the truck home
     */
    goHome(){
        this.plan.orders.push({
            location : this.truck.initialLocation,
            type : "home",
            good : null
        });
        this.start();
    }

    start(){
        if(!this.truck.isMoving && this.plan.currentIndex < this.plan.orders.length){
            this.truck.isMoving = true;
            let order = this.plan.orders[this.plan.currentIndex];
            this.router.getRoute(this.truck.location,order.location).then( route => {
                this.truck.route = Object.assign(route,{
                    index : 0,
                    distSegment : route.route[0].distance,
                    timeSegment : route.route[0].duration
                });
                this.truck.followOrder(order);
            });
        }
    }

    /**
     * assign the truck to the good
     * @param good the good to be transported
     * @param pickupIndex
     * @param deliveryIndex
     */
    addGood(good,pickupIndex,deliveryIndex){
        this.plan.orders.splice(pickupIndex,0,this._createPickupOrder(good,pickupIndex));
        this._updateExpectedLoad(good,pickupIndex,deliveryIndex);
        this.plan.orders.splice(deliveryIndex + 1,0,this._createDeliveryOrder(good,deliveryIndex));
        this.start();
    }

    _updateExpectedLoad(good,pickupIndex,deliveryIndex){
        for(let i = pickupIndex + 1; i <= deliveryIndex; i++){
            this.plan.orders[i].expectedLoad.weight += good.weight * good.quantity;
            this.plan.orders[i].expectedLoad.volume += good.volume * good.quantity;
        }
    }

    _createPickupOrder(good,pickupIndex){
        return {
            location: good.pickUp,
            type: "pickUp",
            good: good,
            expectedLoad : {
                weight : pickupIndex === 0 ?
                    good.weight * good.quantity:
                    this.plan.orders[pickupIndex - 1].expectedLoad.weight + good.weight * good.quantity,
                volume : pickupIndex === 0 ?
                    good.volume * good.quantity:
                    this.plan.orders[pickupIndex - 1].expectedLoad.volume + good.volume * good.quantity,
            }
        };
    }

    _createDeliveryOrder(good,deliveryIndex){
        return {
            location: good.delivery,
            type: "delivery",
            good: good,
            expectedLoad: {
                weight : this.plan.orders[deliveryIndex].expectedLoad.weight - good.weight * good.quantity,
                volume : this.plan.orders[deliveryIndex].expectedLoad.volume - good.volume * good.quantity
            }
        };
    }

    getOrder(index){
        return this.plan[index];
    }

    getPlanLength(){
        return this.plan.orders.length;
    }

    getIndex(){
        return this.plan.currentIndex;
    }

    getCost(good,pickupIndex,deliveryIndex){
        return this.costHandler.getCost(good,pickupIndex,deliveryIndex);
    }

    update(source,message){
        if(message === UpdateMessage.Finished){
            this.plan.currentIndex += 1;
            this.start();
        }
    }
}