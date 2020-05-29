import {FreightPlatform} from "./FreightPlatform";
import {simulationType} from "./SimulationType";
import SharedTruck from "../trucks/SharedTruck";
import Good from "../goods/Good";
import TraditionalTruck from "../trucks/TraditionalTruck";
import TruckTracker from "@/classes/simulation/TruckTracker";
import avg from "@/util/avg";
import UpdateMessage from "@/classes/util/UpdateMessage";

/**
 * This comment is a TODO.
 *
 * @param simType
 * @param store
 */
export class Simulation {
    _trucksList = [];
    _goodsList = [];
    _store = null;
    _simType = null;
    _truckTracker = Object;
    _running = false;
    _freightPlatform = Object;

    constructor(simType,store) {
        this._simType = simType;
        this._store = store;
    }

    simulate(){
        this._freightPlatform = new FreightPlatform(this._trucksList, this._goodsList);
        this._freightPlatform.distributeGoodsOverTrucks();
        this.sendTrucksHome();
    }

    start(){
        console.log('start simulation');
        this.reset();
        this._running = true;
        this._store.state.isRunning = true;
        this._store.getters.time.run();
        this.simulate();
    }

    stop(){
        if(this._running){
            this._running = false;
            this._store.state.isRunning = false;
            console.log("Goods : ",JSON.parse(JSON.stringify(this._goodsList)));
            this._disableGoods();
            this._disableTrucks();
            console.log("Simulation : disabled everything");
        }
    }

    reset(){
        this.stop();
        this._goodsList = this.initializeGoods(this._store);
        this._trucksList = this.initializeTrucks(this._simType,this._store);
        this._truckTracker = new TruckTracker(this._trucksList);
    }

    _disableGoods(){
        this._goodsList.forEach(good => good.disable());
        this._freightPlatform.getProcessedGoods().forEach(good => good.disable());
    }

    _disableTrucks(){
        this._trucksList.forEach(truck => truck.disable());
    }

    initializeGoods(store){
        let goods = [];
        store.state.goods.forEach(good => {
            goods.push(new Good(
                good.quantity,          // quantity
                good.weight,            // weight
                good.volume,            // volume
                good.pickupLocation,    // pickUp
                good.deliveryLocation,  // delivery
                store.state.map         // map object
            ));
        });
        return goods;
    }

    initializeTrucks(simType,store){
        switch(simType){
            case simulationType.SHARED :
                return this._initializeSharedTrucks(store);
            case simulationType.TRADITIONAL :
                    return this._initializeTraditionalTrucks(store);
            default :
                console.err("Unknown simulation type. Traditional simulation is used by default.");
                return this._initializeTraditionalTrucks(store);
        }
    }

    _initializeSharedTrucks(store){
        let trucks = [];
        store.state.trucks.forEach(truck => {
            const sharedTruck = new SharedTruck(
                truck.type,             // type
                truck.startLocation,    // location
                store.state.map,        // map object
                30                      // tick rate
            );
            sharedTruck.addListener(this);
            trucks.push(sharedTruck);
        });
        return trucks;
    }

    _initializeTraditionalTrucks(store){
        let trucks = [];
        store.state.trucks.forEach(truck => {
            const traditionalTruck = new TraditionalTruck(
                truck.type,             // type
                truck.startLocation,    // location
                store.state.map,        // map object
                30                      // tick rate
            );
            traditionalTruck.addListener(this);
            trucks.push(traditionalTruck);
        });
        return trucks;
    }

    sendTrucksHome(){
        this._trucksList.forEach(truck => truck.sendHome());
    }

    update(source,message) {
        if(message === UpdateMessage.FinishedPlan){
            this._truckTracker.completed(source);
            if(this._goodsList.length === 0 && this._truckTracker.finished){
                this.finish();
            }
        }
    }

    finish(){
        console.log("Simulation FINISHED");
        const totalFuelConsumed = this._trucksList.reduce((total,nextTruck) => {
            return total + nextTruck.fuelConsumed;
        }, 0);

        const results = {
            distance : this._trucksList.reduce((total,nextTruck) => {
                return total + nextTruck.distanceTravelled;
            }, 0),
            numberOfTrucks : this._trucksList.filter(truck => truck.nrDeliveredGoods > 0).length, // Not necessarily equal to the length of the trucks array! Some trucks may be left unused.
            fuelConsumed : totalFuelConsumed,
            co2emissions : totalFuelConsumed * 2.67, // Based on emissions burnt/liter = 2,67 kg CO2 / ltr
            time : this._store.getters.time.elapsedTime,
            averageDeliveryTime : avg(this._freightPlatform.getProcessedGoods().reduce((accumulator,current) => {
                accumulator.push(current.getDeliveryTime());
                return accumulator;
            },[])),
            averageTransitTime : avg(this._freightPlatform.getProcessedGoods().reduce((accumulator,current) => {
                accumulator.push(current.getTransitTime());
                return accumulator;
            },[])),
        };

        this._store.commit('setSimulationResults', {type : this._simType, results : results});
    }
}