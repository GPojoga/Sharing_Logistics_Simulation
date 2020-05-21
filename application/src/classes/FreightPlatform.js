/*
 * This is the freight platform - the place where goods are posted and where trucks can make their offers.
 * It is part of the simulation using the sharing logistics method.
 *
 * It is a sort of manager that makes sure that only one good can be bid on at the same time.
 * This manager controls the process of assigning goods to trucks.
 *
 * The idea of a freight platform is based on the real freight platform https://www.saloodo.com/.
 */

export class FreightPlatform {
    _trucks;
    _goods;

    constructor(trucks, goods) {
        this._trucks = trucks;
        this._goods = goods;
    }

    /**
     * This method lets the goods choose a truck that will transport it, one by one.
     */
    distributeGoodsOverTrucks() {
        this._goods.forEach(good => {
            this.chooseTruck(good,this._trucks);
        });
    }

    chooseTruck(good,trucks) {
        let lowestCost = {cost : Number.MAX_VALUE};
        let lowestCostTruck = null;
        trucks.forEach(truck => {
            const cost = truck.getLowestCost(good);
            if (cost.cost < lowestCost.cost) {
                lowestCost = cost;
                lowestCostTruck = truck;
            }
        });
        lowestCostTruck.assignToGood(good,lowestCost.pickup,lowestCost.delivery);
    }
}