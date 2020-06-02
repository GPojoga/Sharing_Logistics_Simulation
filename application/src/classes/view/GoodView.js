import L from 'leaflet';
import UpdateMessage from "@/classes/util/UpdateMessage";

export class GoodView{

    viewPickUp = Object;
    viewDrop = Object;

    constructor(good,mapObject){

        this.viewPickUp = L.marker(good.pickUp, {
            icon: L.icon({
                iconUrl: 'assets/good_pickup.svg',
                iconSize: [38, 95],
            })
        });

        this.viewDrop = L.marker(good.delivery, {
            icon: L.icon({
                iconUrl: 'assets/good_drop.svg',
                iconSize: [38, 95],
            })
        });

        this.viewPickUp.addTo(mapObject);
        this.viewDrop.addTo(mapObject);
    }

    update(eventSource,message){
        switch (message) {
            case UpdateMessage.Disabled:
                console.log("GOOD disabled");
                this.viewPickUp.remove();
                break;
            case UpdateMessage.Relocated:
                this.viewPickUp.setLatLng(eventSource.location);
                break;
        }
    }

}