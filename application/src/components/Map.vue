<template>
    <l-map  class="map"
            :zoom="zoom"
            :center="center"
            @update:zoom="zoomUpdated"
            @update:center="centerUpdated"
            @update:bounds="boundsUpdated"
            :minZoom="minZoom"
            :maxBounds="maxBounds"

    >
        <l-tile-layer :url="url"></l-tile-layer>
    </l-map>

</template>

<script>
    import {LMap, LTileLayer} from 'vue2-leaflet';

    export default {
        name: "Map",
        components: {
            LMap,
            LTileLayer,
        },
        data () {
            return {
                url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                zoom: 3,
                center: [47.413220, -1.219482],
                bounds: null,
                minZoom: 2,
                maxBounds: [[-90, Infinity], //South,West
                           [90, -Infinity]],  //North,East
            };
        },
        methods: {
            zoomUpdated (zoom) {
                this.zoom = zoom;
            },
            centerUpdated (center) {
                this.center = center;
            },
            boundsUpdated (bounds) {
                this.bounds = bounds;
            }
        }
    }
</script>

<style scoped>

    .map{
        height: 100%;
        width: 100%;
        position: absolute;
        background: #c3c3ca;
        z-index: 0;
    }
</style>