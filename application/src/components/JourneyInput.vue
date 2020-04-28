<template>
    <div class="journey">
        <!-- Input from and to -->
        <div>
            <p class="errorMessage" v-if="!locationsValid">
                Fields FROM and TO must not be empty!
            </p>
        </div>
        <LocationInput class="from" v-model="from" :index="2*index" location-input-label="From"/>
        <LocationInput class="to" v-model="to" :index="2*index + 1" location-input-label="To"/>
        <p>Distance : {{route.distance}} km | Time : {{route.time.hours}} h {{route.time.minutes}} m</p>
    </div>
</template>

<script>
    import LocationInput from "./LocationInput";


    export default {
        name: "JourneyInput",
        components: {LocationInput},
        props: {
            locationsValid : Boolean,
            dateValid : Boolean,
            index: Number
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

    .to {
        margin-top: 10px;
    }

    /* Style the text in the error message */
    .errorMessage {
        text-align: left;
        color: #b20207;
        font-size: 60%;
    }
</style>