import {Simulation} from "@/classes/simulation/Simulation";
import {simulationType} from "@/classes/simulation/SimulationType";
import {createLocalVue, mount} from "@vue/test-utils";
import SimplifiedMap from "@/components/SimplifiedMap";
import store from "@/store";
import {truckState} from "@/classes/trucks/TruckState";
import UpdateMessage from "@/classes/util/UpdateMessage";

const localVue = createLocalVue();
mount(SimplifiedMap,{
    localVue,
    store
});

let sim;

let addGood = function(nr){
    for(let index = 0;index < nr;index++){
        store.commit('addNewGood');
        store.commit('setGoodQuantity',{value:1,index:index});
        store.commit('setGoodVolume',{value:1,index:index});
        store.commit('setGoodWeight',{value:1,index:index});
        store.commit('setGoodPickupLocation',{location:{lat:1,lng:1},index:index,text:'some location'});
        store.commit('setGoodDeliveryLocation',{location:{lat:1,lng:1},index:index,text:'some location'});
    }
};
let addTruck = function(nr){
    for(let index = 0;index < nr;index++){
        store.commit('addNewTruck');
        store.commit('setTruckType',{type:'Light',index:index});
        store.commit('setTruckQuantity',{value:1,index:index});
        store.commit('setTruckStartingLocation',{location:{lat:1,lng:1},index:index,text:'some location'});
    }
};

addGood(2);
addTruck(2);

beforeEach(()=>{
    sim = new Simulation(simulationType.TRADITIONAL,store);
});

beforeAll(()=>{
    global.fetch = jest.fn().mockImplementation(() => new Promise(resolve => resolve));
});

afterAll(()=>{
    global.fetch.mockClear();
    delete global.fetch;
});

test('simulation initialization',()=>{
   expect(sim._simType).toBeTruthy();
   expect(sim._store).toBeTruthy();
});

test('simulation start',()=>{
    sim.start();
    expect(sim._running).toEqual(true);
    expect(store.state.isRunning).toEqual(true);
    sim._freightPlatform._processedGoods.forEach((good)=>{
        expect(good.bestInsert).toBeTruthy();
    })
});

test('simulation stop',()=>{
    sim.start();
    let goods = sim._freightPlatform._processedGoods;
    let trucks = sim._trucksList;
    sim.stop();
    expect(sim._running).toEqual(false);
    expect(store.state.isRunning).toEqual(false);
    expect(store.state.currentSimulationType).toEqual(simulationType.NONE);
    goods.forEach((good)=>{
        expect(good.disabled).toEqual(true);
    });
    trucks.forEach((truck)=>{
        expect(truck.state).toEqual(truckState.DISABLED);
    });
    expect(sim._goodsList.length).toEqual(0);
    expect(sim._trucksList.length).toEqual(0);
});

test('initialize goods',()=>{
    expect(sim._goodsList.length).toEqual(0);
    let goods = sim.initializeGoods(store);
    goods.forEach((good)=>{
       expect(good.quantity).toBeTruthy();
       expect(good.weight).toBeTruthy();
       expect(good.volume).toBeTruthy();
       expect(good.pickUp).toBeTruthy();
       expect(good.delivery).toBeTruthy();
    });
    expect(goods.length).toEqual(store.getters.goods.length);
});

test('initialize trucks',()=>{
    expect(sim._trucksList.length).toEqual(0);
    let trucks = sim.initializeTrucks(simulationType.TRADITIONAL,store);
    trucks.forEach((truck)=>{
        expect(truck.properties).toBeTruthy();
        expect(truck.initialLocation).toBeTruthy();
    });
    expect(trucks.length).toEqual(store.getters.trucks.length);
});

test('send trucks home',()=>{
   sim.start();
   sim.sendTrucksHome();
   sim._trucksList.forEach((truck)=>{
       expect(truck.planManager.plan.orders.pop().type).toBe('home');
   });
});

test('update',()=>{
    store.state.goods = [];
    expect(store.state.simulationResults.traditional.finished).toEqual(false);
    sim.start();
    sim.update(sim._trucksList[0],UpdateMessage.FinishedPlan);
    sim.update(sim._trucksList[1],UpdateMessage.FinishedPlan);
    expect(store.state.simulationResults.traditional.finished).toEqual(true);
});


