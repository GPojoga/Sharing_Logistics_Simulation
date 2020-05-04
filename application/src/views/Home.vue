<template>
    <div id="app">
        <Map/>
        <ControlPanel/>
    </div>
</template>

<script>
    import ControlPanel from "@/components/ControlPanel";
    import Map from "@/components/Map";

    import {Router} from '../classes/Router.js';

    export default {
        name: 'App',
        components: {
            ControlPanel,
            Map,
        },
        mounted(){
            let locations = this.$store.getters.locations;
            for(let i = 0;i < locations.length;i++){
                locations[i] = null;
            }
            let route = this.$store.state.route;
            route.distance = route.time.hours = route.time.minutes = 0;

            //Router testing ==============
            let router = new Router();
            router.getRoute([{lat : 53.2153888, lng : 6.5619295},{lat : 53.2107713, lng : 6.6027063}]);

            //=============================



        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        width: 100%;
        height: 100%;
    }
</style>
