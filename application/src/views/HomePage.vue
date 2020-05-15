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
    import Good from "@/classes/Good";

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

            let goodA = new Good(1,10,3,locationA,locationB);
            let goodB = new Good(1,10,3,locationC,locationD);
            let goodC = new Good(1,10,3,locationB,locationA);
            let goodD = new Good(1,10,3,locationB,locationD);
            // let goodE = new Good(1,10,3,locationC,locationB);
            // let goodF = new Good(1,10,3,locationB,locationD);

            truckA.assignToGood(goodA);
            truckA.assignToGood(goodB);
            truckA.assignToGood(goodC);
            truckA.assignToGood(goodD);
            truckA.sendHome();

            // truckB.assignToGood(goodE);
            // truckB.assignToGood(goodB);
            // truckB.assignToGood(goodF);
            // truckB.assignToGood(goodC);
            // truckB.sendHome();
            //
            // truckC.assignToGood(goodC);
            // truckC.assignToGood(goodB);
            // truckC.assignToGood(goodD);
            // truckC.assignToGood(goodA);
            // truckC.sendHome();
        }
    }
</script>
