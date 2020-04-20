<template>
    <div class="journey">
        <!-- Input from and to -->
        <div>
            <p class="errorMessage" v-if="!locationsValid">
                Fields FROM and TO must not be empty!
            </p>
        </div>
        <LocationInput id="from0" v-model="from" :index="0" location-input-label="From" @input="$emit('journeyChange')"/>
        <LocationInput id="to1" v-model="to" :index="1" location-input-label="To" @input="$emit('journeyChange')"/>
        <p>Distance : {{route.distance}} km | Time : {{route.time.hours}} h {{route.time.minutes}} m</p>
    </div>
</template>

<script>
    import LocationInput from "./baseComponents/LocationInput";


    export default {
        name: "JourneyInput",
        components: {LocationInput},
        props: {
            locationsValid : Boolean,
            dateValid : Boolean,
        },
        data() {
            return {
                from: null,
                to: null
            }
        },
        computed: {
            route() {
                return this.$store.state.route;
            }
        }
    }
</script>

<style scoped>
    .journey {
        text-align: left;
        overflow: auto;
    }

    #to1 {
        margin-top: 10px;
    }

    /* Style the text in the error message */
    .errorMessage {
        text-align: left;
        color: #b20207;
        font-size: 60%;
    }
</style>