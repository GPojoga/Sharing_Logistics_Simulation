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
        switch(truck.properties.type){
            case "Light":
                return 'blue';
            case "Heavy":
                return 'green';
            case "Train":
                return 'black';
            default:
                console.log(truck.properties.type);
                console.error("Invalid truck type. Check the red truck !");
                return 'red';
        }
    }

    update(eventSource){
        try{
            if(eventSource.disabled){
                this.view.remove();
            }else{
                this.view.setLatLng(eventSource.location);
            }
        }catch (e) {
            console.log("impossible to set truck location");
            console.log("truck location : ",eventSource.location);
            console.log("truck route : ",eventSource._currentRoute);
            throw new Error("Check the truck location and route");
        }
    }

}