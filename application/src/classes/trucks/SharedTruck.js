import Truck from "./Truck"

export default class SharedTruck extends Truck{
    constructor(type,location,mapObj,tickRate) {
        super(type,location,mapObj,tickRate);
    }
}