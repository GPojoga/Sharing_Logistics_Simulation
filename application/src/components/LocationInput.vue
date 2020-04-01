<template>
    <div class="location">
        <label>
            {{ locationInputLabel }}
            <input type="text" :list="suggestions" v-model="enteredText" v-on:input="updatePossibilities" autocomplete="off">
        </label>
        <div class="optionList" :id="suggestions" v-if="displayPossibilities && possibilities != null">
            <p class="option" v-for="(p, index) in possibilities" :id="index" :key="index" @click="selectLocation(p)">
                {{ p.label }}
            </p>
        </div>
    </div>
</template>

<script>
    /* Include Leaflet Geosearch, a plugin that enables searching for addresses in OpenStreetMap
       and returning the coordinates.
       The following is copied from documentation leaflet geosearch at:
            https://github.com/smeijer/leaflet-geosearch
       An example can be found at:
            https://smeijer.github.io/leaflet-geosearch/#openstreetmap
    */
    import {OpenStreetMapProvider} from "leaflet-geosearch";
    import L from "leaflet";

    const provider = new OpenStreetMapProvider();

    /* Results from provider.search({query: input}) are of the form:

        const result = {
          x: Number,                      // lon,
          y: Number,                      // lat,
          label: String,                  // formatted address
          bounds: [
            [Number, Number],             // s, w - lat, lon
            [Number, Number],             // n, e - lat, lon
          ],
          raw: {},                        // raw provider result
        }
     */

    export default {
        name: "LocationInput",
        props: {
            locationInputLabel: String,
            value: Object,
            index: Number
        },
        data() {
            return {
                enteredText: null,
                selected: null,
                possibilities: null,
                displayPossibilities: false,
                locations: this.$store.state.locations
            }
        },
        watch:{
            locations: function(){
                let location = this.locations.get()[this.index];
                if (location !== null){
                    this.reverseGeocode(location.lat,location.lng).then(
                        lc => {
                            this.enteredText = lc;
                        }
                    );
                }else{
                    this.enteredText = '';
                }
            }
        },
        methods: {
            async reverseGeocode(lat,lon){
                let url = 'https://nominatim.openstreetmap.org/reverse?format=json';
                url += '&lat=' + lat + '&lon=' + lon;
                let result = await fetch(url);
                let json = await result.json();
                if (json.display_name !== undefined){
                    return json.display_name;
                }else{
                    return '[' + lat +',' + lon + ']';
                }
            },
            updatePossibilities() {
                if (this.enteredText !== '') {
                    this.displayPossibilities = true;

                    provider.search({ query: this.enteredText }).then(
                        list => {
                            this.possibilities = list;
                        }
                    );
                } else {
                    this.displayPossibilities = false;
                    this.possibilities = null;
                    this.selectLocation(null);
                }
            },
            selectLocation(p) {
                this.displayPossibilities = false;
                this.selected = p;
                if (p !== null){
                    this.enteredText = p.label;
                }
                this.addToStore();
                console.log('Location added to store');
                this.$emit('input', this.selected);
            },
            addToStore() {
                let state = this.$store.state;
                if (this.selected === null){
                    state.locations.set(null,this.index);
                }else{
                    state.locations.get()[this.index] = null;
                    let latlng = L.latLng(parseFloat(this.selected.y), parseFloat(this.selected.x));
                    state.locations.set(latlng,this.index);
                }
            }
        },
        computed: {
            suggestions() {
                return 'suggestions' + this.value;
            }
        }
    }
</script>

<style scoped>
    /* Contains all options for places */
    .optionList {
        width: 85.5%;
        background-color: white;
        display: flex;
        flex-direction: column;
        position: absolute;
        z-index: 1; /* Put on top of other elements */
        opacity: 1; /* Make not transparent */

        /* Set border of the list with suggestions for places */
        border: solid #2284ff;
        border-width: 2px;
        border-radius: 4px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    /* One option in the list of possible places */
    .option {
        margin: 10px;
        cursor: pointer;
    }

    .location > ::placeholder{
        color: #b0bfcd
    }

    .location > input::-webkit-calendar-picker-indicator {
        display: none;
    }

    input{
        margin-top: 5px;
        padding-left: 10px;
        height: 30px;
        width: 95%;
        background-color: #f1f9ff;
        border: solid #2284ff;
        color: #007feb;
        font-weight: bold;
        font-size: medium;
        border-radius: 5px;
    }

    label {
        font-weight: bold;
        height: 20px;
    }
</style>