<template>
    <div id="vehicleSelector">
        <p id="vehicleSelectorTitle">Type of vehicles</p>
        <div>
            <VehicleSelectorEntry v-for="vehicle in vehicles" :key="vehicle.label" :vehicleDetails="vehicle.label" :ref="vehicle.ref">
            </VehicleSelectorEntry>
        </div>
    </div>
</template>

<script>
    import VehicleSelectorEntry from "./VehicleSelectorEntry";

    export default {
        name: "VehicleSelector",
        components: {VehicleSelectorEntry},
        data: function () {
            return {
                vehicles: [
                    {
                        label: "Light Duty Van",
                        ref: "A"
                    },
                    {
                        label: "Heavy Duty Truck",
                        ref: "B"
                    },
                    {
                        label: "Train Truck",
                        ref: "C"
                    }
                ]
            }
        },
        methods: {
            /**
             * This method gets the quantities of all the vehicles in this component (selected & unselected).
             * @returns {[number, number, number]} 3 elements; [#Light_Duty_Vans, #Heavy_Duty_Trucks, #Train_Trucks]
             */
            getQuantities: function () {
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
    #vehicleSelector {
        background-color: white;
        margin: 5%;
    }

    #vehicleSelectorTitle {
        text-align: left;
        color: #007FEB;
        font-family: "Arial", Arial, sans-serif;
        font-weight: bold;
        font-size: 90%;
    }
</style>