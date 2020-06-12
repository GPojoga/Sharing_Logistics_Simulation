import CostHandler from "@/classes/trucks/CostHandler.js";
import haversine from "@/util/haversine";

describe('getCost', () => {
    it('add good to empty plan', () => {
        let dummyTruck = {
            initialLocation : {lat: 0, lng: 0},
            properties : {consumptionPerKg : 2},
            computeFuelConsumed : (a, b) => {return (a / 1000) * (b * 2 + 3);}
        };
        let dummyPlan = {
            orders : [],
        };
        let costHandler = new CostHandler(dummyPlan, dummyTruck);
        let dummyGood = {
            quantity: 1,
            weight: 1,
            volume: 1,
            pickUp: {lat: 1, lng: 0},
            delivery: {lat: 1, lng: 1}
        };

        let expected = (3 * haversine(dummyTruck.initialLocation, dummyGood.pickUp) + 5 * haversine(dummyGood.pickUp, dummyGood.delivery))/1000;
        expect(costHandler.getCost(dummyGood, 0, 0)).toBeCloseTo(expected, 5);
    });

    it('pickup good at start, deliver in middle of plan', () => {
        let dummyTruck = {
            initialLocation : {lat: 0, lng: 0},
            properties : {consumptionPerKg : 2},
            computeFuelConsumed : (a, b) => {return (a / 1000) * (b * 2 + 3);}
        };
        let dummyPlan = {
            orders : [
                {expectedLoad: {weight: 1}, location: {lat: 2, lng: 0}},
                {expectedLoad: {weight: 0}, location: {lat: 3, lng: 1}}
            ]
        };
        let costHandler = new CostHandler(dummyPlan, dummyTruck);
        let dummyGood = {
            quantity: 1,
            weight: 1,
            volume: 1,
            pickUp: {lat: 1, lng: 0},
            delivery: {lat: 3, lng: 0}
        };

        let expected = (3 * haversine(dummyTruck.initialLocation, dummyGood.pickUp)
            + 5 * haversine(dummyGood.pickUp, dummyPlan.orders[0].location)
            + 7 * haversine(dummyPlan.orders[0].location, dummyGood.delivery)
            + 5 * haversine(dummyGood.delivery, dummyPlan.orders[1].location)
            - 3 * haversine(dummyTruck.initialLocation, dummyPlan.orders[0].location)
            - 5 * haversine(dummyPlan.orders[0].location, dummyPlan.orders[1].location))/1000;

        expect(costHandler.getCost(dummyGood, 0, 1)).toBeCloseTo(expected, 5);
    });

    it('pickup good at start, deliver at end of plan', () => {
        let dummyTruck = {
            initialLocation : {lat: 0, lng: 0},
            properties : {consumptionPerKg : 2},
            computeFuelConsumed : (a, b) => {return (a / 1000) * (b * 2 + 3);}
        };
        let dummyPlan = {
            orders : [
                {expectedLoad: {weight: 1}, location: {lat: 2, lng: 0}},
                {expectedLoad: {weight: 0}, location: {lat: 3, lng: 0}}
            ]
        };
        let costHandler = new CostHandler(dummyPlan, dummyTruck);
        let dummyGood = {
            quantity: 1,
            weight: 1,
            volume: 1,
            pickUp: {lat: 1, lng: 0},
            delivery: {lat: 4, lng: 0}
        };

        let expected = (3 * haversine(dummyTruck.initialLocation, dummyGood.pickUp)
            + 5 * haversine(dummyGood.pickUp, dummyPlan.orders[0].location)
            + 2 * haversine(dummyPlan.orders[0].location, dummyPlan.orders[1].location)
            + 5 * haversine(dummyPlan.orders[1].location, dummyGood.delivery)
            - 3 * haversine(dummyTruck.initialLocation, dummyPlan.orders[0].location))/1000;

        expect(costHandler.getCost(dummyGood, 0, 2)).toBeCloseTo(expected, 5);
    });

    it('pickup and deliver good in middle of plan', () => {
        let dummyTruck = {
            initialLocation : {lat: 0, lng: 0},
            properties : {consumptionPerKg : 2},
            computeFuelConsumed : (a, b) => {return (a / 1000) * (b * 2 + 3);}
        };
        let dummyPlan = {
            orders : [
                {expectedLoad: {weight: 1}, location: {lat: 0, lng: 1}},
                {expectedLoad: {weight: 0}, location: {lat: 2, lng: 2}}
            ]
        };
        let costHandler = new CostHandler(dummyPlan, dummyTruck);
        let dummyGood = {
            quantity: 1,
            weight: 1,
            volume: 1,
            pickUp: {lat: 1, lng: 1},
            delivery: {lat: 1, lng: 2}
        };

        let expected = (5 * haversine(dummyPlan.orders[0].location, dummyGood.pickUp)
            + 7 * haversine(dummyGood.pickUp, dummyGood.delivery)
            + 5 * haversine(dummyGood.delivery, dummyPlan.orders[1].location)
            - 5 * haversine(dummyPlan.orders[0].location, dummyPlan.orders[1].location))/1000;

        expect(costHandler.getCost(dummyGood, 1, 1)).toBeCloseTo(expected, 5);
    });

    it('pickup good in middle, deliver at end of plan', () => {
        let dummyTruck = {
            initialLocation : {lat: 0, lng: 0},
            properties : {consumptionPerKg : 2},
            computeFuelConsumed : (a, b) => {return (a / 1000) * (b * 2 + 3);}
        };
        let dummyPlan = {
            orders : [
                {expectedLoad: {weight: 1}, location: {lat: 0, lng: 1}},
                {expectedLoad: {weight: 0}, location: {lat: 2, lng: 1}}
            ]
        };
        let costHandler = new CostHandler(dummyPlan, dummyTruck);
        let dummyGood = {
            quantity: 1,
            weight: 1,
            volume: 1,
            pickUp: {lat: 1, lng: 1},
            delivery: {lat: 3, lng: 1}
        };

        let expected = (5 * haversine(dummyPlan.orders[0].location, dummyGood.pickUp)
            + 7 * haversine(dummyGood.pickUp, dummyPlan.orders[1].location)
            + 5 * haversine(dummyPlan.orders[1].location, dummyGood.delivery)
            - 5 * haversine(dummyPlan.orders[0].location, dummyPlan.orders[1].location))/1000;

        expect(costHandler.getCost(dummyGood, 1, 2)).toBeCloseTo(expected, 5);
    });

    it('pick and deliver good at end of plan', () => {
        let dummyTruck = {
            initialLocation : {lat: 0, lng: 0},
            properties : {consumptionPerKg : 2},
            computeFuelConsumed : (a, b) => {return (a / 1000) * (b * 2 + 3);}
        };
        let dummyPlan = {
            orders : [
                {expectedLoad: {weight: 1}, location: {lat: 0, lng: 1}},
                {expectedLoad: {weight: 0}, location: {lat: 0, lng: 2}}
            ]
        };
        let costHandler = new CostHandler(dummyPlan, dummyTruck);
        let dummyGood = {
            quantity: 1,
            weight: 1,
            volume: 1,
            pickUp: {lat: 1, lng: 2},
            delivery: {lat: 1, lng: 3}
        };

        let expected = (3 * haversine(dummyPlan.orders[1].location, dummyGood.pickUp)
            + 5 * haversine(dummyGood.pickUp, dummyGood.delivery))/1000;

        expect(costHandler.getCost(dummyGood, 2, 2)).toBeCloseTo(expected, 5);
    });
});

