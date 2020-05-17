import L from 'leaflet';

export class GoodView{

    view = Object;

    constructor(good,mapObject){
        const lat = good.pickUp.lat;
        const lon = good.pickUp.lon;
        var svgElement = document.createElementNS("https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Package.svg/1200px-Package.svg.png", "svg");
        svgElement.setAttribute('xmlns', "http://www.w3.org/2000/svg");
        svgElement.setAttribute('viewBox', "0 0 200 200");
        svgElement.innerHTML = '<rect width="200" height="200"/><rect x="75" y="23" width="50" height="50" style="fill:red"/><rect x="75" y="123" width="50" height="50" style="fill:#0013ff"/>';
        var svgElementBounds = [ [lat +1, lon - 1], [ lat - 1, lon + 1 ] ];
        this.view = L.svgOverlay(svgElement, svgElementBounds);

        // this.view = L.circleMarker(good.pickUp,{
        //     radius : 5 * good.quantity.value,
        //     color : 'yellow'
        // });
        this.view.addTo(mapObject);
    }

    update(eventSource){
        // console.log("Received update");
        // console.log("location = ",eventSource.location);
        this.view.setLatLng(eventSource.location);
    }

}