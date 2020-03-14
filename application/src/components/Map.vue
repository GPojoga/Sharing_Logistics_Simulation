<template>
    <l-map  class="map"
            :options="{
                        zoomControl:false
                      }"
            :zoom="zoom"
            :center="center"
            :minZoom="minZoom"
            :maxBounds="maxBounds"
            :maxBoundsViscosity="maxBoundsViscosity"
            :zoomAnimation="zoomAnimation"
    >
        <l-tile-layer :url="url"></l-tile-layer>
        <l-control-zoom position="bottomright"/>

    </l-map>

</template>

<script>
    import {LMap, LTileLayer,LControlZoom} from 'vue2-leaflet';

    export default {
        name: "Map",
        components: {
            LMap,
            LTileLayer,
            LControlZoom,
        },
        data () {
            return {
                url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                zoom: 5,
                center: [47.368106, 14.197493],
                minZoom: 2,
                maxBounds: [[-90, Infinity], //South,West
                           [90, -Infinity]],  //North,East
                maxBoundsViscosity: 0.8, //If maxBounds is set, this option will control
                                         // how solid the bounds are when dragging the map around.
                                         // the domain is [0.0,1.0]
                zoomAnimation:true,
            };
        },
        methods: {
        }
    }
</script>

<style scoped>

    .map{
        height: 100%;
        width: 100%;
        position: absolute;
        background: #e8e8f0;
        z-index: 0;
    }
</style>