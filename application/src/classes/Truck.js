
import store from "../store/index.js";
import {Observable} from "@/classes/Observable";
import {TruckView} from "@/classes/TruckView";
import {Router} from "@/classes/Router";

export class Truck extends Observable{

    /**
     * properties of the truck
     * @type {null,object}
     */
    properties = null;

    /**
     * truck location
     * @type {{lng: Number, lat: Number}}
     */
    location = {
        lat: Number,
        lng: Number,
    };

    initialLocation = {
        lat: Number,
        lng: Number,
    };

    /**
     * total fuel consumed
     * @type {number}
     */
    fuelConsumed = 0;

    /**
     * The sum of delivery time for all products transported by this truck
     * @type {number}
     */
    totalDeliveryTime = 0;

    /**
     * total number of delivered products by this truck
     * @type {number}
     */
    nrDeliveredProducts = 0;

    routes = [];

    router = Object;

    isMoving = Boolean;

    /**
     *
     * @param type truck type ("Light"|"Heavy"|"Train")
     * @param location initial location of the truck
     * @param mapObj the map on which the truck is visualized
     */
    constructor(type,location,mapObj) {
        super();
        this.initialLocation = location;
        this.location = location;
        this.__setProperties(type);
        this.addListener(new TruckView(this,mapObj));
        this.router = new Router();
        this.isMoving = false;
    }

    goHome(){
        this.goTo(this.initialLocation);
    }

    goTo(location){
        let waiter = {
            start : Object,
            end : location,
        };

        if(this.routes.length === 0 ){
            waiter.start = this.location;
        } else {
            waiter.start = this.routes[this.routes.length - 1].end;
        }

        this.routes.push(waiter);
        this.router.getRoute(waiter.start,location).then(route => {
            Object.assign(waiter,route);
            this.__start();
        });
    }

    __start(){
        if(!this.isMoving && this.routes.length > 0 && this.routes[0].route !== undefined){
            this.followRoute();
        }
    }

    followRoute(){
        let routeData = this.routes.shift();
        let route = routeData.route;
        this.isMoving = true;
        this.__followRoute(route,0);
    }

    __followRoute(route,index){
        let self = this;
        setTimeout(
            function(){
                if(index < route.length){
                    self.__setLocation(route[index].coordinates);
                    self.__followRoute(route,index + 1);
                }else{
                    console.log("Finished the route");
                    self.isMoving = false;
                    self.__start();
                }
            },100);
    }

    __setLocation(location){
        this.location = location;
        this.notify();
    }

    /**
     * This function retrieves the properties of the given truck type
     * from the store. If the type does not exist in the store, the
     * Train type is set by default
     * @param type truck type
     * @private
     */
    __setProperties(type){
        let tType = store.state.truckTypes.find(x => x.key === type);
        if(tType !== undefined){
            this.properties = tType;
        }else{
            console.error("Truck : Undefined truck type (default : Train)");
            this.properties = store.state.truckTypes.find(x => x.key === "Train");
        }
    }
}