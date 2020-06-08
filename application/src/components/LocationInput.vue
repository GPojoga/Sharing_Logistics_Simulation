<template>
    <div class="location">
        <label style="display: block;">
            {{ label }}
        </label>
        <basic-input :title="info"  type="text" v-model="enteredText" :disabled="isDisabled"
                     @input="updatePossibilities" @focus="toggleFocus" @blur="toggleFocus"
                     :class="[{ optionListActivatedInput : displayPossibilities && isFocus }, isValid ? 'valid' : 'invalid' ]"/>

        <div class="gpsContainer">
            <basic-button @click="activateGpsButton" type="button" layout="solid" class="gpsButton"
                          :class="{ gpsOn: gpsActivated}">
                <i class="fas fa-map-marked-alt"/>
            </basic-button>
        </div>
        <div class="optionList" :id="idSuggestions" v-if="displayPossibilities && isFocus && possibilities != null">
            <p class="option" v-for="(p, i) in possibilities" :id="i" :key="i" @click="selectLocation(p)">
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

       It is a wrapper around OpenStreetMap and Nominatim, which only allows 1 request per second!
    */
    import {OpenStreetMapProvider} from "leaflet-geosearch";
    import L from "leaflet";
    import BasicInput from "./BasicInput";
    import BasicButton from "./BasicButton";

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
        components: {BasicButton, BasicInput},
        props: {
            location: Object,  // This is the object that the input is altering.
            label: String,     // This is the label displayed with the location input.
            setter: String,    // This is the setter the input should call when it gets a new location.
            forward: Object,   // This is the data to be forwarded to the setter.
        },
        data() {
            return {
                enteredText: null,                  // The text inputted by the user.
                selected: null,                     // The location currently selected.
                possibilities: null,                // A list of possible locations based on the currently inputted text.
                displayPossibilities: false,        // A boolean keeping track of if the possibilities should be shown.
                waitingToShowPossibilities: false,
                buttonObserver: false,              // A boolean observing when the gps button is pressed
                isFocus: false                      // A boolean modeling if the input is focused.
            }
        },
        mounted() {
            this.enteredText = this.location.text;
        },
        watch: {
            location: function() {
                if (this.location.value != null) {
                    if (this.enteredText === null || this.enteredText === '' || this.buttonObserver) {
                        this.enteredText = this.location.text;
                        this.buttonObserver = false;
                    }
                }
            }
        },
        methods: {
            /**
             * This function is called every time the user inputs a new character. It queries
             * the geo-coder, and returns a list of top 5 suggestions.
             */
            updatePossibilities() {
                if (this.enteredText !== '') {
                    this.displayPossibilities = true;

                    if (!this.waitingToShowPossibilities) {
                        this.waitingToShowPossibilities = true;

                        const self = this;

                        setTimeout(function() {
                            if (self.enteredText !== '') {
                                provider.search({ query: self.enteredText }).then(
                                    list => {
                                        self.possibilities = list.splice(0,5);
                                    }
                                );
                                self.waitingToShowPossibilities = false;
                            }
                        }, 1000);
                    }
                } else {
                    this.displayPossibilities = false;
                    this.possibilities = null;
                }
                this.selectLocation(null);
            },
            /**
             * This function deactivates the suggestions box, and selects the one the user clicked on.
             * @param pickedLocation The location picked by the user.
             */
            selectLocation(pickedLocation) {
                this.selected = pickedLocation;
                if (pickedLocation !== null) this.enteredText = pickedLocation.label;
                this.addToStore();
            },
            /**
             * This function adds the selected location to the store.
             */
            addToStore() {
                let payload = this.forward;
                // Add the inputted location to the payload.
                payload.location = (this.selected === null) ? null : L.latLng(parseFloat(this.selected.y), parseFloat(this.selected.x));
                payload.text = this.enteredText;
                this.$store.commit(this.setter, payload);
            },
            /**
             * This function activates the gps button so that the user can select a location on the map.
             */
            activateGpsButton(){
                this.buttonObserver = true;
                this.$store.state.tempForMap = true;
                this.$store.state.tempForForward = this.forward;
                this.$store.state.tempForSetter = this.setter;
            },
            /**
             * This function toggles the focus on the search text field for locations.
             */
            toggleFocus() {
                setTimeout( () => {
                    this.isFocus = !this.isFocus;
                }, 100);  // Tolerance so the suggestions have time to be clicked
            }
        },
        computed: {
            /**
             * @returns {string} Id computed for the suggestions list.
             */
            idSuggestions() {
                return 'suggestions' + this.label + this.setter + JSON.stringify(this.forward);
            },
            gpsActivated() {
                return this.$store.state.tempForMap && (this.$store.state.tempForForward === this.forward);
            },
            info() {
                return this.location.message;
            },
            isValid() {
                return !this.location.error;
            },
            isDisabled : function() {
                return this.$store.getters.isRunning;
            }
        },

    }
</script>

<style scoped>
    /* Contains all options for places */
    .optionList {
        width: 88.4%;
        background-color: white;
        display: flex;
        flex-direction: column;
        position: absolute;
        z-index: 2; /* Put on top of other elements */
        opacity: 1; /* Make not transparent */

        /* Set border of the list with suggestions for places */
        border: 0px solid #2284ff;
        border-radius: 0 0 4px 4px;
        box-shadow: 0 7px 8px 0 rgba(0, 0, 0, 0.2);
    }

    /* Styles the bottom border radiuses when the option list is open */
    .optionListActivatedInput {
        border-radius: 4px 4px 0 0;
        box-shadow: 0 7px 8px 0 rgba(0, 0, 0, 0.2);
    }

    /* One option in the list of possible places */
    .option {
        margin: 10px;
        cursor: pointer;
    }

    .location {
        text-align: left;
        margin-top: 10px;
        position: relative;
    }

    .location > ::placeholder{
        color: #b0bfcd
    }

    .location > input::-webkit-calendar-picker-indicator {
        display: none;
    }

    .location > input {
        width: 85%;
        padding-left: 10px;
    }

    /* Gps button styling */
    .gpsContainer {
        display: inline-block;
    }

    .gpsButton {
        background-color: #007feb;
        line-height: 10px;
        border: none;
        border-radius: 5px;
        color: white;
        padding: 10px 10px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
    }

    /* Change the font when the input is valid */
    .valid {
        background: #f1f9ff;
        border-color: #1187EC;
        color: #007FEB;
    }

    /* Change the font when the input is invalid */
    .invalid {
        background: #fff5fa;
        border-color: #fb2223;
        color: #fc3131;
    }

    .gpsOn {
        background-color: grey;
    }

    label {
        font-weight: bold;
        height: 20px;
    }
</style>