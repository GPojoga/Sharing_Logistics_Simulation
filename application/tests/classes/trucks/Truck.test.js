import SharedTruck from "@/classes/trucks/SharedTruck";
import {createLocalVue, mount} from "@vue/test-utils";
import SimplifiedMap from "@/components/SimplifiedMap";
import store from "@/store";
import {truckState} from "@/classes/trucks/TruckState";
const localVue = createLocalVue();
mount(SimplifiedMap,{
    localVue,
    store
});

let truck;
beforeEach(()=>{
    truck = new SharedTruck('Light',{lat:1,lng:1},store,30);
});

test('truck initialization',()=>{
    expect(truck.state).toEqual(truckState.WAITING_FOR_ORDER);
    expect(truck.initialLocation).toBeTruthy();
    expect(truck.location).toBeTruthy();
});