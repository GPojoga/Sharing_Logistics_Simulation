import store from "@/store/index.js";

describe('checkNumber',()=>{
    it('receives a number within the bounds',()=>{
        expect(store.state.checkNumber(5,1,10,false,true))
            .toStrictEqual([false,'']);
    });
    it('receives a number outside the bounds',()=>{
        expect(store.state.checkNumber(11,0,8,false,true))
            .toStrictEqual([true,'Must be between 0 and 8']);
    });
    it('receives 0 within the bounds, the value must not be 0',()=>{
        expect(store.state.checkNumber(0,-3,5,false,true))
            .toStrictEqual([true,'Must not be 0']);
    });
    it('receives 0 within the bounds, the value can be 0',()=>{
        expect(store.state.checkNumber(0,-3,5,true,true))
            .toStrictEqual([false,'']);
    });
    it('receives 0 outside the bounds, the value can be 0',()=>{
        expect(store.state.checkNumber(0,2,7,true,true))
            .toStrictEqual([true,'Must be between 2 and 7']);
    });
});

describe('checkLocation',()=>{
    it('no location name and no coordinates', () => {
        expect(store.state.checkLocation(null, '')).toStrictEqual([true, "Field can't be empty"]);
    });
    it('location name but no coordinates', () => {
        expect(store.state.checkLocation(null, 'dummy text')).toStrictEqual([true, "Must be known location"]);
    });
    it('location name and coordinates', () => {
        expect(store.state.checkLocation({lat:3, lng:5}, 'dummy text')).toStrictEqual([false, ""]);
    })
});