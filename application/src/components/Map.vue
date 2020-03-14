<template>
    <l-map  class="map"
            :options="{
                        zoomControl:false
                      }"
            :zoom="zoom"
            :minZoom="minZoom"
            :center="center"
            :maxBounds="maxBounds"
            :maxBoundsViscosity="maxBoundsViscosity"
            :zoomAnimation="zoomAnimation"
            @click="addLocation"
    >
        <l-tile-layer :url="url"></l-tile-layer>
        <l-control-zoom position="bottomright"/>
        <l-marker v-for="(location,index) in locations" :key="index" :lat-lng="location" @click="removeLocation(index)"></l-marker>
    </l-map>

</template>

<script>
    import {LMap, LTileLayer,LControlZoom,LMarker} from 'vue2-leaflet';

    export default {
        name: "Map",
        components: {
            LMap,
            LTileLayer,
            LControlZoom,
            LMarker,
        },
        data () {
            return {
                url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                zoom: 5,
                minZoom:2,
                center: [47.368106, 14.197493],
                maxBounds: [[-90, Infinity], //South,West
                           [90, -Infinity]],  //North,East
                maxBoundsViscosity: 0.8, //If maxBounds is set, this option will control
                                         // how solid the bounds are when dragging the map around.
                                         // the domain is [0.0,1.0]
                zoomAnimation: true,
                locations: [],   // The coordinates of all markers/locations
                timeoutId: null, // Necessary to handle single clicks
            };
        },
        methods: {
            /**
             * This function adds a new entry to locations when the map is clicked (once)
             * @param event
             */
            addLocation(event){
                if(!this.timeoutId) {
                    this.timeoutId = setTimeout(() => {
                        //Single click
                        this.locations.push(event.latlng);
                        this.timeoutId = null;
                    }, 400); //tolerance in ms
                }else{
                    //Multiple clicks
                    clearTimeout(this.timeoutId);
                    this.timeoutId = null;
                }
            },
            /**
             * This function removes the location with the given index
             * @param index of the location to be removed
             */
            removeLocation(index){
                this.locations.splice(index,1);
            }
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