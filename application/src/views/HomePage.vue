<template>
    <div id="app">
        <SimplifiedMap/>
        <ControlPanel/>
    </div>
</template>

<script>
    import ControlPanel from "../components/ControlPanel";
    import SimplifiedMap from "../components/SimplifiedMap";
    import TraditionalTruck from "@/classes/TraditionalTruck";
    import Product from "@/classes/Product";

    export default {
        name: 'HomePage',
        components: {
            ControlPanel,
            SimplifiedMap,
        },
        mounted(){

            // Router testing: TODO: Remove this commented code.

            let locationA = {
                lng : 6.5619295,
                lat : 53.2153888
            };

            let locationB = {
                lat : 53.212664,
                lng : 6.565231
            };

            let locationC = {
                lat : 53.211269,
                lng : 6.566932
            };

            let locationD = {
                lat : 53.214678,
                lng : 6.562664
            };

            let truckA = new TraditionalTruck("Light",locationB,this.$store.getters.map,30);
            // let truckB = new TraditionalTruck("Heavy",locationA,this.$store.getters.map,30);
            // let truckC = new TraditionalTruck("Train",locationC,this.$store.getters.map,30);

            let productA = new Product(1,10,3,locationA,locationB);
            let productB = new Product(1,10,3,locationC,locationD);
            let productC = new Product(1,10,3,locationB,locationA);
            let productD = new Product(1,10,3,locationB,locationD);
            // let productE = new Product(1,10,3,locationC,locationB);
            // let productF = new Product(1,10,3,locationB,locationD);

            truckA.assignToProduct(productA);
            truckA.assignToProduct(productB);
            truckA.assignToProduct(productC);
            truckA.assignToProduct(productD);
            truckA.sendHome();

            // truckB.assignToProduct(productE);
            // truckB.assignToProduct(productB);
            // truckB.assignToProduct(productF);
            // truckB.assignToProduct(productC);
            // truckB.sendHome();
            //
            // truckC.assignToProduct(productC);
            // truckC.assignToProduct(productB);
            // truckC.assignToProduct(productD);
            // truckC.assignToProduct(productA);
            // truckC.sendHome();
        }
    }
</script>
