import L from 'leaflet';
import UpdateMessage from "@/classes/util/UpdateMessage";

export class TruckView{

    mapObject = Object;
    truck = Object;
    view = Object;

    constructor(truck,mapObject){
        this.mapObject = mapObject;
        this.truck = truck;
        /*
        this.view = L.circleMarker(truck.location,{
            radius : 5,
            color : this.__pickColor(truck)
        });
         */
        this.view = L.marker(truck.location,{
          icon: L.icon({
             // iconUrl: 'assets/light_duty_van.svg',
              iconSize: [38, 95],
              iconUrl: this.__pickTruckType(truck)
          })
        });
        this.view.addTo(mapObject);
    }

    __pickTruckType(truck){
        switch(truck.properties.type){
            case "Light":
                return 'assets/light_duty_van.svg';
            case "Heavy":
                return 'assets/heavy_duty_van.svg';
            case "Train":
                return 'assets/train_truck.svg';
            default:
                console.log(truck.properties.type);
                console.error("Invalid truck type. Check the default marker !");
                return L.Icon.Default;
        }
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

    update(eventSource,message){
        switch (message){
            case UpdateMessage.Disabled:
                this.view.remove();
                break;
            case UpdateMessage.Relocated:
                try{
                    this.view.setLatLng(eventSource.location);
                }catch{
                    console.warn("invalid truck location");
                }
                break;
        }
    }
}