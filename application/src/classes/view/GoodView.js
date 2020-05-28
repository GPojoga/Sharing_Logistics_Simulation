import L from 'leaflet';
import UpdateMessage from "@/classes/util/UpdateMessage";

export class GoodView{

    view = Object;

    constructor(good,mapObject){
        this.view = L.circleMarker(good.pickUp,{
            radius : 5 * good.quantity,
            color : 'yellow'
        });
        this.view.addTo(mapObject);
    }

    update(eventSource,message){
        switch (message) {
            case UpdateMessage.Disabled:
                console.log("GOOD disabled");
                this.view.remove();
                break;
            case UpdateMessage.Relocated:
                this.view.setLatLng(eventSource.location);
                break;
        }
    }

}