<template>
    <div id="app">
        <SimplifiedMap/>
        <ControlPanel/>
    </div>
</template>

<script>
    import ControlPanel from "@/components/ControlPanel";
    import SimplifiedMap from "@/components/SimplifiedMap";
    // import Truck from "@/classes/Truck";
    // import Router from "@/classes/Router";

    export default {
        name: 'Home',
        components: {
            ControlPanel,
            SimplifiedMap,
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

            // let locationA = {
            //     lng : 6.5619295,
            //     lat : 53.2153888
            // };

            // let locationB = {
            //     lat : 53.197305,
            //     lng : 6.665607
            // };
            //
            // let locationC = {
            //     lat : 53.213924,
            //     lng : 6.501276
            // };
            //
            // let locationD = {
            //     lat : 53.238140,
            //     lng : 6.537277
            // };

            // new Truck("Light",locationA,this.$store.state.map,1);

            // let truckB = new Truck("Heavy",locationB,this.$store.state.map);
            // let truckC = new Truck("Train",locationC,this.$store.state.map);

            // truckB.goTo(locationA);
            // truckB.goTo(locationC);
            // truckB.goTo(locationD);
            // truckB.goHome();
            //
            // truckC.goTo(locationA);
            // truckC.goTo(locationB);
            // truckC.goTo(locationD);
            // truckC.goHome();

        }
    }
</script>
