import Good from "@/classes/goods/Good.js";
import {createLocalVue, mount} from "@vue/test-utils";
import SimplifiedMap from "@/components/SimplifiedMap";
import store from "@/store";
import TraditionalTruck from "@/classes/trucks/TraditionalTruck";

const localVue = createLocalVue();
mount(SimplifiedMap,{
    localVue,
    store
});

let map = store.getters.map;
let good;
beforeEach(()=>{
    good = new Good(21,32,12,{lat:1,lng:1},{lat:2,lng:2},map);
});

describe('initialize Good',()=>{
    it('initializes correctly the good',()=>{
        expect(good.quantity).toEqual(21);
        expect(good.weight).toEqual(32);
        expect(good.volume).toEqual(12);
        expect(good.pickUp).toStrictEqual({lat:1,lng:1});
        expect(good.delivery).toStrictEqual({lat:2,lng:2});
        expect(good.timer).toBeTruthy();
        expect(good.initialTime).toEqual(0);
    });
});

describe('pickup and deliver',()=>{
    let time = store.getters.time;
    beforeEach(()=>{
        time.reset();
    });
    it('correctly updates the pick up time',()=>{
      time.run();
      setTimeout(()=>{
          time.stop();
          good.pickUp();
          expect(good.pickupTime).toEqual(time.getTimePassed());
      },1500);
    });
    it('correctly updates the delivery time',()=>{
        time.run();
        setTimeout(()=>{
            time.stop();
            good.deliver();
            expect(good.deliveryTime).toEqual(time.getTimePassed());
        },1700);
    });
});

test('transit and delivery time',()=>{
    let time = store.getters.time;
    good = new Good(21,32,12,{lat:1,lng:1},{lat:2,lng:2},map);
    time.reset();
    time.run();
    let timeTillPickUp;
    setTimeout(()=>{
        time.stop();
        good.pickUp();
        timeTillPickUp = time.getTimePassed();
        time.run();
        setTimeout(()=>{
            time.stop();
            good.deliver();
            expect(good.getTransitTime()).toEqual(time.getTimePassed() - timeTillPickUp);
            expect(good.getDeliveryTime()).toEqual(time.getTimePassed());
        },1500);
    },1200);
});

describe('truck selection',()=>{
   let trucks = [   new TraditionalTruck('Light',{lat:1,lng:1},store,30),
                    new TraditionalTruck('Light',{lat:100,lng:100},store,30)    ];
   it('stores correct cost array',()=>{
       good.giveTruckList(trucks);
       expect(good.trucksInserts).toStrictEqual([   Object.assign({truckIndex:0},trucks[0].getLowestCost(good)),
           Object.assign({truckIndex:1},trucks[1].getLowestCost(good))]);
   });
   it('correctly updates the given truck',()=>{
      good = new Good(21,32,12,{lat:1,lng:1},{lat:2,lng:2},map);
      good.giveTruckList(trucks);
      let truck = new TraditionalTruck('Heavy',{lat:3,lng:3},store,30);
      good.updateTruck(truck,1);
      expect(good.trucksInserts[1]).toStrictEqual(Object.assign({truckIndex:1},truck.getLowestCost(good)));
   });
});
