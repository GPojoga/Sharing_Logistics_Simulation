import L from 'leaflet';
import UpdateMessage from "@/classes/util/UpdateMessage";

export class GoodView{

    view = Object;

    constructor(good,mapObject){
        /*this.view = L.circleMarker(good.pickUp,{
            radius : 5 * good.quantity,
            color : 'yellow'
        });
         */
        this.view = L.marker(good.pickUp, {
            icon: L.icon({
                iconUrl: 'assets/goods.svg',
                iconSize: [38, 95],
            })
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