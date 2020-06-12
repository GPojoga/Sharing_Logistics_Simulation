import Good from "../../../src/classes/goods/Good";
import {createLocalVue, mount} from "@vue/test-utils";
import SimplifiedMap from "@/components/SimplifiedMap";
import store from "@/store";
import UpdateMessage from "../../../src/classes/util/UpdateMessage";
import Truck from "@/classes/trucks/Truck";
import {truckState} from "@/classes/trucks/TruckState"


const localVue = createLocalVue();
mount(SimplifiedMap,{
    localVue,
    store
});

let map = store.getters.map;
let goodView;
let truckView;

beforeEach(()=>{
    goodView = new Good(1,1,1,{lat:1,lng:1},{lat:2,lng:2},map,0);
    truckView = new Truck('Light',{lat:1,lng:1},store,30);
});

test('update good location', ()=>{
    expect(goodView.initialLocation).toBeTruthy();
    goodView.update(goodView.location, UpdateMessage.Relocated);
    expect(goodView.location).toEqual({lat:2,lng:2});
});

