import TraditionalTruck from "@/classes/trucks/TraditionalTruck";
import store from "@/store/index.js";
import {createLocalVue, mount} from "@vue/test-utils";
import SimplifiedMap from "@/components/SimplifiedMap";
import FreightPlatform from "@/classes/simulation/FreightPlatform";
import Good from "@/classes/goods/Good.js";

const localVue = createLocalVue();
mount(SimplifiedMap,{
    localVue,
    store
});

let platform;
let trucks;
let goods;

beforeEach(()=>{
    trucks = [new TraditionalTruck('Light',{lat:1,lng:1},store,30),
                new TraditionalTruck('Heavy',{lat:50,lng:50},store,30)];
    goods = [new Good(1,1,1,{lat:2,lng:2},{lat:10,lng:10},store.getters.map),
        new Good(1,1,1,{lat:40,lng:40},{lat:60,lng:60},store.getters.map)];
    platform = new FreightPlatform(trucks,goods);
});

describe('platform initialization',()=>{
    it('sets the list of trucks and goods',()=>{
        expect(platform._trucks).toBeTruthy();
        expect(platform._goods).toBeTruthy();
    });
    it('distributes the trucks',()=>{
       platform._goods.forEach((good)=>{
           expect(good.bestInsert).toBeTruthy();
       })
    });
    it('sorts the goods by cost in descending order, as the elements are popped',()=>{
       let prevCost = platform._goods[0].getLowestCost();
       platform._goods.forEach((good)=>{
          expect(good.getLowestCost()).toBeLessThanOrEqual(prevCost);
          prevCost = good.getLowestCost();
       });
    });
});

test('distributeGoodsOverTrucks',()=>{
    global.fetch = jest.fn().mockImplementation(() => new Promise(resolve => resolve));
    let n = platform._goods.length;
    expect(platform._processedGoods.length).toEqual(0);
    platform._processedGoods.forEach((good)=>{
        expect(good.bestInsert).not.toBeTruthy();
    });
    platform.distributeGoodsOverTrucks();
    expect(platform._processedGoods.length).toEqual(n);
    platform._processedGoods.forEach((good)=>{
        expect(good.bestInsert).toBeTruthy();
    });
    global.fetch.mockClear();
    delete global.fetch;
});