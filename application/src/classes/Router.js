
export class Router{

    __routingMachine = 'http://router.project-osrm.org/route/';
    __version = 'v1/';
    __profile = 'driving/';
    __url = String;

    __geometries = 'geometries=geojson';
    __overview = 'overview=full';
    __annotations = 'annotations=speed';
    __options = String;


    constructor() {
        this.__url = this.__routingMachine + this.__version + this.__profile;
        this.__options = this.__computeOptions();
    }

    getRoute(start,end){
        let request = this.__computeRequest([start,end]);

        return fetch(request)
            .then(response => response.json())
            .then(data => this.__unpackResponse(data))
            .catch(x => console.error(x));
    }

    __unpackResponse(json){
        return {
            start : this.__unpackCoordinate(json.waypoints[0].location),
            end : this.__unpackCoordinate(json.waypoints[1].location),
            distance : json.routes[0].distance,
            duration : json.routes[0].duration,
            route : this.__unpackRoute(json.routes[0])
        }
    }

    __unpackRoute(rawRoute){
        let coordinates = rawRoute.geometry.coordinates.map(this.__unpackCoordinate);
        let speed = rawRoute.legs[0].annotation.speed;
        let route = new Array(coordinates.length);

        for(let i = 0; i < speed.length;i++){
            route[i] = {
                coordinates : coordinates[i],
                speed : speed[i]
            }
        }

        route[route.length - 1] = {
            coordinates : coordinates[coordinates.length - 1],
            speed : 0
        };

        return route;
    }

    __unpackCoordinate(coordinate){
        return {
            lng : coordinate[0],
            lat : coordinate[1]
        }
    }

    __computeRequest(waypoints){
        let coordinates = '';
        coordinates += waypoints[0].lng + ',' + waypoints[0].lat;
        for(let i = 1; i < waypoints.length;i++) {
            coordinates += ';' + waypoints[i].lng + ',' + waypoints[i].lat;
        }
        return this.__url + coordinates + this.__options;
    }

    __computeOptions(){
        return '?' + this.__geometries + '&' +
                this.__overview + '&' +
                this.__annotations;
    }
}