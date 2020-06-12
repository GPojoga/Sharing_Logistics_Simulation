import {createLocalVue, mount} from "@vue/test-utils";
import SimplifiedMap from "@/components/SimplifiedMap";
import store from "@/store";
import UpdateMessage from "../../../src/classes/util/UpdateMessage";
import {GoodView} from "../../../src/classes/view/GoodView";

const localVue = createLocalVue();
mount(SimplifiedMap,{
    localVue,
    store
});

test('update location', ()=>{
    let map = store.getters.map;
    let goodView = new GoodView({pickUp: {lat: 1, lng: 1}, delivery: {lat: 2, lng:2}}, map);
    expect(goodView.viewPickUp.getLatLng()).toEqual({lat: 1, lng:1});
    expect(goodView.viewDrop.getLatLng()).toEqual({lat: 2, lng:2});
    goodView.update({location: {lat: 5, lng: 5}}, UpdateMessage.Relocated);
    expect(goodView.viewPickUp.getLatLng()).toEqual({lat:5,lng:5});
});
