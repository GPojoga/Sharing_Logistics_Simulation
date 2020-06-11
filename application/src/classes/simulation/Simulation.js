import FreightPlatform from "./FreightPlatform";
import {simulationType} from "./SimulationType";
import SharedTruck from "../trucks/SharedTruck";
import Good from "../goods/Good";
import TraditionalTruck from "../trucks/TraditionalTruck";
import TruckTracker from "@/classes/simulation/TruckTracker";
import avg from "@/util/avg";
import UpdateMessage from "@/classes/util/UpdateMessage";
import store from "../../store/index.js";


/**
 * This comment is a TODO.
 *
 * @param simType
 * @param store
 */
export class Simulation {
    _allGoodsList = [];
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

    _simulate(){
        this._freightPlatform = new FreightPlatform(this._trucksList, this._goodsList);
        this._freightPlatform.distributeGoodsOverTrucks();
        this.sendTrucksHome();
    }

    start(){
        console.log('start simulation');
        this._reset();
        this._running = true;
        this._store.state.isRunning = true;
        this._store.getters.time.run();
        this._simulate();
    }

    stop(){
        if(this._running){
            this._running = false;
            this._store.state.isRunning = false;
            this._store.state.currentSimulationType = simulationType.NONE;
            this._disableGoods();
            this._disableTrucks();
            this._goodsList = [];
            this._trucksList = [];
        }
    }

    _reset(){
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

    getTrucks(){
        return this._trucksList;
    }

    initializeGoods(store){
        let goods = [];
        this._allGoodsList = [];
        for (let i = 0; i < store.state.goods.length; i++) {
            let input = store.state.goods[i];
            let splits = Number(this._store.getters.maxGoodSplits.value);
            for (let j = 0; j < splits; j++){  // Split goods based on split constant
                let quantity = Math.floor((Number(input.quantity.value) + splits - 1 - j)/splits);
                if (quantity === 0) break;
                let good = new Good(
                    quantity,
                    input.weight.value,
                    input.volume.value,
                    input.pickupLocation.value,
                    input.deliveryLocation.value,
                    store.getters.map,
                    i);
                goods.push(good);
                this._allGoodsList.push(good);
            }
        }
        return goods;
    }

    getAllGoods(){
        return this._allGoodsList;
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
            for(let i = 0; i < truck.quantity.value; i++){
                trucks.push(this._createSharedTruck(truck,store));
            }
        });
        return trucks;
    }

    _createSharedTruck(truck,store){
        const sharedTruck = new SharedTruck(
            truck.type,                   // type
            truck.startLocation.value,    // location
            store,             // map object
            30                            // tick rate
        );
        sharedTruck.addListener(this);
        return sharedTruck;
    }

    _initializeTraditionalTrucks(store){
        let trucks = [];
        store.state.trucks.forEach(truck => {
            for(let i = 0; i < truck.quantity.value; i++){
                trucks.push(this._createTraditionalTruck(truck,store));
            }
        });
        return trucks;
    }

    _createTraditionalTruck(truck,store){
        const traditionalTruck = new TraditionalTruck(
            truck.type,                   // type
            truck.startLocation.value,    // location
            store,              // map object
            30                            // tick rate
        );
        traditionalTruck.addListener(this);
        return traditionalTruck;
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

        /* Stop the time */
        this._store.getters.time.togglePause();

        /* Calculate the results */
        const totalFuelConsumed = this._trucksList.reduce((total,nextTruck) => {
            return total + nextTruck.fuelConsumed;
        }, 0);

        const results = {
            finished : true,
            distance : this._trucksList.reduce((total,nextTruck) => {
                return total + nextTruck.distanceTravelled;
            }, 0),
            numberOfTrucks : this._trucksList.filter(truck => truck.nrDeliveredGoods > 0).length, // Not necessarily equal to the length of the trucks array! Some trucks may be left unused.
            fuelConsumed : totalFuelConsumed,
            co2emissions : totalFuelConsumed * store.getters.emissionRate.value,
            time : this._store.getters.time.elapsedTime,
            averageDeliveryTime : this._freightPlatform.getProcessedGoods().length === 0 ?
                0 :
                avg(this._freightPlatform.getProcessedGoods().reduce((accumulator,current) => {
                    accumulator.push(current.getDeliveryTime());
                    return accumulator;
                },[])),
            averageTransitTime : this._freightPlatform.getProcessedGoods().length === 0 ?
                0 :
                avg(this._freightPlatform.getProcessedGoods().reduce((accumulator,current) => {
                    accumulator.push(current.getTransitTime());
                     return accumulator;
                },[])),
        };
        this._store.commit('setSimulationResults', {type : this._simType, results : results});
    }
}