
import store from "../store/index.js";
import {TraditionalRouter} from "./TraditionalRouter";
import {SharedRouter} from "./SharedRouter";

export class Truck{

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

    /**
     * method of simulation (SharedRouter|TraditionalRouter). Default - TraditionalRouter
     * @type {object}
     * @private
     */
    __router = null;

    /**
     *
     * @param type truck type ("Light"|"Heavy"|"Train")
     * @param method simulation method ("Traditional" | "Shared")
     * @param location initial location of the truck
     */
    constructor(type,method,location) {
        this.location = location;
        this.__setProperties(type);
        this.__selectRouter(method);
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

    /**
     * This function assigns to the __simulation field the function of the
     * specified simulation method. If the given method is neither "Shared" nor "Traditional",
     * the default method is assumed i.e., "Traditional".
     * @param method method of transportation
     * @private
     */
    __selectRouter(method){
        switch (method) {
            case "Traditional" :
                this.__router = new TraditionalRouter(this);
                break;
            case "Shared" :
                this.__router = new SharedRouter(this);
                break;
            default :
                console.error("Truck : Undefined simulation method (default : traditional simulation)");
                this.__router = new TraditionalRouter(this);
        }
    }

    /**
     * This function activates the truck
     */
    start(){
        let route = this.__router.generateRoute();
        console.log(route);
        // while(route !== null){
        //     //
        // }
    }

}