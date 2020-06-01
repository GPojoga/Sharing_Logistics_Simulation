import {L} from 'leaflet';
import TraditionalTruck from "@/classes/trucks/TraditionalTruck.js";


let map = L.map('map');
test(' traditional truck initialization',() => {
    let truck = new TraditionalTruck("Light",{lat: 1,lng:1},map,30);
    expect(truck.properties).toBeTruthy();
});