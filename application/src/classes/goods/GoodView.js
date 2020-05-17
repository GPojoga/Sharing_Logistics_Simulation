import L from 'leaflet';

export class GoodView{

    mapObject = Object;
    good = Object;
    view = Object;

    constructor(good,mapObject){
        this.mapObject = mapObject;
        this.good = good;
        this.view = L.circleMarker(good.pickUp,{
            radius : 5 * good.quantity.value,
            color : 'yellow'
        });
        this.view.addTo(mapObject);
    }

    update(eventSource){
        // console.log("Received update");
        // console.log("location = ",eventSource.location);
        this.view.setLatLng(eventSource.location);
    }

}