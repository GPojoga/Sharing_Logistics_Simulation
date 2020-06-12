import Truck from "@/classes/trucks/Truck";
import {createLocalVue, mount} from "@vue/test-utils";
import SimplifiedMap from "@/components/SimplifiedMap";
import store from "@/store";
import UpdateMessage from "../../../src/classes/util/UpdateMessage";
import {truckState} from "@/classes/trucks/TruckState"
import {TruckView} from "../../../src/classes/view/TruckView";


const localVue = createLocalVue();
mount(SimplifiedMap,{
    localVue,
    store
});

test('update location', ()=>{
    let map = store.getters.map;
    let truckView = new TruckView({location: {lat: 1, lng: 1}, properties: {type: "Light"}}, map);
    expect(truckView.view.getLatLng()).toEqual({lat: 1, lng:1});
    truckView.update({location: {lat: 5, lng: 5}}, UpdateMessage.Relocated);
    expect(truckView.view.getLatLng()).toEqual({lat:5,lng:5});
});

