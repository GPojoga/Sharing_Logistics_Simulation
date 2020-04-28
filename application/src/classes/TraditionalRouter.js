import store from "../store/index.js";
/**
 * This class performs the routing of a traditional logistic
 * network for a single truck
 */
export class TraditionalRouter{

    constructor (truck) {
        this.truck = truck;
    }

    generateRoute(){
        let closestProducts = this.__getClosestProducts();
        console.log(closestProducts);
    }

    __getClosestProducts(){
        let listProducts = store.state.A.cargo.slice();
        return listProducts;
    }
}