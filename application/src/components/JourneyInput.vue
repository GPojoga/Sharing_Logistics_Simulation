<template>
    <form class="journey">
        <!-- Input from and to -->
        <LocationInput v-model="from" location-input-label="From"  @input="addToStore(0)"></LocationInput>
        <LocationInput v-model="to" location-input-label="To" @input="addToStore(1)"></LocationInput>

        <!-- Input departure and possibly return date -->
        <DateInput date-input-label="Depart on" :minimum-date="new Date().toISOString().substr(0,10)" v-model="date"></DateInput>
        <div class="two-way">
            <SelectorCheckBox label-text="Round trip" checkbox-id="two-way" @boxChecked="setIsTwoWay"></SelectorCheckBox>
        </div>
        <DateInput date-input-label="Return on" :minimum-date="date" v-model="dateReturn" v-if="twoWay"></DateInput>

        <!-- TODO Submit for testing purposes -->
        <input type="submit" value="Submit" v-on:click="onSubmit">
    </form>
</template>

<script>
    import SelectorCheckBox from "./SelectorCheckBox";
    import DateInput from "./DateInput";
    import LocationInput from "./LocationInput";
    import L from 'leaflet';


    export default {
        name: "JourneyInput",
        components: {LocationInput, DateInput, SelectorCheckBox},
        data() {
            return {
                from: null,
                to: null,
                date: "",
                dateReturn: "",
                twoWay: null,
                locations: this.$store.state.locations,
            }
        },
        watch:{
            locations : function(){
                // reverse geocoding
            }
        },
        methods: {
            /**
             * Occurs when the submit button is pressed. TODO NOTE: submit button only exists for testing. It should be deleted
             * in a later stage in development.
             */
            onSubmit() {
                this.$emit('journey-submitted', this.$data);
            },
            /**
             * Sets the boolean variable 'twoWay', which stores if there is a return trip or not.
             */
            setIsTwoWay(checkboxResult) {
                this.twoWay = checkboxResult;
            },
            /**
             * This function adds the location that has been clicked on in the location input to the store in Map.vue.
             */
            addToStore(locationIndex) {
                let state = this.$store.state;
                let locationT = (locationIndex === 0 ? this.from : this.to);
                if (locationT === null){
                    state.locations.set(null,locationIndex);
                }else{
                    let latlng = L.latLng(parseFloat(locationT.y), parseFloat(locationT.x));
                    state.locations.set(latlng,locationIndex);
                }
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

    .two-way {
        float: right;
        height: 60px;
        width: 50%;
        font-size: 16px !important;
    }

    input[type="submit"] {
        margin: 15px;
        width: 90%;
    }
</style>