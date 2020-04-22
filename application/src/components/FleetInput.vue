<template>
    <div class="fleetInput">
        <VehicleInput
                v-for="(vehicle,index) in fleet"
                :key="index"
                :index="index"
                :locations-valid="locationsValid"
                @journeyChange="this.$emit('journeyChange')"/>

        <div class="add">
            <button @click="addVehicle" type="button" class="button circle plus"></button>
            Add vehicle
        </div>
    </div>
</template>

<script>
    import VehicleInput from "./VehicleInput";

    export default {
        name: "FleetInput",
        components: {VehicleInput},
        props: {
            locationsValid : Boolean
        },
        mounted() {
            this.addVehicle();
        },
        methods: {
            addVehicle() {
                this.$store.dispatch('addVehicle');
            }
        },
        computed: {
            fleet() {
                return this.$store.state.A.vehicles;
            }
        }
    }
</script>

<style scoped>
    /* Holder for FleetInput */
    .fleetInput {
        margin: 0px;
        padding: 10px;
    }

    /* Add space between the vehicle input tabs */
    .fleetInput > div {
        margin-bottom: 10px;
    }

    /* Button to add new vehicles */
    .button{
        background-color: #1187EC;
        text-align: left;
        border: none;
        color: white;
        padding: 15px 10px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
    }

    .button:hover{
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.24);
        cursor: pointer;
    }

    /* Circle class */
    .circle{
        width: 30px;
        height: 30px;
        border-radius: 100%;
        position: relative;
        margin: 4px;
        display: inline-block;
        vertical-align: middle;
    }
    .circle:before,
    .circle:after{
        content:'';
        position:absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
    }

    /* Plus in circle */
    .circle.plus:before,
    .circle.plus:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #ffffff;
    }
    .circle.plus:before{
        width: 2px;
        margin: 8px auto;
    }
    .circle.plus:after{
        margin: auto 8px;
        height: 2px;
    }
</style>