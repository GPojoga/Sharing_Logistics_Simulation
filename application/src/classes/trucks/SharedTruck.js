import Truck from "./Truck"

export default class SharedTruck extends Truck{
    constructor(type,location,mapObj,tickRate) {
        super(type,location,mapObj,tickRate);
    }

    hasSpace() {
        // FIXME Truck class doesn't have a capacity field, so can't check if truck is full!!
        return true;
    }

    /**
     * TODO simply copied from TraditionalTruck, for now.
     * @param good
     * @private
     */
    _addGood(good) {
        if(good === null){
            this.plan.push({
                location : this.initialLocation,
                type : "home",
                good : null
            });
        } else {
            let pickUp = {
                location : good.pickUp,
                type : "pickUp",
                good : {
                    quantity : good.quantity,
                    volume : good.volume,
                    weight : good.weight
                }
            };
            this.plan.push(pickUp);

            let delivery = {
                location : good.delivery,
                type : "delivery",
                good : {
                    quantity : good.quantity,
                    volume : good.volume,
                    weight : good.weight
                }
            };
            this.plan.push(delivery);
        }
    }
}