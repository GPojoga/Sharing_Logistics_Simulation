// import store from "../store/index.js";

/**
 * This class performs the routing of a traditional logistic
 * network for a single truck
 */
export class TraditionalRouter{

    trucks = [];

    __preferredProducts = [];

    constructor (trucks) {
        this.trucks = trucks.slice();
    }

    route(){
        console.log("traditional routing");
    }

    __getPreferredProducts(){
        let preferredProducts = [];
        for(let i = 0;i < this.trucks.length;i++){

            let product = this.trucks[i].getPreferredProduct(0);
            let productIndex = preferredProducts.find(x => x.product === product);

            if(productIndex === -1){
                preferredProducts.push({
                    product : product,
                    trucks : [this.trucks[i]],
                });
            }else{
                preferredProducts[productIndex].trucks.push(this.trucks[i]);
            }

        }
        return preferredProducts;
    }

}