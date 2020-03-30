<template>
    <div id="vehicleSelectorBackground">

<!--        <p id="vehicleSelectorTitle">-->
<!--            Type of vehicles-->
<!--        </p>-->

        <!-- Have an Entry component for every optional vehicle 'v', listed in the array 'vehicles'. --->
        <VehicleSelectorEntry v-for="v in vehicles" :key="v.key" :entryTitle="v.label" :ref="v.ref" />
    </div>
</template>

<script>
    import VehicleSelectorEntry from "./VehicleSelectorEntry";

    export default {
        name: "VehicleSelector",
        components: {VehicleSelectorEntry},
        data: function () {
            return {
                vehicles: [ // The array vehicles holds all the different types of vehicles.
                    {
                        label: "Light Duty Van",
                        key: "light-duty",
                        ref: "A"
                    },
                    {
                        label: "Heavy Duty Truck",
                        key: "heavy-duty",
                        ref: "B"
                    },
                    {
                        label: "Train Truck",
                        key: "train",
                        ref: "C"
                    }
                ]
            }
        },
        methods: {
            /**
             * This method gets the quantities of all the vehicles in this component (selected & unselected).
             * @returns {[number, number, number]} 3 elements; [#light-duty, #heavy-duty, #train]
             */
            getVehicleQuantities: function () {
                return [
                    this.$refs.A[0].getQuantity(),
                    this.$refs.B[0].getQuantity(),
                    this.$refs.C[0].getQuantity()
                ];
            }
        }
    }
</script>

<style scoped>
    /* Style the background of the vehicle selector component */
    #vehicleSelectorBackground {
        background-color: white;
        margin: 5%;
        display: block;
        text-align: left;
    }

    /* Style the title of field of vehicle selector */
    #vehicleSelectorTitle {
        text-align: left;
        color: #007FEB;
        font-family: "Arial", Arial, sans-serif;
        font-weight: bold;
        font-size: 100%;
    }
</style>