describe('_savedCost', () => {
    it('add good to empty plan', () => {
        let dummyTruck = {
            initialLocation : {lat: 0, lng: 0},
            properties : {consumptionPerKg : 2},
            computeFuelConsumed : (a, b) => {return (a / 1000) * (b * 2 + 3);}
        };
        let dummyPlan = {
            orders : [],
        };
        let costHandler = new CostHandler(dummyPlan, dummyTruck);

        let expected = 0;
        expect(costHandler._savedCost( 0, 0)).toBeCloseTo(expected, 5);
    });

    it('pickup good at start, deliver in middle of plan', () => {
        let dummyTruck = {
            initialLocation : {lat: 0, lng: 0},
            properties : {consumptionPerKg : 2},
            computeFuelConsumed : (a, b) => {return (a / 1000) * (b * 2 + 3);}
        };
        let dummyPlan = {
            orders : [
                {expectedLoad: {weight: 1}, location: {lat: 2, lng: 0}},
                {expectedLoad: {weight: 0}, location: {lat: 3, lng: 1}}
            ]
        };
        let costHandler = new CostHandler(dummyPlan, dummyTruck);

        let expected = (3 * haversine(dummyTruck.initialLocation, dummyPlan.orders[0].location)
            + 5 * haversine(dummyPlan.orders[0].location, dummyPlan.orders[1].location))/1000;

        expect(costHandler._savedCost(0, 1)).toBeCloseTo(expected, 5);
    });

    it('pickup good at start, deliver at end of plan', () => {
        let dummyTruck = {
            initialLocation : {lat: 0, lng: 0},
            properties : {consumptionPerKg : 2},
            computeFuelConsumed : (a, b) => {return (a / 1000) * (b * 2 + 3);}
        };
        let dummyPlan = {
            orders : [
                {expectedLoad: {weight: 1}, location: {lat: 2, lng: 0}},
                {expectedLoad: {weight: 0}, location: {lat: 3, lng: 0}}
            ]
        };
        let costHandler = new CostHandler(dummyPlan, dummyTruck);

        let expected = (3 * haversine(dummyTruck.initialLocation, dummyPlan.orders[0].location))/1000;

        expect(costHandler._savedCost( 0, 2)).toBeCloseTo(expected, 5);
    });

    it('pickup and deliver good in middle of plan', () => {
        let dummyTruck = {
            initialLocation : {lat: 0, lng: 0},
            properties : {consumptionPerKg : 2},
            computeFuelConsumed : (a, b) => {return (a / 1000) * (b * 2 + 3);}
        };
        let dummyPlan = {
            orders : [
                {expectedLoad: {weight: 1}, location: {lat: 0, lng: 1}},
                {expectedLoad: {weight: 0}, location: {lat: 2, lng: 2}}
            ]
        };
        let costHandler = new CostHandler(dummyPlan, dummyTruck);

        let expected = (5 * haversine(dummyPlan.orders[0].location, dummyPlan.orders[1].location))/1000;

        expect(costHandler._savedCost(1, 1)).toBeCloseTo(expected, 5);
    });

    it('pickup good in middle, deliver at end of plan', () => {
        let dummyTruck = {
            initialLocation : {lat: 0, lng: 0},
            properties : {consumptionPerKg : 2},
            computeFuelConsumed : (a, b) => {return (a / 1000) * (b * 2 + 3);}
        };
        let dummyPlan = {
            orders : [
                {expectedLoad: {weight: 1}, location: {lat: 0, lng: 1}},
                {expectedLoad: {weight: 0}, location: {lat: 2, lng: 1}}
            ]
        };
        let costHandler = new CostHandler(dummyPlan, dummyTruck);

        let expected = (5 * haversine(dummyPlan.orders[0].location, dummyPlan.orders[1].location))/1000;

        expect(costHandler._savedCost(1, 2)).toBeCloseTo(expected, 5);
    });

    it('pick and deliver good at end of plan', () => {
        let dummyTruck = {
            initialLocation : {lat: 0, lng: 0},
            properties : {consumptionPerKg : 2},
            computeFuelConsumed : (a, b) => {return (a / 1000) * (b * 2 + 3);}
        };
        let dummyPlan = {
            orders : [
                {expectedLoad: {weight: 1}, location: {lat: 0, lng: 1}},
                {expectedLoad: {weight: 0}, location: {lat: 0, lng: 2}}
            ]
        };
        let costHandler = new CostHandler(dummyPlan, dummyTruck);

        let expected = 0;

        expect(costHandler._savedCost(2, 2)).toBeCloseTo(expected, 5);
    });
});