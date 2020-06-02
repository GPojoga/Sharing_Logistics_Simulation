import store from "@/store/index.js";

describe("truckTypes",()=> {
    let truckProperties = (type) => {
        let truck = store.getters.truckTypes.find(x => x.key === type);
        it('exists',() =>{
            expect(truck).toBeTruthy();
        });
        it('has volume', () => {
            expect(truck.volume.value).toBeTruthy();
        });
        it('has maxPayload', () => {
            expect(truck.maxPayload.value).toBeTruthy();
        });
        it('has consumption when empty', () => {
            expect(truck.consumptionEmpty.value).toBeTruthy();
        });
        it('has consumption when full', () => {
            expect(truck.consumptionFull.value).toBeTruthy();
        });
    };
    describe('the Light truck', () => {
        truckProperties("Light");
    });
    describe('the Heavy truck',() => {
        truckProperties("Heavy");
    });
    describe('the Train',() => {
       truckProperties("Train");
    });
});