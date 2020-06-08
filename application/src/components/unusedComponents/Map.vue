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
    import L from 'leaflet'
    import 'leaflet-routing-machine'

    const mapLayoutUrl = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png'; // Standard map: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

    export default {
        name: "Map",
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
        watch:{
           locations: function() {
               if (this.locations.event === 'locationListUpdate'){  // A location was added/removed
                   this.routingMachine.setWaypoints(this.$store.getters.locations);
               }
           }
        },
        mounted () {
            const self = this;
            let routingMachine = L.Routing.control({
                serviceUrl :"http://router.project-osrm.org/route/v1",
                routeWhileDragging: true,
                fitSelectedRoutes: false,
                addWaypoints: false // user cannot add new waypoints to an already existing route
            });

            routingMachine.addTo(this.$refs.map.mapObject);
            routingMachine._container.style.display="None"; // the directions box is hidden
            //when the route is found, time and distance from the storage is updated
            routingMachine.on('routesfound', function(e) {
                let summary = e.routes[0].summary;
                let dist =  parseFloat((summary.totalDistance / 1000).toFixed(2));
                let time = {
                    hours: Math.floor(summary.totalTime / 3600),
                    minutes: Math.round(summary.totalTime % 3600 / 60),
                };
                self.$store.commit('setRoute', {
                    dist: dist,
                    time: time
                });
            });
            // when the waypoints are changed the locations list from the storage is updated
            routingMachine.on('waypointschanged', function() {
                self.$store.dispatch('setLocations', routingMachine.getWaypoints().map(x => x.latLng) );
            });
            this.routingMachine = routingMachine;
        },
        computed: {
            locations: {
                get() {
                    return this.$store.state.locations;
                }
            }
        },
        methods: {
            /**
             * This function only adds a new location if the map is clicked ONCE.
             * @param event
             */
            addLocation(event){
                if(!this.timeoutId) {
                    this.timeoutId = setTimeout(() => {
                        //Single click
                        this.$store.dispatch('addLocation', event.latlng);
                        this.timeoutId = null;
                    }, 400); //tolerance in ms
                }else{
                    //Multiple clicks
                    clearTimeout(this.timeoutId);
                    this.timeoutId = null;
                }
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