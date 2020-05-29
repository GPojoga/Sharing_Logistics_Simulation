import L from 'leaflet';

export class GoodView{

    view = Object;

    constructor(good,mapObject){
        /*this.view = L.circleMarker(good.pickUp,{
            radius : 5 * good.quantity,
            color : 'yellow'
        });*/
        this.view = L.marker(good.pickUp,{
            icon: L.icon({
                iconUrl: 'assets/goods.svg',
                iconSize: [38, 95],
            })
        });

        // const factor = 0.05/mapObject._zoom;
        // var imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Package.svg',
        //     imageBounds = [[good.pickUp.lat - factor, good.pickUp.lng - factor], [good.pickUp.lat + factor, good.pickUp.lng + factor]];
        // L.imageOverlay(imageUrl, imageBounds).addTo(mapObject);
        this.view.addTo(mapObject);
    }

    update(eventSource){
        if(eventSource.disabled){
            this.view.remove();
        }else{
            this.view.setLatLng(eventSource.location);
        }
    }

}