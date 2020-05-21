import L from 'leaflet';

export class GoodView{

    view = Object;

    constructor(good,mapObject){
        this.view = L.circleMarker(good.pickUp,{
            radius : 5 * good.quantity,
            color : 'yellow'
        });

        // const factor = 0.05/mapObject._zoom;
        // var imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Package.svg',
        //     imageBounds = [[good.pickUp.lat - factor, good.pickUp.lng - factor], [good.pickUp.lat + factor, good.pickUp.lng + factor]];
        // L.imageOverlay(imageUrl, imageBounds).addTo(mapObject);
        this.view.addTo(mapObject);
    }

    update(eventSource){
        // console.log("Received update");
        // console.log("location = ",eventSource.location);
        this.view.setLatLng(eventSource.location);
    }

}