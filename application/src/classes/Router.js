
export default class Router{

    _routingMachine = 'http://router.project-osrm.org/route/';
    _version = 'v1/';
    _profile = 'driving/';
    _url = String;

    _geometries = 'geometries=geojson';
    _overview = 'overview=full';
    _annotations = 'annotations=duration,distance';
    _options = String;


    constructor() {
        this._url = this._routingMachine + this._version + this._profile;
        this._options = this._computeOptions();
    }

    getRoute(start,end){
        let request = this._computeRequest([start,end]);

        return this._postRequest(request)
            .then(response => response.json())
            .then(data => this._unpackResponse(data))
            .catch(x => console.error(x));
    }

    _postRequest(request){
        let self = this;
        return fetch(request)
            .then((response) => {
                if (response.status === 200){
                    return response;
                }else {
                    console.warn("The OSRM response is not valid, trying again ...");
                    return new Promise( function(resolve){
                        setTimeout(function () {
                            resolve(self._postRequest(request));
                        } ,2000);
                    });
                }
            }).catch( () => {
                console.warn("The OSRM response is not valid, trying again ...");
                return new Promise( function(resolve){
                    setTimeout(function () {
                        resolve(self._postRequest(request));
                    } ,2000);
                });
            }
        )
    }
    _unpackResponse(json){
        return {
            start : this._unpackCoordinate(json.waypoints[0].location),
            end : this._unpackCoordinate(json.waypoints[1].location),
            distance : json.routes[0].distance,
            duration : json.routes[0].duration,
            route : this._unpackRoute(json.routes[0])
        }
    }

    _unpackRoute(rawRoute){
        let coordinates = rawRoute.geometry.coordinates.map(this._unpackCoordinate);
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

    _unpackCoordinate(coordinate){
        return {
            lng : coordinate[0],
            lat : coordinate[1]
        }
    }

    _computeRequest(waypoints){
        let coordinates = '';
        coordinates += waypoints[0].lng + ',' + waypoints[0].lat;
        for(let i = 1; i < waypoints.length;i++) {
            coordinates += ';' + waypoints[i].lng + ',' + waypoints[i].lat;
        }
        return this._url + coordinates + this._options;
    }

    _computeOptions(){
        return '?' + this._geometries + '&' +
                this._overview + '&' +
                this._annotations;
    }
}