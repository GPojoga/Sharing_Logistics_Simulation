
export default class Good{

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
    pickUp = Object;
    delivery = Object;

    constructor(quantity,weight,volume,pickUp, delivery){
        this.quantity = quantity;
        this.weight = weight;
        this.volume = volume;
        this.pickUp = pickUp;
        this.delivery = delivery;
    }
}