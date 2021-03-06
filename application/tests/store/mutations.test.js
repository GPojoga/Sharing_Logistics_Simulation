import {createLocalVue, mount} from "@vue/test-utils";
import store from "@/store/index.js";
import SimplifiedMap from "@/components/SimplifiedMap";
import {simulationType} from "@/classes/simulation/SimulationType";
import {Simulation} from "@/classes/simulation/Simulation";

const localVue = createLocalVue();
const mapWrapper = mount(SimplifiedMap,{
    localVue,
    store
});

describe('setMap',()=>{
   it('correctly stores the given map',()=>{
       store.commit('setMap',{map : mapWrapper.vm.$refs["map"].mapObject});
       expect(mapWrapper.vm.$refs["map"].mapObject).toBeTruthy();
       expect(store.getters.map).toEqual(mapWrapper.vm.$refs["map"].mapObject);
   })
});

describe('setMaxGoodSplits',()=>{
   it('correctly sets a max times a good is split',()=>{
       store.commit('setMaxGoodSplits',{value : 56});
       expect(store.getters.maxGoodSplits).toEqual({error: false, message: "", value: 56});
   });
});

describe('setEmissionRate',()=>{
   it('correctly sets a normal rate',()=>{
      store.commit('setEmissionRate',{value: 3.4});
      expect(store.getters.emissionRate).toEqual({error: false, message: "", value: 3.4});
   });
});

describe('setVolume',()=>{
   it('correctly sets a normal volume',()=>{
     store.commit('setVolume',{value: 5,index : 0});
     expect(store.getters.truckTypes[0].volume.value).toEqual(5);
   });
});

describe('setSimulation',()=>{
    it('no map object', () => {
        store.state.map = null;
        try {
            store.commit('setSimulation', {type: simulationType.NONE, store: store});
        } catch (e) {
            expect(e.message).toBe('The map object was not set. The simulation cannot be initialized ');
        }
    });
    it('correctly sets the Traditional Simulation', ()=>{
       store.commit('setMap',{map : mapWrapper.vm.$refs["map"].mapObject});
       store.commit('setSimulation',{type : simulationType.TRADITIONAL,store : store});
       expect(store.getters.traditionalSimulation._simType).toEqual(simulationType.TRADITIONAL);
    });
    it('correctly sets the Shared Simulation', ()=>{
       store.commit('setMap',{map : mapWrapper.vm.$refs["map"].mapObject});
       store.commit('setSimulation',{type : simulationType.SHARED,store : store});
       expect(store.getters.sharedSimulation._simType).toEqual(simulationType.SHARED);
    });
    it('invalid simulation type', () => {
        store.commit('setMap', {map : mapWrapper.vm.$refs["map"].mapObject});
        try {
            store.commit('setSimulation', {type : simulationType.NONE, store: store});
        } catch (e) {
            expect(e.message).toBe('Invalid simulation type');
        }
    })
});

describe('setSimulationResults',()=>{
    let tradSim = new Simulation(simulationType.TRADITIONAL,store);
    expect(store.state.simulationResults.traditional.finished).toEqual(false);
    tradSim.start();
    tradSim.finish();
    expect(store.state.simulationResults.traditional.finished).toEqual(true);

    let sharSim = new Simulation(simulationType.SHARED,store);
    expect(store.state.simulationResults.shared.finished).toEqual(false);
    sharSim.start();
    sharSim.finish();
    expect(store.state.simulationResults.shared.finished).toEqual(true);
});

describe('startTraditionalSimulation', ()=>{
    it('throws error if simulation not set', () => {
        store.state.traditionalSimulation = null;
        try {
            store.commit('startTraditionalSimulation');
        } catch (e) {
            expect(e.message).toBe("Traditional simulation was not set");
        }
        expect(store.getters.isRunning).toBe(false);
    });
    it('correctly starts the traditional simulation', () => {
        store.state.goods = store.state.trucks = [];
        store.state.traditionalSimulation = new Simulation(simulationType.TRADITIONAL, store);
        store.state.sharedSimulation = null;
        store.commit('startTraditionalSimulation');
        expect(store.getters.isRunning).toBe(true);
        expect(store.getters.currentSimulationType).toBe(simulationType.TRADITIONAL);
        store.state.traditionalSimulation.stop();
    });
});

