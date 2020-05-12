import L from 'leaflet';

export class TruckView{

    mapObject = Object;
    truck = Object;
    view = Object;

    constructor(truck,mapObject){
        this.mapObject = mapObject;
        this.truck = truck;
        this.view = L.circleMarker(truck.location,{
            radius : 5,
            color : this.__pickColor(truck)
        });
        this.view.addTo(mapObject);
    }

    __pickColor(truck){
        switch(truck.properties.key){
            case "Light":
                return 'blue';
            case "Heavy":
                return 'green';
            case "Train":
                return 'black';
            default:
                console.error("Invalid truck type. Check the red truck !");
                return 'red';
        }
    }
    update(eventSource){
        this.view.setLatLng(eventSource.location);
    }

}