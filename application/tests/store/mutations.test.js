import {createLocalVue, mount} from "@vue/test-utils";
import store from "@/store/index.js";
import SimplifiedMap from "@/components/SimplifiedMap";
import {simulationType} from "@/classes/simulation/SimulationType";

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

describe('setMaxSpeed',()=>{
   it('correctly sets a normal speed',()=>{
       store.commit('setMaxSpeed',{value : 56});
       expect(store.getters.maxSpeed).toEqual({error: false, message: "", value: 56});
   });
   //TODO : test for boundary values | why the maxSpeed is limited to 1000 ?
});

describe('setEmissionRate',()=>{
   it('correctly sets a normal rate',()=>{
      store.commit('setEmissionRate',{value: 3.4});
      expect(store.getters.emissionRate).toEqual({error: false, message: "", value: 3.4});
   });
   //TODO : test for boundary values | why the emission rate is limited to 100 ?
});

describe('setVolume',()=>{
   it('correctly sets a normal volume',()=>{
     store.commit('setVolume',{value: 5,index : 0});
     expect(store.getters.truckTypes[0].volume.value).toEqual(5);
   });
   //TODO : test for boundary values | test for index out of bounds
});

describe('setSimulation',()=>{
   it('correctly sets the Traditional Simulation', ()=>{
       store.commit('setMap',{map : mapWrapper.vm.$refs["map"].mapObject});
       new Error("MAP : " + store.getters.map);
       store.commit('setSimulation',{type : simulationType.TRADITIONAL,store : store});
       expect(store.getters.traditionalSimulation._simType).toEqual(simulationType.TRADITIONAL);
   });
   it('correctly sets the Shared Simulation', ()=>{
       store.commit('setMap',{map : mapWrapper.vm.$refs["map"].mapObject});
       store.commit('setSimulation',{type : simulationType.SHARED,store : store});
       expect(store.getters.sharedSimulation._simType).toEqual(simulationType.SHARED);
   });
});

describe('setSimulationResults',()=>{
   //TODO : test setSimulationResults
});

describe('startTraditionalSimulation', ()=>{
   //TODO : check input is necessary
});

describe('startSharedSimulation', ()=>{
    //TODO : check input is necessary
});

describe('setMaxPayload',() => {
   it('correctly sets a normal weight',() => {
       store.commit('setMaxPayload',{value: 1000,index: 1});
       expect(store.getters.truckTypes[1].maxPayload.value).toEqual(1000);
   });
   //TODO : border cases | index out of bounds
});

describe('setConsumptionEmpty', () => {
   it('correctly sets a normal consumption', () => {
      store.commit('setConsumptionEmpty',{value: 3.7, index: 2});
      expect(store.getters.truckTypes[2].consumptionEmpty.value).toEqual(3.7);
   });
   //TODO : border cases | index out of bounds
});

describe('setConsumptionFull', () => {
   it('correctly sets a normal consumption', () => {
       store.commit('setConsumptionFull',{value: 8.9, index: 1});
       expect(store.getters.truckTypes[1].consumptionFull.value).toEqual(8.9);
   })
    //TODO : border cases
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
