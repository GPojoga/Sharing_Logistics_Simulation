<template>
    <form class="journey">
        <!-- Input from and to -->
        <LocationInput v-model="from" location-input-label="From" @input="addFromToStore"></LocationInput>
        <LocationInput v-model="to" location-input-label="To"></LocationInput>

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
            onSubmit() {
                this.$emit('journey-submitted', this.$data);
            },
            setIsTwoWay(checkboxResult) {
                this.twoWay = checkboxResult;
            },
            /**
             * This function adds the location that has been clicked on in the location input.
             */
            addFromToStore(){
                if (this.from != "") {
                    var latlng = [parseFloat(this.from.y),parseFloat(this.from.x)];
                    let location = {
                        pos: latlng,
                        index: 0
                    }
                    Vue.set(this.$store.state.locations,0,location);
                    console.log(this.$store.state.locations);
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