<template>
    <div id="vehicleSelector">
        <p align="left">Type of vehicles</p>
        <div>
            <VehicleSelectorEntry vehicleDetails="Light Duty Van"></VehicleSelectorEntry>
            <VehicleSelectorEntry vehicleDetails="Heavy Duty Truck"></VehicleSelectorEntry>
            <VehicleSelectorEntry vehicleDetails="Train Truck"></VehicleSelectorEntry>
        </div>
    </div>
</template>

<script>
    import VehicleSelectorEntry from "./VehicleSelectorEntry";

    export default {
        name: "VehicleSelector",
        components: {VehicleSelectorEntry}
    }
</script>

<style scoped>

</style>