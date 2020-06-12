import store from "@/store";
import {simulationType} from "@/classes/simulation/SimulationType";
import avg from "@/util/avg";
import {createLocalVue, mount} from "@vue/test-utils";
import SimplifiedMap from "@/components/SimplifiedMap";

const localVue = createLocalVue();
mount(SimplifiedMap,{
    localVue,
    store
});

let addGood = function(nr){
    for(let index = 0;index < nr;index++){
        store.commit('addNewGood');
        store.commit('setGoodQuantity',{value:1,index:index});
        store.commit('setGoodVolume',{value:1,index:index});
        store.commit('setGoodWeight',{value:1,index:index});
        store.commit('setGoodPickupLocation',{location:{lat:1,lng:1},index:index,text:'some location'});
        store.commit('setGoodDeliveryLocation',{location:{lat:1,lng:1},index:index,text:'some location'});
    }
};

let addTruck = function(nr){
    for(let index = 0;index < nr;index++){
        store.commit('addNewTruck');
        store.commit('setTruckType',{type:'Light',index:index});
        store.commit('setTruckQuantity',{value:1,index:index});
        store.commit('setTruckStartingLocation',{location:{lat:1,lng:1},index:index,text:'some location'});
    }
};

test('simulation results',done =>{
    jest.setTimeout(10000);
    let osrmResponse = {"code":"Ok",
        "waypoints":[
            {"hint":"OVPOjv___39EAAAARAAAAAAAAAANAAAAVIE1QgAAAAAAAAAAVIE1QkQAAABEAAAAAAAAAA0AAAA4GwEArzBkAM4PLAMUNWQAIQ0sAwAAPwQFuqWF",
                "location":[6.566063,53.219278],
                "name":"Stalstraat"},
            {"hint":"7qbOjv___38DAAAABAAAACwBAAAAAAAAKjUAQI3xqj7RTkhDAAAAAAMAAAAEAAAALAEAAAAAAAA4GwEALktkAGD8KwMFS2QAYPwrAwUADwAFuqWF",
                "location":[6.572846,53.214304],
                "name":"Heresingel"}],
        "routes":
            [
                {
                    "legs":
                        [
                            {
                                "steps":[],
                                "weight":395.1,
                                "distance":3418.1,
                                "annotation":
                                    {
                                        "distance":[0,8.801279,17.499993,11.36899,47.814733,42.577079,21.55273,49.504122,2.109215,19.858715,27.535998,41.201315,46.577518,1.750255,31.125254,6.714726,61.418787,52.93758,24.991534,27.689141,2.64281,4.121909,6.127858,6.187271,1.855582,11.772729,13.716294,68.097166,3.638758,3.664289,3.755639,3.769139,18.765353,37.643867,14.879017,2.268758,2.871653,1.855582,6.607018,8.110086,0.973343,41.159992,12.188596,57.337448,14.947369,4.088087,4.058758,4.357115,4.312649,111.961798,47.127545,12.569883,5.364755,11.603548,58.098159,53.199176,8.16647,25.449887,8.038105,5.486372,5.596429,92.03558,10.885042,3.660968,8.133385,43.248199,22.396083,3.143076,3.049015,3.148857,2.851988,2.872468,2.845905,1.261426,7.737257,17.431572,6.806843,11.014788,13.339316,10.62877,31.602954,51.313293,52.874045,54.133324,15.028797,2.686065,1.85007,1.924511,3.69678,3.895199,3.83989,3.357619,3.453799,3.471093,3.29159,3.241019,3.372625,40.16881,11.428238,12.799626,7.19973,29.67061,52.158189,46.365637,17.339905,77.712707,54.436438,65.03323,2.442238,4.832889,9.73097,8.781704,5.435096,80.061453,7.775181,4.972913,10.589775,10.474725,51.210307,8.28571,23.886137,1.429509,15.678459,10.721065,11.498385,10.792882,15.743806,13.175204,9.101794,11.282569,9.035507,20.06764,31.548009,4.541363,5.133348,8.234607,7.629374,12.633238,96.785058,6.223436,6.175853,54.434825,7.160111,15.584067,13.478671,5.698483,17.442396,45.738329,15.425722,5.778218,19.087691,20.583066,41.687141,26.797452,21.741955,21.83826,3.072531,15.590704,3.526164,5.005723,14.143862,2.668984,25.471708,34.466208,6.408771,13.755125,14.159297,17.279563,6.977891,74.091223,59.031801,42.907786,18.539967,5.296296,2.002073],
                                        "duration":[0,1.3,2.6,1.7,7.2,6.4,3.2,7.4,0.3,3,4.1,6.2,7,0.3,4.7,0.6,5.5,4.8,2.2,2.5,0.2,0.4,0.6,0.6,0.2,1.1,1.2,6.1,0.3,0.3,0.3,0.3,1.7,3.4,1.3,0.2,0.3,0.2,0.6,0.7,0.1,3.7,1.1,5.2,1.3,0.4,0.4,0.4,0.4,10.1,4.2,1.9,0.8,1.7,8.7,4.8,0.7,2.3,0.7,0.5,0.5,8.3,1,0.3,0.7,3.9,2,0.3,0.3,0.3,0.3,0.3,0.3,0.1,0.7,1.6,0.6,1.7,2,1,2.8,4.6,4.8,4.9,1.4,0.2,0.2,0.2,0.3,0.4,0.3,0.3,0.3,0.3,0.3,0.3,0.3,3.6,1,1.2,0.6,2.7,4.7,4.2,1.6,7,4.9,5.9,0.2,0.4,0.9,0.8,0.5,7.2,0.7,0.4,1,0.9,4.6,0.7,2.1,0.1,1.4,1,1,1,1.4,1.2,0.8,1,0.8,1.8,2.8,0.4,0.5,0.7,0.7,1.1,8.7,0.6,0.6,4.9,0.6,1.4,1.2,0.5,1.6,4.1,1.4,0.5,1.7,1.9,3.8,2.4,2,2,0.3,1.4,0.3,0.5,1.3,0.2,2.3,3.1,1,2.1,2.1,2.6,1,11.1,8.9,6.4,2.8,0.8,0.3]
                                    },
                                "summary":"",
                                "duration":395.1
                            }
                        ],
                    "weight_name":"routability",
                    "geometry":
                        {
                            "coordinates":[[6.566063,53.219278],[6.566063,53.219278],[6.566012,53.219351],[6.56591,53.219496],[6.565847,53.219591],[6.565189,53.219419],[6.564623,53.219241],[6.564448,53.219404],[6.564061,53.219784],[6.564044,53.2198],[6.563902,53.219957],[6.563719,53.220179],[6.563448,53.220512],[6.563147,53.22089],[6.563135,53.220904],[6.562925,53.221154],[6.563016,53.22118],[6.563845,53.221422],[6.564564,53.221625],[6.564894,53.221732],[6.565271,53.221837],[6.565307,53.221847],[6.565362,53.221864],[6.565444,53.221889],[6.565527,53.221914],[6.565553,53.22192],[6.565718,53.221958],[6.565915,53.221994],[6.566906,53.222145],[6.56696,53.22215],[6.567015,53.222151],[6.567071,53.222147],[6.567126,53.222139],[6.56739,53.22208],[6.567929,53.221978],[6.56814,53.221934],[6.568172,53.221927],[6.568213,53.221919],[6.568239,53.221913],[6.568329,53.221888],[6.56844,53.221858],[6.568453,53.221854],[6.569002,53.221684],[6.569164,53.221633],[6.569926,53.221393],[6.570126,53.221332],[6.570171,53.221307],[6.570212,53.22128],[6.570252,53.221249],[6.570286,53.221216],[6.571176,53.220362],[6.571541,53.219999],[6.571635,53.219901],[6.571668,53.219857],[6.57174,53.219762],[6.572033,53.21927],[6.572299,53.218819],[6.572336,53.218749],[6.572435,53.218528],[6.572465,53.218458],[6.57249,53.218411],[6.57252,53.218364],[6.573145,53.217626],[6.573226,53.217541],[6.573252,53.217512],[6.573314,53.217449],[6.573607,53.217102],[6.573761,53.216923],[6.573783,53.216898],[6.573816,53.216879],[6.573858,53.216866],[6.5739,53.216861],[6.573943,53.216863],[6.573983,53.216872],[6.574,53.216877],[6.574104,53.216908],[6.574339,53.216977],[6.574429,53.217006],[6.574533,53.216929],[6.574641,53.216828],[6.574777,53.216878],[6.57518,53.217028],[6.575838,53.217268],[6.57653,53.217501],[6.577239,53.217739],[6.577434,53.217807],[6.577469,53.217819],[6.577484,53.217833],[6.577495,53.217849],[6.57751,53.217881],[6.577512,53.217916],[6.577502,53.21795],[6.577488,53.217979],[6.577485,53.21801],[6.577491,53.218041],[6.577507,53.218069],[6.577532,53.218094],[6.577565,53.218117],[6.578082,53.218303],[6.57823,53.218355],[6.578394,53.218415],[6.578442,53.218357],[6.578676,53.21813],[6.579144,53.217754],[6.579565,53.217422],[6.579716,53.217295],[6.580416,53.216736],[6.580894,53.216339],[6.581468,53.215866],[6.581489,53.215848],[6.581532,53.215813],[6.581615,53.215741],[6.581496,53.215707],[6.581424,53.215684],[6.580369,53.215339],[6.580267,53.215305],[6.580202,53.215283],[6.580061,53.215239],[6.579931,53.215186],[6.579307,53.214917],[6.5792,53.214879],[6.578891,53.21477],[6.578873,53.214763],[6.578665,53.214697],[6.57851,53.214671],[6.57834,53.214653],[6.578179,53.214642],[6.577943,53.21465],[6.577747,53.214666],[6.577611,53.214674],[6.577443,53.214687],[6.577308,53.214695],[6.577007,53.214703],[6.576542,53.214757],[6.576474,53.21476],[6.576397,53.214758],[6.576275,53.214746],[6.576169,53.21472],[6.576009,53.214659],[6.574944,53.214067],[6.574877,53.214028],[6.574811,53.213989],[6.574209,53.213658],[6.574129,53.213615],[6.573954,53.213522],[6.573802,53.213442],[6.573738,53.213408],[6.573542,53.213304],[6.573036,53.213026],[6.572857,53.212938],[6.57279,53.212905],[6.572546,53.212815],[6.572265,53.212738],[6.57169,53.21259],[6.571321,53.212494],[6.571012,53.212431],[6.570709,53.212356],[6.570666,53.212346],[6.57045,53.212292],[6.570401,53.21228],[6.570374,53.212322],[6.570287,53.212438],[6.570271,53.21246],[6.570111,53.212668],[6.569904,53.212952],[6.569989,53.212979],[6.570139,53.213064],[6.570246,53.213174],[6.570291,53.213327],[6.570275,53.213389],[6.571282,53.213672],[6.572038,53.213949],[6.572574,53.214163],[6.57282,53.214241],[6.572846,53.214286],[6.572846,53.214304]],
                            "type":"LineString"
                        },
                    "weight":395.1,
                    "distance":3418.1,
                    "duration":395.1
                }
            ]
    };
    global.fetch = jest.fn(() => Promise.resolve({
        status : 200,
        json: ()=> Promise.resolve(osrmResponse)
    }));
    store.state.trucks = [];
    store.state.goods = [];
    addTruck(1);
    addGood(1);
    store.commit('setSimulation',{type:simulationType.SHARED,store:store});
    store.commit('startSharedSimulation');
    for(let i = 0;i < 5;i++){
        store.getters.time.speedUp();
    }
    let func = () => {
        setTimeout(() => {
            if(store.state.simulationResults.shared.finished){
                let simulation = store.state.sharedSimulation;
                let results = store.state.simulationResults.shared;
                expect(simulation).toBeTruthy();
                expect(results.finished).toBeTruthy();
                expect(store.getters.time.isPaused).toBeTruthy();
                expect(simulation._freightPlatform.getProcessedGoods().length).toBeTruthy();
                expect(results.distance).toEqual(simulation._trucksList.reduce((total,nextTruck) => {
                    return total + nextTruck.distanceTravelled;
                }, 0),);
                expect(results.numberOfTrucks).toEqual(simulation._trucksList.filter(truck => truck.nrDeliveredGoods > 0).length);
                expect(results.fuelConsumed).toEqual(simulation._trucksList.reduce((total,nextTruck) => {
                    return total + nextTruck.fuelConsumed;
                }, 0));
                expect(results.co2emissions).toEqual(store.getters.emissionRate.value * simulation._trucksList.reduce((total,nextTruck) => {
                    return total + nextTruck.fuelConsumed;
                }, 0));
                expect(results.time).toEqual(store.getters.time.elapsedTime);
                expect(results.averageDeliveryTime).toEqual(simulation._freightPlatform.getProcessedGoods().length === 0 ?
                    0 :
                    avg(simulation._freightPlatform.getProcessedGoods().reduce((accumulator,current) => {
                        accumulator.push(current.getDeliveryTime());
                        return accumulator;
                    },[])));
                expect(results.averageTransitTime).toEqual(simulation._freightPlatform.getProcessedGoods().length === 0 ?
                    0 :
                    avg(simulation._freightPlatform.getProcessedGoods().reduce((accumulator,current) => {
                        accumulator.push(current.getTransitTime());
                        return accumulator;
                    },[])));
                done();
            }else{
                func();
            }
        },100);
    };
    func();
});