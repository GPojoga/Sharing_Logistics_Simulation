<template>
    <div class="vehicle">
        <div class="header">
            <span>Vehicle {{ index + 1 }}</span>
            <div class="remove">
                <button @click="removeVehicle" type="button" class="button circle cross"></button>
            </div>
        </div>
        <div class="row">
            <div v-for="(t,i) in truckTypes"
                 :key="i"
                 class="imageTab"
                 :class="{ selected: (vehicleType === i), unselected: (vehicleType !== i) }"
                 @click="setSelected(i)">
                <img :src="'assets/' + t.img" :alt="t.name" style="width:100%">
            </div>
        </div>
        <LocationInput :index="index" :date-valid="true" locationInputLabel="Currently at"/>
        <p>Distance : {{route.distance}} km | Time : {{route.time.hours}} h {{route.time.minutes}} m</p>
    </div>
</template>

<script>
    import LocationInput from "./LocationInput";

    export default {
        name: "VehicleInput",
        components: {LocationInput},
        props: {
            locationsValid : Boolean,
            index : Number
        },
        methods: {
            /**
             * Sets the vehicle type in the store.
             * @param i
             */
            setSelected(i) {
                this.$store.commit('setVehicleType', {index: this.index, type: i});
            },
            removeVehicle() {
                this.$store.dispatch('removeVehicle', this.index);
            }
        },
        computed: {
            /**
             * This list of truck types and their values.
             * @returns Array
             */
            truckTypes() {
                return this.$store.state.truckTypes;
            },
            /**
             * The vehicle type that this vehicle has in the store.
             * @returns Number
             */
            vehicleType() {
                return this.$store.state.A.vehicles[this.index].indexTruckType;
            },
            route() {
                return this.$store.state.route;
            }
        }
    }
</script>

<style scoped>
    .header {
        height: 40px;
    }

    span {
        margin: 10px 0;
        float: left;
        text-align: left;
        color: #007FEB;
        font-weight: bold;
        font-size: 100%;
    }

    .vehicle {
        margin: 0;
        border: 2px solid #007feb;
        border-radius: 5px;
        padding: 10px 15px;
    }

    /* Selectable image tabs of the types of trucks */
    .imageTab {
        width: 25%;
        margin: 5px;
        padding: 5px;
        border-radius: 5px;
        display: inline-block;
    }

    .selected {
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.24);
        border: 2px solid #007feb;
        margin: 3px;
        /*background-color: #f1f9ff;*/
    }

    .unselected:hover {
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.24);
    }

    /* Button to remove this vehicle */
    .remove {
        float: right;
    }

    .button {
        background-color: #f1f9ff;
        border: none;
        color: white;
        padding: 15px 10px;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
    }

    .button:hover {
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.24);
        cursor: pointer;
    }

    /* Circle class */
    .circle {
        width: 30px;
        height: 30px;
        border-radius: 100%;
        position: relative;
        margin: 4px;
        display: inline-block;
        vertical-align: middle;
    }
    .circle:before,
    .circle:after {
        content:'';
        position:absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
    }

    /* Cross in circle */
    .circle.cross:after,
    .circle.cross:before {
        background: #007feb;
        margin: auto 8px;
        height: 2px;
        transform:rotateZ(45deg);
    }
    .circle.cross:after {
        transform:rotateZ(-45deg);
    }
</style>