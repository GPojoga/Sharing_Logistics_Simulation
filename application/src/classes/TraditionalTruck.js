import Truck from "@/classes/Truck"

export default class TraditionalTruck extends Truck{

    constructor(type,location,mapObj,tickRate){
        super(type,location,mapObj,tickRate);
    }

    _addProduct(product) {
        if(product === null){
            this.plan.push({
                location : this.initialLocation,
                type : "home",
                product : null
            });
        } else {
            let pickUp = {
                location : product.pickUp,
                type : "pickUp",
                product : {
                    quantity : product.quantity,
                    volume : product.volume,
                    weight : product.weight
                }
            };
            this.plan.push(pickUp);

            let delivery = {
              location : product.delivery,
              type : "delivery",
              product : {
                  quantity : product.quantity,
                  volume : product.volume,
                  weight : product.weight
              }
            };
            this.plan.push(delivery);
        }
    }
}