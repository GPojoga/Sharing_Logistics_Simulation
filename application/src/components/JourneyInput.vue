<template>
    <div class="journey">
        <!-- Input from and to -->
        <div>
            <p class="errorMessage" v-if="!locationsValid">
                Fields FROM and TO must not be empty!
            </p>
        </div>
        <LocationInput v-model="from" :index="0" location-input-label="From" @input="$emit('journeyChange')"/>
        <LocationInput v-model="to" :index="1" location-input-label="To" @input="$emit('journeyChange')"/>
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
        },

        data() {
            return {
                from: null,
                to: null,
            }
        }
    }
</script>

<style scoped>
    .journey {
        margin: 0 25px;
        text-align: left;
        overflow: auto;
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