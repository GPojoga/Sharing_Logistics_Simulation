<template>
    <div class="journey">
        <!-- Input from and to -->
        <div>
            <p class="errorMessage" v-if="!locationsValid">
                Fields FROM and TO must not be empty!
            </p>
        </div>
        <LocationInput v-model="from" location-input-label="From"  @input="addToStore(0)"></LocationInput>
        <LocationInput v-model="to" location-input-label="To" @input="addToStore(1)"></LocationInput>
    </div>
</template>

<script>
    import LocationInput from "./LocationInput";
    import L from 'leaflet';


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
                this.$emit("journeyChange");
            },

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