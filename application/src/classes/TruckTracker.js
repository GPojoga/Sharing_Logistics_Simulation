export default class TruckTracker{

    _truckList = Object;
    _trackingList = Object;
    nrCompleted = 0;
    finished = false;

    constructor(truckList) {
        this._truckList = truckList;
        this._trackingList = new Array(truckList.length).fill(0);
    }

    completed(truck){
        let index = this._truckList.indexOf(truck);
        if(index >= 0){
            if(this._trackingList[index] === 0){
                this.nrCompleted += 1;
                this._trackingList[index] = 1;
                this.checkFinished();
            }
        } else {
            console.error("Invalid Truck");
        }

    }

    checkFinished(){
        this.finished = this.nrCompleted === this._truckList.length;
    }

}