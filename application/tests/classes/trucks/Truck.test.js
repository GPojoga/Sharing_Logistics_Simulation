import SharedTruck from "@/classes/trucks/SharedTruck";
import {createLocalVue, mount} from "@vue/test-utils";
import SimplifiedMap from "@/components/SimplifiedMap";
import store from "@/store";
import {truckState} from "@/classes/trucks/TruckState";
import Good from "@/classes/goods/Good.js";

const localVue = createLocalVue();
mount(SimplifiedMap,{
    localVue,
    store
});

beforeAll(()=>{
    global.fetch = jest.fn().mockImplementation(() => new Promise(resolve => resolve));
});

afterAll(()=>{
    global.fetch.mockClear();
    delete global.fetch;
});

let truck;
beforeEach(()=>{
    truck = new SharedTruck('Light',{lat:1,lng:1},store,30);
});

test('truck initialization',()=>{
    expect(truck.state).toEqual(truckState.WAITING_FOR_ORDER);
    expect(truck.initialLocation).toBeTruthy();
    expect(truck.location).toBeTruthy();
    expect(truck._tickRate).toBeTruthy();
    expect(truck.store).toBeTruthy();
    expect(truck.planManager).toBeTruthy();
    expect(truck.properties).toBeTruthy();
});

test('disable',()=>{
    truck.disable();
   expect(truck.state).toEqual(truckState.DISABLED);
});

test('add good',()=>{
    expect(truck.planManager.plan.orders.length).toEqual(0);
    let good = new Good(1,1,1,{lat:1,lng:1},{lat:1,lng:1},store.getters.map);
    truck.assignToGood(good,0,0);

    expect(truck.planManager.plan.orders.length).toEqual(2);
    expect(truck.planManager.plan.orders[0].type).toEqual('pickUp');
    expect(truck.planManager.plan.orders[0].good).toStrictEqual(good);
    expect(truck.planManager.plan.orders[1].type).toEqual('delivery');
    expect(truck.planManager.plan.orders[1].good).toStrictEqual(good);
});

test('get cost',()=>{
    let good = new Good(1,1,1,{lat:1,lng:1},{lat:23,lng:32},store.getters.map);
   expect(truck.getCost(good,0,0)).toStrictEqual(truck.planManager.getCost(good,0,0));

});