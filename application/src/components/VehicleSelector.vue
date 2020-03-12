<template>
    <div id="vehicleSelector">
        <br>
        <p id="vehicleSelectorTitle">Type of vehicles</p>
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
    #vehicleSelector {
        background-color: white;
    }

    #vehicleSelectorTitle {
        text-align: left;
        color: #007FEB;
        font-family: "Arial", Arial, sans-serif;
        font-weight: bold;
        font-size: 90%;
    }
</style>