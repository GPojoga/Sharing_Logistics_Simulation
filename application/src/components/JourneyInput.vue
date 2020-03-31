<template>
    <div class="journey">
        <!-- Input from and to -->
        <div>
            <p class="errorMessage" v-if="!locationsValid">
                Fields FROM and TO mustn't be empty!
            </p>
        </div>
        <LocationInput v-model="from" location-input-label="From"  @input="storeJourney(0)"></LocationInput>
        <LocationInput v-model="to" location-input-label="To" @input="storeJourney(1)"></LocationInput>


        <!-- Input departure and possibly return date -->
        <div>
            <p class="errorMessage" v-if="!dateValid">
                Must give a departure date!
            </p>
        </div>
        <DateInput date-input-label="Depart on" :minimum-date="new Date().toISOString().substr(0,10)" v-model="date" @input="storeDate()"></DateInput>
        <div class="two-way">
            <SelectorCheckBox label-text="Round trip" checkbox-id="two-way" @boxChecked="setIsTwoWay"></SelectorCheckBox>
        </div>
        <DateInput date-input-label="Return on" :minimum-date="date" v-model="dateReturn" v-if="twoWay"></DateInput>

    </div>
</template>

<script>
    import SelectorCheckBox from "./SelectorCheckBox";
    import DateInput from "./DateInput";
    import LocationInput from "./LocationInput";
    import Vue from 'vue';

    export default {
        name: "JourneyInput",
        components: {LocationInput, DateInput, SelectorCheckBox},
        props: {
            locationsValid : Boolean,
            dateValid : Boolean,
        },
        data() {
            return {
                from: null,
                to: null,
                date: "",
                dateReturn: "",
                twoWay: null
            }
        },
        methods: {
            /**
             * Sets the boolean variable 'twoWay', which stores if there is a return trip or not.
             */
            setIsTwoWay(checkboxResult) {
                this.twoWay = checkboxResult;
            },
            /**
             * This function adds the location that has been clicked on in the location input to the store in Map.vue.
             */
            storeJourney(locationIndex) {
                let locationT = (locationIndex === 0 ? this.from : this.to);
                if (locationT !== "") {
                    var latlng = [parseFloat(locationT.y), parseFloat(locationT.x)];
                    let location = {
                        pos: latlng,
                        index: locationIndex
                    };
                    Vue.set(this.$store.state.locations,locationIndex,location);
                }
                this.$emit("journeyChange");
            },
            /**
             * This function adds the date to the store in
             */
            storeDate() {
                this.$store.state.departureDate = this.departureDate;
                this.$emit("dateChange");
            }
        }
    }
</script>

<style scoped>
    .journey {
        margin: 25px;
        text-align: left;
        height: 300px;
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

    /* Style the text in the error message */
    .errorMessage {
        text-align: left;
        color: #b20207;
        font-size: 60%;
    }
</style>