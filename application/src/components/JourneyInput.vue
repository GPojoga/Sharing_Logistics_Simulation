<template>
    <div class="journey">
        <!-- Input from and to -->
        <LocationInput v-model="from" location-input-label="From"></LocationInput>
        <LocationInput v-model="to" location-input-label="To"></LocationInput>

        <!-- Input departure and possibly return date -->
        <DateInput date-input-label="Depart on" :minimum-date="today" v-model="date"></DateInput>
        <div class="two-way">
            <SelectorCheckBox label-text="Round trip" checkbox-id="two-way" @boxChecked="setIsTwoWay"></SelectorCheckBox>
        </div>
        <DateInput date-input-label="Return on" :minimum-date="date" v-model="dateReturn" v-if="twoWay"></DateInput>

        <!-- TODO Submit for testing purposes -->
        <button class="submit" v-on:click="onSubmit">
            Submit
        </button>
    </div>
</template>

<script>
    import SelectorCheckBox from "./SelectorCheckBox";
    import DateInput from "./DateInput";
    import LocationInput from "./LocationInput";

    export default {
        name: "JourneyInput",
        components: {LocationInput, DateInput, SelectorCheckBox},
        data() {
            return {
                from: null,
                to: null,
                date: null,
                dateReturn: null,
                twoWay: null
            }
        },
        methods: {
            onSubmit() {
                this.$emit('journey-submitted', this.$data);
            },
            setIsTwoWay(checkboxResult) {
                this.twoWay = checkboxResult;
            }
        },
        computed: {
            today() {
                return new Date();
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

    .submit {
        margin: 15px;
        width: 90%;
    }
</style>