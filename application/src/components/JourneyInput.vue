<template>
    <div class="journey">
        <div class="location">
            <label>
                From
                <input type="text" v-model="from" list="fromSuggestions" v-on:keyup="updateFromPossibilities">
            </label>
            <datalist id="fromSuggestions">
                <option v-for="p in fromPossibilities" :key="p.x" :value="p.label"></option>
            </datalist>
        </div>
        <div class="location">
            <label>
                From
                <input type="text" v-model="to" list="toSuggestions" v-on:keyup="updateToPossibilities">
            </label>
            <datalist id="toSuggestions">
                <option v-for="p in toPossibilities" :key="p.x" :value="p.label"></option>
            </datalist>
        </div>
        <div class="date">
            <label>
                Depart on
                <input required type="date" id="date" v-model="date">
            </label>
        </div>
        <div class="two-way">
            <label>
                Round trip
                <input type="checkbox" id="two-way" v-model="twoWay">
            </label>
        </div>
        <div class="date" v-if="twoWay">
            <label>
                Return on
                <input required type="date" id="dateReturn" v-model="dateReturn">
            </label>
        </div>
        <button class="submit" v-on:click="onSubmit">
            Submit
        </button>
        <p v-if="errorMessage">{{ errorMessage }}</p>
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
    import { OpenStreetMapProvider } from 'leaflet-geosearch';

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
        name: "JourneyInput",
        data() {
            return {
                test: null,
                from: null,
                to: null,
                fromPossibilities: null,
                toPossibilities: null,
                fromCoordinates: null,
                toCoordinates: null,
                date: null,
                dateReturn: null,
                twoWay: null,
                errorMessage: null
            }
        },
        methods: {
            onSubmit() {
                let journeyDetails = {
                    from: this.from,
                    to: this.to,
                    date: this.date,
                    twoWay: this.twoWay
                };
                this.$emit('journey-submitted', journeyDetails);
                this.from = null;
                this.to = null;
                this.date = null;
                this.twoWay = null;
                this.errorMessage = null;
            },
            addFrom(location) {
                this.from = location.name;
                this.fromCoordinates = location.coordinates;
            },
            updateFromPossibilities() {
                provider.search({ query: this.from }).then(
                    list => {
                        this.fromPossibilities = list;
                    }
                );
            },
            updateToPossibilities() {
                provider.search({ query: this.to }).then(
                    list => {
                        this.toPossibilities = list;
                    }
                );
            }
        }
    }
</script>

<style scoped>
    .journey {
        margin: 25px;
        text-align: left;
    }

    .journey > div {
        margin-top: 20px;
    }

    .location > ::placeholder{
        color: #b0bfcd
    }

    .location{
        position: relative;
        height: 60px;
        width: 100%;
    }

    .location > input::-webkit-calendar-picker-indicator {
        display: none;
    }

    .date {
        height: 60px;
        width: 45%;
        float: left;
        position: relative;
    }

    .two-way {
        float: right;
        height: 60px;
        width: 50%;
    }

    #two-way {
        height: 20px;
        width: 20px;
        float: right;
    }

    .submit {
        margin: 15px;
        width: 90%;
    }
</style>