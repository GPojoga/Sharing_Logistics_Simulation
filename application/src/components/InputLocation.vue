<template>
    <div class="location">
        <label>
            {{ label }}
            <input type="text" :list="idSuggestions" v-model="enteredText" v-on:input="updatePossibilities" autocomplete="off">
        </label>
        <div class="optionList" :id="idSuggestions" v-if="displayPossibilities && possibilities != null">
            <p class="option" v-for="(p, i) in possibilities" :id="i" :key="i" @click="selectLocation(p)">
                {{ p.label }}
            </p>
        </div>
        <div>
            <button @click="activateGpsButton" type="button" class="gpsContainer" >Gps</button>
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
            location: Object,  // This is the object that the input is altering.
            label: String,     // This is the label displayed with the location input.
            setter: String,    // This is the setter the input should call when it gets a new location.
            forward: Object,   // This is the data to be forwarded to the setter.
        },
        data() {
            return {
                enteredText: null,           // The text inputted by the user.
                selected: null,              // The location currently selected.
                possibilities: null,         // A list of possible locations based on the currently inputted text.
                displayPossibilities: false  // A boolean keeping track of if the possibilities should be shown.
            }
        },
        watch: {
            location: function() {
                if (this.location !== null) {
                    // There is a location already
                    this.reverseGeocode(this.location.lat, this.location.lng).then(
                        lc => {
                            this.enteredText = lc;
                        }
                    );
                } else {
                    // The location is empty
                    this.enteredText = '';
                }
            }
        },
        methods: {
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
             * This function is called every time the user inputs a new character. It queries
             * the geo-coder, and returns a list of top 5 suggestions.
             */
            updatePossibilities() {
                if (this.enteredText !== '') {
                    this.displayPossibilities = true;

                    provider.search({ query: this.enteredText }).then(
                        list => {
                            this.possibilities = list.splice(0,5);
                        }
                    );
                } else {
                    this.possibilities = null;
                    this.selectLocation(null);
                }
            },
            /**
             * This function deactivates the suggestions box, and selects the one the user clicked on.
             * @param pickedLocation The location picked by the user.
             */
            selectLocation(pickedLocation) {
                this.displayPossibilities = false;
                this.selected = pickedLocation;
                if (pickedLocation !== null) { this.enteredText = pickedLocation.label; }
                this.addToStore();
            },
            /**
             * This function adds the selected location to the store.
             */
            addToStore() {
                let payload = this.forward;
                // Add the inputted location to the payload.
                payload.location = (this.selected === null) ? null : L.latLng(parseFloat(this.selected.y), parseFloat(this.selected.x));
                this.$store.commit(this.setter, payload);
            },

            activateGpsButton(){
                this.$store.state.tempForMap = true;
                this.$store.state.tempForForward = this.forward;
                this.$store.state.tempForSetter = this.setter;
            }
        },
        computed: {
            /**
             * @returns {string} Id computed for the suggestions list.
             */
            idSuggestions() {
                return 'suggestions' + this.label + this.setter + JSON.stringify(this.forward);
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

    .location {
        text-align: left;
        margin-top: 10px;
    }

    .location > ::placeholder{
        color: #b0bfcd
    }

    .location > input::-webkit-calendar-picker-indicator {
        display: none;
    }

    .gpsContainer {
        background-color: #007feb;
        line-height: 10px;
        border: none;
        border-radius: 5px;
        color: white;
        padding: 15px 10px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
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