describe('startSharedSimulation', ()=>{
    it('throws error if simulation not set', () => {
        store.state.sharedSimulation = null;
        try {
            store.commit('startSharedSimulation');
        } catch (e) {
            expect(e.message).toBe("Shared simulation was not set");
        }
        expect(store.getters.isRunning).toBe(false);
    });
    it('correctly starts the shared simulation', () => {
        store.state.goods = store.state.trucks = [];
        store.state.traditionalSimulation = null;
        store.state.sharedSimulation = new Simulation(simulationType.SHARED, store);
        store.commit('startSharedSimulation');
        expect(store.getters.isRunning).toBe(true);
        expect(store.getters.currentSimulationType).toBe(simulationType.SHARED);
        store.state.sharedSimulation.stop();
    });
});

describe('setMaxPayload',() => {
   it('correctly sets a normal weight',() => {
       store.commit('setMaxPayload',{value: 1000,index: 1});
       expect(store.getters.truckTypes[1].maxPayload.value).toEqual(1000);
   });
});

describe('setConsumptionEmpty', () => {
   it('correctly sets a normal consumption', () => {
      store.commit('setConsumptionEmpty',{value: 3.7, index: 2});
      expect(store.getters.truckTypes[2].consumptionEmpty.value).toEqual(3.7);
   });
});

describe('setConsumptionFull', () => {
   it('correctly sets a normal consumption', () => {
       store.commit('setConsumptionFull',{value: 8.9, index: 1});
       expect(store.getters.truckTypes[1].consumptionFull.value).toEqual(8.9);
   })
});

describe('addNewGood',() => {
    it('adds a new entry to the goods list', () => {
        let n = store.getters.goods.length;
        store.commit('addNewGood');
        expect(store.getters.goods.length).toEqual(n + 1);
    });
});

describe('removeGood',()=>{
   it('removes an entry from the goods list',()=>{
     store.commit('addNewGood');
     let n = store.getters.goods.length;
     store.commit('removeGood',{index:0});
     expect(store.getters.goods.length).toEqual(n - 1);
   });
});

describe('set good properties',()=>{
    store.commit('addNewGood');
    it('sets the quantity of the good on index 0 ',()=>{
        store.commit('setGoodQuantity',{value : 42,index:0});
        expect(store.getters.goods[0].quantity.value).toEqual(42);
    });
    it('sets the weight of the good on index 0 ',()=>{
       store.commit('setGoodWeight',{value : 56,index:0});
       expect(store.getters.goods[0].weight.value).toEqual(56);
    });
    it('sets the volume of the good on index 0',()=>{
       store.commit('setGoodVolume',{value : 21,index:0});
       expect(store.getters.goods[0].volume.value).toEqual(21);
    });
    it('sets the pickup location of the good on index 0',()=>{
       store.commit('setGoodPickupLocation',{location:{lat:1,lng:1},index:0,text:"some Text"});
       expect(store.getters.goods[0].pickupLocation.value).toStrictEqual({lat:1,lng:1});
       expect(store.getters.goods[0].pickupLocation.text).toBe("some Text");
    });
    it('sets the delivery location of the good on index 0',()=>{
        store.commit('setGoodDeliveryLocation',{location:{lat:42,lng:21},index:0,text:"some delivery"});
        expect(store.getters.goods[0].deliveryLocation.value).toStrictEqual({lat:42,lng:21});
        expect(store.getters.goods[0].deliveryLocation.text).toBe("some delivery");
    });
});

describe('addNewTruck',()=>{
    store.state.trucks = [];
    it('adds a new entry to the truck list',()=>{
        let n = store.getters.trucks.length;
       store.commit('addNewTruck');
       expect(store.getters.trucks.length).toEqual(n+1);
    });
});

describe('removeTruck',()=>{
    store.state.trucks = [];
    store.commit('addNewTruck');
   it('removes a truck from the truck list',()=>{
       let n = store.getters.trucks.length;
       store.commit('removeTruck',{index:0});
       expect(store.getters.trucks.length).toEqual(n-1);
   });
});

describe('set truck properties',()=>{
    beforeEach(()=>{
        store.state.trucks = [];
        store.commit('addNewTruck');
    });
   it('sets the truck type',()=>{
       store.commit('setTruckType',{type:'light',index:0});
       expect(store.getters.trucks[0].type).toBe('light');
   });
   it('sets the truck quantity',()=>{
     store.commit('setTruckQuantity',{value:4,index:0});
     expect(store.getters.trucks[0].quantity.value).toEqual(4)
   });
   it('sets the truck starting location ',()=>{
      store.commit('setTruckStartingLocation',{location:{lat:34,lng:54},index:0,text:'some starting location'});
      expect(store.getters.trucks[0].startLocation.value).toStrictEqual({lat:34,lng:54});
      expect(store.getters.trucks[0].startLocation.text).toBe('some starting location');
   });
});
