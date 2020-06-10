import GoodView from "../../../src/classes/view/GoodView";
import {icon} from "leaflet/dist/leaflet-src.esm";
import good_pickup from "public/assets/good_pickup.svg"
import good_drop from "public/assets/good_drop.svg"
import {createLocalVue, mount} from "@vue/test-utils";

const localVue = createLocalVue();
mount(SimplifiedMap,{
    localVue,
    store
});

let map = store.getters.map;

describe("GoodPickUp Icon", () => {
    it("renders the good pickupIcon", () => {
        expect(icon.find("svg").prop("src")).toEqual(good_pickup);
    });
});

describe("GoodDrop Icon", () => {
    it("renders the good pickupIcon", () => {
        expect(icon.find("svg").prop("src")).toEqual(good_drop);
    });
});

describe('Goods icon added to the map',()=>{
    it('the goods is correctly picked up',()=>{
        expect(this.viewPickUp.addTo(mapObject));
    });
});

describe('Goods icon added to the map',()=>{
    it('the goods is correctly picked up',()=>{
        expect(this.viewDrop.addTo(mapObject));
    });
});

