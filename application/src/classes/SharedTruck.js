import Truck from "@/classes/Truck"

export default class SharedTruck extends Truck{
    constructor(type,location,mapObj,tickRate) {
        super(type,location,mapObj,tickRate);
    }
}