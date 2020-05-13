<template>
    <l-map  class="map" ref="map"
            :options="{
                        zoomControl:false
                      }"
            :zoom="zoom"
            :minZoom="minZoom"
            :center="center"
            :maxBounds="maxBounds"
            :maxBoundsViscosity="maxBoundsViscosity"
            :zoomAnimation="zoomAnimation"
    >
        <l-tile-layer :url="url"/>
        <l-control-zoom position="bottomright"/>
    </l-map>

</template>

<script>
    import {LMap, LTileLayer,LControlZoom} from 'vue2-leaflet'
    import 'leaflet-routing-machine'

    const mapLayoutUrl = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png'; // Standard map: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

    export default {
        name: "SimplifiedMap",
        components: {
            LMap,
            LTileLayer,
            LControlZoom,
        },

        data () {
            return {
                url: mapLayoutUrl,
                zoom: 5,
                minZoom:2,
                center: [47.368106, 14.197493], // Somewhere in the middle of Austria and therefore Europe
                maxBounds: [[-90, Infinity], //South, West
                           [90, -Infinity]],  //North, East
                maxBoundsViscosity: 0.8, //If maxBounds is set, this option will control
                                         // how solid the bounds are when dragging the map around.
                                         // the domain is [0.0,1.0]
                zoomAnimation: true,
                timeoutId: null, // Necessary to handle single clicks
                routingMachine: null
            };
        },

        mounted () {
            // Relay the map the the store of the webapp.
            this.$store.commit("setMap", {map: this.$ref.map.mapObject});
        },
    }
</script>

<style scoped>

    .map{
        height: 100%;
        width: 100%;
        position: absolute;
        background: #f7f7ff;
        z-index: 0;
    }
</style>