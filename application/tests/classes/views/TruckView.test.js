import {icon} from "leaflet/dist/leaflet-src.esm";
import light_duty_van from "public/assets/light_duty_van.svg"
import {createLocalVue, mount} from "@vue/test-utils";

const localVue = createLocalVue();
mount(SimplifiedMap,{
    localVue,
    store
});

let map = store.getters.map;

describe("light_duty_van Icon", () => {
    it("renders the light van pickupIcon", () => {
        expect(icon.find("svg").prop("src")).toEqual(light_duty_van);
    });
});

describe('Truck icon added to the map',()=>{
    it('the truck is correctly added up',()=>{
        expect(this.view.addTo(mapObject));
    });
});



