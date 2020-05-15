/*
 * This is the freight platform - the place where goods are posted and where trucks can make their offers.
 * It is part of the simulation using the sharing logistics method.
 *
 * It has a manager that makes sure that only one good can be bid on at the same time. This manager controls the process
 * of assigning goods to trucks.
 *
 * The idea of a freight platform is based on the real https://www.saloodo.com/.
 */

export class FreightPlatform {
    // Properties:
    __trucks;
    __goods;

    // Methods:
    constructor(trucks, goods) {
        this.__trucks = trucks;
        this.__goods = goods;
    }

    distributeGoodsOverTrucks() {

    }
}