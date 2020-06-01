<template>
    <div class="fleetInput">
        <FleetVehicleInput v-for="(_,index) in fleet" :key="index" :index="index"/>

        <div class="add">
            <button @click="addVehicle" type="button" class="button circle plus" :disabled='isDisabled'/>
            Add vehicle
        </div>
        <div style="clear: both;"></div> <!-- Makes sure the previous float doesn't overlap with the next element -->
    </div>
</template>

<script>
    import FleetVehicleInput from "./FleetVehicleInput";

    export default {
        name: "FleetInput",
        components: {FleetVehicleInput},
        methods: {
            /**
             * This method add a new truck to the list of trucks in the state.
             */
            addVehicle() {
                this.$store.commit('addNewTruck');
            }
        },
        computed: {
            /**
             * @returns Array of trucks in the store.
             */
            fleet() {
                return this.$store.getters.trucks;
            },
            isDisabled : function() {
                return this.$store.getters.isRunning;
            }
        }
    }
</script>

<style scoped>
    /* Holder for FleetInput */
    .fleetInput {
        margin: 0;
        padding: 10px;
    }

    /* Add space between the vehicle input tabs */
    .fleetInput > div {
        margin-bottom: 10px;
    }

    /* Button to add new vehicles */
    .add {
        float: left;
        font-weight: bold;
    }

    .button{
        background-color: #1187EC;
        border: none;
        color: white;
        padding: 15px 10px;
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