
export default class Product{

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
    pickUpDelivery = Object;

    constructor(quantity,weight,volume,pickupDelivery){
        this.quantity = quantity;
        this.weight = weight;
        this.volume = volume;
        this.pickUpDelivery = pickupDelivery;
    }
}