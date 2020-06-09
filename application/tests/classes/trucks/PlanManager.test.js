import SharedTruck from "@/classes/trucks/SharedTruck";
import {createLocalVue, mount} from "@vue/test-utils";
import SimplifiedMap from "@/components/SimplifiedMap";
import store from "@/store";
import {truckState} from "@/classes/trucks/TruckState";
import PlanManager from "../../../src/classes/trucks/PlanManager";
import Good from "../../../src/classes/goods/Good";
import UpdateMessage from "../../../src/classes/util/UpdateMessage";

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
let planManager;
beforeEach(()=>{
    truck = new SharedTruck('Light',{lat:1,lng:1},store,30);
    planManager = new PlanManager(truck);
});

test('go home', ()=>{
    planManager.goHome();
    let plan = planManager.plan.orders.pop();
    expect(plan.location).toEqual(truck.initialLocation);
    expect(plan.type).toEqual("home");
    expect(plan.good).toBeNull();
    expect(truck.state).toEqual(truckState.MOVING);
});

test('add good', ()=>{
    let good = new Good(1,1,1,{lat:1,lng:1},{lat:23,lng:32},store.getters.map);
    planManager.addGood(good, 0, 0);

    expect(planManager.plan.orders[0].location).toEqual(good.pickUp);
    expect(planManager.plan.orders[0].type).toEqual("pickUp");
    expect(planManager.plan.orders[0].good).toEqual(good);
    expect(planManager.plan.orders[0].expectedLoad.weight).toEqual(good.weight * good.quantity);
    expect(planManager.plan.orders[0].expectedLoad.volume).toEqual(good.volume * good.quantity);

    expect(planManager.plan.orders[1].location).toEqual(good.delivery);
    expect(planManager.plan.orders[1].type).toEqual("delivery");
    expect(planManager.plan.orders[1].good).toEqual(good);
    expect(planManager.plan.orders[1].expectedLoad.weight).toEqual(0);
    expect(planManager.plan.orders[1].expectedLoad.volume).toEqual(0);

    expect(truck.state).toEqual(truckState.MOVING);
});

test('get cost', ()=>{
    let good = new Good(1,1,1,{lat:1,lng:1},{lat:23,lng:32},store.getters.map);
    expect(truck.getCost(good,0,0)).toStrictEqual(planManager.getCost(good,0,0));
});

test('update', ()=>{
    planManager.goHome();
    expect(truck.state).toEqual(truckState.MOVING);

    planManager.update(planManager.truck, UpdateMessage.FinishedOrder);
    expect(planManager.plan.currentIndex).toEqual(1);
});
