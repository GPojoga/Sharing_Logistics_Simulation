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
        this.distributeTrucks();
        this.sortGoods();
    }

    /**
     * This method gives the truck list to the goods so that they can choose which truck is best for them.
     */
    distributeTrucks(){
        this._goods.forEach(good => {
            good.giveTruckList(this._trucks);
        });
    }

    /**
     * This method lets the goods choose a truck that will transport it, one by one.
     */
    distributeGoodsOverTrucks() {
        while (this._goods.length !== 0) {
            let good = this._goods.pop();
            let insert = good.getBestInsert();
            console.log(insert);  // TODO: Remove this line of code
            this._trucks[insert.truckIndex].assignToGood(good, insert.pickup, insert.delivery);
            this._goods.forEach(good => {good.updateTruck(this._trucks[insert.truckIndex], insert.truckIndex)});
            this.sortGoods();
        }
    }

    /**
     * This method sorts the goods such that they are added to the simulation in a greedy manner.
     * Note: because we except the goods to already be mostly sorted, we sort them using insertion sort.
     */
    sortGoods(){
        /* Code for insertion sort.
        for (let i = 0; i < this._goods.length; i++){
            let key = this._goods[i].getBestInsert().cost;
            let j;
            for (j = i - 1; 0 <= j; j--) {
                if (this._goods[i].getBestInsert().cost > key) break;
                this._goods[j + 1] = this._goods[j];
            }
            this._goods[j + 1] = this._goods[i];
        }
        */
        this._goods.sort((a,b) => a.getBestInsert().cost - b.getBestInsert().cost);  // TODO: remove this.
    }
}