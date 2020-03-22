<template>
    <div class="location">
        <label>
            {{ locationInputLabel }}
            <input required type="text" :list="suggestions" v-model="enteredText" v-on:input="updatePossibilities" autocomplete="off">
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
            value: Object
        },
        data() {
            return {
                enteredText: null,
                selected: null,
                possibilities: null,
                displayPossibilities: false
            }
        },
        methods: {
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
                }
            },
            selectLocation(p) {
                this.displayPossibilities = false;
                this.selected = p;
                this.enteredText = p.label;
                this.$emit('input', this.selected);
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
        border: solid #007FEB;
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
        border: solid #007FEB;
        color: #007FEB;
        font-weight: bold;
        font-size: medium;
        border-radius: 5px;
    }

    label {
        font-weight: bold;
        height: 20px;
    }
</style>