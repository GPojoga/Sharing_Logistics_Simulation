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
            @click="addLocation"
    >
        <l-tile-layer :url="url"/>
        <l-control-zoom position="bottomright"/>
        <l-marker v-for="(location,index) in this.validLocations"
                  :key="index" :lat-lng="location.pos" @click="removeLocation(location.index)"></l-marker>
    </l-map>

</template>

<script>
    import {LMap, LTileLayer,LControlZoom,LMarker} from 'vue2-leaflet'
    import Vue from 'vue'
    import L from 'leaflet'
    import 'leaflet-routing-machine'

    export default {
        name: "Map",
        components: {
            LMap,
            LTileLayer,
            LControlZoom,
            LMarker,
        },
        mounted: function(){
            this.initializeRoutingMachine();
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
                timeoutId: null, // Necessary to handle single clicks
                locations: this.$store.state.locations // shortcut
            };
        },
        computed: {
            /**
             * the list with locations that are not null, used for markers
             */
            routingMachine: function(){
                return L.Routing.control({
                    routeWhileDragging: true,
                });
            },
            validLocations: function() {
                return this.$store.state.locations.filter(function(location){
                    return location != null;
                });
            }
        },
        methods: {
            initializeRoutingMachine(){
                this.routingMachine.addTo(this.$refs.map.mapObject);
                this.routingMachine._container.style.display="None";
                this.routingMachine.on('routesfound',function(e){
                    let routes = e.routes;
                    let summary = routes[0].summary;

                    console.log('Total distance is ' + summary.totalDistance / 1000 +
                        ' km and total time is ' + Math.round(summary.totalTime % 3600 / 60) + ' minutes');
                })
            },
            /**
             * This function adds a new location if the map is clicked ONCE
             * @param event
             */
            addLocation(event){
                if(!this.timeoutId) {
                    this.timeoutId = setTimeout(() => {
                        //Single click
                        this.addLocationHelper(event.latlng);
                        this.timeoutId = null;
                    }, 400); //tolerance in ms
                }else{
                    //Multiple clicks
                    clearTimeout(this.timeoutId);
                    this.timeoutId = null;
                }
            },
            /**
             * this function add the new location if it conforms to the conditions
             * @param latlng latitude and longitude of the location to be added
             */
            addLocationHelper(latlng){
                let maxNrLocations = this.$store.state.maxNrLocations;
                for (let i = 0;i < maxNrLocations;i++){
                    if (this.locations[i] === null){
                        let location = {
                            pos : latlng, // latitude and longitude
                            index: i  // index in the locations array
                        };
                        Vue.set(this.locations,i,location);
                        console.log(this.locations);
                        break;
                    }
                }
            },
            /**
             * This function removes the location with the given index
             * @param index of the location to be removed
             */
            removeLocation(index){
                Vue.set(this.locations,index,null);
            }
        }
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