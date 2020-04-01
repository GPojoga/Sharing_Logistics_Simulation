<template>
    <div id="app">
        <Map/>
        <ControlPanel/>
    </div>
</template>

<script>
    import ControlPanel from "@/components/ControlPanel";
    import Map from "@/components/Map";

    export default {
        name: 'App',
        components: {
            ControlPanel,
            Map,
        },
        mounted(){
            let locations = this.$store.state.locations.get();
            for(let i = 0;i < locations.length;i++){
                locations[i] = null;
            }
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
