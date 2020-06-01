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
                 :class="{ selected: (truck.type === type.key), unselected: (truck.type !== type.key) }"
                 @click="setSelected(type.key)">
                <img :src="'assets/' + type.img" :alt="type.name" style="width:100%">
            </div>
        </div>
        <div class="numberVehicles">
            <label>
                Number of vehicles
                <div class="quantityField">
                    <InputNumberBox :field="truck.quantity" setter="setTruckQuantity" :forward="{index: index}" placeholder="#"/>
                </div>
            </label>
        </div>
        <LocationInput :location="truck.startLocation" label="Currently at" :setter="'setTruckStartingLocation'" :forward="{index : this.index}"/>
    </div>
</template>

<script>
    import LocationInput from "./InputLocation";
    import InputNumberBox from "./InputNumberBox";

    export default {
        name: "FleetVehicleInput",
        components: {LocationInput, InputNumberBox},
        props: {
            index : Number
        },
        data: function() {
            return {
                lastInput : 1,
            }
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
            },

            /**
             * Sets the vehicle quantity in the store.
             * @param quantity The quantity of trucks
             */
            setTruckQuantity(quantity) {
                let payload = {index: this.index, quantity: quantity};
                this.$store.commit('setTruckQuantity', payload);
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
    .numberVehicles {
        text-align: left;
        height: 35px;
        font-weight: bold;
    }

    .header {
        height: 40px;
        width: 100%;
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
        border: solid rgba(0, 127, 235, 0.2);
        border-width: 0 0 1px 0;
        padding: 10px 15px 20px;
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
        /*box-shadow: 0 4px 8px 0 rgba(0,0,0,0.24);*/
        border: 0.5px solid #007feb;
        margin: 4.5px;
        /*background-color: #f1f9ff;*/
    }

    .unselected:hover {
        /*box-shadow: 0 4px 8px 0 rgba(0,0,0,0.24);*/
        transform: scale(1.1);
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

    /* Style for the quantity field box */
    .quantityField {

        display: inline-block;
        width : 25%;
        margin-right : 0;
        margin-left: 24%;
    }
</style>