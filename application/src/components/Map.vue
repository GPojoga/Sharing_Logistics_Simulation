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
    </l-map>

</template>

<script>
    import {LMap, LTileLayer,LControlZoom} from 'vue2-leaflet'
    import Vue from 'vue'
    import L from 'leaflet'
    import 'leaflet-routing-machine'

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
                minZoom:2,
                center: [47.368106, 14.197493],
                maxBounds: [[-90, Infinity], //South,West
                           [90, -Infinity]],  //North,East
                maxBoundsViscosity: 0.8, //If maxBounds is set, this option will control
                                         // how solid the bounds are when dragging the map around.
                                         // the domain is [0.0,1.0]
                zoomAnimation: true,
                timeoutId: null, // Necessary to handle single clicks
                locations: this.$store.state.locations, // shortcut
                routingMachine: null,
                dummy:'I"m a dummy',
            };
        },
        computed: {
            /**
             * the list with locations that are not null, used for markers
             */
            validLocations: function() {
                return this.$store.state.locations.filter(function(location){
                    return location != null;
                });
            }
        },
        mounted () {
            const self = this;
            let routingMachine = L.Routing.control({
                routeWhileDragging: true,
                createMarker: function(i,wp){
                    console.log(self.dummy);
                    let marker = L.marker(wp.latLng,{
                        draggable: true,
                    });
                    marker.on('click', function(){
                        self.removeLocation(i);
                    });
                    return marker;
                }
            });
            let locations = this.locations;
            routingMachine.addTo(this.$refs.map.mapObject);
            routingMachine._container.style.display="None";
            routingMachine.on('routesfound',function(e){
                let routes = e.routes;
                let summary = routes[0].summary;

                console.log('Total distance is ' + summary.totalDistance / 1000 +
                    ' km and total time is ' + Math.round(summary.totalTime % 3600 / 60) + ' minutes');
            });
            routingMachine.on('waypointschanged',function(){
                let waypoints = routingMachine.getWaypoints();
                for (let i = 0;i < waypoints.length;i++){
                    Vue.set(locations,i,waypoints[i].latLng);
                }
                console.log(locations);
            });
            this.routingMachine = routingMachine;
        },
        methods: {
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

                        Vue.set(this.locations,i,latlng);
                        this.routingMachine.setWaypoints(this.locations);
                        break;
                    }
                }
            },

            removeLocation(index){
                Vue.set(this.locations,index,null);
                this.routingMachine.setWaypoints(this.locations);
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