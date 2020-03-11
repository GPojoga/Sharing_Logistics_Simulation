<template>
    <div>
        <p align="left">
            {{vehicleDetails}}
            <input type="checkbox" v-model="isSelected">
            <template v-if="isSelected">
                <input type="number" v-model="lastInputQuantity" min="0" oninput="this.value = Math.abs(this.value)">
            </template>
        </p>
    </div>
</template>

<script>
    export default {
        name: "VehicleSelectorEntry",
        props: ["vehicleDetails"],
        data: function () {
            return {
                isSelected : false,
                lastInputQuantity : 1
            }
        },
        methods: {
            getQuantity: function(){
                return (this.isSelected ? Number(this.lastInputQuantity) : 0)
            }
        }
    }
</script>

<style scoped>

</style>