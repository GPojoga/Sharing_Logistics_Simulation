
export default class Router{

    __routingMachine = 'http://router.project-osrm.org/route/';
    __version = 'v1/';
    __profile = 'driving/';
    __url = String;

    __geometries = 'geometries=geojson';
    __overview = 'overview=full';
    __annotations = 'annotations=duration,distance';
    __options = String;


    constructor() {
        this.__url = this.__routingMachine + this.__version + this.__profile;
        this.__options = this.__computeOptions();
    }

    getRoute(start,end){
        let request = this.__computeRequest([start,end]);

        return this._postRequest(request)
            .then(response => response.json())
            .then(data => this.__unpackResponse(data))
            .catch(x => console.error(x));
    }

    _postRequest(request){
        let self = this;
        return fetch(request,{mode:"no-cors"})
            .then(response => {
                if (response.status === 200){
                    return response;
                }else {
                    console.warn("The OSRM response is not valid, trying again ...");
                    return new Promise( function(resolve){
                        setTimeout(function () {
                            resolve(self._postRequest(request));
                        } ,3000);
                    });
                }
            });
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
        let duration = rawRoute.legs[0].annotation.duration;
        let distance = rawRoute.legs[0].annotation.distance;
        let route = [];

        for(let i = 0; i < duration.length;i++){
            route.push({
                coordinates : coordinates[i],
                duration : duration[i],
                distance : distance[i]
            });
        }

        if(route[route.length - 1].distance !== 0){
            route.push({
                coordinates : coordinates[coordinates.length - 1],
                duration : 0,
                distance : 0
            });
        }

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