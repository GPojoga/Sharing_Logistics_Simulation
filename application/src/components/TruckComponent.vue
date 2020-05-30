<template>
    <div>
        {{truck.properties}}
    </div>
</template>

<script>
    import Truck from "@/classes/trucks/Truck.js"
    export default {
        name: "TruckComponent",
        props:{
            truck: Truck
        }
    }
</script>

<style scoped>

</style>