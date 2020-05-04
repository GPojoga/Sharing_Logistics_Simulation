
export class Router{

    __routingMachine = 'http://router.project-osrm.org/route/';
    __version = 'v1/';
    __profile = 'driving/';
    __url = String;

    __alternatives = 'alternatives=false';
    __steps = 'steps=true';
    __geometries = 'geometries=geojson';
    __overview = 'overview=false';
    __annotations = 'annotations=true';
    __options = String;


    constructor() {
        this.__url = this.__routingMachine + this.__version + this.__profile;
        this.__options = this.__computeOptions();
    }

    async getRoute(waypoints){
        let request = this.__computeRequest(waypoints);

        console.log("Request : " + request);
        let result = await fetch(request);
        let json = await result.json();
        console.log(json);
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
        return '?' + this.__alternatives + '&' +
                this.__steps + '&' +
                this.__geometries + '&' +
                this.__overview + '&' +
                this.__annotations;
    }
}