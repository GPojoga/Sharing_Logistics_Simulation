import Truck from "@/classes/trucks/Truck";
import {createLocalVue, mount} from "@vue/test-utils";
import SimplifiedMap from "@/components/SimplifiedMap";
import store from "@/store";
import UpdateMessage from "../../../src/classes/util/UpdateMessage";
import {truckState} from "@/classes/trucks/TruckState"


const localVue = createLocalVue();
mount(SimplifiedMap,{
    localVue,
    store
});

let map = store.getters.map;
let truckView;

beforeEach(()=>{
    truckView = new Truck('Light',{lat:1,lng:1},store,30);
});

test('update location', ()=>{
    expect(truckView.initialLocation).toBeTruthy();
    expect(truckView.state).toEqual(truckState.MOVING);
    truck.update(truckView.state, UpdateMessage.Relocated);
    expect(truckView.location).toEqual({lat:5,lng:5});
});

