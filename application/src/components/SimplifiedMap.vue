<template>
    <l-map  id="map" ref="map" :style="activeGPS ? 'cursor: crosshair' : 'cursor: grab'"
            :options="{
                    zoomControl:false
                  }"
            :zoom="zoom"
            :minZoom="minZoom"
            :center="center"
            :maxBounds="maxBounds"
            :maxBoundsViscosity="maxBoundsViscosity"
            :zoomAnimation="zoomAnimation"
            @click="processClick"
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
                zoom: 15, // 5,
                minZoom:2,
                // center: [47.368106, 14.197493], // Somewhere in the middle of Austria and therefore Europe
                center: [53.21617, 6.56067], // TODO used for testing/debugging simulation
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
            this.$store.commit("setMap", {map: this.$refs.map.mapObject});
        },
        computed : {
            activeGPS : function () {
                return this.$store.state.tempForMap;
            },
            forward : function () {
                return this.$store.state.tempForForward;
            },
            setter : function () {
                return this.$store.state.tempForSetter;
            }
        },

        methods: {
            /**
             * This function only adds a new location if the GPS button is pressed.
             * @param event The event of clicking the map.
             */
            processClick(event){
                if (this.activeGPS) {
                    if (!this.timeoutId) {
                        this.timeoutId = setTimeout(() => {
                            //Single click
                            this.setLocation(event.latlng)
                            this.timeoutId = null;
                        }, 400); //tolerance in ms
                        this.$store.state.tempForMap = false;
                    } else {
                        //Multiple clicks
                        clearTimeout(this.timeoutId);
                        this.timeoutId = null;
                        this.$store.state.tempForMap = false;
                    }
                }
            },

            /**
             * This function performs the reverse geo-coding. If it is possible to identify
             * the location using the coordinates, then the name of the location is returned.
             * Otherwise, a string of the form '[<lat>,<lon>]' is returned.
             * @param lat latitude coordinates of the location.
             * @param lon longitude coordinates of the location.
             * @returns {Promise<string|*>} Promises to return a String representation of the coordinates.
             */
            async reverseGeocode(lat,lon){
                let url = 'https://nominatim.openstreetmap.org/reverse?format=json';
                url += '&lat=' + lat + '&lon=' + lon;
                let result = await fetch(url);
                let json = await result.json();
                if (json.display_name !== undefined) {
                    return json.display_name;
                }
                return '[' + lat +',' + lon + ']';
            },

            /**
             * This function sets a location in the state of the webapp.
             * @param coords The coordinates of the location.
             */
            async setLocation(coords){
                let payload = this.forward;
                payload.location = coords;
                payload.text = await this.reverseGeocode(coords.lat, coords.lng);
                this.$store.commit(String(this.setter), payload);
            }
        }
    }
</script>

<style scoped>
    /* Style of the map itself */
    #map{
        height: 100%;
        width: 100%;
        position: absolute;
        background: #f7f7ff;
        z-index: 0;
    }
</style>