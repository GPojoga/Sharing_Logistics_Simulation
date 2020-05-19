<template>
    <div id="app">
        <SimplifiedMap/>
        <ControlPanel/>
        <TimeControl/>
    </div>
</template>

<script>
    import ControlPanel from "@/components/ControlPanel";
    import SimplifiedMap from "@/components/SimplifiedMap";
    import TraditionalTruck from "@/classes/TraditionalTruck";
    import TimeControl from "../components/TimeControl";
    import Product from "@/classes/Product";

    export default {
        name: 'Home',
        components: {
            ControlPanel,
            SimplifiedMap,
            TimeControl
        },
        mounted(){
            // let locations = this.$store.getters.locations;
            // console.log(locations);
            // for(let i = 0;i < locations.length;i++){
            //     locations[i] = null;
            // }
            // let route = this.$store.state.route;
            // route.distance = route.time.hours = route.time.minutes = 0;

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
            // let productC = new Product(1,10,3,locationB,locationA);
            // let productD = new Product(1,10,3,locationB,locationD);
            // let productE = new Product(1,10,3,locationC,locationB);
            // let productF = new Product(1,10,3,locationB,locationD);

            truckA.addProduct(productA,0,0);
            truckA.addProduct(productB,2,2);
            // truckA.assignToProduct(productC);
            // truckA.assignToProduct(productD);
            // truckA.sendHome();

            this.$store.state.isRunning = true;
            this.$store.getters.time.run();

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
