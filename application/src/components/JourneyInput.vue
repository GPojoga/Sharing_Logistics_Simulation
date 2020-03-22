<template>
    <form class="journey">
        <!-- Input from and to -->
        <LocationInput v-model="from" @input="addToStore(0)" location-input-label="From"></LocationInput>
        <LocationInput v-model="to" @input="addToStore(1)" location-input-label="To"></LocationInput>

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
    import Vue from 'vue';

    export default {
        name: "JourneyInput",
        components: {LocationInput, DateInput, SelectorCheckBox},
        data() {
            return {
                from: "",
                to: "",
                date: "",
                dateReturn: "",
                twoWay: null
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
                const location = (locationIndex === 0? this.from : this.to);
                console.log("in addToStore");
                if (location !== "") {
                    console.log("hello");
                    var latlng = [parseFloat(location.y), parseFloat(location.y)];
                    let location = {
                        pos: latlng,
                        index: locationIndex
                    };
                    Vue.set(this.$store.state.locations,0,location);
                    console.log(this.$store.state.locations);
                    Vue.set(this.$store.state.locations,locationIndex,location);
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