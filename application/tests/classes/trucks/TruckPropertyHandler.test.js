import SharedTruck from "@/classes/trucks/SharedTruck";
import {createLocalVue, mount} from "@vue/test-utils";
import SimplifiedMap from "@/components/SimplifiedMap";
import store from "@/store";
import TruckPropertyHandler from "../../../src/classes/trucks/TruckPropertyHandler";

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

test('get properties', ()=>{
    let props = TruckPropertyHandler.getProperties(truck.store, truck.properties.type);
    expect(truck.properties.type).toEqual(props.type);
    expect(truck.properties.volume).toEqual(props.volume);
    expect(truck.properties.maxPayload).toEqual(props.maxPayload);
    expect(truck.properties.consumptionEmpty).toEqual(props.consumptionEmpty);
    expect(truck.properties.consumptionPerKg).toEqual(props.consumptionPerKg);
});