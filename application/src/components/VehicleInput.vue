<template>
    <div class="vehicle">
        <div class="header">
            <span>Vehicle {{ index + 1 }}</span>
            <div class="remove">
                <button @click="removeVehicle" type="button" class="button circle cross"></button>
            </div>
        </div>
        <div class="row">
            <div v-for="type in truckTypes"
                 :key="type.key"
                 class="imageTab"
                 :class="{ selected: (truck.type === type), unselected: (truck.type !== type) }"
                 @click="setSelected(type)">
                <img :src="'assets/' + type.img" :alt="type.name" style="width:100%">
            </div>
        </div>

        <LocationInput :location="truck.startLocation" label="Currently at" setter="setTruckStartingLocation" :forward="{index : this.index}"/>
    </div>
</template>

<script>
    import LocationInput from "./LocationInput";

    export default {
        name: "VehicleInput",
        components: {LocationInput},
        props: {
            index : Number
        },
        methods: {
            /**
             * Sets the vehicle type in the store.
             * @param type The truck type that was selected.
             */
            setSelected(type) {
                let payload = {index: this.index, type: type};
                this.$store.commit('setTruckType', payload);
            },
            /**
             * This method removes this vehicle from the store.
             */
            removeVehicle() {
                let payload = {index: this.index};
                this.$store.commit('removeTruck', payload);
            }
        },
        computed: {
            /**
             * @returns Array This list of truck types and their values.
             */
            truckTypes() {
                return this.$store.getters.truckTypes;
            },
            /**
             * @returns The truck in the store represented by this component.
             */
            truck() {
                return this.$store.getters.trucks[this.index];
            },
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